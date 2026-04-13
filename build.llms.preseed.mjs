import chalk from 'chalk';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, 'docs');
const BLOG_DIR = path.join(__dirname, 'blog');
const OUTPUT_DIR = path.join(__dirname, 'static');

const BASE_URL = 'https://push.org';
const DOCS_ROUTE = '/docs';
const BLOG_ROUTE = '/blog';

const MAX_BLOG_POSTS = 100;

// Human-readable labels for cleaned directory names
const SECTION_LABEL_MAP = {
  tutorials: 'Tutorials',
  setup: 'Setup',
  build: 'Build',
  'ui-kit': 'UI Kit',
  'deep-dives': 'Deep Dives',
  'node-and-system-tools': 'Node & System Tools',
};

// Strip leading numeric prefix from a path segment (e.g. "03-build" → "build")
const stripNumericPrefix = (segment) => segment.replace(/^\d+-/, '');

// Walk a directory recursively and return all file paths
const walkDir = async (dir, extensions = ['.mdx', '.md']) => {
  const results = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkDir(fullPath, extensions)));
    } else if (extensions.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
};

// Compute the canonical URL for a docs file given its path and parsed slug
const computeDocUrl = (filePath, slug) => {
  const relDir = path.relative(DOCS_DIR, path.dirname(filePath));
  const cleanSegments =
    relDir === '.' ? [] : relDir.split(path.sep).map(stripNumericPrefix);

  let urlPath;

  if (!slug) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const cleanFileName = stripNumericPrefix(fileName)
      .toLowerCase()
      .replace(/\s+/g, '-');
    urlPath = [...cleanSegments, cleanFileName].join('/');
  } else if (slug.startsWith('/')) {
    urlPath = slug.replace(/^\/+/, '');
  } else if (slug.startsWith('./')) {
    const relSlug = slug.slice(2);
    urlPath = relSlug
      ? [...cleanSegments, relSlug].join('/')
      : cleanSegments.join('/');
  } else {
    urlPath = [...cleanSegments, slug].join('/');
  }

  // Ensure single trailing slash
  return `${BASE_URL}${DOCS_ROUTE}/${urlPath}/`.replace(/\/+$/, '/');
};

// Determine the section label for a docs file based on its relative path.
// Returns null for files that should be excluded (e.g. docs root files).
const getSectionLabel = (filePath) => {
  const relPath = path.relative(DOCS_DIR, filePath);
  const segments = relPath.split(path.sep).map(stripNumericPrefix);

  // Files directly in docs/ root (1 segment) — skip them
  if (segments.length === 1) return null;

  // Files directly in docs/chain/ (2 segments) → "Introduction & Overview"
  if (segments.length === 2) return 'Introduction & Overview';

  // Files in a sub-section → use the sub-section directory label
  const subDir = segments[1];
  return SECTION_LABEL_MAP[subDir] ?? subDir;
};

// Strip MDX/JSX noise from content for llms-full.txt
const stripMdxNoise = (raw) => {
  return (
    raw
      // Remove frontmatter
      .replace(/^---[\s\S]*?---\n?/, '')
      // Remove multi-line import blocks: import { ... } from '...';
      .replace(/^import\s+\{[^}]*\}\s+from\s+['"][^'"]+['"]\s*;?\n?/gms, '')
      // Remove single-line import statements
      .replace(/^import\s+\S.*from\s+['"][^'"]+['"]\s*;?\n?/gm, '')
      // Remove export statements
      .replace(/^export .+\n?/gm, '')
      // Remove JSX/HTML tags while preserving inner text (best-effort)
      .replace(/<[^>]+>/g, '')
      // Collapse multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
};

// Gather all docs with their metadata
const gatherDocs = async () => {
  const files = await walkDir(DOCS_DIR);
  const docs = [];

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf-8');
    let parsed;
    try {
      parsed = matter(raw);
    } catch {
      continue;
    }

    const { title, slug, description, sidebar_position } = parsed.data;
    if (!title) continue;

    const url = computeDocUrl(filePath, slug);
    const section = getSectionLabel(filePath);
    if (section === null) continue;
    const strippedContent = stripMdxNoise(raw);

    docs.push({
      filePath,
      title,
      description: description ?? null,
      url,
      section,
      sidebar_position: sidebar_position ?? 999,
      strippedContent,
    });
  }

  // Sort: by section then sidebar_position
  docs.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.sidebar_position - b.sidebar_position;
  });

  return docs;
};

