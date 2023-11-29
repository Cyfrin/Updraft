---
title: Where Stateless Fuzzing Fails
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/y756f57f49o?si=GVxftygK1xxbATGm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Hello readers, today, we're diving into the realm of stateful fuzzing. If you've been following our development journeys on smart contracts, you already know about stateless fuzzing. Stateless fuzzing, as we've discussed before, starts every fuzz run from scratch.

But with stateful fuzzing, things get a bit more exhilarating! Upon each pass of stateful fuzzing, the outcomes from the previous run become inputs to the next run.

### Defining Stateful Fuzzing

Sounds interesting? Let's illustrate using a simple example.

Imagine you have a balloon. You do one thing to try to pop it, say, drop it. If it doesn't pop, instead of grabbing a new balloon, you apply another action on the same balloon, like kicking or squeezing it.

The same theory applies to our smart contracts. We call a function on our contract, change its state, and then repeat the process on the **same** contract. Quite unlike stateless fuzzing, where you start with a fresh state at every run!

#### Running the Fuzz Test

After ensuring everything is set, we’re now ready to run our fuzz test on this. Perhaps by making 1000 runs initially.

Did it find a bug? No. You may be tempted to increase iterations to say, 10,000, then 100,000 or maybe even to a million runs! But listen, no matter how long you wait for the fuzzer to finish running, it will **never find the bug**

This is because the initial value was mounted at one and the balloon (contract state) you created is still at one, having slipped back to its initial state with each run. The only time it could return zero, breaking our invariant, is when the value changes to zero. Therefore, the contract's state must change.

This is precisely what a stateful fuzz test can find for us!

> _“Talk is cheap. Show me the code.”_  
> _- Linus Torvalds_
