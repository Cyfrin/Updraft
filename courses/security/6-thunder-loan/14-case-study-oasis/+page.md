---
title: Centralization Case Study - Oasis
---

_Follow along with this video:_

---

### Case Study: Oasis

In the last lesson, we briefly discussed centralization as a protocol vulnerability and the impacts it may have. Now, we're going to look at a very recent case study featuring the Oasis protocol.

There's an incredible article detailing the situation [**here**](https://medium.com/@observer1/uk-court-ordered-oasis-to-exploit-own-security-flaw-to-recover-120k-weth-stolen-in-wormhole-hack-fcadc439ca9d) that I encourage you to read through for context and a better understanding of the circumstances involved.

So, what happened?

Oasis.app is a system that allows users to lend and borrow assets on the Maker protocol. They touted themselves as decentralized and permissionless - but this wasn't really the case.

In February 2022, the Wormhole bridge experienced a hack resulting in the loss of ~120,000 ETH. As is often the case, these funds are transferred betweens systems and protocols often in an attempt at obscuring their connection to the hacker. At one point, the hacker, deposited these funds into Oasis.app and left themselves open to counter-exploit.

Oasis, importantly functions on a 4 of 12 multisig upgradeable proxy and with 4 signatures, could change the protocol in any way they wanted. In 2023, a UK High Court ordered Oasis to exploit this upgradeability to close the hacker's vaults and reclaim the stolen funds.

In a decentralized, permissionless ecosystem, this shouldn't be possible! Oasis was ordered to exploit itself in order to retrieve stolen crypto!

### Wrap Up

The above circumstance certainly seems bittersweet. On the plus side - hacked funds were recovered, this is obviously a good thing. Negatively, however, the lack of decentralization is terrifying. The whole system was still built on trust and Web3 should strive to be trustless!

What would have happened if the Oasis team had been malicious? We don't even need to wonder, because it happens all the time. We've got to stop it.

Let's continue our review of Thunder Loan in the next lesson.

You have heard before about cyber thefts. But have you heard of one where hackers end up having the tables turned on them? This exactly happened earlier this year in the world of digital asset lending and borrowing. It's a rollercoaster of a story that involves smart contracts, the UK courts, and a protocol called Oasis. The protocol, incidentally, had projected itself as decentralized and permissionless, but ended up playing an ironic role. Let's dig in.

## Oasis and Its Security Meltdown

Oasis is a digital platform that allows users to lend and borrow assets on the Maker protocol. The exciting - and somewhat controversial - thing about it was its selling point as a decentralized and permissionless platform. In other words, there was no need for central intermediaries, fuss over permissions, or concerns about third-party interventions.

![](https://cdn.videotap.com/TrlvVL07HW0fU9JmwRSw-26.17.png)

All well and good until one day when a hacker sneaked in and made off with a sizeable amount of money - exactly 120K wrapped ether. Placing his stolen money in the Oasis application, the hacker probably felt quite pleased with himself. However, he didn't count on the steps that the victims of this hack would take next.

## Hacking Back the Hackers

Understandably angered, the victims - who had substantial money sitting in the said protocol - turned to security researchers for assistance. The question was straightforward: Could a forced smart contract upgrade retrieve the stolen loot? To their relief, the answer was also straightforward: Yes.

So next, they went to court armed with this new knowledge of an exploit in the Oasis' codebase. Their request was straightforward: Force the team behind Oasis to upgrade the protocol and utilize the exploit to match the hacker's play. Sounds wild, right? But it didn't just end there.

## A Court-Ordered Exploit

The court agreed with these victims and ordered Oasis - yes, the same Oasis that professed decentralization and permissionless transactions - to upgrade their protocol and exploit their own security flaw. The objective was clear: retrieve the hacked funds, which, in essence, was hacking the hacker.

> "The whole saga entailed coordination between the Oasis' founding team and the wormhole developer from Jump Crypto, the trading firm that had lost their money in the first place." - Extract from Blockworks Research Article.

This was possible only because Oasis’s protocol wasn't truly decentralized or censorship-resistant. Had it been so, this court-ordered exploit couldn't have happened at all.

## The Conundrum of Centralization

So was this a happy ending? Not everyone agrees. Yes, the stolen funds were recovered, but the image of Oasis as a truly decentralized platform took a hit. It revealed centralization risks creating a shift in how users see and interact with these types of platforms, as, generally, they are under the impression of these protocols being completely decentralized. As security researchers, we need to address such misleading aspects.

Perhaps the takeaway from this episode is the importance of awareness and the possible loop-holes that may exist even in the most secure looking digital assets systems, and also that, despite the convenience and freedom, decentralized platforms can pose, there are hidden pitfalls.

So the next time you're looking into using a new system or protocol, remember the story of the Oasis Protocol Hack Recovery. Not every 'decentralized' platform is truly what it claims to be. Be sure to read the information given, especially when it comes to security and understand the risks before committing your digital or physical assets. Be aware, and make a well-informed decision.

Stay safe!
