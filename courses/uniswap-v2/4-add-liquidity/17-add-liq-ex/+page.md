In this lesson, we'll learn how to add liquidity to a DAI/WETH pair using the UniswapV2Router contract. 

We'll call the addLiquidity function inside the UniswapV2Router contract, passing in the following arguments:

- TokenA: WETH
- TokenB: DAI
- AmountADesired: any amount of WETH
- AmountBDesired: any amount of DAI

We'll also need to make sure that the amount of WETH and DAI we pass in is less than or equal to the balances of these tokens that we've set up in our test. 

```javascript
function test_addLiquidity() public {
  // Exercise - Add Liquidity to DAI / WETH pool
  // Write your code here
  // Don't change any other code
  vm.prank(user);
  assertGt(pair.balanceOf(user), 0, "LP > 0");
}
```

The test will check that the user has received some shares of the pool after we call the addLiquidity function. 

The setup in our test has the following balances:

- WETH: 100
- DAI: 1,000,000

We'll use the `vm.prank(user)` function to simulate sending this transaction from the user account that we've set up in our test. 

The test will run this transaction and we'll be able to see in the console that our user has received some shares in the DAI/WETH pool. 
