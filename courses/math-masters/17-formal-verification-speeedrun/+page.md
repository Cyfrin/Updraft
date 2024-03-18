---
title: Formal Verification Speedrun (Optional Video)
---

---

### What is Formal Verification, Anyway?

Think of formal verification as the souped-up cousin of unit testing. In essence, it's all about transforming your code into mathematical expressions, enabling you to prove its correctness with the certainty of a mathematician. This is no child's play; we're talking big stakes here. A single slip-up in your smart contract can mean kissing goodbye to stacks of cash (yup, half a billion dollars does have a certain ring to it), making the process more crucial than ever before.

### Formal Verification Tools: A Trio Of Excellence

To illustrate just how incredible these tools are, I've concocted a function that's basically pandemonium in code form. It's the kind of function that would send Milo truck (an utterly fictional but impressively competent auditor) into cardiac arrest. It's got additions that subtract, divisions masquerading as additions, and a cacophony of similarly named variables—number, nimbur, mumbu, nimbor, nimber—each craftily distinct.

Let's cut to the chase with our code calamity, ingeniously named hellfunk, and put three formal verification tools to the test—tools tailor-made to handle such devilry with ease.

#### The Failer: Fuzzing's Faux Pas

Before we do our tour-de-tool, here's what not to rely on: fuzzing. Sure, it's like shooting in the dark and hoping to hit the target, but our test case, despite hundreds of runs, blissfully skips over the bug lurking in the shadows. A thousand tries later, and we're still none the wiser. It's clear we need a sharper arrow in our quiver.

#### Hero #1: Halmos - Your Logical Lifesaver

Enter Halmos. This gem takes your run-of-the-mill fuzz test and infuses it with formal verification finesse. Run the magic command, and it whips up a solution that cuts to the chase—99 is our culprit. Here's to Halmos, the hero we didn't know we needed!

#### Hero #2: Control - The Marathoner

Moving on to Control. Picture the same fuzz test, but with a nifty add-on—a cheat code for infinite gas (because who really counts gas during formal verification, right?). Compile your contracts, dot the i's, cross the t's, and initiate Control. Fair warning: it's coffee break lengthy. But once Control works its magic, you’re served with a comprehensible model of where your code passed or tripped up.

```shell
control build && control prove
```

_Heads up: Perfect for a power nap._

#### Hero #3: Certora - The Aesthetic Analyzer

Finally, Certora steals the spotlight. It demands a tad more setup, with a special lingo called CVL (Certora Verification Language). But it's well worth it. Define the rules, add some requires, and voila! Run your command and behold a UI so sleek, it's practically art.

_The outcome? A resounding bug detected, wrapped in a visual treat. Thanks, Certora!_

### From Chaos to Clarity in Code

Here's the thing: each of these tools brings its A-game to the table, transforming what could've been formal verification folklore into something genuinely attainable. Want to dive deeper and get hands-on with the code? Channel your inner detective and explore the repositories I've mentioned. You’ll find the good, the bad, and the downright fuzzy.

_Blockquote: "Harness the mathematical power to convert your code into certainties. It's your code, but mathematician-approved."_

![](https://cdn.videotap.com/618/screenshots/2dIlhVPrE1vdjK9eoEuT-190.47.png)

### Ready, Set, Verify!

This whirlwind tutorial on formal verification tools ought to elevate your dev game from coding by chance to proving by mathematics. No longer is formal verification a hallowed ground for the enlightened few; it's here for you to command and conquer.

So, when the challenge rears its head and your code defiance cries for validation, march forward armed with Halmos, Control, and Certora—your verification vanguard. Brew that coffee, take that nap, but once you're all set, let these tools weave their numerical magic and emerge triumphant, one verified function at a time.
