## Converting Types in Vyper using `convert()`

Vyper is a strongly and statically typed language, meaning it strictly enforces variable types at compile time. This helps prevent many common errors but requires developers to be mindful of types when performing operations or assignments. A frequent scenario involves handling potential mismatches between signed integers (`int256`) and unsigned integers (`uint256`). This lesson demonstrates how to resolve such type mismatches using Vyper's built-in `convert()` function.

### The Problem: Type Mismatch Between `int256` and `uint256`

Consider a common task in a DeFi smart contract: fetching an asset price from an external price feed (like Chainlink) and using it in calculations. Price feeds often return values as `int256` because, theoretically, prices could become negative, even if unlikely for many assets. However, subsequent calculations within your contract might require an unsigned integer (`uint256`), especially if dealing with token amounts or ensuring a final price value is non-negative.

Let's look at an example within an internal function `_get_eth_to_usd_rate`:

```vyper
# Example internal function in a hypothetical contract

interface PriceFeed:
    def latestAnswer() -> int256: view

price_feed: public(PriceFeed)

@internal
def _get_eth_to_usd_rate() -> uint256:
    # Fetch the raw price from the feed (returns int256)
    price: int256 = staticcall self.price_feed.latestAnswer()
    # Assume price feed returns 8 decimals, e.g., 336551000000 for $3365.51

    # Attempt to calculate the final price, adjusting decimals
    # We expect the final eth_price to be uint256
    eth_price: uint256 = price * (10 ** 10) # Adjust to 18 decimals

    return eth_price
```

In this code:
1.  We fetch the latest price using `staticcall self.price_feed.latestAnswer()`, which returns an `int256`, and store it in the `price` variable.
2.  We then attempt to calculate `eth_price` by multiplying the `int256` variable `price` with the literal `(10 ** 10)` (which Vyper treats as a `uint256` in this context) and assign the result to the `eth_price` variable, declared as `uint256`.

When compiling this code, the Vyper compiler will raise an error:

```
TypeMismatch: Given reference has type int256, expected uint256
```

### Understanding the Error

The `TypeMismatch` error occurs because Vyper does not allow direct arithmetic operations or assignments between incompatible types without explicit instruction.

*   **`int256`**: Represents signed 256-bit integers (positive, negative, and zero). Used for `price` because the external feed might return negative values.
*   **`uint256`**: Represents unsigned 256-bit integers (zero and positive only). Used for `eth_price`, as we intend the final calculated price to be non-negative.

The line `eth_price: uint256 = price * (10 ** 10)` fails because you are trying to:
1.  Multiply an `int256` (`price`) by a `uint256` (`10 ** 10`).
2.  Assign the result of this mixed-type operation to a `uint256` variable (`eth_price`).

Vyper requires the types involved in the operation and the assignment target to be compatible. The compiler sees `price` (an `int256`) where it expects a `uint256` to ensure compatibility for the multiplication and subsequent assignment, hence the error.

### The Solution: Explicit Conversion with `convert()`

To resolve this, Vyper provides the built-in `convert()` function for explicit type casting.

**Syntax:**

```vyper
convert(value: Any, type_: type) -> Any
```

*   `value`: The variable or literal value you want to convert.
*   `type_`: The target data type you want to convert the value into (e.g., `uint256`, `int128`, `bytes32`, `bool`, `address`).

We need to convert the `int256` value stored in `price` into a `uint256` *before* performing the multiplication and assignment.

**Corrected Code:**

```vyper
# Example internal function in a hypothetical contract

interface PriceFeed:
    def latestAnswer() -> int256: view

price_feed: public(PriceFeed)

@internal
def _get_eth_to_usd_rate() -> uint256:
    # Fetch the raw price from the feed (returns int256)
    price: int256 = staticcall self.price_feed.latestAnswer()
    # Assume price feed returns 8 decimals, e.g., 336551000000

    # Convert price (int256) to uint256 before multiplication
    converted_price: uint256 = convert(price, uint256)

    # Calculate the final price using compatible types
    eth_price: uint256 = converted_price * (10 ** 10) # Now uint256 * uint256

    # Alternatively, perform conversion inline:
    # eth_price: uint256 = convert(price, uint256) * (10 ** 10)

    return eth_price
```

By using `convert(price, uint256)`, we explicitly tell the compiler to take the value from the `int256` variable `price` and represent it as a `uint256`. The subsequent multiplication `convert(price, uint256) * (10 ** 10)` now involves two `uint256` values. The result is also a `uint256`, which can be safely assigned to the `eth_price` variable.

With this change, the code compiles successfully, resolving the `TypeMismatch` error.

### Key Takeaways

*   Vyper enforces strict type checking at compile time.
*   Implicit conversions between incompatible types like `int256` and `uint256` are not allowed in assignments or arithmetic operations.
*   Use the built-in `convert(value, type)` function to perform explicit type conversions when needed.
*   Be mindful of the data types returned by external calls (like price feeds) and ensure they are compatible or explicitly converted before use in calculations expecting different types.
*   Always consider the potential range of values (positive, negative, zero) when choosing between signed (`int`) and unsigned (`uint`) integer types.