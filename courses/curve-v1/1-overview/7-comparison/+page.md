## Comparing Curve V1, Uniswap V2, and Uniswap V3 (Swapping USDC/DAI)

In this lesson, we will consider the differences between Curve V1, Uniswap V2, and Uniswap V3. Specifically, we will look at these differences in the context of swapping USDC and DAI.

Let's begin by considering the language used by each AMM. Both Uniswap V2 and Uniswap V3 are written in Solidity. Curve V1, on the other hand, is written in Vyper.

In the previous video, we saw that Uniswap V2 has high slippage. For example, if we were to swap 1,000 USDC, then we would only receive 996 DAI on Uniswap V2. Uniswap V3 introduces concentrated liquidity, which results in lower slippage. If we were to swap 1,000 USDC, we would likely receive something close to 1,000 DAI. 

Curve V1 also has low slippage. If we were to swap 1,000 USDC on Curve V1, we would receive 999.92 DAI.

The next difference we will consider is how many tokens can be added to the pools. Both Uniswap V2 and Uniswap V3 support only two tokens. For example, on Uniswap V2, we saw a USDC/DAI pool. Uniswap V3 can also only have two tokens.

Curve V1 is different. It can have two or more tokens. For example, on the Curve Finance user interface, we can see a pool that has three tokens: DAI, USDC, and USDT. There are also pools with four tokens.

Another difference between Uniswap AMMs and Curve AMMs is how liquidity is added and removed. In Uniswap V2, when we add liquidity, both tokens must be sent. When we remove liquidity, both tokens will come out.

Uniswap V3 is a little more complex. Adding liquidity depends on the price range that we are adding liquidity to and the current price. If we add liquidity to a price range outside the current active price, then we can only add one token. However, if we are adding liquidity to a price range that includes the active price, then we must add both tokens. Removing liquidity works the same way. If we are removing liquidity from a position outside the active price, then we can only withdraw one token. However, if our liquidity position is within the active price, then we will get both tokens.

Curve V1 allows us to specify which tokens we want to withdraw. It can be one token, it can be all tokens, or it can be somewhere in between. For example, if we have 100 LP tokens in a Curve pool that consists of DAI, USDC, and USDT, and we only want to withdraw DAI, then we can do so. We can also withdraw only USDC or USDT. We can also withdraw all of the tokens in a balanced way or specify how we want to withdraw them. For example, we could decide to withdraw only DAI and USDT and not USDC.

On Uniswap V2 and Uniswap V3, there is no fee charged for adding or removing liquidity. However, on Curve V1, there is a fee charged for imbalance. This means that if we had 100 USDC, 100 DAI, and 100 USDT in a Curve pool and decided to withdraw all of our liquidity in DAI, then a fee would be charged. The same is true when we are adding liquidity.

The last major difference between Uniswap and Curve V1 is how swap fees are charged. Both Uniswap V2 and Uniswap V3 charge swap fees on token in. However, Curve V1 charges swap fees on token out.

These are just some of the key differences between Curve V1, Uniswap V2, and Uniswap V3. As you can see, each AMM has its own unique characteristics. 
