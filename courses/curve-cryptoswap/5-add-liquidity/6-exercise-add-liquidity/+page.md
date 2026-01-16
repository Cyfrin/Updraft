### Adding Liquidity to a Curve V2 Pool

In this exercise, we will be adding liquidity to the USDC, WBTC, and WETH Curve V2 pool.

In the setup, the contract is given 1,000 USDC and approves the pool contract to spend the USDC. This setup will allow us to add liquidity from the contract.

The first exercise will call the `add_liquidity` function, which will add 1,000 USDC of liquidity to the pool contract. We will be writing our code inside the following function.

```javascript
function test_add_liquidity() public {
  // Write your code here
  uint256 lpBal = pool.balanceOf(address(this));
  assertGt(lpBal, 0, "lp = 0");
}
```
