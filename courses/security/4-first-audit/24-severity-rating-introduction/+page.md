---
title: Severity Rating Introduction
---

_Follow along with this video:_

---

### How to Evaluate a Finding's Severity

For this lesson we'll be referencing the [**CodeHawks Documentation**](https://docs.codehawks.com/hawks-auditors/how-to-evaluate-a-finding-severity). There's a section specifically outlining `How to Evaluate a Finding Severity` and we'll be leveraging that methodology here.

We'll be breaking our severities into `High`, `Medium` and `Low`. Some security researchers will include a `Critical` severity, if they believe a situation warrants one, but we'll stick with these 3 for now.

### Impact: High, Medium, and Low

Determining the category comes down to two elements: the likelihood of an attack and the impact of the attack. Though these can be subjective, there are some standard guidelines.

1. **High Impact**: `funds` are directly or nearly `directly at risk`, or a `severe disruption` of protocol functionality or availability occurs.
2. **Medium Impact**: `funds` are `indirectly at risk` or there’s `some level of disruption` to the protocol’s functionality.
3. **Low Impact**: `Fund are not at risk`, but a function might be incorrect, or a state handled improperly etc.

Think of it in terms of user experience - _how pissed off would users be if an attack happened?_

### Likelihood: High, Medium, and Low

Assessing the likelihood of a certain event happening can be somewhat subjective. That said, consider the following:

1. **High Likelihood**: Highly probably to happen.
   - a hacker can call a function directly and extract money
2. **Medium Likelihood**: Might occur under specific conditions.
   - a peculiar ERC20 token is used on the platform.
3. **Low Likelihood**: Unlikely to occur.
   - a hard-to-change variable is set to a unique value at a specific time.

> Note: Some situations are _so unlikely_ they're considered `computationally unfeasible` and are not considered valid attack paths.

### Wrap Up

With an understanding of impact and likelihood, we're ready to start applying these methodologies to our PasswordStore audit.

Take some time before moving on to familiarize yourself with the severity example available on the [**CodeHawks Documentation**](https://docs.codehawks.com/hawks-auditors/how-to-evaluate-a-finding-severity) before moving forward!
