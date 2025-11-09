#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

const BUILD_META_FILE = './translatemeta.json';
const LOCALES_DIR = './static/locales';

// Supported languages
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
  'zh-CN': 'Chinese (Simplified)',
};

async function restoreTranslationStatus() {
  console.log(chalk.blue('🔧 Restoring invalidated translation keys...'));
  
  // Load metadata
  const buildMeta = JSON.parse(await fs.readFile(BUILD_META_FILE, 'utf8'));
  
  let totalLanguagesFixed = 0;
  let totalKeysRestored = 0;
  
  for (const [langCode, langName] of Object.entries(SUPPORTED_LANGUAGES)) {
    console.log(chalk.cyan(`\n🌍 Processing ${langName} (${langCode}):`));
    
    // Check if translation file exists
    const translationFile = path.join(LOCALES_DIR, langCode, 'translation.json');
    
    try {
      await fs.access(translationFile);
      console.log(chalk.gray(`  📄 Translation file exists`));
    } catch (error) {
      console.log(chalk.red(`  ❌ Translation file missing, skipping`));
      continue;
    }
    
    const languageChunks = buildMeta.languageChunks[langCode];
    if (!languageChunks) {
      console.log(chalk.yellow(`  ⚠️  No chunk data found, skipping`));
      continue;
    }
    
    let chunkUpdates = 0;
    let keysRestored = 0;
    
    for (const [chunkFile, chunkData] of Object.entries(languageChunks)) {
      const enChunkData = buildMeta.enChunks[chunkFile];
      if (!enChunkData || !enChunkData.keys) {
        console.log(chalk.yellow(`    ⚠️  ${chunkFile}: No English reference, skipping`));
        continue;
      }
      
      const enKeys = enChunkData.keys;
      let updated = false;
      
      // Ensure chunk has key-level structure
      if (!chunkData.keys) {
        console.log(chalk.blue(`    🔄 Creating key-level structure for ${chunkFile}...`));
        chunkData.keys = {};
        updated = true;
      }
      
      // Restore all keys as translated (since translation files exist)
      for (const [keyPath, enKeyData] of Object.entries(enKeys)) {
        if (!chunkData.keys[keyPath] || chunkData.keys[keyPath].translated !== true) {
          chunkData.keys[keyPath] = {
            translated: true,
            checksum: enKeyData.checksum,
            lastUpdated: chunkData.keys[keyPath]?.lastUpdated || new Date().toISOString()
          };
          keysRestored++;
          updated = true;
        }
      }
      
      // Remove extra keys that don't exist in English
      const extraKeys = Object.keys(chunkData.keys).filter(keyPath => !enKeys[keyPath]);
      for (const keyPath of extraKeys) {
        delete chunkData.keys[keyPath];
        updated = true;
      }
      
      // Update chunk-level status
      if (updated) {
        const allKeysTranslated = Object.values(chunkData.keys).every(key => key.translated === true);
        chunkData.translated = allKeysTranslated;
        chunkData.checksum = allKeysTranslated ? enChunkData.checksum : null;
        chunkData.lastUpdated = allKeysTranslated ? new Date().toISOString() : null;
        
        chunkUpdates++;
      }
    }
    
    if (chunkUpdates > 0) {
      console.log(chalk.green(`  ✅ Updated ${chunkUpdates} chunks, restored ${keysRestored} keys`));
      totalLanguagesFixed++;
      totalKeysRestored += keysRestored;
    } else {
      console.log(chalk.gray(`  📄 ${langName} already up-to-date`));
    }
  }
  
  if (totalLanguagesFixed > 0) {
    // Save updated metadata
    await fs.writeFile(BUILD_META_FILE, JSON.stringify(buildMeta, null, 2));
    console.log(chalk.blue(`\n💾 Updated translatemeta.json`));
    console.log(chalk.green(`✅ Restored translation status for ${totalLanguagesFixed} languages`));
    console.log(chalk.green(`🔑 Total keys restored: ${totalKeysRestored}`));
  } else {
    console.log(chalk.green('\n✅ All translation statuses are already correct'));
  }
}

async function main() {
  try {
    console.log(chalk.blue('🚀 Translation Status Restoration Tool\n'));
    await restoreTranslationStatus();
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}

main();
