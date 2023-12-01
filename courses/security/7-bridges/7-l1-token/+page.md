---
title: L1Token.sol
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/nMraeBRAiIs?si=dg905eCg_xzr1x5I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Diving Deep into the Trenches with Solidity Code

Today, we are armed with an abundance of context, which provides us with a fortified understanding of what this code base embodies. Let's begin!

## Invoking the "Tincho"

![](https://cdn.videotap.com/KbfZIIwRu0i6v3I4hHUH-9.1.png)

We're going to invoke the Tincho method in our exploration - starting with the little ones and progressively getting bigger, like a well-ascended staircase of understanding. And don't worry, we'll make sure to go through a checklist at the end to ensure we've covered all bases.

## Descending to the Code Depths

Our first stop? The smallest code base in our array of documents. Hop onboard, as we open up the file for `Solidity metrics` and navigate towards the seemingly insignificant number seven, `L1Token.sol`. A little intimidating, isn’t it? But fear not, we’re just about to dive deep and decipher this "Bad Larry".

## Finding the Unexpected in the Expected

Upon inspecting `L1Token.sol`, we find quite a regular landscape - not particularly striking with nothing out of the ordinary. But let's not rush our judgment.

We're leveraging codes from `OpenZeppelin`. As veterans in this field, we’re well acquainted with `OpenZeppelin`.

```js
private constant initial_supply;
```

Prima facie, we encounter a private constant initial supply which seems appropriately allocated. It's multiplied by the decimal representation of ten - a magic number by a certain perspective but just a ten, hence, no alarm bells ringing.

## Unravelling the Tests

Diving deeper, we look for a deploy. Unfortunately, this section seems to be lacking a dedicated deployment component in its structure. There's a `token factory test`, but the sight of `L1Token` tests is scarce.

But wait, there's a silver lining! There are indeed a few tests conducted on the `L1Token`. For instance, we have a token transfer test.

This token is utilised in the transfer process, and it seems to deploy a brand-new token. Once again, nothing screams out of place - everything seems quite standard here.

## Final Words

After scrutinizing `L1Token.sol`, it appears quite compliant with standard solidity coding practices. Following the Tincho approach has led us to meticulously dissect this small piece of code, to such an extent, that we can confidently say - "this looks fine".

Continuing on this journey, we will employ the same procedure to the next segment of the code. Embark on this journey with us as we delve into the eccentric and challenging world of software development, one line of code at a time.

> "The job of the coder is not just to code. It is to understand and then code." - Anonymous Developer
