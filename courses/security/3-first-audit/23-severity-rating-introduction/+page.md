---
title: Severity Rating Introduction
---

_Follow along with this video:_



---

## Your First Audit: Severity Guide

We have a comprehensive guide on how to conduct your first audit. In this article, we’ll be focusing on one of the most important aspects of auditing: severity ratings, and you can always check the documentation at [CodeHawks](https://docs.codehawks.com/hawks-auditors/how-to-determine-a-finding-validity) if you want more context.

![](https://cdn.videotap.com/7lZzIpoo6m1i2yRO4L8G-32.62.png)

## Categorization: High, Medium, and Low

For the purposes of this guide, we will be focusing on three categories of severity ratings: high, medium, and low. While some auditors prefer to include an optional “critical” rating, in this article, we’ll stick with the basic three categories.

Determining the category comes down to two elements: the likelihood of an attack and the impact of the attack. Though these can be subjective, there are some standard guidelines.

1. **High severity**: High impact would be where funds are directly or nearly directly at risk, or a severe disruption of protocol functionality or availability happens.
2. **Medium severity**: With a medium impact, perhaps funds are indirectly at risk or there’s some level of potential disruption to the protocol’s functionality.
3. **Low severity**: A low impact finding might not put funds at risk but could indicate a function is incorrect, or a state may not be properly handled.

Think of it in terms of user experience - how upset would users of the protocol be if a certain attack occurred?

11## Assessing likelihood: The Probability Factor

Assessing the likelihood of a certain event happening can be somewhat subjective. That said, consider the following:

1. **High likelihood**: Think of cases where a hacker can directly call a function to hit impact, for example.
2. **Medium likelihood**: Here, perhaps more specific conditions need to occur for the event to happen, such as a specific type of token being used on the platform.
3. **Low likelihood**: This would be rare situations that are unlikely to happen but are still technically feasible, such as a certain A, B, C event taking place at a specific time.

Of course, there are situations that are 'computationally unfeasible', or so unlikely they are practically impossible. They are not considered as attack paths.

![](https://cdn.videotap.com/X03vsMLjpN6hMQWiqf3J-168.51.png)

> “Take security assessments seriously. Understanding the severity of problems is crucial when auditors are scrutinizing your code.” -- Raj K.

## Applying the Ratings: Examples

With a foundational knowledge of categories and likelihood, we can begin applying these to various scenarios. Before we jump into this, take a moment here to digest the above concepts. You can also peruse these examples of high, medium, and low severity assessments to get a better grasp of what these categories might entail.

For a practical exercise, we can look at the Password Store protocol to understand how to determine the severity of its security issues. Through thorough understanding and application, the severity scales we've discussed here today will prove invaluable to your auditing efforts.

Remember: the goal of any audit is securing the protocol, and an integral part of this process is understanding severity ratings. So make sure to keep these guidelines in mind as you continue your journey in security auditing.
