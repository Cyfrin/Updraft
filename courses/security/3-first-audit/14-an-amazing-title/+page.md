---
title: An Amazing Title
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/tiVy5MvFPaM?si=quX64I-2EF8XdJOW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Writing Your Findings: A Guide to Eloquent and Effective Security Audits

In the world of data security and blockchain technology, precision is key. From the precision of coding to the precision of documentation, every iota of detail counts. Today, I'll walk you through how to articulate your findings proficiently, specifically when pinpointing vulnerabilities in a smart contract. Just as repetition hones a skill, I encourage you to write alongside me. Let's start refining your ability to document your audit findings accurately and eloquently.

## Getting Started

First things first, we need to discuss severity rating. We will revisit this later on, but it is a pertinent start to categorize your issue in terms of severity.

The main event of any audit report is _the title_. It provides the reader with an immediate overview of the issue and the implications. Crafting a title is a blending art and precision. A well-formed, succinct title is a straightforward combination of the root cause and the impact.

## Identifying the Root Cause

When we discuss the 'root cause', we refer to the originating flaw or glitch prompting the vulnerability. In our case, the root cause lies in the uninhibited visibility of the on-chain data storage. In other words, variables stored in on-chain storage are visible and accessible to anyone, disregarding any solidity visibility keyword.

## Understanding the Impact

Moving onto the 'impact', it's the specific issue or discrepancy caused by the root cause. In simpler terms, it answers the "why" something is problematic. In our situation, the fact that our 'password' stored on-chain is public makes it loses its privateness.

This could be a potential title, enveloping both the root cause and the impact. Yet, it tends to feel lengthy and a bit complex. The challenge here is to retain the essential details while making it more accessible and crisp.

## Fine-Tuning Your Title

Let us revise our initial title to achieve more brevity and clarity. How about, "Storing password on-chain makes it visible to anyone?"

With this simplified title, we now have a neat encapsulation of the root cause ("Storing the password on chain") and its respective impact ("...makes it visible to anyone"). It maintains the severity of the issue while discarding unnecessary complexity.

In summary, creating an ideal title in this context is a balance between the concise depiction of the root Cause and its resultant Impact. It implies the nature of the problem and its potential implications without being verbose or cryptic.

> "The success of your audit report depends largely on the clarity, precision and brevity of your titles that depict the root cause and its potential impact."

Ultimately, the goal here is to help you fine-tune your audit-writing abilities. The better you get at portraying your findings, the wider will be its understanding and more efficient the solutions. Now that you know how to craft a succinct and informative title, apply this drill to every vulnerability you encounter and notice your improvement in getting your findings across.
