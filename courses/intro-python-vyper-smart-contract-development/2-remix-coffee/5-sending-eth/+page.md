## Sending and Receiving Ether in Vyper Smart Contracts

This lesson explores the fundamental mechanism for sending the native blockchain currency, like Ether (ETH) on Ethereum or its Layer 2 networks (zkSync, Optimism, Arbitrum, etc.), along with a function call to a Vyper smart contract. We'll cover how transactions inherently support value transfer and how contract functions must be explicitly designed to receive and manage these funds.

### The Transaction `value` Field

Every transaction executed on an EVM-compatible blockchain possesses an optional field known as `value`. This field isn't for sending arbitrary data; it specifically designates an amount of the chain's native currency (e.g., ETH) to be transferred from the sender's account to the recipient's account as part of that transaction.

Think of it like attaching cash to a letter. The letter contains instructions (the function call and its arguments, or simply a transfer instruction), and the `value` field represents the amount of cash attached. This happens *atomically* – either the entire transaction (instructions and value transfer) succeeds, or it fails and reverts.

When you interact with the blockchain:

*   **Using Development Environments (like Remix IDE):** In the interface for deploying contracts or calling functions (e.g., the "Deploy & Run Transactions" tab), you'll typically find a "VALUE" input field. Here, you can specify the amount of native currency (usually in units of Wei, the smallest denomination) to send with your transaction call. It often defaults to 0.
*   **Using Wallets (like Metamask):** When you initiate a simple "Send" operation to transfer ETH, the amount you enter populates the `value` field of the underlying transaction. Similarly, if you interact with a decentralized application (dApp) that requires you to send ETH along with a function call (e.g., minting an NFT for 0.1 ETH), your wallet prompts you for the ETH amount, which then goes into the transaction's `value` field.

### Enabling Ether Reception in Vyper: The `@payable` Decorator

While any transaction *can* technically carry a value, a smart contract function will not accept incoming native currency by default. Attempting to send ETH (by setting a non-zero `value` in the transaction) to a standard external function will cause the transaction to fail and revert.

To allow a function to receive ETH sent via the `value` field, you must explicitly mark it with the `@payable` decorator in your Vyper code. This decorator signals to the EVM that this specific function endpoint is designed to handle incoming funds.

```vyper
# Assume @external is also present or implied
@payable
@external
def fund():
    """
    This function can now receive ETH sent with the transaction call.
    """
    # Function logic goes here
    pass
```

Place the `@payable` decorator directly above the function definition, typically alongside the visibility decorator (`@external` or `@internal` if called internally via `self`). If a function lacks `@payable`, any attempt to send ETH to it results in transaction reversion.

### Accessing Sent Ether: `msg.value`

Inside a function marked `@payable`, Vyper provides a special built-in global variable to access the amount of ETH sent with the *specific call* currently being executed: `msg.value`.

*   **Type:** `msg.value` is a `uint256`.
*   **Unit:** Crucially, `msg.value` always holds the amount in **Wei**. Wei is the smallest unit of Ether: 1 ETH = 1,000,000,000,000,000,000 Wei (1 * 10^18). You must perform all comparisons and calculations using Wei.

You can use `msg.value` like any other `uint256` variable within your payable function, often to enforce conditions or track contributions.

### Enforcing Funding Requirements with `assert`

A common use case is requiring callers to send a specific or minimum amount of ETH. Vyper's built-in `assert` statement is ideal for this. `assert` checks if a condition is true; if not, it halts execution and reverts the entire transaction.

Here’s how you might require exactly 1 ETH to be sent to the `fund` function:

```vyper
# Define the required amount in Wei (1 ETH)
REQUIRED_AMOUNT: constant(uint256) = 1_000_000_000_000_000_000  # 1 followed by 18 zeros

@payable
@external
def fund():
    """
    Accepts funds, but requires exactly 1 ETH to be sent.
    """
    # Check if the received value matches the required amount
    assert msg.value == REQUIRED_AMOUNT, "Incorrect ETH amount sent; requires exactly 1 ETH"

    # If assert passes, proceed with function logic...
    # For example, log the funding event or update balances
    pass
```

In this example:
1.  We define `REQUIRED_AMOUNT` as a constant for clarity and ease of modification.
2.  Inside `fund`, `assert msg.value == REQUIRED_AMOUNT` checks if the Ether sent (`msg.value` in Wei) equals exactly 1 ETH (in Wei).
3.  If the condition is false (the wrong amount was sent), the transaction reverts with the optional error message provided. The sent ETH (minus gas fees) is returned to the sender.
4.  If the condition is true, execution continues past the `assert` statement.

To require *at least* a certain amount, you would use the greater-than-or-equal-to operator: `assert msg.value >= MINIMUM_AMOUNT`.

### Contracts Hold Balances

Just like your personal wallet (an Externally Owned Account or EOA), smart contract addresses can hold a balance of the native currency (ETH). When ETH is successfully sent to a `@payable` function (and not subsequently transferred out by the contract's logic), the contract's own ETH balance increases by `msg.value`.

### Vyper's Global Variables

`msg.value` is one of several helpful global variables Vyper provides, offering context about the current transaction or blockchain state. Another essential one frequently used alongside `msg.value` is `msg.sender`, which provides the address (`address` type) that initiated the *current specific call* to the contract function.

For a comprehensive list and description of these built-in variables (like `block.timestamp`, `chain.id`, etc.), consult the official Vyper documentation:

*   **Vyper Docs - Environment Variables:** `https://docs.vyperlang.org/en/stable/constants-and-vars.html`

Understanding these variables is crucial for writing secure and functional smart contracts that interact with the blockchain environment and user inputs effectively.

In summary, sending ETH with function calls is enabled by the transaction `value` field. Receiving and accessing this ETH within a Vyper contract requires marking the function `@payable` and using the `msg.value` global variable (always in Wei) to read the amount sent in the current call. Use `assert` to enforce funding requirements and remember that contracts themselves maintain an ETH balance.