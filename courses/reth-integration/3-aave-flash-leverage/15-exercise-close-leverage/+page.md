# `FlashLev.close` exercise

Write your code inside the [`FlashLev` contract](../src/exercises/FlashLev.sol).

This exercise is designed to test your understanding of how to structure a smart contract function for closing a leveraged position using a flash loan.

```solidity
 function close(CloseParams calldata params) external {
     // Write your code here
 }
```

## Instructions

1. **Get debt owed to Aave**

   - Get the amount of debt owed to Aave

   > **Hint:** Look for a function inside `AaveHelper` to get the debt of this contract.

2. **Initiate a flash loan**

   - Encode flash loan data into `FlashLoanData`.
   - Call `flashLoan` to initiate a flash loan.

   > **Hint:** Look inisde `AaveHelper` to see how to call the function `flashLoan`.

# `_flashLoanCallback`

```solidity
function _flashLoanCallback(
  address token,
  uint256 amount,
  uint256 fee,
  bytes memory params
) internal override {
  // Write your code here
  // Code for opening a position is omitted
}
```

## Instructions

1. **Implement logic for closing a position**

   - Implement flash loan callback logic for closing a position.

   > **Hint:**
   >
   > - Look into `AaveHelpe` for how to repay stablecoin debt and withdraw collateral.
   > - Look into `SwapHelper` for how to swap tokens.

2. **Handle profit and loss**

   - If there is profit, transfer it to the caller that initiated a call to close.
   - Otherwise, there is a loss. Pull the loss from the caller to repay the flash loan.

   > **Hint:** Caller is stored in `FlashLoanData.caller`

3. **Repay flash loan**

   - Approve Aave to repay flash loan amount.

   > **Hint:**
   >
   > - Address to approve is `pool`, initialized inside `AaveHelper`.
   > - Amount to approve for repayment is amount borrowed + fee.

## Testing

```shell
forge test --fork-url $FORK_URL --match-path test/exercise-aave-flash-lev.sol --match-test test_flashLev -vvv
```
