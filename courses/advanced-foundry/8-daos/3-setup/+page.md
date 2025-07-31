---
title: Setup
---

_Follow along with this video._

---

### Setup

Alright, welcome back! Now that we have all this context and understanding of DAOs, it's time to try building one ourselves. The project we'll be building will be a DAO which employs an ERC20 governance token to allocate voting power and determine membership.

While this is a very common/simple way to deploy a governance protocol, I want to challenge you not to default to this. It seems simple to deploy and manage at first, but issues inevitably arise when trading of governance tokens comes into play and speculation on price throws governance to the wind. This makes me sad so, I challenge you to find better solutions in your own projects.

> ❗ **IMPORTANT**
> Don't make Patrick sad.

You can of course find all the code we'll be writing in this lesson's [**GitHub Repo**](https://github.com/Cyfrin/foundry-dao-f23).

Let's begin!

```bash
mkdir foundry-dao-f23
code foundry-dao-f23
```

In the new window, you know the drill, we should be pros by now.

```bash
forge init
```

Be sure to delete the example contracts, `src/Counter.sol`, `script/Counter.s.sol` and `test/Counter.t.sol`.

With that, let's detail what we're going to accomplish.

1. We are going to have a contract controlled by a DAO
2. Every transaction that the DAO wants to send has to be voted on
3. We will use ERC20 tokens for voting (bad model, please research better methodologies as you grow!)

Great! Let's start with creating a minimal contract that allows voting. Start with a new file, `src/Box.sol`. The boiler plate here will be really similar to what we've done before, we'll have a few special imports for the functionality we want to include. We know we'll need OpenZeppelin's library, so we can absolutely start by installing this.

```bash
forge install openzeppelin/openzeppelin-contracts --no-commit
```

And naturally we can add our remapping...

```toml
remappings = ["@openzeppelin/contracts=lib/openzeppelin-contracts/contracts"]
```

The start of our contract should look very familiar.

> ❗ **NOTE**
> For version 5 of OpenZeppelin's Ownable contract, we need to pass an address
> in the constructor. We have to modify our code to account for this when
> running `forge build` so that our project will not error. Like this:
> `constructor(address initialOwner) Ownable(initialOwner) {}`

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {}
```

This contract is only going to serve as the contract which is managed by our DAO. In practice this contract could be quite complex, or multiple contracts could be managed by a single DAO, but for our purposes we'll keep things concise. The goal is to understanding how the voting mechanism allows the DAO to autonomously execute function calls.

Let's add the ability to store and retrieve a value from our contract. The ability to change this number will be modifier with `onlyOwner` such that only our DAO may call it.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 private s_number;

    event NumberChanged(uint256 number);

    function store(uint256 newNumber) public onlyOwner {
        s_number = newNumber;
        emit NumberChanged(newNumber);
    }

    function getNumber() external view returns (uint256) {
        return s_number;
    }
}
```

### Wrap Up

Easy. Nothing we've covered here should be new, it's all stuff we've seen before. This simple contract will be controlled by our DAO once deployed!

In the next lesson we'll construct our ERC20 governance token. There isn't going to be anything extraordinary about this token, so building it out should be largely review.

See you there!
