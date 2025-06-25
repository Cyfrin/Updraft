## Sending ETH From Your Vyper Contract

Often, smart contracts accumulate Ether (ETH), the native currency of the blockchain. A crucial piece of functionality is allowing a designated party, usually the contract owner, to withdraw these funds. This lesson guides you through implementing this withdrawal capability within a Vyper smart contract, focusing on completing a common `withdraw` function.

## The Challenge: Transferring Native Currency

Unlike ERC20 tokens, where you typically call a `transfer` function on the token contract itself, sending the blockchain's native currency (like ETH on Ethereum) *from* your smart contract requires using specific built-in mechanisms provided by the language. Our goal is to implement the logic within a `withdraw` function that securely transfers the contract's entire ETH balance to a specified address.

## Vyper's `send` Function

Vyper provides a built-in function, `send`, designed specifically for transferring the native currency from the contract's address.

**Syntax:**
```vyper
send(to: address, value: uint256)
```

**Arguments:**

*   `to`: The `address` that will receive the ETH.
*   `value`: The amount of ETH to send, specified in Wei (the smallest unit of Ether) as a `uint256`.

This function instructs the contract to dispatch the specified `value` of ETH to the `to` address.

**Important Deprecation Note:** The `send` function has been deprecated since Vyper version 0.3.8. While simple and functional for demonstrations like this, its use is discouraged in new production code due to potential underlying opcode changes and inherent gas limitations that can lead to failed transfers if the recipient requires more gas.

## The Preferred Alternative: `raw_call`

For modern Vyper development, the built-in `raw_call` function is generally considered the more robust and preferred method for sending ETH. It offers more control and avoids the limitations associated with `send`. While we use `send` in this lesson for simplicity, `raw_call` will be explored in more detail later.

## Implementing the `withdraw` Function

Let's build the `withdraw` function step-by-step:

1.  **Security Check:** First and foremost, we must ensure only authorized personnel can withdraw funds. This is typically achieved by restricting the call to the contract's owner. We use an `assert` statement comparing `msg.sender` (the address initiating the current transaction) with `self.owner` (an address stored in the contract, usually set during deployment).
    ```vyper
    assert msg.sender == self.owner, "Not the contract owner!"
    ```
    If this condition is false, the transaction reverts, preventing unauthorized withdrawals.

2.  **Recipient Address:** The destination for the withdrawn funds should be the owner's address. We access this using the state variable `self.owner`.

3.  **Amount to Send:** We want to withdraw the *entire* ETH balance currently held by the contract. Vyper provides the keyword `self.balance` which conveniently returns the contract's current ETH balance in Wei.

4.  **Executing the Transfer:** Combining these elements, we use the `send` function to transfer the entire balance (`self.balance`) to the owner (`self.owner`).
    ```vyper
    send(self.owner, self.balance)
    ```
    *(Note: While `send(msg.sender, self.balance)` might also work *after* the `assert` check, using `self.owner` directly is more explicit about the intended recipient.)*

**Complete `withdraw` Function:**

Putting it all together, the complete `withdraw` function looks like this:

```vyper
@external
def withdraw():
    """Take the money out of the contract, that people sent via the fund function."""
    # Ensure only the contract owner can call this function
    assert msg.sender == self.owner, "Not the contract owner!"

    # Send the entire contract balance to the owner
    # Note: 'send' is deprecated; raw_call is preferred in newer Vyper versions.
    send(self.owner, self.balance)
```

## Testing Your Implementation

Testing functions that involve real ETH transfers requires moving beyond simulated environments. Here’s a typical workflow using Remix IDE, MetaMask, and a test network like Sepolia:

1.  **Compile:** Compile your Vyper contract (`.vy` file) in Remix.
2.  **Set Environment:** In Remix's "Deploy & Run Transactions" tab, change the environment from a local VM to "Injected Provider - MetaMask". Ensure MetaMask is connected to your desired test network (e.g., Sepolia) and the selected account is the intended owner.
3.  **Deploy:** If your contract constructor requires arguments (like a price feed address), provide them. Click `Deploy` and confirm the transaction in the MetaMask pop-up.
4.  **Fund the Contract:** Before withdrawing, the contract needs an ETH balance.
    *   Use an ETH-to-Wei converter (like `eth-converter.com`) if needed.
    *   In Remix, locate the deployed contract instance. Find a `@payable` function designed to receive funds (e.g., a `fund()` or deposit function).
    *   Enter the amount of ETH (or Wei) you want to send *to* the contract in the `Value` field next to the function call button. Ensure the unit (Ether/Wei) is correct.
    *   Call the funding function (e.g., `fund()`) and confirm the transaction in MetaMask. You should see the contract's balance update in the Remix interface.
5.  **Withdraw Funds:**
    *   Call the `withdraw` function from the owner's account (the one connected via MetaMask).
    *   Confirm the transaction in MetaMask. This transaction sends ETH *from* the contract *to* your owner account.
6.  **Verify Results:**
    *   Check the contract's balance in Remix; it should return to 0 ETH (or close to it, accounting for potential small dust amounts if applicable).
    *   Check your owner account balance in MetaMask; it should have increased by the withdrawn amount (minus the gas fee for the withdrawal transaction). Review the transaction history in MetaMask to confirm the incoming transfer from the contract address.
    *   Repeating steps 4 & 5 with a larger, more noticeable amount (e.g., 1 ETH) can make the balance changes easier to verify.

## Key Considerations and Best Practices

*   **`send` is Deprecated:** Remember that `send` is deprecated. Use `raw_call` for sending ETH in new Vyper projects for better reliability and control.
*   **Security is Paramount:** Always include strict access control checks (like `assert msg.sender == self.owner`) on functions that transfer value.
*   **Use `self.balance`:** This keyword is the standard way to access the contract's current ETH balance in Wei.
*   **Testnet Testing:** Functions involving native currency transfer should be thoroughly tested on a test network using a real wallet like MetaMask.
*   **Units Matter:** Be mindful of units. Contract interactions typically use Wei (`uint256`), while interfaces often use Ether. Use conversion tools when necessary.