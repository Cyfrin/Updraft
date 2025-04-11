Okay, here is the improved written lesson:

### Price Scale Exercise 1

Here is the first exercise for price scales. This exercise is located under `test > curve-v2 > exercises > CurveV2PriceScale.test.sol`.

Let's scroll down and see what the exercise is.

The exercise is to calculate the transformed balances. For this exercise, we will be using the Curve Tri Crypto pool with USDC, WBTC, and WETH.

With that being said, the first exercise is to calculate the transformed balances.

```solidity
import { Test, console2 } from "forge-std/Test.sol";
import { ITriCrypto } from "../../src/interfaces/curve/ITriCrypto.sol";
import { CURVE_TRI_CRYPTO } from "../../src/Constants.sol";

uint256 constant PRECISIONS = 1e18;

/*
  forge test \
    --evm-version cancun \
    --fork-url $FORK_URL \
    --match-path test/curve-v2/exercises/CurveV2PriceScale.test.sol -vvv
*/

contract CurveV2PriceScaleTest is Test {
  ITriCrypto private constant pool = ITriCrypto(CURVE_TRI_CRYPTO);


  // Exercise 1
  // Calculate transformed balances
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
}
```
