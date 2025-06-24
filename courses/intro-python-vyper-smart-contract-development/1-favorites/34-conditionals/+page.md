## Mastering Conditional Logic in Vyper: Using if, elif, and else

Conditional statements are fundamental building blocks in programming, allowing your smart contracts to make decisions and execute different code paths based on specific criteria. In Vyper, the language used for writing secure and efficient Ethereum smart contracts, conditional logic is implemented using `if`, `elif`, and `else` statements, much like in Python. This lesson will guide you through understanding and implementing these crucial control flow structures.

We'll use the Remix IDE, a popular browser-based development environment, configured for Vyper development.

### Setting Up the Contract

Before diving into conditionals, let's establish the basic structure of our Vyper contract file (e.g., `ifElse.vy`):

1.  **Pragma Directive:** We start by specifying the Vyper compiler version. This ensures compatibility and predictable behavior.
    ```vyper
    # pragma version ^0.4.0
    ```
    This line tells the compiler that the code is written for Vyper version 0.4.0 or any compatible later version within the 0.4.x series.

2.  **Function Definition:** We'll define a function to demonstrate the conditional logic. Initially, we make it `external` so it can be called from outside the contract.
    ```vyper
    @external
    def if_else(x: uint256) -> uint256:
        # Conditional logic will go here
        pass # Placeholder, will be replaced
    ```
    *   `@external`: This decorator makes the function callable via transactions or calls from other contracts/users.
    *   `def if_else(x: uint256) -> uint256:`: This defines a function named `if_else` that accepts one argument `x` of type `uint256` (a 256-bit unsigned integer) and is declared to return a value of the same type (`uint256`). The colon `:` signifies the start of the function's code block.

### Implementing Conditional Statements

Now, let's replace the `pass` statement with our conditional logic using `if`, `elif`, and `else`. Vyper relies on indentation (typically 4 spaces) to define code blocks, similar to Python.

1.  **The `if` Statement:**
    The `if` statement executes a block of code *only* if its condition evaluates to true.
    ```vyper
    if x <= 10:
        return 1
    ```
    *   **Condition:** `x <= 10`. The code checks if the input value `x` is less than or equal to 10.
    *   **Action:** If the condition is true, the function immediately stops execution and returns the value `1`. The code following this `if` block (within the same function scope) will not be executed.

2.  **The `elif` Statement (Else If):**
    If the preceding `if` condition was false, Vyper checks the condition of the `elif` statement. Note that Vyper uses `elif`, not `else if`. You can have multiple `elif` statements.
    ```vyper
    # ... (previous if statement)
    elif x <= 20:
        return 2
    ```
    *   **Condition:** `x <= 20`. This condition is *only* evaluated if the first condition (`x <= 10`) was false. It checks if `x` is less than or equal to 20.
    *   **Action:** If `x` is greater than 10 but less than or equal to 20, this condition is true, and the function returns the value `2`.

3.  **The `else` Statement:**
    The `else` statement provides a default code block that executes if *none* of the preceding `if` or `elif` conditions were true. It doesn't have a condition of its own.
    ```vyper
    # ... (previous if and elif statements)
    else:
        return 0
    ```
    *   **Action:** If `x` is not less than or equal to 10 (meaning `x > 10`) AND `x` is not less than or equal to 20 (meaning `x > 20`), this `else` block is executed, and the function returns the value `0`.

### Code Refinement: Adding the `@pure` Decorator

Observing our `if_else` function, we notice it doesn't read from or write to the contract's storage or interact with the blockchain environment (like checking block numbers or balances). It operates solely on its input arguments. In such cases, we can add the `@pure` decorator alongside `@external`.

```vyper
@external
@pure
def if_else(x: uint256) -> uint256:
    # ... (if/elif/else logic)
```

*   `@pure`: This decorator signifies that the function promises not to read or modify any state. This is a stricter guarantee than `@view` (which allows reading state) and can enable optimizations and clearer understanding of the function's behavior.

### Complete Example Code

Here is the complete `ifElse.vy` contract code incorporating the conditional logic and decorators:

```vyper
# pragma version ^0.4.0

@external
@pure
def if_else(x: uint256) -> uint256:
    """
    Returns:
        1 if x <= 10
        2 if 10 < x <= 20
        0 if x > 20
    """
    if x <= 10:
        return 1
    elif x <= 20:
        return 2
    else:
        return 0
```

### Testing in Remix IDE

To verify our logic, we can use the Remix IDE:

1.  **Compile:** Navigate to the "Vyper Compiler" tab, select `ifElse.vy`, and click "Compile". A green checkmark indicates success.
2.  **Deploy:** Go to the "Deploy & Run Transactions" tab. Ensure your contract (`IFELSE - IfElse.vy`) is selected, and click "Deploy". The contract will appear under "Deployed Contracts".
3.  **Interact:**
    *   Expand the deployed contract interface.
    *   Find the `if_else` function section.
    *   **Test 1:** Enter `1` in the `x (uint256)` input field and click the `call` button (it's a call, not a transaction, because the function is `pure`). The output should show `1`, confirming the `if` block executed.
    *   **Test 2:** Enter `20` and click `call`. The output should be `2`, confirming the `elif` block executed.
    *   **Test 3:** Enter `100` and click `call`. The output should be `0`, confirming the `else` block executed.

### Summary

You have now learned how to implement conditional logic in Vyper using `if`, `elif`, and `else` statements. Key takeaways include:

*   **Control Flow:** These statements direct the execution path of your function based on conditions.
*   **Syntax:** Remember the colon (`:`) after each condition and the mandatory indentation for code blocks. Vyper uses `elif` for "else if".
*   **`@pure` Decorator:** Use `@pure` for functions that neither read nor modify contract state, improving clarity and potentially enabling optimizations.
*   **Testing:** Always test your conditional logic thoroughly with various inputs to ensure it behaves as expected in all scenarios.

Mastering conditionals is essential for creating smart contracts that can respond dynamically to different inputs and situations on the blockchain.