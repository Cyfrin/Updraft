## Oracles and Chainlink

We are going to learn about oracles and Chainlink and how to bring real-world data into our smart contracts.

Blockchains are deterministic systems, meaning they can't interact with real-world data and events on their own. They can't know what the value of ETH is, they can't know if it's sunny outside, or what the temperature is. They also can't do any external computation.

This is known as the smart contract connectivity problem or the oracle problem. This is bad news because we want our smart contracts to replace traditional agreements. And traditional agreements need data, and they need to interact with the real world.

This is where Chainlink and blockchain oracles come into play. A blockchain oracle is any device that interacts with the off-chain world to provide external data or computation to smart contracts.

However, the whole story doesn't end there. If we use a centralized oracle, we are reintroducing a point of failure. We've done all this work to make our logic layer decentralized, but if we get our data through a centralized node or through a centralized API, or we decide we want to make the API call ourselves, we are reintroducing these trust assumptions that we've worked so hard to get rid of. We're essentially ruining the entire purpose of building a smart contract. So we don't want to get our data, or do external computation, through centralized nodes. Those are bad news.

Chainlink is the solution here. Chainlink is a decentralized oracle network for bringing data and external computation into our smart contracts.

As we mentioned before, this gives rise to these hybrid smart contracts, which combine on-chain and off-chain to make incredibly feature-rich, powerful applications.

Chainlink is a modular decentralized oracle network that can be customized to deliver any data or do any external computation that you like.

So, for example, a lot of people might just say, "Oh, well I can just make an API call to, you know, a data provider to get the pricing information on my smart contract." However, blockchain nodes can't actually make these API calls. You can't make like an HTTP GET, if you're familiar with that, HTTP GET. You can't make an HTTP GET call because the different Ethereum nodes, the different blockchain nodes, would not be able to reach consensus about what the result of that API call even is. Additionally, this is a huge centralization vector and kind of defeats the purpose of smart contracts in the first place.

So instead, we need a decentralized network of nodes to get us this data for us.

Now, Chainlink networks can be completely customized to bring any data or any external computation that you want. However, doing the customization can be a little bit extra work. There are a ton of Chainlink features that come out of the box, completely decentralized, ready to plug-and-play into your smart contract applications.

What are those features? The first one is going to be Chainlink Data Feeds. And, that's the one we're actually going to be using for our application here. Chainlink Data Feeds currently, at the time of recording, are powering over $50 billion in the DeFi world.

The way they work is a network of Chainlink nodes gets data from different exchanges and data providers and brings that data through a network of decentralized Chainlink nodes. The Chainlink nodes use a median to figure out what the actual price of the asset is, and then deliver that in a single transaction to what's called a reference contract, a price feed contract, or a data contract, on-chain, that other smart contracts can use. And then, those smart contracts use that pricing information to power their DeFi application.

You can see an example at data.chain.link. And you can change networks, you can change price feeds, you can change a whole bunch of information to see some of those popular price feeds.

Let's look at ETHUSD, for example.

On ETHUSD, we can see this whole network of independent Chainlink node operators that are each getting different answers for the price of ETHUSD. They're getting aggregated by the network and then delivered on-chain. We can see how often they're updated. These ones are updated for a 0.5 deviation threshold, or a few hour heartbeat, whichever one hits first. We can see when the last update was. We can see the number of oracle responses, etc.

We can see the contract address directly on-chain.

We can even look at the contract on Etherscan.

We can see some of the history. We can see all the responses of the different oracles.

And then, at the bottom, we can see the different users and sponsors keeping this network up.

Similar to transaction gas, whenever a node operator delivers data to a smart contract, the Chainlink node operators are paid a little bit of oracle gas in the Chainlink token. Right now, these users of the protocol are sponsoring keeping these feeds up, and are paying the oracle gas associated with delivering this data on-chain.

We can take a look at an example over at docs.chain.link. The solidity docs have the solidity example directly in them, but if you scroll down you can also see some Vyper examples or, if you click this little README, it will bring you to the Vyper edition of the Chainlink starter kit, which will show you how to make a price feeds using Vyper.

We are going to walk you through a little demo. This is in solidity, so you can ignore the exact code, but the process will be essentially the same.

Now, the docs are probably going to look very different by the time you actually start looking at them because they change the docs pretty frequently. So an easy way to get started here is maybe go to docs.chain.link, and then over either on developer hub, or overview, go to data feeds. And this is where you can see most of what you need in the getting started section of the documentation.

We can see an example of an art contract that uses and reads from one of these Chainlink price feeds.

**Code:**

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02AD2366d30baCb125266AF641031331
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02AD2366d30baCb125266AF641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

We can even open up this up in Remix and work with it in Remix. It looks like this example is running from a price feed on Kovan. The reason we are actually going to use a testnet to see this work is that there's a set of Chainlink nodes monitoring the testnet to show you exactly how this works out.

Once we get deeper into the course, we'll show you how to actually run tests and work with Chainlink nodes without actually being on a testnet, which will make your development much faster. But I highly recommend walking through this section along with me so that you can see first-hand how this actually works.

So let's go ahead to faucets.chain.link /kovan We're going to switch to the Kovan network.

We're going to get some Kovan ETH, but remember, look at the network flag, and use whatever network is in the documentation.

**Terminal:**

```bash
faucet.chain.link/kovan
```

We're going to turn off test LINK; we'll just stay with ETH. I'm not a robot.

And then send request. Once our Kovan ETH has reached our wallet, we can go ahead and close. And, we can take a look in our wallet and see that we do indeed have 0.1 ETH on Kovan.

Now, let's go back to our Remix. We'll compile this contract.

We'll go and deploy this on injected Web3.

And again, the reason we are going to use injected Web3, instead of Javascript VM, is that there's no network of Chainlink nodes watching our little fake Javascript VM. There are a network of Chainlink nodes watching the testnet.

So we'll scroll down. We'll switch contract to the PriceConsumerV3.

We'll hit deploy. MetaMask will pop up, and after a brief delay, we can see our PriceFeedConsumer down here, and we can hit get the latest price, which shows us the latest price of Ethereum in terms of USD. You may be wondering why the number looks so weird. That seems like a really large number for the price of Ethereum in terms of USD, and this is because decimals don't actually work so well in Solidity. And we'll get to that in a little bit.

There's a decimals flag associated with this PriceFeed address that tells us how many decimals to include with this price. It's also in the documentation. However, I know that this one has eight decimals. So, this is saying the value of Ethereum right now is 3,262.

It may, of course, be different when you go ahead and try this.

Now there's a number of things that happen in this contract that I'll explain in our fund me example. But if you want to take a look now and see if you can figure out what's going on, I recommend you do so. Price feeds are one of the most powerful out-of-the-box decentralized features you can use in your smart contract to level them up, especially for decentralized finance.

If you're looking for different addresses of different price feeds, you can check the contract addresses section of the documentation, choose the network that you want, and then scroll down and then look some of the different addresses of the different price feeds. For example, this address will give you the price of 1inch token in terms of ETH.

This address will give you the price of the Apple stock in terms of USD, and so on and so forth. You can see a lot of the different Chainlink functionalities and tools, and services in the DevHub, or, aka, the docs of Chainlink. One of the newest and coolest ones that we have a section on in this little course is Chainlink CCIP or cross-chain interoperability protocol, which is a way to do token transfers across different blockchains, which, as of today, is a big issue, but you'll learn about that much later.
