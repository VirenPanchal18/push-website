#!/usr/bin/env node
// build.agents.mjs — Generates static/agents/ via 10 phased Claude API calls.
// Prerequisites: run build.llms.preseed.mjs first so static/llms-preseed.txt exists.
// Run standalone: node build.agents.mjs
// Env: WINDSURF_API_KEY (tried first) | AGENTS_GENERATION_AI_CLAUDE (fallback)
//      AI_AGENTS_MODEL (model override, default: claude-opus-4-5)

import chalk from 'chalk';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIC_DIR = path.join(__dirname, 'static');
const AGENTS_DIR = path.join(STATIC_DIR, 'agents');
const LLMS_PRESEED_PATH = path.join(STATIC_DIR, 'llms-preseed.txt');
const LLMS_FULL_PATH = path.join(STATIC_DIR, 'llms-full.txt');
const META_PATH = path.join(__dirname, 'llmsmeta.json');

// Max context chars included per phase prompt (keeps tokens manageable)
const MAX_CONTEXT_CHARS = 80000;

// ─── API resolution ──────────────────────────────────────────────────────────

function resolveApiConfig() {
  const claudeKey = process.env.AGENTS_GENERATION_AI_CLAUDE;
  const windsurfKey = process.env.WINDSURF_API_KEY;
  const model =
    process.env.AI_AGENTS_MODEL ||
    process.env.CLOUD_AI_MODEL ||
    'claude-opus-4-5';

  // AGENTS_GENERATION_AI_CLAUDE takes priority (dedicated funded key)
  if (claudeKey) {
    return {
      primary: { apiKey: claudeKey, model, provider: 'anthropic' },
      fallback: windsurfKey
        ? { apiKey: windsurfKey, model, provider: 'windsurf' }
        : null,
    };
  }
  if (windsurfKey) {
    return {
      primary: { apiKey: windsurfKey, model, provider: 'windsurf' },
      fallback: null,
    };
  }
  throw new Error(
    'No API key found. Set AGENTS_GENERATION_AI_CLAUDE or WINDSURF_API_KEY in .env'
  );
}

// ─── Claude API call ─────────────────────────────────────────────────────────

// Returns true for errors where switching to a different key might help
function isFallbackWorthy(status, message) {
  if (status === 400 && message.includes('credit balance')) return true;
  if (status === 401) return true;
  if (status === 403) return true;
  return false;
}

async function callClaudeWithKey(
  apiKey,
  model,
  systemPrompt,
  userMessage,
  maxTokens
) {
  const timeout = parseInt(process.env.AI_REQUEST_TIMEOUT) || 300000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      const err = new Error(`API ${response.status}: ${errText.slice(0, 400)}`);
      err.status = response.status;
      err.body = errText;
      throw err;
    }

    const data = await response.json();
    return data.content[0].text;
  } finally {
    clearTimeout(timer);
  }
}

async function callClaude(
  config,
  systemPrompt,
  userMessage,
  maxTokens = 16000
) {
  try {
    return await callClaudeWithKey(
      config.primary.apiKey,
      config.primary.model,
      systemPrompt,
      userMessage,
      maxTokens
    );
  } catch (err) {
    if (config.fallback && isFallbackWorthy(err.status, err.body || '')) {
      console.warn(
        chalk.yellow(
          `    ↩ Primary key failed (${err.status}) — retrying with fallback key (${config.fallback.provider})`
        )
      );
      return await callClaudeWithKey(
        config.fallback.apiKey,
        config.fallback.model,
        systemPrompt,
        userMessage,
        maxTokens
      );
    }
    throw err;
  }
}

// ─── File parsing ─────────────────────────────────────────────────────────────

function parseFilesFromResponse(text) {
  const files = [];
  const regex = /<file\s+path="([^"]+)">([\s\S]*?)<\/file>/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    files.push({ path: match[1].trim(), content: match[2].trim() });
  }
  return files;
}

