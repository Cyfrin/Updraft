# Receiving cross-chain messages

In the previous lesson:
- We created and deployed a `Sender` contract to send a CCIP message on Sepolia.
- We created and deployed a `Vault` contract on Base Sepolia. This contract will be called using the data in the cross-chain message.

Now, we need to create the `Receiver` contract and deploy it to the destination chain (Base Sepolia, in our case). This contract address will be passed in the cross-chain message on the source chain (Speolia, in our case) to receive the cross-chain message.

## Receiver contract

For contracts to be able to receive CCIP messages, they need to inherit the [`CCIPReceiver`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ccip/applications/CCIPReceiver.sol) contract. This is an abstract contract and enforces inheriting contracts to implement a function called `_ccipReceive`. This function is called by CCIP when sending the cross-chain message and will contain the logic to handle the data sent cross-chain. 

In our example, we encoded a target contract and function call. This was the `deposit` function on the `Vault` contract, which automatically deposits our USDC into a vault after sending the tokens cross-chain. 

Create a file inside the `contracts` folder called `Receiver.sol` and paste the `Receiver.sol` code from the [course code repo](https://github.com/Cyfrin/chainlink-fundamentals-cu/blob/main/chainlink-course-code/ccip/Receiver.sol).

### Code explainer

As always, let's walk through this code. If you are not a developer or aspiring developer and are not interested in the technical details of implementing receiving CCIP messages, feel free to skip to the deployment section.

#### Imports

The contract imports several Chainlink CCIP-related dependencies:

- `IRouterClient`: Interface for the CCIP router.
- `Client`: Library containing CCIP message struct.
- `CCIPReceiver`: Abstract contract that needs to be inherited to receive cross-chain messages.
- `IERC20` & `SafeERC20`: For handling token transfers safely.
- `Ownable`: To implement ownership.

```solidity
import {IRouterClient} from "@chainlink/contracts-ccip@1.5.0/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip@1.5.0/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip@1.5.0/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IERC20} from "@chainlink/contracts-ccip@1.5.0/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts-ccip@1.5.0/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts@5.2.0/access/Ownable.sol";
```

#### Safe Transfers

This line implements the SafeERC20 library for all IERC20 interactions. This library adds protection against failed token transfers by requiring success confirmation.

```solidity
using SafeERC20 for IERC20;
```

#### State variables, events, and errors

- `MessageReceived`: Event emitted when a cross-chain message is received.
- `s_sender`: State variable for the allowed sender address.
- `SOURCE_CHAIN_SELECTOR`: Hardcoded chain ID for Sepolia testnet. This has been hard-coded for clarity.
- Custom errors for various failure conditions.

```solidity
event MessageReceived(
    bytes32 indexed messageId,
    uint64 indexed sourceChainSelector,
    address sender,
    bytes data,
    address token,
    uint256 tokenAmount
);

address private s_sender;
uint64 private constant SOURCE_CHAIN_SELECTOR = 16015286601757825753; // only allow messages from Sepolia

error Receiver__NothingToWithdraw();
error Receiver__NotAllowedForSourceChainOrSenderAddress(uint64 sourceChainSelector, address sender);
error Receiver__FunctionCallFail();
error Receiver__SenderNotSet();
```

#### Constructor

The constructor:

- Initializes the `CCIPReceiver` with the Base Sepolia router address (`0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93`)
- Initializes the `Ownable` constructor with the deployer as the initial owner.

```solidity
constructor() CCIPReceiver(0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93) Ownable(msg.sender) {}
```

#### onlyAllowlisted modifier

This modifier restricts message processing to:

1. Verify the sender address has been set.
2. Only allow messages from the configured source chain (Sepolia) and the allowlisted sender address.

```solidity
modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
    if (s_sender == address(0)) {
        revert Receiver__SenderNotSet();
    }
    if (_sourceChainSelector != SOURCE_CHAIN_SELECTOR || _sender != s_sender) {
        revert Receiver__NotAllowedForSourceChainOrSenderAddress(_sourceChainSelector, _sender);
    }
    _;
}
```

#### Setting the sender address

Only the contract owner can set the trusted sender address that can send CCIP messages to this contract.

```solidity
function setSender(address _sender) external onlyOwner {
    s_sender = _sender;
}
```

#### _ccipReceive


This is the core function that processes incoming CCIP messages:

- It implements the `_ccipReceive` function from the `CCIPReceiver` abstract contract and uses the `onlyAllowlisted` modifier.
- Decodes the message data to extract a target address (the `Vault` contract) and function calldata (the `deposit` function signature and arguments).
- Makes a low-level call to the target contract with the function data.
- Reverts if the call fails.
- Emits a `MessageReceived` event with details about the message.

```solidity
function _ccipReceive(
    Client.Any2EVMMessage memory any2EvmMessage
)
    internal
    override
    onlyAllowlisted(
        any2EvmMessage.sourceChainSelector,
        abi.decode(any2EvmMessage.sender, (address))
    )
{
    (address target, bytes memory functionCallData) = abi.decode(any2EvmMessage.data, (address, bytes));
    (bool success, ) = target.call(functionCallData);

    if (!success) {
        revert Receiver__FunctionCallFail();
    }

    emit MessageReceived(
        any2EvmMessage.messageId,
        any2EvmMessage.sourceChainSelector,
        abi.decode(any2EvmMessage.sender, (address)),
        any2EvmMessage.data,
        any2EvmMessage.destTokenAmounts[0].token,
        any2EvmMessage.destTokenAmounts[0].amount
    );
}
```

#### withdrawToken

This function allows the contract owner to withdraw any ERC-20 tokens in the contract:

- Checks the contract's balance of the specified token.
- Reverts if there are no tokens to withdraw.
- Uses `SafeERC20`'s `safeTransfer` function to safely send all tokens to the owner.

```solidity
function withdrawToken(address _token) public onlyOwner {
    uint256 amount = IERC20(_token).balanceOf(address(this));
    if (amount == 0) revert Receiver__NothingToWithdraw();
    IERC20(_token).safeTransfer(msg.sender, amount);
}
```

The contract is designed to receive cross-chain messages from a specific chain (Sepolia) and a specifically allowed-sender address, providing security.

### Compile and deploy the contract

Compile the `Receiver` contract and deploy it to Base Sepolia. Make sure you are still connected to Base Sepolia in MetaMask. 

Click **Deploy**:

![receiver](/chainlink-fundamentals/6-chainlink-ccip-messages/assets/receiver.png)

Once it has been deployed, remember to pin it to your workspace! Also, note down the address again, as you did with the `Sender` and `Vault` addresses, so you can copy it without having to connect to Base Sepolia.

### Setting the sender

Before we move on, let's set the `s_sender` address. 

- In the **Deployed Contracts** section, expand the `Receiver` contract instance.
- Next to the `setSender` function, paste the `Sender` address (from Sepolia that we noted in the previous lesson), click **setSender**, and confirm the transaction in MetaMask to allowlist the `Sender` contract to send the `Receiver` cross-chain messages.

You are now ready to send your cross-chain message to bridge USDC and automatically deposit it into a vault!
