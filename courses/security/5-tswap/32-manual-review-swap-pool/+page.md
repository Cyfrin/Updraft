---
title: T-Swap Manual Review TSwapPool
---

---

### Events, State Variables and Constructor

Time to dive into the bulk of this manual review with the `TSwapPool.sol` contract.

Right at the top beneath the custom errors we actually see something nice `using SafeERC20 for IERC20`. The `SafeERC20` library is wonderful, it implements the `safeTransfer` and `safeTransferFrom` functions which protect against some variations of `Weird ERC20s`

Beneath this we see our state variable declarations.

```js
IERC20 private immutable i_wethToken;
IERC20 private immutable i_poolToken;
uint256 private constant MINIMUM_WETH_LIQUIDITY = 1_000_000_000;
uint256 private swap_count = 0;
uint256 private constant SWAP_COUNT_MAX = 10;
```

We first see 2 expected immutable variables, these will of course represent the weth token and the ERC20 associated with the pool.

Next is `MINIMUM_WETH_LIQUIDITY` which we may recall from our invariant testing. This is in our deposit function and represents the minimum amount of weth required in a deposit.

```js
if (wethToDeposit < MINIMUM_WETH_LIQUIDITY) {
    revert TSwapPool__WethDepositAmountTooLow(MINIMUM_WETH_LIQUIDITY, wethToDeposit);
}
```

The state variables section closes off with these two troublemakers:

```js
uint256 private swap_count = 0;
uint256 private constant SWAP_COUNT_MAX = 10;
```

These were involved in the issue which broken our invariant. We can see, within the `_swap` function the use of these variable in breaking our protocol invariant.

```js
function _swap(IERC20 inputToken, uint256 inputAmount, IERC20 outputToken, uint256 outputAmount) private {
    ...
    swap_count++;
    if (swap_count >= SWAP_COUNT_MAX) {
        swap_count = 0;
        outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
    }
    ...
}
```

We've already written some audit notes about events thanks to what Aderyn pointed out to us earlier. From there we hit some modifiers. We should double check that they're doing what they say intend to.

```js
modifier revertIfDeadlinePassed(uint64 deadline) {
    if (deadline < uint64(block.timestamp)) {
        revert TSwapPool__DeadlineHasPassed(deadline);
    }
    _;
}

modifier revertIfZero(uint256 amount) {
    if (amount == 0) {
        revert TSwapPool__MustBeMoreThanZero();
    }
    _;
}
```

Both look good. I'm getting hungry for bugs.

Then we come to the constructor, this more or less looks good, but you may recall that Aderyn pointed out a lack of zero address check here. It may be worth making a note.

```js
constructor(
    address poolToken,
    address wethToken,
    string memory liquidityTokenName,
    string memory liquidityTokenSymbol
)
    ERC20(liquidityTokenName, liquidityTokenSymbol)
{
    //@Audit - missing zero address checks
    i_wethToken = IERC20(wethToken);
    i_poolToken = IERC20(poolToken);
}
```

### Wrap Up

Well, things have been pretty clean so far. We touched on some previous issues we'd identified such as the fee on transfer situation and some information findings.

In the next lesson we're going to look at how we can use the solidity compiler itself as a static analysis tool to assist in our security reviews.

See you there!
