---
title: Recap
---

_Follow along with the video lesson:_

---

### Recap

Whew, this feels really good. We've learnt a tonne and you should feel incredibly proud of what you've accomplished (especially those last two write ups you did on your own! 😐). After the next section, I want you to go to [**CodeHawks**](https://www.codehawks.com/) and participate in a competitive audit. Full Stop. You'll have the skills to start applying what you've learnt and begin building real world experience. You need to take that step.

### Pause

Before we recap things, I see I overlooked a tool that could be valuable. Boss Bridge didn't really demonstrate the differences between chains due to the L2 side being out of scope, but it's important to know that different chains _do_ often behave differently.

[**evmdiff**](https://www.evmdiff.com/) Allows you to directly compare two chains and clearly identify their differences. For example, Arbitrum One has a number of additional precompiles that aren't present on Ethereum:

![recap1](/security-section-7/31-recap1/recap1.png)

Another common difference between chains is op code support - Arbitrum, until recently, didn't support the PUSH0 op code!

Use this tool in your security reviews and you'll be better prepared to identify issues which arise as a product of chain incompatibility. Now back to our regularly scheduled programming...

### Unpause

Ok, let's quickly recap all the topics we covered in this section.

To start, we were introduced to even more tooling to assist in our security reviews. Tools such as:

- evmdiff (😉): a powerful browser based tool for comparing the details and compatibilities of different blockchains.
- AI: We didn't explicitly cover using AI, but AI is pretty pervasive in the space these days. Find a model you like, ChatGPT, Phind, Claude - you should be using AI.
- [**"The Hans" Checklist**](https://solodit.xyz/checklist): a systematic approach to security reviews whereby a literal exhaustive checklist is applied to a protocol, to leave no stone unturned. Check it out on [**Solodit**](https://solodit.xyz/).

We learnt about precompiles, like `ecrecover` and the part it plays in the signing of transactions. We saw through our [**Polygon case study**](https://www.youtube.com/watch?v=QdIG7TfjUiM) the potentially disastrous effects of overlooking precompiles and how a white hat profited $2.2 million for finding the bug.

In addition to this we dove deep into signatures, how they work and the vulnerabilities possible such as `Signature Replay Attacks`. We learnt the importance of restricting the use of signatures put on chain through a `nonce` or `deadline` to protect against their repeated use.

We learnt that different blockchain are different! Surprising, I know! `EVM Equivalency` is not `EVM Compatibility`. We outlined a [**case study**](https://medium.com/coinmonks/gemstoneido-contract-stuck-with-921-eth-an-analysis-of-why-transfer-does-not-work-on-zksync-era-d5a01807227d) where overlooking this on zkSync resulted in 921 ETH being stuck because `transfer()` wouldn't work!

And, in the process we identified a bunch of new vulnerabilities like `gas bombs`, `unlimited minting`, `centralization` and the risks of `arbitrary code`. We learnt **a lot**.

One thing we didn't cover with as much depth was the actual writing of the findings. This is very much intentional. I'm trying to wean you off the hand holding so that you're able to perform reviews solo, confident in your ability to spot all these new exploits in your repertoire.

Another thing we actually didn't cover is the myriad of specific example of bridge hacks that have occurred. Hacks like `Ronin`, `Poly Network`, `Nomad`, `Wormhole` - these are $100 Million + hacks. I highly encourage you to familiarize yourself with them, though to be frank - most of them boil down to: **_Centralization is bad_**.

### Wrap Up

Whew, another section down. Again - be proud, take a break, pat yourself on the back. You've earned it.

In the next lesson I'll have some additional exercises for you to test your skills with before moving onto the next and final section of this course [**`MEV & Governance`**](https://updraft.cyfrin.io/courses/security/mev-and-governance/introduction).

Let's Gooooo! 🚀
