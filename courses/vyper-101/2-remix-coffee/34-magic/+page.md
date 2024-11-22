## Antipattern: Magic Numbers

We're going to learn about a programming antipattern called "magic numbers." An antipattern is essentially a "bad coding habit" or an unrecommended way to write code.

We can see a magic number in the following code block:

```python
eth_amount_in_usd: uint256 = (eth_price * eth_amount) // (10 ** 18)
```

The magic number here is 18.

We'll improve readability by using a variable to represent this value:

```python
PRECISION: constant(uint256) = 1 * (10 ** 18)
```

Now, we can replace the magic number with the `PRECISION` variable, which makes the code clearer:

```python
eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
```
