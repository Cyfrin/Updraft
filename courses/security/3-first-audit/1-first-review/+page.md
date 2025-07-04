---
title: Your First Security Review
---

_Follow along with this video:_

---

Welcome everyone! I hope you're well-rested, rehydrated, and ready to dive into the nitty-gritty of how smart contract audits work. We've had a good start with a high-level overview of what a smart contract audit or a security review contains. Now, we're going to go a level further by conducting not one, but a handful of audits over the next 6 sections.

This is an exciting journey to improve our understanding of audits. We'll strengthen our knowledge and learn from some of the best people in the world such as Hans, the number one competitive auditor in the world for the first half of 2023. Now let’s kick things off with the Password Store audit.

### The PasswordStore Audit: A Closer Look

For out first audit we're immersing ourselves into a scenario where we're auditing the PasswordStore protocol, just like you could if you were working for a firm like Cyfrin. It's a very immersive and experiential way of learning as we'll be adopting the role of a security researcher who has just received an audit request from a protocol.

In later lessons we'll also go through the process of submission findings in a competitive scenario like `CodeHawks`

![firstaudit1](/security-section-3/1-review/firstaudit1.png)

### The End Goal

Before jumping into this process ourselves, I'd like us to look at what we're striving towards. Below you can find links to the PasswordStore repo at various phases of an audit.

- [**Security Review CodeV1**](https://sepolia.etherscan.io/address/0x2ecf6ad327776bf966893c96efb24c9747f6694b)
- [**Security Review CodeV2**](https://github.com/Cyfrin/3-passwordstore-audit)
- [**Security Review CodeV3**](https://github.com/Cyfrin/3-passwordstore-audit/tree/onboarded)
- [**Security Review Final**](https://github.com/Cyfrin/3-passwordstore-audit/tree/audit-data)

Take a look specifically at `Security Review Final`. The `audit-data` folder contains all the things you'll be able to build by the end of this section, including a professional PDF audit report.

### Remember the Phases

It’s important to remember the phases for each audit or security review. They include:

1. Initial Review
   - Scoping
   - Reconnaissance
   - Vulnerability Detection
   - Reporting
2. Protocol Fixes
   - Fixes issues
   - retests and adds tests
3. Mitigation Review
   - Reconnaissance
   - Vulnerability Detection
   - Reporting

In this course, our main focus will primarily be on how to perform your initial review.

We're starting out small with a codebase of less than 20 lines, but this is just the beginning. It's important to remember that _you_ are the security researcher and often times what may be clear or obvious to you, isn't to a protocol. Your expertise is valuable.

So, with the expectations set and our targets defined, let's move ahead and commence our very first smart contract audit or security review. We'll start off with a scenario that will help us better understand what our roles as auditors will look like.
