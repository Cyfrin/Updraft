## Adding Liquidity to a Uniswap v2 Pair

We'll now add liquidity to the DAI/WETH Uniswap v2 pair contract. We've already given our user some DAI and WETH to work with. Let's add some liquidity to this pair.

To add liquidity, we need to call the `addLiquidity` function on the `UniswapV2Router02` contract. The router contract will handle the transfer of DAI and WETH from the user to the pair contract.

We've already initialized the router contract in our code:

```javascript
UniswapV2Router02 private constant router =
UniswapV2Router02(UNISWAP_V2_ROUTER_02);
```

The code for adding liquidity to the DAI/WETH pair contract is:

```javascript
(uint amountA, uint amountB, uint liquidity) =
router.addLiquidity(
tokenA: DAI,
tokenB: WETH,
amountADesired: 1e6 * 1e18,
amountBDesired: 100 * 1e18,
amountAMin: 1,
amountBMin: 1,
to: user,
deadline: block.timestamp
);
```

The parameters for the `addLiquidity` function are:

- `tokenA`: This is the address of DAI.
- `tokenB`: This is the address of WETH.
- `amountADesired`:  We'll send 1 million DAI. In the setup function, we've given the user 1 million DAI.
- `amountBDesired`:  We'll send 100 WETH. In the setup function, we've given the user 100 WETH.
- `amountAMin`: This is the minimum amount of DAI that the pair contract must receive; otherwise, the function call will revert.  We'll set this to 1.
- `amountBMin`: This is the minimum amount of WETH that the pair contract must receive; otherwise, the function call will revert.  We'll set this to 1.
- `to`: This is the address that will receive the pool shares. We'll set this to `user`.
- `deadline`: This is the latest timestamp that the function call is valid. We'll set this to `block.timestamp`.

We'll also console.log the outputs, which are `amountA`, `amountB`, and `liquidity`.

```javascript
console2.log("DAI: %18e", amountA);
console2.log("WETH: %18e", amountB);
console2.log("LP: %18e", liquidity);
```

We'll run the test inside our terminal. First, we'll set an environment variable called `FORK_URL`. We'll use this URL to execute our test against the main network.

```bash
FORK_URL=https://eth-mainnet.alchemy.com/v2/Kx7ZpZEh8qkls4Jn_OSqM4AjS5DK4
```

Next, we'll execute the test by typing:

```bash
forge test --fork-url $FORK_URL --mp test/uniswap-v2/solutions/UniswapV2Liquidity.test.sol --mt test_addLiquidity -vvv
```

We've now successfully executed the test. It looks like we added 100 WETH to the DAI/WETH Uniswap v2 pair, and when we add 100 WETH, we also added this amount of DAI.

We can see the amount of DAI that was sent to the pair contract, which is roughly 2,928,818. This is because 1 WETH is currently worth about 2,928 DAI.

---

**The output is similar to:**

```js
Ran 1 test for test/uniswap-v2/solutions/UniswapV2Liquidity.test.sol:UniswapV2LiquidityTest
[PASS] test_addLiquidity() (gas: 126185)
Logs:
  DAI: 237789.880105763455138062
  WETH: 100
  LP: 2363.578747800960623045
```
