## Vyper State Variables: Visibility and Remix VM Deployment

Welcome to this lesson on understanding state variable visibility in Vyper and deploying your first simple contract to the Remix VM. We'll explore how Vyper handles data storage within a contract and how you can control its accessibility, using the Remix IDE's simulated environment for hands-on practice.

### Understanding State Variables

In Vyper, variables declared outside of any function, at the top level of the contract, are called **state variables** (or storage variables). These variables represent the persistent state of the smart contract; their values are stored directly on the blockchain and maintained across transactions.

Declaring a state variable in Vyper uses a syntax that might look familiar if you've worked with Python:

```vyper
variable_name: type
```

For instance, to declare a state variable intended to hold an unsigned 256-bit integer, you would write:

```vyper
my_favorite_number: uint256
```

This syntax is identical to Python's type hints, which reinforces your Python knowledge as you learn Vyper.

### Default Initialization of State Variables

An important concept is that state variables are automatically initialized to a default value if you don't explicitly assign one upon declaration or within a constructor (which we'll cover later). For numeric types like `uint256`, the default value is `0`. For `bool`, it's `False`, and for `address`, it's the zero address (`0x00...00`). We will verify this default value shortly.

### Controlling Access: Variable Visibility

Visibility keywords determine where a state variable can be accessed from. Vyper has different visibility levels, but for state variables, we'll focus on the two main ones implicitly and explicitly used:

1.  **`internal` (Default):** If you declare a state variable without any specific visibility keyword, like our `my_favorite_number: uint256` example above, it defaults to `internal`. This means the variable can only be accessed from *within* the contract itself or by contracts that inherit from it. External accounts or other independent contracts cannot directly read its value without a dedicated function created for that purpose.

2.  **`public`:** To make a state variable readable from outside the contract, you need to declare it as `public`. You do this by wrapping the variable's *type* with `public()`:

    ```vyper
    my_favorite_number: public(uint256)
    ```

    When you mark a state variable as `public`, the Vyper compiler automatically generates a **getter function** for it. This function has the same name as the variable and allows anyone (external accounts, other contracts, user interfaces) to call it and retrieve the variable's current value.

### Deploying to the Remix VM

To see these concepts in action, we'll use the Remix IDE, a web-based environment for developing smart contracts. Specifically, we'll deploy our contract to the **Remix VM (JavaScript VM)**.

The Remix VM is a simulated blockchain environment that runs entirely in your browser's JavaScript engine. Think of it as a "fake blockchain" perfect for quick testing and development. It has several advantages for learning:
*   It requires no setup or connection to a real blockchain network (like a testnet or mainnet).
*   It comes with pre-funded dummy accounts.
*   Deploying contracts is instantaneous.
*   You can easily remove deployed contracts (unlike on real, immutable blockchains).

### Practical Demonstration: Internal vs. Public

Let's write, compile, and deploy a simple contract to observe the difference visibility makes.

**Step 1: Write the Initial Contract (Internal Visibility)**

Create a new file in Remix named `favorites.vy` and add the following code:

```vyper
# favorites.vy
# pragma version 0.4.0  # Use an appropriate Vyper version supported by Remix
# @license MIT

my_favorite_number: uint256 # Expected default value is 0
```

**Step 2: Compile the Contract**

1.  Go to the "Vyper Compiler" tab in Remix (plugin might need activation).
2.  Ensure a compatible compiler version (e.g., 0.4.0 or similar) is selected.
3.  Click "Compile favorites.vy".

**Step 3: Deploy to Remix VM (Internal Variable)**

1.  Go to the "Deploy & Run Transactions" tab.
2.  In the "ENVIRONMENT" dropdown, select one of the "Remix VM" options (e.g., "Remix VM (Cancun)").
3.  Ensure your contract (`favorites - favorites.vy`) is selected in the "CONTRACT" dropdown.
4.  Click the orange "Deploy" button.
5.  Scroll down to the "Deployed Contracts" section. You'll see an instance of your `favorites` contract. Expand it using the small arrow.

**Observation (Internal):** Notice that under the deployed contract instance, there is no button or direct way to read the value of `my_favorite_number`. You might only see options for "Low level interactions". This is because the variable is `internal` by default, and no getter function was automatically created.

**Step 4: Modify for Public Visibility**

Now, let's change the visibility. Modify the `favorites.vy` code:

```vyper
# favorites.vy
# pragma version 0.4.0
# @license MIT

my_favorite_number: public(uint256) # Now public, getter will be generated
```

**Step 5: Recompile and Redeploy**

1.  Go back to the "Vyper Compiler" tab and click "Compile favorites.vy" again.
2.  Return to the "Deploy & Run Transactions" tab.
3.  **Tip:** It's good practice to remove the old contract instance first. Click the 'x' button next to the previously deployed contract under "Deployed Contracts" (this only works in the Remix VM).
4.  Click the orange "Deploy" button again.
5.  Expand the newly deployed contract instance.

**Observation (Public):** This time, you will see a blue button labeled `my_favorite_number` under the deployed contract. This button represents the automatically generated getter function created because we declared the variable as `public`.

**Step 6: Read the Value**

Click the blue `my_favorite_number` button. Below the button, Remix will display the returned value, which should look something like `0: uint256: 0`. This confirms two things:
*   The default value for our `uint256` state variable is indeed `0`.
*   The `public` keyword made the variable's value easily accessible from the Remix interface via the auto-generated getter function.

### Key Takeaways

*   **State Variables:** Store persistent data on the blockchain, declared at the contract's top level.
*   **Vyper Syntax:** `variable_name: type` mirrors Python type hints.
*   **Default Values:** State variables have default values (`0` for `uint256`).
*   **Default Visibility:** State variables are `internal` by default, accessible only within the contract.
*   **Public Visibility:** Use `public(type)` to make a state variable readable externally. This automatically creates a **getter function**.
*   **Remix VM:** An invaluable tool for quickly deploying and testing contracts in a simulated browser environment. Remember contracts deployed here are easily removed, unlike on real blockchains which are immutable.
*   **Getter Functions:** Provide a standard way to read the state of public variables. While technically all data on a public blockchain is potentially readable at a lower level (inspecting storage slots), `public` getters provide convenient, function-based access.

You now understand how to declare state variables, control their visibility using `internal` (default) and `public`, and how to deploy and interact with a simple contract using the Remix VM to observe these concepts directly.