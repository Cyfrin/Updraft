### Exercise 2 Solution

Let's go over the solution for exercise two. To deploy a pool, we'll need to call the `factory.createPool` function. The three inputs that we need to pass are `tokenA`, `tokenB`, and `fee`.

For tokenA, we'll pass in `address(tokenA)`, `address(tokenB)` for tokenB, and `100` which is equivalent to 0.1% fee.

```javascript
address pool = factory.createPool(address(tokenA), address(tokenB), 100);
```

That completes the exercise.

Now, let's execute exercise 2. Inside the terminal, we'll execute the same test command:

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Factory.test.sol
```

And our test passed again.
