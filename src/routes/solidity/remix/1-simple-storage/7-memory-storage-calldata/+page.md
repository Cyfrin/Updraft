---
title: Memory, Storage, and Calldata
---


*Follow along with the course here.*


<iframe width="560" height="315" src="https://www.youtube.com/embed/ISBvYpFBTyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

One aspect that crashes the compilers and gets heads scratching is the `memory` keyword, which we can gloss over, as it's heavily entwined with the data locations in Solidity. You might be puzzled when you delete the keyword sometimes and you receive a compilation error. Let's dive into this conundrum.

## Data Locations in Solidity

Solidity allows data to be stored in 6 locations:

1. Stack
2. Memory
3. Storage
4. Calldata
5. Code
6. Logs

For the purposes of this post, we will focus on three principal ones: Call Data, Memory, and Storage. Adding a word of caution – this can get quite intricate. If you don’t comprehend everything on the first go, remember perseverance is the key.

## Call Data and Memory: Temporary Variables

<img src="/solidity/remix/lesson-2/memory/memory1.jpg" style="width: 100%; height: auto;">


In Solidity, `call data` and `memory` relate to temporary variables that only exist during the execution of a function. If you run a function with a variable name for once, you can access it only for that particular function execution. If you try to retrieve the variable in the next function execution, you will fail because it was stored temporarily.

Example:

```bash
string memory name = "Patrick";
uint256 favoriteNumber = 7;
```

Strings need special attention. In Solidity, you must specify either memory or call data due to the way arrays work in memory. Most variables automatically default to memory variables, while strings require explicit specification.

<img src="/solidity/remix/lesson-2/memory/memory3.png" style="width: 100%; height: auto;">


So far, so right, but why do we have two variants of temporary variables? Let's explore more with an example.

<img src="/solidity/remix/lesson-2/memory/calldata.png" style="width: 100%; height: auto;">


Now, If we replace `memory` with `call data` and try to compile it, we receive an error message. This occurred because, unlike `memory` variables, `call data` variables can't be manipulated – they are read-only.

## Storage: Permanent Variables

While `call data` and `memory` are designated for temporary variables, `storage` is for permanent variables that can be altered.

<img src="/solidity/remix/lesson-2/memory/memory2.jpg" style="width: 100%; height: auto;">


Variables declared outside any function, directly under the contract scope, are implicitly converted to storage variables.

```bash
contract MyContract {
    uint256 favoriteNumber = 123
    };
```

You can always retrieve these permanent variables later, even outside function calls.

## The Essence of Memory Keyword

Now, you might be thinking, why do we explicitly use the `memory` keyword on the String and not on the `uint256`, also you'll get an error stating `Data location can only be specified for array, struct, or mapping type`.

<img src="/solidity/remix/lesson-2/memory/memory-err.png" style="width: 100%; height: auto;">


Solidity recognizes `string` as an array of bytes (a special type) and due to memory management workings, we need to use `memory` with it. Primitive types such as the `uint256` are smart enough and know where to be located under the hood.

Remember, you can't use the `storage` keyword for temporary variables inside a function. Only `memory` and `calldata` are allowed here because the variable only lives for a short duration.

## Key Takeaway

- When passed as function parameters, structs, mappings, and arrays in Solidity need to use the explicit `memory` keyword.
- Strings, considered an array of bytes, require explicit `memory` or `call data` keyword.

Congratulations for reaching this point, now let's delve into Solidity mappings.