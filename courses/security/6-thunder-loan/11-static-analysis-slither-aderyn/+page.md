---
title: Static Analysis Slither + Aderyn
---



---

# Solidity Foundry Project: Running Slither and Aderyn

Welcome back! In today's blog, we're going to throw ourselves into the heart of a Solidity foundry project. Unfortunately, there are no diagrams to help us along the way, but no worries, because we've got two brilliant tools at our disposal: **Slither** and **Aderyn**.

## Setting the Stage: Your Make File

For this project, and any Solidity project moving forward, a typical **make file** will embrace a little Slither command line action and be embellished with a Slither Config JSON file.

The Slither Config JSON that I am fond of using, you can tailor as per your project needs. What makes it special is the string of flags that are manually turned on or off to procure meaningful Slither outputs. _Fun Fact: You might notice I don’t include a few detectors like conformance to Solidity naming conventions or incorrect versions of Solidity. That’s because I have a fair share of taste for unconventional naming and most folks aren’t using 0.8.18 versions but rather zero point 20._

Next, in our mission to make the Slither output as concise and helpful as possible, we make sure to filter paths to avoid pulling in redundant information from mocks, tests, scripts, upgraded protocol, or dependencies. This ensures we don't muddle our results with data from libraries.

## The Bug Hunt Begins

On initiating Slither, we did hit something noteworthy, a bug! The first info detected was thunderloan update. The problem lay in that the action of the code `s_flashloan fee = new fee` was not triggering an event emission. This was in Thunder Loan line 269.

Now, let's get to the heart of the update flash loan fee function. We spotted a `s_flashloan fee` variable. When we investigated further, it was found to be a storage variable.

> Important: Whenever a storage update occurs, it is mandatory to emit an event.

To make a note of it for the auditor, we wrote `@audit: low must emit an event.`But that's not the end of it. We found more issues with Slither.

## Fishy Thunderloan

Slither also pointed out the possibility of reentrancy vulnerabilities in the Thunderloan flash loan because of external calls being made. We're not entirely sure of the severity, but we mark these for a follow-up review.

> Note: Be sure to check out the mentioned lines (#204, #181) in Thunderloan for potential reentrancy vulnerabilities.

## Beware the Old Yellow

Finally, Slither pointed out a yellow alert, which was a little concerning. The problem was that the return value of an external call was not stored in a local or state variable. Again, we must make a follow-up note of this and verify later if it's a grave issue.

With the last yellow alert, we've run through all theing that Slither had to offer. However, we're still not done. Next, we need to run Aderyn.

## Round Two: Aderyn

After running Aderyn, a report is generated. The report can be checked for any potential issues and, if need be, compared with Slither's findings.

And voila, that's how you navigate through a Solidity project with the help of Slither and Aderyn. By doing so, you can identify potential vulnerabilities and build better, safer code. Until next time, happy coding!
