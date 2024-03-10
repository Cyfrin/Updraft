---
title: Rekt Test
---

_Follow along with this video:_

---

## Audit Readiness

The concept that once you've had an audit done, you're ready to ship - is wrong. There are two tests that I tell everyone to look at prior to getting a security review one is the [**nacentxyz simple-security-toolkit**](https://github.com/nascentxyz/simple-security-toolkit) and the other is [**The Rekt Test**](https://blog.trailofbits.com/2023/08/14/can-you-pass-the-rekt-test/), by Trail of Bits.

### The Rekt Test

The Rekt Test is highly important as it poses a set of questions to gauge your protocol's preparedness for an audit. This tool forces you to think about security measures from a more proactive angle. Should your protocols fail to answer these questions, the chances are that they're not audit-ready.

<img src="/security-section-2/3-rekt/rekt1.png" style="width: 100%; height: auto;">

The questions touch on several aspects like documentation, security roles, security tools, and protective measures, among others. Here's a curated list:

- **Do you have all actors roles and privileges documented?**
- **Do you keep documentation of external services contracts and Oracles?**
- **Do you have a written and tested incident response plan?**
- **Do you document the best ways to attack your system?**
- **Do you perform identity verification and background checks on all employees?**
- **Do you have a team member with security defined in the role?**
- **Do you require hardware security keys for production systems?**
- **Do you define key invariants for your system and test them on every commit?**
- **Do you use the best automated tools to discover security issues in your code?**
- **Do you undergo external audits and maintain a vulnerability disclosure or bug bounty program?**
- **Have you considered and mitigated avenues for abusing users of your system?**

As developers, you must be able to answer all these queries before you proceed with an audit. If you're dealing with a protocol that fails to answer these questions, it's best to tell them the protocol isn't ready to ship, or arguably audit, until they can.

> "Delegate responsibility to someone on your team for security - Give your project a sense of ownership and a point person to handle any security breaches."

### Nascent Audit Readiness Checklist

[**This**](https://github.com/nascentxyz/simple-security-toolkit) checklist is another effective method to assess if you're ready for an audit. Though it offers different perspectives, it's another tool that helps you determine if your protocols are prepared for audits.

### Next Steps and Post Deployment

We'll later cover the important of Post Deployment Planning and all that entails, including:

- Bug Bounty Programs
- Disaster Recovery Drills
- Monitoring

Thinking about the steps necessary _after_ deployment really frames a protocols security holistically and ensures readiness to deal with potential exploits and ability to respond quickly.
