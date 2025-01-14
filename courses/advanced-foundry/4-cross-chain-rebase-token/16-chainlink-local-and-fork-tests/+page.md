# Chainlink Local and Fork Tests

Okay, let's create some fork tests, but first, what is a fork test?

Fork testing allows us to run a test on a specific fork of a specific blockchain. We are going to be using the `createFork` and `createSelectFork` virtual machine (VM) cheat codes.

If we click into `createSelectFork`, we can see that it creates and selects a new fork from the given endpoint, and returns the identifier of the fork. We have to provide it an RPC URL. If a block number is passed as an argument, the fork will begin on that block, otherwise it will begin on the latest block.

This is a way for us to test our contracts, as if they have been deployed to these actual blockchains. It's helpful for things like hack analysis, where maybe we want to test interacting with a specific protocol at a specific block to recreate some kind of hack and we can recreate their function calls to work out what went wrong. 

Fork testing is very helpful for instances in which you want to test interactions with live real deployed contracts on the blockchains, then you can just fork that specific blockchain and then use the contract address and call it as per normal. This is what we want to do. We are going to want to fork, in this instance, Sepolia and then we are going to be bridging our tokens to and creating token contracts, and a pool contract on a destination chain which could be ZKsync, Optimism, Arbitrum, or whatever you like.

At the moment on ZKsync, cheat codes, in general, do not work, so we cannot do pranking, and we cannot do fork testing. Because of that, we are going to be going from Sepolia to Arbitrum in our fork tests.

Let's create a little fork test suite and a new file called:
```
CrossChain.t.sol
```

And then we need to start off our tests. We are going to add:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
```
Then we need to import both `console` and `test`
```javascript
import {Test, console} from "forge-std/Test.sol";
```

We are also going to want to import all of our contracts to deploy, so we will need:
```javascript
import {RebaseToken} from "../src/RebaseToken.sol";
import {RebaseTokenPool} from "../src/RebaseTokenPool.sol";
import {Vault} from "../src/Vault.sol";
```
We also need to import the `IRebaseToken` interface with:
```javascript
import {IRebaseToken} from "../src/interfaces/IRebaseToken.sol";
```
Now, let's create our test contract:
```javascript
contract CrossChainTest is Test{
    RebaseToken public token;
    RebaseTokenPool public pool;
    Vault public vault;
        
        function beforeAll() public override {
            token = new RebaseToken("Test Token", "TST", 18);
            address[] memory allowlist = new address[](1);
            allowlist[0] = address(this);
            pool = new RebaseTokenPool(token, allowlist, address(0), address(0));
            vault = new Vault(address(token));
        }
    
    function test_lockOrBurn() public {
     
    }
}
```
In our `foundry.toml` where we have added our remappings, we also need to add RPC endpoints, and we need to set up the remappings to add:
```toml
rpc_endpoints = { sepolia-eth = "", arb-sepolia = ""}
```

And set up the remappings as such:
```toml
remappings = [
    '@openzeppelin/=lib/openzeppelin-contracts/',
    'ccip/=lib/ccip/',
    '@chainlink-local/=lib/chainlink-local/'
    
]
```
