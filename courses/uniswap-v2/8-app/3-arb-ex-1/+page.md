## Uniswap V2 Arbitrage

In this lesson, we are going to write a Uniswap V2 arbitrage smart contract.  We will cover two different approaches to arbitrage: one using a standard swap, and the other using a flash swap. 

### Arbitrage with Swap

We will create a smart contract that will execute an arbitrage between two Uniswap V2 router contracts. The token to start the arbitrage will come from the message sender.  We will need to pull the tokens in from the message sender into our smart contract.

We will need to implement a function called `swap`.  The function will need to take in a struct called `SwapParams`, which we will define. `SwapParams` will contain the following:

```javascript
struct SwapParams {
    address router0; 
    address router1; 
    address tokenIn; 
    address tokenOut; 
    uint256 amountIn; 
    uint256 minProfit; 
}
```

The first parameter, `router0`, is the address of the Uniswap V2 router contract that we will call to execute the first swap. We will use `tokenIn` as the input to the first swap, and the output will be `tokenOut`. 

`router1` is the address of the contract that we will use for the second swap. The tokens will be reversed for the second swap, `tokenIn` will be the `tokenOut` from the first swap, and `tokenOut` will be the `tokenIn` from the first swap.

The next parameter, `tokenIn`, is the address of the token that will be used as input to the first swap. `tokenOut` is the address of the token that will come out from the first swap. 

The final parameter, `minProfit`, is the minimum profit that the arbitrage should make.  If the arbitrage profit is less than this amount, the function will revert.

The `swap` function will be responsible for:

1.  Pulling the tokens in from the message sender.
2.  Executing the first swap on `router0`.
3.  Executing the second swap on `router1`.
4.  Sending the remaining tokens (including profit) back to the message sender.

After the arbitrage is complete, the `swap` function will return `amountIn` plus the profit made. 

### Arbitrage with Flash Swap

We will implement another function called `flashSwap` that will perform arbitrage using a flash swap. The difference between this function and the `swap` function is that we will borrow the tokens we need to start the arbitrage from a Uniswap V2 pair contract.  The function `flashSwap` will take in the following parameters:

```javascript
function flashSwap(address pair, bool isToken0, SwapParams calldata params) 
    external;
```

*   `pair`: The address of the Uniswap V2 pair contract to borrow tokens from. 
*   `isToken0`: A boolean value that is `true` if the token to borrow is `token0` of the pair. For example, if we are borrowing DAI from the DAI/MKR pair contract, and DAI is equal to `token0` on that pair contract, `isToken0` would be `true`.
*   `params`: The `SwapParams` struct we defined earlier.

The `flashSwap` function will:

1.  Borrow the tokens needed for the arbitrage from the specified pair contract.
2.  Call a function called `UniswapV2Call` to execute the arbitrage.
3.  Repay the tokens borrowed from the pair contract.
4.  Send the remaining tokens to the message sender of the `flashSwap` function.

The function `UniswapV2Call` will be called back by the pair contract and will contain the logic for executing the arbitrage and repaying the borrowed tokens.

### Example Test

Let's look at an example test for our arbitrage contract:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {IERC20} from "../../../src/interfaces/IERC20.sol";
import {IWETH} from "../../../src/interfaces/IWETH.sol";
import {IUniswapV2Router02} from
    "../../../src/interfaces/uniswap-v2/IUniswapV2Router02.sol";
import {
    DAI,
    WETH,
    UNISWAP_V2_ROUTER_02,
    SUSHISWAP_V2_ROUTER_02,
    UNISWAP_V2_PAIR_DAI_WETH,
    UNISWAP_V2_PAIR_DAI_MKR
} from "../../../src/Constants.sol";
import {UniswapV2Arb1} from "./UniswapV2Arb1.sol";

// Test arbitrage between Uniswap and Sushiswap
// Buy WETH on Uniswap, sell on Sushiswap.
// For flashSwap, borrow DAI from DAI/MKR pair
contract UniswapV2Arb1Test is Test {
    IUniswapV2Router02 private constant uni_router =
        IUniswapV2Router02(UNISWAP_V2_ROUTER_02);
    IUniswapV2Router02 private constant sushi_router =
        IUniswapV2Router02(SUSHISWAP_V2_ROUTER_02);
    IERC20 private constant dai = IERC20(DAI);
    IWETH private constant weth = IWETH(WETH);
    address constant user = address(11);

    UniswapV2Arb1 private arb;

    function setUp() public {
        arb = new UniswapV2Arb1();

        // Setup - WETH cheaper on Uniswap than Sushiswap
        deal(address(this), 100 * 1e18);

        weth.deposit{value: 100 * 1e18}();
        weth.approve(address(uni_router), type(uint256).max);

        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = DAI;

        uni_router.swapExactTokensForTokens({
            amountIn: 100 * 1e18,
            amountOutMin: 1,
            path: path,
            to: user,
            deadline: block.timestamp
        });

        // Setup - user has DAI, approves arb to spend DAI
        deal(DAI, user, 10000 * 1e18);
        vm.prank(user);
        dai.approve(address(arb), type(uint256).max);
    }

    function test_swap() public {
        uint256 bal0 = dai.balanceOf(user);
        vm.prank(user);
        arb.swap(
            UniswapV2Arb1.SwapParams({
                router0: UNISWAP_V2_ROUTER_02,
                router1: SUSHISWAP_V2_ROUTER_02,
                tokenIn: DAI,
                tokenOut: WETH,
                amountIn: 100 * 1e18,
                minProfit: 1
            })
        );
        uint256 bal1 = dai.balanceOf(user);

        assertGe(bal1, bal0, "no profit");
        assertEq(dai.balanceOf(address(arb)), 0, "DAI balance of arb != 0");
        console2.log("profit", bal1 - bal0);
    }

    function test_flashSwap() public {
        uint256 bal0 = dai.balanceOf(user);
        vm.prank(user);
        arb.flashSwap(
            UNISWAP_V2_PAIR_DAI_MKR,
            true,
            UniswapV2Arb1.SwapParams({
                router0: UNISWAP_V2_ROUTER_02,
                router1: SUSHISWAP_V2_ROUTER_02,
                tokenIn: DAI,
                tokenOut: WETH,
                amountIn: 100 * 1e18,
                minProfit: 1
            })
        );
        uint256 bal1 = dai.balanceOf(user);

        assertGe(bal1, bal0, "no profit");
        assertEq(dai.balanceOf(address(arb)), 0, "DAI balance of arb != 0");
        console2.log("profit", bal1 - bal0);
    }
}
```

This test will execute both the `swap` and the `flashSwap` functions and verify that each function successfully performs an arbitrage. 
