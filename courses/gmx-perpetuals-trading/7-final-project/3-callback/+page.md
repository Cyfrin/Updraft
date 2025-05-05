## Understanding GMX Callback Contracts and Execution Fee Refunds

In the GMX Synthetics ecosystem, callback contracts provide a powerful mechanism for external systems or smart contracts to react to events within the order lifecycle. This lesson explores how callbacks function, the role of the `CallbackUtils.sol` library, and how users can implement their own callback contracts, specifically focusing on handling execution fee refunds.

### What are Callbacks in GMX?

Callbacks are specific functions defined within a user-designated smart contract. When you create an order (like a deposit, withdrawal, or swap) in GMX Synthetics, you have the option to provide a `callbackContract` address. If this address is provided, the core GMX system will call predefined functions on that contract *after* certain events related to your order occur.

These events primarily include:

1.  **Order Execution:** When your order is successfully processed.
2.  **Order Cancellation:** When your order is cancelled before execution.
3.  **Order Frozen:** When an order becomes frozen due to specific market conditions or other factors preventing execution.

The primary purpose of these callbacks is twofold:

*   **Triggering Custom Logic:** Allows external contracts or systems to automatically perform actions based on the final state of an order.
*   **Receiving Execution Fee Refunds:** Enables the designated contract to receive any portion of the initially paid execution fee that wasn't consumed during the order's processing.

### The Role of `CallbackUtils.sol`

The central component managing the invocation of these external callbacks is the `CallbackUtils.sol` library, located at `gmx-synthetics/contracts/callback/CallbackUtils.sol`. This internal GMX library contains the logic to safely attempt calling the functions on the user-provided `callbackContract`.

It handles the communication *from* the GMX core system *to* your specified contract. When an order associated with a `callbackContract` reaches a final state (executed, cancelled, or frozen), `CallbackUtils.sol` identifies the appropriate function signature on the target contract and attempts to call it. It also manages the subsequent process of refunding unused execution fees.

### Implementing Your Callback Contract (`WithdrawCallback.sol` Example)

To utilize callbacks, you need to deploy a smart contract that adheres to specific interfaces expected by GMX, namely `IOrderCallbackReceiver` and `IGasFeeCallbackReceiver`. An example template often used in exercises or projects is `src/exercises/app/WithdrawCallback.sol`. This contract serves as the `callbackContract` whose address you would supply when creating an order.

Your implementation will need to define specific functions that `CallbackUtils.sol` will call.

### How `CallbackUtils.sol` Invokes Your Contract

`CallbackUtils.sol` contains several key internal functions that interact with your `callbackContract`:

1.  **`afterOrderExecution`:**
    *   **Triggered:** After an order successfully executes.
    *   **Action:** Attempts to call the `afterOrderExecution` function on the `order.callbackContract`. It uses a `try/catch` block to handle potential errors during the external call, emitting an `AfterOrderExecutionError` event if the call fails.
    *   **Conceptual Logic:**
        ```solidity
        // Inside CallbackUtils.sol logic
        try IOrderCallbackReceiver(order.callbackContract).afterOrderExecution{gas: order.callbackGasLimit}(key, order, eventData) {
            // Callback succeeded
        } catch {
            emit AfterOrderExecutionError(key, order); // Callback failed
        }
        ```

2.  **`afterOrderCancellation`:**
    *   **Triggered:** After an order is cancelled.
    *   **Action:** Attempts to call the `afterOrderCancellation` function on the `order.callbackContract`, again using `try/catch` for error handling and emitting `AfterOrderCancellationError` on failure.
    *   **Conceptual Logic:** (Similar structure calling `afterOrderCancellation`)

3.  **`afterOrderFrozen`:**
    *   **Triggered:** After an order becomes frozen.
    *   **Action:** Attempts to call the `afterOrderFrozen` function on the `order.callbackContract`, using `try/catch` and emitting `AfterOrderFrozenError` on failure.
    *   **Conceptual Logic:** (Similar structure calling `afterOrderFrozen`)

4.  **`refundExecutionFee`:**
    *   **Triggered:** This is called *after* attempting one of the event-specific callbacks (`afterOrderExecution`, `afterOrderCancellation`, or `afterOrderFrozen`), regardless of whether that callback succeeded or failed.
    *   **Action:** Calculates the unused execution fee (`refundFeeAmount`). It then attempts to call the `refundExecutionFee` function on the `callbackContract`, sending the `refundFeeAmount` as native currency (ETH on Ethereum/Arbitrum) using the `value` field in the call. It uses a specific gas limit (`Keys.REFUND_EXECUTION_FEE_GAS_LIMIT`) for this call.
    *   **Conceptual Logic:**
        ```solidity
        // Inside CallbackUtils.sol, after handling order event callback
        uint256 gasLimit = dataStore.getUint(Keys.REFUND_EXECUTION_FEE_GAS_LIMIT);
        try IGasFeeCallbackReceiver(callbackContract).refundExecutionFee{gas: gasLimit, value: refundFeeAmount}(key, eventData) {
           // Refund succeeded
        } catch {
           // Refund failed (e.g., contract cannot receive ETH, or ran out of gas)
        }
        ```

