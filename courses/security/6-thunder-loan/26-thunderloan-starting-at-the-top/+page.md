---
title: Thunderloan.sol - Starting At The Top
---

## Initial Exploration: Imports

Before we get our hands dirty with the functions, we start our journey with imports. There's plethora of imports in there, some of which include `Safe ERC 20`, `Asset token`, `IERC 20`, `Metadata`, `Ownable upgradable`, `Initializable`, `UUPs upgradable`, `Oracle Upgradable`, just to name a few.

In order to facilitate the learning process, I will provide a preamble of our focus in each section, "priming your brain" to absorb the upcoming content. Educational studies support this method, indicating that offering a high-level overview before delving into deeper detailing enhances the learning experience.

**Quick tip:** In order to better understand protocols, remember to go through their read-me's for a bird's eye view before examining the individual codes.

Following this advice, let's start piecing together the puzzle. `Ownable upgradable` might be a newer import to some, so it might be beneficial to quickly explore it in Open Zeppelin. This is the only-owner contract but with an upgradable version. Taking a close look, we see that it uses `ownable init` and needs to set an initial owner and transfer ownership.

![](https://cdn.videotap.com/kyjLSLgBPsyDSSFpZ9P1-124.85.png)

We also find a reference to `UUPs upgradable`, which implements the UUPs proxy pattern, a common pattern for smart contracts. If you’re unfamiliar with the UUPs proxy, I strongly recommend that you brush up on it or you could revisit the Foundry course and specifically look at the `Foundry upgrades F 23` for a better understanding.

Finally, in the list of our imports, we come across `iFLASH loan receiver`, which is a library offering easier to use functions like `send value`.

## Diving Deep into the Smart Contract

Next up, we ask, "While going top to bottom, have we asked enough questions?" Since there aren’t major issues with the imports, we move on.

Looking at the contract `Thunderloan`, it is clearly recognizable that it extends `Initializable`, `Ownable upgradable`, `UUPs upgradable`, and `Oracle Upgradable`. Checking whether it should extend anything else, we find no, it's all good here.

![](https://cdn.videotap.com/8ErUx4D6tAmn03SvJNAC-218.48.png)

In the next section, we encounter a bunch of constants and state variables, first of which is `token to asset token`. To gain a better understanding of its role, we do a quick search and find that it’s used in various operations like deposit, redeem, Flash loan, etc.

```code
// State variableS token to asset token
```

After some explanation and assumptions, we infer that this maps the underlying token to its asset token. For example, if a liquidity provider deposits USDC, it will generate a USDC asset token, representing the amount of USDC you've deposited.

Following this, we stumble upon `fee in way`, which we verify by checking its initialization in the initializer function.

Also, we encounter an auditing issue that `fee precision` should be either constant or immutable.

Next is `token to currently flash loan`, so this is assumedly a mapping that notifies us if a token is mid flash loan.

## Delving into the Modifiers of our Smart Contract

Well, we’ve had our fair share of state variables. Now, it's time to unravel the modifiers.

```code
revert if zero
```

This modifier reverts operation if amount equals zero. The other modifier `revert if not allowed token`, ensures operation would only proceed with allowed token only.

Turns out, there's a precheck for tokens, which as a result reduces the risk of passing bad tokens to the contract.

```code
modifier not allowed token
```

We find a function named `is allowed token`, and upon exploration, it returns `s token to asset token of the token does not equal zero`. Therefore, it seems it's only allowing a token if it has been set before.

Lastly, we observe that most of this looks benign so far, but remember we're just getting started. In this initial inspection, we haven't really delved into the functions yet. But rest assured, there's more to find in this intriguing world of the Thunderloan Sol smart contract!
