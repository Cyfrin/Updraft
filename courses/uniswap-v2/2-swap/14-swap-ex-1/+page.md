## Uniswap V2 Router Test

This lesson will introduce Uniswap V2 Router, focusing on testing the `swapExactTokensForTokens` function. This is a common task in smart contract testing, where you want to simulate a swap of tokens in a real-world scenario.

Let's begin by setting up our test environment. First, we will need to import some interfaces.

```javascript
import { Test } from 'forge-std/Test.sol';
import { ERC20 } from '../src/interfaces/IERC20.sol';
import { IUniswapV2Router02 } from '../src/interfaces/IUniswapV2Router02.sol';
```

Next, we need to initialize some of our token variables: WETH (Wrapped Ether), DAI (Dai Stablecoin) and MKR (MakerDAO)

```javascript
import { DAI, MKR, UNISWAP_V2_ROUTER_02 } from '../src/Constants.sol';
import { WETH } from '../src/Constants.sol';
```

We will also need to define our contracts, in this case, the Uniswap V2 Router contract.

```javascript
contract UniswapV2SwapTest is Test {
    IUniswapV2Router02 private constant router = IUniswapV2Router02(UNISWAP_V2_ROUTER_02);
    IERC20 private constant weth = IERC20(WETH);
    IERC20 private constant dai = IERC20(DAI);
    IERC20 private constant mkr = IERC20(MKR);
    address private constant user = address(100);
}
```

For this lesson, we will simulate a user who has 100 WETH and who has already approved the Uniswap V2 Router contract to spend all of his tokens. This is common for real-world scenarios where a user has already interacted with the contract.

```javascript
function setUp() public {
    deal(user, 100 * 1e18);
    vm.startPrank(user);
    weth.deposit{value: 100 * 1e18}();
    weth.approve(address(router), type(uint256).max);
    vm.stopPrank();
}
```

We can now begin to test our swap functionality. In this lesson, the user will be swapping his WETH for MKR, with the minimum amount of MKR expected being one. 

```javascript
function testSwapExactTokensForTokens() public {
    address[] memory path = new address[](3);
    path[0] = WETH;
    path[1] = DAI;
    path[2] = MKR;
    uint amountIn = 1e18;
    uint amountOutMin = 1;
    assertGe(mkr.balanceOf(user), amountOutMin, "MKR balance of user");
}
```

The `swapExactTokensForTokens` function takes several inputs:

* **amountIn**: This is the amount of tokens the user will be sending in.
* **amountOutMin**: This is the minimum amount of output tokens the user expects.
* **path**: This is an array of addresses which define the token path for the swap.

The test then asserts that the user's MKR balance is greater than or equal to the amountOutMin, indicating that the swap was successful.

The function that we will call is `swapExactTokensForTokens`.

```javascript
function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
```

The arguments of this function are as follows:

* **amountIn**: the amount of input tokens
* **amountOutMin**: the minimum amount of output tokens expected
* **path**: the token path for the swap
* **to**: the address to receive the output tokens
* **deadline**: the timestamp for which the transaction must be completed

In our test, the **amountIn** is 1e18, the **amountOutMin** is 1, the **path** is an array of addresses representing the token path (WETH, DAI, MKR), **to** is the user's address, and the **deadline** is block.timestamp.

This is just a simple example of Uniswap V2 Router testing. We can expand on this by testing other functions, varying inputs, and simulating more complex scenarios. 

The next step is to write more tests to cover other functions. We will also learn how to test the `swapExactTokensForETH` function.
