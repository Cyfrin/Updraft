---
title: Unsafe Casting
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unveiling a Code Overflow Issue: Dealing with Unsafe Casting in Ethereum

Have you ever found yourself struggling with an obscure overflow issue in your code? Let's say you come across such an issue in a piece of Ethereum code that deals with fees. Well, I want to walk you through a discovery that could change the way you look at such a problem. Buckle up and let's dive in!

## The Overflow Issue – MAX Value

Now, when you pull up your terminal, you may notice an overflow issue. What might this look like?

How about we illustrate with an example. For starter’s sake, let’s use our terminal's little chisel to display the max value for `UN 64` data type as such:

```bash
$ type Uwint64 max
```

This will yield the maximum value that this data type can hold. You can copy this and run it again to verify. An integer with a max value of UN 64, for instance, would display as a series of numbers:

```bash
$ 123456789101112345678
```

This highlights the maximum value for UN 64.

![](https://cdn.videotap.com/fytpgvHqwMiVQT0IRTQM-49.5.png)## The Effect of Overflow on ETH Fees

So, what happens if an overflow occurs when 20 ETH of fees are collected? This is where the enigma unfolds. We can simulate this scenario with this code snippet:

```bash
let un64 = UN 64.maxlet ETH = UN256 (20 * e^18)
```

Here, `un64` holds the max.Unsigned 64-bit integer value and `ETH` holds the computed value of 20 Ethereum coins in their smallest unit, Wei.

![](https://cdn.videotap.com/OH27oWqZxNCfkB6SimEB-81.png)## Danger of Casting ETH as UN 64

Next, we need to see what ensues when we try to cast our 20 ETH held in UN 256 as a UN 64. What does this casting do? Let's map it out.

```bash
let myUn64 = UN 64 (20 * e^18)
```

Surprisingly, after copying this value and comparing it with the previous value of my `UN 64`, we notice that the new value seems reduced—truncated to be exact. In actual representation:

```bash
$ 123456789101112345678 (Initial Value)$ 1.5                                 (After Casting)
```

This demonstrates that casting `UN 256` to `UN 64` results in truncation of a lot of its values. How?

Opening up a calculator to run `20 minus UN 64 max` reveals that the exact number is obtained. This shows that we have wrapped around the max value, which is an unsafe casting of this variable.

![](https://cdn.videotap.com/XcTeQLGswCK42guJBqbp-130.5.png)## The Double Trouble – Unsafe Casting

Doubling up as an overflow issue, this also becomes an unsafe casting problem. You can’t just grab `UN 256` and cast it into `UN 64` without consequences. The losses incurred could be vastly significant—if the protocol is very profitable as anticipated, many fees would be lost with such a line of code.

Surprisingly, this line of code shreds a ton of damages to the code base and is definitely a concern that’s worth calling out.

## Conclusion: The Audit Report

With a keen eye for clogs in the code base, we can bring to light silent issues that otherwise stay hidden. In our code review adventure, we’ve managed to unveil an overflow issue and unsafe casting from `UN 256` to `UN 64`. Let’s crown our discovery:

> Audit unsafe cast of `UN 64` of `UN 256` to `UN 64`.

This powerful discovery should feature prominently in any audit report! It shows us that unchecked habits—like freely casting variables—can lead to severe implications such as losses in fees. So the next time you're coding, keep an eye out for these subtle pitfalls!

Remember, the devil's in the details. Until next time, stay curious and explore more!
