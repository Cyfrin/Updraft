---
title: Huff, Yul, and Contract Opcode Disassembly
---

_Follow along with this video:_

---

Today, I'm excited to take you through the paces of creating a simple storage contract, which we're endearingly nicknaming our "one horse store" venture. Indeed, we're saddling up in our trusty Visual Studio Code (VS Code), and I'm going to share a trick that'll gallop your coding speed into the next-level: coding with an AI extension or AI buddy by your side.

If you haven't yet, say a digital hello to GitHub Copilot—I've got it turned on and ready to code. AI tools like this are incredible time-savers, and I can't recommend them enough. While Microsoft's AI prowess is steering the ship at the moment, there are other AI-friendly extensions out there too. It's a playground of innovation, but let's not dwell on the tech politics for now.

> "Embrace the AI extensions—not just for their speed, but for their ability to transform coding into a collaborative endeavor with the future."

Let's get down to business and create a new project environment:

```
# Open up your terminal and run:mkdir one_horse_storecd one_horse_store# This creates your project directory and navigates you into it.
```

![](https://cdn.videotap.com/618/screenshots/4xk0alpmUeX5Q5g85Wng-134.4.png)

Now, let's initiate our project by setting up Foundry, an awesome tool for smart contract development:

```
forge init
```

Ready? Hit the command and... Voilà! Your Foundry project is ready to roll.

![](https://cdn.videotap.com/618/screenshots/lxxB0cs9eQo4oAnglwWL-158.4.png)With our scene all set up, it's time to script our first act. Dive into your README, clear the stage, and let's craft a basic, simple storage smart contract. It's easier than it sounds—I promise.

If you're inclined to peek at the playbook, venture over to the GitHub repository associated with this walkthrough. You'll find our hero file `Horsestore.sol` under the `src/horse_store_v1` directory—there for the taking (or copying)!

Here's where things get really interesting. As we explore the codebase, you'll stumble upon `horsestore_symbolic_t.sol`, which might seem like a riddle in code form. Don't stress about it now; it's part of our next adventure involving minimalistic symbolic execution or formal verification. We'll circle back to it in what I'd like to call the "Math Masters" section later on.

If the code's looking alien, it's your cue to brush up on the Advanced Foundry or even the Basic Solidity skills. Everything we're doing here should resonate like a familiar chord.

![](https://cdn.videotap.com/618/screenshots/vLrMPkPGuE8nuP01Nuon-182.4.png)

Our smart contract? It's minimalism at its finest. We've got our `numberOfHorses` variable, an `update` function to change its value, and a `read` function to peek at it.

Ready to see this baby run? Fire up your terminal and let's compile:

```bash
forge build
```

Success should grace your screen, and with it, confirmation of a job well done.

![](https://cdn.videotap.com/618/screenshots/IRScPR5Kx7OL2J90pzyW-211.2.png)

A quick command-shift-p brings up the command palette (handy tip: you can always google how to do this for your setup), and we're going to format our JSON output from the compiler and toggle the word wrap—it may not look pretty, but functionality is our first date, not aesthetics.

![](https://cdn.videotap.com/618/screenshots/ge99ueN4MYHHbzplAWRz-220.8.png)

Within the output—particularly the JSON—we find the ABI and bytecode, both critical for our smart contract to interact with the blockchain. They tell the tale of the deployed contract and its capabilities.

And that's where we'll leave off for now. By following along, you've set the stage for more complex and thrilling coding adventures that lie ahead. Remember, coding doesn't have to be a solitary journey. With the right AI accomplices and a dash of collaborative spirit, you're well on your way to becoming a coding sorcerer in this electric era of smart contract development.

---
