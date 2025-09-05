---
title: Introduction
---

_Follow along with the video lesson:_

---

### Introduction

Welcome back! We've just finished our review of the `Thunder Loan` protocol and it was a **_banger_**.

We're coming off the back of having learnt a huge number of advanced DeFi concepts and vulnerabilities, but there are unfortunately so many more to master. In Section 7 we'll be diving into more of these concepts and attack vectors to really bulk up our familiarity.

As always, this section comes with an associated [**GitHub Repository**](https://github.com/Cyfrin/7-boss-bridge-audit) we'll be reviewing and a tonne of additional resources and contextual information. Clone it, reference it often.

The [**Course Repo's Discussions tab**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/discussions) is a **_great_** place to post questions that you have or fire up conversations about the content or ecosystem. Jump into those interactions!

And, of course, the [**Cyfrin Discord Server**](https://discord.gg/cyfrin) is an amazing and supportive community that you should absolutely jump into.

With that said, let's touch on some of the content we'll be covering in this course as we review the `Boss Bridge` protocol.

Things we'll cover in the `Boss Bridge` section include:

**New Tools**

At points we'll be introduced to new tools to assist us in security reviews. Tools such as:

- [**evmdiff**](https://www.evmdiff.com/) - a convenient browser based way to compare how different EVM chains function
- [**Tenderly**](https://tenderly.co/) - a security focused Web3 toolkit to assist in vulnerability detection and deployment monitoring
- [**The Hans Checklist**](https://github.com/Cyfrin/audit-checklist) - we'll dive deeper into the specifics of this checklist and how it can be applied to level up our security review methodology.

**Case Studies**

We'll touch briefly into exploit case studies such as a [**Precompile issue that was faced by Polygon**](https://youtu.be/QdIG7TfjUiM) as well as a [**problem that arose on ZKsync**](https://medium.com/coinmonks/gemstoneido-contract-stuck-with-921-eth-an-analysis-of-why-transfer-does-not-work-on-zksync-era-d5a01807227d) due to different opcode support between blockchains.

**New Attack Vectors**

In this section we'll be introduced to a host of new attack vectors including `signature replay attacks`, `ERC20 Contract Approval`, `unlimited minting`. The section will have a focus on Bridge Hacks and identifying what it is about Bridges that makes them vulnerable. Huge Bridge Hacks like Ronin, Poly Network, Nomad and Wormhole will be discussed. We'll learn how `centralization` remains one of the biggest concerns and most common avenues of exploitation for bridges to this day.

**Design Patterns**

We'll be introduced to a new protocol design pattern `emergency stop` and learn the benefits of it's implementation.

**Exercises and Additional Resources**

This section will be full of additional resources to consume and exercises to complete in order to really challenge yourself beyond the course content.

**Audit Report**

As always, we'll complete our security review of the Boss Bridge protocol with a professional PDF report to be added to our portfolio!

### Wrap Up

I hope you're excited, I know I am. Phase 1 is Scoping - let's learn what this Boss Bridge protocol is all about.
