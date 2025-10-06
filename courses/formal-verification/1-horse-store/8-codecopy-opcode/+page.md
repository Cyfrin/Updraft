---
title: the CODECOPY Opcode
---

_Follow along with this video:_

---

### CODECOPY

Before moving forward, there's one specific opcode that I wanted to bring to your attention, `CODECOPY`. Represented by the hexadecimal `39`, this opcode is a clear indication of where `Contract Creation` occurs in bytecode (though this can also be seen in Runtime).

Let's take a look at our Huff contract's output again:

```
60008060093d393df3
```

Just as expected, we can see the `39` opcode 6 places from the right. This is our flag indicating the creation of our Huff contract on-chain!

I absolutely recommend looking at [**evm.codes**](https://www.evm.codes/?fork=shanghai) for an interactive way to learn more about specific opcodes in an interactive way.
