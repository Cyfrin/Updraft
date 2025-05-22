# `Strategy` Exercises

`Strategy` is a contract that handles authorization and calls internal functions of `GmxHelper` to interact with GMX.

You need to complete the implementation of the `Strategy.sol` contract.

## Task 1: Implement `totalValueInToken`

```solidity
function totalValueInToken() external view returns (uint256) {}
```

This function will calculate the total value of `WETH` managed by this contract.

Return the sum of `WETH` in this contract, collateral in GMX and profit and loss of the position managed by this contract.

> Hint:
>
> - Call the internal function `getPositionWithPnlInToken` to get the amount of collateral plus the profit and loss of the current short position.

## Task 2: Implement `increase`

```solidity
function increase(uint256 wethAmount)
    external
    payable
    auth
    returns (bytes32 orderKey)
{}
```

This function will create a market increase order, adding `wethAmount` as collateral.

> Hint:
>
> - Call an internal function in `GmxHelper`

## Task 3: Implement `decrease`

```solidity
function decrease(uint256 wethAmount, address callbackContract)
    external
    payable
    auth
    returns (bytes32 orderKey)
{}
```

This function will create a market decrease order.

- When `callbackContract` is `address(0)`, create a market decrease order with the specified inputs.

When this function is called from the `Vault`, `callbackContract` will not be `address(0)`.

- Set `callbackGasLimit` to max callback gas limit by calling `getMaxCallbackGasLimit`.
- Check `msg.value` is greater than the max callback gas limit.
- Calculate `longTokenAmount` to withdraw from the current position.

```
long token amount = position collateral amount * wethAmount / position with pnl in token
```

Here `wethAmount` is the amount calculated by the `Vault` base on the profit and loss of this strategy.

Amount of collateral to remove from the position is proportional to `wethAmount / position with pnl in token`

- Create a market decrease order.

> Hints:
>
> - Get position collateral amount by calling `getPositionCollateralAmount`
> - Get position collateral amount with profit and loss by calling `getPositionWithPnlInToken`

## Task 4: Implement `cancel`

```solidity
function cancel(bytes32 orderKey) external payable auth {}
```

This function will cancel an order.

> Hint:
>
> - Call an internal function in `GmxHelper`

## Task 5: Implement `claim`

```solidity
function claim() external {}
```

This function will claim funding fees.

> Hint:
>
> - Call an internal function in `GmxHelper`

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/app/Strategy.test.sol -vvv
```
