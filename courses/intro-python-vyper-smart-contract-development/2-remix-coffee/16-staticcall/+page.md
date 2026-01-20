## Reading Data from External Contracts with Vyper's `staticcall`

Smart contracts often need to interact with other contracts deployed on the blockchain. A common requirement is to read data from an external contract, such as retrieving the latest asset price from an oracle like Chainlink Price Feeds, without modifying that external contract's state. Vyper provides specific mechanisms to handle these interactions securely and explicitly.

This lesson explores how to read data from external contracts using Vyper, focusing on the `staticcall` keyword for read-only interactions.

### Defining the Interaction: Interfaces

Before your contract can call a function on another contract, it needs to know *how* to structure that call and interpret the response. This is achieved using an **interface**. An interface in Vyper defines the function signatures (names, parameters, return types) and visibility (`view`, `pure`) of an external contract without providing the function implementations. Essentially, it declares the Application Binary Interface (ABI) that your contract will use.

For example, to interact with a Chainlink V3 Price Feed Aggregator contract, you would define an interface like this:

```vyper
# Interface defining the functions we want to call on a Chainlink Price Feed
interface AggregatorV3Interface:
    def decimals() -> uint8: view
    def description() -> String[1000]: view
    def version() -> uint256: view
    # Function to get the latest price - note it's 'view'
    def latestAnswer() -> int256: view
```

This interface specifies several functions available on Chainlink Price Feed contracts, including `latestAnswer`, which returns the latest price. Crucially, it marks these functions as `view`, indicating they only read blockchain state and do not modify it.

### Instantiating and Calling External Contracts

Once you have an interface, you can interact with a specific deployed contract by instantiating the interface with the contract's address. This creates a contract object variable in your code that represents the external contract.

To create an instance representing the Chainlink ETH/USD Price Feed on the Sepolia testnet (address `0x694AA1769357215DE4FAC081bf1f309aDC325306`), you would do the following within a function:

```vyper
# Instantiate the interface with the specific contract address
price_feed: AggregatorV3Interface = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306)

# Now 'price_feed' can be used to call functions defined in the interface
# Example: price_feed.latestAnswer()
```

This links the `price_feed` variable to the deployed contract at the given address, using the structure defined by `AggregatorV3Interface`.

### The `staticcall` Keyword for Read-Only Operations

When calling functions on external contracts, Vyper requires you to be explicit about whether the call is expected to modify the external contract's state.

*   **`view` functions:** Promise only to read contract state.
*   **`pure` functions:** Promise not to read or modify contract state.

If the external function you are calling is marked as `view` or `pure` (like `latestAnswer` in our `AggregatorV3Interface`), Vyper mandates the use of the `staticcall` keyword before the function call.

`staticcall` explicitly tells the Vyper compiler and the Ethereum Virtual Machine (EVM) that this external call is read-only and should not alter any state in the called contract. This acts as a security measure, preventing accidental state changes through external calls intended only for reading data.

Here's how to correctly call the `latestAnswer` function using `staticcall`:

```vyper
@external
@view  # This function only reads state (external), so it can be view
def get_price() -> int256:
    # Instantiate the interface with the Sepolia ETH/USD Price Feed address
    price_feed: AggregatorV3Interface = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306)

    # Use staticcall because latestAnswer() is a 'view' function
    return staticcall price_feed.latestAnswer()
```

Notice the `staticcall` keyword directly preceding `price_feed.latestAnswer()`. If you omit `staticcall` when calling an external `view` or `pure` function, the Vyper compiler will raise an error.

Also, note that the `get_price` function itself is decorated with `@view`. This is appropriate because it doesn't modify the state of the current contract and only performs a read-only (`staticcall`) operation on an external contract.

### Contrast with `extcall`

If you need to call an external function that *is expected* to modify the state of the external contract (i.e., it's not marked `view` or `pure`), you would use the `extcall` (External Call) keyword instead of `staticcall`. This distinction forces developers to consciously acknowledge the nature of the external interaction.

### Vyper's Security-Oriented Approach

This requirement to use `staticcall` or `extcall` is a characteristic feature of Vyper, differing from how external calls are handled in languages like Solidity. It reflects Vyper's emphasis on security and explicitness, helping to prevent unexpected behavior and potential vulnerabilities associated with external contract interactions. By mandating these keywords, Vyper ensures developers are fully aware of whether an external call is read-only or potentially state-changing.

In summary, when reading data from external contracts in Vyper:
1.  Define an `interface` detailing the external contract's functions (including `view`/`pure` status).
2.  Instantiate the interface using the target contract's address.
3.  Use the `staticcall` keyword before calling any external function marked as `view` or `pure`.