## Solution: Last Deposit Block

To get the last block that the user deposited, we need to call the `RocketStorage` contract.

First, return the value from `rStorage.getUint`

```solidity
return rStorage.getUint();
```

Next, we need to figure out what key we need to pass in, by looking at the `rETH` contract. Inside of the `rETH` contract, in the `_beforeTokenTransfer` function, the following line of code:

```solidity
uint256 lastDepositBlock = getUint(key);
```

gets the last block that the user deposited.

The code to compute the key is above:

```solidity
bytes32 key = keccak256(abi.encodePacked("user.deposit.block", from));
```

Let's copy this line of code and paste it into our code. Now, change the `from` address to `user`:

```solidity
keccak256(abi.encodePacked("user.deposit.block", user));
```

The code should look like this:

```solidity
return rStorage.getUint(
  keccak256(abi.encodePacked("user.deposit.block", user))
);
```

Now let's execute the test. The function that we're testing is called `test_getLastDepositBlock`. The command is:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_getLastDepositBlock -vvv
```

The test should now pass.
