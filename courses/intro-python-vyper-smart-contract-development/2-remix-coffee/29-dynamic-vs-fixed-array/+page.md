## Enhancing Our Contract: Tracking Funders

We've previously built a `buy_me_a_coffee.vy` contract that allows users to send Ether (ETH), ensuring they meet a minimum USD value via a price feed. The contract owner can also withdraw the collected funds. Here's a quick reminder of the core logic:

*   **Funding:** The `fund()` function checks the USD value of the incoming ETH against a minimum requirement.
    ```vyper
    # Inside fund() function
    usd_value_of_eth: uint256 = self.get_eth_to_usd_rate(msg.value)
    assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
    ```
*   **Withdrawal:** The `withdraw()` function allows only the owner to retrieve the contract's balance.
    ```vyper
    # Inside withdraw() function
    assert msg.sender == self.owner, "Not the contract owner!"
    send(self.owner, self.balance)
    ```

Now, we want to add a new feature: we need to keep track of *who* sent funds and *how much* they sent.

```vyper
# Keep track of who sent us
# How much they sent us
```

To store this information, which will likely grow over time as more people fund the contract, we need to use a data structure capable of holding a list or collection of data. In Vyper, arrays are the primary tool for this.

## Choosing the Right Tool: Dynamic vs. Fixed-Size Arrays

Vyper offers different ways to handle lists of data. We could potentially use a standard array syntax like `funders: address[]`. However, when dealing with lists where the number of elements isn't known beforehand and can change during the contract's lifetime, Vyper provides a specific type: the Dynamic Array or `DynArray`.

To understand `DynArray` properly and contrast it with the more traditional fixed-size arrays, let's explore their differences using a separate example contract, `arrays_compared.vy`. Consulting the Vyper documentation reveals the syntax for dynamic arrays: `DynArray[_Type, _Maximum_Length]`.

## Declaring Arrays in Vyper

In our example contract `arrays_compared.vy`, we'll declare both types of arrays to hold `uint256` values, both related to a size of 100:

```vyper
# Dynamic Array: Max size 100, holds uint256
dynamic_array: public(DynArray[uint256, 100])

# Fixed-Sized Array: Fixed size 100, holds uint256
fixed_sized_array: public(uint256[100])
```

*   `dynamic_array`: This is a `DynArray` that can hold `uint256` values. Crucially, `100` here represents the *maximum* number of elements it can ever hold.
*   `fixed_sized_array`: This is a fixed-size array that holds exactly `100` `uint256` elements. Its size is set at compile time and cannot change.

The `public` keyword makes the contents of these arrays readable from outside the contract, which is useful for demonstration.

## Understanding Size and Initialization

The fundamental difference lies in how their size is managed and how they are initialized:

*   **`DynArray` (Dynamic Array):**
    *   Starts **empty**. Its initial length is `0`.
    *   You add elements to it dynamically, typically using the `.append()` method.
    *   Its length grows as elements are added, but it can *never* exceed the maximum size specified during declaration (100 in our example).
    *   The *current* number of elements stored is dynamic.

*   **Fixed-Sized Array:**
    *   Has a **fixed** size (100 in our example) determined when the contract is compiled. This size *never* changes.
    *   Is initialized with **default values** for its element type. For `uint256[100]`, it starts completely filled with 100 zeros: `[0, 0, 0, ..., 0]`.
    *   It doesn't have a dynamic "length" property in the same way a `DynArray` does; its size is inherent in its type definition.

## Getting the Current Size: The `len()` Function

Vyper provides a built-in `len()` function to determine the *current* number of elements in certain data structures.

*   **For `DynArray`:** You can use `len()` to get its current length.
    ```vyper
    @external
    @view
    def dyn_array_size() -> uint256:
        return len(self.dynamic_array)
    ```
    This function will return `0` initially and increase each time an element is appended.

*   **For Fixed-Sized Array:** You **cannot** use `len()` on a fixed-size array. Attempting to do so will result in a **compile-time error** (`TypeMismatch`), as the size is fixed and known at compile time.
    ```vyper
    # This code causes a COMPILE ERROR
    # @external
    # @view
    # def fixed_array_size() -> uint256:
    #     return len(self.fixed_sized_array) # Error: len() cannot be used on fixed-size arrays
    ```

## Adding and Modifying Elements: `append()` vs. Index Assignment

How you add or change elements differs significantly between the two array types:

