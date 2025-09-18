---
title: Opcode EQ
---

_Follow along with this video:_

---

In this lesson we're going to take the next step in routing our `calldata` to the appropriate function! Previously we'd isolated our function selector and we'd said:

```
If f_select == updateHorseNumber -> jump to that data in the contract
If f_select == readNumberOfHorses -> jump to that data in the contract
```

Let's look at how we perform these comparisons in Huff. Our function selectors for these functions are as follows:

```
updateHorseNumber = 0xcdfead2e
readNumberOfHorses = 0xe026c017
```

These selectors can be determines by running `cast sig "updateHorseNumber(uint256)"` and `cast sig readNumberOfHorses()` respectfully. Once we have these signatures, there's an opcode we can use to check equality, the `EQ` opcode! Let's review how it works in [**evm.codes**](https://www.evm.codes/?fork=shanghai)

![opcode-eq-1](/formal-verification-1/19-opcode-eq/opcode-eq-1.png)

As we can see, the `EQ` opcode takes the top item on our stack and compares it to the next item in the stack. This opcode will return `1` if the values compared are equal and `0` if they are not equal.

Let's remind ourselves of our current contract state:

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr   // [function_selector]
}
```

Our stack currently has the isolated `function selector` from our received `calldata` on it, so to perform our comparison we'll need to `PUSH` our function selector to the stack and then execute the `EQ` operation! Our contract (and stack) are going to look this like as a result:

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]
    0xcdfead2e // [0xcdfead2e, function_selector]
    eq         // [true_if_func_selector_matches]
}
```

Let's next take a look at how to handle when a match is found!
