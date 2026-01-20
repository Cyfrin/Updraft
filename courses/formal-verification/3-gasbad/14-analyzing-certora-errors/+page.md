---
title: Analyzing Certora Errors
---

_Follow along with this video:_

---

### Analyzing Certora Errors

Let's jump right in and start by running the prover.

```bash
certoraRun ./certora/conf/GasBad.conf
```

![analyzing-certora-errors1](/formal-verification-3/13-analyzing-certora-errors/analyzing-certora-errors1.png)

Running our test results in a bunch of errors in every single contract we're proving! We'll need to dive a little deeper to determine if this is due to our invariant being broken. If we're updating storage without emitting an event, this is the kind of result we'd expect to see.

Drill into the error for GasBadNftMarketplace for a better idea of what's happening here.

![analyzing-certora-errors2](/formal-verification-3/13-analyzing-certora-errors/analyzing-certora-errors2.png)

Well, what's going on here? We initialized our ghost variables with a value, so what gives?

Despite setting initial values, the `Certora` prover assumes that these values can be changed at any point unless specifically instructed that they are static, or `persistent`. Effectively the prover recognizes that our ghost variables have been initialized and then starts changing them to random values.

In our particular circumstance, `Certora` had the variable start at 0, but was unsure if this variable could change. The `transferFrom` call, for example, could be calling `mint`!

> ❗ **WARNING**
> If `Certora` is unsure if a function can interact with a variable - it's going to HAVOC

Here's the thing: even if these values were initialized at `-1`, we wouldn't really expect this to be an issue, from the perspective of our invariant... let's look a bit deeper in the call trace to determine exactly what happened.

![analyzing-certora-errors3](/formal-verification-3/13-analyzing-certora-errors/analyzing-certora-errors3.png)

We can see the calls in our trace which resulted in our hooks being invoked, we can also see the function call which triggered our HAVOC, let's look a little closer at that.

![analyzing-certora-errors4](/formal-verification-3/13-analyzing-certora-errors/analyzing-certora-errors4.png)

Effectively what `Certora` is doing here is recognizing that an external call is being made to an unresolved `callee`. The prover takes this to mean that any response to this call could potentially call any function in our `GasBadNftMarketplace`. As a result of this uncertainty, `Certora` will randomize our variables (ghosts included) to account for potential state changes from the external call.

The result of this randomization is a return which illustrates any edge case which may break our invariant. In our example, the prover set `listingUpdatesCount` to 1 and `log4Count` to 0, breaking our invariant.

### Wrap Up

Alright, we've pinpointed an issue in our formal verification. We can see that `Certora` is HAVOCing our `ghost variables` which is throwing off our assertion accuracy entirely!

Fortunately there's a fairly simple resolution we can apply to mitigate this. I've alluded to it earlier, but in the next lesson we'll take a look at how we can specified `persistent ghost variables` within our `.conf`.

See you soon!
