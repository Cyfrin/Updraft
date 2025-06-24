# Chainlink Data Feeds

In this Section, we will learn about Chainlink Data Feeds.

Here are some reference resources on Data feeds:
- [Using Data Feeds | Chainlink Documentation](https://docs.chain.link/data-feeds/getting-started)
- [Developer Hub | Data](https://dev.chain.link/products/data)

## Chainlink Data Feeds Fundamentals

Chainlink Data Feeds allow you to fetch real-world data such as asset prices, reserve balances, and L2 sequencer health and use that data in your smart contract.

Data feeds provide many different types of data for your applications:

- [**Price Feeds**](https://docs.chain.link/data-feeds#price-feeds): aggregated source crypto-asset prices.
- [**SmartData Feeds**](https://docs.chain.link/data-feeds#smartdata-feeds): a suite of onchain data offerings designed to unlock the utility, accessibility, and reliability of tokenized real-world assets (RWAs)
- [**Rate and Volatility Feeds**](https://docs.chain.link/data-feeds#rate-and-volatility-feeds): data for interest rates, interest rate curves, and asset volatility.
- [**L2 Sequencer Uptime Feeds**](https://docs.chain.link/data-feeds#l2-sequencer-uptime-feeds): Identify if an L2 sequencer is avaiable. 

## Data Feed Components

Data Feeds include the following components:

- **Consumer**: A consumer is an on-chain or off-chain contract that uses (i.e., consumes) Chainlink services (e.g., Data Feeds). For Data Feeds specifically, on-chain Consumer smart contracts use Chainlink’s [AggregatorV3Interface](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol) to interact with the Chainlink Data Feed on-chain contracts and retrieve information from the smart contract that’s aggregating the relevant data. The Consumer contract is the smart contract that _you_ design and implement to use Chainlink services. For a complete list of functions exposed in the AggregatorV3Interface, see the [Data Feeds API Reference](https://docs.chain.link/data-feeds/api-reference).

- **Proxy Contract**: Proxy contracts “point” to the correct aggregator contract that received data for a particular Data Feed. Using proxies enables the underlying aggregator to be upgraded without any service interruption to consuming contracts. The proxy will point to the new contract, and nothing changes for the consuming contract. The [EACAggregatorProxy.sol](https://github.com/smartcontractkit/chainlink/blob/contracts-v1.0.0/contracts/src/v0.6/EACAggregatorProxy.sol) contract on GitHub is a common example.

- **Aggregator Contract**: An aggregator is a smart contract managed by Chainlink that receives periodic data updates from the Chainlink decentralized oracle network. Aggregators store aggregated data on-chain so consumers can retrieve it and act upon it within the same transaction. They also make the data transparent and publicly verifiable. For a complete list of functions and variables available on most aggregator contracts, see the [Data Feeds API Reference](https://docs.chain.link/data-feeds/api-reference).
