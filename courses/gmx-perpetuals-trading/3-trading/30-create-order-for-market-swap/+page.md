## Tracing a GMX V2 Market Swap Order with Tenderly and Arbiscan

Understanding how decentralized protocols like GMX V2 operate under the hood can be challenging due to their complex architecture involving multiple interacting smart contracts. Simply reading the source code or documentation often isn't enough to grasp the dynamic flow of a specific operation. This lesson demonstrates a practical method for dissecting a GMX V2 transaction—specifically, creating a market swap order—using real on-chain data and powerful debugging tools.

**The Challenge: Unraveling Complex Contract Interactions**

GMX V2 employs a modular design with numerous contracts responsible for different aspects of the system (routing, order handling, vault management, data storage). When a user initiates an action like creating a market swap, a cascade of function calls occurs across these contracts. To truly understand the process, we need to trace this execution flow step-by-step.

**The Strategy: Debugging a Live Transaction**

We will use a real transaction hash from the Arbitrum network and leverage specialized tools to visualize its execution:

1.  **Identify a Target Transaction:** Find a transaction hash on a blockchain explorer (like Arbiscan) corresponding to the specific operation you want to study (e.g., "Create Market Swap").
2.  **Utilize a Debugger:** Input the transaction hash into a debugging tool (like Tenderly) to get a detailed execution trace (call stack).
3.  **Analyze the Trace:** Examine the sequence of contract calls, function names, and parameters revealed by the debugger.
4.  **Supplement with Context:** Use external resources like personal notes, protocol documentation, or the contract source code to understand the purpose of specific functions and parameters identified in the trace.
5.  **Verify with Explorer:** Cross-reference contract addresses found in the debugger with the blockchain explorer to confirm their identity, view source code (if verified), and check on-chain state (like token balances).

**Tools You'll Need**

*   **Arbiscan (arbiscan.io):** The blockchain explorer for Arbitrum. Used for finding initial transaction hashes and verifying contract details later.
*   **Tenderly (tenderly.co):** A blockchain development platform featuring a powerful transaction debugger that visualizes the execution trace and allows inspection of state variables and function parameters.
*   **(Optional) Text Editor/Notes:** Useful for summarizing the key steps and findings from the debugging trace, making the complex flow easier to digest.

**Step-by-Step Analysis: Creating a GMX V2 Market Swap (DAI -> WETH)**

Let's analyze a real "Create Market Swap" transaction with the following hash: `0x747665f80ccd64918af4f4cd2d3c7e7c077d061d61bc47fc99f644d1eb4d18f4`.

1.  **Locate on Arbiscan:** You would typically find such a hash by exploring recent GMX protocol interactions on Arbiscan.
2.  **Load into Tenderly:** Paste this hash into Tenderly's transaction search bar and navigate to its debugger view.

**Dissecting the Execution Trace:**

Tenderly presents the transaction as a sequence of calls. Here's a breakdown of the key steps involved in creating this market swap order:

**Step 1: Entry Point - `ExchangeRouter.multicall`**

The transaction begins with the user's wallet interacting with the `ExchangeRouter` contract. GMX often uses `multicall` to bundle multiple actions into a single atomic transaction.

```
[Sender] 0xd24cba...40f49e => [Receiver] ExchangeRouter ).multicall( data = [...] )
```

The `data` field contains encoded instructions for the subsequent actions within this transaction.

**Step 2: Multicall Action 1 - `ExchangeRouter.sendWnt`**

*   **Purpose:** Sends the required execution fee (in WETH, the Wrapped Native Token on Arbitrum) to the `OrderVault`. This fee covers the gas cost for keepers to execute the swap later.
*   **Recipient:** The `OrderVault` contract (`0x31ef83...40d5`). You can verify this address on Arbiscan to confirm it's the correct GMX `OrderVault`.
*   **Trace:**
    ```
    [Receiver] ExchangeRouter .sendWnt( receiver = 0x31ef83a530fde1b38ee9A18093a333D8Bbbc40d5, amount = 85516613000000 ) // Fee in WETH (wei)
    ```

**Step 3: Multicall Action 2 - `ExchangeRouter.sendTokens`**

*   **Purpose:** Transfers the user's input collateral (the token being swapped *from*) to the `OrderVault`.
*   **Example:** In this transaction, 10 DAI are sent.
*   **Recipient:** The `OrderVault` contract (same address as above).
*   **Trace:**
    ```
    [Receiver] ExchangeRouter .sendTokens( token = 0xda10009cbd5d07dd0cecc66161fc93d7c9000da1, receiver = 0x31ef83a530fde1b38ee9A18093a333D8Bbbc40d5, amount = 10000000000000000000 ) // 10 DAI (18 decimals)
    ```

**Step 4: Multicall Action 3 - `ExchangeRouter.createOrder`**

*   **Purpose:** This is the core function call that initiates the logic for creating the swap order itself.
*   **Trace:**
    ```
    [Receiver] ExchangeRouter .createOrder( params = {"addresses":{...},"numbers":{...}, ...} )
    ```
