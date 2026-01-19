### Calculating Spot Price from Square Root Price

In this lesson, we'll explore another method of calculating the spot price within Uniswap V3. We'll derive the spot price from the square root price X96. To start, we will use the square root price X96, which we got from the WETH/USDT pool. It's important to remember that the square root price X96 is essentially the square root of the price, multiplied by a certain factor, and within the Uniswap V3 code, it's referred to as Q96.

Let's define Q96 in our Python code:
```javascript
Q96 = 2 ** 96
```
To calculate the price, we'll first divide the square root P X96 by Q96:
```javascript
p = (sqrt_p_x96 / Q96)
```
This gives us the square root of the price. To find the actual price, we will need to square this result:
```javascript
p = (sqrt_p_x96 / Q96) ** 2
```
Now we will print the value of p:
```javascript
print(p)
```
The output will be a small number. This is because we haven't accounted for the decimals for WETH and USDT. If we go back to the price equation again, the price p is the ratio of token y over token x. In this particular pool, WETH/USDT, WETH is token x, and USDT is token y. Therefore, y represents USDT and x represents WETH.

Next, we need to factor in decimals. USDT has 6 decimals, represented by 1e6, and WETH has 18 decimals or 1e18. At this stage, the price would be the price of WETH in terms of USDT, and we still have those decimals that is why we are seeing a small number.

To cancel out the decimals, we first need to divide by 1e6 since here, the price is multiplied by 1e6. We'll then need to multiply by 1e18 to cancel the division by 1e18.
```javascript
print(p / 1e6 * 1e18)
```
Let's print the price again, this time we will get the correct price. The price equals 3378, meaning one WETH is roughly equivalent to 3378 USDT.
