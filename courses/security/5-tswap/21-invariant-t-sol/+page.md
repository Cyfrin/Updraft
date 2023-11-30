---
title: Writing T-Swap a stateful fuzz test suite - Invariant.t.sol
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/kW17nSlpptA?si=l89WrJ-mDcMC47DY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Testing Smart Contracts with Invariants

Hey there, in this blog post, we're going to walk through how to audit a smart contract using invariant testing. Specifically, we'll use the TSWAP contract codebase. By the end of this tutorial, you'll have a grasp on writing invariant test suites in Solidity.

## Overview

Let's imagine you're tasked with a private audit. You're supposed to help someone stay secure. It's an awesome feeling when you come back with an audit report together with an invariant test suite. As we'll see in this tutorial, it's essential not to dive into looking at the code base before writing testing essentials. So yes, we're going to find bugs without even viewing the code base. Sounds crazy, right? Buckle up!

## Setting Up The Codebase

We'll start by setting up our file structure. In our working environment, let's create a new folder called _invariant_. In this folder, we're going to house two Solidity (.sol) files. The files will be named `invariant.t.sol` and `handler.t.sol`, respectively.

Once we've set this up, we're ready to start writing our tests.

## Building Our Invariant

We'll begin with writing `invariant.t.sol`. We need to start defining our tests by first constructing the 'invariant'.

Building up `handler.t.sol` will require us to dig deep into the codebase. However, we can get away with developing `invariant.t.sol` a little bit blind. It allows us to commence testing without scrutinizing the entire contract.

## Constructing Mock Tokens

While preparing our test environment, we realize that our contract is interacting with the WETH token and a particular poolFactory. These factories take in WETH tokens as an input parameter. Therefore, as part of our setup, we're going to create mock tokens.

Let's create another directory named _mocks_ where we will create some mock tokens. We will need one file called `ERC20Mock.sol`:

We then proceed to create an `ERC20Mock`, which derives from `ERC20` token.

This way, we prepare a simulated environment where the tokens we will use do not have actual value, which is critical for safe and responsible testing.

## Writing The Handler

With our tests set up, our next step is to write the handler. While we could write asserts directly in our invariant, the cleaner approach is to compute these in the handler. This way, our assert becomes a one-liner:

This way, we can ensure that our logic holds, regardless of the varying input parameters. In developing more complex software or systems, invariants play a crucial role in enforcing correctness.

## Conclusion

Well, it's been a long post! Whew. But there you have it, you now have a good grasp of writing invariant tests for your smart contracts. Remember, practice makes perfect and don't shy away from puzzling your brains. It's part of the fun in blockchain development. Keep practicing!
