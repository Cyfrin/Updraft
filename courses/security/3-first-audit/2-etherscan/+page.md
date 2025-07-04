---
title: Scoping Raw Etherscan
---

_Follow along with this video:_

---

## Phase 1: Scoping

In this lesson, we'll examine the initial steps of performing a security review using our PasswordStore codebase. I'm going to take a deep-dive into the scoping phase, which is the primary step in conducting a security review.

### The Scoping Phase and Initial Review

The scoping phase is the point we initially receive a codebase for review and we perform a high level assessment.

Imagine a scenario like this:

_CLIENT: "Hi, we're the PasswordStore dev team looking to get our codebase audited ASAP to get it listed officially."_

_AUDITOR: "Hi PasswordStore, I'm beginner-auditor. Really excited to help. Could you send your codebase to me?"_

_CLIENT: "Sure, here's the etherscan link to our codebase." [**PasswordStore CodeV1**](https://sepolia.etherscan.io/address/0x2ecf6ad327776bf966893c96efb24c9747f6694b)_

This exchange is all too common, and it's horrible. It's your responsibility as a security researcher to not audit codebases provided to you in this way.

Why?

As security researchers, you're looking for more than bugs. You're looking for code maturity. If all you have is a codebase on etherscan, if there's no test suite, if there's no deployment suite you should be asking: `how mature is this code?`

> **Remember: Secure protocols not only safeguard the code but also our reputation as researchers. They will likely blame us for a security breach if we've audited a compromised codebase.**

If all they provide is an etherscan link, can you assure the protocol's safety? In these cases, the answer is a resounding **NO**.

### Audit Readiness

One of the first things we covered when discussing preparing for an audit was the concept of `Audit Readiness` and steps protocols should take prior to requesting an audit.

You should recall the [**Rekt Test**](https://blog.trailofbits.com/2023/08/14/can-you-pass-the-rekt-test/) from a previous lesson.

How does your client's protocol stand up against these questions?

![rekt1](/security-section-2/3-rekt/rekt1.png)

If all they've provided you is an Etherscan link - the answer is poorly.

> **If you're offered monetary reward to audit an Etherscan-only codebase, that's a red flag. Say NO. Doing otherwise contradicts our mission to promote secure protocols.**

Do not take clients who have not shown the same commitment to security in their codebase as you would. If you work with clients like those described above, it should be to educate them on how to write good tests and how to prepare their code for a review.

_AUDITOR: "Hi, PasswordStore. Thank you so much for this Etherscan link, this is a great start. However, do you have a test suite? We want to have every assurance that your codebase is safe and secure. Do you have a Git Repo or GitHub with a testing framework?"_

_CLIENT: "AH! Yes, Sorry. We have a Foundry Test repo set up for this, let me send you that Git codebase."_

If a protocol's response to your care in securing them isn't like they above, and they begin pressuring you - walk away. It's evidence that security isn't their focus.
