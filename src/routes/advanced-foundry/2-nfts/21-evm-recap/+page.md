---
title: Advanced EVM - Encoding functions recap
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/9E7ierp9tZc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Hello there! Trust me when I say we've covered a lot of ground together on this fascinating journey into the world of Solidity. But fear not, we're not done unraveling its complexities and building our understanding one block at a time.

## Quick Recap

Before we dive into today's topic – the magic of call function, let's do a quick refresher on what we've explored in our previous discussions.

### Combining Strings

You remember how we’ve talked about combining strings with the syntax like `Abi.encodePacked()` and then typecast it to a string, right? And you’ll recall how we observed that in newer versions of Solidity, the syntax looks something like `string("hi mom, miss you")`. It's important to note that this works well in the newer versions, but might throw an error in the older Solidity versions.

### Understanding Low-Level Concepts

We also took a deep dive into some low-level concepts, didn't we? We learnt about compiling our contracts, dealing with the mysterious ABI file and that weird binary thing (you know, that string of numbers and letters that makes our heads spin!). When we deploy a contract, this obscure code is what gets sent in the 'data' field of our contract creation transaction.

For contract creations, the data is populated with binary code. When it comes to function calls, the data is used to define what functions need to be called and with what parameters. But fret not, this is precisely what we're prepping ourselves to learn next!

### Decoding the Enigma of Binary Encoding

Remember how we can encode just about anything we want into this 'number and letter' code to save space through a method called `encodePacked`? We also learnt we can decode stuff that's been encoded, although we can't decode stuff that was encoded with the `encodePacked` method. Interesting, isn't it? We mastered multi encoding and then multi decoding, thus adding several cool tricks to our Solidity hats!

### Introducing the Call Function

Onwards, we analyze the power of the 'call' function. We realized that we can add data in the call function to make any call we want to any smart contract. Powerful, isn’t it?

<img src="/foundry-nfts/21-evm-recap/evm-recap1.png" style="width: 100%; height: auto;">

## Next Up: Handling the Call Function

I bet you're raring to go now! So, let's deep dive into this exciting concept of how to use the 'call' function to make any calls we want to any smart contract.

Before you head out though, now's a great time to take that much-needed break. We just went over some brain-racking concepts. And like I always say, it's absolutely fine if you don't get everything the first time around. It's a complex subject and we're here for the entire marathon, not just the sprint. So feel free to revisit these ideas at your own pace and keep exploring this fascinating world of Solidity. Until next time!
