---
title: T-Swap Manual Review T-Swap Pool - Swap Exact Output
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/tbf65EMdqNI?si=0fDQW6EBfCoVh4Bq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Swapping Exact Output on Uniswap: A Deep Dive

Hello world! Welcome to another dive into the deep, deep ocean that is Uniswap. Today, we'll be examining another function, `swapExactOutput`. This is the reverse of `swapExactInput`, and you'll find, as we explore farther, that there are exciting and potentially scary quirks in how this function operates.

## Understanding `swapExactOutput`

In the case of the `swapExactInput`, as the name suggests, we decided the input token amount beforehand and asked the system to provide us with the corresponding output.

In the `swapExactOutput`, the tables turn. We're going to define the output we'd like to receive. We don't provide any 'minimum input' – this comes across as odd at first glance, as we might expect to be able to set a max input cap. Sounds interesting, right?

Here's a simple example. Let’s say I want ten WETH (Wrapped Ether) as my output and I'm paying using DAI (a stablecoin). When the function gets executed, it figures out how much DAI you need to input to receive the pre-defined ten WETH output.

We pretty much understand how it operates since we've already dissected its sibling, `swapExactInput`. We saw previously an issue relating to high fees, which seems to persist in this function.

## Delving Deeper into `swapExactOutput`

As we know, the devil's often in the details. One crucial conditional from the `swapExactInput` function is missing in `swapExactOutput`. We had previously a safeguard – the output amount should be more significant than the minimum output amount. Now, there's seemingly no protective clause.

> Safety reminder! Always put in place protective clauses like a 'minimum output' or 'maximum input' to avoid catastrophic losses.

Now, let's ponder over an example:

```shell
You want ten WETH as output, and your payment method is DAI.
```

Consider a scenario where you request this swap. Before the transaction is confirmed, a massive trade occurs, shifting the price enormously. Suddenly, your desired output of ten WETH requires an astronomical input of (exaggeration for effect) ten bajillion DAI.

Without an upper limit on the input DAI spent, in instances of sudden, significant price movement, a user could end up experiencing an unexpected dent in their wallet.

## The Solution: Max Input Amount

Along with the 'minimum output amount' in `swapExactInput`, it would be a sensible approach to add a failsafe - a 'maximum input amount. This way, users won't unpredictably run out of their funds during extreme market volatility.

Such a preventative measure safeguards users against excessive spending due to price fluctuations. Safeguards become all the more important considering possible MEV (Miner Extractable Value) attacks - a topic we plan on visiting later.

So there we have it! A seemingly smooth-functioning condition, with an underlying potential issue. We have struck yet another goldmine; we discovered another bug in the wild ecosystem of Uniswap. We'll be diving into the world of MEV soon, so stay tuned and keep exploring!
