---
title: Unsafe Casting
---

_Follow along with this video:_

---

### Unsafe Casting Breakdown

There's another issue with the line `totalFees = totalFees + uint64(fee)` that's similar to integer overflow, but a little different.

Using `chisel` again, we can see that a max `uint64` is 18446744073709551615.

```bash
Welcome to Chisel! Type `!help` to show available commands.
➜ type(uint64).max
Type: uint
├ Hex: 0x000000000000000000000000000000000000000000000000ffffffffffffffff
└ Decimal: 18446744073709551615
➜
```

We've also learnt that adding any to this number is going to wrap around to 0 again, but what happens if we try to cast a larger number into this smaller container?

![unsafe-casting1](/security-section-4/31-unsafe-casting/unsafe-casting1.png)

We can see above that when `20e18` is cast as a `uint64` the returned value is actually the difference between `type(uint64).max` and `20e18`.

Our value has wrapped on us again!

```js
// twentyEth         = 20000000000000000000
// type(uint64).max  = 18446744073709551615
// uint64(twenthEth) =  1553255926290448384
```

This is absolutely something we're calling out in our audit report. Puppy Raffle is at risk of losing so many fees!
