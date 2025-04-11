## Calling the `get_dy` Function

Okay, let's go over the solution to call the `get_dy` function on the pool contract. The interface for the pool contract is defined in the imports as follows:

```javascript
import { ITriCrypto } from "./../src/interfaces/curve/ITriCrypto.sol";
```

Let's examine the interface to understand how to call the `get_dy` function. The interface is located under:

`source/interfaces/curve/ITriCrypto.sol`

Here is the interface. To call the `get_dy` function, we need to use this function:

```javascript
function get_dy(uint256 i, uint256 j, uint256 dx) external view returns (uint256 dy);
```

The function takes the index of the coins as input. `i` represents the index of the token to put in, `j` is the index of the token to receive, and `dx` is the amount of token to input.

Returning to our exercise, we need to call:

```javascript
pool.get_dy()
```

For this exercise, we will calculate the swap amount for one WETH to USDC.

WETH is the third token in the pool, so its index is 2. USDC is the first token in the pool, with an index of 0. We are swapping from token 2 to token 0, meaning WETH to USDC. The amount of WETH we will put in is one WETH. WETH has 18 decimals, so one WETH is 10 to the 18th power, or `1e18`.

```javascript
pool.get_dy(2, 0, 1e18)
```

This completes the exercise. Note that we are not actually swapping the tokens here. We are querying for the estimate of how many tokens we would get if we were to input this much WETH. Let's try executing the exercise.

To execute the exercise, we use the following command:

```bash
forge test -vvv
```

It's important to set the environment variable for `FORK_URL` and ensure that we only run the test for `get_dy` by including the parameter `--match-test test_get_dy`. Additionally, we have to specify the EVM version to be `cancun`.

Next, we will execute the exercise by copying the following command:

```bash
forge test --evm-version cancun --fork-url $FORK_URL --match-test test_get_dy --match-path test/curve-v2/exercises/CurveV2Swap.test.sol -vvv
```
and pasting it into the terminal.

The test passed. Let's take a look at what the console log printed. `dy` is equal to 3.07 * 10^9. Since USDC has 6 decimals, this means that we will receive about 3,070 USDC. If we were to put in one WETH, the estimated amount of USDC that we would receive is 3,070 USDC.