async function writeAgentFiles(files) {
  const written = [];
  for (const { path: relPath, content } of files) {
    const fullPath = path.join(STATIC_DIR, relPath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf-8');
    console.log(chalk.gray(`     ✓ ${relPath}`));
    written.push(relPath);
  }
  return written;
}

// ─── Context loading ─────────────────────────────────────────────────────────

async function loadContext() {
  let preseed = '';
  try {
    preseed = await fs.readFile(LLMS_PRESEED_PATH, 'utf-8');
  } catch {
    throw new Error(
      'static/llms-preseed.txt not found. Run: node build.llms.preseed.mjs first'
    );
  }

  // Load full docs for richer context (truncated)
  let full = '';
  try {
    full = await fs.readFile(LLMS_FULL_PATH, 'utf-8');
  } catch {
    console.warn(
      chalk.yellow('  ⚠ static/llms-full.txt not found, using preseed only')
    );
  }

  const combined = full ? `${preseed}\n\n---\n\n${full}` : preseed;
  return combined.slice(0, MAX_CONTEXT_CHARS);
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a principal AI systems architect generating the /agents/ layer for Push Chain.

Push Chain is the first True Universal Layer 1 blockchain, 100% EVM-compatible, enabling apps that work across every chain and wallet.

Canonical terminology (use exactly as written):
- UOA (Universal Origin Account): the source-chain wallet identity / controller
- UEA (Universal Executor Account): deterministic execution account on Push Chain, derived from UOA
- CEA (Chain Executor Account): execution account on external chains, represents UEA on that chain
- UniversalAccount: chain-agnostic address in CAIP-10-inspired format (e.g. eip155:11155111:0x...)
- UniversalSigner: UniversalAccount extended with signing. PushChain.utils.signer.toUniversal(signer) for EVM/Viem, PushChain.utils.signer.toUniversalFromKeypair(keypair, {chain, library}) for Solana
- PushChainClient: returned by PushChain.initialize(universalSigner, {network}). Has .universal, .orchestrator, .explorer namespaces
- Universal Gateway (UG): set of source-chain contracts that route transactions to Push Chain
- Fee abstraction: users pay gas in native tokens (ETH, SOL); no PC token required
- SDK packages: @pushchain/core (JS/TS), @pushchain/ui-kit (React)

Canonical routes in sendTransaction:
- Route 1: to is plain address → executes on Push Chain
- Route 2: to is {address, chain} → executes on external chain  
- Route 3: to is plain address + from.chain set → uses CEA as origin

Output rules:
1. Output ONLY files using this exact format (no prose outside tags):
<file path="agents/path/to/file.ext">
content here
</file>

2. JSON files must be valid JSON (no trailing commas, no JS comments inside JSON).
3. Mark undocumented fields: "status": "undocumented". Mark inferred fields: "status": "inferred".
4. Be execution-focused, low-ambiguity. Avoid marketing language.
5. Do not invent SDK method signatures not present in the documentation.`;

// ─── Phase prompts ────────────────────────────────────────────────────────────

function phasePrompt(phaseInstructions, context) {
  return `${phaseInstructions}

---
PUSH CHAIN DOCUMENTATION CONTEXT:
${context}`;
}

const PHASES = [
  {
    id: 1,
    name: 'Discovery Layer',
    maxTokens: 8000,
    build: (ctx) =>
      phasePrompt(
        `Generate the Discovery Layer — 2 files that help an LLM or agent orient itself.

FILE 1: agents/index.json
A machine-readable index of the /agents/ package. Must include:
- "description": what Push Chain is in 1-2 execution-focused sentences
- "version": "1.0.0"
- "generated": ISO timestamp placeholder "__GENERATED__"
- "start_here": {
    "developer": "agents/workflows/send-universal-transaction.md",
    "agent": "agents/capabilities.json",
    "retrieval_system": "agents/retrieval-map.json"
  }
- "files": array of objects, each with "path", "purpose", "type"
  IMPORTANT: Use ONLY the exact paths listed below. Do NOT invent subdirectories.
  Every file in this layer lives either at agents/ root or in agents/workflows/, agents/schemas/, or agents/examples/.

  Exact paths to include (fill in purpose and type for each):
  Discovery:    agents/index.json, agents/README.md
  Capability:   agents/capabilities.json, agents/sdk-capabilities.json, agents/supported-chains.json, agents/feature-matrix.json, agents/constants.json
  Decision:     agents/decision-tree.json, agents/task-router.md
  Error:        agents/errors.json, agents/recovery-playbook.md
  MCP:          agents/mcp-candidates.json
  Governance:   agents/source-freshness.json, agents/changelog.json
  Retrieval:    agents/retrieval-map.json
  Workflows:    agents/workflows/index.json, agents/workflows/initialize-client.md,
                agents/workflows/send-universal-transaction.md, agents/workflows/send-multichain-transaction.md,
                agents/workflows/track-transaction.md, agents/workflows/connect-wallet-ui-kit.md,
                agents/workflows/sign-universal-message.md
  Schemas:      agents/schemas/index.json, agents/schemas/universal-account.json,
                agents/schemas/universal-signer.json, agents/schemas/universal-transaction-request.json,
                agents/schemas/universal-transaction-response.json, agents/schemas/transaction-receipt.json,
                agents/schemas/chain-config.json, agents/schemas/error-object.json
  Examples:     agents/examples/index.json  ← FULL index of all 60+ examples (consult this for complete list)
                agents/examples/initialize-client-ethers.md,
                agents/examples/initialize-client-solana.md, agents/examples/send-transaction-push-chain.md,
                agents/examples/send-transaction-external-chain.md, agents/examples/track-transaction.md,
                agents/examples/wallet-provider-react.md, agents/examples/sign-message.md

- "canonical_workflows": [
    { "name": "Initialize and Send First Transaction", "path": "agents/workflows/send-universal-transaction.md", "description": "..." },
    { "name": "Send Transaction to External Chain (Route 2)", "path": "agents/workflows/send-multichain-transaction.md", "description": "..." },
    { "name": "Initialize Client from Any Wallet", "path": "agents/workflows/initialize-client.md", "description": "..." }
  ]
- "authority_ranking": array of { source, urls, authority (1=highest), notes }

FILE 2: agents/README.md
An agent-oriented README (not human marketing docs). Must include:
- H1: Push Chain — Agent Interface
- What Push Chain does in execution terms (deploy once, reach all chains, fee abstraction, wallet abstraction)
- How to navigate /agents/: which file to read first for which task
- Quick decision guide: 5 common agent tasks mapped to the right file
- Key SDK entry points (PushChain.initialize, sendTransaction, trackTransaction)
- Terminology reference: UOA/UEA/CEA in one table`,
        ctx
      ),
    expectedFiles: ['agents/index.json', 'agents/README.md'],
  },

  {
    id: 2,
    name: 'Capability Layer',
    maxTokens: 16000,
    build: (ctx) =>
      phasePrompt(
        `Generate the Capability Layer — 5 files defining what Push Chain can do.

FILE 1: agents/constants.json
All PushChain.CONSTANTS.* values as a structured reference. Must include:
- "PUSH_NETWORK": { "TESTNET": "...", "MAINNET": "..." }
- "CHAIN": flat object of all chain constant keys → CAIP-2 values (e.g. PUSH_TESTNET_DONUT → eip155:42101, ETHEREUM_SEPOLIA → eip155:11155111, SOLANA_DEVNET → solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1, etc.)
- "LIBRARY": all supported library constants (ETHERS_V5, ETHERS_V6, VIEM, SOLANA_WEB3JS, etc.)
- "MOVEABLE": { "TOKEN": { ... } } — all moveable token constants
Only include constants present in the documentation. Mark any inferred with "status": "inferred".

FILE 2: agents/capabilities.json
Array of capability objects. Each must have:
- "id": snake_case identifier
- "name": human name
- "description": 1 sentence, execution-focused
- "actor": array of "developer"|"end_user"|"agent"|"backend"|"browser_agent"
- "operation": "read"|"write"|"simulation"|"tracking"
- "prerequisites": array of strings
- "inputs": array of {name, type, required, description}
- "outputs": array of {name, type, description}
- "sdk_method": primary method string or null
- "auth_required": boolean
- "safe_for_autonomous_execution": boolean
- "mcp_candidate": boolean
- "docs_url": canonical doc URL
- "stability": "stable"|"beta"|"experimental"|"undocumented"

Include at minimum: initialize_client, create_universal_signer, send_universal_transaction, send_multichain_transaction, contract_initiated_multichain, track_transaction, sign_universal_message, read_blockchain_state, connect_wallet_ui, use_wallet_provider, initialize_evm_client, get_constants, use_utility_functions, use_contract_helpers

FILE 3: agents/supported-chains.json
Object with:
- "testnet": array of chain objects
- "mainnet": array of chain objects (mark as "status": "announced" if not yet live)
Each chain object: { "name", "namespace", "constant", "type": "push_native"|"evm"|"non_evm", "fee_token", "notes" }
Use data from the Important Concepts chain namespace table.

FILE 4: agents/sdk-capabilities.json
Structured map of SDK namespaces. For each namespace (PushChain.utils.signer, PushChain.utils.account, PushChain.utils.helpers, pushChainClient.universal, pushChainClient.explorer):
- "namespace": dotted path
- "methods": array of {name, signature, description, returns, safe_for_autonomous_execution}

FILE 5: agents/feature-matrix.json
Matrix of features by actor type. Structure:
{
  "features": [ { "feature", "developer", "end_user", "agent", "backend" } ]
}
Use true/false/partial for each cell. Include: universal_transactions, fee_abstraction, wallet_abstraction, multichain_execution, contract_initiated_execution, evm_compatibility, solana_support, track_transaction, sign_message, read_state, ui_kit, mcp_tools`,
        ctx
      ),
    expectedFiles: [
      'agents/constants.json',
      'agents/capabilities.json',
      'agents/supported-chains.json',
      'agents/sdk-capabilities.json',
      'agents/feature-matrix.json',
    ],
  },

  {
    id: 3,
    name: 'Workflow Index',
    maxTokens: 6000,
    build: (ctx) =>
      phasePrompt(
        `Generate agents/workflows/index.json — the manifest of all canonical workflows.

Each workflow entry must have:
- "id": kebab-case
- "name": human name
- "file": relative path like "agents/workflows/send-universal-transaction.md"
- "purpose": 1 sentence
- "actor": primary actor type
- "operation": "read"|"write"|"simulation"|"tracking"
- "prerequisites": array of other workflow IDs or setup steps
- "deterministic": boolean
- "safe_for_autonomous_execution": boolean
- "mcp_mapping_candidates": array of step names that could become MCP tools

Include entries for: initialize-client, create-universal-signer, send-universal-transaction, send-multichain-transaction, contract-initiated-multichain-execution, track-transaction, sign-universal-message, read-blockchain-state, connect-wallet-ui-kit, use-universal-wallet-provider, initialize-evm-client, use-contract-helpers, use-utility-functions, constants-reference, configure-dev-environment`,
        ctx
      ),
    expectedFiles: ['agents/workflows/index.json'],
  },

  {
    id: 4,
    name: 'Workflow Files',
    maxTokens: 16000,
    build: (ctx) =>
      phasePrompt(
        `Generate the 6 most critical canonical workflow markdown files for /agents/workflows/.

For each workflow file include these sections exactly:
## Purpose
## When to Use
## Prerequisites
## Inputs
(table: Parameter | Type | Required | Description)
## Steps
(numbered, exact SDK calls with real method signatures)
## Expected Output
## Common Failures
(table: Error | Cause | Recovery)
## Agent Notes
(planning tips for autonomous execution)
## MCP Mapping Candidates
(list of steps that could become MCP tools later)

Generate these 6 files (using exact method signatures from the Push Chain docs):

1. agents/workflows/initialize-client.md — PushChain.initialize(universalSigner, {network}) covering all signer types (ethers, viem, solana)
2. agents/workflows/send-universal-transaction.md — pushChainClient.universal.sendTransaction({to, value, data, from}) covering all 3 routes
3. agents/workflows/send-multichain-transaction.md — send to external chain via {address, chain} target
4. agents/workflows/track-transaction.md — trackTransaction(hash, opts) and tx.wait() comparison  
5. agents/workflows/connect-wallet-ui-kit.md — PushUniversalWalletProvider, PushUniversalAccountButton, usePushChainClient, usePushWalletContext
6. agents/workflows/sign-universal-message.md — pushChainClient.universal.signMessage(message)`,
        ctx
      ),
    expectedFiles: [
      'agents/workflows/initialize-client.md',
      'agents/workflows/send-universal-transaction.md',
      'agents/workflows/send-multichain-transaction.md',
      'agents/workflows/track-transaction.md',
      'agents/workflows/connect-wallet-ui-kit.md',
      'agents/workflows/sign-universal-message.md',
    ],
  },

  {
    id: 5,
    name: 'Schema Layer',
    maxTokens: 16000,
    build: (ctx) =>
      phasePrompt(
        `Generate the Schema Layer — JSON Schema definitions for core Push Chain data structures.

FILE 1: agents/schemas/index.json
List of all schema files: [ { "name", "file", "description", "authority": "documented"|"inferred" } ]

Then generate these individual schema files as JSON Schema (draft-07):

FILE 2: agents/schemas/universal-transaction-request.json
Schema for the object passed to sendTransaction(). Include: to (string or object), value (BigInt as string), data (hex string), from (object with chain).

FILE 3: agents/schemas/universal-transaction-response.json
Schema for the TxResponse object returned by sendTransaction(). Include: hash, wait() method reference, and any documented fields.

FILE 4: agents/schemas/transaction-receipt.json
Schema for receipt from tx.wait() or trackTransaction result. Include: blockNumber, status, hash, gasUsed, logs.

FILE 5: agents/schemas/universal-account.json
Schema for UniversalAccount object: address, chain (CAIP-10 namespace string).

FILE 6: agents/schemas/universal-signer.json
Schema for UniversalSigner: extends UniversalAccount, adds signMessage and signAndSendTransaction.

FILE 7: agents/schemas/chain-config.json
Schema for chain configuration entry: name, namespace, rpcUrls, blockExplorer, nativeCurrency.

FILE 8: agents/schemas/error-object.json
Schema for SDK error objects: message, code (if documented), cause.

For undocumented fields use: "description": "inferred — not explicitly documented"`,
        ctx
      ),
    expectedFiles: [
      'agents/schemas/index.json',
      'agents/schemas/universal-transaction-request.json',
      'agents/schemas/universal-transaction-response.json',
      'agents/schemas/transaction-receipt.json',
      'agents/schemas/universal-account.json',
      'agents/schemas/universal-signer.json',
      'agents/schemas/chain-config.json',
      'agents/schemas/error-object.json',
    ],
  },

  {
    id: 6,
    name: 'Error & Recovery Layer',
    maxTokens: 12000,
    build: (ctx) =>
      phasePrompt(
        `Generate the Error & Recovery Layer — 2 files.

FILE 1: agents/errors.json
Array of error objects. Each must have:
- "id": snake_case
- "name": short error name
- "description": what happened
- "likely_cause": specific technical cause
- "detection_signal": how code/agent detects this
- "user_visible_symptom": what the user sees
- "machine_recovery": automated recovery steps
- "escalation": when to surface to human
- "confidence": "documented"|"inferred"|"likely"

Cover at minimum:
- missing_universal_signer (no signer passed to initialize)
- invalid_network (wrong PUSH_NETWORK constant)
- unsupported_chain (chain not in supported list)
- signature_mismatch (signer doesn't match expected format)
- insufficient_fee_balance (not enough native token for fee)
- invalid_tx_hash (wrong format for trackTransaction)
- tx_timeout (trackTransaction times out)
- tx_reverted (contract execution reverted)
- rpc_unreachable (RPC URL not responding)
- uea_not_deployed (UEA doesn't exist yet for this UOA)
- chain_not_supported_for_cee (CEA route requested for unsupported chain)
- wallet_connection_rejected (user rejected wallet connection)
- invalid_to_address (malformed address in sendTransaction)

FILE 2: agents/recovery-playbook.md
Structured playbook: for each major failure category, provide exact recovery steps an agent should take autonomously vs. escalate to user. Include decision tree logic for the most common failure paths.`,
        ctx
      ),
    expectedFiles: ['agents/errors.json', 'agents/recovery-playbook.md'],
  },

  {
    id: 7,
    name: 'Decision Layer',
    maxTokens: 12000,
    build: (ctx) =>
      phasePrompt(
        `Generate the Decision Layer — 2 files that help agents choose the right action.

FILE 1: agents/decision-tree.json
A structured decision tree. Format:
{
  "version": "1.0.0",
  "trees": [
    {
      "id": "choose_transaction_route",
      "question": "...",
      "branches": [
        { "condition": "...", "action": "...", "next": null | "tree_id" }
      ]
    }
  ]
}

Include trees for:
1. choose_transaction_route — Route 1 vs Route 2 vs Route 3 in sendTransaction
2. choose_signer_type — ethers vs viem vs solana vs custom
3. choose_integration_path — UI Kit vs raw SDK
4. handle_transaction_failure — what to do when sendTransaction or trackTransaction fails
5. choose_tracking_method — tx.wait() vs trackTransaction()
6. fee_payment_decision — user has native token vs needs fee abstraction path

FILE 2: agents/task-router.md
Markdown decision guide. For each common agent task, give the exact recommended action with reasoning:
- Move value between chains → which capability, which route, which method
- Sign a message for off-chain verification → exact method
- Check if a transaction confirmed → tx.wait() vs trackTransaction + when to use each
- Integrate wallet for users in a React app → UI Kit path
- Read contract state without signing → read-only client initialization
- Execute contract on external chain → multichain transaction flow
- Pay gas without holding PC tokens → fee abstraction explanation
- Handle a user on Solana interacting with a Push Chain contract → exact flow

Each entry: Problem | Recommended Approach | SDK Method | Caveats`,
        ctx
      ),
    expectedFiles: ['agents/decision-tree.json', 'agents/task-router.md'],
  },

  {
    id: 8,
    name: 'Retrieval Layer',
    maxTokens: 8000,
    build: (ctx) =>
      phasePrompt(
        `Generate agents/retrieval-map.json — maps every major task/capability to its authoritative source.

Structure:
{
  "version": "1.0.0",
  "base_url": "https://push.org",
  "entries": [
    {
      "task": "descriptive task name",
      "capability_id": "snake_case (matches capabilities.json)",
      "authoritative_sources": [ { "url", "type": "docs"|"blog"|"sdk", "confidence": "high"|"medium"|"low", "normative": true|false } ],
      "prefer_over": ["list of less authoritative alternatives"],
      "notes": "any retrieval guidance"
    }
  ]
}

Cover all capabilities from Phase 2. Rank official /docs/chain/ pages as normative=true. Blogs as normative=false. Include the full docs URLs constructed from the Push Chain docs structure.

Also include entries for:
- Push Chain core concepts (UEA, UOA, CEA, fee abstraction, wallet abstraction)
- Chain namespace reference
- SDK initialization
- Each major workflow`,
        ctx
      ),
    expectedFiles: ['agents/retrieval-map.json'],
  },

  {
    id: 9,
    name: 'Examples Layer',
    maxTokens: 14000,
    build: (ctx) =>
      phasePrompt(
        `Generate the Examples Layer — concise, executable code examples.

FILE 1: agents/examples/index.json
Array of example entries: [ { "id", "name", "file", "description", "sdk_methods_used": [], "chains_involved": [], "prerequisite_examples": [] } ]

Then generate these minimal, executable example files:

FILE 2: agents/examples/initialize-client-ethers.md
Minimal ethers v6 example initializing PushChain with Ethereum Sepolia wallet. Include full working code block.

FILE 3: agents/examples/initialize-client-solana.md
Minimal Solana Web3.js example initializing PushChain with Solana Devnet keypair. Include full working code block.

FILE 4: agents/examples/send-transaction-push-chain.md
Minimal example sending native value on Push Chain (Route 1). Include sendTransaction call and tx.wait().

FILE 5: agents/examples/send-transaction-external-chain.md
Minimal example sending transaction to external chain (Route 2) using {address, chain} target.

FILE 6: agents/examples/track-transaction.md
Minimal example using trackTransaction with waitForCompletion and progressHook.

FILE 7: agents/examples/wallet-provider-react.md
Minimal React example using PushUniversalWalletProvider + PushUniversalAccountButton + usePushChainClient.

FILE 8: agents/examples/sign-message.md
Minimal example using pushChainClient.universal.signMessage.

Each example file format:
## [Title]
## When to Use
## Code
\`\`\`typescript
// full working code
\`\`\`
## Key Points
(3-5 bullet points about important details)`,
        ctx
      ),
    expectedFiles: [
      'agents/examples/index.json',
      'agents/examples/initialize-client-ethers.md',
      'agents/examples/initialize-client-solana.md',
      'agents/examples/send-transaction-push-chain.md',
      'agents/examples/send-transaction-external-chain.md',
      'agents/examples/track-transaction.md',
      'agents/examples/wallet-provider-react.md',
      'agents/examples/sign-message.md',
    ],
  },

  {
    id: 10,
    name: 'MCP & Governance Layer',
    maxTokens: 12000,
    build: (ctx) =>
      phasePrompt(
        `Generate the MCP Readiness and Governance Layer — 3 files.

FILE 1: agents/mcp-candidates.json
Array of MCP tool candidates. Each must have:
- "tool_name": snake_case
- "purpose": 1 sentence
- "inputs": array of {name, type, required, description}
- "return_type": description of return
- "idempotent": boolean
- "read_only": boolean
- "state_changing": boolean
- "safety_risks": array of strings or []
- "user_confirmation_required": boolean
- "availability": "ready"|"candidate"|"future"
- "corresponding_sdk_method": string or null
- "corresponding_workflow": workflow ID or null
- "notes": any caveats

Include candidates for: get_supported_chains, initialize_push_client, estimate_fee (mark as candidate/undocumented if not in docs), build_universal_transaction, send_universal_transaction, track_universal_transaction, sign_universal_message, get_chain_config, get_contract_addresses, read_contract_state, derive_uea_address (mark if inferred), get_explorer_url

FILE 2: agents/changelog.json
Changelog tracking file mutations. Structure:
{
  "schema_version": "1.0.0",
  "entries": [
    {
      "date": "__GENERATED__",
      "version": "1.0.0",
      "changes": ["Initial /agents/ layer generated"],
      "files_affected": ["all"],
      "trigger": "build.agents.mjs initial run"
    }
  ]
}

FILE 3: agents/source-freshness.json
Tracks which agent files depend on which source areas. Structure:
{
  "version": "1.0.0",
  "last_generated": "__GENERATED__",
  "dependencies": [
    {
      "agent_file": "agents/supported-chains.json",
      "source_sections": ["docs/chain/important-concepts"],
      "change_frequency": "low"|"medium"|"high",
      "cache_safe": boolean,
      "refresh_trigger": "when supported chains list changes"
    }
  ]
}
Cover all major agent files.`,
        ctx
      ),
    expectedFiles: [
      'agents/mcp-candidates.json',
      'agents/changelog.json',
      'agents/source-freshness.json',
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export const buildAgents = async () => {
  console.log(
    chalk.cyan('\n🤖 Starting Push Chain /agents/ layer generation...')
  );

  const config = resolveApiConfig();
  console.log(
    chalk.gray(
      `   Provider: ${config.primary.provider} | Model: ${config.primary.model}${config.fallback ? ` (fallback: ${config.fallback.provider})` : ''}`
    )
  );

  const context = await loadContext();
  console.log(
    chalk.gray(
      `   Context loaded: ${(context.length / 1000).toFixed(0)}k chars`
    )
  );

  await fs.mkdir(AGENTS_DIR, { recursive: true });

  const meta = {
    lastRun: new Date().toISOString(),
    model: config.primary.model,
    provider: config.primary.provider,
    filesGenerated: [],
    phases: {},
  };

  let allWritten = [];

  for (const phase of PHASES) {
    console.log(chalk.cyan(`\n  Phase ${phase.id}/10: ${phase.name}`));

    try {
      const userMessage = phase.build(context);
      const response = await callClaude(
        config,
        SYSTEM_PROMPT,
        userMessage,
        phase.maxTokens
      );

      const files = parseFilesFromResponse(response);

      if (files.length === 0) {
        console.warn(
          chalk.yellow(
            `    ⚠ No <file> tags found in response for phase ${phase.id}`
          )
        );
        console.warn(
          chalk.gray(`    Response preview: ${response.slice(0, 300)}`)
        );
        meta.phases[phase.id] = 'no_files_parsed';
        continue;
      }

      const written = await writeAgentFiles(files);
      allWritten = allWritten.concat(written);
      meta.phases[phase.id] = 'ok';

      const expected = phase.expectedFiles;
      const missing = expected.filter((e) => !files.some((f) => f.path === e));
      if (missing.length > 0) {
        console.warn(
          chalk.yellow(`    ⚠ Expected but missing: ${missing.join(', ')}`)
        );
      }

      console.log(
        chalk.green(`    ✅ Phase ${phase.id} complete (${files.length} files)`)
      );
    } catch (err) {
      console.error(
        chalk.red(`    ❌ Phase ${phase.id} failed: ${err.message}`)
      );
      meta.phases[phase.id] = `error: ${err.message.slice(0, 100)}`;
    }
  }

  meta.filesGenerated = allWritten;

  // Stamp generated timestamps in any file containing __GENERATED__
  for (const relPath of allWritten) {
    const fullPath = path.join(STATIC_DIR, relPath);
    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      if (content.includes('__GENERATED__')) {
        await fs.writeFile(
          fullPath,
          content.replace(/__GENERATED__/g, meta.lastRun),
          'utf-8'
        );
      }
    } catch {
      // file may not exist or timestamp replacement not needed
    }
  }

  // Write llmsmeta.json
  await fs.writeFile(META_PATH, JSON.stringify(meta, null, 2), 'utf-8');
  console.log(chalk.green('\n✅ llmsmeta.json written'));

  const succeeded = Object.values(meta.phases).filter((v) => v === 'ok').length;
  const failed = PHASES.length - succeeded;

  if (failed === 0) {
    console.log(
      chalk.green(
        `✅ /agents/ generation complete — ${allWritten.length} files written across 10 phases`
      )
    );
  } else {
    console.warn(
      chalk.yellow(
        `⚠ /agents/ generation finished with ${failed} failed phases — ${allWritten.length} files written`
      )
    );
  }
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildAgents().catch((err) => {
    console.error(chalk.red('❌ build.agents.mjs failed:'), err);
    process.exit(1);
  });
}
