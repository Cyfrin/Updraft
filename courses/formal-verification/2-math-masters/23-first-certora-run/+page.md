---
title: Your first Certora Run
---

---

## Breaking It Down: The Tone, Vocabulary, and Audience

As we leap into the transcribed excerpt, we can immediately sense a casual yet insightful atmosphere. It's as if a seasoned engineer is walking you through, projecting confidence with every command line. The vocabulary sits comfortably at the intersection of accessible and technical, careful not to alienate enthusiasts with overly complex jargon, nor oversimplify for the experienced developer. Aimed at the developers and tech-savvy individuals trying their hand at formal verification, this walkthrough is a perfect fit within a niche, informed audience.

Now, let's unravel the details of our very first Certora Run step by step, keeping the post as grounded and understandable as the original author's intentions.

## Step 1: Setting Up and Running Certora

First things first, ensure you have everything up and running by following the official docs. With your setup ready to go, we enter the realm of the Certora Prover. Though the documentation might suggest running commands straight from the CLI, we're taking a different route today - the much cleaner and organized `.comp` file.

Open up the terminal with both `.rfecatches.comp` and `.spec` at your fingertips. It's showtime for testing the formal verification. Here's the magic spell:

```bash
certoraRun rfecatches.comp --verify invariant break_form
```

Just like that, your config file is all you need for Certora to work its magic. Typing this in connects us to Certora’s cloud services, granting access to an URL where you can almost hear the cogs turning as your verification kicks off.

Wait a moment, and voila! The terminal will show you the fruits of your patience. Allow me to guide you through the output.

### Understanding the Output

Upon opening the dashboard, our eyes are drawn to the rules tab. Here lies the pass/fail status of each rule in a neatly presented pane, a small triumph marked by a checkmark denoting our success. Further inspection of the `.spec` file reveals the precise specifications used for this verification, along with the files associated with the run. It's our `.sol` file and the associated `.spec` and `.conf` extensions.

Interestingly, Certora's interface tweaks add a `process EMV` aspect, which might sound daunting, but it's simply part of the service's internal mechanism.

Moving on to the contract itself, which for us, only houses a singular method. For more complex runs, you would typically dive into the call trace for a detailed play-by-play. But here, an assert true statement stands firmly, almost proudly stating that it passes without a fuss.

This is, admittedly, not the most captivating example of a Certora Run. Think of it as dipping your toe in the water - a sanity check for the process. Even such a simple run provides a sense of affirmation - our setup is correct, and we’re on track.

### The Terminal's Tale

The terminal output is the narrative of your Certora Run, a story where the initial setup is the rising action, the run itself is the climax, and the verification output is the satisfying resolution.

After watching the interface do its dance, your terminal faithfully reports the summary. Bask in the data - it's a testament to your efforts.

## Step 2: Streamlining the Workflow

Remember that manual command we used initially? Well, it can be a real hassle if you enter it time and again. Thankfully, solutions for such inconveniences exist in the developer’s toolkit. Let me introduce you to the `make` file, a nifty bridge over troubled waters.

Inside your project directory, the `make` file lounges with a pre-defined `certora` script. Instead of the laborious, full command, a casual `make certora` from your terminal will do the trick.

Here’s how a simple `make` invocation looks:

```bash
make certora
```

Ease of use and efficiency? Check and check. Now, while I won’t run this command again (to save you the déjà vu), it’s comforting to know that your `make` kit is readied for all future Certora endeavors.

## Conclusion: Embrace the Cloud, Foster your Code

Today’s voyage with Certora has been an eye-opener. We've flirted with the corners of formal verification and scripted commands that sing to the cloud above. Along the way, we've discovered how invaluable robust checks are in bolstering our confidence in code integrity.

The takeaway from our little escapade? Certora isn't merely a tool; it's your ally in the battlefield of smart contract development. With each run, expect a deepened understanding and a calmer pulse as you deploy to the unforgiving arenas of blockchain platforms.

As developers, our mantra is to evolve continuously, to seek out workflows that optimize time and reduce errors. The combination of Certora and `make` epitomizes this ideology, offering a repeatable, simplified process that befits the dynamism of the tech sphere.

Embark on your journey, explore the domain of formal verification, and let Certora streamline your quest for smart contract perfection. Remember, it's not just about the runs you make but the confidence you gain with each assertion that holds true.

Till the next run, code finely.
