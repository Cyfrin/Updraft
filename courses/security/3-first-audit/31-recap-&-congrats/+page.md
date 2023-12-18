---
title: Recap & Congrats
---

_Follow along with this video:_



---

# The Comprehensive Guide to Conducting A Solidity Security Review

Today, we're diving into how to conduct a security review for Solidity, the programming language behind Ethereum's smart contracts. We'll walk you through the major phases, from educating protocols about security necessities and onboarding them, to conducting a thorough security review and generating a professional report.

## Starting with a Basic-Yet-Critical Lesson

One of the first things to understand is that audit requests often come in the form of Ether scan links, a practice that needs to change. A more comprehensive process is required to ensure security, which includes properly onboarding different protocols and teaching these protocols about safety measures.

```markdown
Basic Security Structure:

1. Have a test suite
2. Complete onboarding questionnaires
3. Consciously plan for an audit
```

The first step toward creating a secure protocol involves ensuring they're thinking about security in the right way.

## Gathering Documentation

Once a protocol has been onboarded, you will need to amass all the documentation relating to the protocol, such as details about how to build the protocol and the actual scope of the security review.

Key details to identify include:

- Solidity version
- Chains
- Tokens
- Roles
- Known issues

## Estimating Codebase Size

Learning how to estimate the size of a codebase can also be beneficial when predicting the duration of an audit or security review. The tool "Solidity Metrics" is useful for this, as it provides a simple output detailing the number of source lines of code and a complexity score.

Alternatively, the "cloc" command can be used, offering similar statistics and aiding the planning process for audits and reviews.

## The Phases of A Smart Contract Audit

Parallel to conventional software engineering, security reviews also involve a number of phases, namely Scoping, Recon, and Vulnerability Identification.

Here's a brief rundown on each phase:

- **Scoping**: Collect initial information, determine what is within scope, and plan the review.
- **Recon**: Look for potential bugs and abnormalities.
- **Vulnerability Identification**: Identify actual bugs, tinker, take notes, comment, and figure out the severity.

Next, the process also involves creating a detailed report post-analysis.

The final two phases involve the protocol fixing any issues identified, adding tests, re-testing, and conducting a mitigation review. This phase usually proceeds more swiftly, given that you would by then have gained substantial context about the codebase and only need to focus on the differences.

## Imperial Advice from an Ace Security Researcher

We've had the privilege of learning from renowned security researcher, Wizard Tincho, who shared his method for carrying out smart contract security reviews. His advice? Start by reading the docs, take detailed notes, and then build from small to large concepts.

> "Read the docs, take notes, go from small to large." - Wizard Tincho

You can find his full-length interview [here](https://www.youtube.com/watch?v=bYdiF06SLWc&t=0s), where he dives deeper into his techniques for successful security reviews.

## Getting Hands Dirty with an Actual Security Review

After getting a good theoretical foundation, it's time to try it out. For instance, we conducted a security review where we detected missing access controls, a relatively common bug, yet one that provides crucial insights into the protocol.

In our review, for example, we found a section in the 'set password' function that should have stipulated that only the owner of this contract could set the password - this essential requirement was missing.

This is precisely why understanding the protocol's intended function is crucial for finding bugs. Often, with multiple roles within a protocol, identifying the appropriate access controls can get complicated and it's virtually imperative to clarify roles at the outset.

Consequently, getting to know potential exploits such as private data and access controls is absolutely crucial, even if they seem highly evident.

## Hand-holding through Writing a Phenomenal Review Report

One of the final and more essential steps lies in writing a comprehensive report. A template that works well includes a succinct description, where you mention the root cause and impact in your findings list. Here's a minimal example to illustrate this:

```markdown
### Findings1.

Storing the password on chain makes it visible to anyone and no longer private. (Root Cause -> Impact)

### Recommended mitigation

_Depends on the findings; can range from code fixes to architecture changes._
```

Additionally, it's quite useful to provide proof of code as an evident proof of the concept for the existing issue.

Finally, don't neglect informational write-ups where you can flag potential areas of concern even if they aren't critical bugs.

## The Magic of AI in Audits

Modern advancements mean we can embrace the power of Artificial Intelligence (AI) in helping us tackle an audit. Using AI, we can expedite and automate some tasks, saving countless precious hours.

## Recognizing the Severity and Classifying Findings

Classifying the severity of findings can initially seem a subjective task. However, with practice, distinguishing between high, medium, and low severity findings becomes easier.

Fundamentally, this distinction rests on the matrix of likelihood versus impact. For example, a high impact and highly likely finding that disrupts the protocol's functionality entirely would qualify as a 'high severity' finding.

## Bringing It All Together with An Audit Report

Finally, you'll consolidate all your findings into a detailed, professionally laid out audit report using a tool like Markdown. This will present your findings in a clear and accessible format and provides a great visual representation to clients.

However, remember that this process is but a guide. You might decide to create your own report template or use different tools as you grow experienced in conducting audits and reviewing security. Bitcoin/blockchain is still a relatively new field, so the aim is to keep iterating, learning, and improving your review process. Whichever path you choose, the goal remains the same: to construct a secure, sound protocol.

That's your brief yet comprehensive guide to conducting a security review in Solidity. Audit on and ensure the crypto world stays secure!
