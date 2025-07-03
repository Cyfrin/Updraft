---
title: SLOAD MSTORE RETURN
---

_Follow along with this video:_

---

Having got this far the next steps we take should be pretty straight forward. Let's outline what we need for our `GET_NUMBER_OF_HORSES()` macro.

1. Get the applicable storage slot
2. Load the value of that slot into memory
3. return

There are 3 op codes we'll be working with do accomplish this. The first is `SLOAD`

![sload-mstore-return-1](/formal-verification-1/33-sload-mstore-return/sload-mstore-return-1.png)

Our SLOAD op code takes a single stack input - our key which points to the location of the storage slot we want to load from. This is a very gas intensive operation, be mindful!

The output we expect from this op code is of course - the value stored at that location. It adds this to the top of our stack.

The other op code we'll be looking at, is the `return` op code.

![sload-mstore-return-2](/formal-verification-1/33-sload-mstore-return/sload-mstore-return-2.png)

`return` functions very similarly to `stop` in that is halts execution of our code. The difference here is that `return` is going to return requested data when it's executed. We can see in the above screenshot that `return` takes 2 stack inputs that allow us to define what data we want returned `offset` and `size`.

It's important to notes, however, that the `return` op code returns data from _memory_, not storage. As an extra step, we need to load our data into memory first. To do this we'll be leveraging the `mstore` op code.

![sload-mstore-return-3](/formal-verification-1/33-sload-mstore-return/sload-mstore-return-3.png)

`mstore` functions just like `sstore`, which we used previously, except this op code is going to push to memory, no storage.

We can recall that memory, can be considered effectively the same as storage, like a giant array, except memory is deleted after a transaction completes.

Let's keep going!
