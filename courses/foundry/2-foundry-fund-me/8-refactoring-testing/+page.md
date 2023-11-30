---
title: Refactoring I - Testing Deploy Scripts
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/bhIb0Jf2qRk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Did you know that the way you code your smart contracts could cause unnecessary work if you intend to switch chains? Many developers, particularly those familiar with the Solidity development suite, have found themselves enslaved by hardcoded contracts. Sure, they might work perfectly for Sepolia (the current chain of deployment) but they are incredibly restrictive for future use.

What happens when you need to switch chains? A total overhaul of your code base, strenuous updates to all the addresses involved...it could take a lot of time and effort to get everything working correctly. In this lesson, we're going to explore an alternative approach to deploying smart contracts. We want to say goodbye to hardcoding and maintenance chaos, and say hello to _modular deployments_.

This reframed approach to deployment allows us to reference addresses and external systems dynamically. This means that we could potentially move our contracts from network to network with ease. Sure, it will require some refactoring, but in the end, it's going to make our lives a lot easier.

## Refactoring Your Core Code

Let's dive into our core code and decouple its dependency on Sepolia.

To avoid hardcoding the address of the contract, we're going to pass it as a constructor parameter each time we deploy the contract.

Here's how we can achieve this:

```js
constructor(address priceFeed) {
    s_priceFeed = AggregatorV3Interface(priceFeed);
}
```

This approach means we can adjust the address to match the network we're currently using for deployment. This refactor is essentially reworking the architecture of the code without altering its functionality. It’s a crucial practice among engineers to keep their code maintainable. The addition of a new aggregator interface variable in the state and storage variables, s_priceFeed, provides a place where the address can live after it's passed into the constructor.

This makes it much easier to reference, especially when we want to deploy on different chains. With this refactor, you're no longer hard-coding the address and can instead call the version function directly on your price feed variable.

```js
return s_priceFeed.version();
```

## Updating The Price Converter

We also need to update our price conversion functions to accept an additional parameter: the price feed address passed during deployment.

```js
function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256){
    (,int256 answer,,,) = priceFeed.latestRoundData();
    return uint256(answer * 10000000000);
}

function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256){
    uint256 ethPrice = getPrice(priceFeed);
    uint256 ethAMountInUsd (ethPrice * ethAmount) / 1000000000000000000;
    return ethAMountInUsd;
}
```

Within these functions, we simply replaced the hardcoded price feed object with the one passed into the function.

Having a modular approach to deployment makes it possible to deploy contracts to different networks easily, explore different testing environments, and maintain a maintainable and less error-prone code base throughout.

## All's Well That Deploys Well

By exploring modular deployments, we've been able to overhaul our code architecture and streamline the deployment and testing of our smart contracts across different chains more efficiently.

However, refactoring is not without challenges. The modifying of the funder address in our test case from address(this) to msg.sender caused an initial hiccup upon testing. After fixing this, our tests passed.

<img src="/foundry-fund-me/8-refactor/refactor1.png" style="width: 100%; height: auto;">

The ability to refactor your code for a more flexible, modular deployment system is a skillset that sets you apart from the average solidity developer. There's a bit of a learning curve, but the payoff is enormous both in terms of versatility and maintainability.

So great job on making it this far. I'm excited for you as you continue to expand your developer toolkit!

Now go out, experiment, refactor, test, and innovate. The world of solidity development is at your fingertips.
