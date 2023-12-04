---
title: Function Selectors Introduction
---

_Follow along the course with this video._



---

## Decoding Transaction Data With Ethereum: A Step-by-Step Guide

Have you ever found yourself struggling with transaction data in Ethereum? Muddling through raw transaction data can be quite a challenge, especially if you aren't quite certain if the function you're calling is as it appears on the surface. Let's walk through how you can confirm what function is being called, decode Ethereum transactions, and call functions with parameters.

## The Fund Function

Picture this scenario: You have a system encoded with 'fund' and 'steal money' functions. You enter 0.1, hit _fund_, and find your MetaMask filled with data. At first glance, the data suggests it's calling the 'fund' function, but you'd like to precisely know.

Proving that the system is indeed calling the 'fund' function involves using function selectors. When solidity functions are transformed into function selectors, the human-readable 'fund' is converted into low-level bytecode or Ethereum Virtual Machine (EVM) code to stimulate Ethereum to grasp the function you're calling.

<img src="/html-fundme/3-function-selector/function1.png" style="width: 100%; height: auto;">

## Function Selectors and Checking Functions

Now, every function selector has its unique low-level hex encoding, and that's where the Cast command comes into play. Running 'cat SIG fund' in your system will return a 'fund' function selector. If you'd like to cross-verify this transaction's function, copy and paste the hex data alongside the expected selector in the console.

If they're the same, you can have assurance that it is actually calling the 'fund' function. But if you sense something fishy about the website and suspect it's pulling off some treacherous tactic like calling a malicious function like 'steal money', you can run 'Cast SIG steal money'. This will provide you with the 'steal money' function selector.

Copy the function selectors and verify them against the hex data on MetaMask. If they align, unfortunately, your website is calling the 'steal money' function- not the 'fund' function it should ideally be calling.

<img src="/html-fundme/3-function-selector/function2.png" style="width: 100%; height: auto;">

## Functions With Parameters

Now let's consider the scenario of functions with parameters. In such cases, your hex data is bigger, considering you'll have to accommodate data for calling the function. Cast calldata decode comes in handy in such scenarios.

Running _cast calldata decode_ alongside the call data on the system should reveal all the parameters on a function should they exist. This, however, isn't a perfect example since neither the 'fund' nor the 'steal money' function has any parameters. We'll delve into this a little later.

```
> Cast calldata decode > paste the call data
```

## Withdrawing Funds

Now, consider a different scenario where there's a function to withdraw funds. In this case, let's say this specific withdrawal feature is enabled to the account owner only.

Entering 0.1, hitting _fund_, and confirming the transaction sends the function via the API call. Once sent, calling _get balance_ should reveal that the balance has increased.

Heading to 'function withdraw', the system shows that it's an owner function. Making an attempt to withdraw from another (non-owner) account gets an RPC error since the function is limited to the owner.)However, getting back to the owner account gives a different story. Commanding withdraw and conferring the hex data to the earlier Cast SIG withdraw hex, the matching hexes gives the assurance to confirm the withdrawal. Once the mining is done, just as expected, the balance goes back to zero. So mission accomplished!

```
> Cast SIG withdraw> Withdraw function hex data: copied hex data
```

## Conclusion

In summary, understanding and verifying the transaction data we're handling in MetaMask ensures we're in control of our systems and comfortable in knowing no malicious functions are being called. So go out there and put this to good use, knowing exactly where your transactions are heading.

And remember,

<img src="/html-fundme/3-function-selector/function3.png" style="width: 100%; height: auto;">

We will delve into function parameters, calldata, and much more later. Get started, happy coding!
