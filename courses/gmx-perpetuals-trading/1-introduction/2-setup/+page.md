## Getting Started with the GMX v2 DeFi Course Environment

Welcome to the GMX v2 DeFi course! This lesson guides you through setting up your development environment and understanding the structure of the course materials provided in the `cyfrin/defi-gmx-v2` GitHub repository. Proper setup is crucial for compiling code, running tests, and effectively completing the exercises.

Your first step is to clone the main course repository:

```bash
git clone <repository_url_for_cyfrin/defi-gmx-v2>
```

To gain a deeper understanding of the underlying GMX v2 contracts you'll be interacting with, it's highly recommended to also clone the official GMX repositories. Links to these can be found in the main course repository's `README.md`.

```bash
git clone <url_for_gmx-synthetics>
git clone <url_for_gmx-contracts>
```

## Setting Up and Using Foundry

This course utilizes Foundry, a powerful toolkit for Ethereum application development, to compile Solidity code and run tests for the exercises.

**Foundry Installation:**
Detailed instructions for installing Foundry can be found by following the `Foundry setup` link within the main repository's `README.md`. Ensure you have Foundry installed before proceeding.

**Environment Configuration:**
Foundry requires specific environment variables to function correctly, particularly for interacting with a forked blockchain state.

1.  Navigate into the `foundry/` directory within your cloned `cyfrin/defi-gmx-v2` repository.
2.  Copy the sample environment file to create your local configuration:
    ```bash
    cp .env.sample .env
    ```
3.  Open the newly created `.env` file and fill in the necessary variables. A crucial variable is `FORK_URL`, which should contain the RPC endpoint URL for the network you'll be forking (e.g., Arbitrum). This URL is used to fetch live blockchain data.

**Building Code:**
You'll need to compile both the exercise starter code and, occasionally, the solution code.

*   **Build Exercises:** To compile the base exercise files located in `foundry/src/exercises/`:
    ```bash
    forge build
    ```
*   **Build Solutions:** The solution code might have slightly different configurations or paths. To compile the solutions located in `foundry/src/solutions/`, use the `FOUNDRY_PROFILE` environment variable:
    ```bash
    FOUNDRY_PROFILE=solution forge build
    ```

**Running Tests:**
Foundry's testing capabilities allow you to verify your exercise implementations.

*   **Default Testing:** Running `forge test` typically forks the blockchain from the *latest* block. While accurate, this can be slow as it requires fetching fresh state data every time.
*   **Optimized Testing (Using a Specific Block Number):** For significantly faster test runs after the initial execution, fork from a specific, cached block number.
    1.  **Get Current Block Number:** Use `cast` (part of Foundry) and your `FORK_URL` to find the latest block number:
        ```bash
        cast block-number --rpc-url $FORK_URL
        ```
    2.  **Store Block Number:** Take the number returned by the command and set it as an environment variable. You can export it in your current shell session or add it to your `.env` file for persistence:
        ```bash
        # Example (replace 12345678 with the actual block number)
        export FORK_BLOCK_NUM=12345678
        # Or add this line to your .env file:
        # FORK_BLOCK_NUM=12345678
        ```
    3.  **Run Tests Against Specific Block:** Use the `--fork-block-number` flag along with your stored block number when running tests. This allows Foundry to reuse the cached state from that block.
        *   **Test an Exercise:** The `--match-path` argument specifies which test file to run. This path will vary depending on the exercise.
            ```bash
            # Example for MarketSwap.test.sol
            forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/MarketSwap.test.sol
            ```
        *   **Test a Solution:** Remember to prefix the command with the `FOUNDRY_PROFILE` variable:
            ```bash
            # Example, replace <path_to_solution_test_file>
            FOUNDRY_PROFILE=solution forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path <path_to_solution_test_file>
            ```
*   **Finding Test Commands:** Each exercise's Markdown instruction file (located in `foundry/exercises/`) usually provides the exact `forge test` command needed, including the correct `--match-path`. Copy and paste this command after implementing your solution.

## Understanding the Repository Structure

Navigating the course repository effectively is key to finding the materials you need.

