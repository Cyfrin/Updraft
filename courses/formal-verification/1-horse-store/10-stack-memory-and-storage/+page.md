---
title: EVM A Stack Machine Memory & Storage
---

_Follow along with this video:_

---

### Expanding on The Stack

Let's expand further on the concepts from the previous lesson because there are two more locations to which data can be allocated.

- Memory
- Storage

![memory-and-storage-1](/formal-verification-1/10-memory-and-storage/memory-and-storage-1.png)

As depicted above, unlike the stack, data can be stored and retrieved from any slot available.

The important distinctions to keep in mind when considering `memory` and `storage` are:

- Memory is temporary and data will be cleared when an operation completes.
- Storage is persistent and data will remain accessible when an operation completes.

In addition to these, accessing data in `storage` is _much_ more expensive than that of data in `memory`. This can be seen clearly when comparing the appropriate op codes at [**evm.codes**](https://www.evm.codes/?fork=shanghai) (we'll be referencing this a lot, you might want to book mark it!).

I'll draw your attention to the SSTORE and MSTORE

![memory-and-storage-1](/formal-verification-1/10-memory-and-storage/memory-and-storage-1.png)

We can see clearly to what extent I mean _"more expensive"_. The difference in gas when accessing data in `storage` is **massive.**

In the next lesson, I'll introduce you to two more op codes you're likely to see quite often, `PUSH` and `ADD`.
