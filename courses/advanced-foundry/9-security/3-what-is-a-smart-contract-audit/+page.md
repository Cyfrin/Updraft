---
title: What is a Smart Contract Audit?
---

_Follow along with this video._

---

### What is a Smart Contract Audit?

A smart contract audit is a timeboxed, security based code review of a smart contract system.

An auditor's goal is to find as many security vulnerabilities as possible and educate the protocol on best practices moving forward in development. Auditors leverage a variety of tools and expertise to find these vulnerabilities.

**_Why is a security audit so important?_**

Well, the statistics I mentioned in the introduction speak for themselves. With billions of dollars being stolen from unaudited code, the industry can't afford _not_ to improve their security.

The immutability of the blockchain renders patching and updating frequently impossible, impractical or expensive. So having confidence in the security of your code is key.

> ❗ **IMPORTANT**
> The blockchain is a permissionless, adversarial environment, being prepared for malicious users is _integral_ to success.

An audit can actually accomplish much more than just checking for bugs. An audit can:

- Improve your developer team's understanding of code
- Improve developer speed and efficiency
- Teach the latest tooling

Often a single audit isn't even enough and protocols embark on a security journey including a number of steps like

- formal verification
- competitive audits
- Bug Bounty Programs
- Private Audits
- Mitigation Reviews

...and more.

There are lots of companies that offer Smart Contract Auditing services, such as:

[**Trail of Bits**](https://www.trailofbits.com/)

[**Consensys Diligence**](https://consensys.io/diligence/)

[**OpenZeppelin**](https://www.openzeppelin.com/security-audits)

[**Cyfrin**](https://www.cyfrin.io/)

So, what does a typical audit look like? Let's break it down into some steps.

1. Price and Timeline
   A protocol has to reach out, either before or after their code is finished, but the more notice they can provide an auditor, the better. The protocol and auditor will discuss a number of details including:

   - Code Complexity
   - Scope
     - These are the exact files/commits that will be reviewed
   - Duration
     - This is largely dependent on how much code is in scope and how complex it is.
   - Timeline

   I rough approximation of pricing and timelines is available in the [**CodeHawks Documentation**](https://docs.codehawks.com/protocol-teams-sponsors/audit-pricing-and-timelines). Note that these are rough guides, prices and timelines can range wildly and should be negotiated with the protocol in advance.

2. Commit Hash, Down Payment, Start Date

   Once an auditor receives a commit hash, a start date and price can be finalized.

   > ❗ **NOTE**
   > A commit hash is the unique ID of the codebase being audited at a particular version in time.

   Some auditors will ask for a down payment in order to schedule the audit.

3. Audit Begins

   Auditors at this stage will use all their tricks and tools to find as many vulnerabilities in the code base as possible.

4. Initial Report

   Once a review has been completed and auditor should provide an initial report detailing the vulnerabilities uncovered during the audit. These vulnerabilities are typically broken down into severity classifications:

   - Highs
   - Mediums
   - Lows
   - Informational/Non-Critical
   - Gas Efficiencies

   High/Medium/Low represents the impact and likelihood of each vulnerability.

   Informational, Gas, and Non-Critical are findings to improve the efficiency of your code, code structure. Best practice and improvement suggestions are not vulnerabilities, but ways in which the code can be improved.

5. Mitigation Begins

   At this phase the protocol team will often have an agreed upon period of time to mitigate the vulnerabilities identified in the initial report. Often much shorter than the audit itself, protocols will often be implementing the recommendations of the auditor within the received report.

6. Final Report

   Sometimes referred to as a mitigation review, the auditing team will compile a final report based on _only_ the fixes employed by the protocol team in the mitigation phase. This assures mitigations are implemented appropriately and that no _new_ bugs have found their way in.

7. Post Audit

   I highly encourage you to take the recommendations of your auditor(s) seriously, and if you make changes to your repo, that's now _un-audited code_. Once line being changed can be enough to wreck everything.

Hopefully the experience is positive for both the protocol and the auditor and they'll continue working together in the future 🥳

As I mentioned briefly, depending on the size or expected popularity of a protocol, often one audit won't be enough. Securing your code is an on going journey and just as your protocol evolves over time, so will your security needs.

Additionally, working with multiple auditors and having multiple eyes on your code can uncover even more vulnerabilities than a single review. This is one of the biggest advantages of a competitive audit platform like [**CodeHawks**](https://www.codehawks.com/).

If two heads are better than one, what are dozens or hundreds of heads capable of?

### Keys To a Successful Audit

There are a few things _you_ as a developer can do to prepare for an audit to ensure things are successful and smooth.

1. Have clear Documentation
2. Robust test suite, ideally including fuzz tests
3. Code should be commented and readable
4. Modern best practices followed
5. Established communication channel between developer and auditors
6. Do an initial video walkthrough of the code

I'll stress point 5 for a moment. The developers of a protocol are always going to have more context of a code base than an auditor will, having clear and efficient communication is important for allowing clear understanding of expected functionality and the ability to verify desired behaviour.

This clear understanding of what _should_ happen is paramount. 80% of vulnerabilities found aren't broken code, but _business logic_.

### What an audit _isn't_

An audit **_is not_** a guarantee that your code is bug free.

Security is a continuous process that is always evolving with new vulnerabilities popping up each day. When/if an exploit hits your protocol, make sure you and your auditor have that line of communication to discuss the situation quickly.

### Wrap Up

Now, we should have a much clearer idea of what a security audit is and why it's so important. An audit is a security journey end-to-end with the goal being to improve the safety of a protocol and providing developers with the knowledge and best practices to remain secure in the future.

In the next lesson we'll take a look at some of the best tools available to secure a protocol.
