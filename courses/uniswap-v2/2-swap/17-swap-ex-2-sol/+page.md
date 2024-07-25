## How to Simulate a Uniswap V2 Swap

In this lesson, we will learn how to simulate a swap on Uniswap V2. To do this, we will use Foundry.

### Prerequisites

* You should have a FORK_URL set up for your environment. You can get this from a service like Alchemy. 
* You should have the UniswapV2 contracts deployed in your environment.

### Simulating a Swap

We will be testing the `swapTokensForExactTokens` function.  

```javascript
function testSwapTokensForExactTokens() public {
  address[] memory path = new address[](3);
  path[0] = WETH;
  path[1] = DAI;
  path[2] = MKR;

  uint amountOut = 0.1 * 1e18;
  uint amountInMax = 1e18;

  vm.prank(user);

  uint256[] memory amounts = router.swapTokensForExactTokens(
    amountOut,
    amountInMax,
    path,
    user,
    block.timestamp
  );

  console.log("WETH", amounts[0]);
  console.log("DAI", amounts[1]);
  console.log("MKR", amounts[2]);

  assertEq(mkr.balanceOf(user), amountOut, "MKR balance of user");
}
```

### Running the Test

We'll run the test with the following command:

```bash
forge test test/UniswapV2/exercises/UniswapV2Swap.test.sol:UniswapV2Test --fork-url $FORK_URL --match-path test/UniswapV2/exercises/UniswapV2Swap.test.sol
```

### The Test Results

The test results will include logs. Inside the logs you will see that we had 1 WETH initially, but our test used a smaller amount of WETH. We also confirmed that we received 0.1 MKR. 
