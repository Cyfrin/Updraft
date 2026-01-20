# Chainlink Proof of Reserve

Chainlink Proof of Reserve (PoR) is a service that provides automated, real-time verification of asset reserves backing tokenized assets like stablecoins, wrapped tokens, and tokenized commodities. It enables smart contracts to confirm that digital assets are fully collateralized by connecting on-chain applications to both on-chain and off-chain reserve data through a network of decentralized oracle network (DON) nodes.

## Understanding Collateralization

Collateral is an asset of value provided as security for a loan or financial obligation. If the borrower defaults (cannot cover their debt), the collateral can be seized or liquidated to cover the outstanding debt.

In blockchain-based financial services (DeFi), collateralization involves "locking up" digital assets in smart contracts to secure loans or back other digital assets. For example:

- A user might lock ETH as collateral to borrow stablecoins.
- A stablecoin issuer might lock USD in a bank account to back their on-chain tokens.
- A tokenized real-world asset might be backed by physical commodities held in custody.

## What is Proof of Reserve?

Proof of Reserve (PoR) verifies the collateralization of digital assets held by cryptocurrency businesses and platforms. It provides transparency to users and markets through public reserves reporting or independent audits of asset backing.

Traditional reserve verification typically involves lengthy, manual audits conducted by centralized third parties. Chainlink Proof of Reserve revolutionizes this process by creating an automated, transparent, and decentralized standard for off-chain reserve verification of on-chain assets that leverages the security of blockchain technology.

## Why Proof of Reserve Matters

Incidents in the crypto industry have highlighted the risks of centralized exchanges and platforms that operate without transparency. These events demonstrated how the lack of verifiable PoR can lead to:

- Misuse of customer funds.
- Undisclosed leverage.
- Hidden insolvency.
- Market manipulation.

Chainlink PoR addresses these issues by providing continuous, automated verification of reserves, reducing counterparty risk, and helping to protect users from under-collateralized systems.

## How Chainlink Proof of Reserve Works

Chainlink PoR provides smart contracts with automated verification of reserve assets through a decentralized oracle network that operates in several key stages:

1. **Monitors Reserve Addresses**: Chainlink nodes regularly check the balance of designated wallet addresses or smart contracts that hold reserve assets.
   
2. **Verifies Off-Chain Reserves**: Chainlink connects to APIs and other data sources for assets held in traditional financial systems to verify reserves held in custody.
   
3. **Processes Reserve Data**: The decentralized oracle network aggregates reserve information from multiple sources and validates it through consensus mechanisms.
   
4. **Creates Cryptographic Proofs**: The network generates verifiable reports about the state of reserves.
   
5. **Delivers On-Chain Verification**: The verified reserve data is published on-chain, where smart contracts and applications can access it.
   
6. **Enables Automated Actions**: Protocols can implement logic to automatically respond to changes in collateralization ratios, such as pausing minting if reserves fall below requirements.

### Secure Mint Mechanism

Chainlink PoR offers a "Secure Mint" feature that enables asset issuers to programmatically ensure that new tokens are minted only when fully backed by adequate reserves. This mechanism provides cryptographic guarantees, preventing infinite mint attacks and enhancing the security of tokenized assets and stablecoins.

## Technical Implementation

Chainlink Proof of Reserve operates through specialized data feeds powered by the same infrastructure as Chainlink Price Feeds. These PoR feeds:

- Use DONs to collect, validate, and deliver reserve data.
- Can trigger updates based on deviation thresholds or heartbeat intervals.
- Deliver reliable data even during periods of high market volatility or network congestion.
- Implement multiple layers of security to prevent manipulation.

Smart contracts can integrate with these feeds through standardized interfaces, making accessing reserve information straightforward and implementing automated responses based on collateralization levels.

## Key Benefits of Chainlink PoR

- **Enhanced Transparency**: Provides public verification of collateralization in real-time.
- **Reduced Counterparty Risk**: Limits exposure to undercollateralized assets through continuous monitoring.
- **Improved Security**: Decentralized verification prevents manipulation by any single entity.
- **Automated Verification**: Eliminates manual audit processes with algorithmic verification.
- **Market Stability**: Helps prevent sudden collapses due to hidden insolvency.
- **Multi-Chain Support**: Works across various blockchain networks to verify cross-chain assets.
- **Scalability**: Handles verification for various asset types and reserve structures.

## Available Proof of Reserve Feeds

Chainlink PoR Data Feeds monitor reserves for various asset types:

- **Fiat-backed Stablecoin reserves**: Such as [Wenia COPW Reserves](https://data.chain.link/feeds/polygon/mainnet/copw-por) (Colombian Pesos Fiat Currency backed Stablecoin)
- **Treasury Securities backed Stablecoin reserves**: [STBT PoR](https://data.chain.link/feeds/ethereum/mainnet/stbt-por) (US TBills and Repo Agreement backed Stablecoin)
- **Fixed Income Shares**: Backed Finance bIB01 PoR (iShares USD Treasury Bond 0-1yr UCITS ETF)
- **Commodities**: Like gold through [ION Digital Reserves](https://data.chain.link/feeds/avalanche/mainnet/ion-digital-total-reserve) (Gold vault in troy ounces)

## Use Cases

### Stablecoins

Stablecoin issuers use PoR to prove that each token is fully backed by reserves in real time. For example, a USD-backed stablecoin can use Chainlink PoR to verify that for every token in circulation, there is $1 held in reserve accounts. This creates greater trust and stability in the stablecoin ecosystem and helps prevent de-pegging events.

### Wrapped Assets

Protocols that offer wrapped versions of assets (like WBTC for Bitcoin) can verify that each wrapped token is backed 1:1 by the underlying asset. This ensures users can always redeem their wrapped tokens for the original asset and maintains confidence in the wrapped token ecosystem.

### Tokenized Commodities

Projects that tokenize physical assets like gold or silver can prove that these digital tokens are backed by real commodities held in vaults or custody. Chainlink PoR can connect to inventory management systems and custodial records to verify the existence and quantity of these physical reserves.

### Cross-Chain Applications

As blockchain ecosystems become increasingly interconnected, PoR provides critical verification that bridged or wrapped assets maintain proper backing across different networks. This is essential for the security and reliability of cross-chain applications and bridges.

### DeFi Protocols

Lending platforms, synthetic asset protocols, and other DeFi applications can use PoR to monitor collateralization levels and automate responses to maintain system health. For example, a lending protocol might automatically adjust risk parameters based on the verified reserves of a stablecoin used on the platform.

## The Future of Financial Transparency

Chainlink Proof of Reserve represents a significant advancement in financial transparency for digital assets. By providing a reliable, automated, and decentralized standard for reserve verification it helps address one of the critical challenges in the cryptocurrency ecosystem: trust.

As the digital asset market continues to mature, mechanisms like Chainlink PoR will likely become standard requirements for platforms holding user funds, helping to build a more resilient and trustworthy financial system.
