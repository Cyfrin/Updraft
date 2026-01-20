## Vyper Functions: Reading vs. Modifying State with @view

In smart contract development, functions often need to return information or change the contract's data. Vyper provides specific ways to handle functions based on whether they only read data or actually modify the blockchain's state. Understanding this distinction is crucial for efficiency, security, and gas costs.

### Returning Values from Functions

Vyper functions can return values to the caller. To do this, you specify the return type after the function signature using an arrow `->` followed by the data type. Inside the function, the `return` keyword sends the value back.

For example:
```vyper
@external
def get_number() -> uint256:
    # Some logic here...
    my_number: uint256 = 42
    return my_number
```

### State Variables and Public Getters

Variables declared at the contract level (outside any function) are called state variables or storage variables. They store data persistently on the blockchain.

```vyper
# State variable declaration
my_favorite_number: public(uint256) # Initial value is 0
```

Here, `my_favorite_number` is a state variable. The `public` keyword is special: it automatically creates a "getter" function with the same name (`my_favorite_number()` in this case). This getter allows anyone outside the contract to read the variable's current value.

Importantly, when you call this auto-generated getter function from *outside* the blockchain (e.g., using a tool like Remix or a web application), it's treated as a **call**. Calls are read-only operations that **do not cost the caller gas** because they don't modify the blockchain state. Tools like Remix often represent these callable functions with blue buttons.

### The `@external` Decorator and Default Behavior

The `@external` decorator marks a function as callable from outside the contract. Consider this function which modifies state:

```vyper
@external
def store(new_number: uint256):
    # This line modifies the state variable
    self.my_favorite_number = new_number
```

Because this `store` function changes the value of `my_favorite_number`, interacting with it requires a **transaction**. Transactions modify the blockchain state, must be mined, cost gas, and result in a transaction hash. Remix typically shows functions like this, which are assumed to modify state, with orange buttons.

Now, let's look at a function intended *only* to read state:

```vyper
# Initial attempt - might not behave as expected off-chain
@external
def retrieve() -> uint256:
    return self.my_favorite_number
```

This function reads `self.my_favorite_number` and returns it. However, because it's only marked `@external` and *not* explicitly declared as read-only, Vyper and associated tools often default to treating it as a potential transaction (like the `store` function). If called from an external source like Remix, clicking its button (likely orange) would initiate a transaction and unnecessarily cost the caller gas, even though no state is being changed.

### Explicitly Reading State with the `@view` Decorator

To correctly signal that a function only reads state and should not modify it, use the `@view` decorator in addition to `@external`.

```vyper
# Corrected version - explicitly read-only
@external
@view
def retrieve() -> uint256:
    return self.my_favorite_number
```

Adding `@view` explicitly tells the Vyper compiler and external tools that this function promises *not* to change any blockchain state. It can read state variables and call other `@view` or `@pure` functions, but it cannot write to state.

**Effect:** When called from *outside* the blockchain (off-chain), a `@view` function is treated as a **call**. Like the public getter, it is **free for the caller** (no gas cost) because it only reads existing data from the blockchain node the user is connected to. Remix typically represents these functions with blue buttons, just like the public getter.

### Transactions vs. Calls: A Summary

*   **Transactions:**
    *   Modify blockchain state (e.g., writing to storage variables).
    *   Require gas.
    *   Must be mined and included in a block.
    *   Have a transaction hash.
    *   Often represented by orange buttons in tools like Remix (for functions *assumed* to be transactions, like non-`@view` `@external` functions).
*   **Calls:**
    *   Read blockchain state without modifying it.
    *   When initiated off-chain (e.g., by a user interface):
        *   Do *not* cost the caller gas.
        *   Do *not* need to be mined.
        *   Do *not* have a transaction hash associated with the read itself.
    *   Often represented by blue buttons in tools like Remix (for `public` getters and `@view` functions).

### Gas Costs: The Nuances of `@view`

While off-chain calls to `@view` functions are free for the caller, this isn't always the case.

*   **Off-Chain Calls:** Calls made directly to a `@view` function or `public` getter from outside the blockchain (e.g., a user clicking a button in a dapp) are free for the user.
*   **On-Chain Calls:** If a transaction (e.g., our `store` function) calls a `@view` function *during its execution*, that call *does* consume gas. The Ethereum Virtual Machine (EVM) still needs to perform the computations and read operations defined within the `@view` function, and these operations contribute to the overall gas cost of the *transaction* making the call.

Consider this example:
```vyper
my_favorite_number: public(uint256)

# Changed to @internal for this specific demonstration
@internal
@view
def retrieve() -> uint256:
    return self.my_favorite_number

@external
def store(new_number: uint256):
    self.my_favorite_number = new_number
    # Calling retrieve() from within a transaction costs gas
    self.retrieve()
    self.retrieve()
    self.retrieve()
```
Executing the `store` function here will cost more gas than a version without the `self.retrieve()` calls, demonstrating that `@view` functions consume gas when executed as part of an on-chain transaction.

### Best Practices

*   Always add the `@view` decorator to `@external` functions that are only intended to read blockchain state and not modify it.
*   This ensures they behave as free calls when interacted with off-chain, saving users gas.
*   It also clearly communicates the function's intent to other developers and auditors.
*   Remember the distinction: `@view` functions are free for the caller *only* when called off-chain. They still incur gas costs when called on-chain as part of another transaction's execution.