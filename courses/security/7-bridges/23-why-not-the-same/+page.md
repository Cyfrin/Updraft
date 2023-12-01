---
title: OracleUpgradeable.sol (Continued)
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/rlNx-R3OrB8?si=pgq5Dk1i1rF6gt_t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Unraveling the Conundrum: Are They Two Separate Bugs, Or Just One?

Whenever you're delving deep into bug relief, it often becomes a question whether to report similar issues separately or bundle them as one. Well, this blog post seeks to clarify these foggy waters, drawing on a practical example involving two similar software functions. Let's dive in, shall we?

## Dissecting the Problem at Hand

Our situation consists of two seemingly identical problems arising from similar functions. You might be asking, as did one of our colleagues, _why are we reporting these as two separate issues? Aren't they the same issue?_.

![](https://cdn.videotap.com/6gzcQPFB2rgdRBI8JFJa-11.36.png)

Fair question, right? After all, it's an essential part of troubleshooting to identify the issues accurately, so we can apply correct fixes and prevent future recurrences. Let's start by understanding the root cause of these bugs to see if they are more distinct than they appear.

### The Root Cause

> "In every complex problem lies an opportunity to learn."

Look closely, and we find that the two bugs have slightly different root causes.

**Bug 1:** The problem here is that after 'someone else' approves, a user can surreptitiously 'steal' their funds. This issue essentially arises from an 'arbitrary send' from another user, which isn't supposed to happen in a robust, secure system.

**Bug 2:** We see that while it deals with 'stealing' as well, the issue isn't strictly similar. The problem here essentially arises from the vault always having maximal approvals. This bug, therefore, isn't solely dependent on the thieving user, but also on the software giving unwarranted permissions.

![](https://cdn.videotap.com/l0gRdGu8ti9QkBOZPlHZ-36.92.png)

Yes, you could argue that at their core, these issues do outline a 'similar' root cause. This claim holds some merit after all since both problems involve unauthorized access and fund misappropriation. Still, the dramatic differences in the details could be seen as suggesting two separate bugs.

### An Interesting Conundrum

We stand before an interesting conundrum in software debugging — whether to consider identical root causes with different details as a single bug or multiple. Personally, I find these two bugs intriguingly intricate enough to merit separate reports. Of course, as this is not a hard and fast rule, opinions may differ. There's room for a heated debate here, with Technocrat A claiming they're the same issue and Developer B insisting they're two different things.

### The Result: Two Bugs or One?

Putting aside the scholarly debate on debugging philosophy, in practical terms, we have two problems that necessitate separate solutions. Thus, regardless of their identical core, from our perspective, these remain two separate findings.

![](https://cdn.videotap.com/PtXNrChg21iZ1dkXkyTz-53.96.png)

## And We Are 'Cooking'

In our world of programming, this is called 'cooking.' We take the raw ingredients (issues) and turn them into tasty dishes (resolved problems).

Are there any other issues lurking beneath the surface? Possibly. For now, though, I think we're in good shape having identified these two intriguing bugs. We've ironed out a major part of our problem-solving journey, leaving potentially two more crucial functions to dissect.

So what's the lesson here? Bugs always aren't what they seem. And, just as crucially, sometimes they are exactly what they seem. But the beauty of it all lies in the exploration and discovery.

Stay tuned in to our coding adventures. Let's see what else we discover along the way. Happy 'cooking'!
