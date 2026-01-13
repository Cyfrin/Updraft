# Calculating the Virtual Price of an LP Token

The `get_virtual_price` function calculates the value of one LP token. When liquidity providers add liquidity, LP tokens are minted to them. This function determines the value of each LP token.

In Curve V1, the virtual price is calculated by first calculating `D`, and then dividing by the total supply of LP tokens minted.

Curve V2's virtual price calculation is a little more complex. We take the value for `D`, and pass it to the `get_xcp` function. The `get_xcp` function calculates `L` in a constant product AMM. For example, if we have the equation `x * y = L^2`, the `get_xcp` function will calculate the value of `L`.

Let's say there are `n` tokens, `x0`, and we multiply this all the way up to the last token, `xn-1`.
```
x0 * x...xn-1
```
The constant product equation will multiply all the token balances from `x0` to `xn-1`, and this will equal `L` raised to the power of `n`.
```
x0 * x...xn-1 = L^N
```
To calculate `L`, we take the nth root. Instead of using the actual token balances, the `get_xcp` function uses the token balances when the transformed balances are all equal to each other.

As a review, let's say the transformed balances `x sub i`, are equal to `D / N`:
```
x'i = D / N
```
We'll add a tick to indicate that this is a transformed balance. This means that the actual token balance, `x sub i`. To get the transformed balance we must multiply by the price scale, `p sub i` which must be equal to `D / N`.
```
xi * pi = D / N
```
The `i` values will range from `0` to `n - 1`. From this equation, the actual amount of tokens when the transformed balances are all equal to D over N, will be `x sub i` which equals `D / N * p sub i`. From this equation, we divide both sides by the price scale, `p sub i`. `p sub i` then becomes the denominator on the right side of the equation.
```
xi = D / (N * pi)
```
The `get_xcp` function will multiply all of these `x sub i`'s:
```
x0 * x1 ... xn-1
```
So `x0` times `x1`, all the way up to `xn-1`. This will equal:
```
D/N * D/ (N * p1) * D / (N * p2) ... D/(N * p(n-1))
```
Once this is calculated, it takes the nth root of this number to get the value for `L`. That's what the function `get_xcp` does.

Let's examine the function:
```javascript
def get_xcp(D: uint256) -> uint256:
    x: uint256[N_COINS] = empty(uint256[N_COINS])
    x[0] = D / N_COINS
    packed_prices: uint256 = self.price_scale_packed
    
    # PRICE_SIZE: constant(uint128) = 256 / (N_COINS - 1)
    # PRICE_MASK: constant(uint256) = 2**PRICE_SIZE - 1
    
    for i in range(1, N_COINS):
        x[i] = D * 10**18 / (N_COINS * (packed_prices & PRICE_MASK))
        packed_prices = packed_prices >> PRICE_SIZE

    x[0] = D / (N * p0)
```
First, it initializes an array of `uint256`, with the size `n_coins`. If the pool contract holds 3 tokens, then the array will be of size 3. The array will hold the balance of tokens when the transformed balances are all equal. `x sub 0` will be `D / N * P0`, and because the price scale of token zero is equal to 1, it can be thought of as being equal to `D / N`. The next element will be `D / N * P1`. For a pool with three tokens, the last element is `D / N * P2`.

The code shows that `x0` is assigned `D / N_COINS`, which is what we showed above. Next, it gets the packed prices, which is a state variable packing the price scales. Inside the for loop is the main body of the calculation. The for loop ranges from `i = 1` to less than `N_COINS`. If `N_COINS` is equal to 3, the for loop will range from `i = 1` to `i = 2`.

The code multiplies D by 10 to the 18th power, then divides that by `N_COINS` and unpacks the price scale for token i. The next line prepares for the next iteration, bit shifting the packed prices by `PRICE_SIZE`. When `N_COINS` is equal to 3, the `PRICE_SIZE` will be equal to 128. After the for loop, we have the array `x` with the stored values.
Finally, this array of size 3 is passed to a math function called `geometric_mean`. This function will multiply all the elements, `x0`, `x1` and `x2`, and take the cube root.
