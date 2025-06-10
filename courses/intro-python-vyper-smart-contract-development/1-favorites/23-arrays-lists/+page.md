## Working with Fixed-Size Lists in Vyper

This lesson explores how to use fixed-size arrays, which Vyper refers to as lists, within your smart contracts. We'll cover declaring, initializing, reading from, and writing to these lists, highlighting important considerations like indexing and boundary checks. We will build upon a basic `favorites.vy` contract.

Imagine you have a simple contract like this:

```vyper
# pragma version 0.4.0
# @license MIT

my_favorite_number: public(uint256)

@deploy
def __init__():
    self.my_favorite_number = 7

@external
def store(new_favorite_number: uint256):
    self.my_favorite_number = new_favorite_number

@view
@external
def retrieve() -> uint256:
    return self.my_favorite_number
```

Now, let's enhance this contract to store not just one, but a collection of favorite numbers using a fixed-size list.

### Declaring and Initializing Fixed-Size Lists

To store multiple numbers, we can declare a state variable as a list. The syntax specifies the type of elements followed by the fixed size in square brackets.

Let's add a list designed to hold 5 unsigned 256-bit integers (`uint256`):

```vyper
list_of_numbers: uint256[5]
```

When you declare a state variable like this, Vyper automatically initializes all its elements to the default value for their type. For `uint256`, the default value is `0`. So, immediately after deployment, `list_of_numbers` conceptually holds `[0, 0, 0, 0, 0]`.

### Public Access and Reading List Elements

To allow external users or contracts to read values from our list, we mark it as `public`. Vyper will automatically generate a getter function for it.

```vyper
# State variable holding a list of 5 uint256 values
# Initialized to [0, 0, 0, 0, 0] by default
list_of_numbers: public(uint256[5])
```

After compiling and deploying this updated contract (e.g., using Remix IDE), you'll notice a new interface element corresponding to `list_of_numbers`. This public getter function requires one argument: the index of the element you want to retrieve.

**Zero-Based Indexing:** It's crucial to remember that Vyper lists, like arrays in many programming languages, use zero-based indexing. This means:

*   The first element is at index `0`.
*   The second element is at index `1`.
*   ...
*   For our list of size 5, the last element is at index `4`.

If you call the generated `list_of_numbers` getter with an index of `0`, it will return the first element (initially `0`). Calling it with `4` returns the fifth element (also initially `0`).

**Out-of-Bounds Reads:** What happens if you try to access an index outside the valid range? For our size 5 list, valid indices are 0, 1, 2, 3, and 4. If you attempt to read index `5` (or any index greater than 4 or less than 0), the transaction will fail and **revert**. This is a built-in safety mechanism in Vyper to prevent invalid memory access.

### Writing to List Elements

The automatically generated `public` getter only allows reading. To modify the list, we need to create our own function. Let's design a function `add_number` to store a new number in the list.

Since this function will modify the contract's state (the `list_of_numbers`), it must be marked `@external` (allowing it to be called from outside) and cannot be marked `@view`.

**Accessing State Variables:** Remember that functions need to use the `self.` prefix to access state variables.

Our first attempt might look like this, trying to place the new number at the beginning of the list:

```vyper
@external
def add_number(favorite_number: uint256):
    # This updates ONLY the element at index 0
    self.list_of_numbers[0] = favorite_number
```

If you deploy this and call `add_number(777)`, the list will become `[777, 0, 0, 0, 0]`. However, every subsequent call to `add_number` will simply overwrite the value at index `0`.

### Sequentially Adding Numbers

To add numbers one after another into the available slots, we need to keep track of the next index to write to. We can introduce another state variable for this purpose:

```vyper
# State variable to track the next available index in the list
index: public(uint256)
```

We should initialize this `index` tracker to `0` when the contract is deployed. We do this within the `__init__` (constructor) function:

```vyper
@deploy
def __init__():
    self.my_favorite_number = 7 # Assuming this is still needed
    self.index = 0 # Initialize the index tracker
    # Note: list_of_numbers is still initialized to [0,0,0,0,0] automatically
```

Now, we modify `add_number` to use `self.index` to determine the position for the new number and then increment `self.index` so the *next* call uses the subsequent position:

```vyper
@external
def add_number(favorite_number: uint256):
    # Use the current value of self.index to access the list element
    self.list_of_numbers[self.index] = favorite_number
    # Increment the index for the next addition
    self.index = self.index + 1
```

Let's trace the execution:

1.  **Deploy:** `list_of_numbers` is `[0, 0, 0, 0, 0]`, `index` is `0`.
2.  **Call `add_number(7)`:**
    *   `self.list_of_numbers[0]` becomes `7`. (`list_of_numbers` is now `[7, 0, 0, 0, 0]`)
    *   `self.index` becomes `1`.
3.  **Call `add_number(12)`:**
    *   `self.list_of_numbers[1]` becomes `12`. (`list_of_numbers` is now `[7, 12, 0, 0, 0]`)
    *   `self.index` becomes `2`.
4.  **(Calls continue...)**
5.  **After 5 calls:** `list_of_numbers` might be `[7, 12, 5, 99, 42]`, and `self.index` will be `5`. The list is full.

**Out-of-Bounds Writes:** What happens if we call `add_number` a sixth time?

*   The function tries to execute `self.list_of_numbers[self.index] = favorite_number`.
*   At this point, `self.index` is `5`.
*   The code attempts to write to `self.list_of_numbers[5]`.
*   Since the highest valid index for a size 5 list is `4`, index `5` is out of bounds.
*   Just like out-of-bounds reads, this causes the transaction to **revert**. Any state changes attempted within that failed transaction (like incrementing the index, though it happens after the revert point here) are undone.

### Key Takeaways

*   Vyper uses the term **list** for fixed-size arrays.
*   Declare lists using `variable_name: element_type[fixed_size]`.
*   State variable lists are **initialized with default zero values**.
*   Marking a list `public` creates a **getter function** requiring an index argument.
*   Lists use **zero-based indexing** (index `0` is the first element, index `size-1` is the last).
*   Access state variables within functions using `self.`.
*   Attempting to read or write **outside the valid index range** (0 to size-1) causes the transaction to **revert**.
*   Custom functions are needed to **modify list elements**.
*   Use an **index tracker** state variable for sequential additions to a list. Initialize it in `__init__`.

Fixed-size lists are useful when you know the maximum number of items you need to store upfront. They provide safety against unbounded growth but require careful handling of indices to avoid reverts.