---
title: Recon Manual Review IPoolFactory sol
---



---

# Manual Code Review: Getting Started

After setting our initial context and utilizing our suite of auditing tools, it's time to get our hands dirty with some thorough manual review. Much like our previous auditing process, one viable option available to us is to start from the test suite.

## Diving Into the Test Suites

The project at hand features an invariant test suite, which, unfortunately, is rather redundant, hence ineffective. Additionally, there are some unit tests that warrant our attention. Consequently, an excellent first step is to run the `forge coverage` command to get an idea of the current test suite under scrutiny.

## Reviewing Test Coverage

Our preliminary exploration reveals that the test coverage is unsatisfactory. Therefore, it's mute to map out our plan of action: We need to scrutinize this test suite, comprehend its shortcomings, infer the invariants, and consequently pen a robust invariant test suite. Afterward, all related findings would be relayed to the client—highlighting their dire need to improve test coverage, expressed as an informal suggestion.

Our last venture had us initially peering into their test suite and buffing it up. By taking this approach, revealing the hidden bugs was a breeze, and it seems likely that this strategy would prove beneficial once more. Nevertheless, this journey would also incorporate a thorough manual review.

## Focus on Proof of Code

An essential part of the auditing process would involve digging deep into the provided code with a fine-toothed comb. While no single approach guarantees success, we'll be implementing the 'Tincho method' with considerably more gravity this time around.

### Workflow Setup with the Tincho Method

Our journey begins in the SRC, using the `solidity metrics` command. The output would be copied in entirety and pasted into a document of choice. I personally prefer Google Sheets due to its easy to use interface and sorting abilities.

![](https://cdn.videotap.com/UrVcjpzYpZgiEY4KluYE-96.32.png)

After eliminating any unnecessary columns, it is sensible to sort the code by size, in ascending order. This list forms the foundation of our audit, providing a linear path of progression from smaller contracts to larger ones.

### Mining the Code: Ifactory sol and ipoolfactory sol

Using the Tincho method, we start by tackling the smallest contract: 'ifactory.sol'. The microscopic size may make it seem insignificant, but give it due diligence.

Shortly after, 'ipoolfactory.sol' comes under scrutiny—the first contract addressed in this session. Notably, this contract seems to interface with the T swap pool factory, as signified by the function 'get pool'.

On closer inspection of the TSWAP code base, we can see that there is indeed a 'get pool' function present in the 'pool factory' ('poolfactory.sol').

A useful annotation to consider:

> 'ipoolfactory' is likely the interface used for communication with 'poolfactory.sol' from TSWAP.

It would be beneficial to jot down these insights as an organized mind note or Google Sheets document, with sections such as 'About', 'Potential attack vectors', 'Ideas', and 'Questions'.

A few starting points include:

- Write about the protocol in your own words.
- Why are we using TSWAP in this context?
- How do flash loans correlate with this usage of TSWAP?

This document acts as a brain dump, helping record initial thoughts, insights, and potential attack vectors. Maintaining an organized note system would likely make your work more efficient.

At first glance, 'ifactory.sol' seems sound without any evident issues, which is a good sign. This quick win aligns with our ideology: to confirm the validity of the smaller parts before progressing onto larger sections.

## Keeping An Audit Trail

Every reviewed snippet is ticked off, allowing us to keep track of our journey and ensure that ground covered is not tread twice.

Our first milestone? 'ipoolfactory.sol': reviewed successfully.

To improve our workflow, we could even factor in stages of review ('first pass', 'second pass', etc.). Our current initiative involves only a single comprehensive review to keep things simple.

## Wrapping It Up: First Review

After this successful review of 'ipoolfactory.sol', we realise that the audited code interacts with an external contract: the pool factory. By understanding these relationships and ensuring the correctness of the smaller contracts, we're paving the way to a comprehensive project audit. Armed with keen eyes and perseverance, we're ready for our next task—be it large or small.
