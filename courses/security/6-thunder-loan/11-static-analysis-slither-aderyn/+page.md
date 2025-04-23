---
title: Static Analysis Slither + Aderyn
---

---

### Static Analysis Slither + Aderyn

Ok! We're ready to start attacking this code base and identifying vulnerabilities. A good first step is our static analyzers of course.

### Slither

Moving forward each of our lesson repos is going to have configured a `make` command for `Slither`. I'm including this to make our lives a little easier by having it consider a slither.config.json for our tests.

You can customize your configuration file however you'd like, but this is an example of one I like to use which includes several popular flags to toggle on or off based on circumstance.

```json
{
  "detectors_to_exclude": "conformance-to-solidity-naming-conventions,incorrect-versions-of-solidity",
  "exclude_informational": false,
  "exclude_low": false,
  "exclude_medium": false,
  "exclude_high": false,
  "disable_color": false,
  "filter_paths": "(mocks/|test/|script/|upgradedProtocol/)",
  "legacy_ast": false,
  "exclude_dependencies": true
}
```

In this config, there are just a few settings I prefer that make our `Slither` output a little more meaningful to us.

Detectors for things like naming conventions and solidity versions will be excluded for example. Additionally, I will filter the paths that `Slither` covers to avoid things like tests and mocks being caught by it!

As always, I encourage you to have a look at some of the options available to you within the `Slither` config that suit you best.

With the above said, we can run `Slither` with

```bash
make slither
```

Our output is more concise than ever, but already we can see some vulnerabilities detected. This is a great place to start our review.

::image{src='/security-section-6/11-static-analysis-slither-aderyn/static-analysis-slither-aderyn1.png' style='width: 100%; height: auto;'}

Let's even just begin by taking a look at the very first issue detected.

```
ThunderLoan.updateFlashLoanFee(uint256) (src/protocol/ThunderLoan.sol#265-270) should emit an event for:
        - s_flashLoanFee = newFee (src/protocol/ThunderLoan.sol#269)
```

It looks like at `line-269` in `ThunderLoan.sol` we're executing a state change without emitting an event. Our first finding!

```js
function updateFlashLoanFee(uint256 newFee) external onlyOwner {
    if (newFee > s_feePrecision) {
        revert ThunderLoan__BadNewFee();
    }
    // @Audit-Low: Events should be emitted on state change
    s_flashLoanFee = newFee;
}
```

Next, in our `Slither` output, it looks like we have a number of `reentrancy` situations being detected. These are a little different to the reentrancy we're used to, so let's make a note to follow up on these later.

```js
// @Audit - Follow Up
```

Add the above tag to the external calls identified in the `Slither` output.

### Aderyn

Great! Not a tonne from `Slither`, but always worth the check. We can now run `Aderyn` in much the same way.

```bash
make aderyn
```

or

```bash
aderyn .
```

::image{src='/security-section-6/11-static-analysis-slither-aderyn/static-analysis-slither-aderyn2.png' style='width: 100%; height: auto;'}

Looking good, thanks `Aderyn`! Let's go through some of the issues detected by `Aderyn` together, in the next lesson.
