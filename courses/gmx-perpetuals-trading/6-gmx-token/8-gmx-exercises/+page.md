# GMX Staking and Governance Exercises

In this exercise, you'll implement a contract that interacts with GMX's staking and governance systems.

By completing this exercise, you'll learn how to:

- Stake GMX tokens to earn rewards
- Unstake GMX tokens
- Claim staking rewards
- Check your staked position
- Delegate your voting power for governance

The exercise starter code is provided in `Stake.sol`.

## Task 1: Implement staking functionality

Implement the `stake` function.

```solidity
function stake(uint256 gmxAmount) external {
    // Your implementation here
}
```

This function should:

1. Transfer GMX tokens from the caller to the contract
2. Approve the `REWARD_TRACKER` to spend these tokens
3. Stake the tokens through `rewardRouter`

## Task 2: Implement unstaking functionality

Implement the `unstake` function.

```solidity
function unstake(uint256 gmxAmount) external {
    // Your implementation here
}
```

This function should call `rewardRouter` to unstake the specified amount of GMX tokens.

## Task 3: Implement rewards claiming

Implement the `claimRewards` function.

```solidity
function claimRewards() external {
    // Your implementation here
}
```

This function should:

1. Approve the `REWARD_TRACKER` to spend the contract's GMX tokens
2. Call `rewardRouter.handleRewards` function with appropriate parameters to:
   - Claim GMX rewards and stake them
   - Stake multiplier points
   - Claim WETH rewards
   - (Optional) Choose whether to convert WETH to ETH

## Task 4: Implement staked amount checking

Implement the `getStakedAmount` function:

```solidity
function getStakedAmount() external view returns (uint256) {
    // Your implementation here
}
```

This function should query `rewardTracker` to get the amount of GMX tokens staked by the contract.

## Task 5: Implement governance delegation

Implement the `delegate` function:

```solidity
function delegate(address delegatee) external {
    // Your implementation here
}
```

This function should delegate the contract's governance voting power to the specified address.

Call `gmxDao.delegate`.

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Stake.test.sol -vvv
```
