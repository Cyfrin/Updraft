---
title: Debugging Fuzz Sequences
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/QmiE6_Vf_9E?si=Xr2zvZeRfkCGWSkI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Invariant Testing, Fuzzing, and a Weird ERC-20 Exploit

## Introduction

Hello, folks! In this blog post we'll embark on an exciting journey of executing invariant testing using a fuzzer. We will encounter misconfigurations, understand the output generated, identify the source of confused states (yes, we're going to meet a weird ERC20 token variant!), and unveil the importance of writing good tests, especially when dealing with external contracts.

Ready? Let's get started!

## The Initial Fuzzing Scenario

The first thing we need to do is run our fuzzer, which is already configured to a contract, in our case, the "Mock USDC." We have coded a fuzzer test, `forge test --mt`, that we'll apply here.

**_Code to be inserted:_**

```shell
forge test --mt name-of-test
```

As we eagerly anticipate a successful test run...

### Problem Identification: The Fuzzer’s Anarchy

![](https://cdn.videotap.com/dJ9d44aCK4jLbP02SRGT-77.81.png)

Unfortunately, things don't turn out as planned. The fuzzer is attempting to interact with every possible edge, not just the "handler" contract we intended to speculate. To tether its leash back, we explicitly identify the target contract.

After the amendment, another run of the test is conducted.

### Signalling Errors: The Test Output

Run again, we are greeted with an error message from a call to `withdrawYield` (ERC20).

The output isn't clear, but running the command `-VVV` (very, very verbose) may shed light on the error. The detailed output points fingers at an "insufficient balance," raising questions why our fuzzer-guided users are struggling to withdraw tokens they own.

Attempting to better understand this scenario, we consciously decide to ignore the revert conditions. However, the issue persists, generating a mountain of output data.

A new strategy is formulated to drop ‘the seed’ controlling the fuzz, re-running the test in search of more comprehensible output.

## Deep Dive: The Problematic ERC20 Token

Analysis of new output traces reveal that the `depositYield` function is also encountering a revert condition. A comparison of the pre and post-amendment data validates the improvement acquired through the fuzz restriction.

The error persists through multiple test runs, so we opt to investigate the contract code, revealing nothing out of the ordinary in the `withdrawToken` function, a likely suspect. Maybe the issue lies within the token itself?

A scrutiny of `yieldYear20` also reveals nothing amiss, except one: a custom error message.

The error signals a lack of balance, an oddity since the user’s balance should align with the deposit amount. But it's the fine print that throws a spanner in the works.

## Unraveling the Truth: A Sinister Token

Looking further into the `yieldYear20` token, we notice an eccentric mechanism: for every 10 transactions, a 10% fee is deducted and transferred to the owner. Smelling a rat, this erratic behavior is the root of the violation of our invariant.

### An Unexpected Result: Violation of the Invariant

Here’s what unfolds: after back-to-back deposit and withdrawal transactions of the `yieldYear20` tokens, the 10th transaction deducts this 'fee,' dispatching 10% of tokens to the owner's contract. This act violates our invariant, which demands that users can always withdraw the exact balance fraction amount.

## Importance of a Well-Written Test Suite

Luckily, our top-notch stateful fuzzing test suite spotted the anomaly. It showcased the significance of having well-detailed tests, especially when external contracts, such as tokens, are involved. This informal audit brought attention to a significant pitfall potential, “Weird ERC-20 tokens.”

### Wrap Up: Invitations, Exploitations, and Auditations

“Congratulations for digesting this massive chunk of knowledge! Don't fret if you're perplexed; it's a lot to take in, especially without hands-on practice. But remember, Rome wasn't built in a day!

The key takeaway here is the importance of writing detailed test suites, accurately capturing potential anomalies that could break our system. As for our journey, you've just witnessed the first exploit of this session, the "Weird ERC-20 Tokens," a concept we will explore in-depth in coming sessions.

> “To iterate is human, to recurse, divine.” – L. Peter Deutsch

Having unraveled the problem, we're now geared up for the final leg of our expedition, auditing the ‘T-Swap protocol.' Stay tuned, as exciting discoveries await!"