*   **Adding to `DynArray`:** Use the `.append()` method. This adds the specified element to the very end of the array and increases its length by one (as long as the maximum capacity hasn't been reached).
    ```vyper
    # Example usage within a function
    self.dynamic_array.append(1) # Adds the value 1 to the end
    ```

*   **Modifying Fixed-Sized Array:** You **cannot** use `.append()`. Attempting this results in a **compile-time error** (`StructureException: ... instance does not have members`). Instead, you modify elements by directly accessing their position using an index (starting from 0).
    ```vyper
    # Example usage within a function
    self.fixed_sized_array[0] = 1 # Sets the value at index 0 to 1
    ```

## Accessing Elements and Handling Errors: Indexing Behavior

Both array types allow accessing elements using square bracket notation (`array[index]`), but the behavior, especially regarding errors, is different:

*   **`DynArray` Indexing:**
    *   You can only access an index `i` (e.g., `self.dynamic_array[i]`) if the array currently contains at least `i+1` elements (i.e., `i < len(self.dynamic_array)`).
    *   Attempting to read from or write to an index that is out of bounds (less than 0, or greater than or equal to the *current* length) will cause a **runtime error**, reverting the transaction.
    *   You must `.append()` an element *before* you can access it via its index. For example, after `self.dynamic_array.append(1)`, `self.dynamic_array[0]` becomes accessible.

*   **Fixed-Sized Array Indexing:**
    *   You can read from or write to *any* valid index from `0` up to `size-1` (e.g., `0` to `99` for `uint256[100]`) at any time after deployment.
    *   Initially, reading any index will return the default value (`0` for `uint256`).
    *   Writing to an index (e.g., `self.fixed_sized_array[0] = 1`) updates the value at that specific position. Accessing an index outside the fixed bounds (e.g., index `100` or higher) would still cause an error.

**Runtime Demonstration:**

1.  Deploy `arrays_compared.vy`.
2.  Calling `dyn_array_size()` returns `0`. Reading `dynamic_array[0]` reverts.
3.  Reading `fixed_sized_array[0]` returns `0`.
4.  Execute a function like `add_to_array()` that performs `self.dynamic_array.append(1)` and `self.fixed_sized_array[0] = 1`.
5.  Now, `dyn_array_size()` returns `1`. Reading `dynamic_array[0]` returns `1`. Reading `fixed_sized_array[0]` also returns `1`.
6.  Execute `add_to_array()` again (appending another `1` to `dynamic_array`).
7.  `dyn_array_size()` returns `2`. Reading `dynamic_array[1]` returns `1`.
8.  Reading `dynamic_array[2]` reverts (index out of bounds). Reading `fixed_sized_array[1]` returns `0` (it was never explicitly set).

## Tip: Simulating Dynamic Behavior with Fixed-Size Arrays

If you need `append`-like behavior but want to use a fixed-size array (perhaps for gas reasons or specific constraints), you can simulate it by manually tracking the next empty index using a separate state variable:

```vyper
index: uint256 # State variable to track the next available index
fixed_sized_array: public(uint256[100]) # Fixed size

@external
def add_to_array_fixed_simulated(_value: uint256):
    # Ensure we don't write out of bounds
    assert self.index < 100 # Check against the fixed size
    
    # Use the tracked index to place the new value
    self.fixed_sized_array[self.index] = _value 
    
    # Increment the index for the next 'append' operation
    self.index = self.index + 1
```
This requires careful management of the `index` variable and checking boundaries to prevent errors.

## Key Differences Summarized and Next Steps

To summarize the core distinctions:

| Feature           | `DynArray[Type, MaxSize]`       | `Type[FixedSize]`                 |
| :---------------- | :------------------------------ | :-------------------------------- |
| **Size**          | Dynamic length, up to `MaxSize` | Fixed at `FixedSize`              |
| **Initialization**| Starts empty (`len() == 0`)     | Filled with default values        |
| **Adding Elements**| Use `.append()`                 | Assign value to index (`arr[i]=v`) |
| **Getting Length**| Use `len()`                     | `len()` causes compile error      |
| **Indexing Error**| Runtime revert if index >= `len()` | Valid index always accessible     |

Understanding these differences is crucial for choosing the right data structure in Vyper. For our goal of tracking an unknown number of funders and their contribution amounts in the `buy_me_a_coffee.vy` contract, the `DynArray` seems more appropriate, as it allows the list of funders to grow dynamically up to a predefined maximum limit. We can now proceed to implement this using `DynArray`.