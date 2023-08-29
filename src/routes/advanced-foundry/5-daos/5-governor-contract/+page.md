---
title: Governor Contract
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/KAzM8MlQefI?si=Ck1vgiWeN_iR2dH2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Hello there! Today I want to share a really interesting piece of tech I've recently used, the [Open Zeppelin Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard). This tool is incredibly helpful in generating smart contracts for creating a DAO, which stands for a Decentralized Autonomous Organization. Why are DAO's exciting? Well, they allow for democratized decision making, meaning the members of the DAO can vote about its future actions.

In this post, I want to walk you through a solution that makes use of the Zeppelin Wizard to create a DAO.

## Zeppelin Wizard Overview

The Zeppelin Wizard helps us with multiple facets of setting up a DAO. One of its features is the Governor, which we can configure to suit our needs. For instance, we can adjust the voting delay, voting period, and proposal threshold in line with the governance model we're aiming for. Do we want our voting to start immediately after proposing? Or after 100 blocks? All these details are customizable.

Here's the interesting part - we can copy the output code from the wizard and integrate it into our contracts with minimal changes. To illustrate this, I'll walk you through a sample setup of a Governor contract along with a crucial TimeLock mechanism.

<img src="/daos/5-governor/governor1.png" alt="Dao Image" style="width: 100%; height: auto;">

## Creating the Governor contract

First, we need to update our Governor contract and import the necessary interfaces (`IVotes`, `GovernorVotes` &amp; `TimeLockController`). We'll be using _named imports_ since they make our code cleaner.

Here's an overview of what the Governor contract entails.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    // The following functions are overrides required by Solidity.

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
```

This may seem a bit abstract, but let me break it down a bit.

When somebody makes a proposal, it gets registered in the system. We essentially have a record of when a vote started and ended, whether it was executed or canceled. This information helps us identify the status of a proposal and whether it has passed.

Next, we have the `execute` function. Once a proposal gets approved by the DAO members, we call this function to implement the operation involved in the proposal.

The final key function is `cast vote`. This allows members of the DAO to cast votes on various proposals. Depending on the overall voting system, the weight of each member's vote could be dependent on the number of tokens they hold.

## Building the TimeLock Controller Contract

The final step in our set up is creating the TimeLock Controller contract, which, fortunately, we can do with minimum effort thanks to Open Zeppelin's repository.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    // minDelay is how long you have to wait before executing
    // proposers is the list of addresses that can propose
    // executors is the list of addresses that can execute
    constructor(uint256 minDelay, address[] memory proposers, address[] memory executors)
        TimelockController(minDelay, proposers, executors, msg.sender)
    {}
}
```

And this is it for this sub-section. We now have a TimeLock contract that we can use to lock our Governor contract. Keep learning and stay tuned for the next post!

Happy coding!
