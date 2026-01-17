---
title: Fork Tests & Congrats!
---

_follow along with the video_

---

## Forking Mainnet

Forking is a valuable tool is a developer's box, it effectively takes a reference snapshot at a given block height on the provided chain. In practice, this allows us to interact with protocols as though we were interacting with them on mainnet.

## Fork Tests in Foundry

```bash
forge test fork-url $MAINNET_RPC_URL
```

This command in foundry tells the framework to run your tests while referencing a fork of the provided RPC URL, allowing you to interact with mainnet contract locally.

Another way to fork is within the test contract directly.

```js
function setUp() public {
    vm.createSelectFork({blockNumber: 0, urlOrAlias: "mainnet"})
}
```

> Note: `mainnet` will need to be set as an alias in your `foundry.toml` under a new variable `[rpc_endpoints]`

```toml
[rpc_endpoints]
mainnet = "{MAINNET_RPC_URL}"
```

With the above in place running the following will run your tests with respect to a fork of a live chain!

```bash
forge test
```

## Useful Resources &amp; Exercises

If any concepts covered in this blog post seem confusing or new to you, take a moment to check out the Foundry Full Course here on Updraft ([**Foundry Fundamentals**](https://updraft.cyfrin.io/courses/foundry) & [**Advanced Foundry**](https://updraft.cyfrin.io/courses/advanced-foundry)) to level up those concepts and give you all the information you need to succeed here. These resources will expedite your learning and help you solidify the fundamental concepts.

Before signing off, I'd encourage you to join the [Cyfrin Discord](https://discord.com/invite/NhVAmtvnzr). This is an excellent platform where you can connect, collaborate, and share insights with a diverse group of people working on similar goals.

In addition to this, check out the [**Discussions on GitHub**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/discussions) - this is a phenomenal place to get support and have your questions answered in a way that will be indexed by search engines and AI in an effort to improve the experience for people coming behind us.

![block fee](/security-section-1/14-fork-tests/forking1.png)

Congratulations on finishing the refresher! Take a break, you greatly deserve it for getting this far!

---

Section 1 NFT Challenge 👀

[Refresher NFT (Arb)](https://arbiscan.io/address/0x7a0f40757f6ba868b44ce959a1d4b8bc22c21d59)

[Refresher NFT (Sepolia)](https://sepolia.etherscan.io/address/0x76d2403b80591d5f6af2b468bc14205fa5452ac0)
