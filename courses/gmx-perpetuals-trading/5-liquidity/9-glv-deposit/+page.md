## Analyzing a GMX V2 GLV Liquidity Deposit Transaction with Tenderly

This lesson explores the technical details of adding liquidity to a GMX V2 GLV (GMX Liquidity Vault) pool. We'll dissect a specific transaction using the Tenderly debugger to understand the contract interactions and function parameters involved, contrasting them with the process for standard GMX Market (GM) pools.

Our analysis relies primarily on the Tenderly debugger for transaction tracing and parameter inspection. We also utilize Arbiscan to verify contract identities encountered during the trace.

**Transaction Flow Overview**

Unlike adding liquidity to standard GM pools, which typically involves the `ExchangeRouter`, providing liquidity to a GLV pool initiates interaction with the `GlvRouter` contract. The primary function called in the analyzed transaction is `GlvRouter.multicall`, a mechanism used to bundle multiple internal operations into a single atomic transaction.

**Dissecting the `multicall`**

Within the `multicall` execution trace observed in Tenderly, two key internal function calls are central to the GLV deposit process:

1.  `GlvRouter.sendWnt`
2.  `GlvRouter.createGlvDeposit`

Let's examine each call in detail.

**Internal Call 1: `GlvRouter.sendWnt`**

The first internal call executed is `GlvRouter.sendWnt`. Examining its parameters provides crucial insights:

```solidity
// Example call from Tenderly trace
[Receiver] GlvRouter.sendWnt(
    receiver = 0x393053b58f9678c9c28c2ce941ff6cac49c3f8f9,
    amount = 10193677211000000 // Example WNT amount
)
```

The `amount` parameter represents the quantity of Wrapped Native Token (WNT/WETH) being sent. This is often related to covering the execution fee required by keepers to process asynchronous GMX V2 orders.

A key point of investigation from the video analysis was the `receiver` address (`0x393...f8f9` in this specific example). Initial hypotheses might vary, but verification using Arbiscan confirmed that this address corresponds directly to the **`GlvVault` contract** itself. This is a significant finding: for GLV deposits initiated via `GlvRouter`, the execution fee (or related WNT component handled by `sendWnt`) is sent directly to the specific `GlvVault` contract associated with the target market, not a generic deposit handler or the `ExchangeRouter`.

**Internal Call 2: `GlvRouter.createGlvDeposit`**

The second, and core, internal call within the `multicall` is `GlvRouter.createGlvDeposit`. This function is responsible for formally creating the liquidity deposit order. Its input relies on a `params` struct, which bundles all necessary information for the deposit:

```solidity
// Example call from Tenderly trace
[Receiver] GlvRouter.createGlvDeposit(
    params = {
        "glv": "0x528a5bac7e746c9a509a1f4f6df58a03d44279f9", // Address of the GLV token
        "market": "0x248c35760068ce009a13076d573ed3497a47bcd4", // Address of the underlying market
        "receiver": "0xd24cba75f7af6081bff9e6122f4054f32140f49e", // Address to receive minted GLV tokens
        "initialLongToken": "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", // e.g., WETH address
        "initialShortToken": "0xaf88d065e77c8cc2239327c5edb3a43268e5831", // e.g., USDC address
        "longTokenSwapPath": [], // Path for swapping long token if needed
        "shortTokenSwapPath": [], // Path for swapping short token if needed
        "minGlvTokens": /* ...value... */, // Minimum acceptable GLV tokens
        "executionFee": /* ...value... */, // Fee paid to keeper
        "callbackGasLimit": /* ...value... */, // Gas limit for callback
        "shouldUnwrapNativeToken": /* ...boolean... */, // Flag for unwrapping WNT
        "isMarketTokenDeposit": /* ...boolean... */ // Flag indicating deposit type
    }
)
```

Understanding the key fields within the `params` struct is crucial:

*   **`glv`**: The specific contract address of the ERC-20 GLV token that represents the liquidity provider's share in this particular vault. This must be specified by the caller.
*   **`market`**: The contract address of the underlying GMX market (e.g., the WETH/USDC market) for which this GLV exists.
*   **`receiver`**: The end-user address designated to receive the minted GLV tokens once the deposit order is successfully executed by a keeper. In the analyzed transaction, this was the address of the user initiating the transaction.
*   **`initialLongToken` / `initialShortToken`**: The contract addresses of the assets that constitute the market pair (identified as WETH and USDC respectively in this specific transaction example).
*   **Other Parameters**: Fields like swap paths (empty in this case, indicating direct deposit of market tokens), minimum acceptable GLV tokens, execution fee details, and flags provide further control over the deposit execution.

**Key Differences: GLV vs. GM Liquidity Provision**

This transaction analysis highlights fundamental differences in the process compared to adding liquidity to standard GM pools:

*   **Router Contract:** GLV deposits use the `GlvRouter`, whereas standard GM deposits/withdrawals primarily interact with the `ExchangeRouter`.
*   **Vault Interaction:** GLV deposits involve direct interaction with a specific `GlvVault` contract, identified by the `glv` parameter. This `GlvVault` also receives the WNT via the `sendWnt` call. Standard GM operations typically involve `DepositVault` and `WithdrawalVault` contracts managed via the `ExchangeRouter`.
*   **Core Function:** The defining function call for initiating a GLV deposit is `GlvRouter.createGlvDeposit`, nested within `multicall`.
*   **Parameter Requirements:** Adding GLV liquidity requires explicitly providing the `glv` token address and the `market` address within the function parameters.

**Summary**

Debugging a GMX V2 GLV liquidity deposit transaction using Tenderly reveals a distinct contract interaction flow orchestrated by the `GlvRouter`. The use of `multicall` bundles essential steps: sending WNT (likely for execution fees) directly to the target `GlvVault` via `sendWnt`, and then creating the deposit order with detailed parameters using `createGlvDeposit`. Understanding these parameters and the specific contracts involved (`GlvRouter`, `GlvVault`) is key to comprehending GLV liquidity operations on GMX V2.