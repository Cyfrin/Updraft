## Solution: Rocket Pool Swap RETH to ETH

To swap RETH back to ETH, we’ll call the function burn on the RETH contract. Essentially, we’re burning our RETH. To burn the RETH, we first need to point the RETH into this contract from msg.sender. We will use:

```solidity
reth.transferFrom(msg.sender, address(this), rEthAmount);
```

Then, we need to call the function burn on the RETH contract:

```solidity
reth.burn(rEthAmount);
```

This will burn the RETH and send ETH back into this contract. For this contract to receive the ETH, let’s declare a payable receive function:

```solidity
receive() external payable {}
```

To run the test command, we will run the following command in the terminal:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_swapRethToEth -vvv
```

The test file is exercise-swap-rocket-pool and the function that we’re calling to test our function swapRethToEth is test_swapRethToEth.
