## Analyzing a GMX Liquidity Withdrawal Request with Tenderly

This lesson walks through the process of analyzing an Arbitrum transaction that creates a withdrawal request for liquidity from a GMX V2 GM liquidity pool using the Tenderly debugging tool. Specifically, we'll examine a transaction withdrawing liquidity from a pool where WETH is the long token and USDC is the short token.

**The Initial Transaction: `multicall`**

The user interaction begins with a call to the `multicall` function on the GMX `ExchangeRouter` contract (`0x7C68C7866A64FA2160F78EEaE12217FFbf871fa8` on Arbitrum). Using `multicall` is a common pattern in DeFi, allowing multiple actions to be bundled into a single, atomic transaction, saving gas and ensuring all steps succeed or fail together.

In this specific withdrawal transaction initiated by the sender (`0xd24cba75f7af6081bff9e6122f4054f32140f49e`), the `multicall` function executes three distinct internal actions within the `ExchangeRouter`.

**Breaking Down the `multicall` Actions**

Using a tool like Tenderly allows us to inspect the sequence of internal calls triggered by the initial `multicall`.

1.  **`ExchangeRouter.sendWnt`**:
    *   **Purpose**: This function sends the required execution fee to process the withdrawal request later (by GMX keepers). This fee is paid in WETH (Wrapped Native Token on Arbitrum).
    *   **Parameters Observed**:
        *   `receiver`: `0x0628d46b5D145F183adb6Ef1f2c97ed1C4701c55` - The destination address for the fee.
        *   `amount`: `136122259000000` Wei - The amount of WETH sent.
    *   **Key Question**: Where is this execution fee actually being sent?

2.  **`ExchangeRouter.sendTokens`**:
    *   **Purpose**: This function transfers the GM market tokens from the user to an intermediary contract. These tokens represent the user's liquidity position share that they wish to redeem.
    *   **Parameters Observed**:
        *   `token`: `0x70d95587d40a2caf56bd97485ab3eec10bee6336` - The address of the specific GM market token for the WETH/USDC pool.
        *   `receiver`: `0x0628d46b5D145F183adb6Ef1f2c97ed1C4701c55` - The destination address for the GM tokens. *Crucially, this is the same address that received the execution fee in the previous step.*
        *   `amount`: `1863...` - The quantity of GM tokens being withdrawn.
    *   **Key Question**: Where are these GM tokens being sent?

3.  **`ExchangeRouter.createWithdrawal`**:
    *   **Purpose**: This is the core function call that registers the withdrawal request within the GMX system. It specifies all the necessary details for the eventual execution of the withdrawal.
    *   **Parameters Observed (within a `params` struct)**:
        *   `receiver`: `0xd24cba75f7af6081bff9e6122f4054f32140f49e` - *This is the user's wallet address*. It specifies who should ultimately receive the underlying collateral tokens (WETH and USDC) once the withdrawal is executed. Note that this differs from the `receiver` in the `sendWnt` and `sendTokens` calls.
        *   `callbackContract`: `0x0` - Not utilized in this transaction.
        *   `uiFeeReceiver`: Address for potential UI referral fees.
        *   `market`: `0x70d95587d40a2caf56bd97485ab3eec10bee6336` - The address of the GM market/pool being withdrawn from.
        *   `longTokenSwapPath` / `shortTokenSwapPath`: `[]` - Empty arrays, indicating no swaps are requested as part of the withdrawal.
        *   `minLongTokenAmount`: `"485487054638339"` - The minimum amount of WETH the user agrees to receive (slippage protection).
        *   `minShortTokenAmount`: `"1618207"` - The minimum amount of USDC the user agrees to receive (slippage protection).
        *   `shouldUnwrapNativeToken`: `true` - Indicates a preference for receiving native ETH, though the primary long token is WETH here.
        *   `executionFee`: `"136122259000000"` - Matches the amount sent via `sendWnt`.
        *   `callbackGasLimit`: `"0"`.

**Identifying the Intermediary: The `WithdrawalVault`**

The key to understanding this flow lies in identifying the `receiver` address (`0x0628d46b5D145F183adb6Ef1f2c97ed1C4701c55`) used in the first two internal calls (`sendWnt` and `sendTokens`). By using a block explorer like Arbiscan, we can verify this address. Arbiscan confirms that this address corresponds to the GMX **`WithdrawalVault`** contract.

**Understanding the GMX Withdrawal Request Flow**

Based on the Tenderly analysis and contract verification, we can outline the process for creating a GMX withdrawal request:

1.  The user initiates the withdrawal via the `ExchangeRouter`, typically using `multicall`.
2.  The `ExchangeRouter` executes internal functions:
    *   It transfers the WETH execution fee *to* the `WithdrawalVault`.
    *   It transfers the user's GM tokens *to* the `WithdrawalVault`.
    *   It calls the internal `createWithdrawal` function (which involves the `WithdrawalHandler` contract) to log the withdrawal request details, including the user's address as the final recipient and the minimum acceptable output amounts.

The `WithdrawalVault` acts as a designated holding contract specifically for funds (execution fees) and tokens (GM tokens) related to pending withdrawal requests. The actual release of the underlying collateral (WETH and USDC in this case) to the user's specified `receiver` address happens later, when a GMX keeper executes the created withdrawal request.

**How Withdrawals Differ from Other GMX Operations**

It's important to note that GMX uses different intermediary "Vault" contracts for different types of operations:

*   **Withdrawals:** Execution fees and GM tokens are sent to the `WithdrawalVault`.
*   **Deposits:** Execution fees are sent to the `DepositVault`.
*   **Limit/Trigger Orders:** Execution fees are sent to the `OrderBook` contract.

Understanding this distinction is crucial for accurately tracing funds and comprehending the GMX V2 architecture.

**Key Takeaways**

*   When creating a withdrawal request via the GMX `ExchangeRouter`, both the WETH execution fee and the GM tokens being redeemed are temporarily transferred to the `WithdrawalVault` contract within the same transaction.
*   The `receiver` parameter's meaning depends on the context: in `sendWnt` and `sendTokens` during a withdrawal request, it's the `WithdrawalVault`; within the `createWithdrawal` parameters, `receiver` refers to the end-user's wallet address.
*   Tools like Tenderly are invaluable for dissecting complex `multicall` transactions and inspecting internal function parameters.
*   Block explorers like Arbiscan are essential for verifying contract addresses and understanding their roles within the protocol.

By analyzing transactions at this level of detail, developers and users can gain a much deeper understanding of how DeFi protocols like GMX V2 function under the hood.