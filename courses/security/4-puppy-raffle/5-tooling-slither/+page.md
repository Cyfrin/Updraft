---
title: Tooling - Slither
---

_Follow along with this video:_

---

### Leveraging our Tools

Auditing smart contracts is an arduous yet essential task in the blockchain realm. To facilitate this process, there are excellent tools to help auditors catch bugs efficiently. In this post, we'll explore two popular static analysis tools that can significantly speed up the auditing process: Slither and Aderyn. Having knowledge of these tools isn't just beneficial for auditors — anyone aiming to be a top developer should consider these tools as an essential part of their toolbox.

### Static Analysis - Boosting Your Auditing Efficiency

![tooling-slither1](/security-section-4/4-tooling-slither/tooling-slither1.png)

Static analysis is a method where code is checked for potential issues without actually executing it. Essentially, it's a way to "debug" your code by looking for specific keywords in a certain order or pattern.

The most widely used tools for this purpose include [**Slither**](https://github.com/crytic/slither), developed by the [**Trail of Bits**](https://www.trailofbits.com/) team, and a Rust-based tool that we've developed known as [**Aderyn**](https://github.com/Cyfrin/aderyn).

> **Note**: It's important to remember that these tools should be run before going for an audit.

### Slither - A Python-Powered Static Analysis Tool

Slither tops the charts as the most popular and potentially the most potent static analysis tool available. Built using Python, it offers compatibility with both Solidity and Vyper developments. An open-source project, Slither allows developers to add plugins via PR.

The Slither repo provides instructions on installation and usage.

I want to bring your attention to the [**Detectors**](https://github.com/crytic/slither/wiki/Detector-Documentation) section of the documentation.

This document lists _all_ the vulnerabilities that Slither is checking for and recommendations for them.

For example:

![tooling-slither2](/security-section-4/4-tooling-slither/tooling-slither2.png)

This could have helped us with PasswordStore! It's easy to see how valuable these tools can be in making our work easier and more efficient.

### Installing Slither

We won't go over the specifics of installation in this course. As intermediate developers, we should have some familiarity with this process.

Choose the installation method that works best for you (Options outlined here), and if you run into issues don't hesitate to ask an AI like [**Phind**](https://www.phind.com/search?home=true) or [**ChatGPT**](https://chat.openai.com). They're great at debugging installation problems.

> **Note:** In addition to Slither, you may need to install [**Python**](https://www.python.org/downloads/), if you haven't.

Once installed ensure everything is up-to-date with:

```bash
pip3 install --upgrade slither-analyzer
```

### Running Slither

The Slither documentation outlines usage for us. Slither will automatically detect if the project is a Hardhat, Foundry, Dapp or Brownie framework and compile things accordingly.

In order to run slither on our current repo we just use the command:

```bash
slither .
```

This execution may take some time, depending on the size of the codebase. If we run it on Puppy Raffle, we're going to get a _massive_ output of potential issues.

The output color codes potential issues:

- **Green** - Areas that are probably ok, may be `informational` findings, we may want to have a look
- **Yellow** - Potential issue detected, we should probably take a closer look
- **Red** - Significant issues detected that should absolutely be addressed.

Here's an example of what some of these look like:

![tooling-slither3](/security-section-4/4-tooling-slither/tooling-slither3.png)

### Wrap Up

By leveraging Slither, audits become more efficient, making it a fantastic tool for developers who are looking to minimize the time they spend on debugging and maximize their protocol's security.

> Always remember, static analysis tools enhance our security review, they don't replace our manual efforts!
