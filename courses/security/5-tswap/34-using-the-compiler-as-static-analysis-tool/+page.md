---
title: Using the Compiler as Static Analysis Tool
---

---

### Using the Compiler as Static Analysis Tool

Continuing with our review down `TSwapPool.sol` we reach the `ADD AND REMOVE LIQUIDITY` section, with the `deposit` function up first.

We should take the time to read and understand the provided NATSPEC for this function.

```js
/// @notice Adds liquidity to the pool
/// @dev The invariant of this function is that the ratio of WETH, PoolTokens, and LiquidityTokens is the same
/// before and after the transaction
/// @param wethToDeposit Amount of WETH the user is going to deposit
/// @param minimumLiquidityTokensToMint We derive the amount of liquidity tokens to mint from the amount of WETH the
/// user is going to deposit, but set a minimum so they know approx what they will accept
/// @param maximumPoolTokensToDeposit The maximum amount of pool tokens the user is willing to deposit, again it's
/// derived from the amount of WETH the user is going to deposit
/// @param deadline The deadline for the transaction to be completed by
```

An assessment of the function's parameters in our IDE points to an issue our compiler identified earlier...

![using-the-compiler-as-static-analysis-tool1](/security-section-5/33-using-the-compiler-as-static-analysis-tool/using-the-compiler-as-static-analysis-tool1.png)

We can see this, and other issues pointed out by our compiler again by running `forge build`.

Often an unused variable, or dead code, can be pretty innocuous. This situation is a little sneaky, however. Let's look at `Impact` and `Likelihood`.

- Impact - High - A deposit expected to fail will go through, severe disruption of functionality.
- Likelihood - High - always happens, the deadline logic isn't implemented anywhere

For the above reasons, our unused parameter may actually be a **_HIGH_**!

```js
function deposit(
        uint256 wethToDeposit,
        uint256 minimumLiquidityTokensToMint,
        uint256 maximumPoolTokensToDeposit,
        //@Audit-High - unused parameter may lead to unsupported trust in protocol functionality. Deposits expected to fail may succeed.
        uint64 deadline
    )
        external
        revertIfZero(wethToDeposit)
        returns (uint256 liquidityTokensToMint)
    {...}
```

Wow, we identified a potential high just through a compiler output! We should definitely check some of the other warnings.

![using-the-compiler-as-static-analysis-tool2](/security-section-5/33-using-the-compiler-as-static-analysis-tool/using-the-compiler-as-static-analysis-tool2.png)

`poolTokenReserves`, as pointed out by the compiler, is on line 107. It looks like this variable may have been held over from when the function was calculating things locally, but this logic has since been replaced with a function which is handling all the math.

![using-the-compiler-as-static-analysis-tool3](/security-section-5/33-using-the-compiler-as-static-analysis-tool/using-the-compiler-as-static-analysis-tool3.png)

Ultimately `poolTokenReserves` is a waste of gas and we can make a note of it as well.

```js
//@Audit-Informational - Line unused, can be removed to save gas
uint256 poolTokenReserves = i_poolToken.balanceOf(address(this));
```

Finally, our compiler is warning us about `uint256 output` an unused function parameter set to return from `swapExactInput`. This may not be a big deal but I suspect this will be at least a low.

This is a fair example of how some subjectivity can play a part in the severity of a finding. The protocol isn't using this function's return value anywhere so the impact is very low. The potential exists for this return value to be relied upon externally however, and if the protocol is returning the wrong value...

Considerations to be had, but let's mark this as a low.

```js
function swapExactInput(
        IERC20 inputToken,
        uint256 inputAmount,
        IERC20 outputToken,
        uint256 minOutputAmount,
        uint64 deadline
    )
        public
        revertIfZero(inputAmount)
        revertIfDeadlinePassed(deadline)
        //@Audit-Low - Return value not updated/used
        returns (uint256 output)
    {...}
```
