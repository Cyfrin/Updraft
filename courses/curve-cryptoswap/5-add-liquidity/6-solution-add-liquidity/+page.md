### Solution: add_liquidity

Let's go over the solution to call the `add_liquidity` function. First, we need to know what parameters to pass to the function. The interface for the iTriCrypto contract is in source/interfaces/curve/ITriCrypto.sol.

```javascript
interface ITriCrypto {
  function add_liquidity(
    uint256[3] calldata amounts,
    uint256 min_lp,
    bool use_eth,
    address receiver
  ) external returns (uint256 lp);
}
```

The function that we'll need to call is `add_liquidity`. The contract that we'll call is the pool contract, and then the function is `add_liquidity`. It's going to return the amount of LP shares that were minted, but we won't need that for this exercise.

These are the parameters that we'll need to prepare. Let's start with an array of size three, that specifies the amount of each token that we are going to put in. To do this, we will create an array in memory:

```javascript
uint256[3] memory amounts = [uint256(1000 * 1e6), uint256(0), uint256(0)];
```

Here, we're specifying that we are going to add liquidity. The amount of tokens that we're going to add is 1000 USDC, 0 WBTC, and 0 WETH.

The first parameter is prepared. We are going to use curly braces so that we can specify which input corresponds to the value that we are passing in:

```javascript
pool.add_liquidity({
  amounts: amounts,
  min_lp: 1,
  use_eth: false,
  receiver: address(this)
});
```

`amounts` will be the `amounts` array that we just prepared. `min_lp` is the minimum amount of LP shares that we expect to get back for adding this much as liquidity. For simplicity, we'll just put one. `use_eth` asks if we are going to use ETH to add liquidity. Since we are adding USDC we are not going to be adding any WETH or ETH, so we set it to false. `receiver` is the receiver of the LP shares, so we'll use `address(this)`.

This completes the exercise. Now let's try executing this test. The command that we'll use is:

```bash
forge test \
  --evm-version cancun \
  --fork-url $FORK_URL \
  --match-path test/curve-v2/exercises/CurveV2AddLiquidity.test.sol -vvv
```

Inside the terminal, we'll paste this and execute.

```bash
forge test \
  --evm-version cancun \
  --fork-url $FORK_URL \
  --match-path test/curve-v2/exercises/CurveV2AddLiquidity.test.sol -vvv
```

Our test passes.
