import chalk from 'chalk';
import { execSync, spawn } from 'child_process';
import { watch } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  copyChangedBlogsFromLite,
  prepAndMoveFilesFromTempLocationToActual,
} from './build.lite.forprod.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSLATIONS_DIR = path.join(
  __dirname,
  '/static/locales/en/01-translate'
);

// Get mode from command line arguments (lite or full)
const mode = process.argv[2] || 'full';
const isLiteMode = mode === 'lite';

console.log(
  chalk.blue(
    `🚀 Starting Docusaurus in ${mode.toUpperCase()} mode with translation auto-merge...`
  )
);

// Prepare files based on mode (lite moves blogs to temp, full restores from temp)
console.log(chalk.yellow(`🔄 Preparing files for ${mode} mode...`));
try {
  await prepAndMoveFilesFromTempLocationToActual(mode);
} catch (error) {
  console.error(chalk.red('❌ File preparation failed:'), error.message);
}

// Initial merge
console.log(chalk.yellow('🔄 Running initial translation merge...'));
try {
  const mergeScript = path.join(__dirname, 'hotbuild.merge.translation.mjs');
  execSync(`node "${mergeScript}"`, { stdio: 'inherit' });
} catch (error) {
  console.error(chalk.red('❌ Initial merge failed:'), error.message);
}

// Start Docusaurus with blog mode environment variable
console.log(
  chalk.blue(`🚀 Starting Docusaurus in ${mode.toUpperCase()} mode...`)
);
const docusaurus = spawn('yarn', ['docusaurus', 'start'], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: {
    ...process.env,
    BLOG_MODE: mode,
  },
});

// Watch for translation file changes
console.log(chalk.blue(`👀 Watching for changes in: ${TRANSLATIONS_DIR}`));
const watcher = watch(
  TRANSLATIONS_DIR,
  { recursive: false },
  async (eventType, filename) => {
    if (filename && filename.endsWith('.json') && filename !== 'README.md') {
      console.log(chalk.cyan(`\n📝 Translation file changed: ${filename}`));
      console.log(chalk.yellow('🔄 Auto-merging translations...'));

      try {
        const mergeScript = path.join(
          __dirname,
          'hotbuild.merge.translation.mjs'
        );
        execSync(`node "${mergeScript}"`, { stdio: 'inherit' });
        console.log(
          chalk.green('✅ Translations merged! Docusaurus will hot-reload.\n')
        );
      } catch (error) {
        console.error(chalk.red('❌ Merge failed:'), error.message);
      }
    }
  }
);

// Handle process termination
let isShuttingDown = false;
let isRestoring = false;

const restoreBlogsIfNeeded = async () => {
  if (isRestoring || !isLiteMode) return;
  isRestoring = true;

  console.log(chalk.blue('🔄 Restoring blog posts...'));
  try {
    // First, copy any changed blogs from blog-lite back to main blog directory
    await copyChangedBlogsFromLite();

    // Then clean up blog-lite directory
    await prepAndMoveFilesFromTempLocationToActual('full');
    console.log(chalk.green('✅ Blog posts restored successfully'));
  } catch (error) {
    console.error(chalk.red('❌ Failed to restore blog posts:'), error.message);
  }
};

const cleanup = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(chalk.yellow(`\n🛑 Shutting down ${mode.toUpperCase()} mode...`));

  // Restore blogs if needed
  await restoreBlogsIfNeeded();

  watcher.close();

  // Kill docusaurus process
  if (docusaurus && !docusaurus.killed) {
    docusaurus.kill(signal || 'SIGTERM');

    // Wait a bit for docusaurus to exit gracefully
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  process.exit(0);
};

process.on('SIGINT', () => {
  cleanup('SIGINT').catch(console.error);
});
process.on('SIGTERM', () => {
  cleanup('SIGTERM').catch(console.error);
});

docusaurus.on('close', async (code) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(chalk.yellow(`\n📦 Docusaurus exited with code ${code}`));

  // Restore blogs if needed
  await restoreBlogsIfNeeded();

  watcher.close();
  process.exit(code);
});
