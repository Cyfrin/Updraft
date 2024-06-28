---
title: Recap & Congratulations
---

_Follow along this chapter with the video bellow_



We've ventured into the advanced realm of Solidity, and it has been an enlightening journey, to say the least. Brace yourselves, because we're about to dig deeper. However, we're not using Remix this time around. We are migrating to a code editor for a more comprehensive view and working process of Solidity. And as we transition into advanced sections, let's pat ourselves on the back for mastering the majority of Solidity basics!

But do not rest on your laurels just yet, there's a whole ocean of knowledge still waiting to be explored.

## Advanced Sections of Solidity

There's plenty to learn still, starting from `enums` `event_`, `try/catch` `function selectors`, and `abi encoding hashing`. It may seem daunting at first, but if you've made it this far, chances are, you can already decipher most Solidity code. Great job!

But for now, let’s summarize some of the advanced aspects we've come across.

## Special Functions in Solidity

In the dazzling sphere of Solidity, we have some special functions, namely `receive`, `fallback`, and `constructor`.

These unique functions don't need the `function` keyword to be called.

```js
function receive() external payable { }
```

Both `receive` and `fallback` are unique. They come into play when data is sent through a transaction, but no function was specified. Here, the transaction will default to the fallback function, provided it exists.

And, if this data is empty and there's a `receive` function, the transaction will call this function instead.

## Saving Gas with Keywords

In an era of rising gas prices, Solidity offers a couple of handy keywords like `constant` and `immutable` to help you save gas.

These keywords are for variables that can only be declared and updated once. A perfect example is:

```js
uint constant minimumUSD = 50 * 1e18;
```

In this case, `minimumUSD` can never be changed again, thus saving gas.

While similar to `constant`, `immutable` differs in allowing one-time variable declaration within the `constructor`. After declaration, the variable cannot be changed.

Attempts to update either `constant` or `immutable` variables will be met with compiler errors explicitly stating they cannot be written to.

## Sending Ether with Remix

Remix provides a simple way to send Ether to a contract on the JavaScript virtual machine. Simply deploy the contract, then press the `transact` button without any call data while updating the transaction's value. A lack of call data will trigger the `receive` function (if it exists); otherwise it will set off the `fallback` function.

<img src="/solidity/remix/lesson-4/end/recapend.png" style="width: 100%; height: auto;">

As we delve deeper into the advanced features of Solidity, there's much more to explore. Here's to unraveling the ins and outs of Solidity, and celebrating more milestones together on our coding journey!

Congratulations again for making it this far! You're doing great!
