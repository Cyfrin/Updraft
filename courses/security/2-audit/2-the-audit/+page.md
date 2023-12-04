---
title: The Audit (Security Review Process)
---

_Follow along with this video:_



---

When developing smart contracts, understanding and following the audit process is a crucial step towards achieving a more secure protocol. This guide will walk you through the entire audit process from initial review to the final mitigation phase, and why it's important to weave this process throughout your development lifecycle.

## High-Level Overview of The Audit Process

The smart contract audit process can be briefly summed up in these steps:

1. **Get Context**: Understand the project, its purpose and its unique aspects.
2. **Use Tools**: Employ relevant tools to scan and analyze the codebase.
3. **Manual Reviews**: Make a personal review of the code and spot out unusual or vulnerable code.
4. **Write a Report**: Document all findings and recommendations for the development team.

To illustrate how this pans out in reality, we can look at the Tincho method used to audit ENS – a process that landed him a cool $100,000 payout! We'll delve into this later on.

## Diving Deeper: Breakdown of the Audit Process

For a more detailed perspective, let’s consider the process as broken into three distinct phases:

**Initial Review:** In this phase, auditors go through the code to scope it. This gives an idea of how much time might be required for the audit, which can then be used to establish pricing. Key tasks include identification of all the contract’s dependencies and a general overview of the code. At this stage, auditors don’t dig deep into anything yet.

**Reconnaissance:** The actual work begins here. Auditors start looking through the code thoroughly and start utilizing their analysis tools.

**Vulnerability Identification:** Identifying all vulnerabilities and understanding how these vulnerabilities could be exploited. Post identification, a detailed report is written, which comprises all identified vulnerabilities, and importantly, the steps to take to make the protocol more secure.

Your ultimate aim should be to make the protocol more secure. Therefore, ensure to take notes of all findings and steps and elaborate it in your report.

> "Your job is to do whatever it takes to make the protocol more secure."

Difference in Audit Styles: Note that the aforementioned process details a private audit or a traditional security review. For competitive audits, you are typically optimized for time and identifying as many high vulnerabilities as possible.

After handing over the report to the protocol, they should set about implementing every recommended change you've made in your report. Once all vulnerabilities are mitigated, they will hand the code back to you for the final phase.

**Mitigation Review:** This is where you, as the auditor, have to verify that all the changes made actually fix the problems and, importantly, that no new bugs have been introduced.

Remember, the goal of conducting contract audits isn't simply to tick a box. It's about ensuring the security and smooth running of the smart contract at all stages of its lifecycle. The more audits you conduct, the better you become at identifying potential security issues.

<img src="/security-section-2/2-the-audit/the-audit1.png" style="width: 100%; height: auto;">

## Embedding Security Audits in Development Lifecycle

The process of developing a smart contract follows a lifecycle too. According to the [OWASP](https://www.owasp.org/index.php/Main_Page) (The Open Web Application Security Project) guide, security isn't just a one-off step but a part of your ongoing smart contract journey. It is about fostering the mindset that security is continuous. The smart contract developer lifecycle entails the following stages:

1. **Plan and Design**
2. **Develop and Test**
3. **Get an Audit**
4. **Deploy**
5. **Monitor and Maintain**

OWASP strongly emphasizes that embedding security considerations into all stages of your Development Lifecycle is what it takes to build a secure decentralized application, not just conducting a one time smart contract “check.” Before deploying your contract, think hard about the security measures in place and ensure to maintain and monitor your code post-deployment.

While a smart contract security audit is an absolute necessity, also ensure to plan for any contingencies post-deployment. The key takeaway here is this: Smart contract security is a crucial part of the smart contract development lifecycle and should be treated with as much care as the development of the smart contract itself.
