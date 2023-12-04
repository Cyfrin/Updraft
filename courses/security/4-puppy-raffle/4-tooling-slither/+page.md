---
title: Tooling - Slither
---

_Follow along with this video:_

## 

---

# Demystifying Smart Contract Audit Tools

Auditing smart contracts is an arduous yet essential task in the blockchain realm. To facilitate this process, there are excellent tools to help auditors catch bugs efficiently. In this post, we'll explore two popular static analysis tools that can significantly speed up the auditing process: Slither and Aderyn. Having knowledge of these tools isn't just beneficial for auditors — anyone aiming to be a top developer should consider these tools as an essential part of their toolbox.

## Static Analysis - Boosting Your Auditing Efficiency

![](https://cdn.videotap.com/PcwCRznO4FQcKvoOOcOy-32.16.png)Static analysis is a method where code is checked for potential issues without actually executing it. Essentially, it's a way to "debug" your code by looking for specific keywords in a certain order or pattern.

This elegant strategy saves time and effort as it forgoes the execution of code, thereby accelerating the process of identifying coding errors. The most widely used tools for this purpose include Slither, developed by the trail of bits team, and a Rust-based tool that we've developed known as Aderyn.

> **Note**: It's important to remember that these tools should be run before going for an audit.

## Slither - A Python-Powered Static Analysis Tool

Slither tops the charts as the most popular and potentially the most potent static analysis tool available. Built using Python, it offers compatibility with both Solidity and Viper developments. An open-source project, Slither allows developers to add plugins via making PR.

![](https://cdn.videotap.com/NXCBcJHzsWxWjBZYMfp5-117.91.png)The repositories for Slither on GitHub provide instructions on installation and usage. Among the standout features of Slither, its collection of **Detectors** offers a comprehensive checklist for auditing your code.

These detectors are designed to catch a vast array of potential issues. For example, the **protected VARs** check can identify unprotected variables that are marked as protected. This could have assisted in preventing bugs in the password store.

Running this check will generate an alert: "Hey, add access controls to the venerable functions" whenever this owner variable is modified without the 'only owner' modifier.

![](https://cdn.videotap.com/N91Jg6hbSfCQH4c5Ej7u-160.78.png)Now that you've understood the power of Slither, let's look into it's installation and usage.

### Installing Slither

Different methods of installing Slither are available, i.e., via Pip, Git, or Docker. Installation might be occasionally troublesome, but the pain is well worth the outcome.

For debugging installation issues, you may want to depend on ChatGPT, or find help on Google Search.

**Here's an example of the command you'd use to upgrade Slither once installed:**

```bash
$ pipx upgrade slither-analyzer
```

### Running Slither

To access Slither's numerous features and abilities, you can reach out to the command `Slither help` and idly navigate through the wealth of information it provides.

For instance, to run Slither on a Hardhat, FoundryDep, or Brownie application, use the command `Slither .`. This command allows Slither to automatically recognize the smart contract developer framework in use and compile accordingly.

```bash
$ slither .
```

While running this command could take a while to execute, it's worth being patient. You'll be rewarded with a detailed output on possible areas of concern in your codebase.

The output color codes potential issues: **Green** signifies an area that's probably okay but might require a check, **Yellow** indicates an issue that needs to be definitely checked, while **Red** acts as a red-alert forcing you to inspect it immediately.

![](https://cdn.videotap.com/PseBWolSqkqt0Dt144NL-321.56.png)By leveraging Slither, audits become more efficient, making it a fantastic tool for developers who are looking to minimize the time they spend on debugging and maximizing value addition to their projects.
