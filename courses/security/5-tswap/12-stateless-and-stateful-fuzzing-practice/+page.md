---
title: Stateless and Stateful Fuzzing Practice Intro
---

---

### Stateless and Stateful Fuzzing Practice Intro

In this lesson we're going to put some of the concepts of stateful and stateless fuzzing to the test and practice these skills.

In a live security review the repo we're auditing may be huge (spoiler: the `TSwapPool.sol` contract is huge) and while manual review is incredibly important, automating the process as much as we can and leveraging tools to catch what we miss can really improve the efficiency of a security review.

We're going to be using Foundry's Fuzzer here, but I encourage you to look into [**Echidna**](https://github.com/crytic/echidna) as well, which integrates `slither` to execute "smarter" fuzzing.

### Setup

If you haven't already, clone the [**sc-exploits-minimized**](https://github.com/Cyfrin/sc-exploits-minimized) repo.

```bash
git clone https://github.com/Cyfrin/sc-exploits-minimized
cd sc-exploits-minimized
code .
```

This should open the repo in VS Code.

> **Note:** You can use `git pull` to make sure your local copy of the repo is up to date.

In the following sections we're going to focus on 3 types of testing to check for invariant breaks:

1. Stateless Fuzzing (easiest)
2. Open Stateful Fuzzing (harder)
3. Closed Stateful Fuzzing w/ Handler (Hardest)

Now, before moving forward, I strong encourage you to read through and understand the information in the [**invariant-break README**](https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/invariant-break/README.md). Understanding the concepts contained therein will give you a big advantage in the next sections as we employ them practically.

The next thing I want you to do, is delete the `test/invariant-break` folder in the `sc-exploits-minimized` repo you just cloned. Actually writing out this code is and understanding how these tests work is what will allow you to master these skills.

Finally, once we've covered these concepts and practiced these testing methods, we're going to circle back to TSwap and apply our learnings to that code base.

Let's get started!
