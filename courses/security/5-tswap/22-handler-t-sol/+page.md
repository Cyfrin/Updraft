---
title: Writing T-Swap a stateful fuzz test suite - Handler.t.sol, Deposit Function
---



---

# Breaking Down DeFi Audits with Invariant Testing

In this deep dive into DeFi audits, we will be covering a wealth of material ranging from DeFi to invariant testing. Do remember that we're dealing with complex topics, so if things are not making perfect sense, take a breather, and continue at your own pace. You're doing great by simply trying to digest this sizable chunk of advanced concepts.

## Building a Handler

Let's start with the task of building our handler. A common technique that comes in handy when addressing large problems is to break the problem down into smaller segments. We're taking this approach with our handler development.

In our contract, a constructor will create a TSWAP pool. Now, we need to test an invariant that the change in `X` (token balance) is equal to the expected change in `X`.

Within our handler, we'll want to implement at least two main functions: a deposit function and a swap function. For the purposes of this tutorial, we’ll focus on `deposit` and `swapExactOutput` functions as a starting point.

## Decoding Function Documentation

One advantage we have while trying to understand these functions, is that the documentation is quite helpful. If there were no docs, we'd be wading through the code itself, which could be much more time-consuming.

Taking `swapExecOutput` for example, the function documentation illustrates its working as follows:

> swapExecOutput figures out how much you need to input, based on the output you want to receive. For instance, if you want ten output tokens of WETH and you're inputting DAI, the function will calculate the amount of DAI needed to get you the desired WETH and execute the swap.

Such explanations in the documentation significantly facilitate understanding of the code, thus contributing to making the auditing process relatively less time-consuming.

## Keeping Notes

While working through the process, it's good practice to keep notes or record findings, especially when there are missing parameters as we've noticed in the `swapExecOutput` function. Let's do this to maintain an audit trail for future reference.

Here’s a simple note example:

> Notes:Audit findings:Missing param in NatsSpec, missing deadline param in `swapExecOutput`. Also, remember to check with the protocol team for any documentation for better audit efficiency.

## Setting up Core Handler Actions

Back in our handler, we want to focus on two primary actions, at least to start: depositing and swapping.

To perform a deposit, we need access to the tokens. For swapping, we're likely to use `swapExactOutput`. We'll begin by implementing these, and gradually build from there. By writing a Fuzz test suite to execute these actions, we will not only be contributing to better code quality, but also making the protocol safer.

Let's begin with creating our deposit function.

## Constructing the Deposit Function

Our deposit function begins by defining our tokens, in this case, WETH and Pool tokens.

With the availability of these tokens, we can proceed with determining the amounts for tokens to deposit, ensuring we set reasonable amounts to avoid overflow errors. The quantity of WETH to deposit will dictate the corresponding change in the Pool tokens.

Once we execute the deposit, we compare our expectations (expected delta) with the actual changes in the Pool and WETH tokens.

We are effectively done with our deposit function, but we didn't sign up to only handle deposits; we're here to test the swap invariant.

## Building the Swap Function

The auditing process includes verifying code and ensuring that invariants hold through operations like swaps. That's part of what we're trying to achieve here, which brings us to create our swap function.

> "Remember, the bigger the vulnerabilities you uncover, the bigger the improvements you can make, ultimately contributing to the overall safety of DeFi protocols and the blockchain ecosystem."
