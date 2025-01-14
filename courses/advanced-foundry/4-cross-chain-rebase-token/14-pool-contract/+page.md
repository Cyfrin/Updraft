# Cross-Chain Token Transfers With Chainlink CCIP

In this lesson, we are focusing on cross-chain token transfers with Chainlink�s CCIP. We will need to enable our tokens with Chainlink CCIP, as the previous video stated.

If we head to the Chainlink documentation, we can read about CCIP and all of their other products. For this project, we will be focusing specifically on CCIP.

If we go to Guides, we can find a Cross-Chain Token (CCT) Standard section. Since we know all about the cross-chain token standard, let's begin.

We can start building the cross-chain token standard into our project. There is a tutorial for registering a token from an EOA using Foundry.

In this tutorial, there is a very useful guide on creating a cross-chain token, and we are going to be making a burn-and-mint cross-chain token. The pool contract, which was explained in the previous video, will be handling the cross-chain transfer and burn tokens on the source chain, then mint them on the destination chain.

If bridging from the destination chain back to the source chain, the reverse will happen. So, to start, we need to deploy a token pool for our token. This will be a custom token pool, as we need to send extra information for bridging.

There is information about custom pools in the concepts section in the cross-chain token standard page, down under �Custom Token Pools�. We can see some use cases and more information. For example, that custom token pools should inherit from:

```javascript
BurnMintTokenPoolAbstract
```

or:

```javascript
LockReleaseTokenPool
```

Additionally, the custom token pool must implement the necessary functions for both source and destination blockchains. There are various examples, but specifically we are going to be making a burn and mint token pool contract.

The first thing we�ll do is deploy a token pool for our token, but actually, we are going to be creating our own custom token pool, because there is some extra information that we want to pass cross-chain when we bridge. This will be a burn and mint contract where we burn tokens on the source chain, and mint tokens on the destination chain.

If we head over to the CCIP repo, we can see that inside of `contracts/src/v0.8/ccip/pools`, there is `TokenPool.sol`, which is where we can inherit this functionality from:

```javascript
ccip/contracts/src/v0.8/ccip/pools/TokenPool.sol
```

Then, you will see that inside of the CCIP repo which we are going to import from there is a `TokenPool.sol` contract which we need to inherit. So, now that we�ve covered this background information, we can create a new file which will be called:

```javascript
RebaseTokenPool.sol
```

We can put our SPDX-License-Identifier and our pragma statement in that file:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
```

Then, we need to import our pool contract from chainlink

```javascript
import {TokenPool} from "@ccip/contracts/src/v0.8/ccip/pools/TokenPool.sol";
```

And now that we�ve got all of that done, we will pick up where we left off in the next lesson.
