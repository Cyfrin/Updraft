## Exposing Internal Logic with External Wrappers in Vyper

In Vyper smart contract development, controlling function visibility is crucial for security and design clarity. While `@internal` functions allow you to encapsulate logic intended only for use *within* the contract, you sometimes need to expose that logic externally in a controlled manner. A common and effective pattern is to create an `@external` function that acts as a wrapper, calling the underlying `@internal` function.

Let's explore how this works.

### The Internal Logic: `_get_eth_to_usd_rate`

First, consider an internal function designed to perform a specific calculation – in this case, converting an amount of ETH to its equivalent USD value using an on-chain price feed.

```vyper
# Assumes a state variable 'price_feed' of an appropriate interface type exists

@internal
@view
def _get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    @notice Calculates the USD value of a given ETH amount using the price feed.
    @dev Marked internal, intended only for use by other functions within this contract.
    @param eth_amount The amount of ETH (in Wei, 1e18).
    @return The equivalent value in USD (with 18 decimals).
    """
    # Fetch the latest price from the price feed (e.g., Chainlink)
    # Price is often returned with fewer decimals (e.g., 8), hence the scaling.
    price: int256 = staticcall self.price_feed.latestAnswer() # Example call
    eth_price_usd: uint256 = (convert(price, uint256) * (10**10)) # Adjust price to 18 decimals

    # Calculate the USD value of the input ETH amount
    # (eth_price_usd * eth_amount) / 1 ETH (in Wei)
    eth_amount_in_usd: uint256 = (eth_price_usd * eth_amount) / (1 * 10**18)

    return eth_amount_in_usd
```

Key points about this internal function:

1.  **`@internal` Decorator:** This strictly limits its accessibility. It can *only* be called by other functions defined within the *same* contract. It does not become part of the contract's public Application Binary Interface (ABI).
2.  **`@view` Decorator:** This signifies that the function does not modify the contract's state. It only reads data (like the price feed).
3.  **Naming Convention:** The leading underscore (`_get_eth_to_usd_rate`) is a widely adopted convention to visually indicate that a function is intended for internal use. While not enforced by the compiler for `@internal` visibility itself, it greatly improves code readability.
4.  **Functionality:** It encapsulates the specific logic for price fetching and calculation.

### The External Wrapper: `get_eth_to_usd_rate`

Now, suppose we want users or other contracts to be able to perform this ETH-to-USD conversion without directly calling the internal logic or needing to replicate it. We can create a simple `@external` function that wraps the internal one.

```vyper
@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    @notice Public interface to get the USD value of a given ETH amount.
    @dev Calls the internal _get_eth_to_usd_rate function.
    @param eth_amount The amount of ETH (in Wei, 1e18).
    @return The equivalent value in USD (with 18 decimals).
    """
    return self._get_eth_to_usd_rate(eth_amount)
```

Observe the characteristics of this external wrapper:

1.  **`@external` Decorator:** This makes the function part of the contract's public ABI and callable from outside the contract.
2.  **`@view` Decorator:** It matches the internal function's decorator, as it also doesn't modify state.
3.  **Identical Signature:** It uses the *exact same* input parameter (`eth_amount: uint256`) and return type (`uint256`) as the internal function it wraps. This provides a consistent interface.
4.  **Calling the Internal Function:** The core of the wrapper is the line `return self._get_eth_to_usd_rate(eth_amount)`.
    *   The `self.` prefix is essential. It tells the Vyper compiler that we are calling another function defined within the *same* contract instance.
    *   It passes the received `eth_amount` directly to the internal function.
5.  **Returning the Result:** It simply returns whatever value the internal function (`_get_eth_to_usd_rate`) returns.
6.  **Naming Convention:** The absence of a leading underscore distinguishes it as the public-facing function.

### Why Use This Pattern?

This wrapper pattern offers several advantages:

*   **Controlled Exposure:** It allows you to selectively expose internal logic through a well-defined public interface without making the core implementation details `external`.
*   **Encapsulation:** The complex calculation logic remains neatly contained within the `@internal` function.
*   **Readability:** The clear distinction between the internal function (`_name`) and its external wrapper (`name`) enhances code understanding.
*   **Flexibility:** If the internal logic needed modification, you could potentially update `_get_eth_to_usd_rate` without changing the external interface `get_eth_to_usd_rate`, provided the parameters and return type remain consistent.

This technique is particularly useful for `@view` functions where you want to provide external read-only access to computed data derived from internal contract logic or state. By creating an external wrapper around an internal function, you maintain good contract structure while providing necessary external accessibility.