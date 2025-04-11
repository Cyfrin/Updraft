---
title: Recap I
---

_Follow along with this video:_

---

### Recap

We've learnt so much so far in this section, let's do a quick refresher of what we've covered!

### Embracing Your Role as a Security Researcher

First and foremost, you are not just coders or developers - you are security researchers. You are the gatekeepers ensuring the integrity of smart contracts. Our goal is to ensure that these protocols are not only safe and secure but also well-documented and supported with a robust test suite.

A link to Etherscan is insufficient and we need to educate these protocols on best practices and the benefits of proper audit preparation.

> "Smart contracts are the most adversarial environment on the planet, and we need to treat them as such."

If you are handed a code base within a smart contract development framework, yet find it lacking adequate tests or documentation, remember, this isn't going to be helpful.

> Remember `80%` of the vulnerabilities out there are a product of `business logic`

We need a clear understanding of what a protocol _does_ and _how_. This should be well documented.

As much as we need more information from protocol developers, sometimes, it falls upon us, the security researchers, to educate them about the best security practices.

### Scoping Out a Codebase

We've went over the [**Minimal Onboarding Questions**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/minimal-onboarding-questions.md)

The importancee of each section can't be overstated.

**About** - Summary of the project. The more documentation, the better.

**Stats** - Calculate the `nSLOC` using tools like `CLOC`

**Setup** - What tools are needed to setup the codebase & test suite? How to run tests. How to see test coverage.

**Scope** - We need an exact commit hash and the specific contracts `in scope` to be detailed

**Roles** - What are the different actors of the system? What are their powers? What should/shouldn't they do?

**Known Issues** - any issues that the protocol team is aware of and will not be acknowledging/fixing.

When we get more advanced, we'll have a more [**extensive onboarding form**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/extensive-onboarding-questions.md), but we'll cover that later in the course.

Eventually you may want to customize this form to suit your needs.

### Congratulatory Note and a Sneak Peek

**A huge congratulations on reaching this far!** 🥳

I know the journey might seem verbose and daunting, but trust me, all these painstaking steps are crucial. They will save you hours in the future, especially if you consider becoming an independent auditor or starting your own firm.

Keep sharp, in our next lesson we'll be going over `The Tincho` an auditing technique used by the legendary `Tincho Abbate`.
