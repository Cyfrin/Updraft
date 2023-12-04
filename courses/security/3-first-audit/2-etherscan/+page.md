---
title: Scoping Raw Etherscan
---

_Follow along with this video:_



---

In this lesson, we'll examine the initial steps of performing a security review with live examples, focusing on a Password Store audit. I'm going to take a deep-dive into the scoping phase, which is the primary step in conducting a security review.

## The Scoping Phase and Initial Review

The scoping phase is where we receive the contract and fathom the scope of the review for this particular security audit of a Password Store. Conventionally, like any other audit exchange, the codebase will be solicited for immediate auditing with the end goal of gaining official listing.

Imagine a scenario like this:

_CLIENT: "Hi, we're the Password Store audit team looking to get our codebase audited ASAP to get it listed officially."_  
_AUDITOR: "Hi Password Store, I'm beginner auditor number one. Really excited to help. Could you send your codebase to me?"_  
_CLIENT: "Sure, here's the etherscan link to our codebase."_

This exchange is all too common. However, it poses a high risk.

Why?

Because what you've received is simply an etherscan link to the contract that's been verified on-chain. While it's great that it's been verified on-chain, this should immediately raise a red flag. It's not acceptable to perform an audit or a security review on a code base that is exclusively on Etherscan.

## The Downside of Relying On Etherscan Exclusively

The point of security reviews is not just to detect bugs but also to get an understanding of the code's maturity level. You can't gage things like whether they've a test suite, a deployment suite or an evaluation of the overall maturity of the codebase just by looking at an exclusively Etherscan-based codebase. As a security researcher, our aim is to promote and propagate secure codebases, leaving all protocols interacting with us better equipped to secure their own code.

> **Remember: Secure protocols not only safeguard the code but also our reputation as researchers. They will likely blame us for a security breach if we've audited a compromised codebase.**

If all they provide is an etherscan link, can you assure the protocol's safety? In these cases, the answer is a harty **NO**.

## Nowhere to Start: The Danger of Limited Documentation

So how, then, should we start with this etherscan link review?

Going back to what we learned about **audit readiness**, there's a simple security checklist and the **rect test** that proves handy.

The **_rect test_** probes for:

1. Documentation of all actors, roles, and privileges,
2. Documentation of all the external services, contracts and oracles,
3. Is there a written and tested incident response plan?,
4. Documentation of the best ways to attack the system,
5. Identity verification,
6. Security definitions.

If a codebase only provides an Etherscan link, it's hard-pressed to pass this test. Remember this rule:

> **If you're offered monetary reward to audit an Etherscan-only codebase, that's a red flag. Say NO. Doing otherwise contradicts our mission to promote secure protocols.**

### Proactive Steps: Questions to Ask Your Client

To ensure the more secure protocol, ask your client these rect test questions. If the protocol insists that they're not planning to install a test suite, offer to do it for them, after they pay for the additional consulting fee. Weighing on the side of caution, you might ask:

> **"Do you have a test suite? We want to be sure that your codebase is safe and secure. Do you have a Git repo, perhaps on Github or GitLab, where you have a testing framework related to this codebase?"**

Most likely, they'll appreciate your considerably detailed observation, and provide the necessary information. Adhering to these steps will ensure a more thorough, and overall secure, audit of the codebase. This approach emphasizes our goal as security professionals to leave protocols interacting with us better educated on code security - the first step towards a safer digital world.
