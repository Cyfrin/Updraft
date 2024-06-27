---
title: ERC20 Basics
---

_Follow along the course with this video._



# Understanding ERC20 Tokens in Ethereum: A Comprehensive Guide

Welcome back! We're about to dive deep into the fascinating world of ERC20 tokens.

<img src="/foundry-erc20s/1-erc20-basics/erc20-basics1.PNG" style="width: 100%; height: auto;">

Before we plunge into building an ERC20 token, let's first explore what it is, and understand the concepts of EIP (Ethereum Improvement Proposals) and ERC (Ethereum Request for Comments).

## What is an ERC? What is an EIP?

<img src="/foundry-erc20s/1-erc20-basics/erc20-basics3.PNG" style="width: 100%; height: auto;">

Both Ethereum and other blockchains like Avalanche, Binance, and Polygon have mechanisms for improving their protocols, known as 'improvement proposals'. In Ethereum's ecosystem, these are called Ethereum Improvement Proposals or EIPs.

Developers submit ideas to enhance Ethereum or other layer one protocols like Polygon, Matic or Avalanche on GitHub or other open source repositories. These improvements range from core blockchain updates to broad, best practice standards for the community to adopt.

<img src="/foundry-erc20s/1-erc20-basics/erc20-basics5.PNG" style="width: 100%; height: auto;">

In other blockchains, these proposals and request for comments are tagged differently (for example, BEP, PEP, etc), but they contain the same types of information. Interestingly, the numbers following ERC or EIP (like in ERC20 or EIP20), are chronological and shared between the two, signifying the order in which they were introduced. For real-time updates on the process of new EIPs, check out [EIPS Ethereum.org](https://eips.ethereum.org/).

## What is the ERC20 Token Standard?

<img src="/foundry-erc20s/1-erc20-basics/erc20-basics4.png" style="width: 100%; height: auto;">

Among these EIPs and ERCs, the ERC20, or Token Standard for smart contracts, is one of the most significant. It delineates how to create tokens within smart contracts.

ERC20 tokens are those deployed on a blockchain using the ERC20 token standard. Essentially, it's a smart contract that represents a token - both a token and a smart contract in one. Check out the [ERC20 Token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) for a deep dive.

Notable examples of ERC20 tokens include Tether, Chainlink, Uni Token, and Dai. Interestingly, while Chainlink qualifies as an ERC677, it is fully compatible with ERC20 and just offers some additional functionality.

## Why Create an ERC20 Token?

<img src="/foundry-erc20s/1-erc20-basics/erc20-basics2.PNG" style="width: 100%; height: auto;">

There are multiple applications of ERC20 tokens. They are used for governance, securing an underlying network, or creating synthetic assets, among other things.

## Building an ERC20 Token

How do we go about creating an ERC20 token? Simple. By creating a smart contract that adheres to the token standard. This involves building a smart contract with certain functions, including name, symbol, decimals, etc. Also, it should be transferable and display its balance.

You can explore more advanced, ERC20 compatible tokens with improvements (such as ERC677 or ERC777), just make sure they align with your project requirements. Enjoy the process of building your ERC20 token and the new possibilities it opens up!
