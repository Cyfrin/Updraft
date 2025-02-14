# Exercise 1 Solutions: Uniswap V3 Flash Exercises
Let's go over the solutions to a smart contract exercise. The first task is to ABI encode the `flashCallbackData`. To do so, we will declare:

```javascript
bytes memory data = abi.encode(FlashCallbackData(
```

We will fill in the data that we need for this struct. The data we need includes `amount0`, `amount1`, and `caller`. We can input these as

```javascript
bytes memory data = abi.encode(FlashCallbackData(
  amount0,
  amount1,
  caller: msg.sender
));
```

This completes task one.

For task two, we need to call `IUniswapV3Pool.flash`. How do we call this function? We will navigate to the interface `IUniswapV3Pool` to find out how to call the function `flash`. Inside this interface, we can find where function `flash` is defined. For the parameters, we can remember `recipient`, `amount0`, `amount1`, and `data`. Going back to our contract, the pool contract has already been initialized, we will say:

```javascript
pool.flash(
  address(this),
  amount0,
  amount1,
  data
);
```

This completes task two.

Task three is to check if `msg.sender` is the pool. We can do this by saying:

```javascript
require(msg.sender == address(pool), "not authorized");
```

Only the Uniswap V3 pool contract will be able to call the `uniswapV3FlashCallback` function. For task four, we need to decode the data from the input into struct `FlashCallbackData`. To do this we declare:

```javascript
FlashCallbackData memory decoded = abi.decode(data, (FlashCallbackData));
```

The next task is to transfer fees from `FlashCallbackData.caller`. This will be the fee that will be repaid to the pool contract. The fees are specified by the pool as `fee0` and `fee1`. We will say:

```javascript
if (fee0 > 0) {
  token0.transferFrom(decoded.caller, address(this), fee0);
}
if (fee1 > 0) {
  token1.transferFrom(decoded.caller, address(this), fee1);
}
```

Finally, for the last task, we will repay the pool for the amount borrowed plus the fee. For token zero, we know we borrowed some amount.

```javascript
if(decoded.amount0 > 0) {
  token0.transfer(address(pool), decoded.amount0 + fee0);
}
if(decoded.amount1 > 0) {
  token1.transfer(address(pool), decoded.amount1 + fee1);
}
```

And that completes task number six. If you wanted to add some custom logic like doing an arbitrage after a flash swap, you would write your custom logic in between tasks four, five, or six.

Now let's execute the test. Inside our terminal, we'll first set the environment variable for fork URL:

```bash
export FORK_URL=https://eth-mainnet.g.alchemy.com/v2/_KzrTpEzHzNqs4Jn_05qMZW4AjsQS0K4
```

Next we'll execute the tests by typing

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Flash.test.sol -vvv
```

And our tests passed.
