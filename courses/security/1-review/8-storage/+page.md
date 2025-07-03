---
title: Storage
---

_Follow along the with the video_

---

In this lesson, we are going to discuss some important aspects related to variables in Solidity. Much of what we'll cover is conveniently summarized in the [**Solidity documentation**](https://docs.soliditylang.org).

## Understanding Global Variables and Storage

First and foremost, we need to familiarize ourselves with the concept of `Storage`. In Solidity, when we refer to variables that are global or those that persist over time, we are actually referring to variables that exist in `Storage`.

![block fee](/security-section-1/8-storage/storage1.png)

Think of `Storage` as a huge array or list that contains all the variables we create in Solidity. When we declare a variable in a contract—say a contract named `fundamentalStorage`—to be a certain value, such as `favoriteNumber`, we're essentially demanding this variable to persist. This persistence is obtained via `Storage`.

In code this looks like:

```js
contract fundamentalStorage {
    uint favoriteNumber;
}
```

This `favoriteNumber` variable is stored in the `Storage` and can be called whenever required.

Now, `Storage` is essentially an array where every variable (and its value) gets slotted into a 32 byte long slot. This is crucial in understanding how Solidity manages memory and data storage. The indexing of these storage slots starts from 0, and increments just like array indexing in most languages.

```javascript
contract fundamentalStorage {
    uint favoriteNumber = 25;
    bool ourBool = true;
}
```

For instance, if a variable—`favoriteNumber`—is assigned the number 25, this number is stored in its bytes implementation `0x19`.

## Dealing with Dynamic Variables

While static variables are straightforward, things get slightly intricate with variables that are of dynamic length or can change length. Variables in the form of dynamic arrays or mapping are stored using some type of hashing function (outlined in the documentation).

The object itself does take up a storage slot, but it doesn't contain the whole array. Instead, the storage slot contains the length of the array. If we add a new element to the array by calling `myArray.push(222)`, the array's length and the new element are stored at separate locations determined by the hash function.

```js
contract exampleContract {
    uint[] myArray;

    function addToArray(uint _number) public {
        myArray.push(_number);
    }
}
```

In the code example above, `myArray.length` is stored in `storage slot [0]`, while the elements within the array (myArray.push(\_number)) are stored at `storage slot [keccak256(0)]`.

## Constant and Immutable Variables

Interesting to note is the fact that constant and immutable variables do not occupy spots in `Storage`. This is because such variables are incorporated within the bytecode of the contract itself. Solidity automatically substitutes any reference to these variables with their declared values.

```js
contract exampleContract {
    uint constant x = 123;
}
```

In the example above, the constant variable `x` does not occupy a storage slot.

## Temporary Variables: Function Scope

For variables that are declared inside a function, their existence is ephemeral and scoped merely to the span of that function. These variables do not persist inside the contract and are not stored in `Storage`. Instead, they're stashed in a different memory data structure, which deletes them as soon as the function has finished execution.

```js
contract exampleContract{
    function myFunction(uint val) public {
        uint newVar = val + 5;
    }
}
```

In this example, `newVar` only exists for the duration of `myFunction`.

## Memory Keyword: Necessary for Strings

Finally, the `memory` keyword. Primarily used with strings, `memory` is needed because strings are dynamically sized arrays. By using this keyword, we tell Solidity that string operations are to be performed not in `Storage`, but in a separate memory location.

Solidity needs this explicit instruction because arrays and mappings require more space, hence the need to ensure that space is allocated in the appropriate data structure.

Here's a code snippet using `memory` keyword with string:

```javascript
contract exampleContract{
    function getString() public pure returns (string memory) {
        return "this is a string!";
    }
}
```

All of what we've covered here is outlined in detail in the Solidity Documentation. Understanding these concepts and how Solidity handles variables is integral to attaining a deeper understanding of the language and compiler.

> "Understanding the nitty-gritty of Solidity variables and storage will significantly amplify your solidity coding skills."
