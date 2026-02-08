import { default as BrowserOnly } from '@docusaurus/BrowserOnly';
import Spinner, {
  SPINNER_TYPE,
} from '@site/src/components/reusables/spinners/SpinnerUnit';
import GLOBALS from '@site/src/config/globals';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

// This function returns a promise that resolves to the library,
// ensuring it's only imported on the client side.
function loadClientSideLibraryEthers(constantName) {
  return typeof window !== 'undefined'
    ? require('ethers')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibrarySolana(constantName) {
  return typeof window !== 'undefined'
    ? require('@solana/web3.js')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibraryViem(constantName) {
  return typeof window !== 'undefined'
    ? require('viem')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibraryViemAccounts(constantName) {
  return typeof window !== 'undefined'
    ? require('viem/accounts')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibraryViemChains(constantName) {
  return typeof window !== 'undefined'
    ? require('viem/chains')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibraryViemUtils(constantName) {
  return typeof window !== 'undefined'
    ? require('viem/utils')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibraryBS58() {
  return typeof window !== 'undefined'
    ? require('bs58').default || require('bs58')
    : {}; // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibraryOpenZepplinMerkleTree(constantName) {
  if (typeof window === 'undefined') {
    return {}; // Return an empty object for SSR
  }

  // StandardMerkleTree is in the main export
  if (constantName === 'StandardMerkleTree') {
    return require('@openzeppelin/merkle-tree')[constantName];
  }

  // Other utilities are in dist/core.js
  return require('@openzeppelin/merkle-tree/dist/core.js')[constantName];
}

function loadClientSideLibraryPushChainUIKit(constantName) {
  return typeof window !== 'undefined'
    ? require('@pushchain/ui-kit')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideLibraryPushChainCore(constantName) {
  return typeof window !== 'undefined'
    ? require('@pushchain/core')[constantName]
    : Promise.resolve({}); // Return an empty object or appropriate placeholder for SSR.
}

function loadClientSideReactIconsBS(iconName) {
  return typeof window !== 'undefined'
    ? require('react-icons/bs')[iconName]
    : () => null;
}

const ReactLiveScope = {
  React,
  ...React,
  LiveEditor,
  LiveProvider,
  LiveError,
  LivePreview,
  BrowserOnly,
  Spinner,
  SPINNER_TYPE,
  GLOBALS,
  // Asynchronously import ethers and PushAPI only on the client side
  ethers: loadClientSideLibraryEthers('ethers'),

  Keypair: loadClientSideLibrarySolana('Keypair'),
  PublicKey: loadClientSideLibrarySolana('PublicKey'),

  createWalletClient: loadClientSideLibraryViem('createWalletClient'),
  createPublicClient: loadClientSideLibraryViem('createPublicClient'),
  http: loadClientSideLibraryViem('http'),
  parseTransaction: loadClientSideLibraryViem('parseTransaction'),
  TypedData: loadClientSideLibraryViem('TypedData'),
  TypedDataDomain: loadClientSideLibraryViem('TypedDataDomain'),
  defineChain: loadClientSideLibraryViem('defineChain'),
  webSocket: loadClientSideLibraryViem('webSocket'),
  keccak256: loadClientSideLibraryViem('keccak256'),

  privateKeyToAccount: loadClientSideLibraryViemAccounts('privateKeyToAccount'),
  generatePrivateKey: loadClientSideLibraryViemAccounts('generatePrivateKey'),

  sepolia: loadClientSideLibraryViemChains('sepolia'),

  hexToBytes: loadClientSideLibraryViemUtils('hexToBytes'),
  bytesToHex: loadClientSideLibraryViemUtils('bytesToHex'),

  bs58: loadClientSideLibraryBS58(),

  // StandardMerkleTree - Open Zeppelin
  StandardMerkleTree:
    loadClientSideLibraryOpenZepplinMerkleTree('StandardMerkleTree'),

  PushUniversalWalletProvider: loadClientSideLibraryPushChainUIKit(
    'PushUniversalWalletProvider'
  ),
  PushUniversalAccountButton: loadClientSideLibraryPushChainUIKit(
    'PushUniversalAccountButton'
  ),
  usePushWalletContext: loadClientSideLibraryPushChainUIKit(
    'usePushWalletContext'
  ),
  usePushChainClient: loadClientSideLibraryPushChainUIKit('usePushChainClient'),
  usePushChain: loadClientSideLibraryPushChainUIKit('usePushChain'),
  PushUI: loadClientSideLibraryPushChainUIKit('PushUI'),
  PushChain: loadClientSideLibraryPushChainCore('PushChain'),
  BsBoxArrowUpRight: loadClientSideReactIconsBS('BsBoxArrowUpRight'),
};

export default ReactLiveScope;
