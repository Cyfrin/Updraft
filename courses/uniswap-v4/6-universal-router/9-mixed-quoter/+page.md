## How to Programmatically Get a Uniswap V4 Swap Quote

For developers building on Uniswap, a common requirement is to programmatically calculate the expected output of a swap—just as the Uniswap user interface does. While this is a relatively simple calculation for Uniswap V2 pools based on token reserves, the concentrated liquidity model introduced in V3 and continued in V4 makes on-chain quoting significantly more complex.

In V3 and V4, liquidity is not uniform; it's concentrated within specific price ranges, or "ticks." An accurate quote requires iterating through every tick a trade will cross, a process that is too gas-intensive for a simple on-chain view function. The solution is not to calculate, but to simulate. By executing a swap in a read-only, forked environment, we can get a precise quote without broadcasting a transaction or spending real gas.

This lesson walks you through using Uniswap's official `mixed-quoter` contract to simulate a transaction on a mainnet fork and get an accurate swap quote for a V4 pool.

### Prerequisites

Before you begin, ensure you have the following installed and configured:
*   Git
*   Foundry (a Solidity development toolkit)
*   An Ethereum mainnet RPC URL (e.g., from Alchemy or Infura)

### Step 1: Set Up the Project Environment

First, you need to clone the Uniswap `mixed-quoter` repository, which contains the necessary smart contracts for simulating swaps across V2, V3, and V4 pools.

1.  Clone the repository:
    ```bash
    git clone git@github.com:Uniswap/mixed-quoter.git
    ```

2.  Navigate into the project directory:
    ```bash
    cd mixed-quoter
    ```

3.  The project uses both NPM for JavaScript dependencies and Foundry for Solidity submodules. Install both:
    ```bash
    # Install NPM packages
    npm i

    # Install Foundry dependencies and compile contracts
    forge build
    ```

### Step 2: Configure the Foundry Environment

The project's `foundry.toml` configuration file includes settings for RPC endpoints that require environment variables. To run a local test without setting them, you should comment out these sections to prevent errors.

Open the `foundry.toml` file and comment out the `[rpc_endpoints]` and `[etherscan]` blocks:

```toml
# [rpc_endpoints]
# mainnet = "${MAINNET_RPC_URL}"
# goerli = "${GOERLI_RPC_URL}"
# ... (and so on)

# [etherscan]
# mainnet = { key = "${ETHERSCAN_KEY}" }
# ... (and so on)
```

### Step 3: Create a Test File for Simulation

The `MixedRouteQuoterV2` contract is not deployed on-chain, so we must deploy it ourselves in a testing environment. We will use a Foundry test to deploy the contract, call its quoting function, and log the results.

Create a new file in the `test/` directory named `MixedRouteQuoterV2Example.sol`. This test will perform the following actions:

*   **Setup:** Deploy a fresh instance of the `MixedRouteQuoterV2` contract before the test runs.
*   **Execution:** Define the parameters for a specific V4 pool (e.g., ETH/USDC).
*   **Quoting:** Call the `quoteExactInputSingleV4` function with a defined input amount (e.g., 1 ETH).
*   **Logging:** Print the input and resulting output amount to the console.

The core of the test will involve calling the `quoteExactInputSingleV4` function. This function simulates a swap for a single V4 pool where you provide an exact input amount and want to determine the expected output amount.

### Step 4: Run the Simulation on a Mainnet Fork

With the project set up and the test file in place, you can now run the simulation. The test will execute on a temporary fork of the Ethereum mainnet, giving it access to the real-time state of the V4 pools.

1.  First, set an environment variable named `FORK_URL` to your mainnet RPC endpoint.
    ```bash
    # Replace with your actual RPC URL
    export FORK_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
    ```

2.  Execute the Foundry test command. We use `--match-path` to specify our test file and add the `-vvv` flag to increase verbosity, which ensures our console logs are displayed.
    ```bash
    forge test --fork-url $FORK_URL --match-path test/MixedRouteQuoterV2Example.sol -vvv
    ```

### Step 5: Interpret the Results

After the command finishes, the test output will include the logs from your simulation. For a swap of 1 ETH for USDC, the output will look similar to this:

```
Logs:
  ETH in: 1000000000000000000
  USDC out: 4149999614
```

To interpret these results, you must account for the decimals of each token:

*   **ETH in:** `1000000000000000000` is 1 * 10^18, which correctly represents **1 ETH**.
*   **USDC out:** `4149999614`. Since USDC has 6 decimal places, this value represents `4149.999614` USDC, or approximately **~4,150 USDC**.

You have successfully simulated a Uniswap V4 swap and retrieved an accurate, real-time quote. This simulation-based approach is the most reliable method for programmatically determining swap outcomes, mirroring the functionality of the official Uniswap frontend and enabling you to build sophisticated DeFi applications.