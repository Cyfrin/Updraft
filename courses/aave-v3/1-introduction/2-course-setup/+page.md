## Getting Started: Setting Up Your DeFi Aave V3 Environment

Welcome to the DeFi Aave V3 course! This guide will walk you through accessing all essential course resources and configuring your development environment. Successfully setting up your environment is crucial for completing the hands-on exercises and fully understanding the Aave V3 protocol.

## Accessing Course Materials: The Core GitHub Repository

All primary course materials, including exercises, notes, and solutions, are hosted in a private GitHub repository: `Cyfrin/defi-aave-v3`.

To get started, you'll need to clone this repository to your local machine.
1.  Navigate to the GitHub page for the repository (e.g., `https://github.com/Cyfrin/defi-aave-v3`).
2.  Click the green "Code" button.
3.  Copy the SSH URL provided (e.g., `git@github.com:Cyfrin/defi-aave-v3.git`).
4.  Open your terminal and run the following command:
    ```bash
    git clone git@github.com:Cyfrin/defi-aave-v3.git
    ```
5.  Once the cloning process is complete, navigate into the newly created directory:
    ```bash
    cd defi-aave-v3
    ```

## Setting Up Your Foundry Development Environment

The course exercises are written using the Foundry framework and are located within the `foundry/` subdirectory of the repository you just cloned.

1.  Navigate to the Foundry directory:
    ```bash
    cd foundry/
    ```
2.  **Install Dependencies and Build Contracts:**
    The project uses git submodules and definitions in `foundry.toml` to manage dependencies like Forge-STD, OpenZeppelin contracts, and Aave V3 interfaces. To install these and compile the contracts, run:
    ```bash
    forge build
    ```
