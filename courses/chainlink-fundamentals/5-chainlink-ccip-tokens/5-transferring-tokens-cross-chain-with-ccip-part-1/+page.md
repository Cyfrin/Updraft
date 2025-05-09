# Transferring Tokens Cross-chain in a Smart Contract Part 1

In this lesson, we will learn how to transfer USDC tokens cross-chain from Sepolia to Base Sepolia using Chainlink CCIP.

### Prerequisites

- You have added the Base Sepolia testnet chain to MetaMask (if you need a reminder of how to add a chain to MetaMask, check out [this lesson in Blockchain Basics](https://updraft.cyfrin.io/courses/blockchain-basics/basics/making-your-first-transaction-on-zksync))

- You have testnet Sepolia ETH and Base Sepolia ETH.
- You have testnet LINK on Sepolia.
- You have added the LINK token to MetaMask on Sepolia and Base Sepolia.
- You have testnet USDC. You can obtain USDC on Sepolia from a Circle faucet.

Section 2 contains the instructions for the above prerequisites if you need a reminder.

## Writing the Smart Contract

### Setting up the project

1. Open [Remix](https://remix.ethereum.org/).
2. Create a new workspace named "CCIP". If you need a reminder of how to do this, visit the Introduction to Remix lesson in Section 2.
3. Create a folder named `contracts`.
4. Inside this folder, create a file named `CCIPTokenSender.sol`.
5. Paste the provided contract code. The code can be found in the [course code GitHub repo](https://github.com/Cyfrin/chainlink-fundamentals-cu/blob/main/chainlink-course-code/ccip/CCIPTokenSender.sol). 

### Project workflow

This is the workflow for sending a cross-chain transfer using the `CCIPTokenSender` contract that implements CCIP:

1. The `CCIPTokenSender` contract is deployed on the source blockchain (Sepolia in our case).
2. The `CCIPTokenSender` contract is funded with LINK to pay the CCIP fees.
3. The user creates an approval for `CCIPTokenSender` to spend their USDC (the amount equal to the amount to transfer cross-chain).
4. The user calls the `transferTokens` function on `CCIPTokenSender` to send the cross-chain message. This function will:
    - Check the users' USDC balance is sufficient.
    - Send the USDC from the user to the `CCIPTokenSender` contract. For this, we will use the `safeTransferFrom` function from the `SafeERC20` library, which is "safer" to use since it reverts if a transfer fails (e.g., if the receiver cannot be sent tokens for some reason).
    - Approve a Chainlink `Router` contract to be able to spend `CCIPTokenSender`'s tokens and transfer them cross-chain.
    - Get the fees for the message via the `getFees` function on the `Router` contract and approve the `Router` to spend the fees.
    - Sends the message via the `ccipSend` function on the `Router` contract.

**Note**: This tutorial aims to help you understand how CCIP works conceptually. If you are not interested in learning how to implement CCIP in a smart contract, you can skip to the deployment section.

### Understanding the code

#### 1. Contract declaration and constructor

First, we create a smart contract called `CCIPTokenSender` that inherits OpenZeppelin's `Ownable` smart contract, which we used in previous Sections. Remember, this contract sets the `_owner` as the address passed in the `Ownable` constructor. We can access this owner address externally by calling the `owner` function. Let's import and inherit the `Ownable` smart contract and invoke its constructor.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Ownable } from "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

contract CCIPTokenSender is Ownable {
    constructor() Ownable(msg.sender) {}
}
```

#### 2. Importing dependencies

Let's import the required interfaces and libraries: 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { IRouterClient } from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import { IERC20 } from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts@4.6.0/access/Ownable.sol";
```

These imports provide:

- `IRouterClient`: Interface for the CCIP Router that handles cross-chain messaging
- `Client`: Library with data structures for CCIP messages
- `IERC20`: Standard interface for interacting with ERC20 tokens (USDC and LINK)
- `SafeERC20`: Enhanced functions for safer ERC20 token handling

We also need to use the `SafeERC20` library with our `IERC20` tokens:

```solidity
contract CCIPTokenSender is Ownable {
    using SafeERC20 for IERC20;

    constructor() Ownable(msg.sender) {}
}
```

#### 3. Defining state variables 

We define the following constant variables (that have been hard-coded for clarity):
- The `Router` on the source chain routes the CCIP transfer requests to the DON.
- The LINK token on the source chain is used to pay the fees.
- The USDC token on the source chain is the token we are transferring cross-chain.
- The destination chain selector: This is the identifier so Chainlink knows what chain you want to send your tokens to. This selector can be found in the [CCIP Directory](https://docs.chain.link/ccip/directory/testnet).

```solidity
// https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet#ethereum-testnet-sepolia
IRouterClient private constant CCIP_ROUTER = IRouterClient(0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59);
// https://docs.chain.link/resources/link-token-contracts#ethereum-testnet-sepolia
IERC20 private constant LINK_TOKEN = IERC20(0x779877A7B0D9E8603169DdbD7836e478b4624789);
// https://developers.circle.com/stablecoins/docs/usdc-on-test-networks
IERC20 private constant USDC_TOKEN = IERC20(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238);
// https://docs.chain.link/ccip/directory/testnet/chain/ethereum-testnet-sepolia-base-1
uint64 private constant DESTINATION_CHAIN_SELECTOR = 10344971235874465080;
```

#### 4. The main transfer function 

Now, let's build our `transferTokens` function that will handle the cross-chain transfer:

```solidity
function transferTokens(
    address _receiver,
    uint256 _amount
)
    external
    returns (bytes32 messageId)
{
    // Function implementation will go here
}
```

This function takes:

- `_receiver`: The address that will receive tokens on Base Sepolia
- `_amount`: How many USDC tokens to transfer
- It returns `messageId`: A unique identifier for tracking the cross-chain transfer

#### 5. The transfer logic

The function transferTokens allows us to send tokens cross-chain. Let's implement it:

1. **Balance verification**: Check whether the address calling the function has a USDC balance of at least the amount they are trying to bridge.

```solidity
if (_amount > USDC_TOKEN.balanceOf(msg.sender)) {
    revert CCIPTokenSender__InsufficientBalance(USDC_TOKEN, USDC_TOKEN.balanceOf(msg.sender), _amount);
}
```

2. **Prepare the token information**: To send a token cross-chain we need to create a message object of type `Client::EVM2AnyMessage`. This struct has the following members:

```solidity
// If extraArgs is empty bytes, the default is 200k gas limit.
struct EVM2AnyMessage {
    bytes receiver; // abi.encode(receiver address) for dest EVM chains
    bytes data; // Data that is being sent cross-chain with the tokens. (For this example, we won't be sending any data)
    EVMTokenAmount[] tokenAmounts; // Token transfers
    address feeToken; // Address of feeToken. address(0) means you will send msg.value.
    bytes extraArgs; // Populate this with _argsToBytes(EVMExtraArgsV2)
}
```

CCIP requires a specific format for specifying tokens to transfer. As above, the token information must be a `Client.EVMTokenAmount` struct array. This struct has the following members:

```solidity
struct EVMTokenAmount {
    address token; // token address on the local chain.
    uint256 amount; // Amount of tokens.
}
```

To create this array:

- We first create an empty `Client.EVMTokenAmount` array with a single element.
- Then, we create a `Client.EVMTokenAmount` variable and pass the USDC token address and the amount to send. This tells Chainlink what token and how much is being sent cross-chain.
- Finally, we initialize the first element with the `Client.EVMTokenAmount` variable.

    ```solidity
    // Create an array with one element
    Client.EVMTokenAmount[]
        memory tokenAmounts = new Client.EVMTokenAmount[](1);
    // Create a single Client.EVMTokenAmount variable with the details for the token and the amount to send cross-chain
    Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({
        token: address(USDC_TOKEN),
        amount: _amount
    });
    // Set the first element of the array to the Client.EVMTokenAmount variable
    tokenAmounts[0] = tokenAmount;
    ```

3. **Building the CCIP message**:Create a message `Client.EVM2AnyMessage` struct with the relevant values:

```solidity
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
    receiver: abi.encode(_receiver),
    data: "", // no data
    tokenAmounts: tokenAmounts,
    extraArgs: Client._argsToBytes(
        Client.EVMExtraArgsV1({gasLimit: 0}) // Setting gasLimit to 0 because:
        // 1. This is a token-only transfer to an EOA (external owned account)
        // 2. No contract execution is happening on the receiving end
        // 3. gasLimit is only needed when the receiver is a contract that needs
        //    to execute code upon receiving the message
    ),
    feeToken: address(LINK_TOKEN)
});
```

3. **Handling fees**: Get the fees for the message via the `Router` contract, check if the contract has a sufficient LINK balance to pay the fees, and approve the `Router` to spend some of the `CCIPTokenSender`'s LINK as fees:

```solidity
uint256 ccipFee = CCIP_ROUTER.getFee(
    DESTINATION_CHAIN_SELECTOR,
    message
);

if (ccipFee > LINK_TOKEN.balanceOf(address(this))) {
    revert CCIPTokenSender__InsufficientBalance(LINK_TOKEN, LINK_TOKEN.balanceOf(address(this)), ccipFee);
}

LINK_TOKEN.approve(address(CCIP_ROUTER), ccipFee);
```

4. **Transferring and approving USDC**: Send the `_amount` to bridge to the `CCIPTokenSender` contract and approve the `Router` to be able to spend `_amount` of USDC from the `CCIPTokenSender` contract:

```solidity
USDC_TOKEN.safeTransferFrom(msg.sender, address(this), _amount);
USDC_TOKEN.approve(address(CCIP_ROUTER), _amount);
```

5. **Sending the CCIP message**: Finally, send the cross-chain message by calling the `ccipSend` function on the `Router` contract and emit an event:

```solidity
// Send CCIP Message
messageId = CCIP_ROUTER.ccipSend(DESTINATION_CHAIN_SELECTOR, message);

emit USDCTransferred(
    messageId,
    DESTINATION_CHAIN_SELECTOR,
    _receiver,
    _amount,
    ccipFee
);
```

#### 5. Withdrawal function

Finally, the function `withdrawToken` allows the owner to be able to withdraw any USDC sent to the contract to a specified address `_beneficiary`:

```solidity
function withdrawToken(
    address _beneficiary
) public onlyOwner {
    uint256 amount = IERC20(USDC_TOKEN).balanceOf(address(this));
    if (amount == 0) revert CCIPTokenSender__NothingToWithdraw();
    IERC20(USDC_TOKEN).transfer(_beneficiary, amount);
}
```

### Important Notes

- **Token Approvals**: Before users can call `transferTokens`, they must approve `CCIPTokenSender` to spend their USDC tokens. We will be doing this in the _next lesson_.
- **Contract Funding**: `CCIPTokenSender` must be funded with LINK tokens to pay the CCIP fees. Again, we will be doing this in the _next lesson_. 
- **Chain Selectors**: The destination chain selector is a unique identifier for Base Sepolia. Different destinations require different selectors. Visit the CCIP directory to find the chain selector for [the available chains](https://docs.chain.link/ccip/directory/testnet).
- **Fee Management**: CCIP fees are paid in LINK tokens (or native tokens) and vary based on the destination chain and current network conditions.

## Compiling & Deploying the Contract

Now that you have the code written, deploy the `CCIPTokenSender` contract to the source chain (Sepolia) using the steps detailed in the previous lessons:

- **Compile**: Open the `CCIPTokenSender.sol` file and head to the **Solidity Compiler** tab. Click **Compile CCIPTokenSender.sol**
- **Connect to MetaMask**: Head to the **Deploy & Run Transactions** tab and change the **Environment** to **Injected Provider - MetaMask** to connect to MetaMask. Make sure that you are connected to Sepolia testnet in MetaMask.
- **Deploy the Contract**: Ensure you've selected `CCIPTokenSender.sol` in the **Contract** dropdown menu. Click **Deploy**, and this will pop up MetaMask. Click **Confirm** to send the transaction and deploy the contract.
- Upon a successful deployment in Remix, you will see:
    1. The green checkmark at the bottom.
    2. Your deployed contract and address.

You have now successfully written and deployed a smart contract that uses CCIP to transfer USDC cross-chain! In the next lesson, we will use this contract to perform a cross-chain transfer from Sepolia to Base Sepolia!
