### Solution for Exercise 1: Getting the DAI/USDC Pool Address

Let's walk through the solution for Exercise 1. Our goal is to get the address of the liquidity pool for the DAI/USDC pair with a 0.1% fee.

To get the pool address, we need to call the `getPool` method from the `factory` object:
```javascript
address pool = factory.getPool
```
Looking at the `IUniswapV3Factory` interface, we see the `getPool` function takes three parameters: the address of tokenA, the address of tokenB, and the pool fee, which is a `uint24`.
```javascript
function getPool(address tokenA, address tokenB, uint24 fee)
```
In our scenario, the order in which we pass DAI and USDC doesn't matter, as we'll end up with the same pool address regardless.

Let's add the DAI, USDC, and fee parameters into the `getPool` method:
```javascript
address pool = factory.getPool(DAI, USDC, 100)
```
The question now is, how do we get 100 for the fee? The pool fee is calculated with a denominator of 10^6 or 1e6. Since we want 0.1%, we calculate this as 100 / 1e6. You can verify this using a calculator.

The complete code for Exercise 1 is:
```javascript
address pool = factory.getPool(DAI, USDC, 100);
```
Before running the test, let's remove Exercise 2's code temporarily:
```javascript
  function test_createPool() public {
    }
```
Now, let's execute our test. First, we need to set the `FORK_URL` environment variable in the terminal:
```bash
FORK_URL=https://eth-mainnet.g.alchemy.com/v2/...
```
Then we run the test using `forge`:
```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Factory.test.sol
```
We can see that our test has passed successfully.
