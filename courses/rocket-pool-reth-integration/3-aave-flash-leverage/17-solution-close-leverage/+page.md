## Solution: Flash Loan Callback for Closing a Position

Let’s learn how to implement the flash loan callback for closing a position. We can start by calculating the current debt that we owe to the Aave Protocol. Inside the AaveHelper contract, there is a function called `getDebt`, which takes in two inputs: the user and the token that was borrowed. After the flash loan, we deposit collateral and borrow the stablecoin to repay the flash loan, so our debt will be in stablecoin. Let’s say:

```solidity
uint256 coinAmount = getDebt()
```

Next, we call the function `getDebt` for this contract. We use `address(this)` to get the address. To get the stablecoin address, we can scroll up and look at the struct called `CloseParams` where the coin address is stored.

```solidity
params.coin
```

So, the full calculation will look like:

```solidity
uint256 coinAmount = getDebt(address(this), params.coin);
```

We need to repay all of this to close our position, and then we can withdraw our collateral. Then the next step is to initiate the flash loan.

Let’s copy the `flashloan` code that we implemented, and modify it.

```solidity
flashLoan({
    token: params.coin,
    amount: params.coinAmount,
    data: abi.encode(
        FlashLoanData({
            coin: params.coin,
            collateral: params.collateral,
            open: true,
            caller: msg.sender,
            colAmount: params.colAmount,
            swap: params.swap
        })
    )
});
```

Scrolling back up, we need to flash loan stable coin. So the token is coin, and the amount will be:

```solidity
coinAmount
```

For the flashloan data, the coin and collateral are the same, but this will be a close position, so:

```solidity
open: false
```

The caller is `msg.sender`, and the colAmount is the same.

```solidity
params.colAmount
```

```solidity
params.swap
```

This completes the close function, so now let's implement the flash loan callback:

```solidity
function _flashLoanCallback(
    address token,
    uint256 amount,
    uint256 fee,
    bytes memory params
)
internal override {
    uint256 repayAmount = amount + fee;
    FlashLoanData memory data = abi.decode(params, (FlashLoanData));
    IERC20 coin = IERC20(data.coin);
    IERC20 collateral = IERC20(data.collateral);
}
```

Previously we worked on the logic for opening a position, but now there are two cases for our flash loan callback function, opening and closing a position. We can create a conditional statement like:

```solidity
if (data.open)
```

If data open is true, then we execute the code for opening a leveraged position. Otherwise, we are closing a position. In either case, we'll need to repay the flash loan, so this part of the logic stays the same.

First we are going to approve Aave to spend, then we are going to repay.

```solidity
coin.approve(address(pool), repayAmount);
repay(address(coin), amount);
```

Now we are going to withdraw collateral.

```solidity
withdraw(address collateral)
```

So the collateral we deposited will be earning interest. To withdraw all collateral, we can specify:

```solidity
type(uint256).max
```

This command tells the Aave protocol to withdraw all collateral, including the interest we earned for depositing this collateral. Let’s also assign this to a variable called

```solidity
colWithdrawn
```

```solidity
uint256 colWithdrawn = withdraw(address collateral, type(uint256).max);
```

Let’s transfer the collateral back to the caller.

```solidity
collateral.transfer(data.caller, data.colAmount)
```

Now let’s swap collateral to stablecoin.

```solidity
uint256 colAmountIn = colWithdrawn - data.colAmount;
```

```solidity
uint256 colAmountOut = swap({
        tokenIn: address(collateral),
        tokenOut: address(coin),
        amountIn: colAmountIn,
        amountOutMin: data.swap.amountOutMin,
        data: data.swap.data
    });
```

If we are swapping collateral to coin, then the amountOut will be `coinAmountOut`. Then we add the following conditional statement:

```solidity
if (coinAmountOut < repayAmount) {
  coin.transferFrom(data.caller, address(this), repayAmount - coinAmountOut);
} else {
 coin.transfer(data.caller, coinAmountOut - repayAmount);
}
```

```solidity
coin.approve(address(pool), repayAmount);
```

And that completes the close exercise. We can now try executing the test.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-aave-flash-lev.sol --match-test test_flashLev -vvv
```

Our test passed! Let’s look at our results. First, when we opened the position, you can see that our health factor reached close to one.

```solidity
1.05
```

Then after we closed the position, we made a loss of roughly 94 dollars. However, we did get one collateral back. Now our flash loan level exercise is complete!
