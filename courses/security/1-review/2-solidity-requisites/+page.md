---
title: Solidity Pre-requisites
---

_Follow along with this video_



---

Whipping up Solidity contracts seems daunting? Or you're simply new to Foundry? Don't fret, we've got you covered. Before we venture into the wonderful and wild world of Security, it's important to get a strong foundation. The Foundry full course is a fantastic resource to embark on, if you haven't took that course yet don't forget to check that out here at Cyfrin Updraft.

> "A solid foundation in Solidity is the key to successfully creating sophisticated smart contracts."

## The Prerequisites: Solidity Basics

To keep up with this guide, there are some prerequisites that will make your journey smoother. You should be comfortable with Remix and understand how to use the 'compile' and 'deploy' buttons. Being able to deploy something locally and on a testnet using MetaMask (or another wallet) is a crucial skill. Basically, if you're cozy with coding locally or via a cloud provider, then you're on the right track and should follow along effortlessly.

```shell
$ mkdir basic-solc-project
$ cd basicSulkProject
$ forge init
```

So, what’s that? Well, that’s how you usually set up a project. By now, you should be familiar with the set up on your left-hand side, with your scripts, your `src`, your tests and if you aren’t— don’t worry! Foundry will soon be your new best friend.

## Understanding Foundry

Within Foundry, we've got a basic counter smart contract, including a set number and an increment number. Features within this setup should be familiar, ranging from the license Identifier to the Solidity version and other contract aspects.

Should you stumble upon `forge Build`, it will seem familiar as well. It's all about compiling your contracts. If you're curious to see what's under the hood with your code testing, take a look at the 'counter t.sol' in the test folder.

```shell
$ forge test
```

The basic test setup contains two distinct test types, a regular test (assert equal) and a Fuzz test.

<img src="/security-section-1/2-solidity-req/sol-req1.png" style="width: 100%; height: auto;" alt="block fee">

## Exploring Test Types: Regular Test and Fuzz Test

In the regular test, we merely incept the counter contract and increment it, ensuring the counter number equals one. The Fuzz test, however, involves passing a random number into our test.

As you may recall, we run this test with a certain number of runs, using different random numbers. No matter the chosen value for X, the test will always hold.

How do we change the number of fuzz runs? Simply browse to Foundry's TOML file and copy the variable.

```markdown
[fuzz]
runs = 256
max_test_rejects = 65536
seed = "0x3e8"
dictionary_weight = 40
include_storage = true
include_push_bytes = true
```

In the TOML file, you have the ability to set the number of runs. For instance, we could change it from 256 to 600.

```shell
$ forge test
```

Voila! You'll see that the test Fuzz ran 600 times. This indicates that the test ran with 600 different random numbers.

## Advanced Fuzzing: Stateful Fuzzing and Invariant Tests

On to the next level – **stateful fuzzing**, also popular as invariant tests in the Foundry universe. This aspect of coding might not be your forte yet, but no worries. We're here to guide you towards proficiency.

Prep up and get ready to dive into the exciting world of fuzzing, stateful fuzzing, and invariant tests. Let's dig deeper and explore this advanced but rewarding aspect of Smart Contracts design in Foundry.

Are you ready to swim with the big fishes in the Solidity sea? Let’s dive into the deep together.
