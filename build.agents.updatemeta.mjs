#!/usr/bin/env node
/**
 * build.agents.updatemeta.mjs
 *
 * Stamps current timestamps into generated agent JSON files without
 * re-running the LLM pipeline. Run this after any manual edits to
 * agent files when you only need to refresh generated_at / generated
 * / last_generated metadata.
 *
 * Usage:  node build.agents.updatemeta.mjs
 * npm:    yarn generate:agents:updatemeta
 *
 * Requires: llmsmeta.json to exist (i.e. generate:agents:full has been run at least once)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = path.join(__dirname, 'static');
const META_FILE = path.join(__dirname, 'llmsmeta.json');

const now = new Date();
const isoNow = now.toISOString();
const dateNow = isoNow.split('T')[0]; // YYYY-MM-DD

// Timestamp field → replacement format
const FIELDS = [
  { key: 'generated_at', value: dateNow },
  { key: 'generated', value: isoNow },
  { key: 'last_generated', value: isoNow },
];

async function stampFile(relPath) {
  const fullPath = path.join(STATIC_DIR, relPath);
  let content;
  try {
    content = await fs.readFile(fullPath, 'utf-8');
  } catch {
    return false; // file not present, skip silently
  }

  let changed = false;

  for (const { key, value } of FIELDS) {
    const re = new RegExp(`("${key}"\\s*:\\s*)"[^"]*"`, 'g');
    const next = content.replace(re, `$1"${value}"`);
    if (next !== content) {
      content = next;
      changed = true;
    }
  }

  // changelog.json — update only the first (most-recent) entry's date
  if (relPath.endsWith('changelog.json')) {
    const next = content.replace(/("date"\s*:\s*)"[^"]*"/, `$1"${isoNow}"`);
    if (next !== content) {
      content = next;
      changed = true;
    }
  }

  if (changed) {
    await fs.writeFile(fullPath, content, 'utf-8');
  }
  return changed;
}

async function main() {
  // Load the meta written by generate:agents:full
  let meta;
  try {
    meta = JSON.parse(await fs.readFile(META_FILE, 'utf-8'));
  } catch {
    console.error('Error: llmsmeta.json not found.');
    console.error(
      'Run "yarn generate:agents:full" at least once before using updatemeta.'
    );
    process.exit(1);
  }

  const files = meta.filesGenerated ?? [];
  if (files.length === 0) {
    console.warn(
      'llmsmeta.json has no filesGenerated entries — nothing to update.'
    );
    process.exit(0);
  }

  console.log(`Stamping timestamps → ${isoNow}\n`);

  let updated = 0;
  for (const relPath of files) {
    const changed = await stampFile(relPath);
    if (changed) {
      console.log(`  ✓  ${relPath}`);
      updated++;
    }
  }

  // Bump lastRun in llmsmeta.json
  meta.lastRun = isoNow;
  await fs.writeFile(META_FILE, JSON.stringify(meta, null, 2) + '\n', 'utf-8');

  console.log(
    `\nDone. Updated ${updated} file(s). llmsmeta.json.lastRun → ${isoNow}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
