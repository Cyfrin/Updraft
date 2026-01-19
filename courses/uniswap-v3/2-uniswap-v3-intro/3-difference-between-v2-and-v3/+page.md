###  Difference between Uniswap V2 and V3

In this lesson, we will discuss the differences between Uniswap V2 and V3.

In Uniswap V2, the smart contract tracks the reserves of token X and token Y. Using this data, we can calculate the liquidity and price. The liquidity formula is:
```javascript
x * y = L^2
```
The formula for price is:
```javascript
p = y/x
```
In Uniswap V3, things are different. The smart contract tracks liquidity and price. We can use this information to calculate the reserves of token X and token Y between price ranges P sub A and P sub B. The formula for X is:
```javascript
x = (L / √Pa) - (L / √Pb)
```
The formula for Y is:
```javascript
y = L√Pb - L√Pa
```
Another difference is that V2 has passive liquidity management while V3 has active liquidity management. In Uniswap V2, liquidity providers only need to deposit tokens. Over time, their liquidity will collect swap fees. This liquidity is represented by an ERC20 token. In V3, liquidity must be managed actively. The token you get for providing liquidity is an ERC721 token.

When adding liquidity to Uniswap V3, a price range needs to be specified. When the current price is within that range, the liquidity position will collect swap fees. When the price goes outside of the specified range, the liquidity will no longer collect swap fees. To collect swap fees, liquidity providers must reposition their liquidity within the current price range.

The liquidity and swap fees collected depend on the price range specified when the liquidity was provided and how long the liquidity was provided. Because of this, the liquidity can no longer be represented as an ERC20 token and is represented as an ERC721 token.

Some other differences between V2 and V3 are the swap fees. V2 has only one fee: 0.3%. V3 has four fees:
```
0.01, 0.05, 0.3, 1%
```
More fees can be added by the Uniswap governance.

Another difference is how the time weighted average price, or TWAP, is stored. V2 stores the TWAP as an arithmetic mean, and V3 stores it as a geometric mean.

Pros and cons of V3

Let's take a look at some pros and cons of using Uniswap V3.
Some pros are:

Higher capital efficiency for LPs. This is because concentrated liquidity allows the liquidity provider to use all of their tokens.

Single sided liquidity allows us to add liquidity using only one token. We can also create range limit orders.

For example, if ETH's current price is 1500 USDC and we are willing to sell our ETH for 1600 USDC, we can add liquidity to the price range of 1600 to 1700 USDC. If the current price goes above 1700, all our ETH will now be in USDC and we have sold it for over 1600 USDC.

Some cons include:

Active liquidity management. To collect swap fees in Uniswap V3, liquidity providers have to reposition their liquidity anytime the current price goes outside of the specified price range.

Liquidity is represented as a non-fungible token, or ERC721. This makes liquidity more difficult to transfer than in V2. Smart contract developers will also need to put in more effort to integrate Uniswap V3 into smart contracts.

These are some of the pros and cons of Uniswap V3 and differences between V2 and V3.
