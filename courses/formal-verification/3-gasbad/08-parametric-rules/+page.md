---
title: parametric rules
---

## Exploring the Power of Parametric Rules in Smart Contract Development

In the realm of smart contract development, the ability to create flexible and adaptive systems is vital. The concept of parametric rules opens up a world of possibilities in this space, allowing developers to craft rules that respond dynamically to various method calls and states. Today, we're delving into the fascinating tutorial of parametric rules – an advanced, yet incredibly potent, feature in the toolkit of smart contract developers.

### The Essence of Parametric Rules

At its core, a parametric rule is a construct that invokes a method in an ambiguous manner. This could mean employing a method variable or an overloaded function name to achieve the desired flexibility. When you create a parametric rule, the system is empowered to generate separate reports for each possible version of the method’s instantiation. To put it simply, this refers to rules encompassing undefined method variables. Let’s break this down further.

Consider a typical sanity check rule in smart contracts – it verifies that fundamental invariants or properties hold true before and after transactions occur. Now, imagine this regular sanity rule transforms by integrating an undefined method variable. Voilà! It becomes what we know as a parametric rule.

### What Makes a Method Parametric?

By introducing this `method f`, the doors to calling any function, with any selector, and with any conceivable set of parameters, are flung wide open. This flexibility offers smart contract developers a tool with unparalleled power and adaptability.

### From Theory to Practice

The beauty of these parametric rules lies in their practical applications. Let’s consider a real-world scenario in the context of token supply within a contract:

By stating that there must be no alteration to the `totalSupply`, you are creating a rule that applies to any arbitrary method denoted by `f`. This holds the potential to act as an invariant check, ensuring that regardless of which method is invoked, the `totalSupply` remains constant. Of course, in systems like ERC-721 tokens with mint functions, this rule is bound to fail, as minting inherently changes the total supply.

### Testing the Rule's Strength

The next step is to put our parametric rule to the test. By doing so, we're affirming the smart contract's robustness – it should maintain the `totalSupply` no matter the state it's in or the function it executes. When this test is conducted, and it predictably fails, it highlights the specific methods that violate the rule.

In the case of an NFT smart contract, methods like `mint` or `transferFrom` will alter the total supply, thereby failing the test. While it demonstrates a rule violation, it also emphasizes the rule's ability to comprehensively evaluate various methods under different contract conditions.

### A Peek Under the Hood of Parametric Rules

What's unique here is that the failure of the rule isn't just an end, but rather a starting point. It offers an insight into the contract's behavior under various operations. For instance, upon failure, if you observe that the `safeTransferFrom` method is one of the culprits, you may uncover nested contract calls that lead to changes in the total supply.

Such discoveries are invaluable as they unravel the nuanced interactions within the contract's ecosystem, proving the unmistakable power of parametric rules.

### Concluding Thoughts

As we wrap up our deep dive into parametric rules, it's clear that they serve more than just as a feature of smart contract development. They are an embodiment of flexibility, strength, and adaptability within the code. With each function call, whether it’s a direct behavior or an unintended side effect, parametric rules open our eyes to the multifaceted outcomes of our codes. Exploring their capabilities is not just about enforcing invariants but about pushing the boundaries of what our smart contracts can endure and how they behave in the chaotic, unforeseen states of the blockchain world.

This exploration into parametric rules is a clear indicator of the advances in smart contract development, paving the way for developers to gain more profound insights and create more robust applications. As the field evolves, so does our understanding – and parametric rules are at the forefront of this evolution, as both a tool and a tutor in the world of blockchain technology.
