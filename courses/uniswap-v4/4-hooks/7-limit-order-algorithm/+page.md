## Implementing Gas-Efficient Limit Orders with Uniswap V4 Hooks

Automated Market Makers (AMMs) like Uniswap have revolutionized token swaps, but executing traditional limit orders—orders to buy or sell an asset at a specific price—has remained a challenge. Naive implementations often suffer from prohibitively high gas costs, especially when processing many orders. This lesson introduces a sophisticated and gas-efficient algorithm for implementing limit orders using Uniswap V4 hooks, centered around a "slots of buckets" data structure.

### Understanding Price Ticks and Liquidity

Before diving into the algorithm, it's essential to grasp the relationship between liquidity and price in a Uniswap V3 or V4 pool. Let's use an ETH/USDC pool as an example. The liquidity in the pool is separated by the current price, which is represented by a discrete price point called a **tick**.

*   **Liquidity to the left (lower prices):** This consists of Currency 1 (USDC), ready to buy Currency 0 (ETH) if the price of ETH drops.
*   **Liquidity to the right (higher prices):** This consists of Currency 0 (ETH), ready to be sold for Currency 1 (USDC) if the price of ETH rises.

When a swap occurs, the price moves across these ticks, consuming and converting liquidity as it goes.
*   If the price of ETH **decreases**, the current tick moves left. USDC is spent to buy ETH, converting USDC liquidity into ETH liquidity.
*   If the price of ETH **increases**, the current tick moves right. ETH is sold for USDC, converting ETH liquidity into USDC liquidity.

This mechanism is the foundation for creating limit orders.

### Modeling a Limit Order as Concentrated Liquidity

A limit order can be cleverly implemented by providing liquidity within a very narrow price range—specifically, within a single tick range.

For instance, to create a limit order to buy ETH at or below 3,000 USDC, a user can provide USDC as concentrated liquidity in the tick range immediately below the 3,000 USDC price tick. If a large sell-off of ETH occurs, driving the market price down and across this tick, the user's provided USDC is automatically swapped for ETH. The limit order is now filled.

### Aggregating Orders with the "Bucket" Concept

While creating a unique liquidity position for every single limit order is possible, it's not scalable. Processing thousands of individual positions would be incredibly expensive. The first layer of our optimization is to group all limit orders at the same price tick into a single entity called a "bucket."

Imagine Alice, Bob, and Carol all want to buy ETH at `1 ETH = 3,000 USDC`.
*   Alice places an order for 50 USDC.
*   Bob places an order for 50 USDC.
*   Carol places an order for 100 USDC.

Instead of creating three separate liquidity positions, our hook contract aggregates these into a single bucket totaling 200 USDC. This bucket is added to the pool as one liquidity position managed by the hook. When the price crosses the 3,000 USDC tick, the entire 200 USDC is converted to ETH. The hook is then responsible for tracking that Alice is owed 25% of the resulting ETH, Bob 25%, and Carol 50%.

This aggregation drastically reduces the number of on-chain liquidity positions, but we still need an efficient way to process the bucket once it's filled.

### The "Slots of Buckets" Algorithm for State Management

The core innovation for achieving gas efficiency is the "slots of buckets" algorithm. This data structure allows the hook to process a filled bucket containing thousands of individual orders with a single, low-cost state change, avoiding expensive loops.

The structure works by creating an array-like series of "slots" for each unique bucket (identified by the pool, the price tick, and the trade direction).

*   **Old Slots (Filled Buckets):** Slots with lower indices (e.g., Slot 0, Slot 1) contain orders that have already been filled. Their liquidity has been converted from one asset to the other.
*   **Latest Slot (Unfilled Bucket):** The slot with the highest index (e.g., Slot 3) is the active, unfilled bucket. All new limit orders for this price tick are added here.

Here is how the algorithm works in practice:

#### Step 1: Placing an Order

A user places a limit order by calling a function on the hook contract. The contract adds the user's funds (e.g., USDC) to the bucket in the **latest slot** for that specific price tick. It also records the user's address and their contribution amount within that bucket's data.

#### Step 2: Processing a Swap with the `afterSwap` Hook

When a swap moves the price across a tick containing a limit order bucket, the liquidity in the latest slot is converted (e.g., USDC becomes ETH). The Uniswap V4 protocol then triggers the `afterSwap` hook. Inside this hook, our contract performs two highly efficient actions:

1.  **Increment the Slot Counter:** Instead of iterating through all orders in the filled bucket, the contract simply increments the `latest_slot` counter for that price tick. If Slot 3 was the latest, Slot 4 now becomes the new, active slot for future orders. Slot 3 is now officially marked as "filled."
2.  **Remove Liquidity:** The hook makes a single call to the pool to remove the entire liquidity position from the now-filled Slot 3. This liquidity, now in the form of the desired asset (ETH), is held by the hook contract.

This design is exceptionally gas-efficient. Filling a bucket with 10 or 10,000 orders costs the same: a single storage write to update the slot counter and one liquidity removal operation.

#### Step 3: Claiming Filled Orders

After their order is filled, users can call a `claim` function on the hook contract. To do this, the user specifies the bucket (by its price tick) and the slot number their order was in. The contract then calculates the user's pro-rata share of the resulting assets based on their initial contribution percentage to that bucket and transfers the funds to them. For example, since Alice contributed 25% of the liquidity in her bucket, she can claim 25% of the ETH received when that bucket was filled.

### Required Data Structures and State

To implement this algorithm, the hook contract requires specific data structures and state variables.

A `Bucket` struct is needed to track the state of each slot:
```solidity
struct Bucket {
    // Amount of token0 received after the swap is filled
    uint256 amount0;
    // Amount of token1 received after the swap is filled
    uint256 amount1;
    // The total liquidity provided by all users in this bucket
    uint256 total_liquidity;
    // A mapping to track each user's individual contribution
    mapping(address => uint256) liquidity_per_user;
}
```
Each unique set of slots is identified by a `bucket_id`, typically generated by hashing the pool identifier, the price tick, and the trade direction: `keccak256(pool_id, lower_tick, zero_for_one)`.

The contract maintains the following state variables:

1.  `slots`: A mapping from a `bucket_id` to its latest, unfilled slot index. This is the counter that is incremented in the `afterSwap` hook.
    `mapping(bytes32 bucket_id => uint256 latest_slot)`

2.  `buckets`: A nested mapping that stores the `Bucket` struct for every slot of every `bucket_id`.
    `mapping(bytes32 bucket_id => mapping(uint256 slot => Bucket))`

3.  `ticks`: A mapping to track the last known tick of a pool, used to determine which ticks were crossed during a swap.
    `mapping(bytes32 pool_id => int24 last_tick_stored)`

By combining aggregated liquidity buckets with an efficient slot-based state management system, this algorithm provides a scalable and cost-effective foundation for building powerful limit order functionality directly into the Uniswap V4 ecosystem.