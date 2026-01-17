## Optimizing Vyper Gas Costs: Constants and Immutables vs. Storage

Gas efficiency is paramount in smart contract development. Every operation on the blockchain consumes gas, which translates directly into transaction costs for users. Optimizing your contracts to use less gas makes them cheaper to deploy and interact with, providing a significant advantage. One fundamental optimization technique involves choosing the right way to store fixed values: using `constant` and `immutable` variables versus standard state (storage) variables.

This lesson explores the gas cost implications of these choices in Vyper by comparing two versions of a simple `buy_me_a_coffee` contract: one using a `constant` variable and another using a storage variable for the same value.

### Scenario 1: Gas Costs with Constants and Immutables

We begin with a Vyper contract (`buy_me_a_coffee.vy`) that utilizes both `constant` and `immutable` variables. Constants are values known at compile time and embedded directly into the contract's bytecode. Immutables are set once during deployment (in the `__init__` constructor) and then also become fixed parts of the contract code. Storage variables, in contrast, reside in the contract's storage slots on the blockchain.

Our focus will be on the `MINIMUM_USD` variable, initially declared as a `constant`.

**Initial Contract Snippet:**

```vyper
# Constants & Immutables
MINIMUM_USD: public(constant(uint256)) = as_wei_value(5, "ether") # Compile-time constant
PRICE_FEED: public(immutable(AggregatorV3Interface)) # Set in __init__
OWNER: public(immutable(address)) # Set in __init__
PRECISION: public(constant(uint256)) = 1 * (10 ** 18) # Compile-time constant

# Storage
funders: public(DynArray[address, 1000])
funder_to_amount_funded: public(HashMap[address, uint256])

@deploy
def __init__(price_feed: address):
    # Immutables are assigned here
    PRICE_FEED = AggregatorV3Interface(price_feed)
    OWNER = msg.sender
    # Note: MINIMUM_USD is NOT set here; it's a constant

@external
@payable
def fund():
    value: uint256 = msg.value
    # ... price conversion logic ...
    # Reading the constant value:
    assert usd_value_of_eth >= MINIMUM_USD, "You must spend more ETH!"
    # ... rest of fund logic ...
```

**Deployment and Interaction:**

1.  **Compile:** The contract is compiled using the Vyper compiler (e.g., within the Remix IDE).
2.  **Deploy:** The contract is deployed to a test network (like a local fork or Sepolia testnet) using a tool like Remix connected via MetaMask. During deployment, the address for the `price_feed` immutable variable is provided as an argument to the `__init__` function.
3.  **Deployment Gas:** Inspecting the deployment transaction reveals the gas cost.
    *   **Deployment Cost (Constants/Immutables): 262,853 gas**
4.  **Call `fund()`:** The `fund` function is called with a specific Ether value (e.g., 0.002 ETH, converted to Wei).
5.  **`fund()` Gas:** Inspecting the `fund` transaction reveals its gas cost.
    *   **`fund()` Call Cost (Constants/Immutables): 105,332 gas**

We record these gas costs for comparison.

### Scenario 2: Gas Costs with Storage Variables

Now, let's modify the contract to use a standard storage variable for the minimum donation amount instead of a `constant`.

**Code Modifications:**

1.  **Declaration:** Change `MINIMUM_USD` from a `constant` to a regular state variable, following Vyper's lowercase convention for storage variables.
2.  **Initialization:** Move the value assignment from the declaration line into the `__init__` function, using `self.` to indicate a storage variable write.
3.  **Reference Update:** Update the reference within the `fund` function's `assert` statement to use `self.minimum_usd`.

**Modified Contract Snippets:**

```vyper
# --- Variable Declaration (Changed) ---
minimum_usd: public(uint256) # Now a storage variable

# --- __init__ function (Added Initialization) ---
@deploy
def __init__(price_feed: address):
    # Assign value to storage variable during deployment
    self.minimum_usd = as_wei_value(5, "ether") # <<< Added line
    PRICE_FEED = AggregatorV3Interface(price_feed)
    OWNER = msg.sender

# --- fund function (Updated Reference) ---
@external
@payable
def fund():
    value: uint256 = msg.value
    # ... price conversion logic ...
    # Reading the storage variable:
    assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!" # <<< Updated reference
    # ... rest of fund logic ...
```

