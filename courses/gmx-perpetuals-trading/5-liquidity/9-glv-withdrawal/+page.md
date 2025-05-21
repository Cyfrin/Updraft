## Understanding GMX V2 GlvVault Liquidity Withdrawals

This lesson analyzes the technical process of removing liquidity from a GMX V2 GlvVault (GMX Liquidity Vault) by examining a specific blockchain transaction. We will trace the function calls and inspect the parameters involved using transaction analysis tools like Tenderly and block explorers like Arbiscan.

The primary interaction for withdrawing liquidity from a GlvVault occurs through the `GlvRouter` contract. Typically, this is initiated via its `multicall` function.

**The `multicall` Orchestration**

Using `multicall` allows multiple distinct actions required for the withdrawal to be bundled and executed atomically within a single transaction. If any part fails, the entire transaction reverts. For a GlvVault withdrawal, the `multicall` function typically orchestrates the following sequence of internal calls executed by the `GlvRouter`:

1.  **Sending the Execution Fee (WNT):**
    *   The first step involves transferring the necessary execution fee, usually in the form of Wrapped Native Token (WNT, e.g., WETH on Arbitrum), to the target `GlvVault` contract.
    *   *Transaction Trace Example:*
        ```
        [Receiver] GlvRouter.sendWnt(receiver = 0x393053b58f9678c9c28c2ce941ff6cac49c3f8f9, amount = 580004100000000)
        ```
    *   Here, the `receiver` address (`0x393...f8f9`) is the `GlvVault` contract, confirmed using a block explorer like Arbiscan. The `amount` represents the execution fee required by keepers to process the withdrawal request.

2.  **Sending the GLV Token:**
    *   Next, the user's GLV token, representing their share of liquidity in that specific vault, must be sent to the `GlvVault` contract.
    *   *Transaction Trace Example:*
        ```
        [Receiver] GlvRouter.sendTokens(token = 0x528a5bac7e746c9a509a1f4f6df58a03d44279f9, receiver = 0x39305...f8f9, amount = 2601985...)
        ```
    *   The `token` address (`0x528...79f9`) is the specific GLV ERC-20 token associated with the vault liquidity being withdrawn. The `receiver` is again the `GlvVault` address (`0x393...f8f9`), and `amount` is the quantity of GLV tokens being returned by the user.

3.  **Creating the Withdrawal Order:**
    *   The final core action within the `multicall` is initiating the actual withdrawal request by calling the `createGlvWithdrawal` function on the `GlvRouter`.
    *   *Transaction Trace Example:*
        ```
        [Receiver] GlvRouter.createGlvWithdrawal(params = { "receiver": "0xd24cba...", "callbackContract": "0x0...", ... })
        ```
    *   This function takes a structured set of parameters (`params`) detailing the specifics of the withdrawal request.

**Dissecting `createGlvWithdrawal` Parameters**

Using a debugger tool like Tenderly, we can inspect the decoded input parameters passed to the `createGlvWithdrawal` function. While many parameters resemble those used for withdrawing from older GMX V1 Market (GM) pools, there's a crucial distinction for GlvVaults.

*   *Debugger Input Example:*
    ```json
    "input": {
      "params": {
        "receiver": "0xd24cba75f7af6081bff9e6122f4054f32140f49e", // User's address
        "callbackContract": "0x0000000000000000000000000000000000000000", // Optional callback
        "uiFeeReceiver": "0xff00000000000000000000000000000000000001", // UI fee recipient
        "market": "0x6ecf2133e2c9751caadcb6958654bae198a797", // Associated market address
        "glv": "0x528a5bac7e746c9a509a1f4f6df58a03d44279f9", // *** Address of the GLV token ***
        "longTokenSwapPath": [], // Optional swap path
        "shortTokenSwapPath": [], // Optional swap path
        "minLongTokenAmount": "4823285172573818", // Slippage protection
        "minShortTokenAmount": "16363422", // Slippage protection
        "shouldUnwrapNativeToken": true, // Receive ETH vs WETH
        "executionFee": "580004100000000", // Keeper fee (matches WNT sent)
        "callbackGasLimit": "0" // Callback gas limit
      }
    }
    ```

**Key Parameter: `glv`**

The most important parameter to note for GlvVault withdrawals, distinguishing them from GMX V1 GM pool withdrawals, is the `glv` field.

*   **`glv` (address):** This field *must* contain the specific contract address of the GLV token that the user is withdrawing liquidity from. This address (`0x528...79f9` in the example) directly corresponds to the token address sent in the `sendTokens` step earlier in the `multicall`.

This explicit `glv` parameter is necessary because the GMX V2 system supports multiple liquidity vaults (GLVs), and the router needs to know precisely which vault's liquidity token is being redeemed. Other parameters like `receiver`, `market`, minimum amounts for slippage protection (`minLongTokenAmount`, `minShortTokenAmount`), and `executionFee` function similarly to other GMX withdrawal mechanisms.

In summary, withdrawing liquidity from a GMX V2 GlvVault via the `GlvRouter` involves a `multicall` executing three steps: sending the WNT execution fee, sending the specific GLV token back to the vault, and finally calling `createGlvWithdrawal` with detailed parameters, crucially including the address of the GLV token itself in the `glv` field. Analyzing these transactions using tools like Tenderly and verifying addresses on block explorers like Arbiscan provides a clear understanding of the underlying process.