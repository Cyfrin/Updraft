---
title: ERC20 Basics
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/Iip9bQ3yKUI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Understanding ERC 20 Tokens in Ethereum: A Comprehensive Guide

Welcome back! We're about to dive deep into the fascinating world of ERC 20 tokens. All code covered in this post is available in the course's associated [GitHub repository](https://github.com).

<img src="/foundry-erc20s/erc20-1.PNG" style="width: 100%; height: auto;">

Before we plunge into building an ERC 20 token, let's first explore what it is, and understand the concepts of EIP (Ethereum Improvement Proposals) and ERC (Ethereum Request for Comments).

## What is an ERC? What is an EIP?

<img src="/foundry-erc20s/erc20-3.PNG" style="width: 100%; height: auto;">

Both Ethereum and other blockchains like Avalanche, Binance, and Polygon have mechanisms for improving their protocols, known as 'improvement proposals'. In Ethereum's ecosystem, these are called Ethereum Improvement Proposals or EIPs.

Developers submit ideas to enhance Ethereum or other layer one protocols like Polygon, Matic or Avalanche on GitHub or other open source repositories. These improvements range from core blockchain updates to broad, best practice standards for the community to adopt.

> Once an EIP gains enough traction, it also spawns an ERC, which stands for Ethereum Request for Comments.

In other blockchains, these proposals and request for comments are tagged differently (for example, BEP, PEP, etc), but they contain the same types of information. Interestingly, the numbers following ERC or EIP (like in ERC 20 or EIP 20), are chronological and shared between the two, signifying the order in which they were introduced. For real-time updates on the process of new EIPs, check out [EIPS Ethereum.org](https://eips.ethereum.org/).

## What is the ERC 20 Token Standard?

<img src="/foundry-erc20s/erc20-5.PNG" style="width: 100%; height: auto;">

Among these EIPs and ERCs, the ERC 20, or Token Standard for smart contracts, is one of the most significant. It delineates how to create tokens within smart contracts. Check out this [video](https://www.youtube.com/watch?v=3eozY4dzKnY) I recently made about this topic.

ERC 20 tokens are those deployed on a blockchain using the ERC 20 token standard. Essentially, it's a smart contract that represents a token - both a token and a smart contract in one. Check out the [ERC 20 Token standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) for a deep dive.

Notable examples of ERC 20 tokens include Tether, Chainlink, Uni Token, and Dai. Interestingly, while Chainlink qualifies as an ERC 677, it is fully compatible with ERC 20 and just offers some additional functionality.

## Why Create an ERC 20 Token?

<img src="/foundry-erc20s/erc20-2.PNG" style="width: 100%; height: auto;">

There are multiple applications of ERC 20 tokens. They are used for governance, securing an underlying network, or creating synthetic assets, among other things.

## Building an ERC 20 Token

How do we go about creating an ERC20 token? Simple. By creating a smart contract that adheres to the token standard. This involves building a smart contract with certain functions, including name, symbol, decimals, etc. Also, it should be transferable and display its balance.

You can explore more advanced, ERC 20 compatible tokens with improvements (such as ERC 677 or ERC 777), just make sure they align with your project requirements. Enjoy the process of building your ERC20 token and the new possibilities it opens up!