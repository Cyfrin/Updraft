---
title: DoS - Case Study
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/vdmyrRdE8Xw" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Understanding Denial of Service (DoS) Attacks in the Wild of Security Protocols

Denial of Service (DoS) attacks presents a legitimate issue that often victimizes numerous security protocols. In this blog post, we delve into two different kinds of **Denial of Service Attacks** or simply **DoS attacks** as they materialize from real security reviews of real protocols. Owen, the founder of Guardian Audits, will share insights from his work, showing us how these vulnerabilities arise and the best frameworks to uncover them.

## Who's Talking?

A brief intro for context: my name is Owen, and about two years ago, I founded Guardian Audits. Since then, our team has carried out scores of security reviews, with hundreds of smart contracts undergoing scrutiny for these audits. Over this period, we have unearthed well over 100 high-impact bugs and vulnerabilities in DeFi smart contract systems. We’ll be unpacking some of our findings related to DoS attacks and their ramifications.

The ultimate goal is to equip you with the knowledge and tools you need to sidestep these potholes in your own security evaluations or when writing your solidity code, whether you're conducting a contest, private security review, or just a protocol developer interested in security.

## Case Study 1: DoS Vulnerabilities in the Bridges Exchange

The first DoS vulnerability we'll touch on is found in the dividends distribution system of the Bridges exchange.

### Attack Mechanics

The issue arises from an unbounded for loop in the `distributeDividends` function, resulting in the risk of a DoS attack. An ill-intentioned party can cause the distribute dividends function to violate the block gas limit, effectively blocking all dividends by continually generating new addresses and minting minimal quantities of the Bridges pair token.

The `distributeDividends` function can be found in the Bridges pair contract under line 221. As its name suggests, an unbounded for loop allows for indefinite iterations of this for-loop. If there are sufficient iterations, the gas used will exceed what can be executed within the block gas limit, making it impossible to execute the transaction that distributes dividends.

### Confirming the 'Unbounded' For Loop

To confirm that this users' list is, indeed, unbounded, we should inspect all instances where the users' list is used. If you examine the `mint` function, there are no constraints. The only prerequisite is that the balance of two is zero – a situation that an attacker can easily configure. This allows an attacker to call the `mint` function several times from different addresses, adding multiple different addresses to this list, ultimately making the list too long to iterate over.

### Mitigation and Remediation

In such a case, executing the distribute dividends function exceeds the block gas limit, freezing the functionality of dividend distribution - classic DoS. The best way to rectify this vulnerability is to revamp the approach or design of distributing dividends. For example, the Bridges team migrated to a dividends-per-share model, simplifying the process and circumventing the issue.

## Case Study 2: Dos Attack in GMX V2 System

The second instance of a DoS attack shows up in the GMX V2 system and is entirely different than the Bridges case mentioned above.

### Attack Mechanics

The problem arises from a boolean indicator called `shouldUnwrapNativeToken`. This flag can be leveraged to set up positions that can't be reduced by liquidations or ADL orders. When the native token unwraps (with the flag set to true), a position can be formed by a contract that can't receive the native token. This leads to order execution reverting, causing a crucial function of the protocol to become unexecutable.

### Understanding the Flow

In order to comprehend this, consider the `decreaseOrderutils processOrder` function. This function is responsible for executing liquidations, a process that needs to proceed in order for the protocol to operate flawlessly. If we trace logic flow through the function, it eventually calls the `transferOut` function, which in turn can lead to the `transferOutNativeToken` function if the token to transfer out is the wrapped native token.

This function then calls the `withdrawAndSendNativeToken` function, leading down a rabbit hole of functions until we reach the `transferNativeToken` function. If successful, the native tokens are successfully transferred. However, if this external call fails due to the receiver contract being unable to accept the ether, the result is an error called `nativeTokenTransferError`.

### Cases Leading to Failure

There are other conditions that could result in failure, triggering this error and causing a Dos attack. These could include:

- The receiver is a contract that can't accept ether;
- The receiver contract requires more gas than the gas limit to execute its function;
- The receiver contract maliciously reverts on purpose.

To mitigate this type of Dos attack, the GMX team could specify the `shouldUnwrapNativeToken` to false so that transfers happen using wrapped ERC20 tokens which do not risk calling third-party addresses. Alternatively, they could rewrap the token and send it back in the event of failed transfer, an approach that they eventually adopted.

## Unmasking Denial of Service Attacks

To wind up, here are a couple of frameworks to help uncover these DoS attacks when navigating through a code base:

1. **For-Loops**: Take extra caution with for-loops. Ask yourself these questions:
   - Is the iterable entity bounded by size?
   - Can a user append arbitrary items to the list?
   - How much does it cost the user to do so?
2. **External calls**: These can be anything from transferring ether to calling a third-party contract. Evaluate ways these external calls could fail, leading to an incomplete transaction.

DoS attacks can arise from multiple sources and don't boil down to a single root cause. Whether it's caused by an external call failure or an unbounded for-loop, the end result is that a transaction is prevented from being executed when it is essential.

It is the hope that these frameworks serve you well in future security reviews or development endeavors.
