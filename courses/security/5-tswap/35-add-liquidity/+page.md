---
title: Manual Review - TSwapPool.sol - Add Liquidity
---

---

### Manual Review Continued

Ok! We went on a bit of a tangent following up with our compiler warnings, but let's continue where we left off, in the `deposit` function.

<details>
<summary>Deposit Function</summary>

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
        revert TSwapPool__WethDepositAmountTooLow(MINIMUM_WETH_LIQUIDITY, wethToDeposit);
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
        // (wethReserves + wethToDeposit) / poolTokensToDeposit = wethReserves
        // (wethReserves + wethToDeposit)  = wethReserves * poolTokensToDeposit
        // (wethReserves + wethToDeposit) / wethReserves  =  poolTokensToDeposit
        uint256 poolTokensToDeposit = getPoolTokensToDepositBasedOnWeth(wethToDeposit);
        if (maximumPoolTokensToDeposit < poolTokensToDeposit) {
            revert TSwapPool__MaxPoolTokenDepositTooHigh(maximumPoolTokensToDeposit, poolTokensToDeposit);
        }

        // We do the same thing for liquidity tokens. Similar math.
        liquidityTokensToMint = (wethToDeposit * totalLiquidityTokenSupply()) / wethReserves;
        if (liquidityTokensToMint < minimumLiquidityTokensToMint) {
            revert TSwapPool__MinLiquidityTokensToMintTooLow(minimumLiquidityTokensToMint, liquidityTokensToMint);
        }
        _addLiquidityMintAndTransfer(wethToDeposit, poolTokensToDeposit, liquidityTokensToMint);
    } else {
        // This will be the "initial" funding of the protocol. We are starting from blank here!
        // We just have them send the tokens in, and we mint liquidity tokens based on the weth
        _addLiquidityMintAndTransfer(wethToDeposit, maximumPoolTokensToDeposit, wethToDeposit);
        liquidityTokensToMint = wethToDeposit;
    }
}
```

</details>


Continuing down from `uint63 deadline`, we see a modifier we assessed earlier being applied - `revertIfZero(wethToDeposit)`.

The function then performs a conditional check on the deposit amount, assuring that it is not less than the `MINIMUM_WETH_LIQUIDITY`. Our function will revert with the custom error `TSwapPool__WethDepositAmountTooLow(MINIMUM_WETH_LIQUIDITY, wethToDeposit)` if this condition isn't met. Of note is that our custom error is emitting `MINIMUM_WETH_LIQUIDITY`. This is a constant in our contract and thus emitting this value is not providing any additional information to us. Anyone could check this constant!

Let's make a note.

```js
if (wethToDeposit < MINIMUM_WETH_LIQUIDITY) {
    //@Audit-Informational: MINIMUM_WETH_LIQUIDITY is a constant, emitting unnecessary
    revert TSwapPool__WethDepositAmountTooLow(MINIMUM_WETH_LIQUIDITY, wethToDeposit);
}
```

From this point our function has two deviating branches of logic. It's going to behave one way if it is the _first time_ someone has deposited vs subsequent deposits. These branches are represented by this conditional (I've removed commented lines for brevity).

```js
if (totalLiquidityTokenSupply() > 0) {
    uint256 wethReserves = i_wethToken.balanceOf(address(this));
    uint256 poolTokenReserves = i_poolToken.balanceOf(address(this));
    // Our invariant says weth, poolTokens, and liquidity tokens must always have the same ratio after the
    // initial deposit
    uint256 poolTokensToDeposit = getPoolTokensToDepositBasedOnWeth(wethToDeposit);
    if (maximumPoolTokensToDeposit < poolTokensToDeposit) {
        revert TSwapPool__MaxPoolTokenDepositTooHigh(maximumPoolTokensToDeposit, poolTokensToDeposit);
    }

    // We do the same thing for liquidity tokens. Similar math.
    liquidityTokensToMint = (wethToDeposit * totalLiquidityTokenSupply()) / wethReserves;
    if (liquidityTokensToMint < minimumLiquidityTokensToMint) {
        revert TSwapPool__MinLiquidityTokensToMintTooLow(minimumLiquidityTokensToMint, liquidityTokensToMint);
    }
    _addLiquidityMintAndTransfer(wethToDeposit, poolTokensToDeposit, liquidityTokensToMint);
} else {
    // This will be the "initial" funding of the protocol. We are starting from blank here!
    // We just have them send the tokens in, and we mint liquidity tokens based on the weth
    _addLiquidityMintAndTransfer(wethToDeposit, maximumPoolTokensToDeposit, wethToDeposit);
    liquidityTokensToMint = wethToDeposit;
}
```

The `else` condition of when the pool has zero balance when the function is called is more approachable and identifies the first warm up of the protocol. Let's start there.

### \_addLiquidityMintAndTransfer

If `deposit` is called and the pool doesn't have balance, it looks like `_addLiquidityMintAndTransfer` is called. We definitely have to take a closer look at this function.

```js
/// @dev This is a sensitive function, and should only be called by deposit
/// @param wethToDeposit The amount of WETH the user is going to deposit
/// @param poolTokensToDeposit The amount of pool tokens the user is going to deposit
/// @param liquidityTokensToMint The amount of liquidity tokens the user is going to mint
function _addLiquidityMintAndTransfer(
    uint256 wethToDeposit,
    uint256 poolTokensToDeposit,
    uint256 liquidityTokensToMint
)
    private
{
    _mint(msg.sender, liquidityTokensToMint);
    emit LiquidityAdded(msg.sender, poolTokensToDeposit, wethToDeposit);

    // Interactions
    i_wethToken.safeTransferFrom(msg.sender, address(this), wethToDeposit);
    i_poolToken.safeTransferFrom(msg.sender, address(this), poolTokensToDeposit);
}
```

Immediately we see that the function is "sensitive". We should verify that it's only called as described, during `deposit`. As it stands, it is and this is assured by the function's visibility being set to `private`.

The method begins by minting `msg.sender` the passed number of `liquidityTokensToMint` and emit an event, we should always check that events are emitting the parameters expected.

Here's the event in our function:

```js
emit LiquidityAdded(msg.sender, poolTokensToDeposit, wethToDeposit);
```

Here's the event declaration:

```js
event LiquidityAdded(address indexed liquidityProvider, uint256 wethDeposited, uint256 poolTokensDeposited);
```

Do you spot the bug?

Our second and third parameters have been switched in our event emission! This is going to provide any system relying on these events with inaccurate data and should be noted in our report.

```js
//@Audit-Low - Ordering of event emissions incorrect, should be `emit LiquidityAdded(msg.sender, wethToDeposit, poolTokensToDeposit)`
```

I always set bugs if this nature related to event data as `low`, but there's a bit of contention. Let's break down the impact/likelihood.

- **Impact:** Low - protocol is giving the wrong information
- **Likelihood:** High - Always happens

It's really hard to justify a situation like this as a `medium`, but we can imagine other parts of a protocol relying on events (such as an oracle) that could easily bump something like this up to a `medium` or even a `high`.

The last thing our `_addLiquidityMintAndTransfer` function does is its interactions, it actually performs the transfers of tokens. This is great! The protocol team is following `CEI (checks, effects, interactions)`. I may even make a note for myself indicating that this has been considered and confirmed.

```js
// Follows CEI
```

### Back to Deposit

Back to our `deposit` function, after `_addLiquidityMintAndTransfer` is called it looks like we're setting `liquidityTokensToMint = wethToDeposit`.

At first glance this worries me. We're making external calls in our `_addLiquidityMintAndTransfer` function and then we're updating a variable. In this circumstance `liquidityTokensToMint` isn't a state variable, so we're _technically_ ok, but I would make a note of this and always remember to verify similar situations.

```js
_addLiquidityMintAndTransfer(
  wethToDeposit,
  maximumPoolTokensToDeposit,
  wethToDeposit
);
// @Audit-Informational - Not a state variable but would be better to follow CEI
liquidityTokensToMint = wethToDeposit;
```

Alright, we've checked all of the logic handled by the protocol's warm up, when there's no balance in the pool. Let's take a look at how things are managed when liquidity already exists.

```js
if (totalLiquidityTokenSupply() > 0) {
    uint256 wethReserves = i_wethToken.balanceOf(address(this));
    uint256 poolTokenReserves = i_poolToken.balanceOf(address(this));
    ...
}
```

We first assign values to `wethReserves` and `poolTokenReserves`, of course we noted earlier that `poolTokenReserves` is never actually used.

`Deposit` is then calling `getPoolTokensToDepositBasedOnWeth`, this function is effectively applying the math of our token ratio to assure the ratio doesn't change and returns `(wethToDeposit * poolTokenReserves) / wethReserves;`. For the purposes of this course - this function looks fine to me, but perhaps you want to look more closely here on your own.

Continuing down our deposit function, we next hit a conditional statement.

```js
if (maximumPoolTokensToDeposit < poolTokensToDeposit) {
    revert TSwapPool__MaxPoolTokenDepositTooHigh(maximumPoolTokensToDeposit, poolTokensToDeposit);
}
```

If too many poolTokens are calculated, the deposit function will revert - good!

Finally it seems the `deposit` function is performing a similar step for liquidity tokens where in the amount to mind is calculated, the amount is checked for validity and then the tokens are minted and transferred.

```js
liquidityTokensToMint = (wethToDeposit * totalLiquidityTokenSupply()) / wethReserves;
if (liquidityTokensToMint < minimumLiquidityTokensToMint) {
    revert TSwapPool__MinLiquidityTokensToMintTooLow(minimumLiquidityTokensToMint, liquidityTokensToMint);
}
_addLiquidityMintAndTransfer(wethToDeposit, poolTokensToDeposit, liquidityTokensToMint);
```

### Wrap Up

Great! We're all done our review of the `deposit` function. At this point I would likely leave a note indicating that this section of the code has been assessed and to follow-up as needed.

Leaving regular notes in the code base as you go will make report writing much easier in the future, so get into this habit!

```js
// @Audit - Review Complete - follow up
function deposit(
    uint256 wethToDeposit,
    uint256 minimumLiquidityTokensToMint,
    uint256 maximumPoolTokensToDeposit,
    uint64 deadline
)
```

See you in the next lesson where we tackle the `withdraw` function.
