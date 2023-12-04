---
title: What is a Smart Contract Audit?
---

_Follow along with this video:_

## 

---

You might think you've got a grip on what a smart contract audit is all about, but this lesson aims to help you dive deeper and truly comprehend the whole process. Brace yourself, as today we are stepping into the interesting realm of security reviews.

Let's start off by stating that the term "smart contract audit" is a bit of a misnomer. As a more appropriate alternative, I am a stout advocate of "security review." I even have a T-shirt to prove my allegiance!

You might be wondering why this change of terms is required. Well, it’s because the term 'audit' might wrongly insinuate some kind of guarantee or even encompass legal implications. A security review, being free of these misconceptions, exudes the essence of what we are actually doing: looking for as many bugs as possible to ensure maximum code security.

_Note_: Despite this, many protocols still insist on requesting a "smart contract audit," so it's eminent to know that the terms are interchangeable. When you hear "security review", think "smart contract audit" and vice versa. Protocols are often unaware of these nuances, but you, as a trained security researcher, know better!

By now, I hope you're questioning with anticipation: "What does a security review entail?"

## The Three Phases of a Security Review

Right in our GitHub repository, we detail the three phases of a security review and what that process looks like. To give you a heads-up, there really isn't a "one-size-fits-all" approach to smart contract auditing. There are several unique strategies, each bringing a different set of pros and cons to the table.

In this post, we'll discuss two particularly effective techniques, the "Tincho" and the "Hans", to help familiarize you with the process. However, remember that these are just examples; there isn’t a definitive "correct" way of performing a security review.

Before we delve into the specifics, let's discuss why security reviews are critical.

## Importance of Security Reviews

As code deployed to a blockchain is immutable, it’s crucial that it's error-free before deployment. The permissionless and adversarial nature of the blockchain means that protocols need to be ready to repel malicious users. Failure to do so can lead to hefty monetary losses, as evidenced by the nearly $4 billion stolen due to smart contract vulnerabilities last year.

But the benefits of conducting a security review go beyond just minimizing vulnerabilities. It also aids protocol developers in enhancing their understanding of the code itself, thereby accelerating feature implementation and increasing effectiveness. A security review can also familiarize your team with the latest trends and tooling in the space.

With this understanding, let's familiarize ourselves with the process of a typical audit.

### Reach Out for a Review

The review process begins when a protocol reaches out, be it before or after their code is complete. After they make contact, it's important to deduce the duration and thus the cost of the audit based on the scope and complexity of the code. You can review the rough approximation of audit duration in terms of Lines of Code (LOC), shown in our thread.

Having the commit hash (the unique ID of the codebase) allows you to finalize the start date and final price. Some auditors may request a down payment to book the time slot.

### Audit Begins

Now that the admin work is done, auditors can roll up their sleeves and get to work. Using everything in their arsenal, they will strive to find as many vulnerabilities as possible in your code.

### Initial Report

Once the review period is over, the auditors compile an initial report. This report includes all findings, categorized according to severity (high, medium, low, noncritical) and potential for improving gas efficiency.

### Mitigation Phase

The protocol's team then has a fixed period to address the vulnerabilities found in the initial audit report. More often than not, they can simply implement the recommendations provided by the auditors.

### Final Report

Upon completion of the mitigation phase, the audit team compiles a final audit report focusing exclusively on the fixes made to address the initial report's issues. Hopefully, this cements a strong relationship between the protocol and the audit team, fostering future collaborations to keep Web Three secure.

## Ensuring a Successful Audit

For an audit to be as successful as possible, you should ensure that there's:

- Good documentation
- A solid test suite
- Clear and readable code
- Clear communication channels
- An initial video walkthrough of the code

By considering auditors as an extension of your team, maintaining an open channel of communication, and providing them with the necessary documentation and context, you ensure the audit process is smoother and more accurate.

Lastly, remember that a smart contract audit is an integral part of a security journey rather than an endpoint. Even after an audit, any subsequent code changes need to be reviewed as the new code is unaudited, regardless of the size of the change.

## In Closing

While this post comprehensively outlines a typical security review, also known as a "smart contract audit", it's essential to remember that no two audits are the same. Depending on your specific circumstances, tweaks to the above process might be necessary.

Stay tuned for upcoming posts where we'll discuss the difference between competitive audits and private audits! Don't forget to reach out to the Cypher team if you're looking for a security audit. Until next time, stay safe!

> "There is no silver bullet in smart contract auditing. But understanding the process, methods, and importance of regular security reviews can significantly enhance your protocol's robustness."
