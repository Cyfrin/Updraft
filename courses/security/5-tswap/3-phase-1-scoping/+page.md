---
title: Phase 1 - Scoping
---

_Follow along with this video:_

---

### Getting Started

First things first, let's clone the lesson repo.

```bash
git clone https://github.com/Cyfrin/5-t-swap-audit
cd 5-t-swap-audit
```

`git branch` can be used to verify you're on the `main` branch.

In Puppy Raffle, the protocol had completed a basic onboarding questionnaire. In TSwap, we're going to introduce the [**Extensive Onboarding Form**](https://github.com/Cyfrin/5-t-swap-audit/blob/main/t-swap-onboarded.md). You'll learn that the more information and context we can gain about the protocol, the easier our review is going to be.

> Information is **_currency_** in a security review

Let's outline some of the important parts of this onboarding checklist together.

### Extensive Onboarding Form

![scoping1](/security-section-5/2-phase-1-scoping/scoping1.png)

When we first look at this document we'll likely see some familiar things to start. We ask for some basic protocol information including:

- Website
- Documentation
  - This is incredibly important for gaining context of the codebase
- Contact Information

Additionally, we've been provided with a `commit hash`. This is a specific version of the GitHub codebase that can be accessed with

```bash
git checkout <COMMIT_HASH>
```

> **Protip:** After `git checkout` you can run `git branch` to acquire the ID of the hash commit. By running `git diff <COMMIT_ID> <BRANCH>` you'll receive an output of all the changed between the provided branch and the commit hash!

Notice that TSwap's SLOC is 374 - this is nearly DOUBLE what Puppy Raffle was and should be an important consideration of ours when determining the time we need for the audit.

We should also note that the coverage reported here is ... abysmal.

![scoping2](/security-section-5/2-phase-1-scoping/scoping2.png)

The next sections I won't go over in great detail now, but read through these questions and their importance will become clear as we go through the protocol.

![scoping3](/security-section-5/2-phase-1-scoping/scoping3.png)

Remember that communication with these protocols is paramount, the clearer the line of communication you have with a protocol, the better.

![scoping4](/security-section-5/2-phase-1-scoping/scoping4.png)

The next sections touch on known issues and previous audit reports. This information is incredibly valuable in allowing a security researcher in focusing their efforts.

We can see that the protocol, in this instance, hasn't provided us any additional resources (we'll build some of these together later). This would be a great time to contact the protocol and ask for these details though - it's all about gleaning the most thorough understanding of how things work that we can.

> **Remember:** You need to be asking questions! The developers will always have more context than you, use them as a resource.

The last section of the Extensive Onboarding Form we should be familiar with, protocols should have answers to questions found on the Rekt Test, which of course includes a Post Deployment Plan.

![scoping5](/security-section-5/2-phase-1-scoping/scoping5.png)

### Wrap Up

As we can see, the Extensive Onboarding Form lives up to its name. This thorough method of onboarding a protocol will assure you will have all the information necessary to appreciate the workings of codebase and gain valuable context for your review.

With the protocol properly onboarded, let's take a moment in the next lesson to get primed for how this review is going to work.
