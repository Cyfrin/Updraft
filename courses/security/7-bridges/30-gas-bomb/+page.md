---
title: Exploit: Gas Bomb
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/lbzFcqkO0oA?si=T4N3fY9T_ya11g2t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Demystifying Gas Bomb and Other Blockchain Vulnerabilities

The world of blockchain is buzzing with fascinating features and vulnerabilities. One such intriguing element I'd like to shed some light on is the phenomena known as the gas bomb. This seemingly complex occurrence has sparked much debate, and I hope this post will provide you with some clarity on what exactly it is, how it works, and the kind of impact it can have.

## What is a Gas Bomb Anyway?

A gas bomb in blockchain terms is a low-level call where Solidity, the smart contract programming language, and the Ethereum Virtual Machine (EVM), the runtime environment, struggle to estimate the amount of computational effort (gas) needed to execute certain transactions.

![](https://cdn.videotap.com/ffmuYOJbZ3iqYxllhGBD-5.94.png)

> **Note**: Gas refers to the computational effort required to execute an operation in the Ethereum network.

A malicious user can exploit this to trick the network into allocating absurd amounts of gas, and thereby charging other network participants excessively to execute a function.

## Understanding the Implications

What's interesting about gas bombs is how they're used in the network. For instance, while some users might employ this method to gain profits, others seem to have darker motivations. Often, these users utilise this exploit for seemingly no tangible benefits. Their motivations? To disrupt the system and cause chaos.

> "Some people just want to watch the world burn."

It's a poignant phrase that well encapsulates the mentality of these malicious actors. They create chaos without expecting any monetary gain in return. Their goal isn’t to profit, but simply to disrupt the system - no rhyme, no reason, just pure anarchy.

![](https://cdn.videotap.com/l0jIWaD8hhNflUJypCfy-22.29.png)

## Ready To Dive Deep?

If by now, you're wrapped in a whirlwind of questions, I'm glad! Because what's learning without a little bit of challenge? But, if you're wondering what the hoo-ha I am talking about, now would be a good time to pause and take a breather.

I encourage you to delve in, try to construct the proof of code for the vulnerabilities we discussed, and even to try your hand at crafting your gas bombs.

To get started, consider:

1. Studying the structure of a low-level call in Solidity and the EVM,
2. Understanding the significance of gas in the Ethereum network,
3. Exploring how it's possible for the network to be fooled into allocating excess gas,
4. Unveiling the motivations of malicious actors, and
5. Learning how to protect yourself against such exploits.

To aid you in your quest, I've left a plethora of resources and exciting ensemble of ideas for you to navigate through in our [GitHub repo](https://github.com/Cyfrin/security-and-auditing-full-course-s23).

![](https://cdn.videotap.com/IqGVeU9yKyYfHHDeOCnY-41.6.png)

## Never Stop Learning

Now, we've been walking through these attacks, learning about them, discussing many proofs of code, and a lot of low-level calls. Remember, we are only at the beginning of our journey. Similar to any other journey you undertake, remember that what matters is your perseverance.

> "Pretty soon, you're going to need to start jogging or running."

The world of Blockchain is massive and ever-evolving. As we make our way through, be ready to pick up speed and adrenaline, from a casual amble to a determined sprint. I hope you are as excited as I am to continue this journey. Let's learn, explore, and grow together.
