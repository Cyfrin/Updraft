## Solution: Rocket Pool Swap ETH to rETH

In this lesson, we will show how to write a function to swap ETH for rETH.

To swap ETH to rETH, we need to call the contract deposit pool, and then call the function deposit.

```solidity
depositPool.deposit()
```

We also need to send ETH to mint rETH. We do this with:

```solidity
value:
```

Send all of the ETH that was sent into this contract.

```solidity
msg.value
```

So the final code for this function should be:

```solidity
depositPool.deposit[value: msg.value]();
```

Let's execute a test, using the following command:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_swapEthToReth -vvv
```

The file that we are testing is exercise swap rocket pool and the name of the test is test_swapEthToReth.

The test passed. For putting in one ETH, we get approximately 0.8883 rETH.
