---
title: Docs
---

## <iframe width="560" height="315" src="https://www.youtube.com/embed/CYFBEMBKSe0?si=tNzub0kyRjFlLFnW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Bridging the Gap: Introducing Boss Bridge for ERC20 Tokens

![](https://cdn.videotap.com/7JrqjCcxUyOafjUdWM9V-11.74.png)

## How Does Boss Bridge Work?

In essence, the key function of our Boss Bridge is providing a pathway for users to deposit their tokens. Upon deposit, these tokens are stored securely in an L1 digital vault. The deposit event triggers a subsequent off-chain event which our mechanism discerningly picks up, parses it, and then mints the corresponding amount in L2.

> Remember: The main goal here is ensuring user safety and security.

The first version of the bridge adheres strictly to this ideal and includes several security features.

## Key Security Features

The current version of our Boss Bridge boasts multiple mechanisms aimed at enhancing the security of deposited tokens:

1. The bridge owner has full authority to pause any operations during emergent situations.
2. Account deposits are permissionless, but to avoid any potential abuse, we have imposed a strict limit on the number of tokens that can be deposited.
3. All withdrawal requests must be approved by the bridge owner.

We are focused on continually improving this system, making it even safer and more secure with each update.

![](https://cdn.videotap.com/DSoIzu6Rtt37d8MackPQ-55.77.png)

## The Launch

We are preparing to launch our L1 Boss Bridge on both the Ethereum Mainnet and ZK Sync platforms. Initially, we will use only L1 tokens, or their duplicates, within the bridge system.

**Please note**: At this early stage, other ERC20 tokens will not be supported, and their 'weirdness' is considered out of scope on withdrawals.

## Withdrawal Process

In the context of withdrawals, the bridge operator holds the responsibility of signing each withdrawal request submitted by users. These requests are made on the L2 component of the bridge.

Essential point to mention: For a successful withdrawal, our service will check that the account submitting a withdrawal previously initiated a successful deposit on the L1 part of the bridge.

![](https://cdn.videotap.com/oRDUILrsz7wMudIoZwVx-76.32.png)

## Making Sense of the Boss Bridge

If this seems a bit overwhelming, it is natural. This is where you might be getting the urge to delve into the protocol design, or you might want to explore the contract and draw up some diagrams on your own.

In either case, these are healthy steps toward understanding the mechanism better. For those willing to roll up their sleeves and create some diagrams, we encourage you to pause right here, grab your notebook, and start sketching. It's a great learning experience!
