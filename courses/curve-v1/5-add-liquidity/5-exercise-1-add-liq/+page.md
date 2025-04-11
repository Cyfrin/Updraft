## Adding Liquidity to Curve V1

In this lesson, we will learn how to add liquidity to a Curve V1 Automated Market Maker (AMM).

We'll use a Solidity test contract and the `StableSwap3Pool` interface to demonstrate this process.

Let's start by understanding the setup of our test contract:

```javascript
function setUp() public {
  deal(DAI, address(this), 1e6 * 1e18);
  dai.approve(address(pool), type(uint256).max);
}
```

In the `setUp` function, we first use the `deal` function to give our test contract 1 million DAI.

Then, we use the `approve` function to give the `pool` contract permission to spend all of the DAI held by our test contract.

Now, we can move on to the actual liquidity adding process. To add liquidity to Curve V1, we need to call the `addLiquidity` function on the `StableSwap3Pool` interface.

This function takes two inputs: an array of the amount of tokens we want to add and the minimum amount of LP tokens we expect to receive back.

Here's the relevant part of the `StableSwap3Pool` interface:

```javascript
function add_liquidity(uint256[3] calldata coins, uint256 min_lp) external;
```

The `coins` array specifies the amount of each token we want to add.  In our case, the tokens are DAI, USDC, and USDT, so the array will have three elements.

The `min_lp` parameter is a safety measure to ensure that we receive at least a certain amount of LP tokens in return for the liquidity we add.

Let's look at how we would call this function in our Solidity test contract:

```javascript
function test_add_liquidity() public {
  uint256 lpBal = lp.balanceOf(address(this));
  assertGt(lpBal, 0);
}
```

This code first gets the current LP balance of our test contract using the `balanceOf` function.

We then use the `assertGt` function to ensure that the LP balance is greater than zero.

This completes the basic process of adding liquidity to a Curve V1 AMM. We can further refine this process by specifying the exact amount of each token we want to add and by adjusting the `min_lp` parameter to suit our needs. 
