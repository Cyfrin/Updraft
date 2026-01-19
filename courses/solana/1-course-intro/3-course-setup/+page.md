# Course Setup: Configuring Your Solana Development Environment

Before diving into smart contract development, it is critical to establish a robust development environment. This lesson covers the installation of essential tools, the configuration of the Solana CLI, wallet management, and the workflow for running a local blockchain validator.

## Prerequisites and Tool Installation

To build on Solana, you need three core components installed on your machine: **Rust**, the **Solana CLI**, and the **Anchor CLI**.

For the most up-to-date installation instructions for your specific operating system (macOS, Linux, or Windows), please refer to the official [Solana Installation Documentation](https://solana.com/docs/intro/installation).

### Recommended Software Versions
To ensure your environment matches the course material and to avoid compatibility issues, we recommend targeting the following versions:

*   **Rust:** `1.87.0`
*   **Solana CLI:** `3.0.10` or `3.0.13`
*   **Anchor CLI:** `0.31.1`
    *   *Note:* You may encounter minor version discrepancies in tutorials (e.g., `0.29.0`), but this course is optimized for `0.31.1`.

### Verifying Installations
Once installed, open your terminal and run the following commands to verify successful installation and check your versions:

```bash
rustc --version       # Verifies Rust
solana --version      # Verifies Solana CLI
anchor --version      # Verifies Anchor CLI
```

## Configuring the Solana CLI

The Solana CLI acts as the control center for your development environment. It determines which network cluster you interact with—whether you are deploying to the public test network or working locally.

To view your current configuration settings, including the RPC URL, WebSocket URL, and the file path to your keypair, run:

```bash
solana config get
```

### Setting the Cluster Target
You must explicitly tell the CLI where to send your transactions.

1.  **Localhost:** Use this for rapid local development and testing.
2.  **Devnet:** Use this to deploy your applications to the public test network.

Use the following commands to switch between environments:

```bash
# Switch to Localhost (for local testing)
solana config set --url localhost
# Short flag version:
solana config set -ul

# Switch to Devnet (for public testing)
solana config set --url devnet
# Short flag version:
solana config set -ud
```

## Setting Up Your File-System Wallet

To sign transactions and pay for deployment fees (gas), you need a Solana wallet. The CLI manages "file-system wallets," which store your private key in a JSON file on your computer.

### Generating a New Wallet
To create a new default wallet, run:

```bash
solana-keygen new
```

*   *Note:* If you already have a wallet at the default path (`~/.config/solana/id.json`), the CLI will return an error to prevent you from accidentally overwriting your keys. You must move the old wallet or use a force flag if you intend to overwrite it.

### Checking Wallet Details
Once your keypair is generated, you can view your public address and check your SOL balance:

```bash
# View your public key (Wallet Address)
solana address

# Check current SOL balance
solana balance
```

## Acquiring Testnet SOL via Airdrop

Unlike Ethereum development, where you typically visit a third-party faucet website, Solana allows you to request test tokens directly via the CLI. You need these tokens to pay for transaction fees on Devnet.

### The Airdrop Workflow
1.  **Ensure you are on Devnet:**
    ```bash
    solana config set -ud
    ```
2.  **Request the Airdrop:**
    ```bash
    # Request 2 SOL
    solana airdrop 2
    ```

**Troubleshooting:** If you receive a "Rate Limit" error, it means the network is currently handling high traffic. Wait a few moments and try the command again until it succeeds.

## Running a Local Solana Validator

For the majority of your development cycle, specifically when running tests or deployment scripts locally, you should use the **Test Validator**. This spins up a high-performance simulation of the Solana blockchain directly on your machine.

### How to Start the Validator
1.  **Set config to Localhost:**
    ```bash
    solana config set -ul
    ```
2.  **Start the process:**
    ```bash
    solana-test-validator
    ```

### Important Workflow Tip
When you run `solana-test-validator`, the process will take over your current terminal window. **Do not close this window.** As long as that window is open, your local blockchain is alive. To run further commands (like deploying code), you must open a **new** terminal tab or window.

## Understanding the Course Directory Structure

The course repository is structured to support both **Native Rust** development and **Anchor Framework** development. All exercises are located within the `apps` folder.

Here is the hierarchy you will navigate:

```text
repo/
└── apps/
    ├── [app_name]/         # e.g., 'hello'
    │   ├── anchor/         # Exercises using the Anchor Framework
    │   │   ├── exercise/   # <--- WRITE YOUR CODE HERE
    │   │   ├── solution/   # Reference code (if you get stuck)
    │   │   └── README.md   # Specific instructions for this module
    │   │
    │   └── native/         # Exercises using Native Rust
    │       ├── exercise/   # <--- WRITE YOUR CODE HERE
    │       ├── solution/   # Reference code
    │       └── README.md   # Specific instructions for this module
```

### Key Takeaways
*   **Choose Your Path:** Navigate to either the `native` or `anchor` folder depending on the specific lesson.
*   **Workspace:** Always write your code inside the `exercise` directory.
*   **References:** Use the `solution` folder only if you need to compare your work against the correct implementation.
*   **Instructions:** Always read the `README.md` file located inside the specific app folder for step-by-step guidance on that exercise.