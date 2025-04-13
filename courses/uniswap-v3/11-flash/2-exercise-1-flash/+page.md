### Exercise 1: Uniswap V3 Flash Loan Exercise

In this exercise, we will be creating a contract to execute a flash loan from a Uniswap V3 pool. Our contract will contain several tasks that we will walk through.

The `flash` function is where we initiate the flash loan from the Uniswap V3 pool. Our first task will be to ABI encode the `FlashCallbackData` struct, which looks like this:
```javascript
struct FlashCallbackData {
    uint256 amount0;
    uint256 amount1;
    address caller;
}
```

The struct has three parameters: `amount0`, which is the amount of token zero to borrow; `amount1`, which is the amount of token one to borrow; and `caller`, which is the address of the caller of the `flash` function. In the context of this function, `caller` will be `msg.sender`.

After encoding the struct, we must then call the `flash` function on the Uniswap V3 pool, which we will set up using the constructor:
```javascript
constructor(address _pool) {
    pool = IUniswapV3Pool(_pool);
    token0 = IERC20(pool.token0());
    token1 = IERC20(pool.token1());
}
```

The Uniswap V3 pool, `token0`, and `token1` are initialized inside the constructor.  To know what parameters to pass to the flash function, we can look at the interface definition, found here:
```javascript
import { IUniswapV3Pool } from "../../../src/interfaces/uniswap-v3/IUniswapV3Pool.sol";
```

After calling the `flash` function, the Uniswap V3 pool will execute a callback to the `uniswapV3FlashCallback` function within our contract. The Uniswap V3 pool will pass three parameters to this callback function: `fee0`, `fee1`, and `data`.  The data will be what we pass to the `flash` function.

Now, back in task two, once we have ABI encoded the `FlashCallbackData`, we can pass this data into the `flash` function, which will allow us to retrieve the same data in the callback function. Task 3 checks that `msg.sender` in the callback is the pool contract. Task 4 then decodes the data into `FlashCallbackData`. Using this decoded data, we must then transfer the fees (`fee0` and `fee1`) from the caller and repay the Uniswap V3 pool for the amount borrowed plus the fee.

If we wanted to add custom logic, such as an arbitrage, we can do so between task 4 and 5 or 5 and 6.

Next we can look at the test:

```javascript
import { UniswapV3Flash } from "../UniswapV3Flash.sol";
import { WETH } from "../../../src/Constants.sol";
import { DAI } from "../../../src/Constants.sol";
import { IUniswapV3Pool } from "../../../src/interfaces/uniswap-v3/IUniswapV3Pool.sol";

contract UniswapV3FlashTest is Test {
  IERC20 private constant weth = IERC20(WETH);
  IERC20 private constant dai = IERC20(DAI);
  UniswapV3Flash private uni;

    function setup() public {
        uni = new UniswapV3Flash(UNISWAP_V3_POOL_DAI_WETH_3000);
        deal(DAI, address(this), 1e6 * 1e18);
        dai.approve(address(uni), type(uint256).max);
    }

    function test_flash() public {
        uint256 daiBefore = dai.balanceOf(address(this));
        uni.flash(1e6 * 1e18, 0);
        uint256 daiAfter = dai.balanceOf(address(this));

        uint256 fee = daiBefore - daiAfter;
        console2.log("DAI fee", fee);
    }
}
```

The test is located in `UniswapV3/exercises/UniswapV3Flash.test.sol`.  The pool being used for the test is the Uniswap V3 DAI/WETH pool with a 0.3% fee. This test contract is given one million DAI and approves the Uniswap V3 pool contract to spend an infinite amount of DAI.

In this test, a flash loan is initiated by calling the `flash` function on the `UniswapV3Flash` contract we are building. For simplicity, it will log the fees requested by the Uniswap V3 pool.

This completes the exercise for a Uniswap V3 flash loan.
