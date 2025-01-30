# Uniswap V3 Flash Function Code Walkthrough

Uniswap V3 provides a flash loan feature, allowing users to borrow tokens as long as the borrowed amount and a fee are returned in the same transaction. This requires calling the `flash` function on the `UniswapV3Pool.sol` contract.

The `flash` function accepts four parameters:
* `recipient`, an address for the tokens to be sent to
* `amount0`, the quantity of the first token
* `amount1`, the quantity of the second token
* `data`, arbitrary bytes data sent to the flash callback contract.

```javascript
function flash(
    address recipient,
    uint256 amount0,
    uint256 amount1,
    bytes calldata data
)
```

Inside the `flash` function, the fee is calculated. The balances of token0 and token1 are retrieved before any tokens are sent.  Tokens are then sent to the recipient. Following this, the contract calls the `UniswapV3FlashCallback` function on the `IUniswapV3FlashCallback` contract using the message sender. The `fee0`, `fee1`, and `data` parameters are passed into this call.

```javascript
IUniswapV3FlashCallback(msg.sender).uniswapV3FlashCallback(fee0, fee1, data);
```

`fee0` is the fee for token0 and `fee1` is the fee for token1. After the `UniswapV3FlashCallback` executes, the contract retrieves the balances of token0 and token1. The balances are checked to ensure that the after balances are greater than or equal to the before balance plus the fees. The fee to be given to the protocol and the fee to be given to the liquidity provider are calculated. The fee growth global for token0 and token1 is updated.

When we use a flash loan, we have to add our custom logic in the `UniswapV3FlashCallback` function. After the function executes, the balances of token0 and token1 after are checked to make sure they are greater than or equal to the balance before plus the fees.
