## Secure Your Assets: Mastering Safe Multisig Transaction Verification

Welcome to this essential guide on verifying Safe (formerly Gnosis Safe) multisig transactions. In the world of Web3, where significant assets are managed by DAOs, treasuries, and security-conscious individuals using multisig wallets, the integrity of every signature is paramount. This lesson will equip you with the knowledge and tools to meticulously verify what you are signing and executing, primarily using your hardware wallet as the ultimate source of truth. Failing to do so can have catastrophic consequences, as demonstrated by incidents like the Radiant Capital hack, where an estimated $50 million was lost due to signing a Safe multisig transaction without proper hardware wallet verification.

This lesson is critical for anyone involved in signing multisig transactions, especially those in technical roles, on security councils, DAO delegates, DevOps, or incident response teams. At least one person on any team signing multisig transactions should have a deep understanding of these procedures. We highly recommend practicing these verification steps, ideally with a hardware wallet. If you don't currently use a hardware wallet, this information will still be invaluable for understanding the security landscape and preparing for best practices.

## The Lurking Threat: Why Blindly Signing Safe Transactions is Dangerous

Safe multisigs offer enhanced security by requiring M-of-N signatures, distributing trust and control. However, this security model is fundamentally undermined if signers approve transactions without truly understanding or independently verifying what they are authorizing. The core problem we address is the risk of signing malicious transactions presented by a compromised user interface (UI) or Application Programming Interface (API).

If the Safe web application (`app.safe.global`) or even an intermediary wallet like Metamask is compromised, it could display legitimate-looking transaction details while tricking your wallet into signing a malicious payload. This could lead to a complete drain of your multisig's funds. The hardware wallet, with its isolated environment and trusted display, becomes your last line of defense against such attacks.

## Your Hardware Wallet: The Unshakeable Foundation of Multisig Security

Throughout this lesson, we operate under a critical trust assumption: **your hardware wallet is your ultimate source of truth.** What is displayed on its screen – be it a transaction hash or decoded transaction data – is what you must diligently verify. Any discrepancy between what the Safe UI shows and what your hardware wallet presents is a major red flag. We aim to minimize dependencies; relying solely on the hardware wallet's display, cross-referenced with independently generated data, is key.

## Introducing `safe-tx-hashes`: Your Independent Verification Co-Pilot

To aid in this verification process, we will primarily use `safe-tx-hashes`, a command-line tool. This script, available as a fork maintained by Cyfrin (`https://github.com/Cyfrin/safe-tx-hashes`), allows you to independently compute the expected transaction hashes and call data that *should* be displayed on your hardware wallet. The Cyfrin version is an enhancement of the original `safe-tx-hashes-util` created by Pascal (pcaversaccio) (`https://github.com/pcaversaccio/safe-tx-hashes-util`).

This tool helps you confirm that the transaction details you intend to sign match what your hardware wallet is being asked to authorize, bypassing potentially compromised UIs.

## Getting Started: Installing and Verifying `safe-tx-hashes`

You can install the `safe-tx-hashes` tool using the following command:

```bash
curl -L https://raw.githubusercontent.com/Cyfrin/safe-tx-hashes/main/install.sh | bash
```

**A note on security:** Piping `curl` directly to `bash` executes remote code on your system. While convenient, this carries inherent risks. For maximum security, you should review the `install.sh` script's contents before execution or consider building the tool from its source code if you have security concerns.

Once installed, verify the installation and explore its options:

```bash
safe_hashes -v       # Displays the installed version
safe_hashes --help   # Shows the help menu with available commands and flags
```

## Decoding the Process: Key Concepts in Safe Transaction Verification

Before diving into the practical steps, let's clarify some key concepts:

1.  **Signature Verification (EIP-712) vs. Transaction Execution Verification:**
    *   **Signature Verification (EIP-712):** When you sign a Safe multisig transaction *before* it has enough signatures to be executed on-chain, you are signing a structured message compliant with the EIP-712 standard. Your hardware wallet should display a hash of this EIP-712 message. This is the first hash you need to verify.
    *   **Transaction Execution Verification:** Once a multisig transaction has accumulated the required number of signatures (M-of-N) and is ready to be executed, the final step is to submit an actual Ethereum transaction. This transaction calls the `execTransaction` function on the Safe contract. At this stage, your hardware wallet will display the call data for this `execTransaction` call. This data also requires careful verification.

2.  **Trust Assumptions Revisited:**
    *   **Hardware Wallet:** Your ultimate source of truth.
    *   **`safe-tx-hashes` tool:** Your independent verifier. It computes what *should* be on your hardware wallet.
    *   **Safe UI/API (`app.safe.global`):** A convenient interface but considered potentially compromisable. Data presented here *must* be cross-verified.
    *   **Metamask (if used with a hardware wallet):** If your hardware wallet connects to Safe via Metamask (e.g., some Ledger setups), Metamask becomes an additional trusted layer. Direct hardware wallet integration with Safe (like with Keystone) is preferable, but if using Metamask, be extra vigilant and rely on the hardware wallet's clear signing capabilities.

