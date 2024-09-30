## The `get_virtual_price` Function

In this lesson, we're going to break down the `get_virtual_price` function. We'll learn what the function calculates and how it uses other functions to achieve this.

The function looks like this:

```javascript
@view
@external
def get_virtual_price() -> uint256:
    """
    Returns portfolio virtual price (for calculating profit)
    scaled up by 1e18
    """
    D: uint256 = self.get_D(self.xp(), self.A())
    # D is in the units similar to DAI (e.g. converted to precision 1e18)
    # When balanced, D / N = x / u - total virtual value of the portfolio
    # token_supply: uint256 = self.token.totalSupply()
    return D * PRECISION / token_supply()
```

Let's break down what each line of code does. 

First, we see the function takes the value of `D`. In previous lessons, we learned that this value is calculated using the function `get_D`. We can use this knowledge to understand how the function works. 

`D` represents the liquidity of the AMM. When all the token balances inside the AMM are equal, the pool is perfectly balanced. We can say that if there are `N` tokens, then `D / N` will be the token balance for each token.

Therefore, `D` is the liquidity of the pool.

Next, the function retrieves the `token_supply`. This represents the amount of LP tokens that were minted. 

After obtaining the value of `D` and the `token_supply`, the function multiplies `D` by `PRECISION` and divides the result by the `token_supply`. This means that the function `get_virtual_price` is calculating the value of each LP token. 

In summary, the `get_virtual_price` function calculates the virtual price of each LP token within the AMM. It achieves this by first calculating the liquidity of the pool (`D`) and then dividing that value by the total amount of minted LP tokens. 
