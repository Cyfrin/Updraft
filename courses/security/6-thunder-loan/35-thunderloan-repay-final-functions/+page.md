---
title: ThunderLoan.sol - Repay and Final Functions
---

_Follow along with the video lesson:_

---

### ThunderLoan.sol - Repay and Final Functions

We'll wrap up our first pass of `ThunderLoan.sol` in this lesson! We've only got a few functions remaining, so let's get started straight away with reviewing the `repay` function.

```js
// @Audit-Informational: Where's the NATSPEC?
function repay(IERC20 token, uint256 amount) public {
    if (!s_currentlyFlashLoaning[token]) {
        revert ThunderLoan__NotCurrentlyFlashLoaning();
    }
    AssetToken assetToken = s_tokenToAssetToken[token];
    token.safeTransferFrom(msg.sender, address(assetToken), amount);
}
```

`repay`, in this circumstance, serves as a helper function more than anything. A user taking a flash loan could also just call `transfer`, in their `executeOperations` function, to return the borrowed funds, but this exists to make things a little easier. Repay performs a check to assure a token is in the `currentlyFlashLoaning` state before performing any transfers.

Moving on!

### getCalculatedFee

We've seen `getCalculatedFee` pop up a few times in our recon of `Thunder Loan`, but never really took the time to see how it works. Well, now's the time!

```js
function getCalculatedFee(IERC20 token, uint256 amount) public view returns (uint256 fee) {
    uint256 valueOfBorrowedToken = (amount * getPriceInWeth(address(token))) / s_feePrecision;
    fee = (valueOfBorrowedToken * s_flashLoanFee) / s_feePrecision;
}
```

- **token** - token being borrowed
- **amount** - amount being borrowed

This function is calling `getPriceInWeth` (inherited from `OracleUpgradeable.sol`), and if we swing back to that contract some additional pieces will fall into play for us.

```js
function getPriceInWeth(address token) public view returns (uint256) {
    address swapPoolOfToken = IPoolFactory(s_poolFactory).getPool(token);
    return ITSwapPool(swapPoolOfToken).getPriceOfOnePoolTokenInWeth();
}
```

This function is where TSwap comes into play! We're using `TSwap` to determine what the price of a given token is in WETH. This also tells us that the fees being calculated in `getCalculatedFee` are actually based on the value or price, not the number of tokens.

> **Remember:** `s_flashLoanFee` is an initialized constant set to 3e15 aka 3%. `s_feePrecision` is another constant, set to 1e18.

At this point, I'll say it's really beneficial for us as security researches to perhaps go a little out of scope to better understand `TSwap` and how it handles requests like these. Fom `TSwap` we can see:

```js
function getPriceOfOnePoolTokenInWeth() external view returns(uint256){
    return getOutputAmountBasedOnInput(
        1e18,
        ipoolToken.balanceOf(address(this)),
        i_wethToken.balanceOf(address(this))
    );
}
```

Hmm. This all seems to be pretty secure! 1e18 stands out in this function in TSwap for me though. We should be keeping in the back of our mind that USDC is expected to be compatible with `Thunder Loan`. So it begs the question:

```js
// @Audit-Question: What happens if a token has 6 decimals? Is the price wrong?
```

Some good questions asked in the `getCalculatedFee` function. Leave some notes and we'll come back to them soon.

### Remaining Functions

First up - updateFlashLoanFee.

```js
function updateFlashLoanFee(uint256 newFee) external onlyOwner {
    if (newFee > s_feePrecision) {
        revert ThunderLoan__BadNewFee();
    }
    s_flashLoanFee = newFee;
}
```

This function is pretty clear, this allows the owner to set a new `flash loan` fee. The function performs a check which assures that the new fee must be less than or equal to 100%, makes sense.

The next several functions are view functions/getters. Always worth checking, but these all look good to me:

```js
function isAllowedToken(IERC20 token) public view returns (bool) {
    return address(s_tokenToAssetToken[token]) != address(0);
}

function getAssetFromToken(IERC20 token) public view returns (AssetToken) {
    return s_tokenToAssetToken[token];
}

function isCurrentlyFlashLoaning(IERC20 token) public view returns (bool) {
    return s_currentlyFlashLoaning[token];
}

function getFee() external view returns (uint256) {
    return s_flashLoanFee;
}

function getFeePrecision() external view returns (uint256) {
    return s_feePrecision;
}
```

> **Protip:** Keep an eye out for instances where view functions aren't called internally. These can be limited to external visibility for gas savings!

Now, the final line of this contract may seem subtle or innocuous, but it's incredibly important.

```js
function _authorizeUpgrade(address newImplementation) internal override onlyOwner { }
```

This line is part of the `UUPSUpgradeable` library and effectively authorized the upgrade of the protocol to a new implementation. This internal function is overridden and has had access control added such that _only the protocol owner may call it_.

A small line, but potentially _very_ impactful.

### Wrap Up

Well - we've completed our whole first pass of this code base (save the upgrade to ThunderLoan) and we didn't find anything significant!?

![thunderloan-repay-final-functions1](/security-section-6/35-thunderloan-repay-final-functions/thunderloan-repay-final-functions1.png)

In this process we've gained a tonne of context and understanding, but we've also left a number of unanswered questions throughout the code. I think our best approach is going to be diving into the questions we've left ourselves, answering them and seeing what becomes of them.

See you in the next lesson!
