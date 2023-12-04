---
title: Top Tools used by Security Professionals
---

_Follow along with this video._



---

Welcome back! Now that you have a basic understanding of what a smart contract audit involves, let's take a deep dive into the auditing process employed by security professionals. More specifically, the tools they leverage, their relevance to protocol developers, and why early-stage security awareness is paramount.

## Importance of Security Tools for Smart Contract Developers

As a smart contract developer, it is crucial to familiarize yourself with the entire toolkit used in audits. It will make sense to employ these tools even before seeking a professional audit just to streamline the process. Remember: the code base you launch is your responsibility and it is important not to wait until the end to think about security. Instead, your code's safety must be built into the architecture from the onset.

Let's take the analogy of a car race. If you build a dysfunctional car and decide to jump on the racetrack, you'll find out that you should have started over. Using time to audit a fundamentally flawed system is therefore not productive. To avoid such situations, smart contract developers have useful tools that can help provide guidance. [Solcurity](https://github.com/transmissions11/solcurity), for instance, offers security and code quality standards for solidity smart contracts and then there's the [simple security toolkit](https://github.com/nascentxyz/simple-security-toolkit) from Nascentxyz, a valuable resource to consult pre-audit.

## The Smart Contract Audit Process

The audit process is rather complex with no one-size-fits-all solution. However, typical smart contract audits involve a mix of manual reviews and tool-based evaluations. A multitude of tools exist to ensure code security, but manual review remains arguably the most vital.

### The Power of Manual Review

Manual review primarily involves going through the code line by line and verifying the code's functionality against documentation. It's unsurprising that the developer community often jokes about the gains that 15 minutes of documentation reading could yield. The first step usually involves understanding the protocol's supposed function, given the majority of bugs encountered are more related to business logic than technical errors.

<img src="/auditing-intro/3-tools/tools1.png" alt="Auditing Image" style="width: 100%; height: auto;">

This statement couldn't be truer here. The more code and documentation you read, the better equipped you will be to spot bugs and errors.

For example, consider a simple contract with a 'set number' function. While the code might compile and deploy successfully, reading the corresponding documentation may reveal the intended function is to set a number to a 'new number'. It's only through understanding this that you'll realize setting it to 'new number + 1' is incorrect. Not a code error, but a business logic error, which is just as significant.

### The Investigative Tools Used in Audits

Besides manual review, several tools come in handy during the auditing process. These include:

1. **Test Suites**: The primary line of defense that highlights potential vulnerabilities during testing. Most popular frameworks integrate test suites, and their importance has been extensively discussed in this course.
2. **Static Analysis**: Helps in automatically detecting code issues without running any code. Typically, such tools search for specific keyword patterns for potential issues.
3. **Fuzz Testing**: An approach that involves feeding random data as inputs during testing to unearth bugs that might go undetected during regular testing.
4. **Stateful Fuzz Testing**: A more complex version of fuzz testing, already covered in this course.
5. **Differential Testing**: Although not a keen focus area for this course, it involves writing the same code multiple times, and comparing them for discrepancies.
6. **Formal Verification**: This is a mathematical proof-based code verification methodology to establish the correctness of hardware or software.

#### Formal Verification through Symbolic Execution

Formal verification might seem slightly confusing initially, but think of it as converting solidity code into mathematical expressions that can easily prove or disprove the code's operation. Symbolic execution is a typical method of formal verification. It attracts contrasting preferences within the development community due to its time-intensive nature, with many players choosing to skip it. Although not a direct indicator of error-free code, it becomes crucial when dealing with math and computationally heavy processes.

#### The Role of AI in Smart Contract Audits

AI-supported tools are a work in progress in the industry. While sometimes they prove to be vital additions to the toolset, other times they disappoint significantly.

## Unpacking the Audit Process with Real Code Samples

To grasp this better, consider the following snippets from the Denver Security Rep (a codebase associated with this course) :

1. **Manual Review**: Code that does math incorrectly—identified by direct comparison with documentation.
2. **Testing**: A function supposed to set a number but adds one to it—discovered with simple unit testing.
3. **Static Analysis**: A sample reentrancy attack detected automatically by running [Slither](https://github.com/crytic/slither).
4. **Fuzz Testing**: Failure to maintain variable value within defined bounds—picked up by random data input testing.
5. **Symbolic Execution**: Use of solidity compiler to check for issues by triggering different code paths, and understanding their outcomes.

## Wrapping Things Up with Expert Insights

To help us better understand manual reviews, we're fortunate to have Tincho, a distinguished Ethereum smart contract researcher. Tincho, through his manual review technique, discovered a critical vulnerability in the Ethereum Name Service (ENS) that earned him a $100,000 payout. His insights will undoubtedly be valuable as you navigate your journey in smart contract auditing.

That was it for this lesson, keep learning and happy auditing!

<img src="/auditing-intro/2-whatis/whatis1.png" alt="Auditing Image" style="width: 100%; height: auto;">
