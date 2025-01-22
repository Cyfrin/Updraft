## Adding Liquidity to Curve V2

Traders can swap tokens using the Curve V2 AMM. But, how are the tokens put into the pool contract in the first place? This is what liquidity providers do. Liquidity providers deposit tokens into the Curve V2 AMM, and in return, they can claim the swap fees collected from traders.

As a liquidity provider, we would not want the deposited tokens to be stuck in the pool contract indefinitely. Therefore, there's an option to remove liquidity at any time. Let's consider an example for a USDC, WBTC, and ETH pool. To add liquidity, a user will call the `add_liquidity` function. This will specify the amount of USDC, WBTC, and ETH to deposit into the Curve V2 AMM contract. There are no restrictions on the amount of tokens that can be deposited. For example, a user can deposit 100 USDC, 0 WBTC, and 0 ETH, or equal amounts of 100 USDC, 100 WBTC, and 100 ETH.

After the user adds liquidity, the pool contract will mint liquidity provider shares. These shares represent the percentage of liquidity owned by the user. Liquidity can have different meanings for different AMMs. The basic idea of liquidity involves taking the token amounts and parameters, performing calculations, and determining a value.

For instance, in a constant product AMM, `x * y = L�`. Liquidity is calculated by multiplying the token balances and then taking the square root to solve for L. Curve V2 employs a more complex method for calculating liquidity.

A user also has the option to add liquidity using WETH. This is similar to swapping with WETH in Curve V2. If a user chooses to add liquidity using WETH instead of ETH, after transferring WETH from the user to the pool contract, the pool contract will call `withdraw` on the WETH contract. The WETH contract takes the WETH owned by the pool contract and transfers ETH back to the pool contract.

```javascript
xy = L�
```
