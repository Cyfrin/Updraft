---
title: persistent ghosts
---

## What's Haunting Your Code?

Let's talk disruption. In programming, especially when you're dealing with smart contracts, there's this thing called a havoc. It’s not a smoke machine and eerie lighting effect. Instead, it's a moment of chaos where randomization screws with your otherwise pristine variables, making everything go haywire.

Now, imagine you've got some ghost variables wandering through your codebase. These aren't your typical variables; these are meant for verification purposes, to check if your smart contracts behave as expected. But non-persistent ghosts and havoc? It's like a haunted house - pure mayhem.

That's where the keyword `persistent` struts in, cape billowing like a hero in a tech novella. It’s the magic incantation that tells the havoc, "Nope, you're not touching my ghost variables!"

### The Brilliant Fix and its Kryptonite

So you've gone ahead and marked your ghost variables as persistent – smart move. You run your satora tool to verify your code, and bingo, all is well in the kingdom. You might think, “This is awesome! Let there be a mapping update and emit an event while we're at it.” But hold your horses for a second.

The idea seems bulletproof, yet therein lies the catch - it's a tad unsound. In tech-speak, that means what you're doing is kind of like ignoring a sneaky bug because you don't want to deal with it. Persistent ghosts will indeed let you pass the verification test with flying colors, but at what cost?

For every external call, every `saveTransferFrom` that could update storage, your persistent ghosts stand their ground, blissfully oblivious. Sounds good? Well, not quite. In certain scenarios, this is precisely what you want - for specific side effects to get the cold shoulder from your variables. But let's not make it a habit to sweep things under the rug, shall we?

### The Real Deal with Persistent Ghosts

Here's the crux of it - persistent ghosts are handy, no doubt. They let you keep your sanity when havoc ensues, ensuring your ghost variables are steadfastly consistent. But they also teach you a valuable lesson: writing formal verification specs requires a lot of thought, a ton of attention to the what-ifs, and a sprinkle of foresight.

You might find yourself in a situation where the smart contract has some unknown side effects - stuff you didn't anticipate. The persistent ghosts, in their unyielding nature, would simply turn a blind eye.

> _"But oftentimes we don't want to just make these persistent..."_

This quote from the original talk strikes right at the heart of the issue. As inviting as it might be to wield the persistent attribute like an all-conquering sword, we need to be mindful of its power.

## The Bigger Picture

So what's the take-home lesson here? It's not that using persistent ghosts is wrong - far from it. It’s about using the right tool for the job. In some cases, persistent ghosts can be your best friend, offering a simple workaround to a verification quagmire. In other cases, they can lull you into a false sense of security, masking the true behavior of your smart contracts.

The art and science of formal verification are like balancing on a tightrope. You're constantly weighing the pros and cons, figuring out how to maintain the integrity of your code while accounting for every possible scenario.

To sum it up, persistent ghosts are an ace up your sleeve - a clever tactic in the coder’s handbook. But use them wisely, and always with a keen eye on the broader impacts they might have. Moving beyond the cheap and easy fix is what will ultimately future-proof your code and elevate your verification specs to new heights.

Remember, in the end, it's not just about getting that green checkmark from a verification tool. It’s about knowing, beyond a shadow of a doubt, that your smart contracts are as robust, secure, and foolproof as they can be. So, the next time havoc comes knocking at your door, you can be ready - with or without persistent ghosts.

Happy coding, and may your variables ever be (persistently) ghostly!
