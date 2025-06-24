## Defining Functions in Vyper with the `def` Keyword

In Vyper, declaring a state variable with the `public` keyword, such as `my_favorite_number: public(uint256)`, automatically creates a getter function. This allows anyone to read the variable's current value (initialized to 0 in this case, or its default). However, a common challenge arises: how do you *modify* or *update* this value after the contract is deployed? Simply reading the variable doesn't change the contract's state.

The solution lies in defining **functions** (sometimes referred to as methods) within your smart contract. Functions are self-contained blocks of code designed to perform specific tasks when they are invoked or 'called'. If you're familiar with languages like Python or JavaScript, the concept of functions in Vyper will feel familiar. They are essential for adding logic that alters the contract's data.

**Defining a Function with `def`**

In Vyper, functions are defined using the `def` keyword, which stands for 'definition'. The basic syntax involves several key components:

1.  **The `def` Keyword:** Marks the beginning of a function definition.
2.  **Function Name:** Follows `def`, naming your function (e.g., `store`).
3.  **Parentheses `()`:** Follow the function name. These enclose the function's input parameters.
4.  **Parameters (Inputs):** Defined inside the parentheses using the `parameter_name: type` syntax. Parameters allow you to pass data *into* the function. For example, `new_number: uint256` defines an input named `new_number` that must be an unsigned 256-bit integer.
5.  **Colon `:`:** Appears after the closing parenthesis of the parameter list, signifying the start of the function's code block.
6.  **Indentation:** Vyper is indentation-sensitive (like Python). The code lines that belong to the function *must* be indented (typically with 4 spaces) relative to the `def` line. This indentation defines the scope or body of the function.
7.  **Function Body:** The indented code block containing the logic the function executes when called.

Here's the basic structure:

```vyper
# Basic function definition structure
def function_name(parameter1_name: type1, parameter2_name: type2):
    # Indented code forming the function body goes here
    # This code executes when the function is called
    pass # Placeholder for logic
```

**Accessing State Variables: The `self` Keyword**

A critical concept when working with state variables inside functions is the `self` keyword. To access or modify variables declared at the contract level (state variables like `my_favorite_number`), you *must* prefix them with `self.`.

For instance, to assign the value of the `new_number` parameter to the `my_favorite_number` state variable, you would write:

```vyper
    self.my_favorite_number = new_number
```

The `self` keyword refers to the current instance of the contract. It explicitly tells the Vyper compiler that you intend to interact with the contract's storage (the `my_favorite_number` state variable) and not, for example, create a new local variable named `my_favorite_number` scoped only within the function. Omitting `self.` when trying to modify a state variable will lead to errors or unexpected behavior.

**Function Visibility: The `@external` Decorator**

Just as state variables have visibility modifiers like `public`, functions also have visibility controlling where they can be called from. By default, Vyper functions are `internal`, meaning they can only be called from within the same contract or contracts that inherit from it.

To allow a function to be called from *outside* the contract (e.g., by a user sending a transaction via an interface, or by another separate contract), you must use the `@external` **decorator**. Decorators, denoted by the `@` symbol, modify the behavior of the function or class defined immediately below them.

The `@external` decorator is placed on the line directly preceding the `def` statement:

```vyper
@external
def store(new_number: uint256):
    # Function body...
```

**Putting It All Together: An Example**

Let's combine these concepts to create a function that updates our `my_favorite_number` state variable:

```vyper
# pragma version 0.4.0
# @license MIT

# State variable (can be public or not, depending on read access needs)
my_favorite_number: public(uint256) # Initially 0

# Function to modify the state variable
@external  # Makes the function callable externally
def store(new_number: uint256):  # Defines function 'store' taking a uint256 input
    # Assigns the input 'new_number' to the contract's state variable 'my_favorite_number'
    # using 'self' to reference the contract's storage.
    self.my_favorite_number = new_number
```

**Interaction and State Changes: Transactions**

When you compile and deploy a contract like the one above (e.g., in the Remix IDE), you'll interact with it differently based on whether you're reading or writing state:

*   **Reading (`my_favorite_number`):** Because the variable is `public`, an automatic getter function is created. Calling this getter (often represented by a blue button in Remix) simply reads the current value from the blockchain's state. This is a read-only operation and does *not* require sending a transaction or paying gas (beyond potential node provider fees).
*   **Writing (`store` function):** Because the `store` function is marked `@external`, it can be called from outside. Calling this function involves providing the `new_number` input. Crucially, because this function *modifies* the contract's state (`self.my_favorite_number = new_number`), executing it requires sending a **transaction** to the blockchain. This transaction must be mined, consumes gas, and permanently records the state change. In Remix, this is often represented by an orange button.

**Key Takeaways**

*   Use the `def` keyword to define functions in Vyper.
*   Functions are necessary to implement logic that modifies the state of a smart contract.
*   Use the `self.` prefix inside functions to access or modify contract-level state variables.
*   Control function accessibility using visibility decorators like `@external` (for outside calls) or rely on the default `internal`.
*   Vyper is indentation-sensitive; correct indentation is crucial for defining the scope of function bodies.
*   Calling functions that modify contract state requires sending a transaction to the blockchain, while reading public state variables generally does not.