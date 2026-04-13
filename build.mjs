import chalk from 'chalk';
import fs from 'fs/promises';
import readline from 'readline';

import { buildAgentsLlms } from './build.agents.llms.mjs';
import { buildFeaturedBlogs } from './build.blogs.featured.mjs';
import { buildBlogTags } from './build.blogs.tags.mjs';
import { prepForDocsChangelog } from './build.docs.changelog.mjs';
import { prepAndMoveFilesFromTempLocationToActual } from './build.lite.forprod.mjs';
import { buildLlmsPreseed } from './build.llms.preseed.mjs';
import { prepForPreviewDeployment } from './build.preview.mjs';
import { automateTranslations } from './build.translation.automation.mjs';

/**
 * Ask user for confirmation to continue
 */
const askToContinue = async (message) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      const normalizedAnswer = answer.toLowerCase().trim();
      resolve(normalizedAnswer === 'y' || normalizedAnswer === 'yes');
    });
  });
};

// Check agents layer freshness and warn/block based on age
const checkAgentsFreshness = async (skipCheck) => {
  const metaPath = new URL('./llmsmeta.json', import.meta.url).pathname;
  let meta;
  try {
    const raw = await fs.readFile(metaPath, 'utf-8');
    meta = JSON.parse(raw);
  } catch {
    console.warn(
      chalk.yellow(
        '\n⚠️  llmsmeta.json not found — /agents/ layer has not been generated yet.'
      )
    );
    console.warn(chalk.gray('   Run: node build.agents.mjs to generate it'));
    return;
  }

  if (!meta.lastRun) {
    console.warn(
      chalk.yellow(
        '\n⚠️  /agents/ layer has never been generated (llmsmeta.json.lastRun is null).'
      )
    );
    console.warn(chalk.gray('   Run: node build.agents.mjs to generate it'));
    return;
  }

  const lastRun = new Date(meta.lastRun);
  const ageMs = Date.now() - lastRun.getTime();
  const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));

  if (ageDays < 14) {
    console.log(
      chalk.green(
        `✅ Agents layer is ${ageDays} day(s) old (model: ${meta.model})`
      )
    );
  } else if (ageDays < 60) {
    console.warn(
      chalk.yellow(
        `⚠️  Agents layer is ${ageDays} days old — consider re-running: node build.agents.mjs`
      )
    );
  } else {
    if (skipCheck) {
      console.warn(
        chalk.yellow(
          `⚠️  Agents layer is ${ageDays} days old (staleness check skipped via skip_agents_check)`
        )
      );
    } else {
      console.error(
        chalk.red(
          `🛑 Agents layer is ${ageDays} days old — too stale to deploy.`
        )
      );
      console.error(
        chalk.gray(
          '   Re-run: node build.agents.mjs   OR pass skip_agents_check to override'
        )
      );
      process.exit(1);
    }
  }
};

// Prep for deployment starts everything
const prepForDeployment = async (appEnv, skipTranslation) => {
  console.log(chalk.green('Starting Custom Deployment Prebuild...'));

  // Check and move blogs back from temp location
  await prepAndMoveFilesFromTempLocationToActual('full');

  // Step 2: Do changelog in docs (future feature)
  await prepForDocsChangelog();

  // Step 2.5: Generate featured blogs JSON
  console.log(chalk.cyan('\n📝 Step 2.5: Generating featured blogs JSON...'));
  try {
    await buildFeaturedBlogs();
    console.log(chalk.green('✅ Featured blogs JSON generated successfully'));
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Featured blogs generation failed'));
    console.warn(chalk.gray(`   Error: ${error.message}`));
  }

  // Step 2.6: Generate blog tags JSON
  console.log(chalk.cyan('\n🏷️  Step 2.6: Generating blog tags JSON...'));
  try {
    await buildBlogTags();
    console.log(chalk.green('✅ Blog tags JSON generated successfully'));
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Blog tags generation failed'));
    console.warn(chalk.gray(`   Error: ${error.message}`));
  }

  // Step 2.7a: Generate llms-preseed.txt + llms-full.txt (doc index for agents)
  console.log(
    chalk.cyan('\n🤖 Step 2.7a: Generating llms-preseed.txt + llms-full.txt...')
  );
  try {
    await buildLlmsPreseed();
    console.log(chalk.green('✅ llms-preseed.txt + llms-full.txt generated'));
  } catch (error) {
    console.warn(chalk.yellow('⚠️  llms-preseed.txt generation failed'));
    console.warn(chalk.gray(`   Error: ${error.message}`));
  }

  // Step 2.7b: Generate llms.txt from agents layer + blog + KB links
  console.log(
    chalk.cyan('\n📄 Step 2.7b: Generating llms.txt from agents layer...')
  );
  try {
    await buildAgentsLlms();
    console.log(chalk.green('✅ llms.txt generated'));
  } catch (error) {
    console.warn(chalk.yellow('⚠️  llms.txt generation failed'));
    console.warn(chalk.gray(`   Error: ${error.message}`));
  }

  // Step 3: Automated translation generation with MD5 checksum tracking
  console.log(
    chalk.cyan('\n🌍 Step 3: Running automated translation system...')
  );

  if (skipTranslation === 'skip_translation') {
    console.log(
      chalk.green('⏩ Skipping Translation as indicated in the params...')
    );
  } else {
    try {
      await automateTranslations();
      console.log(chalk.green('✅ Automated translation system completed'));
    } catch (error) {
      // If API key is missing or invalid, halt the build process
      if (
        error.message.includes(
          'WINDSURF_API_KEY environment variable is required'
        ) ||
        error.message.includes('Invalid WINDSURF_API_KEY')
      ) {
        console.error(
          chalk.red('🛑 Translation process halted due to API key issue')
        );
        process.exit(1); // Exit immediately for API key issues
      }

      // For other translation errors, ask user if they want to continue
      console.warn(chalk.yellow('⚠️  Automated translation failed'));
      console.warn(chalk.gray(`   Error: ${error.message}`));
      console.log(chalk.cyan('\n📋 You have two options:'));
      console.log(
        chalk.white('   1. Continue with existing translations (if any)')
      );
      console.log(
        chalk.white('   2. Halt the build to fix the translation issue')
      );

      const shouldContinue = await askToContinue(
        chalk.blue('\nDo you want to continue with the build? (y/N): ')
      );

      if (!shouldContinue) {
        console.log(chalk.red('🛑 Build process halted by user choice'));
        console.log(
          chalk.gray('   Fix the translation issue and run the build again')
        );
        process.exit(1);
      } else {
        console.log(chalk.green('✅ Continuing with existing translations...'));
      }
    }
  }

  // Step 4: Do preview deployment
  await prepForPreviewDeployment(appEnv);
};

var args = process.argv.slice(2);
const skipAgentsCheck = args.includes('skip_agents_check');

// Check agents freshness before build (warns/blocks based on age)
await checkAgentsFreshness(skipAgentsCheck);

await prepForDeployment(args[0], args[1]);
