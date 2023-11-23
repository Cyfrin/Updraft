---
title: Common EIPs/ERCs.
---

_Follow along the with the video_

---

Let's delve into a nugget of smart contract creation, fuzz testing, and the illustrious ERCs. But before we do, let's touch base on where we stand. By now, you're expected to have some familiarity with concepts like fuzz testing and invariance. So, bear in mind, we will roll out more details on fuzz testing and stateful fuzzing in our forthcoming sessions.

### OpenZeppelin Contracts and ERC20

Now, let's shift gears to talk about importing some common EIPS and ERCs into your codebase. Say, you're working on a project and you'd like to include an `ERC20`, but are unsure where to start. This is where OpenZeppelin Contracts come into play. This popular library, available on GitHub, provides prewritten contracts for your use, making your life a whole lot easier!

All you have to do is navigate to `OpenZeppelin Contracts` repository on GitHub, and grab the link. Once you're back in the terminal where you're running your project, it's as simple as typing `forge install`, and pasting in the link appended with `--no commit`. And voila! The contracts are now installed as part of your project.

This was just an example with ERC 20, but you can pick and choose from the whole array of ERCs available.

```shell
$ forge install OpenZeppelin/openzeppelin-contracts --no-commit
```

### Configuring Project Files and Creating New Contracts

Now, navigate to the `foundry.toml` file in your project directory. Here, specify the remappings by setting `@openzeppelin/contracts` equal to `lib/openzeppelin-contracts/contracts`. This sets up the path for the compiler to locate OpenZeppelin contracts, further easing the process of building upon these contracts.

```markdown
remappings = ['@openzeppelin/contracts=lib/openzeppelin-contracts/contracts']
```

Next on the cards is creating a new file for your very own token, let's call it `MyToken.sol`. Now we're going to use the `ERC20` that we imported from OpenZeppelin as a basis. Start with including some basic details like license identifier and solidity version. Craft your contract declaration with the name `MyToken`.

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MyToken {}
```

### Using GitHub Co-pilot for Smoother Coding

At this point, I’m sure most of you are familiar with GitHub Copilot. If you're not, here's a tiny excavation into it. It's a VS code extension that introduces AI into your coding practice and tries to predict the next line of code. It's a nifty tool that saves you time when setting up tests and constructing boilerplate code.

Create a constructor for your custom token using this AI assistance. For instance, the ERC20 constructor method requires the token's name and symbol. Put these together and you have a boilerplate for your very own token, based on ERC20! Now, how cool is that?

```js
constructor() ERC20("MyTokenName", "MTN"){}
```

For those who might need a brush up on what exactly ERC20 is or are curious about other types of tokens like the ERC721 (also known as NFTs), stay tuned as we'd be covering them in our upcoming discussions.

In conclusion, OpenZeppelin Contracts and GitHub Co-pilot are powerful tools for anyone working with smart contracts and ERCs. Leveraging these technologies can make our coding lives easier, efficient, and a bit more fun! So don't forget to explore and make the best use out of them!

<img src="/security-section-1/3-fuzz-test/fuzz1.png" style="width: 100%; height: auto;" alt="block fee">
