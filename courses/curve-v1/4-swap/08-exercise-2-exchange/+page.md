## Introduction to Curve.fi on Ethereum

In this lesson, we'll learn how to swap DAI for USDC on Curve.fi.

### The Swap Function

We will call the `exchange()` function in the `IStableSwap3Pool` interface to perform the swap.

### The `exchange()` function

The `exchange()` function takes in the following parameters:

* `i`: The index for the token in.
* `j`: The index for the token out.
* `dx`: The amount of token in that you're going to put in.
* `min_dy`: The minimum amount of token out that you expect to get back.

### Let's get started

To call the `exchange()` function to swap DAI for USDC, we can navigate to the `IStableSwap3Pool.sol` file under the "interfaces/curve" directory.

```bash
cd interfaces/curve
```

The file contains the `exchange()` function that we will use.

```javascript
function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
```

The `exchange()` function is part of the `IStableSwap3Pool` interface.  The `IStableSwap3Pool` interface is defined in the `IStableSwap3Pool.sol` file.  

We can import the `IStableSwap3Pool` interface into our test file so that we can use the `exchange()` function.

```javascript
import "./src/interfaces/curve/IStableSwap3Pool.sol";
```

We will import the `DAI`, `USDC`, and `USDT` constants from the `constants.sol` file.

```javascript
import (DAI, USDC, USDT, CURVE_3POOL) from "./src/constants.sol";
```

We can call the `exchange()` function from our test file to perform a swap.

```javascript
pool.exchange(DAI, USDC, dx, min_dy);
```

We will cover calling the `exchange()` function in a later lesson.
