---
title: Payback or Revert
---

---

### Payback or Revert

So, how does a `flash loan` allow the average user to take advantage of larger scale financial opportunities?

This is a really powerful function of the blockchain and smart contract ecosystem.

In contemporary finance, typically collateral is required to take a loan, some assurance must be made that a loan will be repaid. In Web3, a protocol is able to programmatically assure a loan is repaid.

**_How does this work?_**

A smart contract protocol assures that a `flash loan` is repaid effectively by containing logic within its loan functionality that requires the transferred balance be restored to the protocol within the _same transaction_ as it's borrowed. If these checks don't pass, the transaction will revert, back to its initial state - as though the loan never took place.

The code for a `flash loan` may be as minimal as:

```js

uint256 startingBalance = IERC20(token).balanceOf(address(this));
assetToken.transferUnderlyingTo(receiverAddress, amount);

// callback function here

uint256 endingBalance = token.balanceOf(address(this));
if (endingBalance < startingBalance + fee) {
    revert();
}

```

Effectively, a user taking a `flash loan` is able to do anything they want between the `transferUnderlyingTo` and the conditional check at the end of this function. This is only possible because if that check on the `endingBalance` doesn't pass, the entire transaction (and anything that was done with the loan) will revert!

![pay-back-or-revert1](/security-section-6/5-pay-back-or-revert/pay-back-or-revert1.png)

It's easy to see what opportunities a system like `flash loans` enables for the average user. No longer will these advantages be available only to whales!

See you in the next lesson.
