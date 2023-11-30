---
title: Debugging the Fuzzer
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/tLcpqejwHo8?si=6mne2c3rugrXYr_r" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Debugging Your Code the Way a Pro Would Do It

In today's lesson, we'll dive into a realistic process of debugging, using live examples and explaining how to overcome certain coding hurdles.

Typically, I spend a large chunk of my work hours debugging unexpected failures in code scripts, and I thought it would be valuable to share my experience with you.

Often, you'll need to rerun your code, alter variables, and cross your fingers, hoping you'd not receive the same error. Debugging is intriguing and requires a keen eye for detail.

## Debugging a Program

Here is a practical example of how I discovered, investigated, and resolved errors in a program, step by step.

![](https://cdn.videotap.com/YQdEYI0P1ab2zx1GvZnZ-68.11.png)

### Step 1: Testing the Code

As expected, the program failed. The error notably pointed out that the `TSWAP pool must be more than zero`. From my experience, such failures are usually attached to some misconfigured variables or misplaced logics.

In this case, when checking back on the `handler`, there was a deposit function configured with zero - a value that must certainly be greater than zero.

I then had to ask myself, what seemed to be the `minimum deposit`?

### Step 2: Debugging Interlude

I discovered something crucial here - the `minimum WETH liquidity`. This was the `minimum deposit amount` I should've assigned instead of zero.

Using this newly found information, I decided to replace the zero value in the `bound` function with this minimum deposit amount and then reran my test.

It appeared that the function `get input amount based off output` had been assigned the zero value, as was previously the case. Here we had to replace the zero with `pool. Get minimum WETH deposit amount` to avoid similar complications.

### Step 3: Learning and Debugging

I intentionally ran into these issues because it's an inevitable part of the coding process and learning experience. Debugging requires a skill to easily navigate through logs - It's a practice I find effective in learning code structure.

At this point, the `assertion` seemed to hit a snag. The immediate response was an `actual Delta X` being zero while on the right hand side, it was a large number. The inconsistency in values raises the question - where did I go wrong?

Turns out, there was a small but significant mistake in the addressee in my code. It had mistakenly been set to `address this`, when it should have been `address pool`.

### Step 4: The Resolution

Once that was rectified, it seemed like we were getting somewhere. The code was now giving a different error, an indication that we were making progress. However, I noticed there was a significant variance between the left and right side values - almost a clear doubling.

The key question now was whether my code was the problem or there was an `invariant` that was actually broken. Debugging requires such critical thinking to diagnose the root cause of errors.

_SECTION OF CODE TO INSERT HERE_

It turned out I had made an incorrect assignment in the `handler`. The `Delta X` was supposed to be the `pool token amount` calculated earlier. This led to an unexpected elevation in the `outbound WETH` size, causing the script to keep reverting.

To solve this, I had the `bound` function call on the `WETH balance of the address pool`, as opposed to it being manually large.

#### Handling Debugging Challenges

> "In debugging, there's a lot of trial and error, and it's okay. You're going to encounter a few challenges on your first try but with perseverance and keen attention to detail, you'll find a way to resolve these errors".

After making the necessary alterations and rerunning the tests, the program finally passed. This means the code was safe and no bugs were found.

## Conclusion

Even after successfully debugging, remember that your code is always subject to possible future errors. But now armed with the skills and patience to debug, you are better prepared to face any challenge that comes your way.

Stay creative and keep debugging!
