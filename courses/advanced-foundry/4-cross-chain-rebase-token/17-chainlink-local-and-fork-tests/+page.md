Okay, let's create some fork tests.

So first of all what is a fork test?

If we head over, let's just close out some of these tabs to the foundry book, and we go to fork testing, essentially it means that we can run a test on a specific fork of a specific blockchain and we are going to be using the create fork and create select fork VM cheat codes.

So if we click into create select fork, it creates and selects a new fork from the given end point, so we have to provide it an RPC URL and returns the identifier of the fork. If a block number is passed an argument, the fork will begin on that block. So, this is a way for us to test our contracts as if they have been deployed to these actual blockchains. And it also is helpful for things like hack analysis where maybe you want to test interaction with a specific protocol after a specific block to recreate some kind of hack, and we can recreate their function calls to work out what went wrong. And it's very helpful for instances in which you want to test interactions with live real deployed contracts deployed on the blockchains, then you can just fork that specific blockchain and then use the contract address and call it as per normal, which is exactly what we're going to want to do. We are going to want to fork in this instance, especially, and then we are going to be bridging our tokens to and creating token contracts, and a token contract, and a pool contract on a destination chain, which could be Sepolia, Sorry, it could be zkSync, or it could be Optimism, or Arbitrum or whatever you like. Now at the moment, on zkSync cheat codes in general do not work. So we can't do pranking, and we can't do fork testing because of that, we are going to be going from Sepolia to Arbitrum in our fork test.

So, let's create a little fork test. Sweet.

So, we're going to create a new file, CrossChain.tsol, and then we need to do our little SPDX license identifier MIT.pragma solidity ^0.8.24, and then we need to import both console and test because, in case we want to print anything, and we are going to need test because this is a test from forge-std/Test.sol. We are also probably going to want all of our contracts to deploy, so let's import RebaseToken from ./src/RebaseToken.sol. 

```javascript
import { RebaseToken } from "./src/RebaseToken.sol";
```

We're going to want to import the rebase token pool from ./src/RebaseTokenPool.sol.

```javascript
import { RebaseTokenPool } from "./src/RebaseTokenPool.sol";
```

We're going to want to import the vault, which we only want to deploy on the source chain, from ./src/Vault.sol.

```javascript
import { Vault } from "./src/Vault.sol";
```

Now, we're probably also going to want the IRebaseToken interface. So, let's just import that now so that we've got it. IRebaseToken from ./src/interfaces/IRebaseToken.sol.

```javascript
import { IRebaseToken } from "./src/interfaces/IRebaseToken.sol";
```

And now, let's create our test contract. contract CrossChainTest is Test. 

```javascript
contract CrossChainTest is Test {
}
```

Inherit from the test contract, and then, we are going to want to create a setup function, function.

```javascript
function setup() public {
}
```

Remember, this is called automatically when you run the test suite, then we are going to want to create two forks.

So, in your foundry.toml, where you have added your remappings, you also need to add your RPC endpoints exactly like this, but then, in these strings, I want you to add your Alchemy, or whatever you've found your RPC endpoints in here. So, you need a Sepolia one and you need an Arbitrum one. And then, you can come back here, and now, we can use that in our setup. So, we are going to want to use these fork objects multiple times, so that we can switch between the truth, the two. So, let's create a uint256, is it a uint256? Yes, it is.  We're going to create a Sepolia fork, and then, we are also going to have in storage a uint256 arbFork. But it's not going to be arb, it's arbSepolia. Let's be nice and verbose, so that we don't think it's a mainnet one because we don't want to do that at the moment. And then, in setup, we can create those. So Sepolia fork equals. Now if we go back to the documentation, we've got create select fork, create fork, and select fork. So, initially, we're going to want to work on Sepolia, so we can use vm.

```javascript
uint256 sepoliaFork;
uint256 arbSepoliaFork;

function setup() public {
  sepoliaFork = vm.createSelectFork("arb-sepolia");
}
```

.create select fork and then the alias is Sepolia, which is what we put in the foundry.toml, so now it knows exactly what our RPC URL is, and then we can do the same for arbSepolia. So, oops, didn't mean to select that whole thing, but we just want to use create fork because we want to be working on Sepolia, and it's initially, so we're just going to create the fork, but then, we can select it later. And then the alias for that is arbSepolia, or whatever you named your second your RPC URL in your foundry.toml.

