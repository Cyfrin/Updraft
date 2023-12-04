---
title: Phase 1: Scoping
---

_Follow along with the video lesson:_



---

# Scoping out a Codebase: A Comprehensive Guide

Code auditing is a crucial part of every developer's journey. Whether you're managing an open-source project or conducting a security review, understanding a codebase in and out is indispensable. So where do we start?

Well, this guide promises to take you through the nitty-gritty of scoping out a codebase, using a protocol as an example.

## Kicking Things off With the README

The README documentation serves as a good starting point when familiarizing yourself with a new protocol. While initial impressions might provoke a 'blah, blah, blah, whatever' response, we can extract valuable information about the audit scope details in this document.

In our case, the README delineates the commit hash details, which you'd typically implement via the `git checkout` command.

```bash
git checkout [paste the commit hash here]
```

For learning purposes, however, we're going to stick with the main branch.

## Understanding Included Contracts

Your next port of call should be examining the contracts embedded within the codebase. In our scenario, we noticed all contracts resided in the protocol source, particularly in the `interface for protocol`. Interestingly, we also saw an upgraded version of the protocol.

This raised a question mark—what defines this 'upgraded protocol'? The particulars will unravel as we progress.

## Code Version

Pay attention to the Solidity version for the protocol—ours was v0.8.20. Be mindful that the contract should match Ethereum's latest security standards.

## Contracts Handled

We next located some ERC 20 contracts—namely USDC, die, Link, West. Use your past knowledge to understand how these contracts work. From our last course, we discovered that the USDC supports an upgradable contract and encompasses a block and allow list.

> "This information is vital as we need to understand how our protocol manages a token, which can transform completely."

## Identifying Roles

We identified different roles within the protocol including an owner, a liquidity provider, and a user. Hoodwinked by terms like "liquidity provider"? Don't fret! As you delve deeper into DeFi, you will acquire familiarity with this lexicon.

In our case, we discovered that a liquidity provider is someone who deposits assets to earn interest, while a user is someone who takes flash loans from the protocol.

The protocol's owner holds the power to update the implementation—interesting.

### Digging Out Known Issues

We also found some known issues detailed in the README, warranting a revisit after gaining more context.

## Analyzing Makefile

Potentially useful insights lay in the `Makefile`, where we found Slither configuration along with some other tools. We took a minute to run solidity metrics on this "bad Larry", yielding an output that adds value to our understanding.

```bash
solidity-metrics [insert codebase here]
```

In our audit, the API gave an output of 391 N slock and 327 complexity score, indicating most complexity resided in the `Thunderloan` and `Thunderloan-upgraded`.

We dropped these metrics into a markdown file as notes to help gauge process duration in future audits.

## The Importance of Context and Reconnaissance

Ending phase one of our audit process, it's clear that understanding an unknown codebase—and by extension, performing a protocol audit—is a matter of patience and practice. Taking your time and being methodical can help you glean valuable contextual information about the codebase.

In the part two of this guide, we'll conduct some rigorous reconnaissance, promising further insights into the protocol audit process. Stay tuned!