3.  **Initialized vs. Uninitialized Transactions:**
    *   **Uninitialized Transaction:** A transaction proposal created in the Safe UI that has not yet received any signatures, or not enough to meet the threshold. It primarily exists within the Safe backend/API. Its integrity isn't guaranteed until verified by a signer.
    *   **Initialized Transaction:** A transaction that has received at least one valid signature and is stored by the Safe API. This makes it easier for subsequent signers to retrieve its details.

4.  **Clear Signing:**
    This refers to a hardware wallet's ability to decode and clearly display the human-readable details of a transaction (e.g., function name, parameters like recipient addresses and amounts) rather than just showing a raw hexadecimal data blob or a cryptographic hash. Wallets like Keystone are praised for their robust clear signing capabilities, significantly enhancing security by making it easier to spot malicious parameters.

## Step-by-Step: Verifying Signatures for Uninitialized Safe Transactions

An "uninitialized" transaction is one that hasn't been signed by anyone yet, or exists only in your local Safe UI proposal. The Safe API might not be aware of it, or if it is, its details could potentially be manipulated if the API or UI is compromised.

**Method 1: Using the Safe API (with the `--untrusted` flag)**

If you've created a transaction in the Safe UI (`app.safe.global`) and it's the first signature, you can use `safe_hashes` to fetch its details from the Safe API. The `--untrusted` flag signifies that while we're fetching data from the API, we don't fully trust it and will rely on our hardware wallet for the final say.

The command structure is:

```bash
safe_hashes --address <YOUR_SAFE_ADDRESS> --network <NETWORK_NAME> --nonce <NONCE_FROM_SAFE_UI> --untrusted
```

*   `<YOUR_SAFE_ADDRESS>`: The address of your Safe multisig wallet.
*   `<NETWORK_NAME>`: The network (e.g., `ethereum`, `polygon`, `arbitrum`).
*   `<NONCE_FROM_SAFE_UI>`: The nonce for this specific transaction, visible in the Safe UI.

