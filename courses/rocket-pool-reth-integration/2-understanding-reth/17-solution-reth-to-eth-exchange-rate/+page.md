## Solution reth to ETH exchange rate

In the function `calcREthToEth`, we will calculate the amount of ETH we will receive, given the rETH amount. The solution will be one line of code.
Let's assign the return value `ethAmount`, the amount of ETH that you’ll receive. The function that we'll need to call is:

```javascript
reth.getEthValue();
```

and then passing in the amount of rETH

```javascript
rEthAmount;
```

So the complete line of code is:

```javascript
ethAmount = "reth.getEthValue(rEthAmount)";
```

To test your code, run the command

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-rocket-pool.sol --match-test test_calcREthToEth -vvv
```

The path for the test will be exercise-swap-rocket-pool.sol, and the name of the test is called `test_calcREthToEth`. The test passes. For putting in rETH, you’ll approximately get 1.125 ETH.
