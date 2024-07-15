---
title:
---

_Follow along with the video_

---

<a name="top"></a>
Welcome back! This is Ciara and I will guide you through the Merkle Airdrop section of the course. In this project, we will explore **Merkle Trees** and **Signatures** to build our very own _airdrop contract_.

### Airdrops and Tokens

An airdrop in the context of blockchains is when a token development team sends or allows people to claim tokens. These tokens can be of various types, such as ERC-20, ERC-1155, or ERC-721s. In this section, we will focus on creating an ERC-20 airdrop. Typically, tokens are given for free, aside from the gas fees. There is usually some eligibility criteria for claiming these tokens, such as contributing to the project's GitHub or being part of the community. This process helps bootstrap the project by distributing tokens to a list of eligible addresses.

### Code Walkthrough

Let's quickly walk through the code base. In the source directory, you will find the Bagel token, which is the ERC-20 token we will be airdropping. It's a minimal ERC-20 token similar to previous examples we've worked with. Additionally, there is a Merkle airdrop contract in the source directory. This contract uses Merkle proofs to verify address eligibility for claiming tokens. It includes a claim function allowing eligible addresses to receive the airdrop without paying for gas fees. We will also implement signatures to ensure only intended recipients receive the airdrop.

### Learning Objectives

We will cover several key topics:

- Understanding and validating signatures (V, R, S components)
- Creating signatures
- Generating Merkle trees, proofs, and the root hash
- Deploying and interacting with contracts

### Demonstration

I'll demonstrate using a ZK Sync local chain running in Docker. However, running a local ZK Sync Docker node is optional for you. The demonstration includes:

1. Initializing a ZK Sync local node
2. Deploying the Bagel token contract
3. Deploying the Merkle airdrop contract
4. Signing a message to allow another person to call claim on my behalf
5. Creating an initial supply of tokens and sending them to the airdrop contract
6. Claiming tokens on behalf of the claiming address using the signature

This process allows the claiming address to receive the airdrop tokens, showcasing the contract's functionality. Though it may seem complex initially, we will break it down step-by-step to clarify each part of the process.

Let's get started with building and understanding our airdrop contract.

[Back to top](#top)
