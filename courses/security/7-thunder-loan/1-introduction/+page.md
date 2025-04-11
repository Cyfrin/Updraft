---
title: Introduction
---

---

### Introduction to Thunderloan

I hope you took some time to go through the fuzzing exercises from the last section, because it's only going to ramp up from here.

In Section 6: Thunder Loan we'll be doing _a lot_ of testing. Strap in!

You may as well begin by cloning the Thunder Loan repo into your project folder.

```bash
git clone https://github.com/Cyfrin/6-thunder-loan-audit.git
cd 6-thunder-loan-audit/
code .
```

**_What else will we be covering?_**

Let's go through a few of the things we'll learn, as outlined in the [**GitHub repo**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/tree/main) associated with this course.

First off we're going to dive deep into DeFi's borrowing and lending systems. The Thunder Loan protocol is based specifically off of [**Aave**](https://aave.com/) & [**Compound**](https://compound.finance/) which are two of the most significant protocols in DeFi.

We're also going to get more exposure to `Oracles` and how a protocol can leverage [**`Chainlink`**](https://chain.link) and similar services to integrate reliable price feed data in a decentralized way.

Additionally this is going to be our first mock audit of an upgradeable contract. Proxies and the like are very common in live scenarios so your experience assessing them here will be invaluable. Things we'll be covering include:

- [UUPS & Transparent](https://docs.openzeppelin.com/contracts/4.x/api/proxy)
- [Multi-facet Proxy (Diamond)](https://eips.ethereum.org/EIPS/eip-2535)
- [Foundry Proxies & Upgrades](https://github.com/Cyfrin/foundry-upgrades-f23)
- [What are upgradeable smart contracts?](https://www.youtube.com/watch?v=bdXJmWajZRY)

We'll also be learning a bunch of new tooling such as:

- [**Upgradehub**](https://upgradehub.xyz/) - Allows you to view a history of changes during upgrades by entering a contract address - very cool!

Last but not least, we're going to get our hands dirty with `flash loans`, a hot topic in DeFi. We'll learn how they work, what powers them and the types of exploits they enable.

From the perspective of DeFi, this is section on Thunder Loan is going to be one of **_the most important_** in the whole course. The knowledge you take away from here will be directly applicable to real world security reviews, preparing you for larger and more complex code bases.

Before we dive into the review, remember the `audit-data` branch of this section's GitHub repo serves as an 'answer key', if you get stuck you can always refer to this branch for clues.

> **Note:** As always, there may be bugs in these code bases that we don't cover, feel free to write your own findings for these as well!

Let's get started.