// Gather recent blog posts
const gatherBlogPosts = async () => {
  let entries;
  try {
    entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const blogDirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()
    .reverse()
    .slice(0, MAX_BLOG_POSTS);

  const posts = [];

  for (const dirName of blogDirs) {
    const indexPath = path.join(BLOG_DIR, dirName, 'index.md');
    let raw;
    try {
      raw = await fs.readFile(indexPath, 'utf-8');
    } catch {
      continue;
    }

    let parsed;
    try {
      parsed = matter(raw);
    } catch {
      continue;
    }

    const { title, slug, description } = parsed.data;
    if (!title) continue;

    const blogSlug = slug ?? dirName;
    const url = `${BASE_URL}${BLOG_ROUTE}/${blogSlug}/`.replace(/\/+$/, '/');

    posts.push({ title, description: description ?? null, url });
  }

  return posts;
};

// Build the llms-preseed.txt content
const buildLlmsTxt = (docs, blogPosts) => {
  const lines = [];

  lines.push('# Push Chain');
  lines.push('');
  lines.push(
    '> Push Chain is the first True Universal Layer 1 blockchain, 100% EVM-compatible, enabling universal apps that work across every chain and wallet.'
  );
  lines.push('');
  lines.push(
    'Deploy smart contracts once on Push Chain and instantly reach users on Ethereum, Solana, and all other supported chains without changing on-chain code. The Push Chain SDK handles cross-chain transactions, universal signers, and wallet abstraction.'
  );
  lines.push('');

  // Group docs by section preserving insertion order
  const sectionOrder = [
    'Introduction & Overview',
    'Build',
    'Setup',
    'Tutorials',
    'UI Kit',
    'Deep Dives',
    'Node & System Tools',
  ];

  const grouped = new Map();
  for (const doc of docs) {
    if (!grouped.has(doc.section)) grouped.set(doc.section, []);
    grouped.get(doc.section).push(doc);
  }

  // Emit in preferred order, then any remaining sections
  const emittedSections = new Set();
  for (const sectionName of [...sectionOrder, ...Array.from(grouped.keys())]) {
    if (emittedSections.has(sectionName)) continue;
    if (!grouped.has(sectionName)) continue;
    emittedSections.add(sectionName);

    lines.push(`## ${sectionName}`);
    lines.push('');
    for (const doc of grouped.get(sectionName)) {
      const desc = doc.description ? `: ${doc.description}` : '';
      lines.push(`- [${doc.title}](${doc.url})${desc}`);
    }
    lines.push('');
  }

  // Blog posts as an optional section
  if (blogPosts.length > 0) {
    lines.push(`## Latest Blogs - Showing ${blogPosts.length} latest blogs`);
    lines.push('');
    for (const post of blogPosts) {
      const desc = post.description ? `: ${post.description}` : '';
      lines.push(`- [${post.title}](${post.url})${desc}`);
    }
    lines.push('');
  }

  lines.push('## Full Content');
  lines.push('');
  lines.push(
    `The full text of all documentation pages (stripped of MDX/JSX) is available at [${BASE_URL}/llms-full.txt](${BASE_URL}/llms-full.txt). Use this for deep context, RAG pipelines, or when you need the complete content of a specific page.`
  );
  lines.push('');

  return lines.join('\n');
};

// Build the llms-full.txt content (full stripped text of all docs)
const buildLlmsFullTxt = (docs) => {
  const sections = [];

  sections.push('# Push Chain — Full Documentation\n');
  sections.push(
    'This file contains the full text of all Push Chain documentation pages.\n'
  );

  for (const doc of docs) {
    sections.push(`\n---\n`);
    sections.push(`# ${doc.title}`);
    sections.push(`URL: ${doc.url}`);
    if (doc.description) sections.push(`> ${doc.description}`);
    sections.push('');
    sections.push(doc.strippedContent);
  }

  return sections.join('\n');
};

// Main
export const buildLlmsPreseed = async () => {
  console.log(chalk.cyan('\n🤖 Gathering docs for llms-preseed.txt...'));

  const docs = await gatherDocs();
  console.log(chalk.gray(`   Found ${docs.length} docs`));

  const blogPosts = await gatherBlogPosts();
  console.log(chalk.gray(`   Found ${blogPosts.length} recent blog posts`));

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const llmsTxt = buildLlmsTxt(docs, blogPosts);
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'llms-preseed.txt'),
    llmsTxt,
    'utf-8'
  );
  console.log(chalk.green('✅ Generated static/llms-preseed.txt'));

  const llmsFullTxt = buildLlmsFullTxt(docs);
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'llms-full.txt'),
    llmsFullTxt,
    'utf-8'
  );
  console.log(chalk.green('✅ Generated static/llms-full.txt'));
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildLlmsPreseed().catch((err) => {
    console.error(chalk.red('❌ Failed to generate llms-preseed.txt:'), err);
    process.exit(1);
  });
}
