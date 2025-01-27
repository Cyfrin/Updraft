### Code Outline for `add_liquidity` Function

Here, we will briefly outline the code for the `add_liquidity` function.

The function will take several inputs, but the one that we want to highlight is `amounts`. This will represent the amount of tokens to add as liquidity. Similar to Curve V1, you can specify any amount of tokens that you want to put in.

If the amounts that you add end up changing the price given by the AMM, then you'll be charged an imbalance fee.

Inside the function, the following steps occur:
1. The function will first calculate `A` and `gamma`.
2. It then copies the token balances into an array initialized in memory called `xp`.
3. Next, it will add the amounts from the input to this `xp` array.
4. The function then updates the state variable, token balances.
5. The in-memory array `xp` is then used to store the transformed normalized balances.
6. The tokens are then transferred in.
7. If `A` and `gamma` are currently updating, the function will calculate `D` before any liquidity is added.
8. Then, the new `D`, based off of the transformed token balances after adding liquidity is calculated.
9. Next, the `LP shares to mint` is calculated.
The amount of LP tokens to mint is named `d_token`. The way it is calculated is:
```javascript
d_token = (new D / old D) * total_supply - total_supply
```
The ratio `new D / old D` will represent the growth in `D`. This is multiplied by the `total_supply` where `total_supply` is the total supply of LP tokens that have been minted so far.
This will then represent the new total supply. Taking the difference from the current total supply, this will give us the amount of LP tokens that need to be minted.

Next, the function will calculate the imbalance fee. Since there's no restriction on the amount of tokens that can be added as liquidity, tokens can be added in a way such that the ratio of token balances will change. This will result in the pricing of the tokens to change, and hence an imbalance fee will be charged.

The imbalance fee is then deducted from the amount of LP tokens to mint.
The LP token is then minted.
The function then calls the internal function `tweak_price`.
Finally, the function calls the internal function `claim_admin_fees`.
