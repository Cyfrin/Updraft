## Getting the Spot Price from Uniswap V3: Slot0

To get the spot price from Uniswap V3, we need to look at the contract called `UniswapV3Pool`. Inside this contract there is a struct called `Slot0` that stores the data that we need, and it is stored as a state variable. Inside the struct there are a couple of data points we need to calculate the spot price: `sqrtPriceX96` and `tick`. Knowing either one of these pieces of data, we'll be able to calculate the spot price.

The struct is called `Slot0` because all of the data contained goes into the zeroeth slot in the storage. In EVM when you declare a state variable, these state variables are stored in different slots. Each slot can store up to 32 bytes of data. In this case, all of the data for `Slot0` fits inside of 32 bytes and is stored in the zeroeth slot of storage. The state variable is named `slot0`

```javascript
struct Slot0 {
  uint160 sqrtPriceX96;
  int24 tick;
  uint16 observationIndex;
  uint16 observationCardinality;
  uint16 observationCardinalityNext;
  uint8 feeProtocol;
  bool unlocked;
}

Slot0 public override slot0;
```

The main reason why the data is stored in `slot0` is to save gas. We will now take a look at a real world example of a square root price x96 and tick.

We are going to look at the Uniswap V3 pool contract for `WETH`/`USDT`. Inside etherscan we will click on the read contracts tab, scroll down and find the function `slot0`. After clicking on this function, then clicking on `query`, we see that the tick is `-195301` and the square root price x96 is `4551852809367933182694918`.

In the following videos, we'll explain how to use the `tick` and the `sqrtPriceX96` to calculate the price.
