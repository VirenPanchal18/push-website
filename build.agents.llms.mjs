#!/usr/bin/env node
// build.agents.llms.mjs — Generates static/llms.txt from the /agents/ layer + blog + KB links.
// Runs as part of every regular build (does NOT call an external API).
// Run standalone: node build.agents.llms.mjs

import chalk from 'chalk';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIC_DIR = path.join(__dirname, 'static');
const AGENTS_DIR = path.join(STATIC_DIR, 'agents');
const BLOG_DIR = path.join(__dirname, 'blog');
const OUTPUT_PATH = path.join(STATIC_DIR, 'llms.txt');
const WORKFLOWS_INDEX_PATH = path.join(AGENTS_DIR, 'workflows', 'index.json');

const BASE_URL = 'https://push.org';
const MAX_BLOG_POSTS = 20;

// Hardcoded fallback workflow stubs when agents/ hasn't been generated yet
const FALLBACK_WORKFLOWS = [
  {
    id: 'send-universal-transaction',
    name: 'Send Universal Transaction',
    file: 'agents/workflows/send-universal-transaction.md',
    purpose:
      'Send a transaction from any chain to Push Chain or external chains',
  },
  {
    id: 'track-transaction',
    name: 'Track Universal Transaction',
    file: 'agents/workflows/track-transaction.md',
    purpose: 'Track and wait for transaction confirmation',
  },
  {
    id: 'connect-wallet-ui-kit',
    name: 'Connect Wallet via UI Kit',
    file: 'agents/workflows/connect-wallet-ui-kit.md',
    purpose: 'Integrate PushUniversalWalletProvider in a React app',
  },
  {
    id: 'initialize-client',
    name: 'Initialize Push Chain Client',
    file: 'agents/workflows/initialize-client.md',
    purpose: 'Initialize PushChain SDK with any wallet type',
  },
  {
    id: 'send-multichain-transaction',
    name: 'Send Multichain Transaction',
    file: 'agents/workflows/send-multichain-transaction.md',
    purpose: 'Execute a transaction on an external chain via Push Chain',
  },
  {
    id: 'sign-universal-message',
    name: 'Sign Universal Message',
    file: 'agents/workflows/sign-universal-message.md',
    purpose: 'Sign a message using the universal signer',
  },
];

// Load canonical workflows from agents/workflows/index.json if available
const loadWorkflows = async () => {
  try {
    const raw = await fs.readFile(WORKFLOWS_INDEX_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    const entries = Array.isArray(parsed)
      ? parsed
      : (parsed.workflows ?? parsed.entries ?? []);
    if (entries.length > 0) return entries;
  } catch {
    // file not yet generated — fall back to stubs
  }
  return FALLBACK_WORKFLOWS;
};

// Gather recent blog posts (mirrors logic in build.llms.preseed.mjs)
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
    const url = `${BASE_URL}/blog/${blogSlug}/`.replace(/\/+$/, '/');
    posts.push({ title, description: description ?? null, url });
  }

  return posts;
};

