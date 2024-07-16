---
title:
---

_Follow along with the video_

---

<a name="top"></a>
Welcome back! I'm Ciara, and I'll be guiding you through the Merkle Airdrop section of this course. In this project, we'll delve into **Merkle Trees** and **Signatures** to create our very own _ERC20 airdrop contract_.

### Airdrop Overview

An airdrop occurs when a token development team distributes tokens or allows people to claim them. These tokens can be of various types, including ERC-20, ERC-1155, or ERC-721.

<img src="/foundry-merkle-airdrop/01-introduction/airdrop.png" width="75%" height="auto">

Typically, tokens are given for free, with eligibility criteria such as contributing to the project's GitHub or participating in the community. This airdrop process helps to _bootstrap the project_ by distributing tokens to a **list of eligible addresses**.

### Code Walkthrough

Let's quickly walk through the [code base](https://github.com/Cyfrin/foundry-merkle-airdrop-cu). In the source directory, you'll find the [Bagel token](https://github.com/Cyfrin/foundry-merkle-airdrop-cu/blob/main/src/BagelToken.sol), a minimal ERC-20 token that we will distribute.

The [`MerkleAirdrop`](https://github.com/Cyfrin/foundry-merkle-airdrop-cu/blob/main/src/MerkleAirdrop.sol) contract is the cornerstone of this project, using Merkle Proofs to verify address eligibility for claiming tokens. It includes a `claim` function that allows addresses to receive the airdrop without paying gas fees. We will also implement _signatures_ to ensure that only intended recipients can claim the tokens.

We will generate **scripts** to create Merkle Trees, Proofs, and Root Hash, as well as deploy and interact with the contract.

In this course, we will cover several topics besides Merkle Trees and Merkle Proofs, such as signatures, the ECDSA (Elliptical Curve Digital Signature) Algorithm, and transaction types.

### Demo: Claiming Tokens

1. After initializing a ZK Sync local node with Docker, we deploy the `Bagel` token and `MerkleAirdrop` contracts on it
3. We'll then **sign a message** to allow someone else to call `claim` on your behalf so you can receive the token while not paying for gas fees
4. The initial supply of tokens is created and sent to the airdrop contract
5. Finally, we can claim tokens on behalf of the claiming address (so they do not have to pay gas) using a signature
6. The address will now hold a balance of the airdropped tokens

Let's break it down step-by-step to clarify each part of the process!

[Back to top](#top)
