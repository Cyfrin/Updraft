## Complete the Open Function

In this video, we will complete the `open` function to create a leveraged position using a flash loan.

To start, we will pull the collateral from the message sender as:

```solidity
IERC20(params.collateral).transferFrom(msg.sender, address(this), params.colAmount)
```

Next, we will initiate a flash loan using the helper function in `AaveHelper.sol`, which takes in the token, amount, and data as inputs:

```solidity
flashLoan(
    {
      token: params.coin,
      amount: params.coinAmount,
      data: abi.encode(
         FlashLoanData(
            {
               coin: params.coin,
               collateral: params.collateral,
               open: true,
               caller: msg.sender,
               colAmount: params.colAmount,
               swap: params.swap
            }
         )
      )
   }
);
```

After initiating a flash loan to create a leveraged position, we will make sure that the health factor is greater than a number that the user specifies with:

```solidity
require(
    getHealthFactor(address(this)) >= params.minHealthFactor,
    "health factor < min"
);
```

Next, we will implement `flashLoanCallback` to perform our logic. We will start with borrowing with:

```solidity
uint256 repayAmount = amount + fee;
```

Then, we will initialize coin and collateral as `IERC20` as:

```solidity
IERC20 coin = IERC20(data.coin);
IERC20 collateral = IERC20(data.collateral);
```

Next, we can finish the process by approving Aave for `repayAmount` as:

```solidity
coin.approve(address(pool), repayAmount);
```

We will take the collateral that we bought and add the collateral that the user specified initially:

```solidity
uint256 colAmount = data.colAmount + colAmountOut;
```

Next, we will supply the collateral and pass it as collateral to Aave as:

```solidity
supply(address(collateral), colAmount);
```

Then, we borrow the stable coin for the flash loan amount plus fee as:

```solidity
borrow(address(coin), repayAmount);
```

To test that the code compiles we run:

```bash
forge build
```
