---
title: Recap II
---

_Follow along with this video:_\


<iframe width="560" height="315" src="https://www.youtube.com/embed/hSSIhPgc4aA?si=WIvR7u6ZFa-lYW8j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unfolding Blockchain Security Issues: A Deep Dive into our latest Smart Contract Audit

Eager to gain insights into the world of blockchain security? Today, we'll examine three potential security vulnerabilities we discovered during one of our recent smart contract security audits. These vulnerabilities lay at the heart of access control with implications that could strike at the very essence of blockchain privacy.

## Vulnerability 1: Access Control Issues

First and foremost, we must start with access control — a critical security factor. Here, the most concerning problem we identified concerns the setting of a password.

**Access control should ensure that only the owner of the contract can set the password. However, during our audit, we found that the security mechanism missed a critical check.**

To simplify the concept, the access control should look like this:

```javascript
if (msg.sender !== s_owner) {
    revert("Not owner");
}
```

This logic check denotes that if the message sender doesn’t match the owner, then the system should revert or rollback any change, ensuring that only the correct owner can modify the password. Unfortunately, this check was missing in the audited contract, resulting in a major security lapse.

<img src="../../../../../static/security-section-3/11-recap-ii/recapii-1.png" style="width: 100%; height: auto;">


## Vulnerability 2: Erroneous Parameter

The second issue found during the audit is as seemingly insignificant as an erroneous parameter. While an erroneous parameter might seem harmless, it can lead to function misbehavior, cause inconsistencies, and eventually, weaken the security of the contract.

Although less conspicuously problematic than the missing ownership check, an erroneous parameter has potential for misuse and exploits.

## Vulnerability 3: On-chain Password Storage

Last but definitely not least, we noticed that the application stored passwords on-chain. This is a major security concern as **all data on chain is public information**. Therefore, storing passwords, or any sensitive information for that matter, on-chain exposes them to public view, compromising the so-called private information.


> *Remember, data stored on-chain equals to public information. Keeping passwords or any private data secure means that they must be off-chain.*

## Preliminary Audit Findings: Three Potential Vulnerabilities

To sum up our audit findings, we discovered three potential vulnerabilities: A missing ownership check, an erroneous parameter that could lead to future exploits and breach, and, most alarmingly, the practice of storing passwords on-chain.

These could be catastrophic if not addressed in time. However, the severity of these issues is yet to be assessed, which brings us to the next phase of our audit.

We hope to bring you more interesting insights from the audit trail once the severity of these potential vulnerabilities is gauged. So, congratulations to us and our eagle-eyed audit team. With our findings, we can contribute significantly to making the protocol safer.

Great work, indeed! Let us continue to uncover potential threats and fortify the world of blockchain one step at a time. Here's looking forward to safer and secure smart contracts for everyone in the blockchain community! Stay tuned for further updates on these security vulnerabilities.

