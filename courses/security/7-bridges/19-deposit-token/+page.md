---
title: depositTokenToL2
---

_Follow along with the video lesson:_

---

### depositTokenToL2

In this lesson we're going to approach one of the core functions of `L1BossBridge.sol`, `depositTokenToL2`

```js
/*
    * @notice Locks tokens in the vault and emits a Deposit event
    * the unlock event will trigger the L2 minting process. There are nodes listening
    * for this event and will mint the corresponding tokens on L2. This is a centralized process.
    *
    * @param from The address of the user who is depositing tokens
    * @param l2Recipient The address of the user who will receive the tokens on L2
    * @param amount The amount of tokens to deposit
    */
function depositTokensToL2(address from, address l2Recipient, uint256 amount) external whenNotPaused {
    if (token.balanceOf(address(vault)) + amount > DEPOSIT_LIMIT) {
        revert L1BossBridge__DepositLimitReached();
    }
    token.safeTransferFrom(from, address(vault), amount);

    // Our off-chain service picks up this event and mints the corresponding tokens on L2
    emit Deposit(from, l2Recipient, amount);
}
```

The `NATSPEC` here nicely details the functionality we'd expect based on our earlier protocol diagram. This function locks tokens into the `vault`, which emits an event. This event is listened for off-chain to trigger the mint of tokens on L2.

![deposit-token1](/security-section-7/18-deposit-token/deposit-token1.png)

Foremost, we can see that a user can only call this function if the protocol is not paused, via the `whenNotPaused` modifier.

We see the conditional check from earlier verifying that the amount being deposited doesn't cause the `vault`'s balance to exceed the `DEPOSIT_LIMIT` of 100,000 tokens. This tells us clearly that there can only be 100,000 tokens bridged to the L2 at any given time.

```js
if (token.balanceOf(address(vault)) + amount > DEPOSIT_LIMIT) {
    revert L1BossBridge__DepositLimitReached();
}
```

Following the check we have our safeTransferFrom call which moves tokens from the `from` address to the vault, and finally an event is emitted.

```js
token.safeTransferFrom(from, address(vault), amount);

// Our off-chain service picks up this event and mints the corresponding tokens on L2
emit Deposit(from, l2Recipient, amount);
```

This event is **_very_** important as it effectively triggers the minting of tokens on the L2. Absolutely verify the parameters and the order which they are being passed (they're good here).

### Wrap Up

This critical function, `depositTokensToL2` seems fairly simple, it _seems_ secure. There's an issue here. Do you know what it is?

Challenge yourself to identify the vulnerability in the `depositTokensToL2` function, and we'll go over it together, in the next lesson!
