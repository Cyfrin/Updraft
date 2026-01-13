### Calling the `remove_liquidity_one_coin` function

Let's go over the solution for calling the `remove_liquidity_one_coin` function. First, we'll take a look at the interface `ITriCrypto.sol`. Inside this interface we see that we need to call the function `remove_liquidity_one_coin`. We will copy this function and paste it into the exercise.
```javascript
pool.remove_liquidity_one_coin()
```
The contract that we'll be calling is the `pool` contract. The output of this function call will be the amount of tokens returned from the pool contract. The inputs for this function call are:
`lp`:  the amount of LP shares to burn.
`i`: the index of the token that we wish to get back.
`min_amount`: the minimum amount of the token that we expect to get back.
`use_eth`: whether we want ETH back.
`receiver`: the address that will receive the tokens.

Let's prepare the inputs, we will return all the LP shares owned by this contract.
```javascript
uint256 lpBal = pool.balanceOf(address(this))
```
Once we have the LP balance we will specify it as the first input for the `remove_liquidity_one_coin` function.
```javascript
lp: lpBal
```
The next input is `i`. This will be the index of the token that we wish to get back. For this exercise we want USDC back, and it's index is `0`.
```javascript
i: 0
```
The next input is the `min_amount`. This is the minimum amount of USDC that we expect to get back. We will just specify this as `1`.
```javascript
min_amount: 1
```
The next input is `use_eth`. We want USDC back, so we will specify this as `false`.
```javascript
use_eth: false
```
The final input is `receiver`. The receiver of the USDC will be this contract.
```javascript
receiver: address(this)
```
That completes this exercise. Let's execute this test. The name of the test is `test_remove_liquidity_one_coin`. In order to execute the test we need to match the test name in the command. Here we are using forge to run the test.
```bash
forge test \
--evm-version cancun \
--fork-url $FORK_URL \
--match-test test_remove_liquidity_one_coin\\b \
--match-path test/curve-v2/exercises/CurveV2RemoveLiquidity.test.sol -vvv
```
The test passes. Inside the logs, the amount of USDC that we got back is approximately 9.99 x 10^8, which is about 999 USDC. The amount of WBTC and WETH that we got back is zero, because when calling the function `remove_liquidity_one_coin`, we specified that the token that we wanted liquidity back in is only USDC.
