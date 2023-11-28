---
title: Reporting - Findings We'll Cover Later
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Decoding MEV Attack Vectors in Blockchain Audits: An Overview

Let's delve into an intriguing topic that has been making waves in the cryptocurrency and blockchain world: Miner Extractable Value (MEV). In this detailed walkthrough, we'll be breaking down MEV, focusing on a specific function that is vulnerable to an MEV attack. However, we're not going to tackle this attack vector head-on just yet. Instead, we will revisit this at a later point in the journey - specifically, in section 7.5.

## Understanding MEV and Its Relevance in Our Audit

Miner Extractable Value (MEV) is a measure of the profit a miner (or validator, more generally) can make through their ability to arbitrarily include, exclude, or reorder transactions within the blocks they produce. This kind of attack vector, while crucial to understanding blockchains' dynamics, is a rather complex topic; one that deserves its exclusive focus.

So, even though the refund function that's part of the audit does indeed cater to an MEV attack vector, this article will momentarily set it aside. It's crucial to note that the art of audit involves identifying specific findings and coming back to them for comprehensive reviews – and that’s precisely what we'll do with this MEV instance.

```markdown
// Refund function with an mev attack vector// Skipping for a detailed review in the advanced sectionfunction refund() public {...}
```

_A snippet from the code highlighting the refund function that we'll come back to._

## The Intricacies of an Audit: Findings and Interpretations

Now, let's address some of the findings that have popped up during this audit.

> "There are some findings that we're going to come back to and there are going to be some findings in this report..."

In the realms of an audit, numerous findings can surface - some straightforward, others more intricate. It isn't uncommon to unearth certain findings that aren't immediately dealt with. Rather, they're documented to be thoroughly analyzed at a later stage. In our case, the MEV attack vector related to the refund function is such a finding.

![](https://cdn.videotap.com/35BUNzg5F3kXUPMFBbwg-20.67.png)### The Art of 'Temporarily Skipping' in Audits

Having highlighted the presence of an MEV attack vector in the refund function, we're going to 'write it as skipped' for our current discourse. To the uninitiated, this might seem like a casual bypass; however, this is a strategic step in decomposing the complexities of a blockchain audit.

![](https://cdn.videotap.com/p2tZttDRmeYG6uyTFwF2-24.11.png)```markdown
// mev attack vector identified// Temporarily skipping - will return to in section 7.5

```

An extract from our audit report, showcasing the "skipped" MEV attack vector needing future attention.

To sum it all up, this introductory overview of the audit has laid some groundwork on understanding MEV and how it intertwines with our audit. We've identified the existence of an MEV attack vector in the refund function, but instead of delving deeper, we've marked it for further analysis down the line. Keep in mind that this is just an initial glimpse into the labyrinth that is blockchain audits. Stay tuned for in-depth details as we unravel each twist and turn in upcoming posts. Till then, happy coding!
```
