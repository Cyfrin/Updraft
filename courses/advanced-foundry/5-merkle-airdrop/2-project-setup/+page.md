---
title: Project Setup
---

_Follow along with the video_

---

### Setup

We can begin by creating a repository for our project with the command `mkdir merkle-airdrop` and navigate into it. Ensure you're on the regular version of Foundry by typing `foundryup` in your terminal. You can then run `forge init` to initialize an empty foundry project.

### BagelToken

The token that we are going to airdrop will be a ERC20 token. In the same directory we can make a `BagelToken.sol` contract, where we will use the OpenZeppelin libraries `ERC20` and `Ownable` to create it. For that we first need to install the dependency with the command `forge install openzeppelin/openzeppelin-contracts --no-commit`.

In the `foundry.toml` file we the specify a remapping:

```toml
remappings = [ '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/']
```

And then we are ready to create the contract, which will contain a `constructor` and a `mint` function:

```solidity
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract BagelToken is ERC20, Ownable {
    constructor() ERC20("Bagel Token", "BT") Ownable(msg.sender) { //the deployer is the owner of the contract
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }
}
```

### MerkleAirdrop

We can then create a new file named `MerkleAirdrop.sol`, where we will have a list of addresses and someone from that list who can claim ERC20 tokens.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MerkleAirdrop {
    // list of addresses that can receive tokens
    // allow someone in the list to claim some tokens
}
```

The contracts will be connected by passing the `BagelToken`, or any ERC20 token to the `MerkleAirdrop` constructor. Then we can add our claimer address into an array of addresses:

```solidity
address [] claimers;
```

Then we would need a function that checks that the claimer is in this whitelist and allow him to receive tokens.

```solidity
function claim(address account) external {
    for (uint256 i=0; i<claimers.length; i++){
        //check if the account is in the claimers array
    }
}
```

However, looping through an array that can grow indefinitely can lead to **performance issues** and calling this function. If there are for example, hundreds of claimers, will become cost prohibitive and will cause a Denial Of Service (DOS). Merkle trees will help solving this issue.

### Merkle Trees and Proofs

Merkle Trees is the data structure that allows us to manage and verify large sets of data efficiently, while Merkle Proofs can help to prove that some piece of data is contained within a group.
