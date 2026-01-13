## Claim Rewards from EigenLayer

In the last exercise of this contract, we will claim rewards from EigenLayer. The contract that we'll need to call is the reward coordinator. Let's look at the contract name inside our contract, we can see that it is named `rewardCoordinator` with the interface `IRewardsCoordinator`.

So we'll need to call the contract `rewardCoordinator`:

```solidity
rewardsCoordinator
```

Let's navigate to the `RewardsCoordinator` interface. Again, this is inside `Interfaces`, `EigenLayer`, `IRewardsCoordinator`.

Let's look for a function where we will be able to claim a reward. We can see here that there is a function called `processClaim`. By calling this function, tokens will be sent to the recipient. The first input is a custom input called `RewardsMerkleClaim`.

The Merkle tree's leaves contain two pieces of information, the earner, and the earner token root. The earner token root will be another Merkle root, which will contain leaves of token, and cumulative earnings. The way that this function `ClaimRewards` will be tested is inside the test, under the folder `EigenLayer`.

There's test data that, when passed, will generate the correct Merkle proof. This is copied from the code of EigenLayer. This data is parsed and then, inside the test for EigenLayer, it will load that data, and then pass it into our application contract to test that we've actually called the EigenLayer contracts. Let's go back to our application and call the function `processClaim`:

```solidity
rewardsCoordinator.processClaim(claim, address(this));
```

And that completes this exercise.

To run the test, let's execute the test command:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_claimRewards -vvvv
```

The file is `ExerciseEigenLayer` and the function that we are calling is `test_claimRewards`. The test passed, and we can see from the logs that the reward token balances are greater than zero.
