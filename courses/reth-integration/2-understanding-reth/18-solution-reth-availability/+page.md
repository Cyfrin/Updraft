## Checking the Availability of reETH Minting

Minting reETH can be disabled by the protocol. In this lesson, we will cover how to check if the protocol is currently allowing minting of reETH.

To check whether minting is enabled or not, we need to call the contract protocol settings:

```solidity
protocolSettings.getDepositEnabled(),
```

To get the maximum deposit amount, we call the contract depositPool, then call the function getMaximuDepositAmount:

```solidity
depositPool.getMaximumDepositAmount()
```

Finally, we return these values as:

```solidity
return (
protocolSettings.getDepositEnabled(),
depositPool.getMaximumDepositAmount()
);
```

Next, inside of the terminal, we execute the test command:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_getAvailability -vvv
```

The file being tested is exercise-swap-rocket-pool.sol, and the function that we will test, getAvailability, is called test_getAvailability. The test passes, showing that deposit is currently enabled, and the maximum deposit is approximately 2.425 with 22 decimals.
