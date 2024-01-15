---
title: Refactoring III - Mocking (continued)
---

_Follow along with this video._



---

In this lesson, we're going to examine a useful technique to create network-agnostic smart contracts. This practice can substantially aid in making your contracts more flexible and easily deployable across multiple networks.

## Codifying the Process

The logic we'll use here revolves around accessing the ​’ActiveNetwork activenetworkconfig' - a price feed we've already established. In our scenario, the guiding condition is whether this feed equals the zero address or not. Here's the snippet of code, we'll focus on:

```js
if(activeNetworkConfig.priceFeed != address(0) {
    return ActiveNetworkConfig;
}
```

This segment dictates that we check if the price feed has been initialized yet (i.e., equipped with an address not equal to address zero). If so, we have the green light to return and halt the running process, because no new deployment is needed.

## Naming Conventions in Solidity

An issue with the function managing this operation is the naming convention; it doesn't clearly denote its duties. The function doesn't just "get" the configuration, it "creates" them as well. Therefore, "getOrCreateAnvilETHConfig()" is a more accurate and more descriptive name.

<img src="/foundry-fund-me/12-refactoring-mocks2/refactor1.png" style="width: 100%; height: auto;">

Once we have edited this function and put the mechanism into action, we can observe that tests, which would previously fail due to a missing contract, now run without any hassle. This success is because the helper configuration deploys a 'pseudo' price feed which successfully responds to our requests.

## Testing and Results

There's an exciting aspect of the testing process to mention too:

Typically, if you're using chain forking, you need to perform an API call to fetch the most recent state of the forked chain. This process significantly slows down the operation. However, with our new function, we can bypass this step and dramatically expedite the testing process.

<img src="/foundry-fund-me/12-refactoring-mocks2/refactor2.png" style="width: 100%; height: auto;">

This streamlined test represents a massive breakthrough, demonstrating how we've made the smart contract network agnostic — able to be deployed on any given network effortlessly.

## Concluding Thoughts and a Job Well Done

As I always say, honing these skills will make you an absolute standout in the world of Solidity developers. Your understanding of network-agnostic techniques won't just make you a competent smart contract developer, but will elevate the industry standard for smart contract development.

To pat you all on the back, you've indeed learned something of massive significance here! However, the journey is far from over, and there's still much more to come.

Remember, if any of this seems too much, make use of the course resources at hand and lean on the community forums for support. Your active participation will not only help you but will assist others as well.

Stay excited, keep learning, and I am looking forward to our next tutorial. Until then, happy coding!
