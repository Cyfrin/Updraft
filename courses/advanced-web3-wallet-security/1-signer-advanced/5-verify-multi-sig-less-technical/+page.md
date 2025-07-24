## How to Securely Verify Safe{Wallet} Transactions with UI Tools

When interacting with decentralized applications (dApps), the most critical security principle is to **never blindly trust the user interface (UI)**. A dApp's front-end can be compromised in a "what you see is *not* what you get" attack, showing you a safe transaction while asking you to sign a malicious one that could drain your funds. The true source of information is always your wallet's confirmation screen—be it MetaMask, Rabby, or a hardware wallet.

This lesson provides a practical, less technical guide on how to use UI-based tools to verify what you are signing before approving a transaction with your Safe{Wallet} (formerly Gnosis Safe). While command-line tools offer the lowest attack surface, the methods here are essential for anyone who needs to verify transactions without a local development environment.

### Signing vs. Executing: The Safe{Wallet} Two-Step Process

Understanding the Safe{Wallet} workflow is key to proper verification. Unlike a standard wallet transaction, a Safe{Wallet} action involves two distinct steps:

1.  **Signing:** When an owner approves a transaction, they are not sending it to the blockchain. Instead, they sign a structured off-chain message (an EIP-712 digest) that represents the transaction's details. This signature is stored by Safe until the required threshold of owners have signed.
2.  **Executing:** Once the minimum number of owners have signed, a final on-chain transaction is sent. This transaction calls the `execTransaction` function on the Safe contract, bundling the original transaction data with all the collected signatures to execute the action.

You must verify the data at both stages—when you sign and when you (or another owner) execute.

### Part 1: Verifying the Initial Signature Request

Let's walk through the process of verifying an `approve` transaction initiated from the Safe{Wallet} web app. In this example, we will approve a spender to use 10 WETH.

#### Step 1: Decode the Transaction Data

After creating the transaction in the Safe UI and clicking "Sign," your wallet will pop up with a "Signature request." This is your first and most important verification checkpoint. The structured data presented here is what you are actually being asked to approve.

First, focus on the `to` address and the `data` payload.

1.  **Verify the `to` Address:** This is the contract you are interacting with.
    *   Copy the `to` address from your wallet's signature request pop-up.
    *   Paste this address into a trusted block explorer (e.g., Etherscan, Sepolia Etherscan for testnets).
    *   Confirm that the address belongs to the correct contract you intend to interact with (e.g., the official WETH9 contract).

2.  **Decode the Calldata:** The `data` field contains the function call and its parameters in a hexadecimal format. You need a tool to decode this.
    *   Copy the long hexadecimal string from the `data` field in your wallet. For our `approve` example, it might look like this:
        ```
        0x095ea7b30000000000000000000000003da8ebe8d7bd3eea12425adff745847fab9662e600000000000000000000000000000000000000000000000000000000100000000
        ```
    *   Navigate to a trusted ABI decoder tool, such as those found on **tools.cyfrin.io** or **swiss-knife.xyz**.
    *   Paste the data into the decoder. The tool will parse it into a human-readable format.
        *   **Function:** `approve(address spender, uint256 amount)`
        *   **param0 (spender):** `0x3dA8EBe8d7bD3EEA12425adff745847FAB9662E6`
        *   **param1 (amount):** `10000000000`

    *   Now, verify that the decoded function, spender address, and amount are exactly what you expect. If anything is different from your intention, **reject the signature immediately.**

#### Step 2: Verifying Hashes on a Hardware Wallet

Hardware wallets add a crucial layer of security, but they often can't display fully decoded transaction data on their small screens. Instead, they show you a hash of the transaction data, which you must verify independently.

1.  **Use a Safe Hash Calculator:** Navigate to a tool like the **Safe Wallet Hash Calculator** on `tools.cyfrin.io` or the one on `safeutils.openzeppelin.com`.

2.  **Input All Transaction Parameters:** Carefully copy every parameter from your wallet's signature request pop-up and paste it into the calculator fields. This includes:
    *   Safe Address
    *   The correct Chain ID (e.g., 1 for Mainnet, 11155111 for Sepolia)
    *   Nonce (the Safe's nonce, not your EOA's)
    *   To Address (the target contract, e.g., WETH)
    *   Value (usually 0 for interactions like `approve`)
    *   Data (the long hexadecimal string you decoded earlier)
    *   Operation (`Call` or `0`)
    *   All gas-related parameters (`safeTxGas`, `baseGas`, `gasPrice`, `gasToken`, `refundReceiver`). For a simple signature request, these are typically `0` or a zero address. This "zero check" is an important sanity check.

3.  **Calculate and Compare Hashes:** The tool will generate a final **Safe Transaction Hash**. This is the exact hash that should be displayed on your hardware wallet's screen. Compare the hash on the tool's website with the hash on your physical device. If they match character for character, you can safely sign the transaction.

### Part 2: Verifying the Final Execution Transaction

After enough owners have signed, the transaction is ready to be executed on-chain. This is a separate on-chain transaction that also requires verification.

1.  **Initiate Execution:** In the Safe UI, click "Execute." Your wallet will now open with a standard transaction request (not a signature request).

2.  **Verify the `execTransaction` Call:** This transaction is being sent *to your Safe contract address*. The `data` payload for this call contains all the original transaction details (to, value, data, operation) plus the collected signatures.

3.  **Decode the Execution Calldata:**
    *   In your wallet's confirmation screen, go to the `data` or `hex` tab.
    *   Copy the new, even longer hexadecimal string.
    *   Paste this string into your ABI decoder tool.

The tool will decode the outer function call, which should be `execTransaction`. More importantly, it will show you all the nested parameters of this function. You can once again review the `to` address, `value`, and `data` of the original transaction being executed to ensure nothing has changed. If all the nested details match your original intent, it is safe to execute the transaction on-chain.