---
title: MEV Case Study - Pashov
---

_Follow along with this video:_

---

_In this written lesson, we'll detail MEV as presented by Pashov in the Video section of this lesson._

To walk us through some real-world reports where MEV was reported, we have guest lecturer [Pashov](https://twitter.com/pashovkrum), legendary independent security researcher, joining us!

### What is MEV?

**MEV** - Maximum Extractable Value (Miner Extractable Value) - Both good and bad for the Ethereum Ecosystem, this concept exists in 4 forms

1. **Arbitrage** - detailed in previous lessons, this process is often handled by MEV bots. A difference in price between exchanges will be identified and MEV bots will balance the pools and their prices by leveraging swaps between them (and profiting along the way)
2. **Sandwiches** - we've covered this briefly earlier as well (remember Thunder Loan!), but we'll cover it with Pashov in more detail later
3. **Liquidations** - In the context of borrowing and lending protocols, bad debt needs to be accounted for quickly. Users which have failed to repay loans or if borrowed funds become undercollateralized may be liquidated by MEV bots
4. **JIT(Just In Time) Liquidity** - this is a type of attack or exploit where an MEV bot will identify a large transaction (borrow, swap etc) and will, just prior to this transaction, provide a bunch of liquidity to the protocol. This could have two effects:
   1. drastically impact the value of tokens being swapped
   2. rob other liquidity providers of fees, but swooping in then withdrawing their liquidity immediately after the transaction

There are two incredible articles covering MEV in great detail available on galaxy.com.

- [**MEV: Maximal Extractable Value Pt. 1**](https://www.galaxy.com/insights/research/mev-how-flashboys-became-flashbots/)
- [**MEV: Maximal Extractable Value Pt. 2**](https://www.galaxy.com/insights/research/mev-the-rise-of-the-builders/)

You're highly encouraged to read through these articles for more context and a deeper understanding!

### Sandwich Attacks

`Sandwich Attacks` represent a very specific style of attack vector. We'll go through a couple different example pulled from [**Solodit**](https://solodit.xyz/) to outline how they work.

> ❗ **PROTIP**
> Solodit is the industry leading aggregator of validated smart contract vulnerabilities and should absolutely be in every security researcher's toolbelt!

`Sandwich Attacks` are similar in nature to `Just In Time (JIT)` liquidity exploits in that they both involve a `front run` and `back run` phase of the attack.

![pashov](/security-section-8/11-case-study-pashov/case-study-pashov1.png)

In the diagram above, the user ends up paying way more for their expected swap!

A great example of a vulnerability like this, caught in the wild, was[** a submission in a 2023 Audit of the Derby code base**](https://solodit.xyz/issues/h-2-vault-executes-swaps-without-slippage-protection-sherlock-derby-derby-git). Let's go through this submission together to see what's happening.

As described in the submission:

```
The vault executes swaps without slippage protection. That will cause a loss of funds because of sandwich attacks.
```

**_So, what is slippage protection?_**

`Slippage protection` is a methodology which gives the user the ability to set a tolerance in the change of price of tokens in a transaction.

If a user is trading `2000 USDT for 1 ETH` (like in the diagram above), `slippage protection` would allow them to say _"I don't want to pay more than 2100 USDC for 1 ETH (5%), if the price changes by more than this, revert"_.

tiA consideration like this allows users to control the impact MEV shenanigans will have on them.

In the [**Derby example**](https://solodit.xyz/issues/h-2-vault-executes-swaps-without-slippage-protection-sherlock-derby-derby-git), it seems they _tried_ to account for this, but the logic was incorrectly implemented. The submission details:

```
Both in Vault.claimTokens() and MainVault.withdrawRewards() swaps are executed through the Swaps library. It calculates the slippage parameters itself which doesn't work. Slippage calculations (min out) have to be calculated outside of the swap transaction. Otherwise, it uses the already modified pool values to calculate the min out value.
```

In this finding, Derby was attempting to account for `slippage protection`, but had erroneously added this calculation _within_ the transaction being sent to the `MemPool`. This means, by the time a user's transaction has been executed, the calculated `slippage protection` will be based on an already modified liquidity pool!

We can see this in the code, within the `swapTokensMulti` function:

```js
function swapTokensMulti(
SwapInOut memory _swap,
IController.UniswapParams memory _uniswap,
bool _rewardSwap
) public returns (uint256) {
IERC20(_swap.tokenIn).safeIncreaseAllowance(_uniswap.router, _swap.amount);

uint256 amountOutMinimum = IQuoter(_uniswap.quoter).quoteExactInput(
    abi.encodePacked(_swap.tokenIn, _uniswap.poolFee, WETH, _uniswap.poolFee, _swap.tokenOut),
    _swap.amount
);
...
}
```

The function quoteExactInput is being called _within_ our swap transaction. As a result, the calculation here will be based on already modified values!

### Gauntlet

We see a similar example of this vulnerability through [**another submission**](https://solodit.xyz/issues/deposit-and-withdraw-functions-are-susceptible-to-sandwich-attacks-spearbit-gauntlet-pdf) on Solodit, this time pertaining to a review of the Gauntlet code base.

The situation here is very similar to the previous example.

```
Description: Transactions calling the deposit() function are susceptible to sandwich attacks where an attacker
can extract value from deposits. A similar issue exists in the withdraw() function but the minimum check on the
pool holdings limits the attack’s impact.
Consider the following scenario (swap fees ignored for simplicity):

1. Suppose the Balancer pool contains two tokens, WETH and DAI, and weights are 0.5 and 0.5. Currently,
there is 1 WETH and 3k DAI in the pool and WETH spot price is 3k.

2. The Treasury wants to add another 3k DAI into the Aera vault, so it calls the deposit() function.

3. The attacker front-runs the Treasury’s transaction. They swap 3k DAI into the Balancer pool and get out 0.5 WETH. The weights remain 0.5 and 0.5, but because WETH and DAI balances become 0.5 and 6k, WETH’s spot price now becomes 12k.

4. Now, the Treasury’s transaction adds 3k DAI into the Balancer pool and upgrades the weights to 0.5*1.5: 0.5 = 0.6: 0.4.

5. The attacker back-runs the transaction and swaps the 0.5 WETH they got in step 3 back to DAI (and recovers the WETH’s spot price to near but above 3k). According to the current weights, they can get 9k*(1 - 1/r) = 3.33k DAI from the pool, where r = (2ˆ0.4)ˆ(1/0.6).


6. As a result the attacker profits 3.33k - 3k = 0.33k DAI.
```

In this instance, front running a `deposit` call allows an attacker to change the effective token ratio/price, resulting in an inflated value when the deposit function executes.

The result of this is that the attacker is able to swap back, profiting due to this change in the token ratio.

### Wrap Up

I hope this lessons has put into perspective exactly how MEV attacks (like sandwich attacks) work and stressed the need for protections such as `slippage protection` ie a `minimumAmountReceived` parameter or the like.

An alternative mitigation to MEV attack like we've seen is the leveraging of `Flashbots` and private MemPools. Let's go over what these are in more detail, in the next lesson.

_Please, don't ever miss MEV Bugs._ - Pashov
