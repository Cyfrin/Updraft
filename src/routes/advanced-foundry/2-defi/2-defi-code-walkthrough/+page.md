---
title: DeFi Code Walkthrough
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/G0e-BP0fFjo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Diving into the Codebase for a Decentralized Stablecoin

Welcome to our deep-dive exploration of a pretty robust and interesting codebase! Today, we're unveiling the inner workings of two primary files: `DecentralizedStableCoin.sol` and `DSCEngine.sol`. Both can be found within the SRC folder of our codebase.

<img src="/foundry-defi/2-defi-code-walkthrough/defi-code-walkthrough1.PNG" style="width: 100%; height: auto;">

## A Closer Look at decentralized stablecoin.sol

`DcentralizedStableCoin.sol` is fundamentally a simplistic and minimalistic ERC20. What sets it aside, however, are the more intricate imports such as `ERC20Burnable` and `Ownable`.

The file contains pertinent functions such as the ERC20 constructor, a burn function (removes tokens), and a mint function (prints new tokens). At first glance, it bears striking resemblance to a classic ERC20.

```javascript
constructor() ERC20 ("DecentralizedStableCoin", "DSC") {}

function burn(uint256 _amount) public override onlyOwner{
    uint256 balance = balanceOf(msg.sender);
    if(_amount <= 0){
        revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
    }
    if (balance < _amount){
        revert DecentralizedStableCoin__BurnAmountExceedsBalance();
    }
    super.burn(_amount);
}

function mint(address _to, uint256 _amount) external onlyOwner returns (bool){
    if(_to == address(0)){
        revert DecentralizedStableCoin__NotZeroAddress();
    }
    if(_amount <= 0){
        revert DecentralizedStableCoin__AmountMustBeMoreThanZero();
    }
    _mint(_to,_amount);
    return true;
}
```

## Unraveling the DSCEngine

Our main contract, `DSCEngine.sol`, controls the decentralized stablecoin. This file is brimming with specific functions. It accommodates functionalities such as the depositing and minting of DSC (Decentralized Stable Coin).

Primarily, the stablecoin operates by being collateral-backed, meaning that it's supported by collaterals with existing monetary value. This will be explored in greater detail further into this post.

<img src="/foundry-defi/2-defi-code-walkthrough/defi-code-walkthrough2.PNG" style="width: 100%; height: auto;">

Other functions include the ability to redeem or withdraw your collateral, burn DSC, and liquidate. If you're wondering what liquidation is, don't worry; we'll break that down later.

An individual can also mint DSC if they have sufficient collateral, aside from depositing and redeeming collateral.

## Diving into the Test Folder

<img src="/foundry-defi/2-defi-code-walkthrough/defi-code-walkthrough3.PNG" style="width: 100%; height: auto;">

Our test folder includes unit tests for the engine, the stablecoin, and an Oracle Library. It also contains `mocks`, typical for any project.

We're also going to touch upon two intriguing aspects: fuzz tests and invariant tests. Especially, the introduction to `invariant tests` promises a fascinating journey as these tests discern average solidity developers from advanced ones.

## Scripts

Our scripts are astonishingly straightforward. Their principal purpose is to deploy the stablecoin. Here, we use Chainlink price feeds to gauge the price of underlying collateral.

You can find all the code and necessary information in this repo. However, be prepared, this section is advanced. So, understanding won't be a breeze, but remember, learning is never a race. You're encouraged to ask questions, code alongside, and fully comprehend what we're trying to accomplish.

## The Importance of Stablecoins in DeFi

Before we proceed any further, I would like to mention that the reason for creating a stablecoin is my strong belief that they are pivotal in the universe of DeFi. The current solutions, however, are far from satisfying. Therefore, I hope this venture inspires you to create better, more efficient solutions.

With that said, let's go ahead and understand stablecoins better. Take your time, and keep learning! In the next part we'll be clarifying everything you need to know about stablecoins.
