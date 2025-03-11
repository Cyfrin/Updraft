# `FlashLev.open` exercise

Write your code inside the [`FlashLev` contract](../src/exercises/FlashLev.sol).

This exercise is designed to test your understanding of how to structure a smart contract function for initializing a leveraged position using a flash loan.

```solidity
function open(OpenParams calldata params) external {
    // Write your code here
}
```

## Instructions

1. **Transfer collateral from `msg.sender`**

   - Transfer collateral from `msg.sender` into this contract.

   > **Hint:** Look into the struct `OpemParams` to find out how much collateral to pull in.

2. **Initiate a flash loan**

   - Encode flash loan data into `FlashLoanData`.
   - Call `flashLoan` to initiate a flash loan.

   > **Hint:** Look inisde `AaveHelper` to see how to call the function `flashLoan`.

3. **Check health factor**

   - Require that the health factor after the position is created is greater than or equal the the minimum health factor specified in the input `OpenParams.minHealthFactor`.

   > **Hint:** Look inisde `AaveHelper` to see how to get the health factor.

# `_flashLoanCallback`

```solidity
function _flashLoanCallback(
  address token,
  uint256 amount,
  uint256 fee,
  bytes memory params
) internal override {
  // Write your code here
}
```

## Instructions

1. **Implement logic for opening a position**

   - Implement flash loan callback logic for opening a position.

   > **Hint:**
   >
   > - Look into `AaveHelpe` for how to supply collateral and borrow stablecoin.
   > - Look into `SwapHelper` for how to swap tokens.

2. **Repay flash loan**

   - Approve Aave to repay flash loan amount.

   > **Hint:**
   >
   > - Address to approve is `pool`, initialized inside `AaveHelper`.
   > - Amount to approve for repayment is amount borrowed + fee.
