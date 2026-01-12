## Removing Liquidity from Curve

In this lesson, we'll call the `remove_liquidity_one_coin` function. This function will allow us to remove liquidity from a single coin that is specified by the caller.

We will be removing all of the liquidity from our test contract and withdrawing it in DAI.

First, we'll get the LP token balance of this contract by calling the `lp.balanceOf` function.

```javascript
lp.balanceOf(address(this))
```

Next, we'll call the `remove_liquidity_one_coin` function, passing in the LP amount, the index of the token we want to withdraw, and the minimum amount of DAI we expect to receive. 

For this exercise, we will keep it simple and set the minimum amount of DAI to zero.

```javascript
pool.remove_liquidity_one_coin(lp.balanceOf(address(this)), 0, 0)
```

The index of the token that we want to withdraw is zero for DAI. 

Let's take a look at the code:

```javascript
function test_remove_liquidity_one_coin() public {
  // Write your code here

  uint256 bal = 0;

  bal = dai.balanceOf(address(this));
  assertGt(bal, 0, "DAI balance > 0");
  console.log("DAI balance %e", bal);

  bal = usdc.balanceOf(address(this));
  assertGt(bal, 0, "USDC balance > 0");
  console.log("USDC balance %e", bal);

  bal = usdt.balanceOf(address(this));
  assertGt(bal, 0, "USDT balance > 0");
  console.log("USDT balance %e", bal);

  lp.balanceOf(address(this));
  pool.remove_liquidity_one_coin(lp.balanceOf(address(this)), 0, 0);

  // Write your code here
}
```

We'll be using the `remove_liquidity_one_coin` function to remove all of our liquidity from the pool and withdraw it as DAI. This function takes three parameters:

* `lp`: the amount of LP tokens you want to remove
* `i`: the index of the coin you want to receive
* `min_coin`: the minimum amount of the coin you expect to receive

In this example, we're removing all of our LP tokens, so we pass in `lp.balanceOf(address(this))` for the first parameter.  

We are withdrawing DAI, so the index `i` is 0.

We're setting the minimum amount of DAI we expect to receive to zero. 
