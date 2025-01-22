## Code Walkthrough: claim_admin_fees Function

Let's explore the code for the `claim_admin_fees` function. This function is designed to facilitate the collection of admin fees, which are then used to mint LP shares for the admin. This process eliminates the need for the admin to manually transfer tokens out and back in for minting purposes.

Within the function, we begin by calculating `A` and `gamma` and then caching some state variables such as `xcp_profit`, `xcp_profit_a`, and `total_supply`. It is important to note that `xcp_profit_a` is a state variable updated with each call to the `claim_admin_fee` function. At the conclusion of the function, `xcp_profit_a` is updated to reflect the current value of `xcp_profit`. We can also see that the difference between `xcp_profit` and the previously stored `xcp_profit` (i.e. `xcp_profit_a`) represents the profit or growth in `xcp_profit`.

Next, if `xcp_profit` is less than or equal to the previous value of `xcp_profit`, the function terminates, preventing any further action. The token balances are then synchronized with the state variable `balances`, so that `balances[i]` is equal to the token balance of the contract, and the state variable `virtual price` is cached.

Moving on, the function determines the fees to be claimed by the admin using the following equation:

```javascript
fees: uint256 = unsafe_div(
    unsafe_sub(xcp_profit, xcp_profit_a) * ADMIN_FEE, 2 * 10**10
    )
```

The `admin_fee` is hardcoded as `50%`.  If we use a diagram, we can illustrate how this calculation is done. Let�s say that the `xcp_profit` is here, and the `xcp_profit_a` is here. This represents the profit, or the difference between `xcp_profit` and `xcp_profit_a`. Half of this difference, will be 50% which is the admin fee, and half of this will go to rebalancing the pool. Which means the profit that can be claimed is this part, and then half of this will go to the admin. So the admin is going to get one fourth of the difference. The `/ 2` in the `fees` equation implements this division.

The code then calculates the fraction of LP shares to mint to the admin:

```javascript
frac: uint256 = vprice * 10**18 / (vprice - fees) - 10**18
```

In the code, we can state that v equals the virtual price, f equals the fees calculated above, t equals the total supply, and q represents this fraction. Later, we will show that this value q represents the percentage of the growth of virtual price from `b - f` to `b`.

If the admin increased the virtual price from `b - f` to `b`, then in proportion to this we mint LP shares.  Let's call the ratio of increase from `b - f` to `b`, `q`. The following equation is then used for the total supply: 
`T * (1 + q) / T = v / (v - f)`
After solving for `q`, we will get `q = v / (v - f) - 1` , which is the equation that we are using.

Once the percentage of growth in the virtual price is determined, we mint an amount of shares relative to this growth for the admin using:
```javascript
claimed: uint256 = self.mint_relative(receiver, frac)
```
On the next line, `xcp_profit` is deducted by `fees * 2`.
```javascript
fees = 2 * (xcp_profit - xcp_profit_a) / 2
```
It's important to remember that fees is `1/4` of the profit. By multiplying by 2, we get half the profit. This appears to be the code deducting half of the profit.

Next the state variable `xcp_profit` is updated, followed by logging the event.  The variable `d` is calculated and stored in the state variable, the virtual price is updated, and then `xcp_profit_a` is set to the previously calculated value of `xcp_profit`.

This concludes our walkthrough of the `claim_admin_fees` function.
