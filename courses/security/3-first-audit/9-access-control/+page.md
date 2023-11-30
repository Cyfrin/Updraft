---
title: Exploit Access Controls
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/DvWqYd35Cl4?si=Ixza64EskWwBIHit" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Discovering a Bug: How to Identify Vulnerabilities

Welcome to a bug hunting expedition! In today's post, we'll be breaking down some code hoping to locate a typical and highly common vulnerability, the missing access control error. By identifying and examining this mistake within a given function, let's dive in and uncover its layers.

Remember, even if the bug seems glaringly obvious or you struggle to find it, our mission today is learning how to identify such issues in code.

## The Bug

Let's refer to the documentation and function at hand. The former states that "this function allows only the owner to set a new password". Given this crucial detail, can you locate the bug?


The function, `setPassword`, receives `string memory new password` and is marked `external`, meaning it automatically allows for a new password to be set. Can you spot the achilles heel here?

## Questioning Code

Often, making sense of code requires asking the right questions like, "Can a non-owner set the password?" Now, if this is true (as it seems to be), it blatantly contravenes our function description, thereby ringing some alarm bells.

"Should a non-owner be allowed to set a password?" A rhetorical question really, since anyone but the owner getting their hands on the password could brew trouble. Since the documentation rules this scenario out, it implies that we’ve sniffed out an issue.

To tie in code practice with our deduction, you could make this observation in your code by writing an audit comment, such as `@audit`. Usually, a high severity alarm since any user has the potential to change the password, leaving your system vulnerable to attack.

## Uncovering Vulnerabilities

During this recon phase, our keen detective work segues into a vulnerability identification phase. We've unearthed a common but significant vulnerability - the missing access control bug. This type of vulnerability surfaces when a function that is only supposed to be accessible by a particular user role is, in fact, accessible to all.


Consequently, we've noticed a significant vulnerability in our function. Kudos to us! As a best practice, it's advisable to take a note of such findings, preferably with the `@audit` tag, and revisit at a later point.

It's important to remember that even if at first, it seems like a vulnerability, a closer look might reveal otherwise. For now, let's pat ourselves on the back for potentially uncovering this security risk!



## The Triumph of Bug Discoveries

If you were able to pick up on the incongruity before it was pointed out, terrific job! That's a definitive sign that one is on the right track. However, if it slipped past your radar, don’t fret. Security is a vast field, demanding occasional rewiring of our conventional thought processes.

Let's consider this as an exciting learning experience. Even if you didn't catch the bug but jotted down notes, you're making progress. Being vigilant enough to take notes is certainly a step in the right direction, and recognizing that we may have found a bug is a victory in itself!

# Wrapping Up

Through this exercise, we deeply whoop it up for potentially making this protocol more secure. We have identified a consequential access control issue- a significant stride towards solidifying our system’s defense and aware development.

Let's forge ahead, keeping this rigorous bug-checking mindset as we continue walking through more lines of code.

