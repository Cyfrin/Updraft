---
title: What tools do we use in Security Reviews?
---

_Follow along with this video:_

---

## Tools for Security Reviews

Let's overview some of the tools we'll be using while performing security reviews. As we progress in the course, you'll get more hands on experience with how they work!

### Your First Line of Defense: Test Suites

Your classic test suite is your project's first line of defense. These are your frameworks like Foundry, Hardhat, Brownie, Apeworx - even Remix has tests.

> _Rest in Peace Truffle_ 😢

This course covers some really robust test suites that you can model your tests after and we'll talk more about the concept of `test coverage` a little later on.

## Static Analysis: Debugging Without Execution

Static analysis represents the next level of defense. This method automatically checks for issues without executing your code, hence the debugging process remains `static`. Slither, 4nalyzer, Mythril, and Aderyn are some prominent tools in the static analysis category.

Throughout this course, we'll work heavily with Slither and Aderyn, you'll become experts at these static analysis options.

## Fuzz Testing: Randomness Meets Tests

Next we have Fuzz testing, which really comes in two flavours, `fuzz testing` and `stateful fuzz testing`.

<img src="/security-section-2/4-tools/tools2.png" style="width: 100%; height: auto;">

A few other types of testing we _won't_ be covering are `differential test` and `chaos tests`, but in an effort to further you security journey, you always want to be looking for new looks and expanding your knowledge, so you may want to check them out.

## Formal Verification: Mathematical Proofs

Formal verification is a broad term for deploying formal methods to affirm the correctness of hardware or software. Often, these methods involve converting the codebase into mathematical expressions and deploying mathematical proofs to authenticate that the code does or doesn't do something specific.

A popular formal verification approach is symbolic execution. This method converts your Solidity function into math or a set of boolean expressions. Manticore, Certora, Z3 stand tall in this domain.

We will delve deeper into formal verification in later sections.

## AI Tools: Not Quite There Yet

Lastly but importantly, AI tools offer another dimension to imagine code auditing functionalities. However, despite their potential, they have some distance to cover before they provide substantial value for securing a codebase. At present, using AI tools could serve as a sanity check or aid in looking for something quickly, but if a project suggests it has been audited by an AI tool like `ChatGPT`, it is best to be skeptical and question if the project takes security seriously.

There's a great GitHub repo by ZhangZhuoSJTU that illustrates examples of bugs that are detectable by machines and those that aren't. Check it out [**here**](https://github.com/ZhangZhuoSJTU/Web3Bugs).

## Wrapping Up

An important takeaway for you is that around **80%** of actual bugs and competitive audit bugs are not auto-detectable by machines, _including our present-day AI tools_. This revelation underlines two key facts:

1. Our current tools aren't up to the mark, and we need better ones.
2. Human auditors and human security researchers remain paramount. The vast majority of bugs often stem from business logic and incorrect implementations rather than common solidity or cryptography oddities.

You'll learn more about this distinction as we continue in this course.
