---
title: Reporting Continued
---



---

# Audit Deep Dive: Understanding Smart Contract Vulnerabilities

When it comes to auditing smart contracts, there are a lot of nitty-gritty details that one needs to pay attention to in order to prevent possible vulnerabilities.

Throughout this detailed walkthrough, we're going to focus on the process of identifying issues within code, their potential impact, and proposed solutions.

But before we dive in, let's address some essential concepts:

- **Constants**: These are unchanging variables that are quite common within code and should always be treated as such.
- **Informationals**: These are facts or pieces of data provided in the code intended to be helpful, but if not emitted correctly, they can cause confusion.
- **Audit comments**: These serve as notes during code reviews, particularly useful when something needs to be addressed later.

## Highlighting the Importance of Reporting

During an audit, it's important to report anything that could potentially refactor the code to improve its overall quality. One simple way is to state "reported" whenever we encounter any issues in the code.

## Understanding the Importance of Code Layout

The code layout plays a crucial role in readability, maintainability, and usability. It is not uncommon to suggest relocating a section of code (such as ‘audit info’) that might provide more clarity in another position.

## Liquidity Add Misstep

At one point in our code, we encountered an instance where 'liquidity added' was incorrectly ordered. Missteps such as these could lead to the emission of incorrect data. To provide clarity:

Liquidity added has parameters out of order.The root cause is the TSWAP pool.The event has parameters out of order, causing the event to emit incorrect information.

## Severe Impact Issues

We found two severe issues during our audit:

1. **Order of Parameters Issue:**

   In the function `addLiquidityMintAndTransfer`, a liquidity added event is emitted, but the values are logged in the wrong order:

   When the `liquidity added` event is emitted in the `add liquidity mint and transfer` function, it logs values in an incorrect order. The pool tokens to deposit value should go in the third parameter position, whereas the WETH to deposit value should go second.

2. **Fee Calculation Error:**

   The `getInputAmountBasedOnOutput` function was found to have an incorrect fee calculation, which causes the protocol to take too many tokens from users:

   The `get input amount based on output` function in the TSWAP pool is intended to calculate the amount of tokens a user should deposit given an amount of output tokens. However, the function currently miscalculates the resulting amount when calculating the fee.

Both of these issues cause a significant detriment to the users and need immediate addressing.

## Power of Writing Proof of Codes

Writing 'proof of codes' is a crucial skill that every auditor should have. It helps not only in proving the existence of issues but also in testing the codebase for other potential vulnerabilities. For example, a 'proof of code' was written for the incorrect fee calculation issue to highlight how much the protocol takes as fees and the actual value.

## Impact of Small Code Errors

Even small errors or inconsistencies in the code can have large implications and result in incorrect information being disseminated. Such was the case with the `Swap exact input` function, where an incorrect return value was always being given(0) irrespective of the actual values.

In conclusion, auditing requires a keen eye for details, significant knowledge of smart contract coding, and a thorough understanding of possible vulnerabilities. Avoiding magic numbers, maintaining consistency in reporting, and having proficiency in writing 'proof of codes' are all crucial factors to conducting a successful audit.

We hope that this detailed walkthrough gives you perspective and jumpstarts your journey towards becoming a proficient smart contract auditor!
