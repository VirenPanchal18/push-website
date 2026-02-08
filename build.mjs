import chalk from 'chalk';
import readline from 'readline';

import { buildFeaturedBlogs } from './build.blogs.featured.mjs';
import { buildBlogTags } from './build.blogs.tags.mjs';
import { prepForDocsChangelog } from './build.docs.changelog.mjs';
import { prepAndMoveFilesFromTempLocationToActual } from './build.lite.forprod.mjs';
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
await prepForDeployment(args[0], args[1]);
