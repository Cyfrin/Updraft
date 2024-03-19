---
title: What is function dispatching
---

---

# Understanding Solidity Smart Contracts with Remix and Foundry

The blog post aims to demystify how we can interact with smart contracts on the Ethereum blockchain using tools like Remix and Foundry. It explores what happens behind the scenes when we make function calls to smart contracts.

## How Call Data Works

When you interact with a smart contract in Remix, you might be surprised to see that the input sent is a "jumble of numbers". This input is called the **call data**, and it is crucial because it tells the smart contract what task to perform.

For example, if you call the `updateNumberOfHorses` function, the call data might look like:

```
0x2f2e2123450000ab...
```

So what does this string of data represent and how does the smart contract know how to interpret it? This is where **function selectors** come in.

## Function Selectors

Every function in Solidity has a **signature** - a unique identifier formed by hashing its name and input types. The first 4 bytes of the call data correspond to the function selector.

So when you call `updateNumberOfHorses`, Remix sends the selector `0xcdfea2e...` at the start of the call data. This acts like an address sign, telling Solidity which specific function you want to call.

## Function Dispatching

Behind the scenes, Solidity has a **function dispatcher** that matches the selector to the intended function and routes the call accordingly. This dispatching happens automatically when smart contracts are compiled.

However, if writing in a lower-level language like Huff, you have to manually set up the dispatcher yourself to connect call data to functions. This gives more control but requires extra work.

## Putting It Together

In summary, here is the full process when calling a function:

1. Your call data is sent to the smart contract
2. Smart contract sees the function selector in the first 4 bytes
3. Dispatcher uses selector to route call to correct function
4. Function executes based on the call data

So while calling functions may seem magical, there are underlying mechanisms that enable this to work - function selectors and dispatchers.

## Huff vs Solidity

The core concepts around call data and dispatching apply whether using Huff or Solidity. The key difference is Huff operates at a lower level so you manage more of these details directly.

Remix and Solidity handle a lot of this complexity behind the scenes. But understanding what's happening underneath is valuable for any blockchain developer.

## Conclusion

Through exploring call data, function selectors, and dispatching, the "magic" of interacting with smart contracts is demystified. These crucial pieces enable our function calls to execute properly.

While Remix and Solidity simplify things, seeing the lower-level mechanics gives deeper insight into blockchain development. This knowledge empowers you to build more advanced smart contract systems.

So next time you call a function, remember the intricate mechanisms working to make it happen! Use tools like Huff to go beyond the surface and master the blockchain arts.
