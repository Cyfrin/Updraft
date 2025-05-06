## Understanding GMX: A Decentralized Perpetual Exchange

GMX is a decentralized platform designed for trading popular cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), and Avalanche (AVAX) using perpetual contracts. As a decentralized exchange (DEX), GMX allows you to trade directly from your own cryptocurrency wallet, ensuring you maintain control and self-custody of your assets. The platform focuses on perpetual contracts, which are derivatives that don't have an expiration date, enabling traders to speculate on price movements with significant leverage.

## Leveraged Trading on GMX

One of the core features of GMX is leveraged trading. This allows users to amplify their exposure to price movements beyond their initial capital. You can open two types of positions:

*   **Long Positions:** Betting that the price of an asset will increase.
*   **Short Positions:** Betting that the price of an asset will decrease.

GMX offers leverage up to 100x, meaning you can open a position worth up to 100 times your deposited margin. While this significantly magnifies potential profits, it equally increases the risk of potential losses.

## Swapping Tokens with Market and Limit Orders

Beyond perpetual trading, GMX also facilitates straightforward token swapping. Users can exchange one cryptocurrency for another directly on the platform. GMX supports two primary order types for swaps:

*   **Market Orders:** These orders execute immediately at the best currently available market price.
*   **Limit Orders:** These orders allow you to specify a minimum price (for selling) or maximum price (for buying) at which you are willing to trade. The order will only execute if the market reaches your specified price or a better one.

## Generating Yield with GMX V2 Liquidity Provision

For users less focused on active trading, GMX V2 provides opportunities to potentially earn yield by contributing liquidity to the platform. This involves depositing assets into specific pools that facilitate trading activity. There are two main ways to provide liquidity:

*   **GM Pools (Global Market Pools):** These pools are designed to support trading for a *single* market pair (e.g., BTC/USD). Each GM Pool is backed by specific accepted collateral tokens (often listed alongside the pool name, like WBTC or tBTC for a Bitcoin pool). Liquidity providers earn fees from the trading activity within that specific market.
*   **GLV Vaults (Global Liquidity Vaults):** GLV Vaults represent a higher-level abstraction. They are essentially *collections* of underlying GM Pools, enabling yield generation across *multiple* markets simultaneously. By providing liquidity to a GLV Vault (e.g., GLV [WETH-USDC]), you are effectively distributing liquidity across the various GM Pools contained within it, potentially optimizing for yield across different trading pairs.

## Understanding GMX's Two-Step Transaction Process

A unique technical characteristic of GMX is its two-step transaction process for key actions like swapping, opening/closing positions, and providing/removing liquidity. Instead of a single blockchain transaction confirming the action, GMX splits it into two:

1.  **Request Transaction:** The user initiates and signs a transaction from their wallet. This transaction acts as a *request* submitted to the GMX protocol, signaling their intent to perform a specific action (e.g., open a long position).
2.  **Execution Transaction:** The GMX protocol's infrastructure picks up this request and executes the intended action in a *separate, subsequent* blockchain transaction.

## How GMX Mitigates MEV (Maximal Extractable Value)

The primary reason for implementing the two-step transaction process is to protect users from Maximal Extractable Value (MEV), particularly front-running attacks.

MEV refers to the maximum value that can be extracted from block production beyond the standard block reward and transaction fees. In the context of DEXs, malicious actors (often called MEV bots or searchers) monitor pending transactions in the mempool. If GMX used a single-step process, a bot could see a user's large trade order before it's confirmed. The bot could then submit its *own* transaction with a higher gas fee to be executed *just before* the user's trade (front-running). This could slightly worsen the execution price for the user, allowing the bot to profit from the price impact.

By separating the user's request from the protocol's execution, GMX introduces a buffer. The protocol controls the timing and sequencing of the final execution transaction, making it significantly harder for MEV bots to reliably front-run user trades and thereby protecting users from this form of value extraction.

## Adaptive Funding Fees Explained

Funding fees are a standard mechanism in perpetual contract markets, including GMX, designed to keep the contract's trading price closely aligned with the underlying asset's spot or index price. These fees are exchanged periodically between traders holding long positions and those holding short positions.

GMX employs an *adaptive* funding fee mechanism. The direction and magnitude of the funding fee payment adjust *gradually* based on the balance (or imbalance) between the total size of open long positions and open short positions on the platform:

*   **If longs outweigh shorts:** There's more demand to bet on price increases. Typically, traders holding long positions will pay a funding fee to those holding short positions.
*   **If shorts outweigh longs:** There's more demand to bet on price decreases. Typically, traders holding short positions will pay a funding fee to those holding long positions.

This adaptive mechanism incentivizes traders to take positions that help balance the open interest, pushing the contract price back towards the index price whenever a significant deviation occurs. The "adaptive" nature means the fee changes smoothly over time rather than abruptly, responding dynamically to shifts in market sentiment as reflected in the long/short ratio.