---
title: What is a Smart Contract Audit?
---

_Follow along with this video:_

##

---

You might think you've got a grip on what a smart contract audit is all about, but this lesson aims to help you dive deeper and truly comprehend the whole process. Brace yourself, as today we are stepping into the interesting realm of security reviews.

Let's start off by stating that the term "smart contract audit" is a bit of a misnomer. As a more appropriate alternative, I am a stout advocate of "security review." I even have a T-shirt to prove my allegiance!

You might be wondering why this change of terms is required. Well, it’s because the term 'audit' might wrongly insinuate some kind of guarantee or even encompass legal implications. A security review, being free of these misconceptions, exudes the essence of what we are actually doing: looking for as many bugs as possible to ensure maximum code security.

> Note: Despite this, many protocols still insist on requesting a "smart contract audit," so it's eminent to know that the terms are interchangeable. When you hear "security review", think "smart contract audit" and vice versa. Protocols are often unaware of these nuances, but you, as a trained security researcher, know better!

By now, I hope you're questioning with anticipation: "What does a security review entail?"

## The Three Phases of a Security Review

Right in our GitHub repository, we detail the three phases of a security review and what that process looks like.

    Initial Review
            Scoping
            Reconnaissance
            Vulnerability identification
            Reporting
    Protocol fixes
            Fixes issues
            Retests and adds tests
    Mitigation Review
            Reconnaissance
            Vulnerability identification
            Reporting

To give you a heads-up, there really isn't a "one-size-fits-all" approach to smart contract auditing. There are several unique strategies, each bringing a different set of pros and cons to the table.

In this course we'll discuss two particularly effective techniques, `"the Tincho"` and `"the Hans"`, to help familiarize you with the process. However, remember that these are just examples; there isn’t a definitive, "correct" way of performing a security review.

Before we delve into the specifics, let's discuss why security reviews are critical.

## Importance of Security Reviews

> A smart contract audit is a timeboxed, security based review of your smart contract system. An auditor's goal is to find as many vulnerabilities as possible and educate the protocol and security and coding best-practices moving forward.

As code deployed to a blockchain is immutable, it’s crucial that it's error-free before deployment. The permissionless and adversarial nature of the blockchain means that protocols need to be ready to repel malicious users. Failure to do so can lead to hefty monetary losses, as evidenced by the nearly $4 billion stolen due to smart contract vulnerabilities last year.

The benefits of conducting a security review go beyond just minimizing vulnerabilities.

It also aids protocol developers in enhancing their understanding of the code itself, thereby accelerating feature implementation and increasing effectiveness. A security review can also familiarize your team with the latest trends and tooling in the space.

Often a single audit won't be enough, protocols are really entering into a security journey which may include:

- Formal Verification
- Competitive Audits
- Mitigation Reviews
- Bug Bounty Programs

With this understanding, let's familiarize ourselves with the process of a typical audit.

### Reach Out for a Review

The review process begins when a protocol reaches out, be it before or after their code is complete. After they make contact, it's important to determine the cost of a review based on things like:

- Code Complexity/nSLOC
- Scope
- Duration
- Timeline

Lines of Code: Duration

- 100 : 2.5days
- 500 : 1 Week
- 1000 : 1-2 Weeks
- 2500 : 2-3 Weeks
- 5000 : 3-5 Weeks
- 5000+: 5+ weeks

Take this with a lot of salt though as these timelines vary largely based on circumstance.

With the submission of a `commit hash` and `down payment` by the protocol and start date can be set!

> Note: The `commit hash` is the unique ID of the codebase an auditor will be working with.

### Audit Begins

Now that the admin work is done, auditors can roll up their sleeves and get to work. Using everything in their arsenal, they will strive to find as many vulnerabilities as possible in your code.

### Initial Report

Once the review period is over, the auditors compile an initial report. This report includes all findings, categorized according to severity

- High
- Medium
- Low
- Information/Non-critical
- Gas Efficiences

High, medium and low findings have their severity determined by the impact and likelihood of an exploit.

Informational/Non-Critical and Gas are findings focused on improving the efficiency of your code, code structure and best practices. These aren't vulnerabilities, but ways to improve your code.

### Mitigation Phase

The protocol's team then has a fixed period to address the vulnerabilities found in the initial audit report. More often than not, they can simply implement the recommendations provided by the auditors.

### Final Report

Upon completion of the mitigation phase, the audit team compiles a final audit report focusing exclusively on the fixes made to address the initial report's issues. Hopefully, this cements a strong relationship between the protocol and the audit team, fostering future collaborations to keep Web3 secure.

## Ensuring a Successful Audit

For an audit to be as successful as possible, you should ensure that there's:

- Good documentation
- A solid test suite
- Clear and readable code
- Modern best practices are followed
- Clear communication channels
- An initial video walkthrough of the code

By considering auditors as an extension of your team, maintaining an open channel of communication, and providing them with the necessary documentation and context, you ensure the audit process is smoother and more accurate, providing auditors valuable context of the codebase.

## Post Audit

Lastly, remember that a smart contract audit is an integral part of a security journey rather than an endpoint. Even after an audit, any subsequent code changes need to be reviewed as the new code is unaudited, regardless of the size of the change.

> Remember: One audit might not be enough. Getting more eyes on your code is only going to increase the chances of catching vulnerabilities before it's too late

## What an audit _isn't_

Going through a security review does not mean that your code is bug free. Security is a continuous process tha tis always evolving.

## In Closing

This should have provided you a high-level understanding of what a security review is, what it's comprised of and what to expect while performing one.

We'll detail some of the specific differences between `competitive` and `private` audits in a later section.

> "There is no silver bullet in smart contract auditing. But understanding the process, methods, and importance of regular security reviews can significantly enhance your protocol's robustness."
