## Curve Price Scale Exercise

In this lesson, we will begin the first exercise in calculating the price scale. The exercise is located in the file `test/curve-v2/exercises/CurveV2PriceScale.test.sol`. 

Let's scroll down and see the details of the exercise. The goal is to calculate the transformed balances. We will be using the Curve TriCrypto pool, which includes USDC, WBTC, and WETH.

```javascript
    function test_calc_transformed_bals() public {
        uint256[3] memory xp = [uint256(0), uint256(0), uint256(0)];
        uint256[3] memory precisions = pool.precisions();
    
        // Write your code here
        console2.log("xp[0] = %e", xp[0]);
        console2.log("xp[1] = %e", xp[1]);
        console2.log("xp[2] = %e", xp[2]);

        assertGt(xp[0] / PRECISIONS, 0);
        assertGt(xp[1] / PRECISIONS, 0);
        assertGt(xp[2] / PRECISIONS, 0);
    }
```
