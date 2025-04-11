---
title: "Exploit: Exploit - Gas Bomb"
---

_Follow along with the video lesson:_

---

### Exploit - Gas Bomb

One more to go! This issues is actually _also_ found within `sendToL1` (this function is a mess).

So, what is a `gas bomb`?

In essence it's a circumstance where an unexpectedly large amount of gas is suddenly required to execute the function of a protocol.

In `Boss Bridge`, we see this as a product of taking arbitrary message data _again_.

```js
function sendToL1(uint8 v, bytes32 r, bytes32 s, bytes memory message) public nonReentrant whenNotPaused {...}
```

Solidity and the EVM have a hard time estimating the gas costs of a situation like this. In the past, malicious actors have sent message data which cost **_insane_** amounts of gas to execute, costing the caller a tonne of money, or in some cases bricking a protocol.

Some people just want to watch the world burn.

### Wrap Up

I'm going to encourage you once more to write up these two findings, write the proof of code and go through the motions.

Work those muscles to build your experience and familiarity.

When you're done, I'll see you in the next lesson to recap everything we've learnt!

See you soon! (DO THE WRITE UPS)
