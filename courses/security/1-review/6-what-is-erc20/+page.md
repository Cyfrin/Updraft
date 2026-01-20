---
title: What is an ERC20/EIP20?
---

_Follow along the with the video_

---

## What are ERC20 tokens?

Firstly, let's define what ERC20s are. ERC20s are tokens that exist and function on a blockchain network using a predefined standard called [the ERC20 token standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). This standard is essentially a set of rules that dictate certain functions a token should have, allowing it to interact seamlessly with other tokens on the network.

However, the magic doesn't just stop at being tokens. ERC20s are also smart contracts. This hybrid nature allows ERC20 tokens to embody complex functionalities on the blockchain. Isn't that cool? A few notable examples of ERC20s include tokens like Tether, Chainlink, Uni and DAI.

> **Note:**Chainlink technically falls under the ERC-677 standard, a higher standard that introduces additional functions while still retaining compatibility with the original ERC20 standard. So, you can think of Chainlink as an upgraded ERC20 token.

## Why care about ERC20 tokens?

At this point, you might be wondering, "Why should I even care to make an ERC20 token?". Well, there are a number of compelling reasons.

ERC20 tokens find extensive use in a number of areas. They can serve as governance tokens, allowing token holders to vote on various matters within a DApp (Decentralised Application). They can be used to secure the underlying network. They can also represent some type of static asset, and much more. The sky's the limit when it comes to what you can achieve with ERC20 tokens.

## How to create an ERC20 token

Now that we've addressed the 'what' and 'why' of ERC20 tokens, let's delve into the 'how'. You can create your very own ERC20 token by crafting a smart contract that conforms to the ERC20 token standard.

An ERC20 compliant smart contract needs to have certain functions - `name()`, `symbol()`, `decimals()`, to name a few. These functions are called to retrieve information about the token. Furthermore, functionalities such as transferring tokens and checking the balance of tokens must also be included in the smart contract.

Of course, the ERC20 is not the be-all and end-all. There are several other upgraded token standards, such as the [ERC-677](https://github.com/ethereum/EIPs/issues/677) and the [ERC-777](https://eips.ethereum.org/EIPS/eip-777) that you might want to check out. These other standards provide additional functionality while maintaining full compatibility with the ERC20 standard.

To sum up, ERC20 tokens are versatile and powerful constructs in the blockchain realm. Whether you wish to create your own token for a DApp, or simply wish to understand the underlying mechanics of various tokens, gaining a strong grasp on ERC20 tokens can undoubtedly open a plethora of avenues for you. Happy learning!
