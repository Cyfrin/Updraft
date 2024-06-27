---
title: Setup Continued
---

_Follow along the course with this video._



---



### Necessary Clean-Up

To begin, we first need to clean up unwanted files in our project directory. Since we will be using our own contracts, we can safely remove any pre-existing counter files.

```shell
$ rm -f Counter.sol
```


## Incorporating Contracts from Remix

When it comes to creating new files for our smart contracts, we will be working from 'lesson four' and 'Remix FundMe'. It's of utmost importance not to copy-paste contracts from our Foundry FundMe file at this point. Instead, we can clone the Remix FundMe file and modify it to facilitate easier composition of tests and interactions.

```bash
# Create a new file
touch FundMe.sol
# Copy-paste the contracts from Remix FundMe and paste it in this new file 
```

We will do the same for the 'price converter' contract.

```shell
# Create a new file
touch PriceConverter.sol
# Copy-paste the content of the price converter contract file into this new file

```


<img src="/foundry-fund-me/3-setup-continued/setup-c1.png" style="width: 100%; height: auto;">


### Resolving Import Issues

When we try to compile our newly imported contracts, we might encounter import errors. This happens because while Remix automatically reaches into the NPM package repository to resolve imports, Foundry does not do this. In the context of Foundry, we must specify exactly where the dependencies should be pulled from.

<img src="/foundry-fund-me/3-setup-continued/setup-c2.png" style="width: 100%; height: auto;">


Let's install this dependency with the 'forge install' command.

```shell
# The command is written as follows:
forge install smartcontractkit/chainlink-brownie-contracts
```

We can now view and access these contracts in our local environment. The path to these contracts lies in the newly created 'Lib' folder.

### Redirecting Imports with Remappings

At this moment, our contracts inaccurately import the 'aggregatorv3interface' from '@chainlink contracts'. To correct this, we need to instruct Foundry that '@chainlink contracts' actually points to our local 'Lib' folder. This can be achieved through a Foundry configuration file known as 'foundry.toml,' where we can establish a conduit, or remapping, to set this path accurately.

<img src="/foundry-fund-me/3-setup-continued/setup-c3.png" style="width: 100%; height: auto;">


In the remapping section, construct this line of text:

```js
remappings = ["@chainlink=lib/chainlink-brownie-contracts/contracts"]
```

This tells Foundry to replace '@chainlink contracts' with the path to the local library's chainlink brownie contracts.

### Final Compilation and Potential Errors

Finally, we're ready to compile our contracts!

```shell
$ forge build
```

<img src="/foundry-fund-me/3-setup-continued/setup-c4.png" style="width: 100%; height: auto;">


If you encounter errors, which are common in the course of such complex processes, consider labeling them with the contract name – followed by two underscores. It's a nifty convention that quickly helps identify which contracts throw these errors – for instance, here, 'FundMe contract.'

With these simple steps, you have set up your smart contracts and launched your journey into the innovative world of building decentralized applications!

