## Deploying an ERC-4337 Smart Account and Sending a UserOperation on Arbitrum

This lesson walks you through the practical steps of deploying a basic ERC-4337 smart contract account, specifically `MinimalAccount`, onto the Arbitrum mainnet. We'll then proceed to send a `UserOperation` (UserOp) through this newly deployed smart account. This exercise serves as a foundational example before we explore zkSync's native account abstraction capabilities. While the ultimate goal involves zkSync, understanding the process on an EVM-compatible chain like Arbitrum provides valuable context.

Our primary objectives are:
1.  Deploy a basic ERC-4337 smart contract account (`MinimalAccount`) to Arbitrum.
2.  Construct and send a `UserOperation` through this account to interact with another contract.

We'll be working within a VS Code environment and executing commands directly in the terminal. The associated GitHub repository contains all necessary scripts and `make` commands, but for this demonstration, we'll run them explicitly.

## Deploying the `MinimalAccount` to Arbitrum Mainnet

First, we need to deploy our `MinimalAccount` smart contract. This contract will act as our smart account, capable of receiving and executing UserOperations.

We'll use a Foundry script for this deployment. Open your terminal within VS Code and ensure you have sourced your `.env` file, which should contain your `ARBITRUM_RPC_URL`.

The command to deploy is as follows:

```bash
forge script script/DeployMinimal.s.sol --rpc-url $ARBITRUM_RPC_URL --account smallmoney --broadcast --verify
```

Let's break down this command:
*   `forge script script/DeployMinimal.s.sol`: This tells Foundry to execute the deployment script located at `script/DeployMinimal.s.sol`.
*   `--rpc-url $ARBITRUM_RPC_URL`: This specifies the Arbitrum RPC endpoint. The `$ARBITRUM_RPC_URL` variable should be set in your environment.
*   `--account smallmoney`: This designates the deployer account alias. In this context, "smallmoney" refers to a **burner account**.
    *   **Critical Safety Tip:** When deploying to mainnet environments like Arbitrum, always use a burner account. This is an account with a limited amount of funds, minimizing potential losses if mistakes occur during deployment or if the private key is compromised.
*   `--broadcast`: This flag instructs Foundry to actually send the transaction to the network.
*   `--verify`: After successful deployment, this flag attempts to automatically verify the contract's source code on the relevant block explorer (Arbiscan for Arbitrum).

Once the command executes successfully, you can verify the deployment on Arbiscan. For this demonstration, the `MinimalAccount` contract was previously deployed and verified at the address: `0x03Ad95a54f02A40180D45D76789C448024145aaF`. On its Arbiscan page, you would see the verified source code (`MinimalAccount.sol`). This version might include additional NatSpec comments compared to earlier development versions but is fundamentally based on account abstraction principles. You might also notice a small amount of ETH in the contract, often sent for initial gas or testing.

## Preparing and Sending a UserOperation via `MinimalAccount`

With our `MinimalAccount` deployed, the next step is to send a `UserOperation` through it. This UserOp will instruct our smart account to interact with another contract on Arbitrum. We'll use another Foundry script, `SendPackedUserOp.s.sol`, for this purpose.

The core logic resides within the `run()` function of this script, which we need to populate.

**Coding the `run()` function in `SendPackedUserOp.s.sol`:**

1.  **Initialize `HelperConfig`**: This utility contract helps manage network-specific configurations.
    ```solidity
    HelperConfig helperConfig = new HelperConfig();
    ```

2.  **Define Target Contract Address (`dest`)**: This is the address of the contract our UserOp will ultimately call. For this example, we'll target the Arbitrum mainnet USDC contract.
    ```solidity
    address dest = 0xaf88d065e77c8cC2239327C5EDb3A432268e5831; // Arbitrum Mainnet USDC
    ```

3.  **Define Call Value (`value`)**: Since our interaction (an `approve` call) doesn't involve sending ETH, this is `0`.
    ```solidity
    uint256 value = 0;
    ```

