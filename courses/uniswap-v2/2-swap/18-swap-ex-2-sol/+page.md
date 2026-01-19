## How to Simulate a Uniswap V2 Swap

In this lesson, we will learn how to simulate a swap on Uniswap V2. To do this, we will use Foundry.

### Prerequisites

* You should have a FORK_URL set up for your environment. You can get this from a service like Alchemy. 
* You should have the UniswapV2 contracts deployed in your environment.

### Simulating a Swap

We will be testing the `swapTokensForExactTokens` function.  

```solidity
  // Receive an exact amount of output tokens for as few input tokens
  // as possible
  function test_swapTokensForExactTokens() public {
      address[] memory path = new address[](3);
      path[0] = WETH;
      path[1] = DAI;
      path[2] = MKR;

      uint256 amountOut = 0.1 * 1e18;    // 1e17
      uint256 amountInMax = 1e18;

      vm.prank(user);
      // Input token amount and all subsequent output token amounts
      uint256[] memory amounts = router.swapTokensForExactTokens({
          amountOut: amountOut,
          amountInMax: amountInMax,
          path: path,
          to: user,
          deadline: block.timestamp
      });

      console2.log("WETH: %18e", amounts[0]);
      console2.log("DAI: %18e", amounts[1]);
      console2.log("MKR: %18e", amounts[2]);

      assertEq(mkr.balanceOf(user), amountOut, "MKR balance of user");
  }
```

### Running the Test

We'll run the test with the following command:

```bash
forge test --fork-url $FORK_URL --mp test/uniswap-v2/exercises/UniswapV2Swap.test.sol --mt test_swapTokensForExactTokens -vvv
```

### The Test Results

The test results will include logs. Inside the logs you will see that we had 1 WETH initially, but our test used a smaller amount of WETH. We also confirmed that we received 0.1 MKR. 
