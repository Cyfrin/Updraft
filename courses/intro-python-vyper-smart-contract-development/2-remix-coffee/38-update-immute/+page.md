## Reducing Gas Costs in Vyper: Using `constant` and `immutable`

When writing Vyper smart contracts, efficiency is key. One major area for optimization lies in how you handle contract variables. By default, variables declared at the contract level are **Storage Variables**. While flexible, they come with a significant drawback: interacting with them costs considerable gas.

### The Cost of Storage Variables

Storage variables, like `minimum_usd`, `price_feed`, or `owner` in our example `buy_me_a_coffee.vy` contract, persist on the blockchain's state. Every time your contract reads from (`SLOAD`) or writes to (`SSTORE`) these variables, it incurs gas fees. These operations are among the most expensive in the Ethereum Virtual Machine (EVM).

If a variable's value doesn't need to change after being initially set, using a storage variable is often unnecessarily expensive. Vyper provides two more gas-efficient alternatives: `constant` and `immutable` variables. Our goal is to refactor our contract to use these where appropriate, thereby reducing deployment and runtime gas costs.

### Constant Variables: Known at Compile Time

A `constant` variable is a value that is fixed and known *before* the contract is even compiled. Think of it as a hardcoded value baked directly into the contract's bytecode.

**Key Characteristics:**

*   **Value:** Determined at compile time.
*   **Mutability:** Cannot *ever* be changed after declaration.
*   **Gas Efficiency:** Extremely gas-efficient, as reading the value doesn't require accessing storage.
*   **Naming Convention:** By convention, constants are named using `ALL_CAPS_WITH_UNDERSCORES`.
*   **Access:** Accessed directly by their name, *without* the `self.` prefix.

**Example: Refactoring `minimum_usd`**

In our contract, `minimum_usd` is set to the equivalent of $5 in wei within the constructor and never changes. Since this value (5 ether) is known before we deploy, it's ideal for a `constant`.

*   **Before (Storage Variable):**
    ```vyper
    # Storage variables
    minimum_usd: public(uint256)
    # ... other variables ...

    @deploy
    def __init__(price_feed: address):
        self.minimum_usd = as_wei_value(5, "ether")
        # ... rest of constructor ...

    # Accessed later as:
    # assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
    ```

*   **After (Constant Variable):**
    ```vyper
    # Constants & Immutables
    MINIMUM_USD: public(constant(uint256)) = as_wei_value(5, "ether") # Value set in declaration
    # ... other variables ...

    @deploy
    def __init__(price_feed: address):
        # self.minimum_usd line is REMOVED from constructor
        # ... rest of constructor ...

    # Accessed later as:
    assert usd_value_of_eth >= MINIMUM_USD, "You must spend more ETH!" # No 'self.'
    ```
Notice how the value is assigned directly in the declaration line using `constant(uint256)) = ...`. The assignment is removed from the `__init__` function, and subsequent references use `MINIMUM_USD` directly.

### Immutable Variables: Set Once at Deployment

An `immutable` variable is a value that is set exactly *once*, during contract deployment within the constructor (`__init__` function), and cannot be changed thereafter. Like constants, their values are embedded in the contract's deployed code rather than storage slots, making them much cheaper to read than storage variables.

**Key Characteristics:**

*   **Value:** Determined at deployment time (within the `__init__` function).
*   **Mutability:** Cannot be changed *after* the constructor finishes execution.
*   **Gas Efficiency:** Significantly more gas-efficient than storage variables, though slightly less so than constants because the value isn't fixed until deployment.
*   **Naming Convention:** Also uses `ALL_CAPS_WITH_UNDERSCORES`.
*   **Access:** Assigned in the constructor *without* `self.` and accessed later directly by name, also *without* the `self.` prefix.

**Example 1: Refactoring `price_feed`**

The `price_feed` address is provided as an argument to the constructor and set once. It needs to remain fixed for the contract's lifetime.

*   **Why not `constant`?** The specific price feed address might differ depending on the network (e.g., Sepolia testnet vs. Ethereum mainnet). Since the value isn't universally known at compile time, it can't be `constant`.
*   **Why `immutable`?** It's set once based on a deployment parameter, making it a perfect fit for `immutable`.

