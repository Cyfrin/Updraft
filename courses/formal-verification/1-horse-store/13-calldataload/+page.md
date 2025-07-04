---
title: calldataload
---

_Follow along with this video:_

---

### Accessing our Call Data's Function Selector

We're already starting to code using pure op codes, very exciting!

Alright, eventually someone is going to send our contract some `calldata` and we need to determine what to do with it. We do this by deriving the `function selector` from the first 4 bytes of the `calldata` being sent.

Fortunately we have an op code just for this purpose! `calldataload` will allow us to load our `calldata` onto the stack.

![calldataload-1](/formal-verification-1/13-calldataload/calldataload-1.png)

So we can see the `calldataload` op code is going to take whatever is on top of our stack, and use it as the `bytes offset`. Since we want to capture our _whole_ function selector, we set this offset to 0 by using `PUSH0` as the operation prior to `calldataload`.

### Keeping Track of the Stack

Something that I like to do is leverage comments in my code as a visual means to keep track of what's on my stack. Here's an example.

```js
#define macro MAIN() = takes(0) returns(0) {
    0x00   // [0]
    0x02   // TOP [2,0] BOTTOM
}
```

In this example, I keep track of my stack and what's in it through commenting an array next to these operations. By adding and removing items in this visual way, you won't need to remember the order your stack is in as you code.

Our Huff contract utilizing the `calldataload` op code should look like this:

```js
#define macro MAIN() = takes(0) returns(0) {
    0x00           // [0]
    calldataload   // [calldata]
}
```

We can see that the `calldataload` op code removed the `PUSH0` and replaced the first item in our stack with the first 32 bytes of `calldata` our contract was sent!
