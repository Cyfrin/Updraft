## Getting the Deposit Delay

The protocol setting for deposit delay is stored inside a Rocket storage contract, which is called the RStorage contract. To retrieve the information, we'll need to call the storage contract, and pass in the key.

```solidity
return rStorage.getUint();
```

The key we need to pass can be found in the RocketTokenrETH contract, in the function beforeTokenTransfer. The key is in this line of code:

```solidity
getUint(keccak256(abi.encodePacked(keccak256("dao.protocol.setting.network"),"network.reth.deposit.delay")
```

We can test our code against the test using the command:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_getDepositDelay -vvv
```

The test file is located under exercise-swap-rocket-pool, and the function that we're going to execute to test the function getDepositDelay is called test_getDepositDelay. Our test passed.
