---
title: Deployment Script
---

_Follow along with the video_

---

To deploy the `BagelToken` and `MerkleAirdrop` contracts, we can follow a structured approach by creating a **deployment script**.

### `deployMerkleAirdrop` Function

Inside the `script` directory, we can start coding the deployment contract by importing the required libraries:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "MerkleAirdrop.sol";
import "BagelToken.sol";
import "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

Next, create the deployment function to deploy the contracts, mint tokens, and transfer them to the airdrop contract:

```js
function deployMerkleAirdrop() public returns (MerkleAirdrop, BagelToken) {
    vm.startBroadcast();
    BagelToken bagelToken = new BagelToken();
    MerkleAirdrop airdrop = new MerkleAirdrop(ROOT, IERC20(bagelToken));
    bagelToken.mint(bagelToken.owner(), AMOUNT_TO_TRANSFER); // amount for four claimers
    IERC20(bagelToken).transfer(address(airdrop), AMOUNT_TO_TRANSFER); // transfer tokens to the airdrop contract
    vm.stopBroadcast();
    return (airdrop, bagelToken);
}
```

### Test Environment Setup

To retrieve and use the last deployed contract in our `MerkleAirdrop.t.sol` file, install `foundry-devops` with the command:

```bash
forge install cyfrin/foundry-devops --no-commit
```

Then, in the `setUp` function, add a check to determine if the current chain is zkSync:

```js
//..
import {ZkSyncChainChecker} from "foundry-devops/src/ZkSyncChainChecker.sol";

function setUp() public {
    if (!isZkSyncChain()) { //chain verification
        DeployMerkleAirdrop deployer = new DeployMerkleAirdrop();
        (airdrop, token) = deployer.deployMerkleAirdrop();
    } else {
        token = new BagelToken();
        airdrop = new MerkleAirdrop(merkleRoot, token);
        token.mint(token.owner(), amountToSend);
        token.transfer(address(airdrop), amountToSend);
    }
    (user, userPrivKey) = makeAddrAndKey("user");
}
```

The `zkSyncChainChecker` determines if we are currently on a zkSync chain. If we are not, we deploy the contracts using our script and proceed with testing. Otherwise, we directly deploy new instances of the `BagelToken` and `MerkleAirdrop` contracts, mint the necessary tokens to the contract owner, and transfer the required amount of tokens to the `MerkleAirdrop` contract.
