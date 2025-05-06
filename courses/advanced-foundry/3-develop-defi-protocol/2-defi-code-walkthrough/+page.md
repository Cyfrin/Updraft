---
title: DeFi Code Walkthrough
---

_Follow along the course with this video._

---

### DeFi Code Walkthrough

As mentioned in the previous lesson, all the code we'll be working with, in the DeFi Stablecoin section can be found in the [**GitHub Repo**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23). Let's walk through the code to get a sense of what's happening and how the protocol works.

The Decentralized Stablecoin protocol has 2 contracts at it's heart.

- **DecentralizedStableCoin.sol**
- **DSCEngine.sol**

`DecentralizedStableCoin.sol` is effectively a fairly simple `ERC20` with a few more advanced features imported such as [`ERC20Burnable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Burnable.sol) and OpenZeppelin's [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol) libraries.

Otherwise, `DecentralizedStableCoin.sol` is fairly expected in what's included, a constructor with `ERC20` parameters, the ability to `mint` and `burn` etc.

The real meat of this protocol can be found in `DSCEngine.sol`. `DecentralizeStableCoin.sol` is ultimately going to be controlled by this `DSCEngine` and most of the protocol's complex functionality is included within including functions such as:

- **depositCollateralAndMintDsc**
- **redeemCollateral**
- **burn**
- **liquidate**

... and much more. We'll be diving into what each of these means and how they're used within the protocol as we progress through the section.

In addition to all the source contracts, this protocol comes with a full test suite including `unit`, `fuzz` and `invariant` tests, all which we're doing to build together.

> ❗ **PROTIP**
> Invariant tests are, in my mind, what set apart mediocre developers from truly skilled and advanced ones.

We'll also be recreating all the scripts that you can see in the scripts folder, primarily a deploy script, spiced up to include `Chainlink Pricefeeds`, used to determine the prices of collateral.

### Wrap Up

This is just a high-level walkthrough of the code to get a feel for the scope of what we're about to understand. This is going to be advanced, but it's going to be awesome and I hope you're excited to dive in.

I strongly believe that stablecoins are going to be one of _the most_ important DeFi primitives in the ecosystem and currently the offerings leave much to be desired (I'm looking at you Terra).

In the next lesson, we'll summarize what stablecoins are, why they're important and what some of the most popular offerings in DeFi are currently.

Time to dive in.
