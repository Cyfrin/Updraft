---
title: Basic Solidity Types
---

*If you'd like, you can follow along with the course here.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/rGckm0GeQFc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Learning about Solidity Types

Solidity supports many different types, from primitive types like integers to complex ones like user-defined types. You can read more about them in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.20/types.html#types).

For now, let's focus on some of the basic types:

- **Boolean:** Represents true or false value.
- **Uint:** Uncapped positive whole number (An unsigned integer).
- **Integer:** It could be positive or negative. (Whole numbers only, no fractions or decimals).
- **Address:** A unique identifier similar to our everyday address.
- **Bytes:** A set of bytes (a lower-level type that could be a string in hexadecimal representation).


<img src="/solidity/remix/lesson-2/solidity-types/types.png" style="width: 100%; height: auto;">


## Variables definitions in Solidity

Now, let's understand variables. They are just placeholders for values, and these values can have one of the types from the list above (or even other types). For instance, we could create a Boolean variable named `hasFavoriteNumber`, which would represent whether someone has a favorite number or not (`True` or `False`).

```bash
bool hasFavoriteNumber = true;
```

In the above statement, the variable `hasFavoriteNumber` now represents `True`.

String and bytes have a special connection. In fact, strings are just bytes with special treatment for text. So, a string text can easily be converted to bytes.

## The Magic that is 'Bytes'

Bytes could be observed in many shapes and forms, like an assortment of characters or words written in hexadecimal representation. Like integers, bytes too can be allocated size (but only up to `32`). For example:

```bash
bytes4 myBytes = "test";
```

In the above statement, `myBytes` is a bytes variable, of size 4, holding the value "test".

## Solidity Contract: Storing Favorite Numbers!

Let's mark up a simple contract where we aim to store the favorite numbers of different people. We would only need the variable `favoriteNumber` of type Uint for this task.

```bash
uint256 favoriteNumber;
```

Now every variable in Solidity comes with a default value which may or may not be initialized. Like Uint256, it's default to Zero (0) and an uninitialized boolean defaults to `False`.

```bash
uint256 favoriteNumber = 0;
```

Above statement suggests that favoriteNumber has been set to the default value of 0.

## Wrapping Up

You've just created one smart contract and explored fundamental types and variables in Solidity in the process. Remember to write comments in your code. They’re like your map when re-visiting your code or explaining it to others.

So, keep experimenting, keep learning and let's continue with the next lesson.