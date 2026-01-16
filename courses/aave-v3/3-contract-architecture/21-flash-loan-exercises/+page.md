# Flash Exercises

In this exercise, you'll learn how to liquidate an under-collateralized debt from Aave V3.

The starter code for this exercise is provided in `foundry/src/exercises/Flash.sol`

Solution is provided in `foundry/src/solutions/Flash.sol`

## Task 1 - Initiate flash loan

```solidity
function flash(address token, uint256 amount) public {}
```

Initiate the flash loan

- `token` is the token to borrow
- `amount` is the amount to borrow

> Hints
>
> - Call `pool.flashLoanSimple`
> - ABI encode `msg.sender` and pass it as input to `params`

## Task 2 - Repay flash loan

```solidity
function executeOperation(
    address asset,
    uint256 amount,
    uint256 fee,
    address initiator,
    bytes calldata params
) public returns (bool) {
    // Task 2.1 - Check that msg.sender is the pool contract

    // Task 2.2 - Check that initiator is this contract

    // Task 2.3 - Decode caller from params and transfer
    // flash loan fee from this caller

    // Task 2.4 - Approve the pool to spend flash loaned amount + fee

    // Task 2.5 - Return true
}
```

Implement the callback function called by Aave.

> Hints
>
> - ABI decode `params` and transfer the flash loan fee from the caller that is encoded into `params`

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Flash.test.sol -vvv
```
