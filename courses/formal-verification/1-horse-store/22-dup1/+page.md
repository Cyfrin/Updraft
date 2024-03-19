---
title: DUP1
---

---

# Function Selector Optimization in EVM: The Trick to Saving Gas

Hey there, fellow coders and blockchain enthusiasts! Have you ever stumbled upon a pesky problem regarding function selectors in your smart contracts? You know, those moments when you're not quite sure if the smart contract is actually calling the right function—or, let's say, "the read number of horses function selector"—that sounds about right.

Well, you might be thinking, "That's easy! Just don't jump!" And at first glance, you're absolutely correct. But there's a catch. If we go down that road without any further action, we find that our stack is essentially naked—nothing on it.

![Stack screenshot](https://cdn.videotap.com/618/screenshots/JPzcO7vPGFpESeMmtNCm-48.05.png)

It's a bit like finding yourself in the middle of a desert, no water, no compass—just vast nothingness. Of course, we could just run the whole shebang again and nab that function selector once more. Sure, it's doable, but let me whisper a little secret in your ear: there's a much easier route that also saves you on gas—a precious commodity in the Ethereum ecosystem.

Here's the trick. We snag the function selector initially, and before we do any type of checking, we pull a quick duplication move. It's like having a double-check system firmly in place. This clever maneuver comes at a lower gas cost than the alternative, which would involve repeating a series of opcodes.

```
DUPE1 // The magic spell
```

## Unpacking the Gas-Saving Magic of `DUPE1`

Solidity, our faithful yet sometimes clumsy companion, might not always be sharp enough to concoct these gas-saving strategies by itself. The Solidity compiler may just regurgitate the function selector the old way. But lo and behold, we can outsmart it by invoking the `DUPE1` opcode.

For those of you diving deep into the world of EVM codes, `DUPE1` is your friend, your pal, your trusty sidekick. Its mission? To clone the item at the top of your stack with finesse. You lay down the value to duplicate, and voilà, it tops off your stack with a carbon copy.

![DUPE1 illustration](https://cdn.videotap.com/618/screenshots/8n4tnR2VLGPpkomzqSQI-83.png)

Now, with "DUPE1' added to our repertoire, our setup is looking sharp. Whenever we reach a comparison point—an `update` function selector comparison, to be precise—the stack is going to showcase a beautiful sight: the original function selector accompanied by its twin.

```
// Prior to DUPE1<Function Selector>
// Lonely and singular
// After DUPE1<Function Selector, Function Selector>
// Twice as prepared
```

> "Two is company when it comes to function selectors—a mantra for gas efficiency."

So, by the time we hit the update jump, we're sailing smoothly. Even if we decide not to take the leap and jump, the function selector remains intact, patiently waiting on the stack, ready for its next moment in the spotlight.

Huff programmers and Solidity veterans alike know this setup all too well. It's a well-worn path beaten by countless transactions. If we had a parade of function selectors, we'd probably chant `DUPE1` again and again. But since this is our final curtain call, there's no encore needed.

## Parting Thoughts

The nuances of Huff versus Solidity can sometimes feel like navigating a labyrinth, but it's optimization opportunities like this one that make the journey worthwhile. It's not just about saving gas; it's about honing our skills, about being the maestro of our own code, conducting an orchestra where every opcode plays its part in perfect harmony.

Incorporating these small yet pivotal changes into our smart contract repertoire not only augments our developer toolkit but also reflects on our evolution as craftspeople of code. So next time you find yourself engaged with function selectors, remember the duplication dance, and let 'DUPE1' be the beat to which you sway.

Well, there you have it, my coding comrades—a little insider trick to keep your smart contracts lean and efficient. May your stacks always overflow with purpose and your gas fees stay minimal!

Until next time, keep those selectors duplicating and those contracts executing!