**Example:** Let's say you're approving USDC for the Uniswap V2 Router. You'd find the nonce in the Safe UI.
1.  Identify the target contract (e.g., USDC token contract: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` on Ethereum).
2.  Identify the spender (e.g., Uniswap V2 Router: `0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D` on Ethereum).
3.  Create the transaction in the Safe UI. Note the nonce.
4.  Run `safe_hashes` with `--untrusted`.

The tool will output several pieces of information, most importantly the `Safe transaction hash (EIP-712)`. **This is the hash you must compare with the hash displayed on your hardware wallet when you initiate the signing process.** If they match, you can be confident you're signing the intended EIP-712 message.

**Method 2: Manual/Offline Verification (Maximum Security)**

For ultimate security, especially with uninitialized transactions or if you suspect the Safe API might be compromised, you can provide all transaction details manually to `safe_hashes` without it needing to contact any external API.

To do this, you first need the raw call data for the transaction your Safe will execute. For an ERC20 approve, you can generate this using a tool like Foundry's `cast`:

```bash
cast calldata "approve(address,uint256)" <SPENDER_ADDRESS> <VALUE_IN_WEI>
```
For example:
```bash
cast calldata "approve(address,uint256)" 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D 1000000000000000000
```
This will output a hex string (e.g., `0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d0000000000000000000000000000000000000000000000000de0b6b3a7640000`).

Then, use `safe_hashes` with the `--offline` flag:

```bash
safe_hashes --address <YOUR_SAFE_ADDRESS> --network <NETWORK_NAME> --nonce <NONCE_FROM_SAFE_UI> --data <RAW_CALL_DATA_FROM_CAST> --offline --to <TARGET_CONTRACT_ADDRESS> --value <ETH_VALUE_IF_ANY_USUALLY_0>
```

*   `--data`: The raw call data generated by `cast` (or similar tool).
*   `--offline`: Instructs the script not to make any external API calls.
*   `--to`: The address of the contract the Safe will interact with (e.g., the USDC token contract address for an `approve` call).
*   `--value`: The amount of native currency (e.g., ETH) being sent with the transaction. For token approvals or most contract interactions, this is typically `0`.

Again, compare the output `Safe transaction hash (EIP-712)` with what your hardware wallet displays. This method minimizes trust assumptions to just your hardware wallet and the locally run `safe_hashes` script.

## Verifying Signatures for Initialized Safe Transactions

If a transaction has already been proposed and signed by at least one other party, it's considered "initialized" and its details are stored by the Safe API. In this scenario, you typically don't need the `--untrusted` flag because the API is expected to serve the correct, already partially signed transaction data.

The command is simpler:

```bash
safe_hashes --address <YOUR_SAFE_ADDRESS> --network <NETWORK_NAME> --nonce <NONCE_FROM_SAFE_UI>
```

The script will fetch the transaction details from the Safe API based on the address and nonce. As always, compare the `Safe transaction hash (EIP-712)` from the tool's output with the hash shown on your hardware wallet screen before signing.

**Hardware Wallet Display Nuances:**
Be aware that different hardware wallets might display EIP-712 hashes differently. For instance:
*   **Trezor:** Typically shows the hexadecimal representation of the hash.
*   **Ledger Nano X/S:** May show a "binary string literal" representation.
The `safe_hashes` tool conveniently outputs the hash in multiple formats (including `Transaction hash (HexEncoded)` and `Transaction hash (binary string literal)`) to facilitate comparison with various hardware wallets.

## The Final Checkpoint: Verifying Safe Transaction Execution Data

Once a Safe transaction has received the required M-of-N signatures, it's ready for execution on the blockchain. This involves one of the signers (or a third party) submitting an Ethereum transaction that calls the `execTransaction` function on the Safe contract itself.

It's crucial to verify the call data of this `execTransaction` call on your hardware wallet. This call data encapsulates all the details of the multisig transaction being executed (the `to` address, `value`, `data`, `operation`, etc.).

To generate the expected `execTransaction` call data using `safe_hashes`, use the `--print-mst-calldata` (print multisig transaction call data) flag:

```bash
safe_hashes --address <YOUR_SAFE_ADDRESS> --network <NETWORK_NAME> --nonce <NONCE_FROM_SAFE_UI> --print-mst-calldata
```
This command will fetch (or reconstruct, if using offline parameters) the transaction details and then compute the full call data for the `execTransaction` call that your wallet will sign and send to the Safe contract.

When you click "Execute" in the Safe UI (or your chosen interface) and your hardware wallet prompts for confirmation, it should display this call data.
*   **For wallets with clear signing (e.g., Keystone):** You should see decoded parameters like the target contract (`to`), the function selector of the internal call, and any amounts or addresses involved.
*   **For wallets without robust clear signing:** You might see a long hexadecimal string representing the raw call data.

**Compare this displayed data (whether decoded or raw) meticulously with the output from `safe_hashes --print-mst-calldata`.** At a minimum, verify:
1.  The **`to` address** (should be your Safe contract address).
2.  The **function selector** (should be for `execTransaction`).
3.  The **parameters within the call data**, especially the *internal* `to` address (the contract the Safe is interacting with, e.g., USDC), the *internal* `value` (amount of tokens), and the *internal* `data` (the call to `approve`, `transfer`, etc.).

## Essential Security Hygiene for Safe Multisig Users

*   **Practice Makes Perfect:** Regularly practice these verification steps in a test environment before handling significant assets.
*   **Separate Signing and Execution:** A crucial security tip is to **never sign and execute a multisig transaction in a single step if your wallet interface offers this.** Always sign first, allowing for EIP-712 hash verification. Then, separately, initiate the execution step, allowing for `execTransaction` call data verification. Combining these steps can sometimes lead to wallets skipping the display of the EIP-712 hash.
*   **Team Knowledge:** Ensure that multiple members of your team understand this verification process deeply. Don't rely on a single individual.
*   **Hardware Wallet is Key:** Reiterate that the hardware wallet's display is your ground truth. If using Metamask as an intermediary for your hardware wallet, remember it adds another layer of trust. However, good hardware wallets with clear signing capabilities will still display the full transaction details on the device itself, mitigating much of this added risk.
*   **Vigilance with Uninitialized Transactions:** Be extra cautious with uninitialized transactions. The `--offline` method for `safe_hashes` offers the highest level of assurance for verifying the EIP-712 hash as it doesn't rely on any external API for the transaction data.
*   **Stay Updated:** Keep your hardware wallet firmware, wallet software (like Metamask), and the `safe_hashes` tool updated to benefit from the latest security patches and features.

## A Message to Hardware Wallet Innovators: Enhancing User Security

To hardware wallet manufacturers, we propose the following enhancements to further empower users:

1.  **Universal Clear Signing:** Strive to implement comprehensive clear signing for all common transaction types, especially for complex contract interactions like Safe's `execTransaction`. Displaying decoded function names, parameters, addresses, and amounts in a human-readable format, as seen in wallets like Keystone, is invaluable.
2.  **Easy Data Export for Verification:** Provide a simple mechanism for users to export the raw call data or EIP-712 message data being displayed on the hardware wallet screen (e.g., via QR code, NFC, or a copyable base64 string). This would allow users to easily paste it into their computer for comparison with tools like `safe_hashes` without manual transcription, which is error-prone.
3.  **Display Hash of Call Data:** In addition to displaying the raw call data (or its decoded version), also display its Keccak256 hash. This would allow for a much quicker spot-check against the hash computed by tools like `safe_hashes`, as comparing full data blobs can be cumbersome.

## Conclusion: Vigilance is Key to Multisig Security

Verifying Safe multisig transactions is not merely a technical exercise; it's a fundamental security practice. By understanding the difference between signing EIP-712 messages and executing `execTransaction` calls, leveraging tools like `safe-tx-hashes`, and always treating your hardware wallet as the ultimate source of truth, you can significantly mitigate the risk of falling victim to sophisticated phishing attacks or UI/API compromises. The security of your or your organization's assets depends on this diligence. Stay vigilant, practice these methods, and prioritize security in every transaction.