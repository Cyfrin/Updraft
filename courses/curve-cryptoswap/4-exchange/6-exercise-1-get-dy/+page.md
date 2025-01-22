### Curve V2 AMM Exercise 1: get_dy

In this lesson, we'll begin our first exercise for swapping with Curve V2 AMM. The exercise is located in the `CurveV2Swap.test.sol` file.

For this exercise, we'll be using a Curve V2 pool that contains USDC, WBTC, and WETH. Our goal for the first exercise is to:

> Call `get_dy` to calculate the amount of USDC that can be received when swapping 1 WETH.

The space provided for writing our code is in the `test_get_dy` function:
```javascript
function test_get_dy() public {
    // Calculate swap from WETH to USDC
    uint256 dy = 0;
    
    console2.log("dy %e", dy);
    assertGt(dy, 0, "dy = 0");
}
```