**Deployment and Interaction:**

1.  **Recompile:** The modified contract is compiled.
2.  **Deploy:** The new version is deployed using the exact same procedure and arguments as before.
3.  **Deployment Gas:** Inspecting the deployment transaction reveals the new gas cost.
    *   **Deployment Cost (Storage): 282,553 gas**
4.  **Call `fund()`:** The `fund` function is called again with the same Ether value (0.002 ETH).
5.  **`fund()` Gas:** Inspecting the `fund` transaction reveals its gas cost.
    *   **`fund()` Call Cost (Storage): 107,432 gas**

### Gas Cost Comparison and Analysis

Let's compare the results side-by-side:

| Operation          | Gas Cost (Constant/Immutable) | Gas Cost (Storage) | Saving with Constant |
| :----------------- | :---------------------------- | :----------------- | :------------------- |
| **Contract Deploy** | 262,853                       | 282,553            | **19,700 gas**       |
| **`fund()` Call**  | 105,332                       | 107,432            | **2,100 gas**        |

**Why the Difference?**

*   **Deployment Cost:**
    *   **Constants/Immutables:** The value of `MINIMUM_USD` (as a `constant`) is directly baked into the contract's bytecode during compilation. No storage write operation is needed during deployment for this value. Immutables are also efficiently stored as part of the deployed code.
    *   **Storage:** When `minimum_usd` is a storage variable, the line `self.minimum_usd = as_wei_value(5, "ether")` in the `__init__` function executes an `SSTORE` opcode during deployment. `SSTORE` (writing to storage) is one of the most expensive operations on the EVM. This storage write significantly increases the deployment gas cost.

*   **Runtime (`fund()` Call) Cost:**
    *   **Constants/Immutables:** Reading the value of `MINIMUM_USD` (as a `constant`) involves fetching the value directly from the contract's bytecode. This is a very cheap operation. Reading immutables is similarly efficient.
    *   **Storage:** Reading the value of `self.minimum_usd` (as a storage variable) requires an `SLOAD` opcode. `SLOAD` (reading from storage) is considerably more expensive than reading from code/memory, as it requires accessing the blockchain's state trie.

**Conclusion:**

Using `constant` variables for values known at compile time and `immutable` variables for values set only once at deployment provides substantial gas savings compared to using storage variables.

*   You save gas during **deployment** because you avoid expensive `SSTORE` operations for initializing these values.
*   You save gas during **runtime** every time the value is read, because accessing bytecode is cheaper than executing an `SLOAD` operation.

While the savings per transaction (around 2,100 gas in our `fund` example) might seem small, they accumulate significantly over the lifetime of a frequently used contract, directly benefiting users by reducing their transaction fees.

### Key Takeaways for Gas Optimization

*   **Use `constant`:** For any value that is fixed, known before compilation, and will never change (e.g., mathematical constants, version numbers, fixed configuration parameters like `PRECISION` or `MINIMUM_USD` in our initial example). Use `UPPER_CASE_WITH_UNDERSCORES` naming convention.
*   **Use `immutable`:** For any value that is set *only once* during contract deployment (in `__init__`) and will never change afterwards (e.g., owner address, addresses of other essential contracts like `PRICE_FEED`, deployment-time configuration). Use `UPPER_CASE_WITH_UNDERSCORES` naming convention.
*   **Use Storage:** Reserve storage variables (`lower_case_with_underscores`) for data that *needs* to change after the contract has been deployed (e.g., user balances, dynamic settings, lists of participants like `funders`).

By consciously choosing between constants, immutables, and storage based on whether and when a value needs to be set or changed, you can write significantly more gas-efficient Vyper smart contracts.