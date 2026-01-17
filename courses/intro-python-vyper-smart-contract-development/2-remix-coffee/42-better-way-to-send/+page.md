## Securely Sending Ether in Vyper: Using `raw_call`

When developing Vyper smart contracts, transferring Ether (ETH) is a common requirement, particularly in functions designed for withdrawing funds or paying out distributions. While a simple method exists, it carries potential security risks. This lesson explains the recommended approach for sending ETH from your Vyper contracts, prioritizing safety and robustness.

## The Discouraged Method: Why You Shouldn't Use `send()`

In previous examples or simpler contexts, you might have encountered the `send()` built-in function to transfer Ether. For instance, withdrawing the entire contract balance to an owner address might look like this:

```vyper
# Example using the discouraged send() function
# send(OWNER, self.balance)
```

This appears straightforward – specify the recipient (`OWNER`) and the amount (`self.balance`). However, **using `send()` for transferring Ether is strongly discouraged due to security concerns.**

The primary issue relates to **gas**. The `send()` function has a fixed gas stipend, meaning it only forwards a small, fixed amount of gas along with the Ether transfer. While this might seem sufficient for simple transfers to externally owned accounts (EOAs), it can cause problems when sending Ether to other smart contracts.

Recipient contracts might require more gas than the stipend provides to execute their fallback or receive functions (e.g., for logging events or performing internal state updates). If the recipient runs out of gas, the transfer fails. Furthermore, the exact gas costs of underlying EVM opcodes can change in future Ethereum upgrades, potentially breaking contracts relying on the fixed stipend of `send()`.

Because of these gas-related limitations and potential future compatibility issues, `send()` is not considered a safe or reliable method for Ether transfers in modern smart contract development. **You should avoid using `send()` in your Vyper contracts.**

## The Recommended Method: Sending Ether with `raw_call()`

The secure and recommended way to send Ether in Vyper is by using the `raw_call()` built-in function. This is a more powerful, low-level function designed for interacting with other addresses, including simple Ether transfers.

The general signature for `raw_call`, as found in the Vyper documentation, is quite extensive:

```vyper
# Vyper documentation signature for raw_call
raw_call(to: address, data: Bytes, max_outsize: uint256 = 0, gas: uint256 = gasleft, value: uint256 = 0, is_delegate_call: bool = False, is_static_call: bool = False, revert_on_failure: bool = True) -> Bytes[max_outsize]
```

While it has many parameters for advanced interactions (like calling specific functions on other contracts), sending Ether only requires specifying a few key arguments. To replace the previous `send()` example and securely send the contract's balance to the `OWNER`, you would use `raw_call` like this:

```vyper
# Example using the recommended raw_call() function for ETH transfer
raw_call(OWNER, b"", value = self.balance)
```

Let's break down the parameters used here:

1.  **`to` (First argument):** `OWNER` - This is the recipient's address, just like with `send()`.
2.  **`data` (Second argument):** `b""` - This specifies the data payload for the call. The `b` prefix indicates a `Bytes` literal. Since we *only* want to transfer Ether and not execute any function on the recipient contract, we provide empty bytes (`""`). This might look unusual at first, but it's the correct way to signal a value transfer without a function call using `raw_call`.
3.  **`value` (Keyword argument):** `value = self.balance` - This explicitly sets the amount of Ether (in Wei) to be sent with the call.

**Important Safety Feature:** Notice the `revert_on_failure: bool = True` parameter in the full `raw_call` signature. This is a default setting. It means that if the Ether transfer fails for any reason (e.g., the recipient contract rejects the transfer, or runs out of gas despite `raw_call` forwarding more gas than `send`), the **entire transaction will automatically revert**. This is crucial for security, preventing situations where your contract's state might become inconsistent if a transfer fails silently. You don't need to manually check a return value to ensure the transfer succeeded; `raw_call` handles this implicitly by reverting on failure.

By default, `raw_call` also forwards most of the remaining gas (`gas: uint256 = gasleft`), making it much more robust than `send()` when interacting with recipient contracts that might have gas requirements in their receiving logic.

## Best Practices for Sending Ether in Vyper

Based on security and robustness considerations, follow these best practices when sending Ether from your Vyper contracts:

1.  **Always use `raw_call`:** Make `raw_call(recipient, b"", value=amount)` your default method for transferring ETH.
2.  **Avoid `send()`:** Do not use the `send()` function for Ether transfers due to its fixed gas stipend limitations and associated security risks.
3.  **Use `b""` for Value Transfers:** When using `raw_call` solely to send Ether, always provide empty bytes (`b""`) as the `data` argument.
4.  **Rely on Revert-on-Failure:** Trust `raw_call`'s default behavior to revert the transaction if the transfer fails, ensuring atomicity and safety.

By adopting `raw_call` as the standard way to send Ether, you build more secure, robust, and future-proof Vyper smart contracts.