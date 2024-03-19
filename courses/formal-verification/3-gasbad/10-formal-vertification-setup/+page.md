---
title: formal vertification setup
---

## Kickstarting the Verification Journey

First things first. Roll up your sleeves and create a new file named `gasbad_spec`, where we'll be jotting down all our verification escapades for Gas Bad. Just like we would at `gasbad.com`, but cozy within our own code environment. I'll be borrowing (okay, maybe more like copying and pasting) some configuration settings from `gasbad_spec` – because, why reinvent the wheel, right?

Now, time for a tiny bit of rule-bending. Don't give me that look! It's all in the name of progress. Here's an inside tip: our `optimistic_loop` is going to be `true`, and we’re dialing the `rule_sanity` down to `basic`. We've toyed with these settings enough to know they're the right fit for the job at hand – verifying the heck out of Gas Bad.

### Diving Deeper into the Specs

Alright, into the nitty-gritty. Verification's not just a breezy stroll in the park. So, as we're lining up our digital ducks, you'll want to keep your eyes on the prize: the `GasBadNFTMarketplace.sol` file. This beauty is the protagonist of our story – where the main marketplace action unfolds.

But what's a protagonist without a foil? Enter `NFTMarketPlace.sol`, the more mainstream cousin we're juxtaposing Gas Bad against. By comparing these two, we can suss out just how Gas Bad is carving its unique space in the crowded marketplace.

Now, let's not forget about the NFTs themselves. It wouldn't be a marketplace without goods to sell. So, we'll be wrangling with `NftMock.sol` – our test NFTs, created for the sole purpose of making our verification stage feel as real-world as possible.

### What We're Validating

You might be wondering, "What exactly are we validating here?" Well, we're sticking with our tried-and-true `optimistic_loop` and `rule_sanity` set to `basic`. It's a solid start. But hold onto your hats because we might throw in another `proverg` into the mix soon. Don’t worry; I’ll walk you through that when it’s showtime.

## Setting the Stage for Success

Before we type another character, it's storytime! Imagine a bustling digital marketplace, a cacophony of "Buy!" and "Sell!" filling the air. Our job, as the savvy verifiers we are, is to make sure this marketplace is a smooth operator – that the wheels turn without a squeak. How do we do that? With a little something called formal verification.

![](https://cdn.videotap.com/618/screenshots/b4WV2MatF6QeMXviS1pc-53.57.png)

But verification is not just shooting in the dark. We need our trusty `README`, our roadmap to verification success. This not-so-little file tells us what aspects we've got to put under the microscope. It's our guide through the jungle of code – where the wild bugs lurk.

So, we roll up our sleeves (if they aren't rolled up high enough already) and delve into the `gas_spec`. Think of it as our canvas, where we'll paint a picture of validation so pristine, it might just hang in the Louvre (if the Louvre showcased code, which, let's face it, is truly an art form).

## The Readme: Our Beacon in the Storm

Our `README` isn't just a lifeless document; it's a treasure map. And like any good adventurer, we follow where it leads. This radiant parchment details the very things we must formally verify. Metrics, algorithms, interfaces – the gang's all here.

"Let's do it," I say, and we embark on our quest. Line by line, we dissect the instructions, aligning each checkpoint with our code. It’s like a cosmic alignment, where every planet is a piece of our Gas Bad universe coming into perfect harmony. And trust me, when those planets align, it’s satisfaction like no other.

## The Play-by-Play Verification

This isn't your typical blog post where I tell you how wonderful everything is and leave out the tough parts. Nah, we're in this together, coding and verifying side by side. As we proceed, the `gas_spec` looms before us, waiting to be filled with our brilliant verifications. Think about it as painting by numbers, but the picture is a bug-free Gas Bad marketplace.

So, a little recap: we've set our verification settings, eyed our files, and prepped our `README`. What's next? We plunge into the thick of it, fleshing out verifications for each parameter outlined before us. Step by methodical step, we examine the code, ensuring it aligns with best practices and anticipates potential pitfalls.

### Listening to the Pulse of the Blockchain

But why, ask you might, are we doing all this? Here’s a standout nugget for you:

> "In the heart of the blockchain, where transparency reigns supreme, verifying the integrity of an NFT marketplace isn't just a nice-to-have – it's a must."

Just let that sink in.

Verifying Gas Bad’s NFT marketplace serves as a pulse check. It dissects the innards of the code, making sure every transaction, every bid, every transfer is a textbook example of how a marketplace should function. After all, the blockchain's no place for amateurs, and we’re here to prove that Gas Bad is playing in the big leagues.

And let’s not forget that trust is the lifeblood of any marketplace. By donning our verification caps, we are the keepers of this trust, ensuring participants can trade with confidence, knowing the system's been given a clean bill of health – or will have, once we've finished with it.

## Conclusion: The Art of Verification

Wrapping up this epic journey through the dense jungle of NFT marketplace verification, we emerge somewhat wiser, slightly exhausted, but undoubtedly victorious. From setting up files to deep-diving into code and anticipating future improvements, you've seen it all. Gas Bad's marketplace stands verified and validated, ready to take on the world.

Remember, this isn’t just about debugging or preventing errors. What we’ve done is weave a safety net so finely meshed, it catches anything that dares to be less than perfect. And that, my friends, is no small feat.

By aligning with the faithful `README`, utilizing the smart specs, and conducting a meticulous verification process, we've painted a masterpiece of digital security and reliability. Who knew code could make such a beautiful picture?

Stay curious, keep verifying, and until next time, keep your code clean and your specs clearer. Catch you on the flip side!