*   **`foundry/`:** This is the core directory for all development work.
    *   **`foundry/src/`:** Contains the Solidity smart contracts.
        *   **`foundry/src/exercises/`:** Holds the *starter* code files for each exercise (e.g., `GlvLiquidity.sol`). These files typically contain function signatures and comments (`// Task X`) guiding you through the implementation.
        *   **`foundry/src/solutions/`:** Contains the complete *solution* code for each exercise. Refer to these if you get stuck or want to compare your approach.
    *   **`foundry/test/`:** Contains the Foundry test files (`*.t.sol`) used to verify your exercise implementations and the solutions.
    *   **`foundry/exercises/`:** Contains Markdown (`.md`) instruction files for each exercise (e.g., `glv_liquidity.md`). These files provide background information, task descriptions, and the specific `forge test` command to run.
    *   **`.env.sample`:** A template file showing the required environment variables.
    *   **`.env`:** Your personal environment configuration file (created by copying `.env.sample`). Keep your RPC URLs and other sensitive information here; this file is ignored by Git.
*   **`notes/`:** This directory contains supplementary course notes, including explanatory Markdown files and diagrams (`.png`, `.excalidraw`) referenced in lectures.
*   **`README.md`:** The main entry point for the repository. It includes an overview, links to setup guides (like Foundry), important example GMX v2 transaction links, links to the course notes and discussion forum, and links to the external GMX contract repositories.

## Your Workflow for Completing Exercises

Follow these steps to tackle each exercise in the course:

1.  **Read Instructions:** Navigate to the `foundry/exercises/` directory and open the Markdown (`.md`) file corresponding to the current exercise (e.g., `glv_liquidity.md`). Read the explanation and task requirements carefully.
2.  **Open Starter Code:** Open the corresponding Solidity starter file from the `foundry/src/exercises/` directory (e.g., `GlvLiquidity.sol`).
3.  **Implement Code:** Write your Solidity code within the starter file, filling in the function bodies according to the tasks outlined in the comments and the Markdown instructions.
4.  **Test Code:** Locate the specific `forge test` command provided at the bottom of the exercise's Markdown instruction file. Copy this command and run it in your terminal (ensure you are inside the `foundry/` directory). Make sure your `FORK_URL` and `FORK_BLOCK_NUM` environment variables are set for optimized testing.
5.  **Debug and Iterate:** If the tests fail, review your code and the test output to identify errors. Debug your implementation. If you're stuck, you can consult the corresponding solution file in `foundry/src/solutions/` for guidance. Repeat steps 3-5 until all tests pass.

## Debugging and Analyzing GMX v2 Transactions

Completing the exercises often requires understanding how real users interact with the GMX v2 protocol on-chain. Analyzing actual transactions is invaluable for figuring out the correct function calls, parameters, and interaction patterns.

**Essential Tools:**
*   **Block Explorer (Arbiscan):** Used to view transaction details on the Arbitrum network.
*   **Transaction Debugger (Tenderly):** A powerful tool (`tenderly.co`) for dissecting transaction execution step-by-step.

**Debugging Workflow:**
1.  **Find Example Transactions:** The main `README.md` file contains a `transactions` link. This leads to a curated list of example GMX v2 transactions (e.g., market swaps, deposits) hosted on Arbiscan.
2.  **Navigate to Arbiscan:** Click on one of the example transaction links.
3.  **Copy Transaction Hash:** On the Arbiscan page for the transaction, copy the unique Transaction Hash.
4.  **Use Tenderly:** Go to `tenderly.co` and paste the copied transaction hash into the search bar.
5.  **Analyze Trace:** Tenderly will simulate the transaction and display a detailed execution trace. Examine the sequence of internal function calls, the contracts involved (e.g., Router, DataStore, EventManager), and the data passed between them.
6.  **Use the Debugger:** Click the "Debug Transaction" button in Tenderly. This interactive debugger allows you to step through the execution of the transaction's underlying Solidity code. You can inspect the state variables of contracts at each step and see the exact `calldata` (input parameters) passed to each function.

By analyzing real GMX v2 transactions with Tenderly, you can determine the precise inputs and logic needed to successfully interact with the GMX contracts within the course exercises.

## Accessing Course Notes and Asking Questions

Beyond the core exercises, additional resources are available to support your learning.

*   **Course Notes:** All supplementary materials, including detailed explanations and diagrams discussed in the lessons, are located within the `notes/` directory in the main repository. The `README.md` provides a direct `notes` link to this folder.
*   **Asking Questions:** If you encounter issues, have questions about the concepts, or want to discuss the exercises, please use the GitHub **Discussions** tab associated with the `cyfrin/defi-gmx-v2` repository. The `README.md` contains a `discussions` link that will take you there.

By following these setup steps and utilizing the provided tools and resources, you'll be well-equipped to tackle the GMX v2 DeFi exercises. Good luck!