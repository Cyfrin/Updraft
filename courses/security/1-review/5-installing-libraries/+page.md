---
title: Installing Libraries
---

_Follow along the with the video_

---

We'll go over Fuzz and Invariant testing in more detail later. For now, let's briefly go over importing valuable libraries into our code base.

### OpenZeppelin Contracts and ERC20

Say, you're working on a project and you'd like to include an `ERC20`, but are unsure where to start. This is where [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) come into play. This popular library, available on GitHub, provides prewritten contracts for your use, making your life a whole lot easier!

Use the following command to install this library to your project directory:

```shell
forge install OpenZeppelin/openzeppelin-contracts --no-commit
```

### Configuring Project Files and Creating New Contracts

Now, navigate to the `foundry.toml` file in your project directory. Here, specify the remappings by setting `@openzeppelin/contracts` equal to `lib/openzeppelin-contracts/contracts`. This sets up the path for the compiler to locate OpenZeppelin contracts.

```toml
remappings = ['@openzeppelin/contracts=lib/openzeppelin-contracts/contracts']
```

Once remapped, the library and it's contracts can be imported into your project like so:

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MyToken is ERC20 {
    constructor() ERC20("MyTokenName","MTN") {};
}
```

For those who might need a brush up on what exactly ERC20 is or are curious about other types of tokens like the ERC721 (also known as NFTs), stay tuned as we'll be covering them in our upcoming discussions.
