#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const LOCALES_DIR = './static/locales';

// Supported languages
const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Spanish',
  hi: 'Hindi',
  'zh-CN': 'Chinese',
  ko: 'Korean',
  ja: 'Japanese',
  pt: 'Portuguese',
  ru: 'Russian',
  tr: 'Turkish',
  fr: 'French',
  id: 'Indonesian',
  vi: 'Vietnamese',
  de: 'German',
  ar: 'Arabic'
};

/**
 * Get all nested keys from an object as dot-notation paths
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively get keys from nested objects
        keys = keys.concat(getAllKeys(obj[key], currentPath));
      } else {
        // This is a leaf node (string, number, boolean, array, or null)
        keys.push(currentPath);
      }
    }
  }

  return keys;
}

/**
 * Load translation file
 */
async function loadTranslation(languageCode) {
  try {
    const translationPath = path.join(LOCALES_DIR, languageCode, 'translation.json');
    const content = await fs.readFile(translationPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * Compare keys between English and target language
 */
async function compareKeys() {
  console.log(chalk.blue('🔍 Comparing translation keys across all languages...\n'));

  // Load English translation as reference
  const enTranslation = await loadTranslation('en');
  if (!enTranslation) {
    console.log(chalk.red('❌ Could not load English translation.json'));
    return;
  }

  const enKeys = getAllKeys(enTranslation);
  console.log(chalk.blue(`📋 English translation has ${enKeys.length} keys\n`));

  // Compare each language
  for (const [languageCode, languageName] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (languageCode === 'en') continue; // Skip English itself

    console.log(chalk.cyan(`\n🔍 Checking ${languageName} (${languageCode})...`));

    const langTranslation = await loadTranslation(languageCode);
    if (!langTranslation) {
      console.log(chalk.red(`   ❌ Could not load ${languageCode}/translation.json`));
      continue;
    }

    const langKeys = getAllKeys(langTranslation);
    const missingKeys = enKeys.filter(key => !langKeys.includes(key));
    const extraKeys = langKeys.filter(key => !enKeys.includes(key));

    // Summary
    const coverage = ((langKeys.length - extraKeys.length) / enKeys.length * 100).toFixed(1);
    console.log(chalk.blue(`   📊 Total keys: ${langKeys.length} | Coverage: ${coverage}% (${langKeys.length - extraKeys.length}/${enKeys.length})`));

    // Missing keys
    if (missingKeys.length > 0) {
      console.log(chalk.yellow(`   🔍 Missing keys: ${missingKeys.length}`));
      const keysToShow = missingKeys.slice(0, 5);
      keysToShow.forEach(key => {
        console.log(chalk.gray(`      • ${key}`));
      });
      if (missingKeys.length > 5) {
        console.log(chalk.gray(`      ... and ${missingKeys.length - 5} more`));
      }
    }

    // Extra keys
    if (extraKeys.length > 0) {
      console.log(chalk.red(`   🗑️  Extra keys: ${extraKeys.length}`));
      const keysToShow = extraKeys.slice(0, 5);
      keysToShow.forEach(key => {
        console.log(chalk.gray(`      • ${key}`));
      });
      if (extraKeys.length > 5) {
        console.log(chalk.gray(`      ... and ${extraKeys.length - 5} more`));
      }
    }

    // Status
    if (missingKeys.length === 0 && extraKeys.length === 0) {
      console.log(chalk.green(`   ✅ Perfect sync (${enKeys.length}/${enKeys.length} keys)`));
    } else if (missingKeys.length === 0) {
      console.log(chalk.yellow(`   ⚠️  Has extra keys but complete coverage`));
    } else {
      console.log(chalk.red(`   ❌ Needs synchronization`));
    }
  }

  console.log(chalk.blue('\n📋 Key comparison completed!'));
}

// Run the comparison
compareKeys().catch(error => {
  console.error(chalk.red('❌ Error during key comparison:'), error.message);
  process.exit(1);
});