### Functions to Implement in Your Callback Contract

When building your `WithdrawCallback.sol` (or similar contract), you'll need to provide implementations for the following functions, which are called *by* `CallbackUtils.sol`:

1.  **`refundExecutionFee`:**
    *   **Called By:** `CallbackUtils.refundExecutionFee`
    *   **Purpose:** To receive the native currency (ETH) refund. The function must be marked `payable` to accept the incoming `msg.value`. Your logic here should handle the received funds (e.g., store them in the contract, forward them to another address, emit an event).
    *   **Signature:**
        ```solidity
        function refundExecutionFee(
            bytes32 key, // Unique identifier for the order
            EventUtils.EventLogData memory eventData // Additional event context
        ) external payable /* onlyGmx */ { // 'payable' is crucial
            // TODO: Add logic to handle received msg.value (the refund)
        }
        ```
        *(Note: `onlyGmx` is a likely modifier ensuring only authorized GMX contracts can call this)*

2.  **`afterOrderExecution`:**
    *   **Called By:** `CallbackUtils.afterOrderExecution`
    *   **Purpose:** To execute custom logic *after* an associated order has been successfully executed. For a `WithdrawCallback` contract, this might involve logging the completion, updating internal state, or triggering further actions related to the withdrawal.
    *   **Signature:**
        ```solidity
        function afterOrderExecution(
            bytes32 key, // Order key
            Order.Props memory order, // Details of the executed order
            EventUtils.EventLogData memory eventData // Event context
        ) external payable /* onlyGmx */ { // Often payable for consistency
            // TODO: Add logic for post-execution actions
        }
        ```

3.  **`afterOrderCancellation`:**
    *   **Called By:** `CallbackUtils.afterOrderCancellation`
    *   **Purpose:** To execute custom logic after an order is cancelled. This could involve cleanup, logging the cancellation, or reverting related state in your system.
    *   **Signature:**
        ```solidity
        function afterOrderCancellation(
            bytes32 key, // Order key
            Order.Props memory order, // Details of the cancelled order
            EventUtils.EventLogData memory eventData // Event context
        ) external payable /* onlyGmx */ {
            // TODO: Add logic for post-cancellation actions
        }
        ```

4.  **`afterOrderFrozen`:**
    *   **Called By:** `CallbackUtils.afterOrderFrozen`
    *   **Purpose:** To handle the scenario where an order becomes frozen. This might involve alerting mechanisms or specific state updates indicating the order is stuck.
    *   **Signature:**
        ```solidity
        function afterOrderFrozen(
            bytes32 key, // Order key
            Order.Props memory order, // Details of the frozen order
            EventUtils.EventLogData memory eventData // Event context
        ) external payable /* onlyGmx */ {
            // TODO: Add logic for post-frozen actions
        }
        ```

### Interaction Flow Example

Consider a user initiating a withdrawal order and providing the address of their deployed `WithdrawCallback.sol` contract as the `callbackContract`:

1.  **Order Creation:** The user submits the withdrawal order request to GMX, including the `WithdrawCallback.sol` address and paying an execution fee.
2.  **Order Execution:** The order is successfully executed by a GMX keeper.
3.  **`afterOrderExecution` Callback:** The GMX core system, via `CallbackUtils.sol`, calls the `afterOrderExecution` function on the specified `WithdrawCallback.sol` instance, passing order details. The logic within this function in `WithdrawCallback.sol` executes.
4.  **Fee Refund Calculation:** `CallbackUtils.sol` determines the portion of the execution fee that was not used. Let's call this `refundFeeAmount`.
5.  **`refundExecutionFee` Callback:** `CallbackUtils.sol` calls the `refundExecutionFee` function on the *same* `WithdrawCallback.sol` instance, sending `refundFeeAmount` ETH along with the call (`msg.value`).
6.  **Refund Handling:** The logic within the `refundExecutionFee` function in `WithdrawCallback.sol` executes, receiving and processing the ETH refund.

By implementing these callback functions, developers can integrate external logic seamlessly with GMX order events and ensure the efficient recovery of unused execution fees.