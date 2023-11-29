---
title: Fuzzing Recap
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/d4VI69rhcfg?si=tDvCX3pr84l1h2gT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Mastering the Art of Fuzzing: Stateless, Stateful, and Weird ERC 20 Exploits

In this blog post, we're going to dive into the exciting world of `fuzzing`. Hang in there and get ready to uncover the intricacies of stateless fuzzing, explore the intriguing concept of stateful fuzzing, programmatically exploit the Weird ERC 20, and navigate the maze of manual bug finding in your codebase.

## A Quick Recap: All About Stateless Fuzzing

So, what did we just uncover? We got to grips with the powerful tool called `stateless fuzzing`. Stateless fuzzing offers invaluable aid to developers as it tests a system with a series of random inputs, shreds through layers of errors, helps to uncover bugs in a codebase, and optimizes system performance.

However, stateless fuzzing does have a downside. Its efficiency falls abruptly when it comes to `stateful fuzzing`. Why? Because stateful fuzzing isn't just about pounding a codebase with random inputs. It's more like a well-choreographed dance sequence, requiring precise steps and accurate timing.

_"Stateless and stateful fuzzing holds the same end goal: to identify and fix bugs and vulnerabilities in a codebase. However, they approach this goal from different perspectives."_

## The Handler Method: Bridging the Gap between Stateless and Stateful Fuzzing

But here's the shimmering light at the end of the tunnel: the handler method. This handy little method functions as a proxy that enables us to call our contract and achieve a more nuanced stateful fuzzing strategy, especially when dealing with complex contracts.

In simple terms, the handler method allows us to make our randomness `less random`. This directed randomness enables stateful fuzzing to probe more effectively into a codebase's vulnerabilities.

It helps the fuzzer go down paths that make sense, ensuring a more efficient and targeted fuzzer run.

![](https://cdn.videotap.com/imecUt1GioVaw6WCZCUs-33.1.png)

## Teasing the Weird ERC 20 Exploits

Next, we dipped our toes into the Weird ERC 20 exploit. While we didn’t dive deep into this topic, consider it your cliffhanger, your incentive to keep learning! We’ll be exploring the Weird ERC 20 in detail soon enough. It's an exploit you definitely don’t want to miss because it is a crucial tool to test more advanced code contracts.

_"In the world of coding and security breaches, the 'weird ERC 20' presents itself as a fascinating challenge and a riveting exploit that aids in uncovering deeper vulnerabilities within the code."_

## Looking Forward: The Road Ahead with TSWAP and Manual Review

With this newly acquired knowledge, next on our agenda is to apply these techniques to `TSWAP` and run stateful fuzzing tests. After we've done that, we'll dive headlong into the fascinating world of manual reviews.

The manual review process can seem tedious, especially since it involves hunting down bugs without any automation. But rest assured, it’s an amazing learning journey that adds tremendous value to your skillset as a developer.

## Take-A-Break Strategy

After this whirlwind tour of fuzzing, exploit, and reviews, you’ve made it so far and gained quite a bit of expertise! Peeling back layers of codes, vulnerabilities, and in-depth testing strategies can be mentally taxing, which is why it's important to give your brain some downtime.

_"Learning is a marathon, not a sprint; don't forget to hydrate, take breaks, and recharge yourself."_

Feel free to take a short break, stretch a bit, go for a walk or do anything you find relaxing. When you’re ready, we'll reconvene and continue our descent into the rabbit hole of coding exploits and vulnerabilities, enriched, refreshed, and ready for more.

Until then, congratulations once again and see you after your well-deserved break!

Stay tuned for more fuzzing and coding action in the next blog entry!