4.  **Define `functionData`**: This is the calldata for the internal call our `MinimalAccount` will make. We'll call the `approve` function on the USDC contract.
    *   First, import `IERC20` if not already present:
        ```solidity
        import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
        ```
    *   Then, encode the `approve` call:
        ```solidity
        bytes memory functionData = abi.encodeWithSelector(
            IERC20.approve.selector,
            0x9EA9b0cc1919def1A3CfAEF4F7A66eE3c36F86fC, // Spender address (another EOA)
            1e18 // Amount to approve (Note: USDC has 6 decimals, so 1e18 is a very large USDC amount)
        );
        ```
        *(The large approval amount is for demonstration; in a real scenario, use appropriate values and consider USDC's decimal precision.)*

5.  **Define `executeCallData`**: This is the calldata for the `MinimalAccount`'s `execute` function. This function, when called by the EntryPoint, will perform the internal `approve` call defined above.
    *   Import `MinimalAccount` if not already present (path may vary):
        ```solidity
        import {MinimalAccount} from "src/ethereum/MinimalAccount.sol";
        ```
    *   Encode the `execute` call:
        ```solidity
        bytes memory executeCallData = abi.encodeWithSelector(
            MinimalAccount.execute.selector,
            dest,
            value,
            functionData
        );
        ```

6.  **Generate Signed UserOperation (`userOp`)**: We'll use a helper function, `generateSignedUserOperation` (assumed to be defined elsewhere in the script or an imported library), which handles creating the `PackedUserOperation` struct, fetching the nonce, calculating the UserOp hash, and signing it with the appropriate key.
    ```solidity
    // The MinimalAccount address deployed earlier
    address minimalAccountAddress = address(0x03Ad95a54f02A40180D45D76789C448024145aaF);
    PackedUserOperation memory userOp = generateSignedUserOperation(
        executeCallData,
        helperConfig.getConfig(), // Contains network config like EntryPoint address
        minimalAccountAddress
    );
    ```

7.  **Prepare UserOp Array (`ops`)**: The EntryPoint's `handleOps` function expects an array of UserOperations.
    ```solidity
    PackedUserOperation[] memory ops = new PackedUserOperation[](1);
    ops[0] = userOp;
    ```

8.  **Broadcast Transaction to EntryPoint**: Using Foundry's cheatcodes, we simulate broadcasting the transaction. The `handleOps` function is called on the ERC-4337 EntryPoint contract.
    ```solidity
    vm.startBroadcast();
    // The beneficiary address receives gas refunds
    address payable beneficiary = payable(helperConfig.getConfig().account); // Typically the burner account
    IEntryPoint(helperConfig.getConfig().entryPoint).handleOps(ops, beneficiary);
    vm.stopBroadcast();
    ```

**Important Off-Screen Setup:**
Before running this script, some off-screen configuration is necessary:
*   **`HelperConfig.s.sol` Update**: This file must be updated with Arbitrum-specific configurations, such as the official EntryPoint contract address and the "account" address (your burner/smallmoney account used for broadcasting and as beneficiary).
*   **Wallet/Private Keys**: Ensure your Foundry environment is correctly configured with the private keys, especially for the "smallmoney" account that will sign and broadcast the transaction to the EntryPoint.

**A Note on Testing Account Abstraction:**
Testing ERC-4337 account abstraction can be challenging. Ideally, one would use dedicated testnets fully supporting the ERC-4337 infrastructure (Bundlers, EntryPoint, Paymasters). In the absence of readily available, fully-fledged ERC-4337 testnets at the time of demonstration, deploying and testing directly on a mainnet like Arbitrum (using a burner account and minimal funds) was chosen, despite the inherent costs and risks.

**Executing the UserOperation Script:**
With the script prepared and configurations in place, we can run the command to send the UserOperation.
```bash
forge script script/SendPackedUserOp.s.sol --rpc-url $ARBITRUM_RPC_URL --account smallmoney --broadcast -vvv
```
This command is similar to the deployment command:
*   It targets the `SendPackedUserOp.s.sol` script.
*   It uses the same Arbitrum RPC URL and the `smallmoney` burner account (which pays for the gas to submit the UserOp to the EntryPoint).
*   `--broadcast` sends the transaction.
*   `-vvv` increases verbosity for more detailed logs during execution.

*Disclaimer: For this lesson, these commands were executed prior to recording to avoid live mainnet gas expenditures. The results shown on Arbiscan reflect these pre-executed transactions.*

## Verifying the UserOperation on Arbiscan

After the script execution (or by looking up the pre-executed transaction), we can verify the outcome on Arbiscan. Navigate to the transaction hash generated by the `handleOps` call.

**Transaction Details on Arbiscan:**
*   **Status:** Should be "Success".
*   **Timestamp:** Will reflect when the transaction was mined (e.g., "54 days 20 hrs ago" if checking a past transaction).
*   **From:** The address of your "smallmoney" burner account (the EOA that submitted the UserOp to the EntryPoint).
*   **To (Interacted With):** The ERC-4337 EntryPoint contract address on Arbitrum.
*   **Input Data:** Decoded, this will show the call to the `handleOps` function. You'll see the `ops` array containing your `PackedUserOperation` (including the `sender` as your `MinimalAccount` address, `nonce`, the `callData` which is `executeCallData`, `signature`, etc.) and the `beneficiary` address.

**Internal Transactions and Event Logs:**
The crucial part is to inspect the event logs generated by this transaction:
1.  **`Approval` Event (from USDC Token Contract):** You should see an `Approval` event emitted by the USDC Token contract (`0xaf88...`). This confirms that the internal call within your UserOperation successfully executed the `approve` function on the USDC contract. The log details will show:
    *   `owner`: The address of your `MinimalAccount` (`0x03Ad...`).
    *   `spender`: The address you specified in `functionData` (`0x9EA9...`).
    *   `value`: The amount approved (Arbiscan might display this based on 6 decimals for USDC, e.g., `1000000` if `1e6` was the effective amount after decimal conversion, or a larger number if `1e18` was directly interpreted, though USDC uses 6 decimals). The key is that an approval occurred.

2.  **`UserOperationEvent` (from EntryPoint Contract):** The EntryPoint contract itself will emit a `UserOperationEvent`. This event signals the successful processing of your UserOp and includes vital information:
    *   `userOpHash`: The unique hash of your UserOperation.
    *   `sender`: The address of your `MinimalAccount`.
    *   `paymaster`: Address of the paymaster if one was used (likely `address(0)` if not).
    *   `nonce`: The nonce used for this UserOp from your `MinimalAccount`.
    *   `success`: A boolean indicating if the UserOp execution was successful (should be `true`).
    *   `actualGasCost`: The actual gas cost paid for the UserOp.
    *   `actualGasUsed`: The gas used by the UserOp execution.

Seeing these events, particularly the `Approval` from USDC and a successful `UserOperationEvent`, confirms that your UserOperation was correctly processed by the EntryPoint. The EntryPoint, in turn, called the `execute` function on your `MinimalAccount`, which then successfully performed the intended internal transaction (the USDC approval).

## Next Steps

You've now seen a demonstration of how to deploy an ERC-4337 smart account and send a UserOperation through it on an EVM Layer 2 like Arbitrum, which does not have native account abstraction built into its core protocol. This approach can be applied to Ethereum or any EVM-compatible chain.

However, some chains, like zkSync, offer native account abstraction. This often simplifies the process as some AA components might be integrated more deeply into the protocol. In the next part of this series, we will explore how account abstraction works on zkSync and how it differs from the ERC-4337 implementation we've just covered.