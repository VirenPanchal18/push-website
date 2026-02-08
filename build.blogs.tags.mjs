import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, 'blog');
const OUTPUT_DIR = path.join(__dirname, 'static/content');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blogtags.json');

// Tag configuration with priority and category
// DO NOT ADD NEW TAGS HERE UNTIL CONFIRMED BY PROJECT LEAD AND MARKETING LEAD
const TAG_CONFIG = {
  // Priority 0 - Featured (for showcasing blogs)
  Featured: { priority: 0, category: 'Featured' },

  // Priority 1 - Product
  Product: { priority: 1, category: 'Product' },

  // Priority 2 - Key Features
  'Key Features': { priority: 2, category: 'Key Features' },

  // Priority 3 - Technical
  Technical: { priority: 3, category: 'Technical' },

  // Priority 4 - Programs
  Programs: { priority: 4, category: 'Programs' },

  // Priority 5 - Thought Leadership
  'Thought Leadership': { priority: 5, category: 'Thought Leadership' },

  // Priority 6 - Case Studies
  'Case Studies': { priority: 6, category: 'Case Studies' },

  // Priority 7 - Ecosystem
  Ecosystem: { priority: 7, category: 'Ecosystem' },

  // Priority 8 - Partnerships
  Partnerships: { priority: 8, category: 'Partnerships' },

  // Priority 9 - Maker Monday
  'Maker Monday': { priority: 9, category: 'Maker Monday' },

  // Priority 10 - Deep Dives
  'Deep Dives': { priority: 10, category: 'Deep Dives' },

  // Priority 11 - Push 101
  'Push 101': { priority: 11, category: 'Push 101' },
};

// Parse frontmatter from markdown content
const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  let currentKey = null;
  let currentValue = '';
  let inArray = false;

  for (const line of lines) {
    // Check if line starts a new key-value pair
    if (line.includes(':') && !inArray) {
      // Save previous key-value if exists
      if (currentKey) {
        frontmatter[currentKey] = currentValue.trim();
      }

      const colonIndex = line.indexOf(':');
      currentKey = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Check if value starts and ends with array on same line
      if (value.startsWith('[') && value.endsWith(']')) {
        currentValue = value;
        inArray = false;
      } else if (value.startsWith('[')) {
        // Array spans multiple lines
        inArray = true;
        currentValue = value;
      } else {
        currentValue = value;
        inArray = false;
      }
    } else if (inArray) {
      // Continue building array value
      currentValue += ' ' + line.trim();
      if (line.includes(']')) {
        inArray = false;
      }
    }
  }

  // Save last key-value
  if (currentKey) {
    frontmatter[currentKey] = currentValue.trim();
  }

  // Parse arrays
  for (const key in frontmatter) {
    const value = frontmatter[key];
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      frontmatter[key] = arrayContent
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter((item) => item.length > 0);
    } else {
      // Remove quotes from string values
      frontmatter[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }

  return frontmatter;
};

// Convert tag name to URL slug
const tagToSlug = (tag) => {
  return tag
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Consolidate tag name (merge duplicates)
const consolidateTag = (tag) => {
  const config = TAG_CONFIG[tag];
  if (config && config.mergeTo) {
    return config.mergeTo;
  }
  return tag;
};

// Get tag metadata
const getTagMetadata = (tag) => {
  const config = TAG_CONFIG[tag];
  if (config) {
    return {
      priority: config.priority,
      category: config.category,
    };
  }
  // Default for unconfigured tags
  return {
    priority: 99,
    category: 'Other',
  };
};

// Validate that a tag exists in TAG_CONFIG
const validateTag = (tag, blogDir) => {
  if (!TAG_CONFIG[tag]) {
    throw new Error(
      `Invalid tag "${tag}" found in blog "${blogDir}".\n` +
        `   This tag is not defined in TAG_CONFIG.\n` +
        `   Please use only approved tags or get approval from Project Lead and Marketing Lead to add new tags.`
    );
  }
};

// Process a single blog post and extract tags
const processBlogPost = async (blogPath, blogDir) => {
  try {
    const indexPath = path.join(blogPath, 'index.md');
    const content = await fs.readFile(indexPath, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) {
      return [];
    }

    // Extract tags
    let tags = [];
    if (frontmatter.tags) {
      if (Array.isArray(frontmatter.tags)) {
        tags = frontmatter.tags;
      } else if (typeof frontmatter.tags === 'string') {
        tags = [frontmatter.tags];
      }
    }

    // Validate all tags exist in TAG_CONFIG
    tags.forEach((tag) => validateTag(tag, blogDir));

    return tags;
  } catch (error) {
    // Re-throw validation errors to stop the build
    if (error.message.includes('Invalid tag')) {
      throw error;
    }

    console.error(
      chalk.yellow(`   ⚠️  Error processing ${blogDir}:`),
      error.message
    );
    return [];
  }
};

// Main function to build blog tags
export const buildBlogTags = async () => {
  try {
    console.log(chalk.cyan('\n🔍 Scanning blog directory for tags...'));

    // Read all blog directories
    const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
    const blogDirs = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
      .reverse();

    console.log(chalk.gray(`📦 Found ${blogDirs.length} total blog posts`));

    // Collect all tags and count posts per tag
    const tagCounts = new Map();

    for (const blogDir of blogDirs) {
      const blogPath = path.join(BLOG_DIR, blogDir);
      const tags = await processBlogPost(blogPath, blogDir);

      tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }

    // Convert Map to array and create tag objects with metadata
    const tagsArray = Array.from(tagCounts.entries())
      .map(([tag, count]) => {
        const metadata = getTagMetadata(tag);
        return {
          name: tag,
          slug: tagToSlug(tag),
          link: `/blog/tags/${tagToSlug(tag)}/`,
          priority: metadata.priority,
          category: metadata.category,
          count: count,
        };
      })
      // Sort by priority first, then alphabetically within same priority
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.name.localeCompare(b.name);
      });

    console.log(
      chalk.green(
        `   ✅ Found ${tagsArray.length} unique tags across all posts`
      )
    );

    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Write tags to JSON file
    await fs.writeFile(
      OUTPUT_FILE,
      JSON.stringify(tagsArray, null, 2),
      'utf-8'
    );

    console.log(
      chalk.green(
        `✅ Successfully generated blogtags.json with ${tagsArray.length} tags`
      )
    );
    console.log(chalk.gray(`📄 Output: ${OUTPUT_FILE}`));
  } catch (error) {
    console.error(chalk.red('❌ Error building blog tags:'), error);
    throw error;
  }
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildBlogTags();
}
