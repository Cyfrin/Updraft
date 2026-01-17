## Understanding Visibility in Vyper

Visibility in smart contract programming dictates which parts of your contract (state variables and functions) can be accessed and from where. Vyper, a Pythonic language for the Ethereum Virtual Machine (EVM), uses specific keywords and decorators to manage this crucial aspect of contract security and design. Understanding visibility ensures that functions are called only when intended and data is exposed appropriately.

Let's explore visibility using a simple example contract, `favorites.vy`:

```vyper
# pragma version 0.4.0
# @license MIT

my_favorite_number: public(uint256) # 0

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

In this initial state:

1.  **`my_favorite_number: public(uint256)`**: This declares a state variable named `my_favorite_number`. The `public` keyword is key here. It automatically instructs the Vyper compiler to generate a *getter function* with the same name (`my_favorite_number()`). This allows anyone (users or other contracts) outside of this contract to read the current value of `my_favorite_number` by calling this auto-generated function. The variable can also be accessed and modified from within the contract's functions (using `self.my_favorite_number`).

2.  **`@external def store(...)`**: This defines a function named `store`. The `@external` decorator specifies its visibility. Functions marked `@external` can *only* be called from outside the contract. This means an Externally Owned Account (EOA) or another smart contract can trigger this function, but it cannot be called from another function within the *same* contract using the `self` keyword (e.g., `self.store(...)` would be invalid).

### Implicit Visibility Defaults

Vyper has sensible defaults if you omit explicit visibility markers:

1.  **State Variables:** If you remove the `public` keyword from a state variable declaration (e.g., `my_favorite_number: uint256`), Vyper does *not* create an automatic getter function. The variable remains accessible internally to the contract's logic (via `self`), but it cannot be directly read from the outside world. Its visibility effectively becomes internal.

2.  **Functions:** If you do not add a visibility decorator (`@external` or `@internal`) to a function definition, Vyper **implicitly defaults to `@internal`**.

### Internal Visibility: `@internal`

Let's modify our `store` function to explicitly use (or demonstrate the default of) `@internal` visibility. Imagine we also removed `public` from the state variable for this specific scenario:

```vyper
# (Assuming 'public' was also removed from my_favorite_number)
my_favorite_number: uint256 # 0

@internal
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

The `@internal` decorator signifies that this function can *only* be called from *within* the same contract. Other functions defined in `favorites.vy` could call it using `self.store(...)`. However, it is completely inaccessible from outside the contract. If you were to deploy this version, you would find:

*   No external interface (like a button in Remix) to call the `store` function directly.
*   No external interface to read `my_favorite_number` (because `public` was removed).

### Interaction Between Visibility Types

Understanding how functions with different visibility levels interact is crucial:

*   **External Calling Internal (Allowed):** An `@external` function *can* call an `@internal` function using `self`. This is a common pattern for organizing code, where an external entry point uses internal helper functions.

    ```vyper
    # Conceptual Example
    @internal
    def _update_number(new_number: uint256): # Note: often prefixed with _
        self.my_favorite_number = new_number

    @external
    def set_favorite_to_seven():
        # Valid: External function calling an internal one
        self._update_number(7)
    ```

*   **Internal Calling External (Disallowed via `self`):** An `@internal` function **cannot** call an `@external` function using `self`. External functions are designed as entry points *from outside* the contract, not for internal control flow initiated via `self`. Attempting this will cause a compilation error.

    ```vyper
    # Example leading to an Error
    @internal
    def try_invalid_call():
        # INVALID: Cannot call an external function via self
        self.set_favorite_to_seven() # Assuming set_favorite_to_seven is @external

    @external
    def set_favorite_to_seven():
        # ... (implementation) ...
        pass
    ```

    Compiling code with an internal function calling an external function via `self` will result in a `CallViolation` error, explicitly stating: `CallViolation: Cannot call external functions via 'self' or via library`. This enforces the intended separation of external interfaces and internal logic.

### Key Takeaways on Vyper Visibility

*   **State Variables:** Use `public` to automatically create an external getter function. Without `public`, the variable is only accessible internally.
*   **`@external` Functions:** Can *only* be called from outside the contract. Cannot be called using `self` from within the contract.
*   **`@internal` Functions:** Can *only* be called from within the contract using `self`. This is the **default** visibility for functions if no decorator is specified.
*   **`self` Keyword:** Used for internal calls. It can invoke `@internal` functions but *cannot* invoke `@external` functions.
*   **Purpose:** Visibility controls access, enhancing security and enforcing clear contract interaction patterns. Choosing the correct visibility is essential for robust and secure smart contract development.