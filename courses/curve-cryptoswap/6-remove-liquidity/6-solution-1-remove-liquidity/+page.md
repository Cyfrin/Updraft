## Solution: Remove Liquidity

Let's go over the solution to call the `remove_liquidity` function. First, we'll need to look at the interface, `ITriCrypto.sol`, located at `src/interfaces/curve/ITriCrypto.sol`. The function we will need to call is `remove_liquidity`, and here is it's interface:
```javascript
function remove_liquidity(
    uint256 lp,
    uint256[3] calldata min_amounts,
    bool use_eth,
    address receiver,
    bool claim_admin_fees
  ) external returns (uint256[3] memory);
```
So, this is the function and the parameters that we need to pass.

The contract we need to call is `pool`, and the function is `remove_liquidity`. We are going to use curly braces to more easily understand what parameters we are passing in. For the output, we will get the amount of tokens that were sent back to this contract.

Let's start by preparing the inputs. We will need to specify the amount of LP shares that we will be burning. Let's get the amount of LP shares this contract owns by defining:
```javascript
uint256 lpBal = pool.balanceOf(address(this));
```
Next, we need to provide the LP value to the `remove_liquidity` function. We will be burning all the LP shares from this contract, so we will pass in `lpBal`.
```javascript
pool.remove_liquidity(
    lp: lpBal,
    min_amounts,
    use_eth,
    address receiver,
    bool claim_admin_fees
  )
```
Next, for `min_amounts`, we need to prepare a uint array of size 3:
```javascript
uint256[3] memory minAmounts = [uint256(1), uint256(1), uint256(1)];
```
We will set the minimum amount for all three tokens to `1`.
```javascript
min_amounts: minAmounts,
```
Next we will set `use_eth` to false:
```javascript
use_eth: false,
```
The `receiver` will be this contract, and the address is the one that will receive the tokens, so that is `address(this)`
```javascript
receiver: address(this),
```
Finally, we will set `claim_admin_fees` to `false`, since we are not sure if we need to claim the admin fees
```javascript
claim_admin_fees: false
```
The test that we will be executing is `test_remove_liquidity`. Within this contract, there are two tests, `test_remove_liquidity` and `test_remove_liquidity_one_coin`.

To make sure that we are executing the correct test, we will use the match test parameter and the following regular expression:
```bash
forge test \
--evm-version cancun \
--fork-url $FORK_URL \
--match-test test_remove_liquidity\\b \
--match-path test/curve-v2/exercises/CurveV2RemoveLiquidity.test.sol -vvv
```
This will ensure that only the `test_remove_liquidity` test is executed, and not the `test_remove_liquidity_one_coin`.

Then we will run this to test our code.
```bash
forge test \
--evm-version cancun \
--fork-url $FORK_URL \
--match-test test_remove_liquidity\\b \
--match-path test/curve-v2/exercises/CurveV2RemoveLiquidity.test.sol -vvv
```
And our test has passed.

And those are the amounts of tokens that we got back for removing the liquidity. When we added liquidity, we added 1000 USDC. When we removed it, we got back about 330 USDC, this amount of WBTC, and about 0.1 WETH.
