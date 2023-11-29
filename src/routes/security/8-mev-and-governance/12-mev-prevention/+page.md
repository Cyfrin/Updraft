---
title: MEV - Prevention
---

_Follow along with this video:_

<!-- TODO -->
<iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Designing For Protection

Our first line of defense against MEV is to refine our designs. To illustrate this, let's revisit a puppy raffle sample.

We can shield our raffle from this kind of attack by updating our Solidity code. A simple solution would be to introduce a function, like `endRaffle`, which signifies the completion of the raffle. Once a raffle is `ended` it will enter a new state, where no one can refund or do anything until a winner is picked. Here’s an example of how we can incorporate additional protections into our smart contract:

<img src="/security-section-8/12-mev-prevention/endRaffle.png" style="width: 100%; height: auto;" alt="pashov">


Our contract now includes a `refund` function that checks if the raffle has ended - if it has, it reverts the function, making it impossible for users to refund their bets after peeking into the mempool.

## Private or Dark Mempool

When the designs have been beefed up, the next step to consider is the use of a private or "dark" mempool, such as [Flashbots Protect](https://docs.flashbots.net/flashbots-protect/overview), MEV Blocker, or a secure RPC.

<img src="/security-section-8/12-mev-prevention/flashbots.png" style="width: 100%; height: auto;" alt="pashov">

Instead of submitting your transaction to a public mempool, you can send your transaction to this private mempool. Unlike the public mempool, this keeps the transaction for itself until it's time to post it on the chain.

Despite its pros, the private mempool requires you to trust that it will maintain your privacy and avoid front-running. Another downside is the slower transaction speed. If you're curious, you can observe this in action by adding an RPC from Flashbots Protect to your MetaMask.



As security experts, we should always be advising protocols how they can defend their users against MEV. 