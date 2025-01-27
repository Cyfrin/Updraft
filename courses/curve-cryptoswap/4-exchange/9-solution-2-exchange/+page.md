Okay, here is the written lesson based on the provided criteria:

### Calling the Exchange Function

Let's go over the solution for calling the `exchange` function on the pool contract.  First, we need to inspect the interface for the `ITriCrypto` contract.  This is found in the `src/interfaces/curve/ITriCrypto.sol` file.

```javascript
interface ITriCrypto {
    function precisions() external view returns (uint256[3] memory);
    function price_scale(uint256 i) external view returns (uint256);
    function balances(uint256 i) external view returns (uint256);
    function get_dy(uint256 i, uint256 j, uint256 dx)
        external
        view
        returns (uint256 dy);
    function exchange(
        uint256 i,
        uint256 j,
        uint256 dx,
        uint256 min_dy,
        bool use_eth,
        address receiver
    ) external;
    function add_liquidity(uint256[3] calldata amounts, uint256 min_lp, bool use_eth, address receiver) external returns(uint256 lp);
     function remove_liquidity(uint256 amount, uint256[3] calldata min_amounts, bool use_eth, address receiver) external returns(uint256[3] memory);
    function remove_liquidity_imbalance(uint256[3] calldata amounts, uint256 max_burn, bool use_eth, address receiver) external returns(uint256[3] memory);
    function remove_liquidity_one_coin(uint256 token_amount, uint256 coin_index, uint256 min_amount, bool use_eth, address receiver) external returns(uint256[3] memory);
}
```

We can see the `exchange` function which has several parameters we'll need to provide.

```javascript
function exchange(
        uint256 i,
        uint256 j,
        uint256 dx,
        uint256 min_dy,
        bool use_eth,
        address receiver
    ) external;
```

In our test, we'll call `pool.exchange` with the parameters enclosed in curly braces for clarity.

```javascript
pool.exchange({
    uint256 i,
    uint256 j,
    uint256 dx,
    uint256 min_dy,
    bool use_eth,
    address receiver
});
```

The parameter `i` is the index of the token we are sending, which is WETH, or `2`. The parameter `j` is the index of the token we are receiving, which is USDC, or `0`. `dx` is the amount of WETH we are sending, which is `1e18`, or 1 WETH. `min_dy` is the minimum amount of USDC we expect to receive, which we'll set to `1`. The parameter `use_eth` is `false` since we are using WETH, not ETH. Finally, the receiver address is the address of this contract, `address(this)`.

```javascript
pool.exchange({
        i: 2,
        j: 0,
        dx: 1e18,
        min_dy: 1,
        use_eth: false,
        receiver: address(this)
    });
```

This completes the second exercise. Let's try executing the test.  We'll execute the `test_exchange` function using the forge command with a match test flag:

```bash
forge test \
 --evm-version cancun \
 --fork-url $FORK_URL \
 --match-test test_exchange \
 --match-path test/curve-v2/exercises/CurveV2Swap.test.sol -vvv
```

After running the test, we can see that our test passed and we received approximately 3080 USDC for swapping 1 WETH.
