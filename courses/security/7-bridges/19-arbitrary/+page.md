---
title: Exploit - Arbitrary "from" allows users to steal tokens
---



---

# Nail-biting Moments with Slither: Uncovering Critical ERC20 Vulnerabilities

Hey You! Welcome back! In this post, we'll dig into the enlightening world of Slither, our good friend from [Trail of Bits](https://trailofbits.com/). It is well-equipped to unearth potential code vulnerabilities, and guess what, we've stumbled upon a dicey one! Exciting, right? Buckle up, let's dive in.

## The Problem Unveil

So, revisiting where we left off, we managed to arrive at a critical point at our function with the help of Slither. Quite the Sherlock, isn't it? Well, let me just relay the discovered issue. We discovered the issue with the 'bossbridge deposit tokens to l2' which utilizes 'arbitrary from in transfer from'. Sounds gibberish, right? Let's decode it.

The issue pops up when a detection is made that "message sender" is not used in 'from in transfer from'. Don't worry, I will walk you through an exploit scenario for clarity (You wouldn't feel good if we don't decode it, and you know it!).

## The Exploit Scenario

Consider our characters, Alice and Bob. Alice approves her ERC20 tokens to be spent by the contract. Enter a malicious entity, Bob, who utilizes this opportunity to call on the contract and set Alice's address as the '`from`' parameter in 'transfer from'.

Can you guess what happens next?

> 'Bob takes off with Alice's hard-earned tokens owing to the contract permission established by Alice.'

Pretty severe, isn't it? This just started becoming more interesting than an Agatha Christie novel!

## The Vulnerability In-Depth

Let's try to visualize this scenario. We have Alice, setting off to perform a transaction after calling '`approve of token to bridge`.' Bob, the opportunist, notices this and decides to make his move. He calls '`depositTokensToL2`', all the while using Alice's address for the '`L2`' recipient, which would now be Bob himself. He sets the amount as all her money (sounds like pure evil!). Alice, unsuspecting, has approved this contract, thus allowing Bob's call to pass.

This would enable the transfer of all Alice's money to Bob on layer two. A chilling scenario to envision!

## Slither - The Hero Unseen

If it wasn't for Slither grabbing hold of this at audit, the consequent results would be devastating. Figuring out the severity and impact, it's evidently high - Alice would be losing all her tokens to Bob. Depicting the likelihood reveals another elevated risk - this event can transpire anytime Alice calls 'approve'. Consequently, things are looking upwards of 'super high'. While some may tag this as 'crit', we can unanimously agree on labeling it as a 'high audit' critical issue.

_A critical excerpt from Slither's find - "If a user approves the bridge, any other user can steal their funds"._ Quite hair-raising, isn't it? It's an unintended consequence stemming from trust in contracts — certainly not a scenario we envision.

## Crafting a Proof of Code

After such a thrilling ride, let's take a moment to breathe and give a thought to envisaging the proof of code for our discovery.

Stick around for the next part where we dive deep into writing a foolproof, high-safety code, ensuring vulnerabilities like this are effectively mitigated.

With this, we’re signing off for now, continue staying curious and happy coding!\\
