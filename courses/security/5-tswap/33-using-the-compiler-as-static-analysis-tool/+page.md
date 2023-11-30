---
title: Using the Compiler as Static Analysis Tool
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/fmLWDJFFIyg?si=SKdSgZgTG9mmIUI8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Diving into Liquidity Addition and Removal Functions

Today, we're delving into the crux of adding and removing liquidity in cryptocurrency pool systems. We'll take a look at the deposit function code from a fictional cryptographic liquidity pool project.

For those following along, let's do a simple `toggle word wrap` in your favorite code editor so you can view the code more efficiently. If you need the code, you can find it in the associated GitHub repository within the `audit data` folder.

## The Deposit Function

![](https://cdn.videotap.com/86AjU9W56rzzt6USwvmh-25.png)In the relevant code we've got, we run into aspects related to liquidity providers. The deposit function revolves around the liquidity providers' actions in the pool system.

Looking at the function, you'll notice it calls for a certain amount of `wes` (Wrapped Ether). Following the liquidity pool model, when a user deposits funds, they're given liquidity tokens in return. These tokens represent the user's share in the pool.

### Delving Into the Parameters

There are's an array of parameters involved in the function. Let's break down a few significant ones:

- The `minimum liquidity tokens to mint`: This parameter signifies the quantity of liquidity tokens created, derived from the amount of `wes` the user deposits. However, there's a minimum limit to ensure the user is aware of what they will receive.
- `Maximum pool tokens to deposit`: Mirroring the earlier parameter, this signifies the maximum number of pool tokens the user is prepared to deposit. This value again is derived from the deposited `wes`, allowing users to gauge how much USDC they should contribute to the liquidity pool.
- `Deadline`: VC Code gives us a heads up here with the `Unused function parameter`, warning. Surprise! The deadline parameter isn't implemented in this function. Herein lies a potential bug we'll delve into shortly.

## Analyzing the Bug

The unused `deadline parameter` seems small at first, but it becomes a severe issue upon closer inspection. The deadline parameter is meant to determine when a transaction needs to be completed. If it's unimplemented, the deadline set by a depositor could pass without stopping the transaction, causing unexpected actions on the part of the user.

This high impact, high likelihood bug results in deposits proceeding when they're expected to fail – a clear and severe disruption to functionality.

```markdown
# Audit Finding: High

# Impact: High, Severe disruption of functionality

# Likelihood: High, Deadline is ignored, leading to transacions being processed beyond the stipulated deadline.
```

### Unveiling More Bugs

Closer analysis of compiler warnings revealed two other interesting bugs.

This bug crops up in our deposit function where `pool token reserves` is ignored. The ignored reserves could have been used to do some internal calculations. It seems the developers started some math, then decided to use a function instead, resulting in ignored variables and wasted gas.

```markdown
# Audit Finding:

    InfoIssue: line of code declaring `pool token reserves` is not used, leading to gas wastage.
```

- `Unused Function Parameter: Swap Exact Input`

In this function, an unused `output` parameter shows up, which isn't a major red flag. The impact here seems low since this function seems to only be used externally and this output might not be used elsewhere in the project. The only issue is the return of 0 where it could be another value that might be more meaningful. However, this impact could be more if it's being used elsewhere.

```markdown
# Audit Finding:

    LowIssue: The `output` parameter returns zero and is never used, which might not accurate reflect the output value.
    Likelihood: High, always the case. But overall impact is low.
```

In conclusion, running a simple compiler check helped us discover several notable bugs. A key takeaway for developers here is the value of regularly checking for and resolving compiler warnings. Time to go ahead and patch up these issues before they turn into severe problems!

Stay tuned for more explorations into cryptocurrency programming and keep those bugs at bay!
