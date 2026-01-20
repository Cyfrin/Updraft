### Exercise 2

In this lesson, we'll be deploying a new Uniswap V3 pool contract, using tokens A and B, which were deployed inside the setup, with a 0.1% fee.

To deploy the pool inside the Uniswap V3 Factory interface, we need to call the `createPool` function, passing in the inputs `tokenA`, `tokenB`, and `fee`. This function will return the address of the deployed pool.

To do this, we'll declare the following variable:
```javascript
address pool;
```
We can then call the `createPool` function, assigning the address of the deployed pool to the `pool` variable.
