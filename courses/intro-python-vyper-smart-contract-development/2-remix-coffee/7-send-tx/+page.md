## Sending Ether with Smart Contract Function Calls in Remix

This lesson explains how to send Ether (ETH) when interacting with a smart contract function using the Remix IDE. We'll focus on understanding `payable` functions, using the Remix interface to send value, and observing how contracts handle required payments using `assert` statements and transaction reverts, all within the Remix VM simulated environment.

### Understanding Payable Functions

In Ethereum smart contracts, functions that are designed to receive Ether directly as part of a transaction must be explicitly marked. In Vyper (the language used in this example), this is done using the `@payable` decorator. In Solidity, the `payable` keyword is used.

Marking a function as `payable` signals to the Ethereum Virtual Machine (EVM) that this function can accept incoming ETH transfers. Without this marker, attempting to send ETH to a function will cause the transaction to fail.

Consider this simple Vyper contract example:

```vyper
# pragma version 0.4.0
# @ license: MIT
# @ auther: You!

@external
@payable  # <-- This makes the function able to receive ETH
def fund():
    """Allows users to send $ to this contract.
    Have a minimum $ amount send
    1. How do we send ETH to this contract?
    """
    # Checks if the value sent (msg.value) is exactly 1 Ether
    assert msg.value == as_wei_value(1, "ether"), "You must spend more ETH!"

@external
def withdraw():
    pass # Placeholder, doesn't do anything
```

Here, the `fund()` function is decorated with `@payable`, allowing users to send ETH when calling it. The `withdraw()` function, lacking this decorator, cannot directly receive ETH through a call.

### Interacting with Payable Functions in Remix IDE

The Remix IDE provides visual cues and specific controls for interacting with `payable` functions when you deploy a contract:

1.  **Button Color:** After deploying the contract (using the "Deploy & Run Transactions" tab and selecting a Remix VM environment like "Remix VM (Cancun)"), Remix typically renders buttons for `payable` functions (like our `fund` function) in **red**. This visually alerts you that the function can accept ETH. Other transaction-based functions might appear in orange.

2.  **The VALUE Field:** Crucially, to send ETH along with a function call, you must use the "VALUE" section located above the deployed contract's interaction panel. This section contains:
    *   An input field where you enter the amount of ETH (or other units) you want to send.
    *   A dropdown menu to select the unit (Wei, Gwei, Finney, Ether). **It is vital to select the correct unit.** Sending 1 Wei is vastly different from sending 1 Ether.

3.  **Execution Flow:** To send ETH when calling `fund()`:
    *   Enter the desired amount in the VALUE input field.
    *   Select the correct unit (e.g., "Ether") from the dropdown.
    *   *Then*, click the red `fund` button.

The Remix VM environment conveniently provides test accounts pre-funded with simulated ETH (e.g., 100 ETH), allowing you to experiment without using real assets.

### Using `msg.value` and `assert` for Payment Validation

Smart contracts often need to verify that the correct amount of ETH was sent with a function call. This is achieved using:

*   **`msg.value`:** This is a globally available variable within any function call context. It holds the amount of ETH, **measured in Wei** (the smallest unit of Ether), that was included in the transaction triggering the function call.
*   **`assert` Statement:** This is a control structure used to check for conditions that *must* be true for the contract's logic to proceed correctly. In our example, `assert msg.value == as_wei_value(1, "ether"), "You must spend more ETH!"` checks if the ETH sent (`msg.value`) is exactly equal to 1 Ether (converted to Wei using `as_wei_value`).

If the condition within an `assert` statement evaluates to `false`, the execution halts immediately.

### Transaction Reverts: Handling Failed Conditions

When an `assert` condition fails (or other critical errors occur, like running out of gas), the transaction **reverts**.

*   **State Rollback:** A revert means that any changes the transaction attempted to make to the contract's state (like updating variables or balances) are completely undone. It's as if the transaction never happened from the perspective of the blockchain's state.
*   **Gas Consumption:** Importantly, the gas consumed up to the point of the revert *is still charged* to the sender.
*   **Error Messages:** Remix displays transaction outcomes in its integrated terminal. A failed or reverted transaction will typically show an error, often including a reason string if one was provided in the `assert` or `require` statement (like `"You must spend more ETH!"` in our code).

### Demonstration: Sending ETH in Remix

Let's walk through the process using our example contract deployed on the Remix VM:

1.  **Compile & Deploy:** Compile the Vyper code and deploy it using the "Deploy & Run Transactions" tab.
2.  **Attempt 1 (Failure - Sending 0 ETH):**
    *   Locate the deployed contract instance.
    *   Ensure the VALUE field is set to `0` and the unit is `Wei`.
    *   Click the red `fund` button.
    *   **Result:** The transaction fails. The Remix terminal shows a revert error because `msg.value` (0 Wei) is not equal to 1 Ether, causing the `assert` to fail.
3.  **Attempt 2 (Success - Sending 1 ETH):**
    *   Go back to the VALUE section.
    *   Enter `1` in the input field.
    *   Change the unit dropdown to `Ether`.
    *   Click the red `fund` button again.
    *   **Result:** The transaction succeeds (indicated by a green checkmark in the Remix terminal). The `assert` condition `msg.value == 1 ether` is now true. The contract has successfully received 1 ETH.
4.  **Attempt 3 (Failure - Sending 2 ETH):**
    *   Change the VALUE field to `2` Ether.
    *   Click the red `fund` button.
    *   **Result:** The transaction fails again with the same revert error. The `assert` requires *exactly* 1 Ether (`==`), and sending 2 Ether does not satisfy this specific condition. *(Note: The error message "You must spend more ETH!" is slightly imprecise for an equality check, highlighting the importance of clear error messages in production code).*

This demonstrates how `payable` functions, `msg.value`, and `assert` work together to enforce payment requirements within smart contracts, and how Remix facilitates testing these interactions. Understanding transaction reverts is crucial for debugging and comprehending Ethereum's atomic state transition mechanism.