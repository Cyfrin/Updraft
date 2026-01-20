---
title: Reporting - Mishandling of Eth
---

_Follow along with this video:_

---

### Mishandling of Eth and MEV

Frankly, we're going to skip the write ups for these.

MEV issues, as I've mentioned, we'll go over later in the course, so we'll skip this for now.

As for Mishandling of Eth, we briefly touched on this earlier. The issue really boils down to this line:

```js
require(address(this).balance ==
  uint256(totalFees), "PuppyRaffle: There are currently players active!");
```

This requirement to withdraw leads to a number of potential pitfalls, including an inability to withdraw if the contract accounting becomes broken as well as opening the protocol up to griefing should a raffle always be open. Generally something we should inform the protocol of.
