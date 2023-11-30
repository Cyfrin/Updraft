---
title: Phase 2 Recon - Reading the Docs
---

<iframe width="560" height="315" src="https://youtu.be/ZolEhNT2wMk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# **Correct Video Link https://youtu.be/ZolEhNT2wMk** Update coming to embed soon 🙏

# Thunder Loans: In-depth Dive into Flash Loan Protocols

Welcome to this comprehensive deep dive into flash loan protocols. In particular, we will be focusing on the Thunder Loan protocol heavily based on Aave and Compound.

If you're not familiar with Aave, I recommend checking out this explainer video available at [Whiteboard Crypto](https://www.whiteboardcrypto.com/). It's a fantastic resource to learn the ins and outs of borrowing and lending protocols at a high level.

For this particular blog, we're going to thrust ourselves much deeper to dissect these protocols and thoroughly understand how they make Thunder Loans possible.

Let's kick-off the discussion by outlining what is Thunder Loans.

## Thunder Loan Protocol: A Flash Loan Blueprint

The Thunder Loan protocol is designed with two main objectives. Firstly, it aims to provide users with the ability to construct flash loans. Secondly, it offers liquidity providers a chance to profit off their capital.

> "What's a flash loan?"

If you posed this question, I urge you to hang on as we will delve into it later in this post. But first, let's get up to speed on some terminology.

A _liquidity provider_, as some of you might be aware, is an individual who pours money into a protocol to yield interest. An inevitable question that follows is, "where does the interest come from?" It's a question vital to both an investor and a security researcher's perspective.

Taking t-swap as an example, the interest generated is sourced from the fees levied on swaps. Translating the same logic, in Thunder Loans, the interest is likely derived from the fees attached to these flash loans.

Remember, when you deposit money into Thunder Loans, you're given an asset token, which gradually accrues interest over time depending on the prevalence of flash loans.

Alright, let's dissect what exactly is a flash loan.

## Flash Loans: A Simple Explanation

The term 'Flash Loan' refers to a loan that spans precisely one transaction. In simpler terms, a user can borrow any sum of assets from a loan protocol as long as they completely pay it back within the same transaction. Failure to adhere to this rule causes the transaction to revert, cancelling the loan automatically.

Additionally, a tiny fee is imposed to the protocol depending on the borrowed amount. In Thunder Loans, to determine these fees, we utilize the renowned on-chain T-swap price Oracle.

![](https://cdn.videotap.com/NZwarBK1M4rlkUCCFnyN-120.67.png)Thunder loans are currently planning to progress from the existing Thunder Loan contract to an upgraded one. This upgrade forms part of our security review's scope.

To effectively navigate these waters, we must develop a solid understanding of flash loans and get better acquainted with this lending and borrowing protocol. Hopefully, some graphical diagrams could perhaps simplify our learning process.

Therefore, to understand this innovative DeFi primitive, I implore you to delve more into flash loans. Its knowledge is crucial to dissect the intricacies of Thunder Loans.

## Wrapping Up

In this modern era of DeFi, understanding flash loans is remarkably essential. This blog is intended to provide a leap pad that gets you from novice to advanced levels of understanding how Thunder Loans operates and what are Flash Loans.

So, pull out your notes, and let’s dive more in-depth into the world of flash loans. Understanding and leveraging flash loans can potentially change your perspective on lending and borrowing protocols.

That's all for today. Stay tuned for more insightful blogs on the expansive DeFi universe!
