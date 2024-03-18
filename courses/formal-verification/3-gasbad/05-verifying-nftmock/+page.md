---
title: verifying nftmock
---

## Setting Up Our Working Environment

Before anything else, let's roll up our sleeves and prepare our workspace. We'll begin with the basics: creating a new file named _certora_. It's like setting up a new campsite; you want everything organized and ready to go. Remember to export our Certora key – we'll need it, and we don't want any hiccups later on with missing credentials.

```bash
export CERTORA_KEY=your_actual_certora_key_here
```

Next up, we're going to construct two folders to keep things tidy. One for the configuration files, let's call it `comp`, and another named `spec` for all the specifications we're going to write. Think of them as dedicated drawers for your tools and blueprints.

## Crafting the NFT Mock Configuration File

With our folders in place, it's time to roll up the blueprint for our NFT mock. I'll guide you through creating a configuration file named `NFTmockComp`.

```bash
touch NFTmockComp
```

Even though we're taking baby steps, I strongly suggest doing this manually to get comfortable with the workflow. In this file, we need to let Certora know which files it should keep an eye on. In our case, it’s the `NFTmock.sol` file located in our test mocks directory.

Here's a snippet of what your configuration might look like:

```bash
include:- ./path/to/your/test/mocks/Nftmock.sol
```

While you might not always need to spell everything out, I find clarity to be an excellent policy. You'll thank yourself later for being meticulous when revisiting your configs weeks or months down the line.

Now, what's the star of the show? You guessed it, our `NFTmock` contract. This is what our verification efforts will target.

## The Spec File: Where the Rubber Meets the Road

Let's pivot and shape up our spec file, aptly named `NftmockSpec`. This is where we define the rules and checks that Certora will use to verify the correctness of our contract. For start, we can go simple with:

```solidity
rule sanity {verify:true}
```

Yes, I know, it's simplistic, but even making sure that `true` is indeed `true` is a step in the right direction. Think of it as a quick nod to ourselves saying, "Hey, the system works!"

## Running Certora and Evaluating Output

After laying down our configuration and spec files, we must summon the almighty Certora prover to do its magic. Now, be patient here because Certora Prover is like a fine artisan, meticulous and not to be rushed. You can run it with a command similar to this:

```bash
certoraRun path/to/your_contract.sol --config path/to/your_config.yaml
```

Don’t worry if you’re not up for running the prover as much as I do. I'm a bit of an enthusiast, to be honest. You can follow along and learn from my experience for now.

When it's all said and done, if all you get is a simple success message, you might wonder, "That’s it?". But hold your horses! You see, there's more to it.

## Reading Between the Lines: Sanity Check Failures

Suppose we take a moment to scrutinize the prover's output more closely. In that case, you'll notice the helpful – albeit a tad blunt – feedback when you've set up an easy-to-pass test, like with our `rule sanity`. Certora isn't shy about calling out the obvious, which is excellent because we want that honesty to push us toward writing better, more meaningful specs.

If you encounter an output similar to the following, don't sweat it – it's teaching us to do better:

```plaintext
Rule sanity failed:This rule is too basic, consider adding more meaningful tests.
```

Understanding these outputs is crucial as they inform us on where the spec might fall short and how we could enhance its integrity.

## Wrapping Up and Looking Forward

Congratulations! You've now got the basics of setting up and running a Certora verification for your NFT mock contracts. While our journey today was relatively rudimentary, it serves as a steadfast foundation for the more complex adventures in smart contract verification that lie ahead.

In future sessions, we'll delve deeper into tailor-fitting your specs with custom rules and nuanced checks, stepping beyond the "hello world" of contract verification. Don't forget to pat yourself on the back for setting up and successfully running a certora check, no matter how straightforward.

---

Remember, exploring new territories with tools like Certora is how you sharpen your skills and adapt to the ever-evolving landscape of blockchain development. So stay curious, experiment often, and never hesitate to write that extra spec or config line that could make all the difference.

Until next time, keep on verifying, evaluating, and setting the standard in smart contract excellence!

_Upgrade your smart contract verification game with Certora._

> "Exploring new territories with tools like Certora is how you sharpen your skills."
