---
title: Finding Writeup Documentation Fix
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/wUKTDt44veE?si=eGff3Ju9F4_mcaF3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## A Brief Overview

The third finding focuses on an overlooked mishap in the code - there is no new password parameter. While not as alarming as some other findings, it's still a concern that merits attention. As we progress into assessing its severity, you'll understand why it's taken as a relatively minor issue. But as we've done before, we'll be conducting a thorough write-up, irrespective of the severity level.

Before we begin, here's a heads up: once you get adroit at figuring out severities, you'll notice that gas and informational severities don't necessitate extensive write-ups. But for the sake of consistency and thoroughness, let's treat this finding with the same intensity as the others.

Here's how we proceed:

![](https://cdn.videotap.com/IArtvAsHoY19oT7nCiE3-30.97.png)

## Diving Deeper: Root Cause and Impact

The root cause of this finding lies within the documentation. It advocates for the existence of a parameter in the code — when it does not exist — throwing the documentation accuracy off kilter. Specifically, the password store get password function's Natspec indicates a non-existent parameter, culminating in incorrect Natspec.

Let's put this in simple terms, shall we?

> **The root cause:** A contradiction between the documentation and the actual function, with the former falsely referring to a parameter within the `get password` function.

The impact, as you might assume, revolves around the inaccuracy of the Natspec due to the aforementioned discrepancy.

## Getting Technical: Code Analysis and Description

Let's get into the nitty-gritty details by examining the JavaScript code. As visual reference, we're referring to this particular section in the documentation. Here:

> `passwordStore_getPassword` is the function signature, whereas the Natspec suggests the function should be `getPassword` with a string. The divergence results in incorrect NatSpec.

## Proof of Concept: Do We Need this Section?

Interestingly, in this case, a proof of concept seems unnecessary given the straightforwardness of the issue. So, for brevity, we move forward without it.

## Deciphering Mitigation Strategies

Our recommended solution is quite succinct: eliminate the incorrect Natspec line. And here we're going to do a fun little markdown trick where we're going to say a diff.

This is a markdown format where you can indicate which lines to remove via `diff`. Now, if you preview it, it nicely exhibits in red, signifying that the said line ought to be deleted. Also, if we were to add a new line, we’d mark it with a plus sign, which will display in green for clarity. While in this case, we're suggesting only line removal, diff syntax can be incredibly powerful with its clear depiction of modifications.

That said, remember: sometimes less is more — a guiding principle that applies to our mitigation strategy.

While the omission of the password parameter might seem trivial at first, failing to rectify such issues could lead to larger problems down the road. Therefore, as conscientious developers and security analysts, it's our responsibility to keep our eyes peeled for these issues — no matter how seemingly insignificant they may be! Let's keep doing our part to make the world of code safe and sound.
