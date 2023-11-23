---
title: What is an ERC20/EIP20?
---

_Follow along the with the video_

---

## What are ERC-20 tokens?

Firstly, let's define what ERC-20s are. ERC-20s are tokens that exist and function on a blockchain network using a predefined standard called [the ERC-20 token standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). This standard is essentially a set of rules that dictate certain functions a token should have, allowing it to interact seamlessly with other tokens on the network.

However, the magic doesn't just stop at being tokens. ERC-20s are also smart contracts. This hybrid nature allows ERC-20 tokens to embody complex functionalities on the blockchain. Isn't that cool? A few notable examples of ERC-20s include tokens like Tether, Chainlink, Uni and DAI.

> **Note:**Chainlink technically falls under the ERC-677 standard, a higher standard that introduces additional functions while still retaining compatibility with the original ERC-20 standard. So, you can think of Chainlink as an upgraded ERC-20 token.

## Why care about ERC-20 tokens?

At this point, you might be wondering, "Why should I even care to make an ERC-20 token?". Well, there are a number of compelling reasons.

ERC-20 tokens find extensive use in a number of areas. They can serve as governance tokens, allowing token holders to vote on various matters within a DApp (Decentralised Applications). They can be used to secure the underlying network. They can also represent some type of static asset, and much more. The sky's the limit when it comes to what you can achieve with ERC-20 tokens.

## How to create an ERC-20 token?

Now that we've addressed the 'what' and 'why' of ERC-20 tokens, let's delve into the 'how'. You can create your very own ERC-20 token by crafting a smart contract that conforms to the ERC-20 token standard.

An ERC-20 compliant smart contract needs to have certain functions - `name()`, `symbol()`, `decimals()`, to name a few. These functions are called to retrieve information about the token. Furthermore, functionalities such as transferring tokens and checking the balance of tokens must also be included in the smart contract.

Of course, the ERC-20 is not the be-all and end-all. There are several other upgraded token standards, such as the ERC-677 and the ERC-777 that you might want to check out. These other standards provide additional functionality while maintaining full compatibility with the ERC-20 standard.

To sum up, ERC-20 tokens are versatile and powerful constructs in the blockchain realm. Whether you wish to create your own token for a DApp, or simply wish to understand the underlying mechanics of various tokens, gaining a strong grasp on ERC-20 tokens can undoubtedly open a plethora of avenues for you. Happy learning!
