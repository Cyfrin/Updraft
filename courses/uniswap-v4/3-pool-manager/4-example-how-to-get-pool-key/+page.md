## How to Reconstruct a Uniswap V4 PoolKey from a PoolId

In Uniswap V4, the `PoolId` is a compressed hash derived from a `PoolKey` struct. While this design is efficient for on-chain operations, it presents a challenge: you cannot reverse the hash to recover the original `PoolKey` components. This lesson will guide you through a practical, event-based method to reconstruct a `PoolKey` when all you have is the `PoolId`.

### The Core Concept: Finding Data in On-Chain Events

The key to reconstructing a `PoolKey` lies in understanding how pools are created. The individual components of a `PoolKey`—such as token addresses, fee tier, tick spacing, and hooks—are not stored on-chain in a way that is directly queryable using the `PoolId`. However, this data is not lost; it is broadcast publicly in an event at the moment of the pool's creation.

When a new liquidity pool is created in Uniswap V4, the `initialize` function within the `PoolManager.sol` contract is called. A critical action performed by this function is emitting an `Initialize` event. This event contains all the data required to build the original `PoolKey`.

As seen in the `PoolManager.sol` contract, the event is emitted with all the necessary details:

```solidity
// Inside PoolManager.sol -> function initialize(...)

// ... logic to calculate PoolId and initialize the pool ...

emit Initialize(id, key.currency0, key.currency1, key.fee, key.tickSpacing, key.hooks, sqrtPriceX96, tick);

key.hooks.afterInitialize(key, sqrtPriceX96, tick);
```

This `Initialize` event log is a public record on the blockchain and includes:
*   `id`: The `PoolId` of the newly created pool.
*   `key.currency0`: The address of the first token.
*   `key.currency1`: The address of the second token.
*   `key.fee`: The pool's fee tier.
*   `key.tickSpacing`: The designated tick spacing.
*   `key.hooks`: The address of the pool's hooks contract (or `address(0)` if none).

By finding the specific `Initialize` event that corresponds to your `PoolId`, you can retrieve all the components needed to reconstruct the `PoolKey`.

### The Recommended Method: Querying with Dune Analytics

While you could write a custom script to scan the blockchain for this event, a far simpler and more efficient method is to use Dune Analytics. Dune is a powerful platform that indexes blockchain data, making it easily searchable through standard SQL queries. The platform has already indexed the `Initialize` events from the Uniswap V4 contracts.

To find the data for a specific `PoolId`, you can run a simple SQL query. This query targets the table containing all `Initialize` events and filters it to find the one matching your `PoolId`.

Here is the example query:
```sql
select * from uniswap_v4_ethereum.poolmanager_evt_initialize where id = 0x3ea74c37fbb79dfcd6d760870f0f4e00cf4c3960b3259d0d43f211c0547394c1
```
Let's break this down:
*   `select * from uniswap_v4_ethereum.poolmanager_evt_initialize`: This command selects all columns from the Dune table that stores the `Initialize` event data from the Uniswap V4 `PoolManager` contract on the Ethereum network.
*   `where id = ...`: This clause filters the millions of events to return only the single row where the `id` column matches the `PoolId` you provide.

Running this query on Dune will return a single result containing the `currency0`, `currency1`, `fee`, `tickSpacing`, and `hooks` values for your pool.

### How to Find a Pool's `PoolId`

Before you can query Dune, you first need a `PoolId`. The easiest way to find one is by using the Uniswap user interface.

Let's find the `PoolId` for the ETH / USDC pool on Ethereum as an example:
1.  Navigate to the Uniswap web application.
2.  Select the **Explore** tab to view pools.
3.  Use the filters to specify **Protocol: `v4`** and **Network: `Ethereum`**.
4.  From the list of available pools, click on the one you are interested in (e.g., `ETH / USDC`).
5.  On the pool's detail page, locate the pool's name at the top (e.g., `ETH / USDC`).
6.  Hover your cursor over the name, and a copy icon will appear.
7.  Click the icon to copy the `PoolId` to your clipboard.

With the `PoolId` copied, you can now return to Dune Analytics, paste it into the `where id = ` clause of the SQL query, and run it. The query result will provide you with the complete set of data required to fully reconstruct that pool's `PoolKey`.