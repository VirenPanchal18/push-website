import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, 'blog');
const OUTPUT_DIR = path.join(__dirname, 'static/content');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'featuredblogs.json');
const FEATURED_IMAGES_DIR = path.join(__dirname, 'static/assets/blog/featured');

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

  // Clean up values
  Object.keys(frontmatter).forEach((key) => {
    let value = frontmatter[key];

    // Remove quotes
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
    }

    frontmatter[key] = value;
  });

  return frontmatter;
};

// Calculate reading time
const calculateReadingTime = (content) => {
  const text = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

// Get all blog directories sorted by date (newest first)
const getBlogDirectories = async () => {
  try {
    const items = await fs.readdir(BLOG_DIR, { withFileTypes: true });
    const blogDirs = items
      .filter(
        (item) =>
          item.isDirectory() &&
          !item.name.startsWith('.') &&
          item.name !== 'authors.yml'
      )
      .map((item) => item.name)
      .filter((name) => /^\d{4}-\d{2}-\d{2}-/.test(name)) // Only date-prefixed directories
      .sort((a, b) => b.localeCompare(a)); // Sort newest first

    return blogDirs;
  } catch (error) {
    console.error(chalk.red('Error reading blog directory:'), error.message);
    return [];
  }
};

// Process a single blog post
const processBlogPost = async (blogDir) => {
  const blogPath = path.join(BLOG_DIR, blogDir);
  const indexPath = path.join(blogPath, 'index.md');

  try {
    const content = await fs.readFile(indexPath, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) {
      console.log(chalk.yellow(`   ⚠️  No frontmatter found in ${blogDir}`));
      return null;
    }

    // Check if blog has "Featured" tag
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    if (!tags.some((tag) => tag.toLowerCase() === 'featured')) {
      return null;
    }

    // Extract blog slug from directory name (or use frontmatter slug if available)
    const slug = frontmatter.slug || blogDir.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const link = `/blog/${slug}/`;

    // Use text field from frontmatter for content
    const contentText = frontmatter.text || frontmatter.description || '';

    // Calculate reading time based on text field
    const readingTime = calculateReadingTime(contentText);

    // Copy image to featured folder and build flattened image URL
    let imageUrl = null;
    if (frontmatter.image) {
      const imageName = frontmatter.image.replace(/^\.\//, '');
      const sourceImagePath = path.join(blogPath, imageName);

      // Create flattened filename: blog--slug--image.webp
      const flattenedImageName = `blog--${slug}--${imageName}`;
      const destImagePath = path.join(FEATURED_IMAGES_DIR, flattenedImageName);

      try {
        // Ensure featured images directory exists
        await fs.mkdir(FEATURED_IMAGES_DIR, { recursive: true });

        // Copy image to featured folder
        await fs.copyFile(sourceImagePath, destImagePath);

        // Set image URL to reference the copied image
        imageUrl = `/assets/blog/featured/${flattenedImageName}`;
      } catch (error) {
        console.error(
          chalk.yellow(`   ⚠️  Failed to copy image for ${blogDir}:`),
          error.message
        );
        // Fallback to original path if copy fails
        imageUrl = `/blog/${slug}/${imageName}`;
      }
    }

    // Format pubDate to match RSS format
    const dateMatch = blogDir.match(/^(\d{4})-(\d{2})-(\d{2})/);
    let pubDate = 'Unknown Date';
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      const date = new Date(`${year}-${month}-${day}`);
      pubDate = date.toUTCString();
    }

    return {
      title: frontmatter.title || 'Untitled Post',
      link,
      slug,
      pubDate,
      description: contentText || frontmatter.description || '',
      readingTime,
      imageUrl,
      tags,
      authors: frontmatter.authors || [],
    };
  } catch (error) {
    console.error(
      chalk.red(`   ❌ Error processing ${blogDir}:`),
      error.message
    );
    return null;
  }
};

// Main function
const buildFeaturedBlogs = async () => {
  console.log(chalk.blue('🔍 Scanning blog directory for featured posts...'));

  try {
    // Get all blog directories
    const blogDirs = await getBlogDirectories();

    if (blogDirs.length === 0) {
      console.log(chalk.yellow('📂 No blog posts found'));
      return;
    }

    console.log(chalk.cyan(`📦 Found ${blogDirs.length} total blog posts`));

    // Process all blogs and filter for featured ones
    const featuredBlogs = [];

    for (const blogDir of blogDirs) {
      const blog = await processBlogPost(blogDir);
      if (blog) {
        featuredBlogs.push(blog);
        console.log(chalk.green(`   ✅ Featured: ${blog.title}`));
      }
    }

    if (featuredBlogs.length === 0) {
      console.log(chalk.yellow('⚠️  No featured blog posts found'));
      return;
    }

    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Write to JSON file
    await fs.writeFile(
      OUTPUT_FILE,
      JSON.stringify(featuredBlogs, null, 2),
      'utf-8'
    );

    console.log(
      chalk.green(
        `\n✅ Successfully generated featuredblogs.json with ${featuredBlogs.length} featured posts`
      )
    );
    console.log(chalk.blue(`📄 Output: ${OUTPUT_FILE}`));
  } catch (error) {
    console.error(
      chalk.red('❌ Error building featured blogs:'),
      error.message
    );
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildFeaturedBlogs();
}

export { buildFeaturedBlogs };
