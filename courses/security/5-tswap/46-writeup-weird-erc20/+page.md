---
title: Write up Weird ERC20 You Try This
---



---

# Unveiling the Mystery of Tokens while Penning an Audit Report for TSWAP

Cracking the codes and giving insight into the deep trenches of developmental methods, we're all set to discuss and dig into the topic of tokens. For us, ERC20s proved to be peculiar to work with, challenging some of our pre-established perceptions and notions. We're going to rewind a little and talk about the one crucial aspect we didn't happen to discuss in detail, the token matter.

## Unpacked: The Token Hidden Conundrum

An interesting observation was that we didn't host this test on a TSWAP pool. Let me take you back to our chapter on the TSWAP pool. This episode demonstrated our swap function falling apart, breaking the invariant as an extra transfer was conducted in the process.

> Blockquote: Diving into this will reveal that the fee-on-transfer tokens echo the same effect, transmitting extra tokens. Remember, when the fee-on-transfer tokens come into play, they pose a threat to the protocol invariance, demanding attention.

## Transparency - The Token Assassins

Here's an interesting fact - in the TSWAP audit GitHub repository associated with this course, we unfolded some significant details.

```markdown
Go to - Audit Data -> README -> Bottom Page
```

This process reveals two audits previously conducted for the Uniswap v1. Further venturing into the Uniswap v1 audit report fashioned by Consensus Diligence, we found several issues with websites and liquidity.

The v1 of Uniswap suffered a condition where the liquidity pool could be hijacked by certain tokens, for instance, ERC777.

> Think of these tokens as smoke and mirrors. If these tokens paved the way for reentrancies on the transfer, the liquidity could be drained, leaving us high and dry. The introduction of these strange ERC20s into the original Uniswap v1 caused series of issues for protocols.

## The TSWAP Paradox

What's worth noting is that these confusing ERC20s are a significant issue in DFI. They can be a handful to work with due to their distinct characteristics. It might seem enticing if they were all similar, but alas, that's not the case. This issue tends to pop up often, particularly in competitive audits, as many protocols are oblivious to this aspect.

## Drafting the Audit Report

In our discoveries, our conclusive medium (not fully penned down) anticipates additional exploration and experimentation from you. Accept the challenge and bask in the experience of creating proof codes and get playful with the process.

Surprisingly, you'll come across these familiar ERC20s repeatedly. It almost feels as though they're playing peekaboo, secretly popping out at the most unexpected times.

## Conclusion

There's a great deal of satisfaction in unlayering these complexities and jotting down findings. The ordeal of wielding together an audit report surprisingly paves the way to add more to our developmental platter. The report initiates the process of understanding and recognising the challenges and solutions in protocol handling, making the world of tokens and audits a little less complicated and a lot more intriguing.
