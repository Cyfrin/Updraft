---
title: Description
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/uhVuTDxudz8?si=tiW21H5m3oYynKD_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unmasking The Vulnerabilities of Chain Data Visibility

Hello, you! Here's an exciting topic that's sure to peak your interest - the valuable teachings of the protocol and its vulnerabilities when dealing with on-chain data storage. We've carefully crafted a compelling and extremely informative blog post. Read on to uncover the potential issues that can occur.

## Crucial Description

A fail-proof practice while dealing with data uncovering in blockchain is to equip our auditors with a concise yet educative description. Given the fact that all data stored on-chain is visible to anyone, the assumption that they can be read directly from the blockchain is worryingly accurate.

Just to illustrate, consider the 'S_password variable' - which is intended to remain private, with its sole accessibility granted via the getPassword function. This function is essentially restricted to the contract's owner.

However, the card up our sleeves here is a curious knack of being able to reveal data off-chain. At this point, you must be intrigued to see one method of achieving this. Look no further, it's all here under "proof of concept."

Some of these variables might seemingly sink into oblivion when we're dealing with vast code bases. A widely followed practice in such scenarios is to distinguish variable and function names by highlighting them with backticks and specifying their contract name. For instance, here's how to format them:

Now when you view these chunks of code, you immediately know that `S_password` is a variable and `GetPassword` is a function. And not to forget, they are directly fetched from the code base.

## What's The Impact?

Here's a jolt of reality - should anyone access the private password, it dismantles the protocol's functionality entirely. Quite some impact there, isn't it?

<img src="../../../../../static/security-section-3/15-description/description1.png" style="width: 100%; height: auto;">

## Convincing Proof of Concept

This next section is where we prove that our claims are real concerns and not just theoretical hypotheses. There's a somewhat humorous, albeit cynical, stereotype that dismisses auditors and security researchers as confused individuals trying to convince the protocol gurus about their 'imaginary' findings.

> "Yeah, yeah, sure, whatever, you dumb auditor, you dumb security researcher. I don't believe, you! You're confused."

Let's change that perception, shall we? The 'proof of concept', sometimes referred to as 'proof of code', is where we do just that. The onus is entirely on us auditors to convince the protocol about its vulnerabilities and their aftermath.

Our proof of concept is even more critical during competitive audits. Without it, it's nearly impossible to convince a judging panel about the legitimacy of your findings.

But what if you're dealing with a sophisticated protocol? And perhaps you've already hinted at them that their on-chain data can be read directly off-chain, to which they might react like so:

> "Oh, yes, oh my God, you're right."

Well, in such cases, you might not need to bullish about providing an exhaustive proof of concept. Nevertheless, especially at the early stages of your career, it's advisable to err on the side of elaborate explanation.

That's what we're doing here. To help you visualize the protocol's flaws better, we've constructed a test case that exemplifies how anyone can access the password directly from the blockchain. This is where we attempt to outsmart the approach of reading data directly off the blockchain.

To wrap things up, let's remember that while dealing with protocol vulnerabilities, being succinct yet comprehensive is the key towards effective auditing and security research. Happy auditing!
