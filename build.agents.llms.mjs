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
const MAX_BLOG_POSTS = 5;

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

// Gather recent blog posts (mirrors logic in build.agents.preseed.mjs)
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

// Build llms.txt — static sections hardcoded, workflows and blog posts dynamic
const buildLlmsTxt = async (workflows, blogPosts) => {
  const lines = [];

  // ── Header ──────────────────────────────────────────────────────────────
  lines.push('# Push Chain');
  lines.push('');
  lines.push(
    '> Push Chain is a universal, shared-state Layer 1 blockchain. Developers deploy once on Push Chain and reach users from any EVM or non-EVM chain. Users transact from their home chain using any supported token — no bridging, no network switching.'
  );
  lines.push('');

  // ── Who This Is For ──────────────────────────────────────────────────────
  lines.push('## Who This Is For');
  lines.push('');
  lines.push('- Developers building universal dApps with the Push Chain SDK');
  lines.push(
    '- AI coding assistants and agents executing SDK tasks via Cursor, Windsurf, or Claude Code'
  );
  lines.push(
    '- RAG pipelines and retrieval systems indexing Push Chain documentation'
  );
  lines.push('');

  // ── Key Concepts ─────────────────────────────────────────────────────────
  lines.push('## Key Concepts');
  lines.push('');
  lines.push(
    "- **Universal Origin Account (UOA)**: The user's native wallet on their home chain (e.g. MetaMask on Ethereum, Phantom on Solana)."
  );
  lines.push(
    '- **Universal Executor Account (UEA)**: A deterministic smart account on Push Chain derived from the UOA. Executes transactions on behalf of the user.'
  );
  lines.push(
    '- **Chain Executor Account (CEA)**: A deterministic smart account on an external chain (e.g. Ethereum Sepolia) derived from the UEA. Enables Push Chain to execute transactions on external chains.'
  );
  lines.push(
    '- **Universal Transaction**: A single SDK call that routes funds and execution from any origin chain to Push Chain or an external target.'
  );
  lines.push(
    '- **Route 1** — Push Chain native: UOA → UEA → Push Chain contract.'
  );
  lines.push(
    '- **Route 2** — External chain target: UOA → UEA → CEA → external chain contract.'
  );
  lines.push(
    '- **Route 3** — CEA origin: UOA on external chain → CEA → Push Chain.'
  );
  lines.push('');

  // ── Packages ─────────────────────────────────────────────────────────────
  lines.push('## Packages');
  lines.push('');
  lines.push(
    '- `@pushchain/core` — SDK for backend, scripts, bots, and automation. https://npmjs.com/package/@pushchain/core'
  );
  lines.push(
    '- `@pushchain/ui-kit` — React components for wallet connection and universal transactions. https://npmjs.com/package/@pushchain/ui-kit'
  );
  lines.push('');

  // ── Network ───────────────────────────────────────────────────────────────
  lines.push('## Network (Testnet)');
  lines.push('');
  lines.push('- Chain: Push Chain Donut Testnet');
  lines.push('- Chain ID: 42101');
  lines.push('- RPC URL: https://evm.donut.rpc.push.org/');
  lines.push('- Block Explorer: https://donut.push.network');
  lines.push(`- Faucet: ${BASE_URL}/docs/chain/donut-testnet/`);
  lines.push('');

  // ── Start Here ────────────────────────────────────────────────────────────
  lines.push('## Start Here');
  lines.push('');
  lines.push(
    `- [Docs](${BASE_URL}/docs/chain/): Full Push Chain documentation index.`
  );
  lines.push(
    `- [Quickstart](${BASE_URL}/docs/chain/quickstart/): Run your first universal transaction in under 5 minutes.`
  );
  lines.push(
    `- [Important Concepts](${BASE_URL}/docs/chain/important-concepts/): UOA, UEA, CEA, universal transactions, and routing explained.`
  );
  lines.push(
    `- [Chain Configuration](${BASE_URL}/docs/chain/setup/chain-config/): RPC URLs, chain IDs, block explorers, and contract addresses.`
  );
  lines.push(
    `- [For AI Agents & LLMs](${BASE_URL}/docs/chain/for-ai-agents/): Code editor setup, context files, and the full agent layer explained.`
  );
  lines.push('');

  // ── Add to Your AI Editor ─────────────────────────────────────────────────
  lines.push('## Add to Your AI Editor');
  lines.push('');
  lines.push(
    `- Cursor: Settings → Features → Docs → Add new doc → ${BASE_URL}/llms.txt`
  );
  lines.push(`- Windsurf: Add to Cascade window → @docs:${BASE_URL}/llms.txt`);
  lines.push(
    `- Claude Code: Add to CLAUDE.md or prompt → ${BASE_URL}/llms.txt`
  );
  lines.push(
    `- Full context (large context window): ${BASE_URL}/llms-full.txt`
  );
  lines.push('');

  // ── Agent Layer ───────────────────────────────────────────────────────────
  lines.push('## Agent Layer');
  lines.push('');
  lines.push(
    'Prefer these structured resources over the full docs tree for execution tasks:'
  );
  lines.push('');
  lines.push(
    `- [Agent Index](${BASE_URL}/agents/index.json): Discovery map listing every agent file, its purpose, and the recommended traversal order.`
  );
  lines.push(
    `- [Capabilities](${BASE_URL}/agents/capabilities.json): Every SDK capability with inputs, outputs, and method signatures.`
  );
  lines.push(
    `- [SDK Capabilities](${BASE_URL}/agents/sdk-capabilities.json): Full SDK namespace map — all namespaces, methods, and advanced arguments including prepareTransaction and executeTransactions.`
  );
  lines.push(
    `- [Supported Chains](${BASE_URL}/agents/supported-chains.json): Verified chain list with CAIP-2 IDs, chain IDs, RPC URLs, block explorers, and Universal Gateway contract addresses.`
  );
  lines.push(
    `- [Decision Tree](${BASE_URL}/agents/decision-tree.json): Branching logic to select the right capability from user intent.`
  );
  lines.push(
    `- [Task Router](${BASE_URL}/agents/task-router.md): Plain-language routing guide mapping common goals to capabilities and workflows.`
  );
  lines.push(
    `- [Error Catalog](${BASE_URL}/agents/errors.json): All known SDK errors with recovery actions.`
  );
  lines.push(
    `- [MCP Candidates](${BASE_URL}/agents/mcp-candidates.json): Candidate MCP tool definitions for agent tool-use frameworks (Claude, Cursor Agent, etc.).`
  );
  lines.push(
    `- [Schemas](${BASE_URL}/agents/schemas/index.json): JSON schemas for all SDK request and response types including universal transaction, signer, and chain config.`
  );
  lines.push(
    `- [Examples](${BASE_URL}/agents/examples/index.json): 60+ minimal, self-contained TypeScript code snippets ready to execute.`
  );
  lines.push(
    `- [Retrieval Map](${BASE_URL}/agents/retrieval-map.json): Maps every capability to its authoritative documentation source — use for RAG grounding.`
  );
  lines.push('');

  // ── Canonical Workflows (dynamic) ─────────────────────────────────────────
  lines.push('## Canonical Workflows');
  lines.push('');
  for (const wf of workflows) {
    const url = `${BASE_URL}/${wf.file}`;
    const desc = wf.purpose ? `: ${wf.purpose}` : '';
    lines.push(`- [${wf.name}](${url})${desc}`);
  }
  lines.push('');

  // ── Full Context ──────────────────────────────────────────────────────────
  lines.push('## Full Context');
  lines.push('');
  lines.push('For long-context retrieval, deep reference, and RAG indexing:');
  lines.push('');
  lines.push(`- ${BASE_URL}/llms-full.txt`);
  lines.push('');

  // ── Optional: Blog ────────────────────────────────────────────────────────
  lines.push('## Optional');
  lines.push('');
  lines.push('### Blog — Recent Posts');
  lines.push('');
  if (blogPosts.length > 0) {
    for (const post of blogPosts) {
      lines.push(`- [${post.title}](${post.url})`);
    }
  }
  lines.push(`- [Blog index](${BASE_URL}/blog/)`);
  lines.push('');

  return lines.join('\n');
};

export const buildAgentsLlms = async () => {
  console.log(
    chalk.cyan('\n📄 Generating static/llms.txt from agents layer...')
  );

  const workflows = await loadWorkflows();

  const usingFallback = workflows === FALLBACK_WORKFLOWS;

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
