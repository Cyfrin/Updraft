---
title: MEV - TSwap
---

_Follow along with this video:_

---

### MEV - TSwap

Ok, so Puppy Raffle wasn't safe - what about TSwap, was there a problem there?

Absolutely! Recall from TSwapPool.sol, the deposit function:

<details>
<summary>TSwapPool.sol::deposit</summary>

```js
function deposit(
    uint256 wethToDeposit,
    uint256 minimumLiquidityTokensToMint,
    uint256 maximumPoolTokensToDeposit,
    uint64 deadline
)
    external
    revertIfZero(wethToDeposit)
    returns (uint256 liquidityTokensToMint)
{
    if (wethToDeposit < MINIMUM_WETH_LIQUIDITY) {
        revert TSwapPool__WethDepositAmountTooLow(
            MINIMUM_WETH_LIQUIDITY,
            wethToDeposit
        );
    }
    if (totalLiquidityTokenSupply() > 0) {
        uint256 wethReserves = i_wethToken.balanceOf(address(this));
        uint256 poolTokenReserves = i_poolToken.balanceOf(address(this));
        // Our invariant says weth, poolTokens, and liquidity tokens must always have the same ratio after the
        // initial deposit
        // poolTokens / constant(k) = weth
        // weth / constant(k) = liquidityTokens
        // aka...
        // weth / poolTokens = constant(k)
        // To make sure this holds, we can make sure the new balance will match the old balance
        // (wethReserves + wethToDeposit) / (poolTokenReserves + poolTokensToDeposit) = constant(k)
        // (wethReserves + wethToDeposit) / (poolTokenReserves + poolTokensToDeposit) =
        // (wethReserves / poolTokenReserves)
        //
        // So we can do some elementary math now to figure out poolTokensToDeposit...
        // (wethReserves + wethToDeposit) = (poolTokenReserves + poolTokensToDeposit) * (wethReserves / poolTokenReserves)
        // wethReserves + wethToDeposit  = poolTokenReserves * (wethReserves / poolTokenReserves) + poolTokensToDeposit * (wethReserves / poolTokenReserves)
        // wethReserves + wethToDeposit = wethReserves + poolTokensToDeposit * (wethReserves / poolTokenReserves)
        // wethToDeposit / (wethReserves / poolTokenReserves) = poolTokensToDeposit
        // (wethToDeposit * poolTokenReserves) / wethReserves = poolTokensToDeposit
        uint256 poolTokensToDeposit = getPoolTokensToDepositBasedOnWeth(
            wethToDeposit
        );
        if (maximumPoolTokensToDeposit < poolTokensToDeposit) {
            revert TSwapPool__MaxPoolTokenDepositTooHigh(
                maximumPoolTokensToDeposit,
                poolTokensToDeposit
            );
        }

        // We do the same thing for liquidity tokens. Similar math.
        liquidityTokensToMint =
            (wethToDeposit * totalLiquidityTokenSupply()) /
            wethReserves;
        if (liquidityTokensToMint < minimumLiquidityTokensToMint) {
            revert TSwapPool__MinLiquidityTokensToMintTooLow(
                minimumLiquidityTokensToMint,
                liquidityTokensToMint
            );
        }
        _addLiquidityMintAndTransfer(
            wethToDeposit,
            poolTokensToDeposit,
            liquidityTokensToMint
        );
    } else {
        // This will be the "initial" funding of the protocol. We are starting from blank here!
        // We just have them send the tokens in, and we mint liquidity tokens based on the weth
        _addLiquidityMintAndTransfer(
            wethToDeposit,
            maximumPoolTokensToDeposit,
            wethToDeposit
        );
        liquidityTokensToMint = wethToDeposit;
    }
}
```

</details>


We identified, during our review, that the `deadline` parameter wasn't being used. How would that potentially lead to an `MEV` attack in `TSwap`?

Before a transaction is sent to the `MemPool`, it is sent to a node. Node operators have privileged information with respect to transactions about to be added to the blockchain and in some circumstances they can delay when a transaction is processed by up to a whole block. If the `deadline` parameter was properly employed it could have prevented this!

Imagine a node operator happened to be a `liquidity provider` in `TSwap`. This operator would be able to see pending deposits into the protocol, the practical effect of which would be that their shares and fees are lowered as the `LPTokens` are diluted.

This malicious node operator would have the power to delay the processing of this `deposit` transaction in favor of validating more swap transactions maximizing the fees they would obtain from the protocol at the expensive of the new depositor!

![mev-in-tswap1](/security-section-8/6-tswap-mev/mev-in-tswap1.png)

### Wrap Up

Oh geez, are _any_ of our previous reviews safe from this massive exploit!?

Let's check `Thunder Loan` next!
