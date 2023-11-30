---
title: Static Analysis Continued
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/UZFZgPSRv7k?si=urCjybdM03TfOgBz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Identifying Key Aspects of a Blockchain Protocol Audit

The process of a blockchain protocol audit involves numerous steps, including checking for null address errors or unused functions, and then reporting these findings. In this blog post, we will go through the transcript of such an audit, explaining the key steps and the reasons behind the auditors' actions.

## Addressing Null or Zero Address Errors

The first thing on the agenda was identifying any zero address checks that were missing.

While inspecting the code in `orible_upgradable.sol`, few aspects came to light that called for some auditing. In blockchain parlance, a zero address refers to an address that was never assigned. If any state variables in a smart contract were unintentionally assigned to a zero address, the contract may not function as intended.

The code seemed to have a couple of places where this was an issue in assigning values to address state variables that lacked checks for address zero.

An additional instance required our attention, further validating that multiple aspects of this contract require zero address checks. This recommendation came up as part of the audit's Informational findings or the 'Gas' that helps improve the contract's architecture.

## Marking Unused Functions as External

The next point of attention was for functions that weren’t being used internally. These could be marked as external. Specifically, the `getAssetToken` function appeared to be a likely candidate for this change. It was found to be defined in `ThunderLoan.sol` but seemed to only be utilized in the `ThunderLoanUpgraded.sol` contract.

## Defining and Using Constants Instead of Literals

Literals, in coding terms, are the set values that remain unaltered throughout the code's execution. Using constant variables instead of these literals enhance the code’s readability and maintainability.

On Line 144 of the contract, the use of magic numbers was spotted. Magic numbers refer to undisguised numerical values that could potentially create confusion in the future. Therefore, defining and using constants instead of these literals is strongly advised.

## Track Missing Index Fields in Events

Events play a crucial role in smart contracts, keeping a log of essential occurrences. Therefore, including an 'index field' is essential, as it aids in filtering and searching event logs effectively.

In our project's case, some events being emitted lacked such an indexed field. Including this in the final report as an informational finding is a must, enabling the team to use events in a more structured and practical manner.

# Evaluating Centralization Issue

During our audit process, a centralization issue was identified with the protocol. It's a common practice in a private audit to notify the protocol if the contract is centralized. As highlighted in the Oasis case, an element of control or flexibility can potentially have dire consequences on protocol decentralization.

"We found a centralization issue. We'd generally advise against this if the protocol doesn't need to be ownable or upgradable, as it presents a centralization vector."

# Concluding Remarks

Information gleaned from this audit demonstrates how intricately the process needs to be conducted. Key findings drawn during the process included missing zero-address checks, unused internal functions, usage of literals instead of constants, and missing index fields in events. Along with this, an important aspect brought forth was the issue related to centralization.

It's vital to consider every possible attack vector when developing a protocol. By acknowledging potential risks, such as an unsuspecting bad actor gaining control and pilfering funds, we can make necessary adjustments to mitigate these risks.

By running various audits like Slither or Adarin, we can close potential loopholes and aim to deliver a more streamlined, safe, and reliable protocol. These measures culminate in securing your protocol's integrity against potential risks, enhancing its potential for real-world utilization.
