In this lesson, we will learn how to fetch the amount of tokens we'll receive from a trade in a Uniswap V2 Router contract using the Uniswap V2 library.

The `getAmountsOut` function inside the Uniswap V2 Library may be a little confusing. We will walk through an example using real numbers to understand how this function works.

At the bottom of the Uniswap V2 Router contract, you will see two functions: `getAmountsOut` and `getAmountsIn`. These functions simply call the Uniswap V2 library functions `getAmountsOut` and `getAmountsIn`, respectively. By calling these functions, we will be able to fetch the real numbers that we use for our smart contracts.

Let's write a test using Foundry to call the `getAmountsOut` function on our Uniswap V2 Router contract.

First, we will initialize some code for our test. We will import `IERC20` from the Uniswap V2 Router contract,  some contract addresses, like `DAI` , `WETH`, `MKR`, and `Uniswap V2 Router 02`, and then we initialize the test by initializing `WETH`, `DAI`, `MKR`, and `router`.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./UniswapV2Router02.sol";

contract UniswapV2SwapAmountsTest is Test {
    IERC20 private constant weth = IERC20(WETH);
    IERC20 private constant dai = IERC20(DAI);
    IERC20 private constant mkr = IERC20(MKR);
    IUniswapV2Router02 private constant router =
        IUniswapV2Router02(UNISWAP_V2_ROUTER_02);

    function test_getAmountsOut() public {
        // getAmountsOut(uint amountIn, address[] memory path)
        // returns(uint[] memory amounts)
    }
}
```

We will write our test inside the function `test_getAmountsOut`. This function will call `getAmountsOut` on the router contract, returning an array of amounts.

We will pass the arguments `amountIn`, `address`, and `path` to the function `getAmountsOut`. 

Let's say, for this example, that we want to swap from `WETH` to `DAI`, and then from `DAI` to `MKR`.

We will need to declare an array of addresses, let's call it `path`. 

```javascript
address[] memory path = new address[](3);
```

We will set the first element of our path array to `WETH`, the second element to `DAI`, and the third element to `MKR`.

```javascript
path[0] = WETH;
path[1] = DAI;
path[2] = MKR;
```

Let's say `amountIn` is one `WETH`.

```javascript
uint256 amountIn = 1e18;
```

We are going to trade one `WETH` for `DAI` and then for `MKR`, and we are asking the Uniswap V2 Router contract: if we were to do this trade, how much `MKR` will we get and how much `DAI` will we get when `WETH` is traded for `DAI`?

We can now call the `getAmountsOut` function to fetch our array of amounts. We will set the `amountIn` to one `WETH` and the path to `path`.

```javascript
uint256[] memory amounts = router.getAmountsOut(amountIn, path);
```

The final part of this demo is to console log the amounts.

```javascript
console2.log("WETH: %18e", amounts[0]);
console2.log("DAI: %18e", amounts[1]);
console2.log("MKR: %18e", amounts[2]);
```

Remember that the path has length three, so our amounts array will also have a length of three. We expect `amounts[0]` to be 1e18 because that is our input amount. `amounts[1]` will be the amount of `DAI` that we get for our input amount of `WETH` and `amounts[2]` will be the amount of `MKR` that we get for our input amount of `DAI`. 

Now, let's execute this test on our main network.

First, we need to set our fork URL as an environment variable. You can get your fork URL from a service like Alchemy. Here is an example of a fork URL:

```bash
FORK_URL=https://eth-mainnet.g.alchemy.com/v2/KxztpzEzhqN54Jn_0SgMzN4AJ5Q50K4
```
We can now copy the fork URL and paste it inside our terminal. Next, we will execute our test by running the following command:

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v2/UniswapV2SwapAmounts.test.sol --mt test_getAmountsOut -vvv
```

The output of our test will be:

```
[PASS] 1 test for test/uniswap-v2/UniswapV2SwapAmounts.test.sol:UniswapV2SwapAmountsTest
Running 1 test for UniswapV2 (gas: 25511)
Logs:
WETH: 1
DAI: 2566.845188977171554936
MKR: 0.040213782244101485
Test result: ok. 1 passed; 0 failed; finished in 5.31s
```

We can see from the log that we put in one `WETH` and we got out a certain amount of `DAI`. For that amount of `DAI`, we got out a certain amount of `MKR`.

Next, we will copy these inputs and walk through a code example of Uniswap V2 library's `getAmountsOut` function using these actual numbers. 
