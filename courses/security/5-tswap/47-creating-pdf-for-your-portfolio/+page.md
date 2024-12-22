---
title: Creating the PDF for your Portfolio
---

---

### Report PDF

Time to generate our professional looking PDF report and add it to our portfolio! We've done this a couple times, so I hope this step is becoming easier.

We should have an `audit-data` folder with our `findings.md` within it. Add your `logo.pdf` to this folder and we can begin by creating a file named `report-template.md`.

Grab a copy of `report-template.md` from [**GitHub**](https://github.com/Cyfrin/audit-report-templating/blob/main/report-example.md) to copy into your file.

This is just a template we'll use, so create a copy of this file in our `audit-data` folder and name it similar to `2024-04-21-tswap-audit.md`.

Now we want to transfer all of our findings from `findings.md` into this template. There's a space for each severity outlined at the bottom of the template.

Remember to fill out this template **_entirely_**, customize it to this audit by adding your name and information as well as that of TSwap and its protocol summary and details. This is your opportunity to **get creative** with exactly how you believe the report should be detailed and what should be included.

I've included a copy of my completed template here for reference if you get stuck recreating it.

<details>
<summary>2024-04-21-tswap-audit.md</summary>

````
    ---
    title: Protocol Audit Report
    author: Cyfrin.io
    date: March 7, 2023
    header-includes:
    - \usepackage{titling}
    - \usepackage{graphicx}
    ---

    \begin{titlepage}
        \centering
        \begin{figure}[h]
            \centering
            \includegraphics[width=0.5\textwidth]{logo.pdf}
        \end{figure}
        \vspace*{2cm}
        {\Huge\bfseries TSwap Protocol Audit Report\par}
        \vspace{1cm}
        {\Large Version 1.0\par}
        \vspace{2cm}
        {\Large\itshape Cyfrin.io\par}
        \vfill
        {\large \today\par}
    \end{titlepage}

    \maketitle

    <!-- Your report starts here! -->

    Prepared by: [Cyfrin](https://cyfrin.io)
    Lead Auditors:
    - xxxxxxx

    # Table of Contents
    - [Table of Contents](#table-of-contents)
    - [Protocol Summary](#protocol-summary)
    - [Disclaimer](#disclaimer)
    - [Risk Classification](#risk-classification)
    - [Audit Details](#audit-details)
    - [Scope](#scope)
    - [Roles](#roles)
    - [Executive Summary](#executive-summary)
    - [Issues found](#issues-found)
    - [Findings](#findings)
    - [High](#high)
        - [\[H-1\] `TSwapPool::deposit` is missing deadline check causing transactions to complete even after the deadline](#h-1-tswappooldeposit-is-missing-deadline-check-causing-transactions-to-complete-even-after-the-deadline)
        - [\[H-2\] Incorrect fee calculation in `TSwapPool::getInputAmountBasedOnOutput` causes protocol to take too many tokens from users, resulting in lost fees](#h-2-incorrect-fee-calculation-in-tswappoolgetinputamountbasedonoutput-causes-protocll-to-take-too-many-tokens-from-users-resulting-in-lost-fees)
        - [\[H-3\] Lack of slippage protection in `TSwapPool::swapExactOutput` causes users to potentially receive way fewer tokens](#h-3-lack-of-slippage-protection-in-tswappoolswapexactoutput-causes-users-to-potentially-receive-way-fewer-tokens)
        - [\[H-4\] `TSwapPool::sellPoolTokens` mismatches input and output tokens causing users to receive the incorrect amount of tokens](#h-4-tswappoolsellpooltokens-mismatches-input-and-output-tokens-causing-users-to-receive-the-incorrect-amount-of-tokens)
        - [\[H-5\] In `TSwapPool::_swap` the extra tokens given to users after every `swapCount` breaks the protocol invariant of `x * y = k`](#h-5-in-tswappool_swap-the-extra-tokens-given-to-users-after-every-swapcount-breaks-the-protocol-invariant-of-x--y--k)
    - [Low](#low)
        - [\[L-1\] `TSwapPool::LiquidityAdded` event has parameters out of order](#l-1-tswappoolliquidityadded-event-has-parameters-out-of-order)
        - [\[L-2\] Default value returned by `TSwapPool::swapExactInput` results in incorrect return value given](#l-2-default-value-returned-by-tswappoolswapexactinput-results-in-incorrect-return-value-given)
    - [Informationals](#informationals)
        - [\[I-1\] `PoolFactory::PoolFactory__PoolDoesNotExist` is not used and should be removed](#i-1-poolfactorypoolfactory__pooldoesnotexist-is-not-used-and-should-be-removed)
        - [\[I-2\] Lacking zero address checks](#i-2-lacking-zero-address-checks)
        - [\[I-3\] `PoolFactory::createPool` should use `.symbol()` instead of `.name()`](#i-3-poolfacotrycreatepool-should-use-symbol-instead-of-name)
        - [\[I-4\] Event is missing `indexed` fields](#i-4-event-is-missing-indexed-fields)

    # Protocol Summary

    Protocol does X, Y, Z

    # Disclaimer

    The YOUR_NAME_HERE team makes all effort to find as many vulnerabilities in the code in the given time period, but holds no responsibilities for the findings provided in this document. A security audit by the team is not an endorsement of the underlying business or product. The audit was time-boxed and the review of the code was solely on the security aspects of the Solidity implementation of the contracts.

    # Risk Classification

    |            |        | Impact |        |     |
    | ---------- | ------ | ------ | ------ | --- |
    |            |        | High   | Medium | Low |
    |            | High   | H      | H/M    | M   |
    | Likelihood | Medium | H/M    | M      | M/L |
    |            | Low    | M      | M/L    | L   |

    We use the [CodeHawks](https://docs.codehawks.com/hawks-auditors/how-to-evaluate-a-finding-severity) severity matrix to determine severity. See the documentation for more details.

    # Audit Details
    ## Scope
    ## Roles
    # Executive Summary
    ## Issues found

    | Severity | Number of issues found |
    | --------- | ---------------------- |
    | High      | 4                      |
    | Medium    | 2                      |
    | Low       | 2                      |
    | Info      | 9                      |
    | Total     | 17                     |


    # Findings
    ## High

    ### [H-1] `TSwapPool::deposit` is missing deadline check causing transactions to complete even after the deadline

    **Description:** The `deposit` function accepts a deadline parameter, which according to the documentation is "The deadline for the transaction to be completed by". However, this parameter is never used. As a consequence, operations that add liquidity to the pool might be executed at unexpected times, in market conditions where the deposit rate is unfavorable.

    <!-- MEV attacks -->

    **Impact:** Transactions could be sent when market conditions are unfavorable to deposit, even when adding a deadline parameter.

    **Proof of Concept:** The `deadline` parameter is unused.

    **Recommended Mitigation:** Consider making the following change to the function.

    ```diff
    function deposit(
            uint256 wethToDeposit,
            uint256 minimumLiquidityTokensToMint, // LP tokens -> if empty, we can pick 100% (100% == 17 tokens)
            uint256 maximumPoolTokensToDeposit,
            uint64 deadline
        )
            external
    +       revertIfDeadlinePassed(deadline)
            revertIfZero(wethToDeposit)
            returns (uint256 liquidityTokensToMint)
        {
    ```

    ### [H-2] Incorrect fee calculation in `TSwapPool::getInputAmountBasedOnOutput` causes protocol to take too many tokens from users, resulting in lost fees

    **Description:** The `getInputAmountBasedOnOutput` function is intended to calculate the amount of tokens a user should deposit given an amount of tokens of output tokens. However, the function currently miscalculates the resulting amount. When calculating the fee, it scales the amount by 10_000 instead of 1_000.

    **Impact:** Protocol takes more fees than expected from users.

    **Recommended Mitigation:**

    ```diff
        function getInputAmountBasedOnOutput(
            uint256 outputAmount,
            uint256 inputReserves,
            uint256 outputReserves
        )
            public
            pure
            revertIfZero(outputAmount)
            revertIfZero(outputReserves)
            returns (uint256 inputAmount)
        {
    -        return ((inputReserves * outputAmount) * 10_000) / ((outputReserves - outputAmount) * 997);
    +        return ((inputReserves * outputAmount) * 1_000) / ((outputReserves - outputAmount) * 997);
        }
    ```

    ### [H-3] Lack of slippage protection in `TSwapPool::swapExactOutput` causes users to potentially receive way fewer tokens

    **Description:** The `swapExactOutput` function does not include any sort of slippage protection. This function is similar to what is done in `TSwapPool::swapExactInput`, where the function specifies a `minOutputAmount`, the `swapExactOutput` function should specify a `maxInputAmount`.

    **Impact:** If market conditions change before the transaction processes, the user could get a much worse swap.

    **Proof of Concept:**
    1. The price of 1 WETH right now is 1,000 USDC
    2. User inputs a `swapExactOutput` looking for 1 WETH
    1. inputToken = USDC
    2. outputToken = WETH
    3. outputAmount = 1
    4. deadline = whatever
    3. The function does not offer a maxInput amount
    4. As the transaction is pending in the mempool, the market changes! And the price moves HUGE -> 1 WETH is now 10,000 USDC. 10x more than the user expected
    5. The transaction completes, but the user sent the protocol 10,000 USDC instead of the expected 1,000 USDC

    **Recommended Mitigation:** We should include a `maxInputAmount` so the user only has to spend up to a specific amount, and can predict how much they will spend on the protocol.

    ```diff
        function swapExactOutput(
            IERC20 inputToken,
    +       uint256 maxInputAmount,
    .
    .
    .
            inputAmount = getInputAmountBasedOnOutput(outputAmount, inputReserves, outputReserves);
    +       if(inputAmount > maxInputAmount){
    +           revert();
    +       }
            _swap(inputToken, inputAmount, outputToken, outputAmount);
    ```

    ### [H-4] `TSwapPool::sellPoolTokens` mismatches input and output tokens causing users to receive the incorrect amount of tokens

    **Description:** The `sellPoolTokens` function is intended to allow users to easily sell pool tokens and receive WETH in exchange. Users indicate how many pool tokens they're willing to sell in the `poolTokenAmount` parameter. However, the function currently miscalculates the swapped amount.

    This is due to the fact that the `swapExactOutput` function is called, whereas the `swapExactInput` function is the one that should be called. Because users specify the exact amount of input tokens, not output.

    **Impact:** Users will swap the wrong amount of tokens, which is a severe disruption of protocol functionality.

    **Proof of Concept:**
    <write PoC here>

    **Recommended Mitigation:**

    Consider changing the implementation to use `swapExactInput` instead of `swapExactOutput`. Note that this would also require changing the `sellPoolTokens` function to accept a new parameter (ie `minWethToReceive` to be passed to `swapExactInput`)

    ```diff
        function sellPoolTokens(
            uint256 poolTokenAmount,
    +       uint256 minWethToReceive,
            ) external returns (uint256 wethAmount) {
    -        return swapExactOutput(i_poolToken, i_wethToken, poolTokenAmount, uint64(block.timestamp));
    +        return swapExactInput(i_poolToken, poolTokenAmount, i_wethToken, minWethToReceive, uint64(block.timestamp));
        }
    ```

    Additionally, it might be wise to add a deadline to the function, as there is currently no deadline. (MEV later)

    ### [H-5] In `TSwapPool::_swap` the extra tokens given to users after every `swapCount` breaks the protocol invariant of `x * y = k`

    **Description:** The protocol follows a strict invariant of `x * y = k`. Where:
    - `x`: The balance of the pool token
    - `y`: The balance of WETH
    - `k`: The constant product of the two balances

    This means, that whenever the balances change in the protocol, the ratio between the two amounts should remain constant, hence the `k`. However, this is broken due to the extra incentive in the `_swap` function. Meaning that over time the protocol funds will be drained.

    The follow block of code is responsible for the issue.

    ```javascript
            swap_count++;
            if (swap_count >= SWAP_COUNT_MAX) {
                swap_count = 0;
                outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
            }
    ```

    **Impact:** A user could maliciously drain the protocol of funds by doing a lot of swaps and collecting the extra incentive given out by the protocol.

    Most simply put, the protocol's core invariant is broken.

    **Proof of Concept:**
    1. A user swaps 10 times, and collects the extra incentive of `1_000_000_000_000_000_000` tokens
    2. That user continues to swap until all the protocol funds are drained

    <details>
    <summary>Proof Of Code</summary>

    Place the following into `TSwapPool.t.sol`.

    ```javascript

        function testInvariantBroken() public {
            vm.startPrank(liquidityProvider);
            weth.approve(address(pool), 100e18);
            poolToken.approve(address(pool), 100e18);
            pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
            vm.stopPrank();

            uint256 outputWeth = 1e17;

            vm.startPrank(user);
            poolToken.approve(address(pool), type(uint256).max);
            poolToken.mint(user, 100e18);
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));

            int256 startingY = int256(weth.balanceOf(address(pool)));
            int256 expectedDeltaY = int256(-1) * int256(outputWeth);

            pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
            vm.stopPrank();

            uint256 endingY = weth.balanceOf(address(pool));
            int256 actualDeltaY = int256(endingY) - int256(startingY);
            assertEq(actualDeltaY, expectedDeltaY);
        }
    ```

    </details>

    **Recommended Mitigation:** Remove the extra incentive mechanism. If you want to keep this in, we should account for the change in the x * y = k protocol invariant. Or, we should set aside tokens in the same way we do with fees.

    ```diff
    -        swap_count++;
    -        // Fee-on-transfer
    -        if (swap_count >= SWAP_COUNT_MAX) {
    -            swap_count = 0;
    -            outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
    -        }
    ```

    ## Low

    ### [L-1] `TSwapPool::LiquidityAdded` event has parameters out of order

    **Description:** When the `LiquidityAdded` event is emitted in the `TSwapPool::_addLiquidityMintAndTransfer` function, it logs values in an incorrect order. The `poolTokensToDeposit` value should go in the third parameter position, whereas the `wethToDeposit` value should go second.

    **Impact:** Event emission is incorrect, leading to off-chain functions potentially malfunctioning.

    **Recommended Mitigation:**

    ```diff
    - emit LiquidityAdded(msg.sender, poolTokensToDeposit, wethToDeposit);
    + emit LiquidityAdded(msg.sender, wethToDeposit, poolTokensToDeposit);
    ```

    ### [L-2] Default value returned by `TSwapPool::swapExactInput` results in incorrect return value given

    **Description:** The `swapExactInput` function is expected to return the actual amount of tokens bought by the caller. However, while it declares the named return value `output` it is never assigned a value, nor uses an explicit return statement.

    **Impact:** The return value will always be 0, giving incorrect information to the caller.

    **Recommended Mitigation:**

    ```diff
        {
            uint256 inputReserves = inputToken.balanceOf(address(this));
            uint256 outputReserves = outputToken.balanceOf(address(this));

    -        uint256 outputAmount = getOutputAmountBasedOnInput(inputAmount, inputReserves, outputReserves);
    +        output = getOutputAmountBasedOnInput(inputAmount, inputReserves, outputReserves);

    -        if (output < minOutputAmount) {
    -            revert TSwapPool__OutputTooLow(outputAmount, minOutputAmount);
    +        if (output < minOutputAmount) {
    +            revert TSwapPool__OutputTooLow(outputAmount, minOutputAmount);
            }

    -        _swap(inputToken, inputAmount, outputToken, outputAmount);
    +        _swap(inputToken, inputAmount, outputToken, output);
        }
    ```

    ## Informationals

    ### [I-1] `PoolFactory::PoolFactory__PoolDoesNotExist` is not used and should be removed

    ```diff
    - error PoolFactory__PoolDoesNotExist(address tokenAddress);
    ```

    ### [I-2] Lacking zero address checks

    ```diff
        constructor(address wethToken) {
    +       if(wethToken == address(0)) {
    +            revert();
    +        }
            i_wethToken = wethToken;
        }
    ```

    ### [I-3] `PoolFactory::createPool` should use `.symbol()` instead of `.name()`

    ```diff
    -        string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).name());
    +        string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).symbol());
    ```

    ### [I-4] Event is missing `indexed` fields

    Index event fields make the field more quickly accessible to off-chain tools that parse events. However, note that each index field costs extra gas during emission, so it's not necessarily best to index the maximum allowed per event (three fields). Each event should use three indexed fields if there are three or more fields, and gas usage is not particularly of concern for the events in question. If there are fewer than three fields, all of the fields should be indexed.

    - Found in src/TSwapPool.sol: Line: 44
    - Found in src/PoolFactory.sol: Line: 37
    - Found in src/TSwapPool.sol: Line: 46
    - Found in src/TSwapPool.sol: Line: 43

````

</details>


Once your report template is filled out, we just have to run `pandoc` on it!

```bash
cd audit-data
pandoc 2024-04-21-tswap-audit.md -o report.pdf --from markdown --template=eisvogel --listings
```

Amazing, if things went well, you should have a PDF audit report something like [**this**](https://github.com/Cyfrin/5-t-swap-audit/blob/audit-data/audit-data/report.pdf).

### Wrap Up

We've gotten so far! We've learnt so much in this section and in the end we got _another_ professional report that you should absolutely add to your GitHub portfolio.

Let's recap everything we've done in the next lesson! Woooooo!
