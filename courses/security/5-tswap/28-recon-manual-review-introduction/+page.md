---
title: Recon Manual Review Introduction
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/agaMBAv-M0o?si=H0vpZ8jMHac2NaEO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Manual Review of TSwap Pool: A Deep Dive

Hey, awesome reader! Welcome back to the blog. In the previous posts, we've talked all about tools, code inspections, and automated reviews. However, there's one aspect that invariably remains at the core of the process - the manual review. So, let's grab a cup of coffee and plunge together into the manual review of the TSwap pool!

## The Unreplaceable Manual Review

Here's the thing about manual reviews. This bad boy can find bugs that no static analyzers, no automated systems, and no testing suites can.

> Remember, never underestimate the power of the human eye when it comes to code.

Every line of code is a potential pitfall and the manual review is our best chance at spotting those tricky bugs that can slip through all those automated testing suites. Yeah, we've come a long way with our tooling approach. But, nothing, I repeat **nothing**, replaces the manual review.

## The Saga of the Under_Swap

Let's recount a bit of our journey. We've written a port, we've had some type of high, and we have the curious case of the `under_swap` that breaks invariants. Yes, we spotted the issue with our fuzzing test suite. So, kudos to us!

But let's not stop at that, shall we? There could be an entire universe of other issues lurking in the code base. Sure, we could write more tests, more automated checks, more everything. But, we've reached the point where it's time to dig in with our manual review.

Remember,

> Automation is great, but manual code review is the secret sauce that makes everything click!

So, are you ready to walk through the code base with me?

## Prepping Up For The Manual Review

Before we dive in, make sure you're comfortable. Have a cuppa joe if that's your jam. Maybe take a break if you haven't yet. Because we're going on a bug hunt! It's not just about spotting the bugs. It's about understanding why they happened. It's about writing down our findings and submitting the report. It's about replaying the process again and again.

> Remember, repetition is the mother of skill.

You might be thinking, "Patrick, buddy, this is so boring! Do we really have to...?" Yes, you do! This is exactly what you need to become a better developer, a better tester, a better debugger. It's the detail, the persistence, the grit that turns you from a coder into a **code warrior**.

## Performing the Manual Review

Alright, it's time for the main event. Let's roll our sleeves up, put our debug glasses on, and let’s do the manual review.

# Wrapping up the Manual Review

In the manual review, we'll be going through the codebase, and document our findings. You're not alone and we will be doing this together. In the later sections, we can be a bit more breezy. But right now, this is where the magic happens. Write the report with me. This is your story. Your journey into the bowels of the codebase. The monsters you fought, the bugs you squished.

# Conclusion

So, what are you waiting for? Let's get cracking! This is gonna be an exciting journey! Stay tuned for our next blog post where we'll be sharing insights from our manual review, documenting our process and achieving our goals step by step, bug by bug. Remember,

> The best way to find your skills is to lose yourself in the code.
