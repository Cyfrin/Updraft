---
title: Introduction
---

_Follow along with this video:_

---

## Puppy Raffle Audit

Welcome to Section 4: Puppy Raffle Audit! In addition to strengthening our skills in manual review, in this section we'll be introducing powerful tools and leveraging `static analysis` to help us secure this protocol.

We'll see the differences between a private audit report and a competitive audit submission and be introduced to the process of competing in a CodeHawks First Flight!

### CodeHawks First Flights

CodeHawks First Flights offer an excellent platform for budding smart contract security researchers. This platform contains relatively easy-to-understand codebases that resemble those you will find in this course.

If you are a beginner, they are a perfect opportunity to get live auditing experience and build upon the things you've learnt in a practical setting. For experienced auditors, they serve as a chance to engage in the community and iterate on your established skills.

![introduction1](/security-section-4/1-introduction/introduction1.png)

We'll be going over how to submit an awesome competitive finding in this section.

### Tooling

As mentioned above, we'll be using new tools to help us in finding vulnerabilities and familiarizing ourselves with `static analysis`. We'll be using:

- [**Slither**](https://github.com/crytic/slither) - A pythonic static analysis tool compatible with Solidity and Vyper
- [**Aderyn**](https://github.com/Cyfrin/aderyn) - Built in Rust by _Alex Roan_, Aderyn traverses Abstract Syntax Trees to highlight suspected vulnerabilities.

Through this section, you will:

- Familiarize yourself with your first set of tooling.
- Understand what static analysis is and its role in enhancing protocol security.
- Gain an insight into the different exploits in this codebase.
- Finally, learn how to write reports of competitive audits and differentiate them from private audits.

### So Many Bugs

Our previous codebase was quite small, Puppy Raffle has more to it and as a result, there are many more bugs to find! There are at least FOUR HIGHs to find in this repo (and likely some I didn't even account for 😋).

### Case Studies

As we uncover vulnerabilities in the Puppy Raffle codebase, we'll dive into real world case studies detailing times these vulnerabilities were exploited in the wild.

This should give you real insight into what's at stake as we're performing security reviews and really instill that these efforts of ours matter.

### Exercises

At the end of the section, we'll have _even more_ exercises for you to expand on your knowledge and challenge yourself beyond the course's teachings. These are your opportunities to branch out, network and gain additional experience.

This includes participating in a CodeHawks First Flight or a competitive audit! Get ready!

### Prep for Puppy Raffle

If you take a look at the [**repo**](https://github.com/Cyfrin/4-puppy-raffle-audit) associated with this section, you'll see a fairly robust README already supplied. For this review, we're assuming the protocol has already undergone some degree of onboarding and they've provided us a respectable repo.

I will transparently point out that, much like our previous protocol review, this repo has multiple branches, one of which is the `audit-data` branch. I **STRONGLY** encourage you to resist peeking in this branch until the end. The `audit-data` branch effectively serves as an `answer key`, in which all the vulnerabilities and write-ups can be found.

Going through the codebase throughout the course, and appreciating each step is how you're going to build these skills. Uncovering the attack vectors is how you build familiarity with these risks. Skipping over steps is only going to harm your progress. Build the habits, do the work.
