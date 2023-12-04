---
title: Signatures Recap
---



---

# Understanding the Magic of Digital Signatures and Blockchain: A Simple Tutorial

Welcome back, fellow blockchain enthusiasts. We've covered a lot in our past discussions, and this post will focus on one of the most fundamental aspects of blockchain technology: digital signatures. By the end of this read, you'd be able to comprehend how digital signatures work and how they are minted using Elliptical Curve Digital Signature Algorithm (ECDSA). Don't worry! We've broken it down into the simplest terms possible.

## How Digital Signatures Work

Digital signatures underpin the integrity and security of transactions within a blockchain ecosystem. These contrivances act as a proof of authenticity, confirming that the message has been sent by a verified sender and has not been tampered with, during transmission.

![](https://cdn.videotap.com/jSSntLnGkMJPWVtSFsUs-6.19.png)Here's a simplified snapshot of the digital signature process:

1. Your Private Key + the Message &gt; **ECDSA** &gt; Output (r,s values) = Signature
2. Signature + Original Message &gt; **ECDSA Verification** &gt; Sender's Public Key

### Elliptical Curve Digital Signature Algorithm

The core of creating a digital signature is an intelligent mathematical process known as the Elliptical Curve Digital Signature Algorithm, or ECDSA. Essentially, you take the private key and the message and feed them into this algorithm.

This operation generates a signature in a specific format, often referred to as _r_ and _s_- the crucial parts of your digital signature. These signatures are safe to put on-chain as they do not contain any public information.

### Verifying The Signature

How can we ensure that the message was indeed signed off by the claimed sender? Verification is the process that answers this question.

You take the signed message plus the reported _r_ and _s_ values and plug them into the verifying component of the ECDSA. Adding the data they supposedly signed results in the output, which is essentially the signatory of the message.

This verifying component is known as an `ECR precompile`, a part of the elliptical curve digital signature mechanism.

The magic happens when `ECR precompile` outputs the same person you expect to have signed the message. If it does, then voila! It's an honest transaction, and that's precisely what we want to achieve.

> "In the world of cryptography and digital transactions, your signature is the cornerstone of credibility."

## Wrapping Up

In summary, a digital signature is akin to your digital fingerprint. With ECDSA's wizardry, a simple, unique combination of values (comprising of a private key, a message and the _r,s_ values) embodies your authority and ensures the authenticity of transactions. Understanding these fundamentals of how signing and verification work is integral to mastering blockchain technology.

Onwards, to a more secure and transparent future.
