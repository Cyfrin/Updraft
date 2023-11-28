---
title: What tools do we use in Security Reviews?
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/RFNY64PLRiM?si=vnpIHg_lrfPeSNkW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Your First Line of Defense: Test Suites

Your classic test suite is your project's first line of defense. Regarded as the foundry and hard hat of your codebase, they are standard tools like Remix tests and Rip Truffle. These powerful tools can help maintain a healthy, secure codebase.

Throughout this lesson, we will deep dive into various robust test suites that should be emulated to enhance codebase security. Also, look forward to learning about test coverage in our forthcoming security reviews.

## Static Analysis: Debugging Without Execution

Static analysis represents the next level of defense. This method automatically checks for issues without executing your code, hence the debugging process remains static. Slither, Fornelizer, Mithril, and Aderyn are some prominent tools in the static analysis category.

Throughout our discussions, we'll weigh heavily on Slither and Aderyn, imparting knowledge on these invaluable tools.

## Fuzz Testing: Randomness Meets Tests

Next on our list is fuzzing or fuzz testing. Remember when we spoke about providing random data inputs during testing? Well, fuzz testing is just that!

<img src="/security-section-2/4-tools/tools1.png" style="width: 100%; height: auto;">

It's an exceptional way to quickly uncover any esoteric bugs in your smart contracts. And then, there's stateful fuzzing. In 'stateful' testing, the system recalls the state of the previous fuzz test and proceeds with that state in the new test. No, it has no bearing on your cat's fuzziness, but this method would genuinely pass that test if it existed!

In future audits, we'll explore how to write stateful fuzz tests, invariant tests, and many more.

## Formal Verification: Putting Math Into the Code

Formal verification is a broad term for deploying formal methods to affirm the correctness of hardware or software. Often, these methods involve converting the codebase into mathematics and deploying mathematical proofs to authenticate that the code does or doesn't do something specific.

A popular formal verification approach is symbolic execution. This method converts your Solidity function into math or a set of boolean expressions. Manticore, Sartora, Z3 stand tall in this domain.

We will delve deeper into formal verification in later sections.

## AI Tools: Not Quite There Yet

Lastly but importantly, AI tools offer another dimension to imagine code auditing functionalities. However, despite their potential, they have some distance to cover before they provide substantial value for securing a codebase. At present, using AI tools could serve as a sanity check or aid in looking for something quickly in a codebase. But remember, if a project suggests it has been audited by an AI tool like Chatgbt, it is best to be skeptical and question if the project takes security seriously.

## Wrapping Up

An important takeaway for you is that around 80% of actual bugs and competitive audit bugs are not auto-detectable by machines, including our present-day AI tools]. This revelation underlines two key facts:

1. Our current tools aren't up to the mark, and we need better ones.
2. Human auditors and human security researchers remain paramount. The vast majority of bugs often stem from business logic and incorrect implementations rather than common solidity or cryptography oddities.

Throughout this course, we will reinforce and expand on these lessons, further equipping you to create more secure, robust codebases.

Thanks for reading this lesson, we'll see you on the next one.
