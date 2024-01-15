---
title: The Audit (Security Review Process)
---

_Follow along with this video:_

---

When developing smart contracts, understanding and following the audit process is a crucial step towards achieving a more secure protocol. Here, we'll outline an example of this process.

## High-Level Overview of The Audit Process

The smart contract audit process can be briefly summed up in these steps:

1. **Get Context**: Understand the project, its purpose and its unique aspects.
2. **Use Tools**: Employ relevant tools to scan and analyze the codebase.
3. **Manual Reviews**: Make a personal review of the code and spot out unusual or vulnerable code.
4. **Write a Report**: Document all findings and recommendations for the development team.

To illustrate how this pans out in reality, we can look at the Tincho method used to audit ENS – a process that landed him a cool $100,000 payout! We'll delve into this later on.

## Breakdown of the Audit Process

For a more detailed perspective, let’s consider the process as broken into three distinct phases:

**Initial Review:** The initial review of a protocol can also be broken down into 4 distinct phases.

- Scoping - This is getting a sense of the protocol. In this phase, auditors go through the code to scope it. This gives an idea of how much time might be required for the audit, which can then be used to establish pricing. Key tasks include identification of all the contract’s dependencies and a general overview of the code. At this stage, auditors don’t dig deep into anything yet.
- Reconnaissance - Here an auditor starts walking through the code, running tools, interacting with the protocol in an effort to break it.
- Vulnerability Identification - An auditor determines which vulnerabilities are present and how they're exploited as well as mitigation.
- Reporting - Compile a report detailing all of the identified vulnerabilities and recommendations to make the protocol more secure.

> "Your job is to do whatever it takes to make the protocol more secure."

**Protocol Fixes:** At this stage the protocol will take an auditor's report and work towards implementing suggested changes and mitigation. The length of time of this period can vary based on complexity of the issues, number of vulnerabilities identified and more.

**Mitigation Review:** Once a protocol has employed and tested all of the recommended fixes, a review is conducted with a focus on verifying that previously reported vulnerabilities have been resolved.

Your ultimate aim should be to make the protocol more secure. Therefore, ensure to take notes of all findings and steps and elaborate it in your report.

> Difference in Audit Types: Note that the aforementioned process details a private audit or a traditional security review. For competitive audits, you are typically optimized for time and identifying as many high vulnerabilities as possible.

Remember, the goal of conducting contract audits isn't simply to tick a box. It's about ensuring the security and smooth running of the smart contract at all stages of its lifecycle. The more audits you conduct, the better you become at identifying potential security issues.

<div style="text-align:center">
<img src="../../../../static/security-section-2/2-the-audit/the-audit1.png" style="width: 75%; height: auto;">
</div>

## Embedding Security Audits in Development Lifecycle

The process of developing a smart contract follows a lifecycle too. According to the [OWASP](https://www.owasp.org/index.php/Main_Page) (The Open Web Application Security Project) guide, security isn't just a one-off step but a part of your ongoing smart contract journey. It is about fostering the mindset that security is continuous. The smart contract developer lifecycle entails the following stages:

1. **Plan and Design**
2. **Develop and Test**
3. **Get an Audit**
4. **Deploy**
5. **Monitor and Maintain**

OWASP strongly emphasizes that embedding security considerations into all stages of your Development Lifecycle is what it takes to build a secure decentralized application, not just conducting a one time smart contract “check.” Before deploying your contract, think hard about the security measures in place and ensure to maintain and monitor your code post-deployment.

While a smart contract security audit is an absolute necessity, also ensure to plan for any contingencies post-deployment. The key takeaway here is this: Smart contract security is a crucial part of the smart contract development lifecycle and should be treated with as much care as the development of the smart contract itself.
