---
title: Phase 4 Reporting   The first few Informationals
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/s9B-GVWF-2s?si=6Bi1sScA68T8NdOx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Decoding a Code Audit Session: Understanding the Process

Hello, readers!

Today, we'll take a deep dive into some lessons learned from a thorough code review session. Without further ado, let's get the ball rolling!

## Step 1: Reviewing the Code Base

To start off, we took an initial sweep through a code base - our first chance to spot errors, find potential areas of improvement, and generally see how things stack up.

"_Are we done yet?_" you might ask. Well, not quite. Just like any meticulous auditing process, it's essential to ask questions as they pop up. For instance, if a variable appears to be used from its initial state, it's worth asking, "**If it's empty, how does it warm up?**"

It's also critical to loop back to any points of confusion or curiosity you see. Got that one lingering question begging for an answer? Mark it down, note it for later and see what comes out of a second, or even a third, look-through.

## Iterative Passes: A Beginner's Best Friend

Here's the clincher: you don't have to get it all on the first pass. We only had one run since we're still in the process of learning, and that's perfectly okay. Here's a simple yet crucial piece of advice:

> Never hesitate to go back for another pass if you feel unsure or if there are questions left unanswered.

At the end of the day, the goal is to build a clear understanding, and rushing might just lead us away from that objective.

## Step 2: Reporting Findings

With our checks and observations noted down, it's time to dive into some report writing. For the purpose of maintaining good organization, I created a new file for our findings, cleverly named "Findings MD," and put it in a newly created "audit data" folder.

```markdown
New File - > findings.md -> audit data folder
```

Let's break down how we can structure this report.

### The Grouping of Discoveries

Starting with the first finding, in our example, we found an error that wasn't actually used at all - a classic case of surplus code. Considering its nature, we classified this as an "Informational" finding. This categorization allows us to flag potentially important data points without necessarily marking them as critical faults or errors.

```markdown
Informational Finding: Unused Error
```

With the help of a bookmarked layout from a previous project, the otherwise tedious task of finding organization become a simple copy-paste job.

```markdown
Finding Layout -> Copy Layout -> Paste in New File
```

### Adding Detail to Findings

The key to a helpful report lies in its detail. For the very first finding, we established a lack of use for a certain pool factory and suggested its removal. This was done by manually inserting '-pool factory' to indicate its extraneous existence.

```markdown
- Pool Factory (This is not used and should be removed)
```

Similarly, all information points were individually detailed under their respective headers, ensuring an informative but clean look to the report.

```markdown
I2 - Lack of Zero Address ChecksI3 - Symbol, Not Name
```

As a bonus, we even added a section for the "Weird ERC 20" occurances, which don't have a dedicated audit tag but are no less vital to note.

And there you have it. The layout's simplicity and clarity make complex ideas digestible and easy to understand.

## Conclusion

Ultimately, the code audit is a practice in thoroughness, attention to detail, and iterative learning. Along the way, you'll encounter a host of ruinous bugs, confusing variables, and, yes, even a "Weird ERC 20" here and there. But the key takeaway should always be this:

> Always be willing to make multiple passes, make detailed notes, and never shy away from asking questions. Only then you will fully unlock the true potential of a code audit.

In the end, just know that with each pass you take, each note you make, each error you find — you're becoming a better coder for it. Good luck, and happy coding!
