---
slug: understanding-push-chain-validator-stack
title: 'Understanding Push Chain’s Validator Stack'
authors: [push]
image: './cover-image.webp'
description: 'Universal apps look “easy” on the surface: connect any wallet, pay with any token, one click and done. Behind that, something very unsexy makes all of this work: validators.'
text: "Universal apps look “easy” on the surface: connect any wallet, pay with any token, one click and done. Behind that, something very unsexy makes all of this work: validators."
tags: [Maker Monday]
twitterId: '2028470425945247977'
---

![Cover Image of Understanding Push Chain’s Validator Stack](./cover-image.webp)

<!--truncate-->

Universal apps look “easy” on the surface: connect any wallet, pay with any token, one click and done.

Behind that, something very unsexy makes all of this work: **validators.**

On Push Chain, validators don’t just produce blocks. They:

- Settle **universal transactions** coming from many chains
- Keep **Universal Executor Accounts (UEAs)** in sync and honest
- Help guarantee that “one click from Solana → action on Push” is actually safe
- They secure a chain that’s meant to be used by *other chains’ users*

## Push Chain doesn’t rely on a single validator model.

It runs on a **validator stack** with **two distinct roles**, each designed for a different job.

**1️⃣ Core ( Network) Validators**

These secure the network, participate in consensus, and ensure the chain stays honest and live.

**2️⃣ Universal Validators**

These extend Push Chain beyond a single ecosystem, enabling shared state and cross-chain execution across EVM and non-EVM chains.

## **Why two distinct validators?**

Because securing a chain and coordinating universal execution are **very different problems** — and Push Chain treats them as such.

This separation keeps the system:

• Modular

• Scalable

• Easier to reason about for builders

## **How They Work Together (High-Level Flow)**
```
User locks 100 USDC on Ethereum
    ↓
Universal Validators observe the lock
    ↓
Multiple Universal Validators report to Push Chain
    ↓
Consensus reached on the external transaction
    ↓
Network Validators mint 100 pUSDC on Push Chain
    ↓
User receives pUSDC instantly. No bridging manually
```

**Key security feature:** Universal Validators operate under consensus. Multiple validators must agree on what happened on the external chain before Push Chain acts.

## TLDR;

| **Validator Type** | **Primary Function** | **What They Secure** |
|--------------------|---------------------|----------------------|
| **Network Validators** | Execute transactions on Push Chain | • Push Chain state<br>• Network consensus<br>• Transaction execution |
| **Universal Validators** | Observe and relay external chain activity | • Cross-chain asset locks<br>• Gateway transactions |
---

Want to get started with running your own Push Chain Validator in a single click? Refer this [Quick Setup Guide](https://push.org/docs/chain/node-and-system-tools/running-push-validator/) to get started in 5 mins.
