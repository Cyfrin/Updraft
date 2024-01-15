---
title: Lesson 2 Recap
---

_Follow along with this video:_

---

Congratulations! You've come so far already, let's do a quick recap of what's been covered in this section.

### The Basics of Smart Contract Audits

A smart contract audit is a time-boxed security review, looking for security vulnerabilities. The goal here is to inform the protocol on how to be as secure as possible.

### The Fundamentals of a Security Review

There's no `silver bullet` when it comes to how to perform a security review. Generally, a security review is divided into three stages:

1. Initial review
   - Scoping
   - Reconnaissance
   - Vulnerability Identification
   - Reporting
2. Protocol Fixes
   - Protocol fixes issues
   - Retests and adds tests for changes
3. Mitigation Review
   - Reconnaissance
   - Vulnerability Identification
   - Reporting

### Smart Contract Development Life Cycle

Keep in mind that ensuring security isn’t only a crucial point in the smart contract development lifecycle, it's a continuous, never-ending process!

- Plan & Design
- Develop & Test
- Smart Contract Audit & Post Deploy Planning
- Deploy
- Monitor & Maintain

> "_Security shouldn't just be an afterthought or some box you check. You need to have a security mindset from day one_".

Thinking about post-deployment planning, monitoring and maintaining is just as important as the development itself.

### Tooling for Security Review

In future posts, we'll be delving into the various tools utilized in conducting security reviews. Trust me, you'll need to get your hands dirty with tools like

Static Analysis

- [Slither](https://github.com/crytic/slither)
- [Aderyn](https://github.com/Cyfrin/aderyn)

Fuzzing/Invariant Tests

- [Foundry Test Suite](https://github.com/foundry-rs/foundry)

Formal Verification

- [Certora](https://www.certora.com/)

AI

- [Phind](https://www.phind.com/search?home=true)
- [ChatGPT](https://chat.openai.com)
- [Co-Pilot](https://github.com/features/copilot)
- [AI Limitations](https://github.com/ZhangZhuoSJTU/Web3Bugs)

### Audit Readiness

Before a protocol is even ready for an audit, they should consider where they stand on the [**Rekt Test**](https://blog.trailofbits.com/2023/08/14/can-you-pass-the-rekt-test/) or other checklists like nacentxyz's [**simple-security-toolkit**](https://github.com/nascentxyz/simple-security-toolkit)

### Always be Learning

We need to always be improving as security researchers and adopt an `attacker vs defender` mindset. It's only by staying informed and constantly improving that we can stay ahead of the problem.

We touched on top attack vectors that are hitting Web3 to this day (including re-entrancy which has been around since _2016!_).

Hopefully, with you taking this course we can learn from the mistakes in the past and finally reign in the exploitation in Web3.
