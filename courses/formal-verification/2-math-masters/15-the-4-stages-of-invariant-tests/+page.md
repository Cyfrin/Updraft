---
title: Formal Verification - The 4 stages of Invariant tests
---

---

### Getting Started with Repository Cloning

First things first, let's lay the groundwork. Venturing into testing for exploits in smart contracts, we'll need to work with a repository brimming with examples and solutions particularly devised to curb these security loopholes. This repo is an Aladdin's Cave containing methods to scan, reminisce, play, and penetrate the defenses of smart contracts via different testing paradigms.

Feel free to clone it wherever you fancy. I'll be anchoring the repo into my "opcode_FV" directory, but the choice is yours. The fundamental idea here is to craft an environment where testing isn’t just a phase—it's a hands-on, immersive experience.

)Let's address the "Invariant Break" folder found within our test folder. What’s an invariant, you ask? Think of it as an unbreakable rule that our code must uphold—a digital oath that should it break, signifies a breach in our code's armor. Take the leap and open this folder; we're about to pit fuzzing against formal verification head-to-head.

### Initialization and Setup

Ensuring you're on the right track is crucial, so let's swing by our readme file. It’s the compass that’ll guide your installation journey, ensuring Foundry is snugly installed along with other essentials without any snags like FFI being enabled when it shouldn't.

If you're greeted by a warning about "self destruct," don't panic—it's all part of the plan. This red flag is a conscious choice showcasing the pitfalls of such commands in practice.

### Understanding Formal Verification

Before we entangle ourselves in the code, let's chat about formal verification. It's vital to grasp what lies beneath. Picture every chunk of your code undergoing a metamorphosis into this language SMT-Lib, which then gets tossed into a SAT solver, a sort of digital crucible that distills your code to a simple verdict: true or false.

For the curious minds eager to master SMT-Lib, embarking on that learning expedition on your own is encouraged. However, as for the rest, think of formal verification as a mysterious black box; you hand it your code and wait for that thumb up or down.

#### Pros and Cons of Formal Verification

Blockquote:"Formal verification can give you peace of mind, ensuring with certainty that a particular property in your code is error-free. However, it's not without its drawbacks. It can sometimes lead you into a false sense of security or setup challenges, and can also be painfully sluggish."

### Hands-on Testing

Now, back to the action! Rev up your engines; we're starting with stateless fuzzing. It's our base level—our Mario before the power-up mushroom, if you will. It's a simple test; hurl enough random calls, and we’re bound to hit a snag if one's lurking. Here's a sneak peek:

Let's spin this up and see it in action. `forge test --mt` will unmask the flaw, echoing the problem loud and clear.

![](https://cdn.videotap.com/618/screenshots/NsLB6Ryk1YjiYSl3Gcwg-341.45.png)

Now, let's crank up the complexity with stateful fuzzing. Stateless was child's play; now we're adding layers. This step requires more than random chaos—it demands sequences, hitting the right functions in the right order to reveal the weak spots.

Rolling twice the lucky dice, stateful fuzzing rises to the occasion where its stateless sibling falters. You'll find this version of ingenuity in contracts requiring a sequence of functions to trip the wire. The testing scripts evolve, accommodating the sophistication needed to put the contract through its paces.

![](https://cdn.videotap.com/618/screenshots/8rOhbkQ4NHbaxewobdLZ-368.41.png)

### The Handler Difference

Sometimes, when the contract complexity balloons, even stateful fuzzing can't keep up. The permutations skyrocket beyond our grasp. That's where directed fuzzing with a handler enters, slicing the possible inputs with surgical precision to home in on the problems.

The handler narrows the chaos down to manageable bits, mirroring a maze-solving mouse that’s fed just the right turns. Witness as the once-impassable becomes traversable, the bug surfaces, and the invariant falls.

![](https://cdn.videotap.com/618/screenshots/1Q1EcfnPgulMFuGAw0a1-476.23.png)

### The Assurance of Formal Verification

Now, let’s give it up for formal verification, the knight in digital armor. While fuzzing is a champ at uncovering bugs, it can't always assure you that all is well. It's that slim chance—the sneaky bug that fuzzing might miss—that keeps us up at night. That’s where formal verification steps in; it’s that seatbelt that offers a comforting sense of security—provided it's strapped correctly.

Points to mull over:

- Fuzzing will find bugs with lightning speed—most of the time.
- The rare, elusive bug that fuzzing misses is often the catastrophic one.
- Formal verification bestows certainty on a singular property of your code.

### Insights from the Field

Consider this tweet by Zach X—an anecdote where even colossal fuzzing sessions missed the mark. It took a Herculean effort to unmask the issue, where formal verification could've sauntered in and identified it without breaking a sweat.

Don’t just take my word for it. The Sartora tool has case studies filled with peculiar, near-catastrophic exploits snagged just in time. These are the cautionary tales that underscore the might of formal verification in upholding the sanctity of protocols.

### A Deep Dive with the Experts

Still thirsting for knowledge? There’s a treasure trove of information provided by formal verification wizards ready to be explored. For an insightful expedition, the lecture by Torres CEO is a must-watch. It's an expert's gateway into what formal verification truly means—a lighthouse guiding you through the foggy waters of smart contract safety.

Final Thoughts:Firmly grasping the power and limitations of different verification methods isn’t just good practice—it's vital in safeguarding the integrity of your projects. Whether it's the rough-and-ready fuzzing or the precision of formal verification, the key is striking the right balance and knowing when to deploy each tool in your armory. Happy coding!
