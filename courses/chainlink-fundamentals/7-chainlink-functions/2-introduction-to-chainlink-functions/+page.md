# Introduction to Chainlink Functions

## What is Chainlink Functions?

Chainlink Functions provides smart contracts access to trust-minimized off-chain compute infrastructure, enabling them to fetch data from external APIs and perform custom computation off-chain. 

This service bridges the gap between blockchain applications and external data sources, expanding the capabilities of smart contracts beyond the blockchain environment.

## Chainlink Functions Benefits

**API Connectivity**: Chainlink Functions enables smart contracts to connect with any traditional Internet-based public API, aggregate and transform the data fetched from APIs, and then return values on-chain. Without Chainlink Functions, smart contracts are effectively incapable of accessing any data that exists outside of the blockchain. Not being able to access the broader world of data severely limits the functionality of smart contracts.

**Custom Computation**: Users can run custom JavaScript code to supplement the computations done by their smart contract. With this feature, code that would otherwise be costly or slow to run on the blockchain can be “moved” to an off-chain “serverless” compute environment. The result: decentralized applications are more economical and efficient. Developers can focus on application logic rather than infrastructure management.

**Decentralized Infrastructure**: Chainlink Functions are supported and executed on the Chainlink-powered [decentralized oracle networks (DONs)](https://chain.link/education/blockchain-oracles). DONs are a [decentralized network](https://chain.link/education/blockchain-oracles#decentralized-oracles) of nodes that perform computations securely by retaining the cryptographic benefits of blockchain technology. Decentralization reduces the dependence on and vulnerability to centralized infrastructure that defines traditional web-based services. This setup enables smart contracts to access off-chain data and perform complex calculations without the vulnerability of relying on a single source of computation.

**Off-chain Computation**: Chainlink Functions operates through the DON, where each node executes user-provided JavaScript code in a serverless environment. The results from these executions are aggregated using Chainlink’s [Offchain Reporting (OCR) Protocol](https://docs.chain.link/architecture-overview/off-chain-reporting). This consensus step ensures the final result is secure, trust-minimized, and consensus-driven. In other words, DONs provide blockchain benefits without the blockchain costs.

## How Chainlink Functions Works

The process follows a request-and-receive pattern:

1. **Request Initiation**: Your smart contract sends JavaScript source code (either computation or an API request) in a request.
2. **Distributed Execution**: Each node in the DON independently executes the code in a secure serverless environment.
3. **Result Aggregation**: The DON aggregates all the independent return values from each execution.
4. **Response Delivery**: The final consensus result is returned to your smart contract.

This decentralized approach ensures that a minority of nodes cannot manipulate the response, providing robust security for your applications.

## Key Features

### Decentralized Computation

The service provides decentralized off-chain computation and consensus, securing the integrity of returned data using the DON.

### Threshold Encryption for Secrets

The service allows you to include secret values (such as API keys) in your request using threshold encryption. These secrets can only be decrypted through a multi-party computation decryption process requiring participation from multiple DON nodes, protecting sensitive information while enabling access to authenticated APIs.

### Subscription-Based Payment Model

You fund a Chainlink Functions subscription with LINK tokens to pay for Chainlink Functions requests. Your subscription is billed only when the DON fulfills your requests, providing a straightforward payment mechanism.

## When to Use Chainlink Functions

Chainlink Functions enables a variety of use cases:

- **Public Data Access**: Connect smart contracts to external public data, e.g., weather statistics for parametric insurance or real-time sports results for dynamic NFTs.
- **Data Transformation**: Perform calculations on data, e.g., to calculate sentiment analysis from social media data or derive asset prices from Chainlink Price Feeds.
- **Authenticated API Access**: Connect to password-protected data sources, from IoT devices like smartwatches to enterprise resource planning systems.
- **Decentralized Storage Integration**: Access data from IPFS or other decentralized databases for off-chain processes or low-cost governance systems.
- **Web2-Web3 Integration**: Build complex hybrid smart contracts that interface with traditional web applications.
- **Cloud Services Connection**: Fetch data from Web2 systems like AWS S3, Firebase, or Google Cloud Storage.

## Important Considerations

- **Self-Service Solution**: Users are responsible for independently reviewing any code and API dependencies submitted in requests.
- **User Responsibility**: Neither Chainlink Labs, the Chainlink Foundation, nor Chainlink node operators are responsible for unintended outputs due to issues in your code or API dependencies.
- **Data Quality**: Users must ensure that data sources specified in requests are of sufficient quality and are available for their use case.
- **Licensing Compliance**: Users are responsible for complying with licensing agreements for all data providers accessed through Chainlink Functions.