Now we haven't passed in a block number because we're just going to say whatever the latest block number is is absolutely okay. If you're doing some kind of hack analysis, you might want a block number there, but we we don't mind too much. Now there's one more thing that we need to do. We actually need to create a way to send cross-chain transfers, and we might be doing that through mocks or something like that. But then how do we send the messages cross chain? How do we mock that out? And hopefully, Chainlink have created something called Chainlink local. So, if we head into the documentation here, we can head to Chainlink local and read all about it. You can read here all about Chainlink local, but it essentially a package that allows you to run those Chainlink services, services, specifically, CCIP in our instance locally, and it makes you be able to it means that you can quickly and easily get all the necessary addresses, such as the router contract, and the R&M proxy contract and all of that sort of thing. Very quickly get that, and then, simulate the cross-chain transfer. We're going to use it to execute our CCIP transfers, our rebased token in our test, and then, also in our scripts we're going to use it to get all of the little addresses that we need. And, if we head inside Build/CCIP, and then, Foundry, you can see how to install it, and here, we are using a specific commit hash. You may be using a different one. Use whatever is in the Git documentation at the time you are watching this. However, if you are having any problems, then you can see specifically what hash I am going to be using, so let's install that now, and I am going to use also --no-dash-commit. And I am going to install Chainlink local, and then I'm going to need to add it into my remappings.txt, and all my foundry.toml. And then you can see how to use it. So, we are going to be using it in a forked environment. So, the way that we use it is that we need to create forks, which we have already done and we did not use an ENV file, we put it in our foundry.toml, but that's okay, and then we need to do this. So, we need to create a new instance of this CCIP local simulator fork contract, and then, we can use this vm.make persistent cheat code to make this address of the local simulator fork persistent across different forks, and then, that's it. We can use this local simulator forks, and then, call the function get network details, and pass through the block.chainId for each of the forks to get the network details, and this network details object has all of the necessary addresses that we need on it. And that's pretty much it. Then when we call router.CCIP send, then it will simulate that cross-chain transfer, and that's literally it. So, let's wait for that to install, and then, we can go ahead and use it. And while we do that, I'm just going to add the remapping. So, I'm going to call it @chainlink-local/lib/chainlink-local/. 

```bash
forge install smartcontractkit/chainlink-local@f38bc3bf8d47f6c77c49117a31431da2eabc2e80189551d9
```

But, it's just the same thing with these being comma separated and then, also with some little quotation marks around, but otherwise, it's the same. 

So if we head back into our test, now we can import Chainlink local. So what was that little uh contract that we needed, called? It was CCIP local simulator fork and that's what we need to import. 

So from @chainlink-local/src/CCIPLocalSimulatorFork.sol.

```javascript
import { CCIPLocalSimulatorFork } from "@chainlink-local/src/CCIPLocalSimulatorFork.sol";
```

It's not even, it's Chainlink-local/. Now let me guess, it's probably going to be src/CCIP. It's not even it's Chainlink-local/. Now, let me guess, it's probably going to be src/CCIP/src/CCIPLocalSimulatorFork.sol. Cool, and then, we need to put it into storage because then we can use it again, CCIP.

```javascript
import { CCIPLocalSimulatorFork } from "@chainlink-local/src/CCIPLocalSimulatorFork.sol";

CCIPLocalSimulatorFork ccLocalSimulatorFork;
```

local simulator fork, and we're going to name this, do do do, lokCCIP. 

```javascript
CCIPLocalSimulatorFork ccLocalSimulatorFork;
```

local simulator fork, just in case we want to use it again, then we can create it. So, CCIP local simulator fork equals a new instance of CCIP local simulator fork contract. Now, we need a way so that the same address, the CCIP local simulator fork address, is available on both chains, so on both forks, and the way we do that is using the cheat code vm.makePersistent, and this will make the address persistent across both chains. So we can use that little cheat code, so vm.

```javascript
CCIPLocalSimulatorFork ccLocalSimulatorFork;

function setup() public {
  sepoliaFork = vm.createSelectFork("arb-sepolia");
  arbSepoliaFork = vm.createFork("arb-sepolia");
  ccLocalSimulatorFork = new CCIPLocalSimulatorFork();
  vm.makePersistent(address(ccLocalSimulatorFork));
}
```

.make persistent and then we need to pass in the CCIP local simulator fork contract, and we also need to cast this to an address, because this cheat code takes an address, and this is a contract, and then, we're just casting it to its address. So now, we can use this address press on both chains, on Sepolia and Arbitrum. So, now, we have done all the setup we need for Chainlink local, and for our fork tests. Woo-hoo! We can go ahead and start deploying some contracts, how exciting! 
