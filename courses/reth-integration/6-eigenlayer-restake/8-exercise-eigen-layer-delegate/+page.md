# `EigenLayerRestake.delegate` exercise

Write your code inside the [`EigenLayerRestake` contract](../src/exercises/EigenLayerRestake.sol)

This exercise is design to implement a function that will delegate to an operator.

```solidity
function delegate(address operator) external auth {
   // Write your code here
}
```

## Instructions

1. **Delegate**

   - Call `delegationManager.delegateTo` to delegate the contract's stake to an `operator` from the input.

   - Set all signature parameters to call `delegateTo` to default values.

```solidity
approverSignatureAndExpiry: IDelegationManager.SignatureWithExpiry({
    signature: "",
    expiry: 0
}),
approverSalt: bytes32(uint256(0))
```

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_delegate -vvv
```
