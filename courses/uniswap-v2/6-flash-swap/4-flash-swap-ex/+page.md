In this lesson, we will be completing a contract called UniswapV2FlashSwap. This contract will be used to carry out a flash swap with a UniswapV2Pair contract. 

We will start by looking at the constructor for the UniswapV2FlashSwap contract. 

```javascript
contract UniswapV2FlashSwap {
    UniswapV2Pair private immutable pair;
    address private immutable token0;
    address private immutable token1;

    constructor(address _pair) {
        pair = UniswapV2Pair(_pair);
        token0 = pair.token0();
        token1 = pair.token1();
    }
}
```

We will then need to complete two functions: flashSwap and uniswapV2Call. We will start with the flashSwap function. 

```javascript
function flashSwap(address token, uint256 amount) external {
    require(token == token0 || token == token1, "invalid token");

    // Write your code here

    // Don't change any other code

    // 1. Determine amount0Out and amount1Out
    (uint256 amount0Out, uint256 amount1Out) = (0, 0);

    // 2. Encode token and msg.sender as bytes
    bytes memory data;

    // 3. Call pair.swap
    pair.swap(
        amount0Out,
        amount1Out,
        address(this),
        data
    );
}
```

The first part of this exercise is to determine amount0Out and amount1Out. These two values represent the amount of tokens that will be received from the swap. 

For example, if we are borrowing token0 for 100, then amount0Out will be 100, because we want to borrow 100 of token0. And, amount1Out will be 0. 

Otherwise, if the input token is token1, and we are borrowing 100 of token1, then amount0Out will be 0, and amount1Out will be 100.

Next, we will need to encode the data as bytes. These bytes will be passed to the swap function on the pair contract.

Remember that when we looked at the UniswapV2Pair contract and the function swap, the way we trigger a flash swap is that the data must not be empty. You can see over here when the data is not empty, it will call the uniswapV2Call at the contract to call the function uniswapV2Call.

So, to trigger a flash swap, we need to make sure that we pass in some kind of data. And, for this data, we will encode the token from the parameter and the msg.sender. 

Later, when the function uniswapV2Call is called by the pair contract, we will decode this msg.sender and have this msg.sender pay for the fee on the flash swap. 

The last part to complete this function is to call the swap function on the pair contract. 

```javascript
pair.swap(
    amount0Out,
    amount1Out,
    address(this),
    data
);
```

We will now move on to the uniswapV2Call function. This function is a callback function that will be called by the UniswapV2Pair contract after the flash swap.

```javascript
// Uniswap V2 callback
function uniswapV2Call(
    address sender,
    uint256 amount0,
    uint256 amount1,
    bytes calldata data
) external {

    // Write your code here

    // Don't change any other code

    // 1. Require msg.sender is pair contract
    require(msg.sender == address(pair), "Uniswap V2: INVALID_TO");

    // 2. Require sender is this contract
    require(sender == address(this), "Uniswap V2: INVALID_TO");

    // 3. Decode token and caller from data
    (address token, address caller) = abi.decode(data, (address, address));

    // 4. Determine amount borrowed (only one of them is > 0)
    uint256 amount = 0;

    // 5. Calculate flash swap fee and amount to repay
    uint256 fee = (amount * 3) / 997 + 1; // 1 to round up
    uint256 amountToRepay = amount + fee;

    // 6. Get flash swap fee from caller
    // 7. Repay Uniswap V2 pair
    token.transferFrom(caller, address(this), amountToRepay);
}
```

The first part of this function is authorization. We will need to ensure that the msg.sender is the pair contract and the sender is this contract. 

We will then need to decode the token and caller from the data. Remember that we encoded the data as token and caller in the flashSwap function.

Next, we need to determine the amount of tokens that were borrowed. We can do this by checking the amount0 and amount1 values that were passed to this function. Only one of these values will be greater than zero.

Once we have determined the amount of tokens that were borrowed, we can calculate the fee. The fee is calculated as 0.3% of the amount borrowed, rounded up to the nearest token.

Finally, we will use the token.transferFrom function to transfer the amount of tokens that were borrowed, plus the fee, back to the UniswapV2Pair contract. 

The next part of the lesson will show a test file for the UniswapV2FlashSwap contract. 

```javascript
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {IERC20} from "../../../src/interfaces/IERC20.sol";
import {IUniswapV2Router02} from
    "../../../src/interfaces/uniswap-v2/IUniswapV2Router02.sol";
import {
    DAI,
    UNISWAP_V2_ROUTER_02,
    UNISWAP_V2_PAIR_DAI_WETH
} from "../../../src/Constants.sol";
import {UniswapV2FlashSwap} from "./UniswapV2FlashSwap.sol";

contract UniswapV2FlashSwapTest is Test {
    IERC20 private constant dai = IERC20(DAI);

    IUniswapV2Router02 private constant router =
        IUniswapV2Router02(UNISWAP_V2_ROUTER_02);
    UniswapV2FlashSwap private flashSwap;

    address private constant user = address(100);

    function setUp() public {
        flashSwap = new UniswapV2FlashSwap(UNISWAP_V2_PAIR_DAI_WETH);

        deal(DAI, user, 10000 * 1e18);
        vm.prank(user);
        dai.approve(address(flashSwap), type(uint256).max);
        // user -> flashSwap.flashSwap
        //         -> pair.swap
        //            -> flashSwap.uniswapV2Call
        //               -> token.transferFrom(user, flashSwap, fee)
    }

    function test_flashSwap() public {
        uint256 dai0 = dai.balanceOf(UNISWAP_V2_PAIR_DAI_WETH);
        vm.prank(user);
        flashSwap.flashSwap(DAI, 1e6 * 1e18);
        uint256 dai1 = dai.balanceOf(UNISWAP_V2_PAIR_DAI_WETH);

        console2.log("DAI fee: %18e", dai1 - dai0);
        assertGe(dai1, dai0, "DAI balance of pair");
    }
}

```

In the setup function, we deploy the FlashSwap contract. We then fund the user account with 10,000 die. 

The testFlashSwap function will test that the balance of die in the UniswapV2Pair contract after the flash swap is greater than the balance of die in the pair contract before the flash swap. This ensures that the flash swap was successful. 

The user account will call the flashSwap function on the flashSwap contract with the amount of 1 million die. 

The test then compares the balance of die in the UniswapV2Pair contract before and after the flash swap. If the balance after the flash swap is greater, then the test is successful. 

You can run the test by executing the following command in the terminal.

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v2/exercises/UniswapV2FlashSwap.test.sol
```