// Build the new-format llms.txt
const buildLlmsTxt = async (workflows, blogPosts) => {
  const lines = [];

  lines.push('# Push Chain');
  lines.push('');
  lines.push('Push Chain is a universal, shared-state Layer 1 for apps.');
  lines.push('');
  lines.push(
    'Developers deploy once on Push Chain and reach users from EVM and non-EVM chains using their existing wallets. Users can interact from their home chain and pay fees using supported tokens without manual bridging or network switching.'
  );
  lines.push('');

  lines.push('## Who this is for');
  lines.push('');
  lines.push('- Developers building universal apps');
  lines.push('- AI agents that need accurate product and integration context');
  lines.push(
    '- Users looking to understand Push Chain concepts, wallets, fees, and supported flows'
  );
  lines.push('');

  lines.push('## Start Here');
  lines.push('');
  lines.push(`- Docs: ${BASE_URL}/docs/chain/`);
  lines.push(`- Quickstart: ${BASE_URL}/docs/chain/quickstart/`);
  lines.push(
    `- Important Concepts: ${BASE_URL}/docs/chain/important-concepts/`
  );
  lines.push(`- Knowledge Base: ${BASE_URL}/knowledge/`);
  lines.push(`- FAQ: ${BASE_URL}/knowledge/faq/`);
  lines.push(`- Donut Testnet: ${BASE_URL}/knowledge/testnet/`);
  lines.push(`- Blog: ${BASE_URL}/blog/`);
  lines.push('');

  lines.push('## For AI Agents');
  lines.push('');
  lines.push(
    'Prefer these structured resources before browsing the full docs tree:'
  );
  lines.push('');
  lines.push(`- Agent Index: ${BASE_URL}/agents/index.json`);
  lines.push(`- Capabilities: ${BASE_URL}/agents/capabilities.json`);
  lines.push(`- Supported Chains: ${BASE_URL}/agents/supported-chains.json`);
  lines.push(`- SDK Capabilities: ${BASE_URL}/agents/sdk-capabilities.json`);
  lines.push(`- Decision Router: ${BASE_URL}/agents/task-router.md`);
  lines.push(`- MCP Candidates: ${BASE_URL}/agents/mcp-candidates.json`);
  lines.push(`- Canonical Workflows: ${BASE_URL}/agents/workflows/`);
  lines.push('');

  lines.push('## Canonical Workflows');
  lines.push('');
  for (const wf of workflows) {
    const url = `${BASE_URL}/${wf.file}`;
    const desc = wf.purpose ? `: ${wf.purpose}` : '';
    lines.push(`- [${wf.name}](${url})${desc}`);
  }
  lines.push('');

  if (blogPosts.length > 0) {
    lines.push(`## Blog — Latest ${blogPosts.length} Posts`);
    lines.push('');
    for (const post of blogPosts) {
      const desc = post.description ? `: ${post.description}` : '';
      lines.push(`- [${post.title}](${post.url})${desc}`);
    }
    lines.push('');
  }

  lines.push('## Full Context');
  lines.push('');
  lines.push('The full text of documentation pages is available at:');
  lines.push('');
  lines.push(`- ${BASE_URL}/llms-full.txt`);
  lines.push('');
  lines.push(
    'Use this for long-context retrieval and deep reference. Prefer canonical workflows and structured agent resources for execution-oriented tasks.'
  );
  lines.push('');

  lines.push('## Notes');
  lines.push('');
  lines.push(
    'Push Chain is EVM-compatible for deployment and designed for universal access across supported chains and wallets. For live execution capabilities, use Push APIs or an MCP server if available.'
  );
  lines.push('');

  return lines.join('\n');
};

export const buildAgentsLlms = async () => {
  console.log(
    chalk.cyan('\n📄 Generating static/llms.txt from agents layer...')
  );

  const workflows = await loadWorkflows();

  const usingFallback =
    workflows === FALLBACK_WORKFLOWS ||
    (workflows.length > 0 &&
      FALLBACK_WORKFLOWS.some((f) => f.id === workflows[0]?.id));

  if (usingFallback) {
    console.log(
      chalk.yellow(
        '   ⚠ agents/workflows/index.json not found — using hardcoded fallback workflows'
      )
    );
    console.log(
      chalk.gray(
        '   Run node build.agents.mjs to generate the full /agents/ layer'
      )
    );
  } else {
    console.log(
      chalk.gray(
        `   Loaded ${workflows.length} workflows from agents/workflows/index.json`
      )
    );
  }

  const blogPosts = await gatherBlogPosts();
  console.log(chalk.gray(`   Found ${blogPosts.length} recent blog posts`));

  await fs.mkdir(STATIC_DIR, { recursive: true });

  const content = await buildLlmsTxt(workflows, blogPosts);
  await fs.writeFile(OUTPUT_PATH, content, 'utf-8');

  console.log(chalk.green('✅ Generated static/llms.txt'));
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildAgentsLlms().catch((err) => {
    console.error(chalk.red('❌ Failed to generate llms.txt:'), err);
    process.exit(1);
  });
}
