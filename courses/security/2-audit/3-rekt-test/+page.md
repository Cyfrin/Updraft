---
title: Rekt Test
---

_Follow along with this video:_



---

## The Rekt Test

The Rect Test is highly important as it poses a set of questions to gauge your protocol's preparedness for an audit. This tool helps insists that you think about security measures from a more proactive angle. Should your protocols fail to answer these questions, the chances are that they're not audit-ready.

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

<img src="/security-section-2/3-rekt/rekt1.png" style="width: 100%; height: auto;">

As developers, you must be able to answer all these queries before you proceed with an audit. If you're dealing with a protocol that fails to answer these questions, advise them on their lack of readiness and hold off on any audits until they are ready.

> "Delegate responsibility to someone on your team for security - Give your project a sense of ownership and a point person to handle any security breaches."

While using hardware security keys might seem out of place in a digital space, they act as an additional layer of security that is arguably better than an authentication app or an SMS.

## Nascent Audit Readiness Checklist

This checklist is another effective method to assess if you're ready for an audit. Though it offers different perspectives, it's another tool that helps you determine if your protocols are prepared for audits.

## Basic OpSec and Other Essential Steps

Before we dive into the details of smart contract reviews, let's briefly touch on Basic Operational Security (OpSec). Protocols must fulfill certain requirements that ensure the smooth running of the deployed contracts. This includes running invariants, using automated tools for discovering security issues, maintaining a disclosure program for vulnerability, and most importantly, considering users.

## External Audits and Other Security Reviews

An external audit is a powerful tool to ensure the resilience of your code against vulnerabilities. Apart from uncovering potential security risks, these audits also help maintain a Bug Bounty or Vulnerability Disclosure program.

These programs are beneficial as they encourage the identification of system vulnerabilities, thereby improving the overall security of the smart contract. It also creates a sense of accountability towards maintaining a secure system.

## Post-deployment Measures

Even after all the above steps, the process doesn't end with deploying the contract. Post-deployment planning, bug bounties, disaster recovery drills, and diligent monitoring are critical parts of the life-cycle of any smart contract. These measures ensure your readiness to deal with potential hacks and your ability to respond in a timely manner.

<img src="/security-section-2/3-rekt/rekt2.png" style="width: 100%; height: auto;">

)Consider these guidelines as a checklist. If your protocols can't tick off each of these requirements, you should postpone any audits or reviews until your protocol is ready to ship, and more importantly, able to withstand the tests of security after being live.
