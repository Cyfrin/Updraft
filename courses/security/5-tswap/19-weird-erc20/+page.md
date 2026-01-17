---
title: Exploit - Weird ERC20s
---

---

### Weird ERC20s

I've alluded to it a coupled times, but in this lesson we're going to take a closer look at one of the top vulnerabilities in DeFi - `Weird ERC20s`.

There's a great [**GitHub Repo**](https://github.com/d-xo/weird-erc20) that's been compiling examples of these types of tokens. I highly encourage you to check it out and familiarize yourself with common token designs.

The token we just dealt with in our `stateful fuzz testing` is an example of one of these `Weird ERC20s` - a `Fee on Transfer` token.

`YieldERC20` contained a mechanism which sent a fee to the owner every 10 transactions. This type of behaviour in fee on transfer tokens can actually break many protocols - so it's very important to keep an eye out for these incompatibilities.

Other examples of Weird ERC20s may:

- **Allow Re-entrancy** - some tokens allow reentrant calls
- **Missing Return Values** - some tokens do not return a bool on ERC20 methods - making transaction confirmations difficult
- **Upgradeable ERC20s** - these could be changed in the future to behave unexpectedly. USDC is a high profile example of this.
- **Rebasing Tokens** - situations where token balances are changes outside of usual transfer calls
- **Block Lists** - some tokens do not allow certain addresses to transact

The list goes on...

There are so many potential exploits that come from unexpected behaviour of `Weird ERC20s`. The best way to protect against these problems is to know that tokens you expect to interact with. At the end of the day ERC20s are external contracts and we need to defend against them.

Again I'll encourage you to familiarize yourself with some of the cases outlined in the [**GitHub Repo**](https://github.com/d-xo/weird-erc20) linked here. Additionally, I want to mention there's a great [**Token Integration Checklist by Trail of Bits**](https://secure-contracts.com/development-guidelines/token_integration.html) that can serve has a great guideline for builders looking to avoid these types of exploits. In fact, [**secure-contracts.com**](https://secure-contracts.com/index.html) as a whole is a really invaluable resource you should check out.

Alright! Let's see how all of this applies to TSwap!
