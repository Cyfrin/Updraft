---
title: Magic Numbers
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/EQUjA_xM2C8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

When diving into the detailed layers of Solidity development, one principle that I keep circling back to is the avoidance of 'magic numbers'. A term that may sound relatively cryptic or even partially endearing, 'magic numbers' actually refer to something quite mundane that can turn out to be enormously inconvenient when dealing with large blocks of code.

Having repeatedly voiced my intense disdain for magic numbers, I am more than ready to dissect and debunk these pests for you.

## Decoding Magic Numbers

To be concise, magic numbers are the esoteric, context-less figures that appear within a chunk of code, unrelated to anything else and devoid of any conspicuous significance. Let's illustrate this with an example:

```js
uint8 public constant DECIMALS = 8;
int256 public constant INITIAL_PRICE = 2000E8;


```

Here, with the number `8` and `2000 E8` dropping in out of nowhere, it's virtually impossible to infer what these numbers represent if you haven't seen the code for a while. This might not seem like much of an issue in this small snippet, but when you're dealing with substantial amounts of code, these magic numbers become an exasperating hindrance.

To resolve this mystery, you would have to go back to the aggregator – in our case, Mach V3 – and decipher the coding behind these numbers. This becomes tiring and can slow your coding pace considerably.

<img src="/foundry-fund-me/11-magic-numbers/magic1.png" style="width: 100%; height: auto;">

It's worth noting that my advocacy for avoid magic numbers transcends practicality. Even during audit reports and smart contract audits, I make it a point to highlight such areas for improvement. Maintaining code readability is a critical aspect of efficient coding, which resonates across any language, including Solidity.

## Conclusion

In conclusion, maintaining readable, explicit and efficient code should always be the goal. Striving to keep magic numbers at bay can significantly contribute towards this endeavor. After all, software development is more an art than a science, and the devil, as they say, is in the details.

<img src="/foundry-fund-me/11-magic-numbers/magic2.png" style="width: 100%; height: auto;">