3.  **Configure Mainnet Forking with an `.env` File:**
    The exercises are designed to execute against a fork of the Ethereum mainnet. This requires a mainnet RPC (Remote Procedure Call) URL.
    *   Inside the `foundry/` directory, you'll find a sample environment file named `.env.sample`. It contains a placeholder: `FORK_URL=`.
    *   You need to create your own `.env` file by copying the sample:
        ```bash
        cp .env.sample .env
        ```
    *   Open the newly created `.env` file with a text editor and replace the placeholder with your Ethereum mainnet RPC URL. For example:
        ```
        FORK_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
        ```
    *   You can obtain a free RPC URL from providers like [Alchemy](https://alchemy.com). Sign up for an account and create a new Ethereum mainnet application to get your URL.

## Understanding Aave V3: The Official Contract Repository

To delve deeper into the Aave V3 protocol's actual smart contracts, you'll refer to the official Aave V3 source code. This is located at: `github.com/aave-dao/aave-v3-origin`.

For this course, we will specifically focus on the codebase corresponding to tag `v3.3.0` of this repository.

## Supplementary Learning: Course Notes, Diagrams, and Python Simulations

The `defi-aave-v3` repository you cloned also contains a `notes/` folder. This directory houses valuable supplementary materials:
*   **Diagrams:** Visual aids to explain complex concepts (e.g., `apr-apy.png` illustrating the difference between APR and APY).
*   **Python Simulations:** Jupyter notebooks (e.g., `binomial_expansion.ipynb`) for exploring certain mechanics through Python code.

To run these Python simulations, you'll need Jupyter Notebook installed. The `notes/course-setup.md` file within the `notes/` folder provides a link and instructions for installing Jupyter.
**Note:** Installing Jupyter is optional. It is not required for the core smart contract exercises, and the instructor will demonstrate the simulations.

## Mastering Transaction Analysis with Tenderly

Tenderly ([tenderly.co](https://tenderly.co/)) is a powerful platform for debugging and analyzing transactions on the Ethereum mainnet. It's an invaluable tool for understanding how real-world Aave V3 interactions occur.

**Using Tenderly:**
1.  Sign up for a free account on Tenderly.
2.  Navigate to your Tenderly dashboard.
3.  Paste a transaction hash (e.g., `0xc1120138b3aa3dc6a49ef7e84eccd17530c273e2442f83e47025d819d9a700743`, which is a DAI supply to Aave V3) into the search bar.

**Key Tenderly Features for Analysis:**
*   **Summary:** Provides an overview of the transaction.
*   **Contracts:** Lists all contracts interacted with during the transaction.
*   **Events:** Shows all events emitted.
*   **State:** Details the state changes that occurred.
*   **Debugger/Trace:** This is particularly useful. It displays:
    *   The sequence of contract calls and internal function calls.
    *   The parameters passed to each function.
    *   The ability to click on a line in the trace and see the exact Solidity code that was executed.

By examining real transactions on Tenderly, you can gain insights into which functions to call and what parameters to pass for the exercises.

## Installing Foundry: Your Smart Contract Toolkit

Foundry is the development framework used for all exercises in this course. If you don't have it installed, follow these steps:

1.  The official Foundry repository is `github.com/foundry-rs/foundry`.
2.  **Installation (Linux/macOS):**
    *   The `README.md` on the Foundry GitHub page directs you to `getfoundry.sh`.
    *   The installation command is typically:
        ```bash
        curl -L https://foundry.paradigm.xyz | bash
        ```
    *   Execute this command in your terminal.
    *   After the script completes, follow any on-screen instructions, which usually involve running `foundryup` to complete the installation and add Foundry to your PATH.
        ```bash
        foundryup
        ```

## Navigating and Completing Course Exercises

The main `README.md` file located in the root of the `defi-aave-v3` repository serves as your course syllabus and table of contents.

1.  Open the `README.md` file.
2.  Scroll to the relevant section and topic you are working on (e.g., "Contract Architecture" -> "Supply").
3.  Under each topic, you'll find an "Exercises" subsection with three important links:
    *   **Exercises (Markdown file):** This links to a Markdown file (e.g., `foundry/exercises/Supply.md`) containing:
        *   Detailed instructions for the exercise.
        *   Specific tasks to complete (e.g., "Task 1 - Supply token to Aave V3 pool").
        *   Hints to guide you.
        *   The `forge test` command to run your solution (e.g., `forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Supply.test.sol -vvv`).
    *   **Starter code (Solidity file):** This links to the Solidity file (e.g., `foundry/src/exercises/Supply.sol`) where you will write your code. It includes function stubs and comments outlining the tasks.
    *   **Solution (Solidity file):** This links to the complete, correct solution (e.g., `foundry/src/solutions/Supply.sol`) for the exercise. Try to solve it yourself before looking!

## Optimizing Your Workflow: Foundry Testing Tips and Troubleshooting

The `README.md` file within the `defi-aave-v3/foundry/` directory contains useful commands and notes specifically for working with the Foundry exercises.

**Key Commands and Tips:**
*   **Setup `.env`:**
    ```bash
    cp .env.sample .env 
    ```
    (Then edit `.env` with your `FORK_URL` as described earlier.)
*   **Build Your Exercises:**
    ```bash
    forge build
    ```
*   **Build Provided Solutions:**
    To build the solution code instead of your exercise code, use the `solution` profile:
    ```bash
    FOUNDRY_PROFILE=solution forge build
    ```
*   **Optimize Test Speed with `FORK_BLOCK_NUM`:**
    When running tests in fork mode, Foundry fetches blockchain state from mainnet via your RPC URL. To speed this up, you can cache the state at a specific block number.
    1.  Get the latest block number and store it in an environment variable:
        ```bash
        export FORK_BLOCK_NUM=$(cast block-number --rpc-url $FORK_URL)
        # Or for persistence across sessions, add this to your shell's rc file (e.g., .bashrc, .zshrc)
        # Or run it each time you open a new terminal for the project
        ```
    2.  **Test an Exercise using the cached block:**
        ```bash
        forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Supply.test.sol -vvv
        ```
        The first run will fetch and cache the state from `$FORK_BLOCK_NUM`. Subsequent runs using the *same* `$FORK_BLOCK_NUM` will be significantly faster as they use the cached state.
    3.  **Test a Solution using the cached block:**
        ```bash
        FOUNDRY_PROFILE=solution forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Supply.test.sol -vvv
        ```

*   **Troubleshooting Test Issues:**
    If you encounter unexpected test failures or issues, especially when switching between building your exercises and the solutions, build artifacts might be causing problems.
    *   Run `forge clean` to remove build artifacts and cache:
        ```bash
        forge clean
        ```
        Then, try building and testing again.
    *   **Alternative for Fresh State:** If `forge clean` doesn't resolve the issue, or if you always want to test against the absolute latest mainnet state (sacrificing speed), remove the `--fork-block-number $FORK_BLOCK_NUM` part from your test command. This forces Foundry to fetch fresh state every time.

## Learning from Live Examples: Mainnet Transaction Analysis

The main `README.md` (in the root of `defi-aave-v3`) also includes a "Transactions" section. This section provides links to Etherscan or raw transaction hashes for various Aave V3 operations (e.g., "Supply rETH tx", "Borrow DAI tx", "Withdraw ETH tx").

You can copy these transaction hashes and paste them into Tenderly (as described earlier). Analyzing these real-world transactions will provide invaluable context and practical examples, aiding you in understanding the protocol's mechanics and successfully completing the course exercises.

## Summary of Key Resources and Tools

To recap, these are the essential resources and tools you'll be using throughout the DeFi Aave V3 course:

*   **Primary Course Repository:** `Cyfrin/defi-aave-v3` (contains exercises, notes, solutions).
*   **Official Aave V3 Contracts:** `github.com/aave-dao/aave-v3-origin` (specifically tag `v3.3.0`).
*   **Smart Contract Development Framework:** Foundry (`github.com/foundry-rs/foundry`).
*   **Ethereum Mainnet RPC Provider:** Alchemy.com (or any other provider).
*   **Transaction Debugging Tool:** Tenderly.co.
*   **Python Simulation Environment (Optional):** Jupyter Notebook.

With your environment set up and an understanding of these resources, you are now ready to dive into the world of DeFi with Aave V3!