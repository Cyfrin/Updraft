---
title: A Note on Your New Powers
---

_Follow along with this video:_

---

### New Powers Unlocked

What was really eye opening to me when I was first learning all this, were the questions that started to come to mind. I'd ask things like

***How necessary is the free memory pointer? Isn't it more gas efficient to omit it?***

```js
PUSH1 0x80
PUSH1 0x40
MSTORE
```

- YES! Arguably it is, and you could write things such that it's not included.

***Doesn't it save gas to not check msg.value on creation?***

```js
CALLVALUE
DUP1
ISZERO
PUSH1 0x0e
JUMPI
PUSH0
DUP1
REVERT
```

- Yes! Technically it does. In fact, I challenge you to go add this to our contract and see for yourself, this check will actually be removed from our bytecode!

```js
constructor() payable {}
```

>**Note:** Just because it saves gas, doesn't mean it's the best choice. The msg.value check brings some valuable security functionality such as not accidentally locking a bunch of funds on contract creation. Consider your optimizations carefully!

There are all sorts of optimizations that will spring to mind the more familiar you become with the deeper workings of the EVM and opcodes. In the next lesson we'll introduce `runtime code` in more detail!