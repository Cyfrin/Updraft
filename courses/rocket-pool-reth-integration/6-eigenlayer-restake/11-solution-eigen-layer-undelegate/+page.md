## EigenLayer Undelegate

If you decide to withdraw your staked assets from EigenLayer, it takes two steps:

1.  Undelegate
2.  Withdraw

By calling the function `undelegate`, you will undelegate from the current operator and it will also automatically queue a withdrawal. The contract that we will need to call is the `DelegationManager`. Let's check the interface for `IDelegationManager`. Inside here, there is a function called `undelegate` and it takes in a single input, the address of the staker.

We will call:

```solidity
delegationManager.undelegate();
```

The address of the staker, this contract was the contract that called into EigenLayer.
So this contract is the staker:

```solidity
address(this);
```

Going back to the `IDelegationManager` interface, you can see when we call the function `undelegate`, it returns an array of `bytes32` called `withdrawalRoot`. Let's assign this to the variable here:

```solidity
withdrawalRoot = delegationManager.undelegate(address(this));
```

We're not sure what this `withdrawalRoot` is used for. In our exercises, we won't be needing this. Here is the test command:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_undelegate -vvv
```

The file to test is `exercise-eigen-layer.sol`, the function to call is `test_undelegate`. Our test passed!
