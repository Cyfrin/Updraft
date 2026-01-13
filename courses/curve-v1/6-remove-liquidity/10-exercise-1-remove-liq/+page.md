## Removing Liquidity From Curve

Let's learn about removing liquidity from Curve!

We will explore the process of removing liquidity from Curve. For this lesson, we will use a test contract that has been initialized with 1 million DAI, and this 1 million DAI has been provided as liquidity to a Curve pool. 

### Exercise 1

The first exercise involves calling the `removeLiquidity` function.

Remember, the `removeLiquidity` function will burn LP tokens and give you back all of the tokens in the pool. For the Curve StableSwap 3 pool, the tokens are DAI, USDC, and USDT.

To start, we will call the `removeLiquidity` function and then retrieve the balances of the tokens. The code below will print the balances of the tokens in the pool.  

```javascript
function testRemoveLiquidity() public {
  assertEq(lp.balanceOf(address(this)), 0, "3CRV balance > 0");
  uint256 bal = 0;
  dai = dai.balanceOf(address(this));
  assertGt(bal, 0, "DAI balance = 0");
  console.log("DAI balance %e", bal);
  usdc = usdc.balanceOf(address(this));
  assertGt(bal, 0, "USDC balance = 0");
  console.log("USDC balance %e", bal);
  usdt = usdt.balanceOf(address(this));
  assertGt(bal, 0, "USDT balance = 0");
  console.log("USDT balance %e", bal);
}
```

### Exercise 2

For the second exercise, we will again call the `removeLiquidity` function but this time we will specify the amount of LP to burn.

To achieve this, we will first obtain the balance of the LP token. Since the LP token is an ERC20, we can get the balance by calling the `balanceOf` function, which returns the amount of LP tokens locked inside the test contract.

```javascript
function setUp() public {
  dai.approve(address(pool), type(uint256).max);

  uint256[3] memory coins = [uint256(1e6 * 1e18), uint256(0), uint256(0)];

  pool.addLiquidity(coins, 1);
}
```

The `removeLiquidity` function takes two parameters: 

-  `uint256 lp` - The amount of LP to burn
- `uint256[3] calldata min_coins` - The minimum amount of coins you expect to get back when burning the LP

For simplicity, you can put the minimum coins as 0 or 1 or whatever you want.

```javascript
function removeLiquidity(uint256 lp, uint256[3] calldata min_coins) external;
```
