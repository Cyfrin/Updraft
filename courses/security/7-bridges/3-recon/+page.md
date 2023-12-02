---
title: Recon
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/RKjx1wGuUco?si=c4Xp3cLgN2niVxgX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Static Analysis of Ethereum Smart Contracts

One of the first steps in smart contract auditing involves the use of static analysis tools. These tools can scan your codebase and identify potential issues such as vulnerabilities, bugs, or deviations from best practices. This blog post will provide a detailed walkthrough of static analysis, using `make slither` and `make aderyn` commands as primary examples of tools that we can use.

## Reading The Documentation

The first step on this journey of static analysis will always be reading the documentation of the tool that you want to use. Why is this? Because it will help you understand the full capabilities of these tools. Despite this, the documentation step is often overlooked, so do remember to pay special attention to it.

Today, however, after a quick glance over the user manual, I am eager to dive straight into the codebase. Brace yourself for some adventurous code auditing!

## Running Static Analysis Tools

In this scenario, I've decided to start by running my static analysis tools.

![](https://cdn.videotap.com/WV5JlvHe6ylxiE7aFko2-12.35.png)

The command to initiate the process is `make slither`. This should be run as a baseline test for any codebase under scrutiny. As devs, it's our responsibility to ensure a codebase complies with best practices.
...
It turns out the codebase is riddled with issues. But no worries – this is what we signed up for. Let’s dive deeply into these issues shortly.

Next, it's time to run the `make aderyn` command to get a secondary report:

## Analyzing the Report

Now we have the `report.md` ready. Time to examine its findings.

![](https://cdn.videotap.com/l0Mt9wevI06wPhE5FmZS-38.8.png)

A sneak peek into the report reveals some medium-grade issues. Let's examine them closely:

- **Centralized Risk** - The contract has a centralized risk problem. Despite the fact that blockchain was built on the pillars of decentralization, many developers fall into the trap of creating contracts that rely on central authority.
- **Unsafe ERC20 operations** - The contract uses unsafe ERC20 operations. This is a big no-no.

> "ERC20 operations should not be used. The return values are not always meaningful. It is recommended to use [OpenZeppelin's SafeERC20 library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)".

- **Missing zero address checks** - The contract does not have zero address checks.
- **Functions could be marked external** - There are functions which are not used internally, these could be marked external which could save some gas.
- **Undefined constants** - The contract uses magic numbers instead of defined constants.
- **Incorrect events** - Events in the contract are not defined correctly.

The report from Aderyn is full of useful insights. They will all be copied and pasted into their rightful sections in the final report.

## Reconnaissance

Finally, it's time for reconnaissance. I pondered over whether to do the `Tincho`, which analyzes the contracts from the least to the most complex. Since there are only four contracts, I opted to forgo creating a new sheet for documentation.

Stay tuned for further posts to unveil the specifics of each of these issues, and the steps taken to mitigate them.
