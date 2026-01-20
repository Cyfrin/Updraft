# Limit Order Exercises

In this exercise, you'll learn how to write a limit order hooks contract.

The starter code for this exercise is provided in [`foundry/src/exercises/LimitOrder.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/LimitOrder.sol)

Solution is in [`foundry/src/solutions/LimitOrder.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/LimitOrder.sol)

## Task 1 - After initialize hook

```solidity
function afterInitialize(
    address sender,
    PoolKey calldata key,
    uint160 sqrtPriceX96,
    int24 tick
) external onlyPoolManager returns (bytes4) {
    // Write your code here
    return this.afterInitialize.selector;
}
```

- Store the current tick of the pool into the state variable `ticks`.

## Task 2 - Place a limit order

```solidity
function place(
    PoolKey calldata key,
    int24 tickLower,
    bool zeroForOne,
    uint128 liquidity
) external payable setAction(ADD_LIQUIDITY) {
    // Write your code here
}
```

This function places a limit order for `msg.sender`.

- Revert if `tickLower` is not a multiple of the pool's tick spacing
- Call `poolManager.unlock` and write code inside `unlockCallback` to add liquidity.
  - Liquidity must be added between `tickLower` and `tickLower + tickSpacing`.
  - Revert if liquidity is going to be added to the current tick.
- Update `Bucket` stored in the current slot.
  - Call `getBucketId` to get the `Bucket` id.
  - Current slot for this bucket is stored in `slots[id]`.
  - Current `Bucket` is stored in `buckets[id][slots[id]]`.
- Emit `Place` event

## Task 3 - Cancel a limit order

```solidity
function cancel(PoolKey calldata key, int24 tickLower, bool zeroForOne)
    external
    setAction(REMOVE_LIQUIDITY)
{
    // Write your code here
}
```

This funciton cancels a limit order for `msg.sender`.

- Revert if the `Bucket` to remove limit order from is `filled`.
- Remove liquidity for `msg.sender` from the `Bucket`.
- Call `poolManager.unlock` and write code inside `unlockCallback` to remove liquidity.
  - Removing liquidity, return fees that accrued to this position.
  - Allocate the fees to the `Bucket` if liquidity in it is greater than 0.
  - If liquidity in the `Bucket` is 0, give the fees to `msg.sender`.
- Emit `Cancel` event

## Task 4 - Take swapped token

```solidity
function take(
    PoolKey calldata key,
    int24 tickLower,
    bool zeroForOne,
    uint256 slot
) external {
    // Write your code here
}
```

This function is called by `msg.sender` to withdraw the tokens that were swapped after their limit order was processed.

- Revert if the `Bucket` is not `filled`.
- Update `Bucket`
- Send the approriate amount of `currency0` and `currency1` to `msg.sender`.
- Emit `Take` event

## Task 5 - After swap hook

```solidity
function afterSwap(
    address sender,
    PoolKey calldata key,
    SwapParams calldata params,
    BalanceDelta delta,
    bytes calldata hookData
)
    external
    onlyPoolManager
    setAction(REMOVE_LIQUIDITY)
    returns (bytes4, int128)
{
    // Write your code here
    return (this.afterSwap.selector, 0);
}
```

This hook is triggered after a swap and is responsible for removing liquidity from the processed `Bucket`s.

- Find the range of ticks to remove liquidity.
  - This will range from the last stored tick (`ticks[key.toId()]`) to the current `tick`, both rounded down to a multiple of `tickSpacing` and then `+/-` `tickSpacing`.
  - Hint: Call `_getTickRange`
- Remove liquidity from the tick range above.
  - Set `Bucket.filled` to `true`.
  - Store the amounts of `currency0` and `currency1` returned into the `Bucket`.
  - Emit `Fill` event.
  - Increment the slot for this bucket by 1.
- Store the latest tick into `ticks[key.toId()]`

## Test

1. Find the value of `salt` needed to deploy the hooks contract at a valid address.

```shell
forge test --match-path test/FindHookAddr.sol -vvv
```

2. Export the salt printed to your terminal from executing the command in the previous step.

```shell
export SALT=YOUR_SALT
forge test --fork-url $FORK_URL --match-path test/LimitOrder.test.sol -vvv
```
