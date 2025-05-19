This is an introduction to the Uniswap V2 liquidity removal exercise. We will be removing liquidity from the DAI/WETH pair contract.

The contract is initialized in the setup above. This setup is simulated as if the user added liquidity to the DAI/WETH pair and received this amount of liquidity shares:

```javascript
  function test_removeLiquidity() public {
      vm.startPrank(user);
      (,, uint256 liquidity) = router.addLiquidity({
          tokenA: DAI,
          tokenB: WETH,
          amountADesired: 1000000 * 1e18,
          amountBDesired: 100 * 1e18,
          amountAMin: 1,
          amountBMin: 1,
          to: user,
          deadline: block.timestamp
      });
      pair.approve(address(router), liquidity);

      // Exercise - Remove liquidity from DAI / WETH pool
      // Write your code here
      // Don’t change any other code

      vm.stopPrank();

      assertEq(pair.balanceOf(user), 0, "LP = 0");
  }
```

As discussed in the code walkthrough, the user has approved the router contract to spend all of their liquidity.

In this exercise, we will remove all of the liquidity from the DAI/WETH pair contract. 
