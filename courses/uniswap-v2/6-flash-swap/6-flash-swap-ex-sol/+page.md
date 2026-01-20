## Uniswap V2 Flash Swap

In this lesson, we'll write a smart contract that leverages Uniswap V2's flash swap feature.

Uniswap V2 allows you to borrow liquidity from a pool to execute an arbitrage opportunity, then repay the liquidity and keep the profits. This is referred to as a flash swap.

Let's implement a smart contract that executes a flash swap on Uniswap V2.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/UniswapV2Pair.sol";
import "./interfaces/IERC20.sol";

contract UniswapV2FlashSwap {

  UniswapV2Pair private immutable pair;
  address private immutable token0;
  address private immutable token1;

  constructor(address _pair) {
    pair = UniswapV2Pair(_pair);
    token0 = pair.token0();
    token1 = pair.token1();
  }

  function flashSwap(address _token, uint256 amount) external {
    require(_token == token0 || _token == token1, "invalid token");

    // Determine amount0Out and amount1Out
    (uint256 amount0Out, uint256 amount1Out) = _token == token0 ? (amount, 0) : (0, amount);

    // Encode token and msg.sender as bytes
    bytes memory data = abi.encode(_token, msg.sender);

    // Call pair swap
    pair.swap(amount0Out, amount1Out, address(this), data);
  }
}
```

This contract has a single function `flashSwap`. This function takes two arguments, the token address and the amount of the token to borrow.

Here is what the `flashSwap` function does:

1. It determines which token is being borrowed.
2. It encodes the token and the message sender as bytes.
3. It calls the Uniswap V2 pair contract's `swap` function.

Now let's move on to the Uniswap V2 pair contract. This contract needs to have a function that is called back by our `flashSwap` contract. This function is called `uniswapV2Call`:

```solidity
  // Uniswap V2 callback
  function uniswapV2Call(
      address sender,
      uint256 amount0,
      uint256 amount1,
      bytes calldata data
  ) external {
      // Write your code here
      // Don’t change any other code

      // 1. Require msg.sender is pair contract
      // 2. Require sender is this contract
      // Alice -> FlashSwap ---- to = FlashSwap ----> UniswapV2Pair
      //                    <-- sender = FlashSwap --
      // Eve ------------ to = FlashSwap -----------> UniswapV2Pair
      //          FlashSwap <-- sender = Eve --------
      if (msg.sender != address(pair)) {
          revert NotPair();
      }
      // 2. Check sender is this contract
      if (sender != address(this)) {
          revert NotSender();
      }
      // 3. Decode token and caller from data
      (address token, address caller) = abi.decode(data, (address, address));
      // 4. Determine amount borrowed (only one of them is > 0)
      uint256 amount = token == token0 ? amount0 : amount1;

      // 5. Calculate flash swap fee and amount to repay
      // fee = borrowed amount * 3 / 997 + 1 to round up
      uint256 fee = ((amount * 3) / 997) + 1;
      uint256 amountToRepay = amount + fee;

      // 6. Get flash swap fee from caller
      IERC20(token).transferFrom(caller, address(this), fee);
      // 7. Repay Uniswap V2 pair
      IERC20(token).transfer(address(pair), amountToRepay);
  }
```

The `uniswapV2Call` function does the following:

1. It verifies that the message sender is the Uniswap V2 pair contract.
2. It verifies that the caller is this contract.
3. It decodes the token and the caller from the data passed in the `swap` call.
4. It determines the amount that was borrowed.
5. It calculates the flash swap fee.
6. It transfers the flash swap fee from the caller to this contract.
7. It repays the Uniswap V2 pair contract the borrowed amount plus the flash swap fee.

To test this we can run the following command in the terminal.

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v2/exercises/UniswapV2FlashSwap.test.sol
```

In this example, we are borrowing 1 million DAI. The flash swap fee will be approximately 3,009 DAI.

The flash swap fee is a percentage of the borrowed amount, designed to incentivize proper repayment. It is important to note that the fee calculation is specific to the Uniswap V2 protocol and may differ in other decentralized exchanges. 
