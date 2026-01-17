---
title: Info and Gas Findings
---

_Follow along with this video:_

---

### Info and Gas Findings

With all our questions answered, there still remain a few outstanding items we should consider.

We briefly ran Slither earlier in this section, but didn't look too closely at what its output was. We should definitely return to this. Additionally, as people who have gone through the Foundry course should recognize, this code base is not adhering to any design pattern best practices, and regularly chooses poor naming conventions.

Let's review a few recommendations we could make to improve the code for this protocol.

### Starting at the Top

The first thing we notice, at the very top of this repo are the naming conventions used for storage variables.

![info-and-gas1](/security-section-4/38-info-and-gas/info-and-gas1.png)

A convention I like to use for storage variables is the `s_variableName` convention! So this may be an informational finding we would want to submit.

Even further up the contract there's a bigger concern however.

```js
pragma solidity ^0.7.6
```

This statement is what's known as a `floating pragma`. It essentially denotes that the contract is compatible with solidity versions up to and including `0.7.6`. This brings a number of concerns including vulnerabilities across multiple versions, so best practice is to use a single version of solidity.

This would be a great informational finding to include in our report.

### Further Recommendations

Progressing down the code base, the next thing I notice are these statements:

```js
uint256 prizePool = (totalAmountCollected * 80) / 100;
uint256 fee = (totalAmountCollected * 20) / 100;
```

When raw numbers are used in a code body like this, we refer to them as `Magic Numbers`. They provide no context of what they're doing. Best practice would be to assign these to named constants.

```js
uint256 public constant PRIZE_POOL_PERCENTAGE = 80;
uint256 public constant FEE_PERCENTAGE = 20;
uint256 public constant POOL_PRECISION = 100;

uint256 prizePool = (totalAmountCollected * PRIZE_POOL_PERCENTAGE) / POOL_PRECISION;
uint256 fee = (totalAmountCollected * FEE_PERCENTAGE) / POOL_PRECISION;
```

The last thing I'll point out is best verified through the project's `foundry.toml`. Here we can see the versions of the libraries being imported for the protocol.

A good practice will be to investigate the specific versions being used for reported issues and security advisories.

We can navigate to the OpenZeppelin security section [**here**](https://github.com/OpenZeppelin/openzeppelin-contracts/security).

This section of the OpenZeppelin repo is kept updated with known security vulnerabilities within various versions of the OpenZeppelin library.

By clicking on one of the advisories, we get a detailed breakdown including the affected versions.

![info-and-gas2](/security-section-4/38-info-and-gas/info-and-gas2.png)

### Gas

In addition to informational findings in an audit, it can be optional to include gas recommendations for the protocol as well, though static analysis tools are getting really good at this and they're certainly becoming less common.

One example of such a suggestion in Puppy Raffle would be regarding `raffleDuration`. Currently this is a storage variable, but this never changes. Puppy Raffle could absolutely change this to be a `constant` or `immutable` variable to save substantial gas.
