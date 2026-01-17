## Vyper Function Decorators: Pure vs. View Explained

In Vyper, function decorators like `@pure` and `@view` provide important information about a function's behavior, specifically regarding its interaction with the blockchain state. Both decorators signal that a function is *read-only*, meaning it promises not to alter any data stored permanently on the blockchain within the contract's state variables. Understanding the difference between them is crucial for writing efficient and secure smart contracts.

Let's break down the core concepts and the distinction between `@pure` and `@view`.

**Core Concepts Recap**

*   **Read-Only Functions:** Functions that do not modify the blockchain state. They don't change the values of any state variables.
*   **State Variables:** Variables declared within a contract whose values persist on the blockchain (e.g., `my_variable: public(uint256)`). Changing these requires a state-modifying transaction.
*   **Global Variables:** Special variables provided by the Ethereum Virtual Machine (EVM) offering context about the blockchain or transaction (e.g., `block.timestamp`, `msg.sender`).
*   **Function Decorators:** Python-like syntax (`@decorator_name`) placed above a function definition to modify or declare its properties.

**The `@pure` Decorator**

Functions marked with `@pure` are the most restrictive type of read-only function.

*   **Restriction:** A `pure` function **cannot read** contract state variables *nor* can it read any global variables (like `block.timestamp` or `msg.sender`).
*   **Operation:** It can only operate on the input arguments passed directly to it and any local variables defined within its scope.
*   **Analogy:** Think of a pure mathematical function. Given the same inputs, it will always produce the same output, regardless of any external state.

**Example: A `@pure` Function**

```vyper
# pragma version ^0.4.0

@external
@pure
def add(x: uint256, y: uint256) -> uint256:
    """
    This function is pure because it only uses its input arguments
    (x and y) to calculate the result. It does not access any
    contract state variables or EVM global variables.
    """
    return x + y
```

This `add` function simply returns the sum of its two inputs. Its execution depends solely on `x` and `y`.

**The `@view` Decorator**

Functions marked with `@view` are also read-only, but they have fewer restrictions than `pure` functions.

*   **Permission:** A `view` function **can read** contract state variables and global variables.
*   **Restriction:** Crucially, it still **cannot modify** any state variables. It only "views" the state.
*   **Analogy:** Think of "viewing" or inspecting the current condition of the contract or the blockchain environment without making any changes.

**Example: A `@view` Function**

First, let's assume our contract has a state variable:

```vyper
count: public(uint256)
```

Now, here's a `view` function that uses it:

```vyper
@external
@view
def add_to_count(x: uint256) -> uint256:
    """
    This function is 'view' because it reads the state variable
    'self.count' and the global variable 'block.timestamp'.
    However, it does NOT modify 'self.count' or any other state.
    Because it reads state/globals, it cannot be 'pure'.
    """
    return x + self.count + block.timestamp
```

This `add_to_count` function reads the current value stored in the `count` state variable and the current `block.timestamp`. Since it reads these external values but doesn't write to the state, it qualifies as `@view`. It cannot be `@pure` because it accesses `self.count` and `block.timestamp`.

**Illustrating the Boundaries**

*   **State Modification:** If a function attempts to change a state variable (e.g., `self.count += 1`), it is no longer read-only. Such a function cannot be marked as `@pure` *or* `@view`. It requires a transaction that modifies the blockchain state.
*   **Reading State:** If our original `add` function were changed to `return x + y + self.count`, it would now be reading state. It could no longer be `@pure`, but it *could* potentially be marked `@view` (as long as it doesn't write to state).
*   **Reading Global Variables:** Similarly, if `add` were changed to `return x + y + block.timestamp`, it would be reading a global variable. This also disqualifies it from being `@pure`, but it *could* potentially be `@view`.

**Practical Demonstration**

When compiled and deployed (e.g., using Remix IDE):

*   Calling the `add(x=2, y=3)` function directly returns `5`. This is a simple, self-contained calculation.
*   Calling the `add_to_count(x=2)` function returns a large number. This number represents `2 +` the current value of `count` (initially `0` if not set otherwise) `+` the current Unix timestamp (`block.timestamp`). This demonstrates its ability to read both contract state and global blockchain variables.

**Summary: When to Use Which**

*   Use **`@pure`** when your function performs calculations or logic based *only* on its input arguments and local variables. It needs no information about the contract's state or the blockchain environment.
*   Use **`@view`** when your function needs to *read* information from the contract's state variables or access global variables like `block.timestamp` or `msg.sender`, but it guarantees *not to change* any state.
*   Use **neither** decorator if your function needs to *modify* the contract's state variables (e.g., incrementing a counter, transferring tokens, recording data).