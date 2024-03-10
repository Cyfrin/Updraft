---
title: Exploit - Failure to Initialize - Remix Example
---

## Let's Play: Exploring the Issue in Remix

[Remix](https://remix.ethereum.org/) et's compile and deploy a sample SC simulating the 'failure to initialize' flaw.

![](https://cdn.videotap.com/HhYH7vlvKZcgQ2YeBn5v-29.77.png)

Following successful deployment, you will find several functions. Initiating the `initialize` function will initially return `false` since, with nothing preset, the value is logically zero.

However, if we forget to officially initialize our variable and start incrementing the not-yet-existent element (say 4-5 times), it would start registering those values. We can then observe that my value has progressively increased with each increment, despite having no explicit initial value.

Here's the kicker - if you now stumble upon the error and initialize the element (say, with 123), an anomaly occurs. Instead of adding to the increments, the value is completely overwritten with the initialized value. In our case, my value resets to 123, disregarding all prior increments.

> **Note**: Remember that a correctly built `initialize` function should have protection against subsequent initializations, to prevent overwriting of any pre-existing data.

## Proactive Measures and Further Exploration

The aforementioned problem can be prevented by ensuring initialization prior to interaction with a contract. This might seem insignificant, but in the world of coding, minor details can influence the major outcomes.

Let's conclude with a suggestion - why not challenge yourself with the capture-the-flags exercise available on the repository? It might provide an interactive environment for understanding the problem better.

To explore further on this issue, head back to the associated Github repository.

And that's it folks, the overlooked yet crucial issue of 'Failure to Initialize' in the realm of SC exploits. I hope this post offers you meaningful insights and may your journey in the world of programming be devoid of such pitfalls!

Happy Coding!
