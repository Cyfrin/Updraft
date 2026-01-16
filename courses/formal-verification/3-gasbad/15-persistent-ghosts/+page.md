---
title: Persistent Ghosts
---

_Follow along with this video:_

---

### Persistent Ghosts

So where does our `Certora` situation leave us? The call trace we were provided actually provides a clue we can use to side step this issue of our ghost variables being HAVOC'd.

![persistent-ghosts1](/formal-verification-3/14-persistent-ghosts/persistent-ghosts1.png)

It can be seen, within the function call which resulted in our HAVOC, a flag which indicates:

**_All non-persistent ghosts were havoc'd_**

Well, how do we make our ghosts persistent? The required adjustment is pretty simple, but comes with further considerations.

Certora CVL has a keyword `persistent` which we can use to resolve this issue. You can read more on [**Ghosts vs Persistent Ghosts**](https://docs.certora.com/en/latest/docs/cvl/ghosts.html#ghosts-vs-persistent-ghosts) in the Certora docs.

```js
persistent ghost mathint listingUpdatesCount {
    init_state axiom listingUpdatesCount == 0;
}

persistent ghost mathint log4Count {
    init_state axiom log4Count == 0;
}
```

This would technically _solve_ our HAVOC problem, but it's worth considering that while this make our proof `valid`, it does not allow it to be `sound`. Simple put, these external calls _could_ change the value of variables in storage, but the use of the `persistent` keyword is effectively choosing to ignore this.

### Wrap Up

Great, we've learnt of a work around for our HAVOC situation, but... we don't really want to employ it. Applying the `persistent` keyword is going to ignore some real world potentialities that are worth taking into account with our protocol, so let's leave them off our Ghosts for the time being.

In the next lesson, we'll investigate a different approach to better control the scope of our formal verification runs.
