# Introduction to Remix

During this course, we will use Remix to write, compile, deploy, and interact with smart contracts. We will cover the content of this lesson again throughout the first couple of sections and lessons, but let's go through Remix now so we are familiar with it before we start using Chainlink services.

## What is Remix

[Remix](https://remix.ethereum.org/) is an online Integrated Development Environment (IDE) specifically designed for smart contract development. It provides an easy-to-use interface for writing, compiling, deploying, and debugging Solidity smart contracts. Remix is widely used because of its simplicity, built-in tools, and browser-based functionality, allowing you to get started quickly without installing additional software.

### Key Features of Remix:

- **File Explorer**: Manage your contract files and projects.
- **Solidity compiler**: Compile and check smart contracts for errors.
- **Deploy & run transactions**: Deploy contracts to local or public EVM networks and interact with them.
- **Debugger**: Step through transactions to debug execution.
- **Plugin System**: Extend Remix’s functionality with additional tools.

## Navigating Remix

When you open Remix, you will see a few important sections:

1. **File Explorer** (left panel): Manage your workspaces, create new files, and organize contracts.
2. **Editor** (center panel): Write and modify Solidity smart contracts.
3. **Terminal** (bottom panel): View logs, compilation messages, and transaction details.
4. **Solidity Compiler** (sidebar): Compile smart contracts with different Solidity versions.
5. **Deploy & Run Transactions** (sidebar): Deploy contracts to a blockchain and interact with them.

![remix](../assets/remix.png)

## Creating Workspaces, Folders, and Files

Remix allows you to create different **workspaces** to organize your projects. This allows you to keep related files grouped together. A bit like a GitHub repository or a project folder on your comoputer.

1. Create a new **Workspace** in Remix: 
    - At the top of the **File Explorer** panel, click on the **Workspaces** actions button (the burger icon)
    - Select **Create blank** to create a new workspace. 
    - Give a name for your workspace. In this example, we will use the name "CLF".
    - Hit **Ok**

    ![create-blank-workspace](../assets/create-blank-workspace.png)

2. Create a new folder:
    - Right-click in the file explorer sidebar and click **New Folder**
    - Name the folder `contracts`

3. Create a new file:
    - Right-click on the `contracts` folder and click **New file**
    - Name the file `MyERC20.sol`

    ![file-explorer](../assets/file-explorer.png)

4. Write the code in your new file!

## Compiling Smart Contracts

Before deploying a smart contract, you must compile it to check for errors and generate the necessary bytecode.

### How to Compile a Contract:

1. Open the **Solidity Compiler** panel in Remix.
2. Select the correct Solidity version (matching your contract).
3. Ensure your contract file is still open in the main window and click **Compile [YourContract.sol]**.
4. If there are errors, they will appear in the terminal.

![solidity-compiler-tab](../assets/solidity-compiler-tab.png)

5. You can also compile by hitting `Cmd + S` on your Mac keyboard or `Ctrl + S` on Windows.
    - If there are no errors, the contract will compile successfully, and you’ll see a green checkmark.
6. Remember the "ABI" part of the lesson 1? Well, when we compile our contract, the compiler generates the ABI! To get the ABI of a contract (e.g., for verification or a front-end application) scroll down in the **Solidity Compiler** tab and blick the ABI button:

![remix-abi](../assets/remix-abi.png)

## Connecting to MetaMask

To deploy a contract on a real blockchain (e.g., Ethereum Mainnet, Sepolia, or Polygon), you need to connect Remix to MetaMask.

### Steps to Connect:

1. Open MetaMask and make sure you are on the desired network.
2. Go to the **Deploy & Run Transactions** panel in Remix.
3. Select **Injected Provider - MetaMask** as the environment.
4. MetaMask will prompt you to connect your wallet and approve the connection.

![metamask-environment](../assets/metamask-environment.png)

## Deploying Smart Contracts

Once compiled, a smart contract can be deployed on a local blockchain (e.g., Remix VM) or a real network (e.g., Ethereum).

### Steps to Deploy:

1. Open the **Deploy & Run Transactions** panel.
2. Select a deployment environment (e.g., **Remix VM** for testing or **Injected Provider - MetaMask** for live networks).

![metamask-environment](../assets/metamask-environment.png)

3. Choose the correct contract from the dropdown.
4. Click **Deploy** and confirm the transaction in MetaMask to deploy your contract.

![deploy](../assets/deploy.png)

### Pinning Deployed Smart Contracts

After deployment, Remix allows you to pin a deployed contract to your workspace so you can continue interacting with it even after refreshing the page. Click the pin icon to pin the deployed contract.

![pin-contract](../assets/pin-contract.png)

### The contract address

1. In the **Deploy & Run Transactions** panel, find the deployed contract under **Deployed Contracts**.
2. Click the **copy icon** to save the contract address.
3. If needed, use the **At Address** button to reattach the contract after a page refresh.

## Interacting with Smart Contracts

Once deployed, you can interact directly with your smart contract from Remix.

### Steps to Interact:

1. Find the deployed contract in the **Deploy & Run Transactions** panel.
2. Click the dropdown to see available functions.
3. Enter any required parameters and click the **transact** button.
4. Confirm transactions in MetaMask (for state-changing functions).
5. View results in the Remix terminal.

![remix-interact](../assets/remix-interact.png)

This lesson should give you a solid foundation in using Remix to develop and deploy Solidity smart contracts. Now, you’re ready to integrate Chainlink services into your contracts!

Let's now write a simple, smart contract to practice these steps.