*   **Analyzing Input Parameters (Using Tenderly's Debugger View):**
    Inspecting the decoded `params` argument in Tenderly reveals critical details about the order:
    *   `params.addresses.receiver`: The user's address (`0xd24cba...40f49e`), which will eventually receive the output WETH or ETH.
    *   `params.addresses.initialCollateralToken`: The address of the input token (`0xda10...0da1`, DAI).
    *   `params.swapPath`: An array of GMX Market Token addresses defining the swap route. For a DAI -> WETH swap, this might involve intermediate markets like DAI/USDC and USDC/WETH. Each address corresponds to a specific GMX market contract. You can look up these addresses on Arbiscan to see which market they represent (e.g., by checking their token holdings).
    *   `params.numbers.executionFee`: Matches the WETH amount sent via `sendWnt`. Note: Any unused portion of this fee is refunded when the order executes.
    *   `params.numbers.minOutputAmount`: The minimum amount of WETH the user accepts, protecting against excessive slippage.
    *   `params.orderType`: An integer representing the order type. `0` signifies `MarketSwap`. The `Order.sol` contract defines these types:
        ```solidity
        enum OrderType {
            MarketSwap, // 0
            LimitSwap,  // 1
            MarketIncrease, // 2
            LimitIncrease, // 3
            MarketDecrease, // 4
            LimitDecrease, // 5
            StopLossDecrease, // 6
            Liquidation // 7
            // GMX V2.1+ adds StopIncrease, TakeProfitIncrease, TakeProfitDecrease
        }
        ```
    *   `params.shouldUnwrapNativeToken`: A boolean. If `true`, the final WETH output is unwrapped to native ETH before sending to the `receiver`. If `false` (as in this example), WETH is sent.

*   **Output (Return Value):** Crucially, the `createOrder` function, executed within the context of the `multicall`, returns a `bytes32` value. **This is the unique Order Key (or Order ID)**. This key is essential for referencing this specific pending order later for execution or cancellation.

**Step 5: Internal Calls Triggered by `createOrder`**

The `ExchangeRouter.createOrder` function doesn't perform all the logic itself. It delegates tasks to other specialized contracts:

*   **`ExchangeRouter` -> `OrderHandler.createOrder`:** The router passes the order creation request to the `OrderHandler`.
*   **`OrderHandler` -> `OrderUtils` Library:** The `OrderHandler` often uses a library contract (`OrderUtils`) for shared order logic. In Tenderly, this might appear as a `fallback` call to the `OrderUtils` contract address, indicating a `delegatecall` is likely being used.
    *   **`OrderUtils.createOrder`:** This library function contains core validation and setup logic.
        *   It interacts with the `OrderVault` via `recordTransferIn` calls to log the receipt of both the execution fee (WETH) and the collateral (DAI), updating the vault's internal accounting.
        *   It performs checks based on the `orderType` (e.g., using internal functions like `isMarketOrder`).
        *   It validates the provided `swapPath`.
*   **`OrderHandler` -> `OrderStoreUtils.set`:** After validation and setup, this function (likely called via the `OrderHandler` interacting with another library or directly with the `DataStore`) stores the newly created order's details. The order data is stored against the unique Order Key generated earlier, making the order persistent and available for execution by GMX keepers.

*   **Illustrative Trace Snippets:**
    ```
    // Delegation to library
    ( OrderHandler => OrderUtils ).fallback( ... )
    // Core library logic
    OrderUtils .createOrder( ... )
    // Recording funds received by the vault
    ( OrderHandler => OrderVault ).recordTransferIn( token = 0xda1...da1 ) // Record DAI
    ( OrderHandler => OrderVault ).recordTransferIn( token = 0x82a...95bd ) // Record WETH fee
    // Internal checks
    OrderUtils .isMarketOrder( orderType = 0 ) => (true)
    // Storing the order details
    ( OrderHandler => OrderStoreUtils ).set( dataStore, key, order )
    ```

**Key Concepts Illustrated**

This debugging exercise highlights several important concepts:

*   **Modular Contract Interaction:** Shows how multiple specialized contracts (`ExchangeRouter`, `OrderHandler`, `OrderVault`, `OrderUtils`, `OrderStoreUtils`, `DataStore`) work together.
*   **Multicall Pattern:** Bundles multiple actions (fee transfer, collateral transfer, order creation) into one transaction for efficiency and atomicity.
*   **Wrapped Native Tokens (WNT/WETH):** Used within the protocol for internal value transfer, particularly execution fees.
*   **OrderVault:** Acts as a temporary holding contract (escrow) for collateral and fees before order execution.
*   **Order Key:** The unique `bytes32` identifier for each created order.
*   **Swap Path:** Defines the sequence of GMX markets (liquidity pools) used to perform the token swap.
*   **OrderType Enum:** Categorizes the different types of operations GMX supports.
*   **Library Calls:** Demonstrates how contracts use `delegatecall` (often appearing as `fallback` in debuggers) to execute code from reusable library contracts like `OrderUtils`.
*   **Transaction Debugging:** Underscores the value of tools like Tenderly for gaining deep visibility into on-chain execution.

**Debugging Tips**

*   Debugging real, successful transactions provides the most accurate insight into how a protocol functions.
*   Tenderly's call trace and debugger view (for inspecting parameters and state) are invaluable.
*   The raw trace can be overwhelming. Summarize the high-level flow and purpose of key calls in your own notes.
*   Always cross-reference contract addresses identified in Tenderly with Arbiscan to confirm their identity and purpose within the GMX ecosystem.
*   Pay close attention to function input parameters – they reveal *what* data is driving the contract logic.
*   Remember the `bytes32` return value of `createOrder` is the vital Order Key.

By following this process of tracing live transactions with debugging tools, you can move beyond static code analysis and gain a practical, dynamic understanding of complex web3 protocols like GMX V2.