---
title: Thunderloan.sol - Flashloan
---

# Understanding the Flash Loan Function

In reviewing, understanding, and working with the flash loan function in a smart contract, I encountered a few challenges due to the lack of a Nat Spec. But fear not, in this blog post, we'll walk through it, figure out what each parameter does, and build the Nat Spec ourselves.

## Decoding the Parameters

![](https://cdn.videotap.com/70D5PzXZylGPTZ8Ak7ea-44.44.png)

The main parameters in the flash loan function are:

- Receiver address : This is probably the address that should receive the flash-loaned tokens, essentially, where to send the borrowed tokens.
- ERC 20 : This is the token you want to borrow.
- Amount : Obviously, this would be the amount you want to borrow.
- Params : These are the function call parameters for the receiver address. Meaning, when the flash loan function sends the tokens to the receiver address, it will also send these parameters. It is important to note here that the receiver address is expected to be a smart contract.

## Function Breakdown

To get a better understanding, we should examine each line of the function.

```
revert is 0;revert if not allowed token;
```

While these lines may seem perplexing, they are simple checks, the first is to ensure that the function does not revert right out of the gate and the second verifies that the token is allowed. To understand this, you can look into the `isAllowedToken()` function.

```
Asset token = s_2 asset token of the token.
```

Here, `assetToken` is the contract that holds the underlying tokens we want to borrow.

A critical part of the function is getting the `startingBalance` of the asset token contract, which will come in handy later on when we verify if the flash loan has been repaid.

If the `amount` to borrow is more than the `startingBalance`, it means that the function is trying to borrow more than the total available tokens, and it will resultantly revert and terminate the operation.

In addition to the checks mentioned above, the function verifies the code length of the receiver address. If it equals zero, the operation is once again reverted.

## Understanding the Fees

![](https://cdn.videotap.com/nrDYkgtsrD1YCbh5GO4J-474.07.png)One thing that might seem confusing initially is how they calculate the fee. `getCalculatedFee()` is the function that gets used for that. It's important to note that this fee is the contract's charge to facilitate the flash loan operation.

To make more sense of this, it's useful to go back to this line:

```
AssetToken.updateExchangeRate (fee)
```

Here, the `updateExchangeRate` of the `AssetToken` contract is getting updated with the `fee`. In essence, this step ensures the protocol updates the exchange rate so that everything adds up mathematically with the introduction of the new fee.

> It's important to pause here and do some quick math to fully grasp the impact of the fee on the exchange rate.

## The Flash Loan in Action

![](https://cdn.videotap.com/m50tzcSXOfTUOdDNWqXL-622.22.png)Now that we have understood what each parameter does, we can actually do a quick run-through of the function. Here are the steps:

- The user calls the flash loan requesting for a specific amount of a specific ERC20 token.
- The function verifies the code length of the receiver address and the amount of the requested token, checks the starting balance of the underlying asset token contract, and verifies if the flash loan has been repaid.
- If all checks out, the necessary amount of tokens are transferred to the receiver address via `AssetToken.transferUnderlyingTo()`.
- The function interface calls the `executeOperation` of the receiver contract using the provided params for further operations.
- Ultimately, it expects the receiver contract to call the `repay` function, sending back the borrowed amount plus the fee.

## Conclusion

Walking through this function sheds light on how a flash loan function works in conjunction with other pieces of a smart contract. However, it's always critical to do your own due diligence and research, check out how other protocols implement similar functionalities, and learn from existing work.

Happy coding!
