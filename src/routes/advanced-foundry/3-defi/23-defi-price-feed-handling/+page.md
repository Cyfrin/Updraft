---
title: Price Feed Handling
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://youtube.com/embed/5k3jTN7EesA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Enhancing Smart Contracts with Handlers and Invariant Testing In DSC Engine

In the smart contract world, it's crucial to simulate the entire lifecycle of our contracts. And to achieve this, handlers are a crucial part of the puzzle. However, their utility extends beyond just handling the DSCEngine. In fact, handlers can effectively simulate any contract we want to test on the blockchain.

When creating handlers, we often interact with various other contracts. Some of these may include the price feed, the WETH (Wrapped Ether) token, and the wrapped Bitcoin token.

## Introducing Price Feed Updates In Our Handler

Given their significant impact on the protocol, it's imperative to incorporate price feed updates in our handler. In order to achieve this feat, we start by importing the MockV3Aggregator.

```js
import { MockV3Aggregator } from "mocks/MockV3Aggregator.sol";
```

The MockV3Aggregator has functions that ease the process of updating a price, allowing our protocol to conveniently update prices. Once we have imported the MockV3Aggregator, we can extract the WETH price from our system using the view function `DSE get collateral token price feed()`.

We can now declare a new public `ethUsdPriceFeed` variable of type `MockV3Aggregator`. Your constructor should look something like this:

```js
...
import { MockV3Aggregator } from "mocks/MockV3Aggregator.sol";
...
contract Handler is Test {
    ...
    MockV3Aggregator public ethUsdPriceFeed;
    ...
    constructor(DSCEngine _dscEngine, DecentralizedStableCoin _dsc){
        ...
        ethUsdPriceFeed = MockV3Aggregator(dsce.getCollateralTokenPriceFeed(address(weth)));
        ...
    }
}
```

Now that we successfully have the ETH USD price feed, it's time to include a new function in our handler. This will involve updating the collateral price to a given price feed.

```js
function updateUpdateCollateral(uint96 newPrice) public {...}
```

Next, we need to convert the uint96 to an int256 because price feeds intake int256 data types, then we use this `newPriceInt` to update the price in our `ethUsdPriceFeed`:

```js
function updateUpdateCollateral(uint96 newPrice) public {
    int256 newPriceInt = int256(uint256(newPrice));
    ethUsdPriceFeed.updateAnswer(newPriceInt);
}
```

And voilà! We now have a function that updates the collateral price in our handler.

## Testing the Handler

Once our handler is complete, it's time to test it to see how it fares. Will it run smoothly or encounter some errors?

When we do run it, you may find it detected a sequence where there was an issue. It indicates a violation of our invariant: the total supply doesn't add up to the sum of the WETH value and Bitcoin value.

On further inspection of the sequence, we discover a process: first, it deposited some collateral, followed by minting some DSC. Then, it updated the collateral price to a certain value, say 471. This changed the ETH collateral from its existing rate to 471, an immense difference which caused the system to revert. It had minted a humongous amount of DSC which broke the system.

This is a crucial reminder of the importance of volatility in our system. Our system can easily get busted if the price of an asset plummets or spikes swiftly. So, handling price fluctuations becomes pivotal in maintaining the integrity of the protocol.

<img src="/foundry-defi/23-defi-price-feed-handling/defi-price-feed-handling1.PNG" style="width: 100%; height: auto;">

Therefore, it becomes impetrative to revisit our assumptions and protocols when designing the system. For instance, we assumed a liquidation bonus of 10%, and that the collateral always needs to be 200% over collateralized. In case the price drops significantly, resulting in let's say just 50% collateralization, our system breaks and the invariant gets compromised.

Therefore, we should either brainstorm ways to prevent such drastic reductions in collateralization, or acknowledge that this is a recognized loophole, where the protocol can turn worthless if the price fluctuates wildly. While neither seems to be a satisfactory solution, these are challenges we need to keep in mind, thereby proving the supreme importance of invariant tests.

<img src="/foundry-defi/23-defi-price-feed-handling/defi-price-feed-handling2.PNG" style="width: 100%; height: auto;">

## Wrapping Up

There's an exciting journey awaiting us ahead. We have to learn about proper Oracle use and write many more tests (a task we leave up to you!). We also need to prepare ourselves for a smart contract audit. All of this, while juggling with our existing contracts like the decentralized stablecoin.

It's an exhilarating journey that is all about continuous learning, discovery, and improvements! Stay tuned for more exciting updates in our upcoming blogs.
