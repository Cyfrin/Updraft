---
title: Phase 1 - Scoping
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/Rtl1A-QEyKE" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Bridging the Gap in Your Cybersecurity Journey: Exploring Codebase Exploits

Welcome back, tech enthusiasts! If you're here for the first time, no worries, there's still time to catch up. Now, was everyone able to spend some time going through the code before coming back here? Excellent! As you know, practice makes perfect, and taking the time to familiarize yourself with the code makes the walk-through process much more beneficial.

So, let's dive into our fun-filled expedition, exploring various coding exploits, and reinforcing your knowledge base. Excitingly, by the end of this, you'll have a comprehensive report to add to your ever-growing developer portfolio.

Are you ready? Good. Let's dive right in.

## Navigating the Security Course

Currently, we are navigating through our structured cybersecurity course. Note-taking is essential during the journey, as there will be an array of essentials to learn, especially in this module.

Take note of the below GitHub codebase, which we will be referencing throughout this course:

```bash
git clone https://github.com/repository/examples.git
```

After doing a successful `git clone`, let's open the project in our favorite code editor (Personally, I prefer VS Code).

## The Smart Contract Security Review

Before we explore the code, we need to understand what it is about. This stage is often referred to as the 'Scoping Phase'. We are encouraged to explore, question, and gain context on the ongoing project.

In this particular code base, we encounter a rather delightful concept: a 'Puppy Raffle'. Now, let's take a minute to go through the 'About' section, yes, the one right at the top of the page.

![](https://cdn.videotap.com/wTq0wfCNib6lb1D2AqTZ-67.02.png)## Essential Prep Work

In the README, there are some instructions about tools we need in order to run the project, specific versions of Git and Foundry in this case. We've already cloned the project; now, let's have a look at the `make` file.

```bash
git clone https://github.com/repository/examples.gitcd examplesmake run
```

What happens when we run `make`? We're executing three commands, remove, install, and build.

Here's a breakdown of the makefile:

- Remove: Clears any previous build files.
- Install: Handles the library and package installations. In this example, we're installing specific versions of OpenZeppelin and the BrushPD base64 package.
- Build: Compiles the project.

![](https://cdn.videotap.com/N8L5QF4tSzLDWWv68Ike-139.2.png)Running `make` should execute these commands in the terminal. We can then observe the dependencies being installed, files being compiled, and possible warnings thrown.

However, remember:

> A warning isn't an error. However, warnings need attention just as much as errors.

Contained within our makefile is a command for running tests, `forge test`. But, before we run tests, we want to gauge the solidness of the test coverage. Running coverage reports give us some insight into the maturity level of the code base.

```bash
make coverage
```

## Navigating the Codebase

Next, we recognize the commit hash - an opportunity to delve into different versions of the code base. We're not going to run the `git checkout` at this moment.

```bash
git checkout <commit-hash>
```

For the next stage of this exercise, you should ensure you're working in the main branch. We're focusing on a single file in the scope: `puppyraffle.sol`.

Within in this file, we can see some interesting aspects: a firm amount of comments, which is always encouraging, several functions, compatibility with solidity version 0.7.6, contract deployment to Ethereum, and various assigned roles.

![](https://cdn.videotap.com/elVBGNan7XfaFJokz2Yt-216.53.png)So far, everything seems in order, which can be deceiving. There could be potential exploits or weaknesses. But don't panic just yet. That's precisely why we're here: to navigate this curiosity-filled world of cybersecurity. Join us in the next part, as we continue unravelling this mystery.

Stay curious and until next time - Happy Coding!
