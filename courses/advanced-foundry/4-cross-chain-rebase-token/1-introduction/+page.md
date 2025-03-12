## Introduction To Cross Chain Rebase Tokens

We are going to be exploring everything to do with cross chain and we are going to be building a rebase token that works cross chain. Don't worry, we're going to go into more about what this means. What does it mean to be cross chain? What is a rebase token? We are going to cover everything. In this section, you are going to learn about Chainlink CCIP, how to enable a token for CCIP, how to create custom tokens for CCIP, how to create a rebased token, and more specific things like using the "super" keyword.

First of all, we are going to be creating a rebase token.

```javascript
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "./ERC20.sol";
import "./openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "./AccessControl.sol";
import "./openzeppelin-contracts/contracts/access/AccessControl.sol";
import "./AccessControl.sol";

// gitignore

// test

// github-workflows

// bridgeToZkSync.sh

// foundry.toml

// remappings.txt
```

We are going to create a lot of different functions, but the main ones to point out are this funky balance of function which rather than just returning the value from the mapping's balances, we are instead calculating the balance based on some interest. Notice here, we are also going to be learning what it means to use this "super" keyword. We are going to have some funky mint and burn functions, which include a way to mint accrued interest. We are going to learn how to calculate linear interest for a token.

We will then build a token pool for our tokens to issue tokens cross chain using a burn and mint mechanism where the tokens are burnt on the source chain and minted on the destination chain. And this token pool will facilitate that token transfer. We will create a vault in order to be able to deposit ETH and then gain rebase tokens. And then also to be able to redeem our rebase tokens for ETH.

We will create some scripts to be able to deploy our contracts, do the CCIP configuration, and bridge those tokens cross chain. We will also be creating fuzz tests for our rebase token using new assertions like "assertApproxEqualAbsolute". We will also be creating fork tests and using Chainlink Local to be able to test CCIP locally, using "createFork" and CCIP Local Simulator fork.

We will then be using a bash script to deploy our tokens, do the CCIP configuration, mint some tokens, and transfer them across chain from Sepolia to ZKsync Sepolia.

```bash
forge script ./script/sol/Deployers.sol --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast
```

```bash
forge script ./script/sol/ConfigurePool.sol --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast --sig "run/address:updateInterestRate(uint256,bytes)" --run-address $SEPOLIA_POOL_ADDRESS
```

```bash
forge script ./script/sol/BridgeTokens.sol --rpc-url $SEPOLIA_RPC_URL --account updraft --broadcast --sig "sendMessage(uint256,bytes)" --message "uint256" $SEPOLIA_POOL_ADDRESS $ZK_SYNC_SEPOLIA_POOL_ADDRESS
```

So, if you're excited to learn what a rebase token is, and how to create cross chain tokens using CCIP, how to send cross chain messages, and everything to do with bridging cross chain transfers, CCIP, and rebase tokens then this is the right place for you, and let's get started.
