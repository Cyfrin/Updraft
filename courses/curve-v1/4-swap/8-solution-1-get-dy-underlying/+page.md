## Intro to Curve.fi Pool Interactions

In this lesson, we will learn how to interact with a Curve.fi pool. Specifically, we will learn how to use the function `get_dy_underlying()`.

Let's look at our contract:
```javascript
// Exercise 1
// Call get_dy_underlying to calculate the amount of USDC for swapping 
// 1,000,000 DAI to USDC
function test_get_dy_underlying() public {
    // Calculate swap from DAI to USDC
    // Write your code here
    uint256 dy = 0;

    console.log("dy %e", dy);
    assertGT(dy, 0, "dy = 0");
}
```

The first step is to copy the interface of the `IStableSwap3Pool` contract from the `IStableSwap3Pool.sol` file.
```javascript
interface IStableSwap3Pool {
    function get_dy_underlying(int128 i, int128 j, uint256 dx) 
        external 
        view
        returns (uint256 dy);
    
    function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy)
        external;
    
    function add_liquidity(uint256[3] calldata coins, uint256 min_lp)
        external;

    function remove_liquidity(uint256 lp, uint256[3] calldata min_coins)
        external;

    function remove_liquidity_one_coin(uint256 lp, int128 i, uint256 min_coin)
        external;

    function calc_withdraw_one_coin(uint256 lp, int128 i) 
        external 
        view
        returns (uint256 coin);
}
```

We can then paste this interface into the `CurveV1Swap.test.sol` file:
```javascript
// Exercise 1
// Call get_dy_underlying to calculate the amount of USDC for swapping 
// 1,000,000 DAI to USDC
function test_get_dy_underlying() public {
    // Calculate swap from DAI to USDC
    // Write your code here
    get_dy_underlying(int128 i, int128 j, uint256 dx) 
    uint256 dy = 0;

    console.log("dy %e", dy);
    assertGT(dy, 0, "dy = 0");
}
```

Now, we need to call the `get_dy_underlying()` function from our `CurveV1Swap.test.sol` contract.

First, we need to access the `IStableSwap3Pool` contract using the `pool` variable we defined earlier:
```javascript
// Exercise 1
// Call get_dy_underlying to calculate the amount of USDC for swapping 
// 1,000,000 DAI to USDC
function test_get_dy_underlying() public {
    // Calculate swap from DAI to USDC
    // Write your code here
    pool.get_dy_underlying(int128 i, int128 j, uint256 dx) 
    uint256 dy = 0;

    console.log("dy %e", dy);
    assertGT(dy, 0, "dy = 0");
}
```

Next, we need to pass the following three parameters into the function:
1. **`i`**: The index of the token we are swapping from (DAI).
2. **`j`**: The index of the token we are swapping to (USDC).
3. **`dx`**: The amount of DAI we are swapping.

From our pool definition:
```javascript
IStableSwap3Pool private constant pool = IStableSwap3Pool(CURVE_3POOL);
```

And the pool composition (DAI, USDC, USDT):
```javascript
IERC20 private constant dai = IERC20(DAI);
IERC20 private constant usdc = IERC20(USDC);
IERC20 private constant usdt = IERC20(USDT);
```

We can see that DAI has index 0, USDC has index 1, and USDT has index 2. So, let's update our code:
```javascript
// Exercise 1
// Call get_dy_underlying to calculate the amount of USDC for swapping 
// 1,000,000 DAI to USDC
function test_get_dy_underlying() public {
    // Calculate swap from DAI to USDC
    // Write your code here
    pool.get_dy_underlying(0, 1, uint256 dx) 
    uint256 dy = 0;

    console.log("dy %e", dy);
    assertGT(dy, 0, "dy = 0");
}
```

Now we need to define our `dx` variable. We are swapping 1 million DAI. As DAI has 18 decimals, this is represented by:
```javascript
1e6 * 1e18
```

Let's update our code to incorporate this.
```javascript
// Exercise 1
// Call get_dy_underlying to calculate the amount of USDC for swapping 
// 1,000,000 DAI to USDC
function test_get_dy_underlying() public {
    // Calculate swap from DAI to USDC
    // Write your code here
    pool.get_dy_underlying(0, 1, 1e6 * 1e18);
    uint256 dy = 0;

    console.log("dy %e", dy);
    assertGT(dy, 0, "dy = 0");
}
```

Finally, we can assign the returned value of our `pool.get_dy_underlying()` function to the `dy` variable.
```javascript
// Exercise 1
// Call get_dy_underlying to calculate the amount of USDC for swapping 
// 1,000,000 DAI to USDC
function test_get_dy_underlying() public {
    // Calculate swap from DAI to USDC
    // Write your code here
    uint256 dy = pool.get_dy_underlying(0, 1, 1e6 * 1e18);

    console.log("dy %e", dy);
    assertGT(dy, 0, "dy = 0");
}
```

Now let's execute our test. In our terminal, we can use Foundry's `forge test` command with the following arguments:
* **`--fork-url`**: This argument specifies the RPC endpoint for our blockchain.
* **`--match-test`**: This argument helps us execute specific tests. We will match against the name of our test function: `test_get_dy_underlying`.
* **`--dbv`**: This argument tells Foundry to use a persistent database for our forked blockchain. 

The complete command is:
```bash
forge test --fork-url $FORK_URL --match-test test_get_dy_underlying --dbv
```

We can see that our test passes. This means that we have successfully called the `get_dy_underlying()` function and calculated the amount of USDC we will receive when swapping 1 million DAI. 
