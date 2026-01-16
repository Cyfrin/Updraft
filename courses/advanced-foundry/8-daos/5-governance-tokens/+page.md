---
title: Governance Tokens
---

_Follow along with this video._

---

### Governance Tokens

As mentioned in the previous closing remarks, I suspect this will mostly be review, as we set up this token, so let's keep our momentum and jump right into it. Start with creating `src/GovToken.sol`. The token we'll use in this demonstration will be _so standard_ that we can just lean on [**OpenZeppelin's Contract Wizard**](https://wizard.openzeppelin.com/) and select `ERC20` and `votes`.

![governance-tokens1](/foundry-daos/4-governance-tokens/governance-tokens1.png)

Copying this into our contract and we're already almost set (I've adjusted below to utilize named imports).

```solidity
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";

contract GovToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("GovToken", "GT") ERC20Permit("GovToken") {}

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
```

Let's go over how this differs from a standard ERC20. Primarily it's the same base token contract with 2 extensions to the functionality, Permit and Votes.

**ERC20Permit:**

From the documentation:

```solidity
/* @dev Implementation of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
 * https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].
```

We won't go too deeply into this, but essentially it allows people to sign transactions without sending them, such that someone else can send it, paying for the gas.

More interesting for us now is:

**ERC20Votes:**

ERC20Votes is "Compound-like" in how it implementing voting and delegation. It does a number of import things such as:

- Keeps a checkpoint history of each account's voting power. Using snapshots of voting power is important, as assessing realtime voting power is susceptible to exploitation!
  - Any time a token is bought, or transferred checkpoints are typically updated in a mapping with the user addresses involved
- Allows the delegation of voting power to another entity while retaining possession of the tokens

### Wrap Up

That's all there really is to the governance token implementation we'll be employing. Some of the more complex functionality available through these extensions we won't be covered, but as always I encourage you to do your own exploration beyond the course material if you find yourself interested in learning more.

In the next lesson we'll start in on the main contract which will handle much of the protocol's administration, the Governor.
