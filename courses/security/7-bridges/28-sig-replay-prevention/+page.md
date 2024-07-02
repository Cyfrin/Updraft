---
title: Sig Replay Prevention
---

_Follow along with the video lesson:_

---

### Sig Replay Prevention

We've learnt the ins and outs of how a signature replay attack is executed and what makes a protocol vulnerable to this exploit, but..

**_How do you protect against something like this?_**

The simplest way to protect against a replay attack is to assure that the function being called includes some kind of mechanism such that it can only be called once. Common solutions include - adding a block nonce, or a deadline parameter which will cause any subsequent transaction calls to revert.

```js
function sendToL1(uint8 v, bytes32 r, bytes32 s, bytes memory message, uint256 deadline){...}
```

There are a variety of things you could employ, but the root of the solution is the same:

Utilize some form of one-time-use data within your function to prevent it from being replayed!
