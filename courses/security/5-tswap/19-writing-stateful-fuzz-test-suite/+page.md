---
title: Writing Stateful Fuzz Test Suite
---

---

### Writing Stateful Fuzz Test Suite Introduction

With everything we've gone over recently, it's probably spoiled a bit of the surprise as to what we can expect in TSwap, but none the less it's time to go back to our protocol.

We've barely looked at the TSwap contracts at all. We've noticed the protocol only has unit tests and that's not good enough!

Let's write a fuzzing test suite for TSwap and see what we can find. Afterwards we'll do a little manual review!
