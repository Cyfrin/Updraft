## Navigating the Course: File Structure and Foundry Commands

Welcome to the course. To ensure a smooth learning experience, this lesson provides a comprehensive guide to the project's structure. We will cover where to find exercise instructions, where to write your code, how to access solutions, and the essential Foundry commands for building and testing your smart contracts.

### Project Directory Structure

All course materials are organized within the `foundry` directory. This setup creates a clear separation between instructions, your working files, and the completed solutions.

*   **Exercise Instructions (`foundry/exercises/`)**: This directory contains Markdown (`.md`) files. Each file, such as `swap_router.md`, details the requirements, context, and goals for a specific exercise.
*   **Your Workspace (`foundry/src/exercises/`)**: This is where you will write your Solidity code. For each exercise, you will find a corresponding starter `.sol` file to complete. For example, the `swap_router.md` exercise corresponds to the `foundry/src/exercises/Router.sol` file.
*   **Solutions (`foundry/src/solutions/`)**: If you get stuck or want to compare your work with the official implementation, you can find the completed code for every exercise in this directory. The solution for the router exercise, for instance, is located at `foundry/src/solutions/Router.sol`.
*   **Command Reference (`foundry/README.md`)**: This file is your central reference for all shell commands needed to build, test, and interact with the project.

### Key Foundry Commands

All commands should be run from the root of the `foundry` directory.

#### Building Your Code

Compiling your Solidity code is the first step to verify its syntax and structure.

*   **Build Your Exercise Code**: To compile the code you have written in the `foundry/src/exercises/` directory, run the standard build command:
    ```shell
    forge build
    ```

*   **Build the Solution Code**: To compile the official solutions, you must set the `FOUNDRY_PROFILE` environment variable. This tells Foundry to use a different source directory as defined in our project configuration.
    ```shell
    FOUNDRY_PROFILE=solution forge build
    ```

#### Testing Your Code

Our tests run against a fork of a live blockchain, allowing you to interact with real-world contract states in a local environment.

*   **Test Your Exercise Code**: Use the following command to run the test suite against your implementation. You must provide a `FORK_URL` (your blockchain RPC endpoint) and specify the path to the relevant test file.
    ```shell
    forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Router.test.sol -vvv
    ```

*   **Test the Solution Code**: To run the same tests against the provided solution, simply add the `FOUNDRY_PROFILE=solution` environment variable to the command.
    ```shell
    FOUNDRY_PROFILE=solution forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Router.test.sol -vvv
    ```

### Important Concepts and Optimizations

#### Understanding Foundry Profiles

This course leverages a powerful feature called **Foundry Profiles**. A profile is a pre-defined configuration that can alter Foundry's behavior, such as changing the source (`src`) and library (`lib`) directories. By setting the environment variable `FOUNDRY_PROFILE=solution`, you instruct Foundry to switch its source directory from `src/exercises` to `src/solutions`. This allows you to build or test the solution code without modifying any files or configurations manually.

#### Speeding Up Tests with Fork Caching

Running tests on a forked blockchain requires fetching state data over the network, which can be slow. To optimize this, Foundry can cache the blockchain state at a specific block number.

By fetching the latest block number once and reusing it for subsequent test runs, you ensure that Foundry only downloads the state on the first run. All future test executions will use the local cache, resulting in a significant speed improvement.

Follow these steps to enable caching:

1.  Ensure your `FORK_URL` environment variable is set to your RPC endpoint.
2.  Get the latest block number from the network and store it in a shell variable.
    ```shell
    FORK_BLOCK_NUM=$(cast block-number --rpc-url $FORK_URL)
    ```
3.  Use this variable (`$FORK_BLOCK_NUM`) in your `forge test` commands as shown in the examples above. This triggers the caching mechanism, making your development workflow much more efficient.