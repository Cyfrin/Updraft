# `EigenLayerRestake.deposit` exercise

Write your code inside the [`EigenLayerRestake` contract](../src/exercises/EigenLayerRestake.sol)

This exercise is design to implement a function that will deposit rETH into EigenLayer.

```solidity
function deposit(uint256 rethAmount) external returns (uint256 shares) {
  // Write your code here
}
```

## Instructions

1. **Transfer and approve**

   - Implement logic to transfer rETH from `msg.sender` and approve EigenLayer (`strategyManager`) to spend rETH.

2. **Deposit into EigenLayer**

   - Call `strategyManager.depositIntoStrategy` to deposit rETH into EigenLayer.
   - Return the amount of shares that was minted

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_deposit -vvv
```
