## Building a Cross-Chain Bridge Function

Okay, let's start by learning how to do a cross-chain transfer using a CCIP. We will be creating a function to do this cross chain transfer so we can reuse it to send tokens across chains. This is an introduction to how to do a CCIP token transfer. Let's start with the documentation by navigating to Guides and then Transfer Tokens.
If we scroll down, this documentation can be a little confusing. However, in the contract we can see the function that performs the action:
```javascript
transferTokensPayLink
```
In this function we will build an `EVM2AnyMessage` which we will need to create the structure for.

To perform this transfer we must:
1. Create a message
2. Approve the fees using the `getFee` function
3. Approve on the link token for the router to be able to spend the fees
4. Approve the router for the tokens that we want to send across chain
5. Call CCIP send on the router
6. As arguments, we provide the destination chain selector and the `EVM2AnyMessage`

In the code editor, we will create a new function called bridgeTokens:
```javascript
function bridgeTokens() {
  
}
```
We will make this function so that we can send tokens from Sepolia to Arbitrum and Arbitrum to Sepolia. This is a bidirectional function. Inside this function, we will deposit on Sepolia and use:
```javascript
vm.selectFork(sepoliaFork);
vm.startPrank(user);
vm.deal(user, 1000);
sepoliaToken.mint(user, 1000, 0);
sepoliaToken.approve(address(vault), 1000);
vault.deposit(1000);
vm.stopPrank();
```
We will then lock on Sepolia:
```javascript
vm.selectFork(arbSepoliaFork);
vm.startPrank(user);
sepoliaPool.lockOrBurn(
  TokenPool.LockOrBurnV1(
   originalSender: user,
   amount: 1000,
   remoteChainSelector: sepoliaNetworkDetails.chainSelector
  )
);
vm.stopPrank();
```
And then release on Arb:
```javascript
vm.selectFork(remoteFork);
vm.startPrank(owner);
  vault.redeem(amountToBridge, amountToBridge);
  remoteToken.mint(address(user), amountToBridge, 0);
  vault.deposit(value: amountToBridge);
  vm.stopPrank();
```

We need to ensure the following parameters as constructor arguments
```javascript
uint256 amountToBridge,
uint256 localFork,
uint256 remoteFork,
Register.NetworkDetails memory localNetworkDetails,
Register.NetworkDetails memory remoteNetworkDetails,
RebaseToken localToken,
RebaseToken remoteToken
```
In order to create this function for bidirectional transfers and to create our message we need to import the Client library at:
```javascript
@chainlink-local/ccip/Client.sol
```
We will also need an interface which has the `getFee` and `CCIPSend` functions so we can cast the router address to that interface to be able to use its functions.

So let's begin!
