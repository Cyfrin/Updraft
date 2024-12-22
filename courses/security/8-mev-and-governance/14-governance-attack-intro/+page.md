---
title: Governance Attack - Introduction
---

_Follow along with this video:_

---

### Governance Attack - Introduction

For this one, we're joined by [Juliette](https://twitter.com/_juliettech) for a walkthrough of governance attacks from a high level.

The final boss Vault Guardians protocol is actually controlled by a DAO (Decentralized Autonomous Organization). This means we should be aware of potential vulnerabilities that may derive from governance in Web3.

### What is a Governance Attack?

`Governance attacks` are typically made through a governance proposal, generally with the intent of draining the protocol's liquidity.

This is in contrast to many other exploits where the mechanism of attack is more directly related to cryptography, or bugs in the code.

There are different types of Governance, such as:

- **Token Voting** - 1 token == 1 vote
- **allowlist** - 1 address == X votes
- **multisig** - X addresses
- **quadraticVoting** - # of people > # votes

A `governance attack` is then malicious action that is taken which exploits or leverages one of these `governance mechanisms`.

### How do Governance Attacks Work?

At first glance the steps of a `governance attack` seem pretty silly.

1. A malicious actor publishes a proposal which contains an action
   - this action could be any number of things from changing allow list addresses, to transferring tokens, code base changes etc
2. The Proposal is approved
   - this can be achieved by acquiring more voting power than is needed to pass the proposal, social engineering, or obfuscating what the proposed change is actually doing
3. The action is executed
4. The attack completed/funds stolen

You're encouraged to look into the cases of Yam Finance and Build.Finance for some eye opening examples of `governance attacks` in the wild.

### How do we Prevent Governance Attacks?

There are a few ways to mitigate the effects of governance attacks, but at their core, they're really a _`people's problem`_. Some ways to defend against these attacks may include:

- **Centralization of Power** - while not ideal in a Web3 ecosystem, this _does_ solve the issue of control being democratically wielded through `voting mechanisms`.

- **Strategic Voting Power Distribution** - think carefully about who holds the most power over protocol `governance`, by strategic in assuring voting power is allotted to those invested and not made available to anyone with a flash loan

- **Guardian Buffer** - while this also sacrifices a degree of decentrality, this is an entity which serves as a buffer to vet proposals for malicious actions and assure pursued proposals are financially viable for the organization. This protects against `governance attacks` by filtering malicious proposals before they reach the voting stage

- **Gradual Decentralization** - Slowly opening up control allows a protocol to become better established in self management

- **Emergency Plan** - Emergency functionality or operating procedures should be in place. Knowing how to deal with emergency situations before they happen is the difference between putting out a stove fire and your house burning down

### Wrap Up

Thank you `Juliette`! We should all feel better prepared to spot and defend against `governance style attacks` in the future!

In the next lesson we'll deep dive into a `governance attack` case study with the `Beanstalk Protocol`.
