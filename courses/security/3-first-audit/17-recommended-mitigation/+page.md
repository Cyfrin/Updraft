---
title: Recommended Mitigation
---

_Follow along with this video:_



---

## The Problem

Let's start with this premise: You're creating a contract. The main aim of this contract is to store a private password that no one else can see. The contract architecture is such that it guarantees complete security by hiding this password. But imagine finding a glaring bug that breaks this promise. The truth is, maintaining your private password's security isn't a piece of cake, especially in the current architecture. The question is, how can we work around this issue?

"To be honest, this isn't an easy problem to solve. And this is where the importance of having a security mindset from day one comes into play" -_Anonymous_.

## Mitigation Starts with the Mindset

Great developers, particularly those at the helm of solidity and smart contract development, have a security-first mindset from the get-go. This means that they factor in security loops and potential threats right from the outset, ensuring that the whole system architecture leans towards security as its major prop. So what's their secret to creating hack-proof smart contracts? How do we actually mitigate such issues?

## Re-Thinking the Architecture

Let's examine this scenario: A bug in your contract deems it useless. So, the question becomes, how do we create a contract that stays strong despite all odds? Well, the overall architecture of the contract needs to be re-evaluated and restructured.

### An off-chain encryption solution?

One approach could be to encrypt the password off-chain, then store the encrypted password on-chain. This would require an additional password that the user must remember for decrypting purposes.

Take note, though, if you're considering this approach, you'll likely want to remove the view function. This prevents the user from having to send a transaction with the password that decrypts your password most of the time.

## Wrapping Up: Rethinking Security as Educators

Recommended mitigations might include specifying the code changes you want to implement. However, because an entire architectural reconstruction is required, text-format suggestions should suffice.

As security researchers, our role veers more towards being security educators. Our goal is to educate about clever methods of securing protocols to ensure forward safety and credibility. If you think you can provide a better mitigation method or strategy, I'm inviting you to contribute to the discussion and broaden our collective knowledge.

By doing so, you're helping create a future where bugs like these are a thing of the past, and each new challenge brings us one step closer to creating safer and more secure smart contracts. Let's challenge ourselves to come up with better ways to secure our future in the ever-evolving world of blockchain and smart contracts. Never forget, your contribution can make a significant difference!
