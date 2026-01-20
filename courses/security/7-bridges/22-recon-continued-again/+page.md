---
title: Recon Continued - Again
---

_Follow along with the video lesson:_

---

### Recon Continued - Again

`Slither` did a great job detecting a `high severity` vulnerability in our protocol, in the last lesson. Let's see what else it has to show us.

![recon-continued-again1](/security-section-7/21-recon-continued-again/recon-continued-again1.png)

`sends eth to arbitrary user`, I wonder what this is identifying. Let's navigate to the link `Slither` provides for detail.

```
Configuration:

    Check: arbitrary-send-eth
    Severity: High
    Confidence: Medium

Description:
Unprotected call to a function sending Ether to an arbitrary address.
```

This doesn't _really_ tell us much. The `Slither` output identified the issue on line #123 on `L1BossBridge.sol`. Let's see what's going on there:

```js
function sendToL1(uint8 v, bytes32 r, bytes32 s, bytes memory message) public nonReentrant whenNotPaused {
    address signer = ECDSA.recover(MessageHashUtils.toEthSignedMessageHash(keccak256(message)), v, r, s);

    if (!signers[signer]) {
        revert L1BossBridge__Unauthorized();
    }

    (address target, uint256 value, bytes memory data) = abi.decode(message, (address, uint256, bytes));

    (bool success,) = target.call{ value: value }(data);
    if (!success) {
        revert L1BossBridge__CallFailed();
    }
}
```

Oh. We haven't gone through the `sendToL1` function yet, so what `Slither` is pointing out may be a little tricky for us to understand. I'm going to make a note to come back to this one a little later.

```js
// @Audit-Question: Slither detects an issue here, follow up
function sendToL1(uint8 v, bytes32 r, bytes32 s, bytes memory message) public nonReentrant whenNotPaused {...}
```

### Slither Continued

Ok, what's the next potential issue detected by Slither?

![recon-continued-again2](/security-section-7/21-recon-continued-again/recon-continued-again2.png)

`ignores return value by token.approve(target,amount)`, this seems to be identified within L1Vault.sol.

```js
function approveTo(address target, uint256 amount) external onlyOwner {
    token.approve(target, amount);
}
```

What Slither is telling us is that, the `approve` function has a return value that we're doing nothing with. It isn't especially impactful here, because the return value isn't our goal when calling `approve` in this case. We don't explicitly need it, but perhaps it _should_ be checked. With that said we may make a note of this as an informational finding.

```js
// @Audit-Informational: the return value should be checked/verified
```

In other circumstances, something like this may be higher severity, but we know, in the case of `Boss Bridge`, that it's only supporting the L1Token, and you check the approve function of this token - it's only ever going to return `true`.

**Slither's next output:**

![recon-continued-again3](/security-section-7/21-recon-continued-again/recon-continued-again3.png)

This detection is pointing out `zero-address checks`. Would be fine, but the protocol outlines `zero-address checks` being omitted intentionally to save gas. Known issue, moving on!

**Next output:**

![recon-continued-again4](/security-section-7/21-recon-continued-again/recon-continued-again4.png)

OooOoo `Reentrancy in L1BossBridge::depositTokensToL2`, this sounds like it has potential, let's take a look at the function and discuss what may be happening here.

```js
function depositTokensToL2(address from, address l2Recipient, uint256 amount) external whenNotPaused {
    if (token.balanceOf(address(vault)) + amount > DEPOSIT_LIMIT) {
        revert L1BossBridge__DepositLimitReached();
    }
    token.safeTransferFrom(from, address(vault), amount);

    // Our off-chain service picks up this event and mints the corresponding tokens on L2
    emit Deposit(from, l2Recipient, amount);
}
```

Ok, yes! We're transferring our tokens (making an external call), before our event. This definitely is an issue. Now, it's important to note that because we're only using `L1Tokens` and we don't have to worry about any Weird `ERC20s` with callback functions - this isn't actually a security risk.

But, we can definitely call out the lack of best practices when we see them.

```js
// @Audit-Informational: This should follow CEI
function depositTokensToL2(address from, address l2Recipient, uint256 amount) external whenNotPaused {...}
```

**Next output:**

![recon-continued-again5](/security-section-7/21-recon-continued-again/recon-continued-again5.png)

`Slither`... just doesn't like `Assembly`, so it calls it out any time it sees it. We're using `Assembly` intentionally, so we can ignore this one. The next few are actually non-issues for us, so let's address them all at once.

![recon-continued-again6](/security-section-7/21-recon-continued-again/recon-continued-again6.png)

1. `Slither` detects different versions of solidity being used in `Boss Bridge`, but we can see that the 4 contracts we're concerned about all use `0.8.20`. This should be fine.

2. `Slither` prefers that more mature, stable builds of the solidity compiler are used over more recent or cutting edge updates. It recommends using `0.8.18`, but our `0.8.20` is fine for our case here.

3. Much like the grudge against `Assembly`, `Slither` will call out `low level calls` as a precaution against potential vulnerabilities. we're using this `low level call` intentionally, so this can be ignored.

**Next output:**

![recon-continued-again7](/security-section-7/21-recon-continued-again/recon-continued-again7.png)

Alright, now we're onto something, albeit something small. It seems the `L1BossBridge` variable `DEPOSIT_LIMIT` never changes and as such should be declared as a constant. An easy informational finding.

```js
// @Audit-Informational: Unchanged state variables could be declared as constant
uint256 public DEPOSIT_LIMIT = 100_000 ether;
```

Similarly, our next `Slither` output is calling out that our `token` variable, in `L1Vault.sol` could be declared as immutable.

![recon-continued-again8](/security-section-7/21-recon-continued-again/recon-continued-again8.png)

```js
// @Audit-Informational: Unchanged state variables could be declared as constant
IERC20 public token;
```

### Wrap Up

With the help of `Slither`, we were able to identify a major bug and ask a few good follow up questions to come back to! Thank you, `Slither`!

It's at this point I want to take a moment to mention - this code base would be _really good_ to perform stateful fuzz testing on. I'm going to go through it, in this section, but I encourage you to take some time before continuing to try and write a fuzz testing suite for this protocol. I cannot emphasize enough how useful and powerful fuzzing can be.

See you in the next lesson!
