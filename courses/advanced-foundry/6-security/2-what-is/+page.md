---
title: What is a Smart Contract Audit?
---

_Follow along with this video._



---

When it comes to understanding the finer details of blockchain technology, smart contract auditing is of paramount importance. This audit is essentially a security-based code review with a specific timeframe laid out for your smart contract system.

## What is a Smart Contract Audit?

<img src="/auditing-intro/2-whatis/whatis1.png" alt="Auditing Image" style="width: 100%; height: auto;">

The principal goal of an auditor, in this case, is to discover as much vulnerabilities as possible, while also educating the protocol about security best practices and proficient coding techniques. This complex process involves a combination of manual reviews and automated tools for finding these vulnerabilities.

## Why is a Smart Contract Audit So Essential?

Having a better understanding of why a smart contract audit is a critical part of launching your code base onto a live blockchain will highlight its importance.

### Vulnerability to Hacks

There are countless websites that catalog the number of hacks that occur in blockchain environments, highlighting its vulnerability. In the past year alone, almost $4 billion was stolen from smart contracts, making it the year with the highest stolen value from these contracts.

This alarming statistic underscores the importance of a meticulous smart contract audit. Once a smart contract is deployed, it cannot be altered or modified - therefore, getting it correct in its initial phase is crucial.

### Adversarial Potential

A blockchain is traditionally a permissionless adversarial environment. Your protocol must be prepared to encounter and deal with malicious users. An audit can equip your developer's team with improved understanding and proficiency in code, consequently increasing their efficiency and effectiveness in implementing the required features.

Moreover, a single smart contract audit might not suffice considering the rapidly evolving nature of the digital space. Your protocol should ideally embark on a comprehensive security journey that comprises multiple audits, formal verification, competitive audits, and bug bounty programs. We'll explore these aspects in greater breadth in future blogs.

## Audit Service Providers

Several companies offer smart contract auditing services. These include but are not limited to: Trail of Bits, Consensys Diligence, OpenZeppelin, Sigma Prime, SpiritDAO, MixBytes, WatchPug Trust, and, of course, [Cyfrin](https://www.cyfrin.io/) . Additionally, a host of independent auditors also provide high-quality audit services.

## What Does a Typical Audit Look Like?

Let's dive into a typical audit process to understand how it generally plays out.

- **_Price and Timeline:_** An audit begins with figuring out the price and timeline. Protocol needs to contact auditors and discuss how long the audit will take based on scope and code complexity. Ideally, they should reach out before their code is finished to ensure the auditors have sufficient time to schedule them in.
- **_Commit Hash and Down Payment:_** Once the timeline and price are established, the protocol finalizes a start date and a final price based on a commit hash, which is a unique ID of the code base. Some auditors may request a down payment to schedule the audit.
- **_Audit commencement:_** The auditors deploy every tool in their arsenal to unearth as many vulnerabilities in the code as possible.
- **_Initial report submission:_** After the audit duration ends, auditors hand in an initial report that outlines their findings based on severity. These will be divided into High, Medium, and Low alongside Informational, Non-critical, and Gas efficiencies.
- **_Mitigation commencement:_** Post receipt of the initial report, the protocol's team has a fixed time to fix the vulnerabilities found in the initial report.
- **_Final report submission:_** The final stage entails the audit team performing a final audit exclusively on the fixes made to tackle the issues highlighted in the initial report.

## Ensuring a Successful Audit

There are a few key actions that can ensure your audit is as successful as possible:

1. Clear documentation
2. A robust test suite
3. Commented and readable code
4. Adherence to modern best practices
5. An established communication channel between developers and auditors
6. An initial video walkthrough of the code before the audit begins.

### The Importance of Collaboration

To get the best results, consider yourself and your auditors as a team. Ensure a smooth flow of communication between the developers and auditors right from the audit commencement. This way, auditors get a thorough understanding of the code, equipping them to better diagnose any vulnerabilities.

### Post Audit Considerations

Once your audit concludes, your work isn't done. Be sure to take the recommendations from your audit seriously, and remember that any change to your code base after the audit introduces unaudited code.

## What an Audit Isn't

An audit doesn't mean that your code is bug-free. An audit is a collaborative process between the protocol and the auditor to find vulnerabilities. It is essential to treat each audit as part of a continuous and evolving process - and be prepared to take immediate action if a vulnerability is discovered.

## Wrapping Up

In essence, a smart contract audit is a pivotal security journey that prepares you with best practices and security knowledge to launch your code onto a live blockchain. And of course, if you're searching for auditors, don't hesitate to reach out to the [Cyfrin](https://www.cyfrin.io/) team, and we'd be happy to assist.

Stay safe out there, and ke
