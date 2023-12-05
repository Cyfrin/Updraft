---
title: A Note On The Linear Progress Of Security Reviews
---

# Evaluating Smart Contract Security: Journey Through "Thunder Loan"

Welcome, tech lovers! Today, we're taking a deep-dive into the riveting world of smart contract audits. In this post, we'll be dissecting a Tech Talk where we audited a smart contract named "Thunder Loan." Buckle up, it's going to be an exciting learning experience!

## Remix vs Chisel: The Battle of Testing Tools

In the world of software development, it's not uncommon to use different tools for testing code. In this instance, we initially tested Thunder Loan using Remix and throughout our auditing process, we discovered a few things that are worth mentioning.

_Fire up your terminal, it's time to discuss some code!_

![](https://cdn.videotap.com/86697zC0OHfWSFQSGKUh-13.33.png)

When we attempted to delete particular sets of code, it appeared to work in Remix quite fluidly.

```javascript
delete this;
```

Despite the successful outcome in Remix, the same could not be said when we tried it in Chisel. As a coding auditor, I can safely say Remix was more accurate in this case. Chisel was, unfortunately, incorrect in its evaluation of the aforementioned code.

## Emitting Tokens and Asset Returns

Next, we looked into the `Emit allowed token set` function. After careful examination, we were pleased to see that the system accurately complied.

```javascript
emit allowedTokenSet;
```

Following this, we went on to return the asset tokens.

```javascript
return assetToken;
```

Again, this process appeared to run smoothly. Keep in mind; one crucial aspect of an audit is multiple points of review. This helps maintain precision in an audit. I usually do an "Okay" check at the start and then perform another towards the end, as in "Audit in Foe."

Also, another point to ponder; many tools such as Darren catch the "needs Nat spec" command pretty well. So while it may not seem necessary to include this, it could assist in accurate evaluations and maybe even in bug spotting!

## Deep Dive into the Deposit Function

Now we've arrived at another integral part of our audit – the deposit function. Furthermore, we explored the selection process for tokens.

```javascript
add Token;remove Token;
```

Here, things got a tad more interesting. The code seemed to be allowing the addition and removal of tokens at the will of the owner. While this is generally great, it might potential problems in the future. But, of course, only time will unveil that truth.

## Understanding the Non-linear Nature of Audits

So far, we've gone through at least one function of Thunder Loan, and guess what - No bugs yet! But don't let that fool you. The absence of bugs at the initial stages does not necessarily illustrate a perfect system.

> "Security reviews are often not linear. It's not like, oh, found a bug here, found a bug here, here, and then three bugs here, and then done. No! They are often exponential."

By the time auditors gain a comprehensive understanding of the codebase, they are better equipped to identify bugs. If bugs are found along the way, that's a bonus!

## A Final Word

At the end of the day, a thorough audit is more about understanding than it is about unearthing bugs. The more you understand the code, the more efficient you become in identifying any potential or existing bugs. As discouraging as it might seem when bugs fail to show up initially, remember, it's all part of the process! Happy coding, everyone!
