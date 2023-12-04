---
title: Reporting - Missing Events And Remove Dead Code
---

_Follow along with this video:_

## 

---

## Highlighting Missed Events

![](https://cdn.videotap.com/zp5mNIar5lB4Y3OaVHnR-8.png)

When implementing state change in a code framework, it's absolutely necessary to emit appropriate events for accurate tracking. However, there are instances when this isn't done, leading to missed events.

```markdown
I6: State changes are missing events
```

A plethora of tools are available in the bustling code-tools market that can help us keep track of these events. Yet, sometimes, they slip through the cracks.

![](https://cdn.videotap.com/GMx8kM6vB9arnwQhLFYV-20.png)

> "Anytime you change the state, you really want to emit an event." - A friendly piece of advice from any competent code auditor.

## Indices and their Mysterious Absence

Renowned programming expert, Darren In, also sparked an interesting conversation about the absence of index fields for events. This could potentially be a significant point to include in our audit report.

```markdown
I6(a): Events are missing index fields
```

These findings, along with meticulous details, are included in the comprehensive audit report located in our trusty GitHub repository.

![](https://cdn.videotap.com/W1YshpXSv8o0UmmhuNi1-38.png)

Though I won't be jotting down the specifics about this finding in this blog, I ensure you that it's well-detailed in the report.

## The Ghost Code

Now, we move onto a curious scenario. We stumble across a function called `isActivePlayer` only to discover it’s just sitting idly in our code - not being used at all. This infamous phenomenon, dear readers, is referred to as "dead code".

It’s like a phantom, haunting our codebase, and it can be effortlessly picked up by popular code-analysis tools. One we found effective was `Slither`.

```markdown
I7: Function “isActivePlayer” is never used and should be removed.
```

You may have been deceived into thinking that dead code is harmless, but, in fact, it can affect computational performance by causing wastage of resources or increasing execution time. Hence, dead code can impact gas optimization in blockchain applications, or be just an informational note that triggers an urge to tidy up the code.

![](https://cdn.videotap.com/Q7TwomNJdyWc4hcSJeU1-54.png)

I'll let you in on an insider tip - explaining what impact our ghost code might have on our overall framework reinstates the necessity and urgency of removing it.

## Parting Words

Our journey through this maze of debugging might have been a rollercoaster ride or a walk in the park - I guess we'll never know until we adventure again!

But that's the beauty of debugging, isn't it? It constantly keeps us on our toes, helping us uncover hidden doors to knowledge. Until next time, happy coding!
