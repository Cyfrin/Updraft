## Understanding zkSync Type 113 Transactions and Native Account Abstraction

Have you ever interacted with an application like Remix IDE on zkSync, simply signed a message, and then observed a transaction appearing in the console seemingly initiated *by* Remix itself? If you noticed this transaction marked with `"type": 113`, you might wonder how this occurred without you explicitly sending a transaction via your wallet in the traditional sense. This lesson unravels the mechanism behind these Type 113 transactions, introducing the powerful concept of native Account Abstraction on zkSync.

The core observation in the Remix console is the transaction detail:

```json
"type": 113,
```

This specific type signifies a transaction format unique to zkSync Era, differing from standard Ethereum transaction types like Legacy (Type 0) or EIP-1559 (Type 2). The key to understanding Type 113 lies in **Account Abstraction (AA)**.

### What is Account Abstraction?

Traditionally on Ethereum, accounts fall into two categories:

1.  **Externally Owned Accounts (EOAs):** These are controlled by private keys (like the accounts you manage in MetaMask). Only EOAs can initiate transactions and pay for gas directly.
2.  **Smart Contract Accounts:** These are pieces of code deployed to the blockchain. They contain logic but cannot initiate transactions independently; they can only react to transactions sent *to* them.

Account Abstraction aims to bridge this gap, enabling **smart contracts to act as user accounts**. It allows accounts defined by code logic, rather than just private keys, to initiate transactions and possess more sophisticated features.

### zkSync's Native Account Abstraction

A crucial distinction is that **zkSync Era implements Account Abstraction *natively***. This isn't an add-on layer; it's fundamental to how the zkSync protocol operates.

The most significant implication of native AA is that **on zkSync Era, *all* accounts are smart contract accounts**. When you use a standard Ethereum address (like one from your MetaMask) on zkSync, it functions under the hood as a smart contract account.

These zkSync smart contract accounts possess enhanced capabilities compared to traditional EOAs:

*   They can **initiate transactions**.
*   They can contain **custom logic** for transaction validation, authorization rules, recovery mechanisms, and more.

### Connecting Native AA to the Remix Scenario (Type 113)

Now, let's connect this back to the transaction observed in Remix:

1.  **Your Account is a Smart Contract:** Because you're interacting with zkSync, your standard Ethereum address *is* treated as a smart contract account by the network, thanks to native AA.
2.  **Signing an EIP-712 Message:** When prompted by Remix, you didn't sign a raw transaction. Instead, you signed a structured message following the **EIP-712 standard**. This standard provides a user-friendly way to sign data, making it clear *what* action or data you are authorizing. In this context, the signed EIP-712 message represented your intent and authorization for the underlying transaction.
3.  **Smart Contract Validation Logic:** The smart contract account corresponding to your address on zkSync possesses built-in logic (inherent due to native AA) capable of verifying EIP-712 signatures.
4.  **Type 113 Transaction Execution:** Remix (or the infrastructure interacting with it) took the details of the intended action (e.g., calling a contract function) and bundled it together with your EIP-712 signature into a `Type 113` transaction. This transaction was then submitted to the zkSync network.
5.  **Verification and Execution:** When the zkSync network processed the Type 113 transaction, it triggered the logic within *your* smart contract account. This logic verified the embedded EIP-712 signature. Upon successful verification, your account authorized the execution of the transaction's payload (the intended action).

This entire process **abstracts** the need for you to manually handle the low-level transaction signing associated with EOAs. You simply sign a clear message (EIP-712), and the native Account Abstraction mechanism, utilising the Type 113 transaction format, handles the validation and execution via your smart contract account's inherent capabilities.

### Benefits of Account Abstraction

This native AA approach unlocks numerous benefits and potential customizations for user accounts on zkSync, including:

*   **Flexible Signature Schemes:** Accounts aren't restricted to the ECDSA signatures used by EOAs.
*   **Native Multi-sig:** Easily implement setups requiring multiple signatures for transactions.
*   **Spending Controls:** Define custom rules like daily limits or recipient whitelists directly in the account logic.
*   **Gas Fee Flexibility:** Enable "paymasters" – third parties who can sponsor gas fees for users.
*   **Enhanced Security & Recovery:** Implement social recovery or other mechanisms beyond simple seed phrases.

In summary, Type 113 transactions are a specific feature of zkSync enabled by its native Account Abstraction. This system treats every address as a smart contract account, allowing users to authorize transactions by signing user-friendly EIP-712 messages. The network then uses the Type 113 format to package this signature and the intended action, leveraging the account's own logic to validate and execute the transaction, simplifying the user experience and enabling powerful account features.

*(Note: The intricacies of Account Abstraction are vast. This lesson provides an introduction specifically related to the Type 113 transaction observed; further details on AA will likely be explored elsewhere.)*