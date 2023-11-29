---
title: Stateless and Stateful Fuzzing Practice Introduction
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Zo6viGz-NzM?si=ztjgOS4OavgTWfes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Proficiency in Invariant Tests and Fuzzing Tests: Professional Insights and Practicum

Hello everyone, today we delve deeper into the intriguing world of invariant tests and fuzzing tests. Buckle up as we gear up to break some contracts by exploring these tests, intentionally leaving the code unexamined for now. Our curiosity piqued? Let’s get into it!

## Diving into Code Bases

We can’t help but sneak a peek into the code now, can we? Since we are here, let's analyze this exemplary TSWAP pool code base.

![](https://cdn.videotap.com/9DXkrFHNdYGt3CJIJuAh-39.png)

It's filled with a plethora of comments, functions, and other intricate elements - it's enough to make the most seasoned of us a tad bit overwhelmed. Amongst us is the pool factory that stands minimal. We notice that the primary responsibility of pool factory is to create pool functions. Isn’t it interesting to note the stark contrast between TWSAP pool code base and pool factory?

## What About the Security Review Test?

Good question! We’ll get there, but remember, we are just humans, and the chance for errors and omissions is high. We might fail to spot certain defects during the manual review of the security test. This is precisely why leveraging automated tools as much as possible for these reviews is essential. Trust me, the experiences we collect from the practice of working with these tools are going to be invaluable.

## Plunge into Fuzzing: Stateless and Stateful

In this chapter, we will focus on working with **stateless** and **stateful** fuzzing along with some advanced strategies. These techniques have personally worked wonders for me in competitive audits. My method has been to comprehend a protocol's invariant without really examining the code base, write an invariant test suite, and voila – bugs are unveiled effortlessly.

There are also other fuzzers to explore. Take the [Echidna Fuzzer](https://github.com/crytic/echidna) by the Trail of Bits team, for instance. Famed for being a smart fuzzer and powered by 'Slither', it is a fantastic tool indeed. Another outstanding option is the [Consensys Fuzzer](https://github.com/Consensys/diligence-fuzzing). This is a paid corporate cloud fuzzer and hence we won't be able to provide a walkthrough for it. [Foundry](https://github.com/foundry-rs/foundry) is yet another promising candidate with built-in fuzzing.

Here is the content that these READMEs possess:

- An understanding of what invariants are
- A better insight into the different strategies we plan to employ to break invariants and discover vulnerabilities.

I strongly recommend that you go ahead, pause this session, and thoroughly read through this. Trust me, understanding it now will make it easier when we get into the hands-on segment.

## Breaking Invariants: The Game Begins

Let's now move forward to the fun segment – you will write code along with me and understand every snippet. I assure you that by the end of this, you will have become an invariant testing pro. This mastery over the subject will help you discover vulnerabilities quicker and more effectively.

First, in your code base, find the Invariant Break folder and remove it. Yes, you heard it right – remove it! Doing so is a sure-shot way to ensure you are not merely copy-pasting but genuinely understanding every piece of code. Let's start with stateless fuzzing.

Once we are through with learning these strategies for fuzzing, we'll return to our Uniswap code base and familiarize ourselves with its 'x times y equals k' core invariant. We'll then try to break it and uncover bugs without examining the code base and solely understand the invariants.

So let's gear up and set out on this exciting and insightful journey of breaking invariants and fuzzing, navigating through this incredible world of coding and contracts. Let's learn, practice, improve, and ultimately – strive towards becoming super badasses in smart contract testing and auditing.

> "The only way to learn a new programming concept is by writing programs." - Dennis Ritchie