*   **Before (Storage Variable):**
    ```vyper
    price_feed: public(AggregatorV3Interface)
    # ...

    @deploy
    def __init__(price_feed: address):
        # ...
        self.price_feed = AggregatorV3Interface(price_feed)
        # ...

    # Accessed later as (e.g., in _get_eth_to_usd_rate):
    # price: int256 = staticcall self.price_feed.latestAnswer()
    ```

*   **After (Immutable Variable):**
    ```vyper
    # Constants & Immutables
    # ...
    PRICE_FEED: public(immutable(AggregatorV3Interface))
    # ...

    @deploy
    def __init__(price_feed_address: address): # Parameter renamed for clarity
        # ...
        PRICE_FEED = AggregatorV3Interface(price_feed_address) # Set WITHOUT 'self.'
        # ...

    # Accessed later as:
    price: int256 = staticcall PRICE_FEED.latestAnswer() # No 'self.'
    ```
Here, the variable is declared with `immutable(AggregatorV3Interface)`. Inside `__init__`, it's assigned directly (`PRICE_FEED = ...`), and later accessed directly (`PRICE_FEED`).

**Example 2: Refactoring `owner`**

The contract `owner` is set to the deployer's address (`msg.sender`) in the constructor. If the design intends for the owner to be fixed permanently, `immutable` is appropriate.

*   **Before (Storage Variable):**
    ```vyper
    owner: public(address)
    # ...

    @deploy
    def __init__(price_feed: address):
        # ...
        self.owner = msg.sender
        # ...

    # Accessed later as:
    # assert msg.sender == self.owner, "Not the contract owner!"
    # send(self.owner, self.balance)
    ```

*   **After (Immutable Variable):**
    ```vyper
    # Constants & Immutables
    # ...
    OWNER: public(immutable(address))
    # ...

    @deploy
    def __init__(price_feed_address: address):
        # ...
        OWNER = msg.sender # Set WITHOUT 'self.'
        # ...

    # Accessed later as:
    assert msg.sender == OWNER, "Not the contract owner!" # No 'self.'
    send(OWNER, self.balance) # No 'self.' for owner
    ```
The pattern is the same: declare with `immutable`, assign in `__init__` without `self.`, access later without `self.`.

### When to Stick with Storage Variables

Not all variables can be made `constant` or `immutable`. Variables whose values *must* change during the lifetime of the contract *after* deployment need to remain as standard storage variables.

In our example, `funders` (a dynamic array tracking who sent funds) and `funder_to_amount_funded` (a hash map tracking amounts) are modified each time someone sends coffee money and potentially when funds are withdrawn. They require mutability post-deployment.

*   **Storage Variables (Necessary):**
    ```vyper
    # Storage
    funders: public(DynArray[address, 1000])
    funder_to_amount_funded: public(HashMap[address, uint256])

    # Accessed using 'self.':
    # self.funders.append(msg.sender)
    # self.funder_to_amount_funded[msg.sender] += msg.value
    ```
These variables must remain as storage variables, declared without `constant` or `immutable`, and accessed using the `self.` prefix.

### Key Takeaways for Optimization

*   **Identify Fixed Values:** Analyze your contract variables. If a value is known at compile time and never changes, use `constant`.
*   **Identify Set-Once Values:** If a value is determined during deployment (in `__init__`) and never changes afterward, use `immutable`.
*   **Use Storage Sparingly:** Reserve standard storage variables for data that truly needs to be mutable after the contract is deployed.
*   **Follow Conventions:** Use `ALL_CAPS_WITH_UNDERSCORES` for `constant` and `immutable` variable names.
*   **Access Correctly:** Remember that `constant` and `immutable` variables are accessed directly by name, while storage variables and contract functions require the `self.` prefix.

By carefully choosing between `constant`, `immutable`, and standard storage variables, you can significantly reduce the gas costs associated with deploying and interacting with your Vyper smart contracts, making them more efficient and cost-effective for users.