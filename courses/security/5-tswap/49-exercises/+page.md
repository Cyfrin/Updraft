---
title: Exercises
---



---

# Exciting Dive into Smart Contract Fuzz Testing and Learning Techniques

### Exploring Tint's Code Error

The other day, Tint was kind enough to share a fascinating gist that truly piqued my interest. It contained a small snippet of a code base that had one glaring issue. Of course, it was not just the issue itself that caught my attention, but more so what this issue represented - an exciting opportunity to start honing your smart contract fuzzing skills with Foundry.

![](https://cdn.videotap.com/cVgMHZy43EUCFjsPdVYm-15.24.png)

The scenario offered by this code base is straightforward. It features a registry contract that permits callers to register by paying a predetermined fee in ETH. If the caller sends too little ETH, the execution reverts. However, if they send too much ETH, the contract obliges by returning the extra funds.

Looking at the unit test reports, everything seems perfect- right? But hold your horses; there's a twist. Your challenge is to write at least one fuzz test via the registering contract. This fuzz test must correspond to the brief specification above and capable of detecting a bug in the register function.

Always remember to undertake this task before moving ahead. Why? Because it can remarkably hone your fuzz test writing skills.

### Amplify Learning with Social Media

Amidst this coding, let's spice things up with a tad bit of tweeting. Don't be confused, it's a part of the process. Remember, as a security researcher (focus on the 'researcher'), you aim to excel at researching and comprehending issues. Go forth, dive into Solidity and learn something unique.

You can start with something as straightforward as reentrancy. As a topic we've repeatedly discussed and will continue to, there's a wealth of knowledge to be extracted. Find examples of different reentrancy attacks- perhaps the highs. Choose a crazy reentrancy attack, learn about it, break it down and share your learning on Twitter.

> _"One of the best ways to learn is something called the TeachBack Method, where if you teach something back to somebody, that is a great way to learn."_

### Take a breather

Now seems like an excellent time to grab a cup of coffee and unwind for a bit.

If you haven't yet signed up for [codehawks](https://codehawks.com), now's the time! We have exceptional first flights lined up that will give you the confidence boost you need.

![](https://cdn.videotap.com/08R5XEP6FtKgKciMJKrm-101.6.png)

### Coming up next...

Brace yourself for Section Six with Centralization Proxies and Oracles featuring the intimidating Thunder loan audit. We will also cover Boss Bridge before moving on to tackling the Vault Guardians Boss codebase.

So, gear up, recharge your brains with a coffee break, and let's dive into the world of smart contracts!

See you soon folks.
