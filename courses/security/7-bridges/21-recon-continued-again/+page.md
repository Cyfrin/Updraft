---
title: Recon Continued Again
---



---

# Auditing For Ethereum Vulnerabilities: A Deep Dive

Ever felt like unraveling the intricacies of handling vulnerabilities in Ethereum applications? You're at the right place. Let's go ahead and walk you through the eccentric realm of vulnerability handling using the Slither code analysis tool.

Before proceeding, bear in mind that this journey does not aim to demoralize the workings of Ethereum applications, but to encourage developers to safeguard and optimize them further.

## Unchecked Return Value: Be diligent or Perilous?

Moving along, our next houseguest is the 'approve' function. This method seems to be ignoring its return value. This irregularity, if unchecked, could lead to catastrophic consequences.

On investigating, Slither reports that while calling the SafeMath `add` method, we aren't storing the resultant sum, rendering the operation meaningless.

While this isn't an issue all the time, for a more secure and tight-knit application, we should validate the return values just to make our code robust.

However, going by the information at our disposal, it's not a huge dealbreaker. Next time, Slither, next time.

## Zero Check Madness

Slither is back at it again, pointing out the absence of 'zero check'. Fortunately, we had the foresight to check out the README, which states this clearly: they've deliberately omitted 'zero checks' for input validation to preserve some gas. Nice try Slither, but we're covered.

## Navigating The Detectors: Reading Between The Lines

Here's a fun part: handling reentrancy. This essentially implies an external call not followed by a computation, rather it makes an immediate deposit. Let's take a closer look.

We found that the L1 BossBridge deposit function does decide to deposit tokens without performing a computation, ergo, no effect. With our code set to accept only our L1 token, one without any attached callback functionality, this poses no significant security threat.

Despite this, we nonetheless note it as being preferable to follow CEI (Check-Effects-Interactions).

## The Unerring Eye Of Slither: Red Flags Galore

Slither, understandably, doesn't like assembly instructions and different versions of Solidity being used. All these are valid concerns and necessitate modifications of their own.

The 'deposit limit' being mutable is a red flag and it should generally be set as a constant.

```js
//@Audit Info: Deposit Limit Should Be Constant
```

This is one of the real and impactful bugs pointed out by our trusty friend, Slither. While it has led us on a merry chase with some informational stuff and a myriad of future functions, it did deliver in the end, which makes for a fantastic learning experience!

## The Future: A Call To Invariance Testing

Take a step back, and soak in everything that's happened. Before we ride off into the sunset, we'd like to urge you to take the future of protecting codebases very seriously, and commit yourself to write stateful fuzzing and invariance test suites.

"Pause the video right now, try to write down some invariants. Understand what are the invariants, and then write your own fuzzing test suite."

Slither and bossbridge have given us some food for thought and armed us with tools to go fearlessly into the world of Ethereum applications. However, always remember: there's always room to explore, learn, and improve.

Happy coding, my friends! Remember, the codebase is not a minefield if you know where the mines are!
