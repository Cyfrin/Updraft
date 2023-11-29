---
title: Perserverance
---

_Follow along with this video:_

<!-- TODO -->
<iframe width="560" height="315" src="https://www.youtube.com/watch?v=xb1wAceJBvY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---


# Why are we not going to audit Vault Guardians together? 

Originally Section Eight was designed to act as our final boss vault; an encompassing guardians security review or audit. However, upon reflection, I've decided that we're going to break this up and let you into the complexity of this code base one piece at a time. 

And YOU my friend, you can go back and audit [Vault Guardians yourself](https://github.com/Cyfrin/8-vault-guardians-audit) :) 

## Vault Guardians

<img src="/security-section-8/2-perserverance/vault-guardians.png" style="width: 100%; height: auto;" alt="vault guardians">

So we aren't going to audit this one together, but we are going to go over some of the attack vectors you'll find in this codebase. And after we do that, you can either:

1. Audit Vault Guardians
2. Start a competitive [CodeHawks](https://www.codehawks.com/) competitive audit

> "The reason that this is so big and this is such a monster of a final audit or security review is because you will get good and you will have to get good at coming to a code base and saying, I can do this. I can complete this. This looks overwhelming to me, but it's okay because I know I'm going to come out the other side triumphantly."

## Teamwork Makes the Dream Work

In the vast realms of smart contract security, it's not all about solo missions. Teaming up with somebody else is an incredibly powerful move. Find a buddy in the [Codehawks/Cyfrin Discord]() to share your thoughts, brainstorm, and code together. This is not just about sharing the workload but learning how others think about attack vectors, and figuring out different strategies of how they approach this maze of codes. So sync up with someone, share your findings and grow together.

Despite splitting up these sections, Section Eight remains our final boss. We won't go over it in this post, but don't feel left adrift. There's an audit data branch where you can check the answers and use as reference.

## We start with MEV

So... To recap.

1. We are going over some exploits in this section, in particular:
   1. MEV
   2. Governance Attacks
2. And then, to finish part 1 of the security course, you can either:
   1. Audit Vault Guardians
   2. Start a competitive [CodeHawks](https://www.codehawks.com/) competitive audit

So... LETS GET IT!