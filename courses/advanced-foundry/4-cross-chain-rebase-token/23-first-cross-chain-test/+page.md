# Setting Up Our First Cross-Chain Transfer Test

Okay, let's walk through how to set up a test that allows for cross-chain transfer of tokens!

First we are starting with the `CrossChain.t.sol` file.

After a lot of set up we are now at the point where we can begin writing our tests. We've completed the steps which included:

1.  Creating our forks
2.  Creating a `CCIPLocalSimulatorFork` Instance
3.  Getting the network details on both Sepolia and Arbitrum.

At this point, we are able to deploy tokens and token pools and even a vault on sepolia. We've also granted mint and burn roles as well as registered the CCIP admin to be the owner.

We have also accepted the admin role and set the pools for the token.

Next we did the same steps on arbitrum to be able to send and receive tokens to sepolia. This was done by created a struct of chain update which was then passed into apply chain updates.  

To remove a chain, we would populate the `uint64` array.

Now we will create a function to be able to bridge tokens by creating a message struct:
```javascript
Client.EVM2AnyMessage
```
We can enable this function for both sepolia and arbitrum. We will also pay the fees with LINK.

Next we are getting the fee to be able to send a CCIP message.
```javascript
IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
```
We get LINK from a faucet. We also approve the router address, to be able to send some LINK as the fee. We approve the router to send local tokens of the amount we would like to bridge. We also make assertions to check if the state is as expected.

Next we switch to the remote fork, warp the block time to be 20 minutes in the future. Then we call the "switchChainAndRouteMessage" on the simulator to propagate the message across the chain.

And that's how we can bridge tokens! Now we need to create a test to call our bridge token function to send tokens across chain.

We will create our test, by creating a new function:
```javascript
function testBridgeAllTokens() public {

}
```
We will make it a public function.  First, select the fork we're working on:
```javascript
vm.selectFork(sepoliaFork);
```
We will then use the "deal" cheatcode to send some tokens to our user:
```javascript
vm.deal(user, SEND_VALUE);
```
We will need to define `SEND_VALUE` in our storage:
```javascript
uint256 SEND_VALUE = 1e5;
```

Now we need to deposit into our vault so we use the prank to do so:
```javascript
vm.prank(user);
vault.deposit{value: SEND_VALUE}();
```
Note: The deposit function does not take any arguments.

Also note that when calling the deposit function, we need to cast the vault as a payable address:
```javascript
payable(address(vault)).deposit{value: SEND_VALUE}();
```
To check this, we use an assert to confirm that the balance of the user is equal to our send value
```javascript
assertEq(sepoliaToken.balanceOf(user), SEND_VALUE);
```
Then we call our `bridgeTokens` function:
```javascript
bridgeTokens(SEND_VALUE, sepoliaFork, arbSepoliaFork, sepoliaNetworkDetails, arbSepoliaNetworkDetails, sepoliaToken, arbSepoliaToken);
```
We can also do some more state checking, such as the balance of the user in the other token.

And now, we can run the test:
```bash
forge build --via-ir
```
to check that everything builds correctly. Then we run the test using the flag to match the contract, so it only runs that contract test:
```bash
forge test --mc Cross --via-ir -vvvv
```
There were some errors that came up including issues with the `vm.prank` function and also with gas, we can fix that.

First we will remove the `vm.prank` function call inside the `configureTokenPool` functions to make it compatible with the single `vm.prank` call we made:
```javascript
vm.stopPrank();
```
Second we can fix the issue by adding a custom gas limit in the extra args:
```javascript
extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1{gaslimit: 100_000});
```
This is due to chainlink local having a known bug where we need to explicitly pass a gas limit. In a real world scenario we do not need to do this.

With these fixes, our tests now pass.

We can also test this by performing the steps again in reverse.

First we call `selectFork` and then `vm.warp` to increase block timestamp by 20 mins. Now we call the bridge tokens with the values from the remote fork (arbitrum).
```javascript
vm.selectFork(arbSepoliaFork);
vm.warp(block.timestamp + 20 minutes);
bridgeTokens(SEND_VALUE, sepoliaFork, arbSepoliaFork, sepoliaNetworkDetails, arbSepoliaNetworkDetails, sepoliaToken, arbSepoliaToken);
```
We also assert if the remoteUserInterestRate is correct as well
```javascript
assertEq(remoteUserInterestRate, localUserInterestRate)
```
Now we can run the tests again, to confirm it passes and now our cross-chain test is passing!

We encourage that you should add more tests such as:
  *  Testing that you can bridge and then bridge back
  * Bridge some back
  * Think of edge cases and test for those.
  *  Test for different gas amounts

And now, with that we have covered a lot of topics here, take a break and hydrate!
