---
title: Tooling - Solidity Visual Developer
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Static Analysis Tools in Understanding Solidity Metrics

Next we're going to dive deeper into the exciting world of static analysis tools. We'll take a closer look at the Solidity Metrics tool, which we introduced before, and also explore another tool known as Solidity Visual Developer.

## A Deeper Dive into Solidity Metrics

We already have a familiarity with the clock and have explored Solidity Metrics. However, if we go back to the Solidity Metrics and scroll to the bottom, we can discover a few more useful insights.

```bash
run solidity metrics
```

![](https://cdn.videotap.com/D6ISDBvfop9mmTwaeeNA-26.74.png)Down there, we can see:

1. **An Inheritance Graph**: Here, we can see our puppy raffle is of type ERC 721 and it's also ownable.
2. **A Call Graph**: It illustrates what functions call, what other functions; a valuable tool while debugging.
3. **A Contract Summary**: It gives a list of the different public and external functions. These are the functions that an attacker would mostly call.

These features provide essential information, especially from the vulnerability perspective.

> **Note:** This is slightly more on the scoping side of things.

## Introducing Solidity Visual Developer

Not all code bases have clear, easy-to-decipher variable names identified by markers such as an 's' underscore to help distinguish them as storage variables. In some instances, you'll find that these variables are just a single word. The functions are often similar — just a single word without much distinction between a storage variable, memory variable, and others. This kind of code can make comprehension quite challenging.

Thankfully, we have other helpful VS code extensions, with one of the key ones being the Solidity Visual Developer.

This tool is a favorite for some auditors and smart contract security researchers. Once installed and we go back to our code base, we can see some automatically highlighted variables.

- An immutable variable is in a purple hue.
- A storage variable is identified by a yellow color.
- If it's a constant, its highlight is noticeable.

These features significantly improve code readability. However, how much this tool makes a difference to individual developers varies. You can disable it or keep it according to your preference.

## Understanding the Big Picture

We've skimmed over some tooling essentials and run some tools. We've also dug deeper into scoping. I have merged them all into one section here. But let's finally get into scoping and reconnaissance where we understand the puppy raffle and its purpose, and then return to these tools.

Once we have the context for how the code base operates, the static analysis outputs will give us a lot more meaningful information. Let's get this context and start step one of the exercise: Reading the Documentation. I hope this brings you a comprehensive understanding of the Solidity Metrics and how to make the most of it, not just in your work, but also in your learning journey.
