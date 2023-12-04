---
title: DecentralizedStableCoin.sol
---

_Follow along the course with this video._



# Building a Decentralized Stablecoin: Step-by-Step Guide

In this section, we're diving into the exciting world of decentralized finance (DeFi) and going one step ahead by creating our very own stablecoin. We'll be covering everything you need to know to follow along and delve into the world of stablecoins with us.

## What is a Stablecoin?

A stablecoin is a form of cryptocurrency that is pegged to a reserve asset like the US Dollar. The idea behind it is to provide stability in the highly volatile world of cryptocurrencies.

## Forging Ahead with Code

If you're as excited about this project as we are, you can follow along with all the code that we're creating in this tutorial. We have dedicated an entire GitHub repository to the code we'll be building - it's under the [foundry-defi-stablecoin-f23](https://github.com/Cyfrin/foundry-defi-stablecoin-f23) course section. We have big plans for this project, including getting the code audited to ensure its security and reliability.

To follow the updates about this audit, keep an eye on this GitHub repository as we will be posting all audit reports there.

We're diving straight into the nuts and bolts of this project. A lot of the information we'll be going over is likely to be familiar to you if you've done similar projects before. However, we'll also introduce a few new concepts like stateless fuzzing.

## The Architecture of Our Stablecoin

So, before we dive straight into the code, let's take a glance at what our stablecoin's architecture is going to look like. We are building a stablecoin that's one, anchored, meaning it is pegged to the US Dollar. Secondly, our stability mechanism is algorithmic, meaning the process for minting is going to be entirely decentralized - there's no governing entity that is controlling our stablecoins. Lastly, we're using exogenous crypto-assets, specifically Ethereum and Bitcoin, as collateral for our stablecoin.

<img src="/foundry-defi/4-defi-decentralized-stablecoin/defi-decentralized-stablecoin1.png" style="width: 100%; height: auto;">

## Maintaining Our Stablecoin's Value

To ensure that our stablecoin is always worth $1, we have to match it to the dollar's price constantly. We do this using a chainlink price feed. Our program will run a feed from chainlink, and we will set a function to exchange Ethereum and Bitcoin for their equivalent dollar value. This function will help us maintain the stability of our stablecoin.

To make the stability mechanism algorithmic, we will have a condition in our code that only mints the stablecoin if there's enough collateral.

The collateral type, i.e., Ethereum and Bitcoin, is exogenous, meaning, we're only going to accept these two types of cryptocurrencies as collateral. We're going to use the ERC20 version of Ethereum and Bitcoin, also known as wrapped Ethereum (WETH) and wrapped Bitcoin (WBTC).

<img src="/foundry-defi/4-defi-decentralized-stablecoin/defi-decentralized-stablecoin2.PNG" style="width: 100%; height: auto;">

To use this architecture, we create a code that over collateralizes the stablecoin using WETH and Bitcoin as the collateral.

## Pulling up Our Sleeves and Coding Away

With the plan in place, it's time to dive into coding.

Here is a step-by-step guide to creating your own decentralised stablecoin:

### Step 1: Install OpenZeppelin

We begin by installing OpenZeppelin as it provides basic smart contract-building blocks. To do this, we use the following command:

```bash
forge install openzeppelin/openzeppelin-contracts --no-commit
```

Then open up the `foundry TOML` and add the following remappings:

```javascript
remappings = ["@openzeppelin/contracts=lib/openzeppelin-contracts/contracts"];
```

### Step 2: Import Libraries and Contract Functions

Once OpenZeppelin is correctly installed, open up our `DecentralizedStableCoin.sol` contract file where we will import necessary libraries. We start by importing three OpenZeppelin contracts: `ERC20`, `ERC20Burnable` and `Ownable`.

The `ERC20Burnable` contract provides us with a "burn" function, which is essential in maintaining the peg price of our stablecoin, as we'll be burning a lot of tokens. The "burn" function will be overridden by our function.

In contrast, when it comes to the "mint" function, we do not need to override any functions. Instead, we are going to call the "\_mint" function directly.

```javascript
//SDPX-LICENSE-IDENTIFIER:MIT
pragma solidity 0.8.19;

import {ERC20Burnable, ERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DecentralizedStableCoin is ERC20Burnable, Ownable {
    error DecentralizedStableCoin__AmountMustBeMoreThanZero();
    error DecentralizedStableCoin__BurnAmountExceedsBalance();
    error DecentralizedStableCoin__NotZeroAddress();

    constructor() ERC20("DecentralizedStableCoin", "DSC") {}

    function burn(uint256 _amount) public override onlyOwner {
        uint256 balance = balanceOf(msg.sender);
        if (_amount <= 0) {
            revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
        }
        if (balance < _amount) {
            revert DecentralizedStableCoin__BurnAmountExceedsBalance();
        }
        super.burn(_amount);
    }

    function mint(address _to, uint256 _amount) external onlyOwner returns (bool) {
        if (_to == address(0)) {
            revert DecentralizedStableCoin__NotZeroAddress();
        }
        if (_amount <= 0) {
            revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
        }
        _mint(_to, _amount);
        return true;
    }
}
```

That's it! We've now sown the seeds of creating a stablecoin.

It's always a good practice to keep updating and checking your code as you progress. You can run `forge build` to compile the contract and check for any issues or errors. In a little bit, we'll be writing tests and a deploy script.

## Wrapping it up

Voila! With that, we've built the basis our own stablecoin that with be pegged to the US dollar, fully decentralized, and powered by exogenous crypto-assets Ethereum and Bitcoin.

Starting a DeFi project such as this raises numerous possibilities in the world of cryptocurrencies and blockchain technologies. The tools and technologies available to developers today, like Solidity and OpenZeppelin, are making it easier than ever to get started in this exciting field. So whether you are a beginner or a pro-developer, the landscape of stablecoins offers an intriguing opportunity for everyone.

Happy coding!
