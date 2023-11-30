---
title: Exploit - Weird ERC20s (These are a menace to Web3)
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/8R_aOSqE0zI?si=hA-pCWiXnzuT1ptR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Exploring the Weird World of ERC-20 Smart Contracts: Security, Oddities and Auditing

In this blog post we'll delve into one of the most interesting parts of the decentralized area - ERC-20 Smart Contracts and their intricate aspects. We’re going to go back to the `cipher` security and auditing full course on GitHub and explore more about a special section named **TSWAP**, specifically _section five_.

## Tackling the ERC-20 Quirks

> _Remember, it's the stuff we don't know that keeps us up at night._

One weird instance that we are going to discuss today is about `ERC-20 fee on transfer token`, which was part of the `SC_exploits`. When testing this token, it was found that for every ten transactions, a fee was being charged. This might seem innocuous, but this little oddity has the potential to destabilize numerous protocols.

![](https://cdn.videotap.com/AepJ0CJaMiwbHLC1x4GC-49.5.png)

## The Anomalies of ERC-20 Tokens

ERC-20 Tokens come in all shapes and sizes. Here's a glimpse into some of the variants and potential problems that lurk in the shadows:

1. **Reentrant tokens**: These ERC-777s seem harmless, but even a simple transfer of these tokens can lure you into a pit of reentrancy attacks.
2. **Missing return values**: Some tokens don’t return a boolean on ERC-20 methods. For transactions requiring a status check, this can be a potent problem.
3. **Fee on transfer**: Some tokens sneak in a fee on every transfer while others can start doing so in the future.
4. **Upgradable tokens**: These tokens, like USDC, could morph into anything over time.
5. **Rebasing tokens**: These tokens magic away your balance by meddling with different contracts.
6. **Tokens with blocklists**: Some tokens put restrictions on certain transacting parties.
7. **Low/high decimals**: Token numbers can go from unusually low to abnormally high, causing calculation mishaps.
8. **Multiple token addresses**: These tokens exist in more than one places at once.

## Dealing with ERC-20 Tokens Anomalies

![](https://cdn.videotap.com/4oHWptmu7liSgxFnB37w-170.5.png)

ERC-20 Tokens are an external smart contract that one must treat with a level of wariness. While integrating with them, you must be fully aware of the token’s characteristics.

Blockquote:

> _Playing in the world of ERC-20s without complete information is like dancing on a live minefield._

A cagey approach to interacting with ERC-20s can be the difference between a successful dApp and a failed project.

![](https://cdn.videotap.com/fnsDlRcZfomWTHFt6MFT-214.5.png)

In conclusion, if you are aspiring to be a top-flight builder of powerful smart contracts. This website is an excellent guide to understanding and gaining expertise in the world of smart contracts. It serves as both a practical tool and an in-depth manual to secure smart contracts.

And remember, "The first step to great security is being aware about all the unknowns!".
