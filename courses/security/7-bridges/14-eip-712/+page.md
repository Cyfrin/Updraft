---
title: EIP-712
---



---

# Untangling the Beauty of Smart Contracts: A Dive Into EIP 712 Structured Data

Smart contracts have revolutionized the way we do transactions and communicate data in the blockchain arena. At the crux of it all lies `MessageHashUtils`, a fundamental tool that greatly simplifies our interactions with these contracts. In this post, we'll take a closer look at the EIP 712 and EIP 191 hash functions, and demonstrate their implementation in an actual contract.

Remember, smart contracts and untangling their complexities might feel intimidating, but once you get the hang of it, it's an engaging puzzle worth solving. So let's get started!

## Breaking Down EIP 712 and EIP 191

Introducing, the **EIP 712** and **EIP 191**! These are hashing and signing standards for Ethereum smart contracts, making the signing process easier for users.

Before these standards, users were just told 'hey, sign this message,' and a cryptic byte string was shown. With the advent of EIP 712, Ethereum made user experience way better with formatted requests: 'hey, sign this message: from, to, contents'.

Are you a fan of typed, structured data instead of just byte strings? Well, EIP 712 is perfect for you!

For those who want to do a deep dive, you can read more about the implementation of EIP 712 and EIP 191 [here](https://eips.ethereum.org/EIPS/eip-712) and [here](https://eips.ethereum.org/EIPS/eip-191) respectively.

![](https://cdn.videotap.com/Q9EBgPOu5axhNmcCfrNw-49.3.png)

## Working with EIP 712: An Example

To illustrate how to work with EIP 712, let's look at a simple example. We've defined a struct `Mail`, with struct `Person`(from, to) and string contents. This is our structured data. After this, we can break the signed message into its essential components - `V`, `R`, and `S`, and verify this signed data using the `verify` function from the EIP 712 hashing contract (refer to the [github repo](https://github.com/Cyfrin/security-and-auditing-full-course-s23)).

![](https://cdn.videotap.com/3vXpOBtPGNOYDzTe7xew-92.43.png)

## Verifying the Magic: EIP 712 Verification

Now that we've signed the data, how do we verify it?

The `ECRRecover` function of Solidity comes in handy here. The function hashes the data into a format called a 'digest'. The `ECRRecover` then checks whether the 'from' component of the message is correct using specific input parameters.

> Don't miss out on learning more about how important `ecrecover` is by checking out the Solidity documentation [here](https://docs.soliditylang.org/en/v0.8.23/smtchecker.html#function-calls).

NOTES

1. The digest is essentially the hashed data put into a specific format.
2. Breaking the signed message into `V`, `R`, `S` components forms the input for `ecrecover`.

You can explore a bit more about this part with a practical example in the `Example.sol` contract in the course's GitHub repository.

![](https://cdn.videotap.com/3Bx9eDqrngeXdafn4LDv-197.19.png)

## Let's Watch a Mistake: Polygon Case Study

Ordinarily, low-level signature signing seems like a tedious task. But here's an interesting case study on how forgetting to double-check a precompiled `ECRRecover` function return value led to an exploitable vulnerability on Polygon...

![](https://cdn.videotap.com/BjhKxp4Deaz9YZi3bwyj-215.68.png)

## Wrapping Up

So that's a quick run-through on `EIP 712` and `EIP 191`, two important specifications that make handling and signing Ethereum smart contracts a breeze. Though it might seem a little complex, with a bit of practice, you'll find it's not so scary after all! Don't forget to check out the next part where we dive into a Polygon case study. Happy coding!
