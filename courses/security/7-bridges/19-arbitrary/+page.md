---
title: Exploit - Arbitrary "From"
---

_Follow along with the video lesson:_

---

### Exploit - Arbitrary "From"

Did you find the bug in depositTokensToL2 from the previous lesson?

If not, that's ok. Our friend Slither is here to help us. This vulnerability is actually one that Slither caught for us earlier. Let's run the tool again.

```bash
make slither
```

![arbitrary1](/security-section-7/19-arbitrary/arbitrary1.png)

`arbitrary from in transferFrom: token.safeTransferFrom(from,address(vault),amount)` Hmm, what does this mean exactly? If we're ever unsure of what Slither is telling us, we can follow [**the link**](https://github.com/crytic/slither/wiki/Detector-Documentation#arbitrary-from-in-transferfrom) in the output to read more about the detector and what it's .. detecting.

```
Configuration:

    Check: arbitrary-send-erc20
    Severity: High
    Confidence: High

Description:
Detect when msg.sender is not used as from in transferFrom.
```

Well, this is definitely an issue. Let's consider how this applies to our `depositTokensToL2` function.

```js
function depositTokensToL2(address from, address l2Recipient, uint256 amount) external whenNotPaused {
    ...
    token.safeTransferFrom(from, address(vault), amount);
    ...
}
```

Imagine a scenario with two users, we'll pick two random names no ones ever heard of: Bob and Alice.

1. Alice approves the bridge to move her tokens
2. Bob seeing the approval transaction
3. Bob is a jerk and sends `depositTokensToL2(from: Alice, l2Recipient: Bob, amount: All Alice's Money!)`

Because this function allows the setting of any `from` parameter, instead of defaulting to `msg.sender`, any user could use the bridge to reallocate the tokens of anyone who's approved the bridge!

**_What's the severity of something like this?_**

- **Impact:** High - Tokens are at risk of theft
- **Likelihood:** High - Any time someone calls approve this risk is present.

**Severity - HIGH!**

```js
// @Audit-High: Arbitrary transferFrom risks any approved tokens
function depositTokensToL2(address from, address l2Recipient, uint256 amount) external whenNotPaused {...}
```

Whew, great vulnerability to catch! Let's keep our momentum and write a proof of code for this, in the next lesson.

See you there!
