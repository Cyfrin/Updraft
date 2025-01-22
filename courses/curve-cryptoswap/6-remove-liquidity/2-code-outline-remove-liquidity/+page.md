### Code Outline of the `remove_liquidity` Function

Before we begin a code walkthrough of the `remove_liquidity` function, we will outline what's going on inside the code.

Inside the function, it will first call an internal function called `claim_admin_fees`.

Then, it is going to burn the amount of LP shares that was specified by the user.

Next, the amount of tokens that will be sent back to the liquidity provider will be calculated.

After calculating the amounts to send, the internal token balances will be updated.

The number D that is used for the curve B to AMM equation is stored in a state variable called d, and it will be decreased.

Lastly, the tokens will be transferred out.
