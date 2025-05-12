# Chainlink Price Feeds

Chainlink Price Feeds are a specific type of decentralized data feed provided by the Chainlink network, designed to deliver reliable, tamper-proof price data for assets such as cryptocurrencies, commodities, and other financial instruments.
Price Feeds empower smart contracts to act on important, real-time data such as asset prices and market data. This is especially true in [DeFi](https://www.cyfrin.io/glossary/decentralized-finance-defi) applications, where accurate and timely pricing information is critical to providing a trust-minimized and efficient alternative to traditional finance.

## Common Use Cases

**DeFi Protocols**: Chainlink Price Feeds are used by various DeFi platforms like Aave and Compound to determine real-time asset prices for lending, borrowing, trading, and other financial services. For example, the lending and borrowing platform [AAVE](https://aave.com/) uses Data Feeds to help ensure loans are issued at fair market prices and that loans are sufficiently collateralized at all times.

**Stablecoins**: Price Feeds help maintain stablecoins' peg by providing accurate market values of assets used to “back” the stablecoin.

**Derivatives and Prediction Markets**: Chainlink Price Feeds are used to settle derivatives contracts and provide real-time market data for prediction markets. You will learn more about these later.

## Find Available Chainlink Data Feeds
Asset prices are presented in asset pairs, as the value of one asset is expressed in relation to another (e.g., 1 USD is worth 0.89 Euro, and so on). You can get the pairs and chains where Data Feeds are available at https://data.chain.link/. Note that Data Feeds are similar but not the same as Data Streams. Data streams will be covered later on in this course.

::image{src='/chainlink-fundamentals/3-oracles-and-chainlink-data-feeds/assets/get-started-data-feeds.png' style='width: 100%; height: auto;' alt='get-started-data-feeds'}

You must know the feed’s on-chain address to get information from a Data Feed.

[Full list of Chainlink Data Feeds Contract Addresses](https://docs.chain.link/docs/reference-contracts)
