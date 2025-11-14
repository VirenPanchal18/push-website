#!/usr/bin/env node

import chalk from 'chalk';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, 'static', 'locales');
const SUPPORTED_LANGUAGES = {
  ar: 'Arabic',
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  hi: 'Hindi',
  id: 'Indonesian',
  ja: 'Japanese',
  ko: 'Korean',
  pt: 'Portuguese',
  ru: 'Russian',
  tr: 'Turkish',
  vi: 'Vietnamese',
  'zh-CN': 'Chinese',
};

/**
 * Get all nested keys from an object as dot-notation paths
 */
function getAllKeys(obj, prefix = '') {
  const keys = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        keys.push(...getAllKeys(obj[key], currentPath));
      } else {
        keys.push(currentPath);
      }
    }
  }

  return keys;
}

/**
 * Get value from object using dot-notation path
 */
function getValueByPath(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Migration: Generate initial missing-keys.json files from current translation.json files
 */
async function migrateMissingKeysFiles() {
  console.log(
    chalk.blue('\n🔄 Migration: Creating missing-keys.json files...')
  );
  console.log(
    chalk.gray(
      'Moving keys from translation.json that are NOT in autotranslate to missing-keys.json'
    )
  );
  console.log(chalk.gray('─'.repeat(80)));

  const supportedLanguages = Object.keys(SUPPORTED_LANGUAGES);
  let migratedCount = 0;
  let skippedCount = 0;

  for (const languageCode of supportedLanguages) {
    const languageName = SUPPORTED_LANGUAGES[languageCode];
    const langTranslationPath = path.join(
      LOCALES_DIR,
      languageCode,
      'translation.json'
    );
    const missingKeysPath = path.join(
      LOCALES_DIR,
      languageCode,
      'missing-keys.json'
    );

    console.log(
      chalk.blue(`\n📝 Processing ${languageName} (${languageCode})...`)
    );

    // Check if missing-keys.json already exists
    try {
      await fs.access(missingKeysPath);
      console.log(
        chalk.yellow(`   ⚠️  missing-keys.json already exists, skipping`)
      );
      skippedCount++;
      continue;
    } catch {
      // File doesn't exist, create it
    }

    // Load existing translation.json for this language
    let langTranslation = {};
    try {
      const langContent = await fs.readFile(langTranslationPath, 'utf8');
      langTranslation = JSON.parse(langContent);
    } catch {
      console.log(
        chalk.gray(
          `   ⚠️  ${languageCode}/translation.json not found, all keys will be missing`
        )
      );
    }

    // Load autotranslate folder for this language to see what keys should exist
    const langAutoTranslateDir = path.join(
      LOCALES_DIR,
      languageCode,
      'autotranslate'
    );
    let autotranslateKeys = [];

    try {
      const langChunkFiles = await fs.readdir(langAutoTranslateDir);
      const langJsonFiles = langChunkFiles.filter((file) =>
        file.endsWith('.json')
      );

      let combinedLangAutotranslate = {};
      for (const chunkFile of langJsonFiles) {
        const chunkPath = path.join(langAutoTranslateDir, chunkFile);
        const chunkContent = JSON.parse(await fs.readFile(chunkPath, 'utf8'));

        // Merge chunks
        const mergeObjects = (target, source) => {
          for (const key in source) {
            if (source.hasOwnProperty(key)) {
              if (
                typeof source[key] === 'object' &&
                source[key] !== null &&
                !Array.isArray(source[key])
              ) {
                if (!target[key]) target[key] = {};
                mergeObjects(target[key], source[key]);
              } else {
                target[key] = source[key];
              }
            }
          }
        };

        mergeObjects(combinedLangAutotranslate, chunkContent);
      }

      autotranslateKeys = getAllKeys(combinedLangAutotranslate);
      console.log(
        chalk.gray(
          `   📁 Found ${autotranslateKeys.length} keys in ${languageCode}/autotranslate`
        )
      );
    } catch (error) {
      console.log(
        chalk.gray(`   ⚠️  ${languageCode}/autotranslate not found, skipping`)
      );
      continue;
    }

    // Find missing keys: Keys in translation.json that are NOT in autotranslate folder
    const langKeys = getAllKeys(langTranslation);
    const missingKeys = langKeys.filter(
      (key) => !autotranslateKeys.includes(key)
    );

    console.log(
      chalk.gray(
        `   🔍 Found ${missingKeys.length} missing keys out of ${langKeys.length} total in translation.json`
      )
    );

    // Create missing-keys.json with actual missing keys
    const missingKeysData = {
      lastUpdated: new Date().toISOString(),
      keys: {},
    };

    // Load English translation for proper checksums
    const enTranslationPath = path.join(LOCALES_DIR, 'en', 'translation.json');
    let enTranslation = {};
    try {
      const enContent = await fs.readFile(enTranslationPath, 'utf8');
      enTranslation = JSON.parse(enContent);
    } catch (error) {
      console.log(
        chalk.yellow(`   ⚠️  Could not load English translation for checksums`)
      );
      continue;
    }

    // Add missing keys with their current translated values and English checksums
    for (const keyPath of missingKeys) {
      const translatedValue = getValueByPath(langTranslation, keyPath);
      const englishValue = getValueByPath(enTranslation, keyPath);

      if (englishValue !== undefined) {
        const englishChecksum = crypto
          .createHash('md5')
          .update(JSON.stringify(englishValue))
          .digest('hex');

        missingKeysData.keys[keyPath] = {
          value: translatedValue,
          englishChecksum: englishChecksum,
          lastUpdated: new Date().toISOString(),
        };
      }
    }

    // Save missing-keys.json
    await fs.mkdir(path.dirname(missingKeysPath), { recursive: true });
    await fs.writeFile(
      missingKeysPath,
      JSON.stringify(missingKeysData, null, 2),
      'utf8'
    );

    if (missingKeys.length > 0) {
      console.log(
        chalk.yellow(
          `   📝 Created missing-keys.json with ${missingKeys.length} missing keys`
        )
      );
    } else {
      console.log(
        chalk.green(
          `   ✅ No missing keys found - created empty missing-keys.json`
        )
      );
    }
    migratedCount++;
  }

  console.log(chalk.gray('\n' + '─'.repeat(80)));
  console.log(chalk.green(`\n✅ Migration completed successfully!`));
  console.log(
    chalk.blue(
      `   📊 Summary: ${migratedCount} files created, ${skippedCount} files skipped`
    )
  );

  if (migratedCount > 0) {
    console.log(
      chalk.cyan(`\n🎉 Missing-keys.json architecture is now ready!`)
    );
    console.log(
      chalk.gray(
        `   • Missing key translations will be cached in missing-keys.json`
      )
    );
    console.log(
      chalk.gray(`   • Checksums will prevent unnecessary retranslations`)
    );
    console.log(
      chalk.gray(
        `   • Main translation process will merge cached keys automatically`
      )
    );
  }

  if (skippedCount === supportedLanguages.length) {
    console.log(
      chalk.yellow(
        `\n⚠️  All missing-keys.json files already exist. Migration not needed.`
      )
    );
  }
}

// Main execution
async function main() {
  try {
    console.log(chalk.cyan('🚀 Push Chain Translation Migration Script'));
    console.log(
      chalk.gray(
        'Setting up missing-keys.json architecture for improved translation management'
      )
    );

    await migrateMissingKeysFiles();

    console.log(chalk.green('\n🎯 Migration script completed successfully!'));
    console.log(
      chalk.gray('You can now run the main translation automation script.')
    );
  } catch (error) {
    console.error(chalk.red('\n❌ Migration failed:'), error.message);
    console.error(chalk.gray(error.stack));
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { migrateMissingKeysFiles };
