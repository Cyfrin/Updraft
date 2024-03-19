---
title: A note on your newfound opcode inspecting powers
---

---

## What is Gas Efficiency and Why Does it Matter?

Gas is the fuel that powers transactions and operations on the Ethereum network. It’s a unit that measures the computational effort required to execute operations, much like fuel in a car. When deploying or interacting with smart contracts, everything costs gas. And just like in the real world, efficiency is key; the less gas you need, the less you spend.

## Mind-Blowing Optimizations: The Free Memory Pointer

Let me paint a picture for you. We have this thing called the "free memory pointer" that exists in the wild west of Ethereum smart contracts. One day, as I was tearing apart contract code, I stopped and wondered why we even bother with this. It turns out, removing the free memory pointer would indeed make the contract more gas-efficient.

Exciting, isn't it? Cutting out unnecessary code and saving on gas! But let's not pop the champagne just yet—there's more to consider.

## The Caveat: Security Checks

As we drill down, we notice checks for things like call data and message values. These are akin to quality control in a factory—ensuring that everything runs smoothly and securely.

We surmise that removing these checks could save us even more gas. It's like deciding not to service your car as often—lower costs, for sure, but at what risk?

It's thrilling to realize we could be more gas-efficient by simply applying a "constructor payable" approach—voila, you've trimmed the fat! If you're as geeky as I am, you'd compile the altered contract and verify that the security-check section hops the train out of there.

But here's the kicker: do we want to eliminate every single check, like the one for message value? This might be beneficial from a penny-pinching perspective but potentially catastrophic for security. Imagine accidentally sending a million dollars into the void—yikes!

## The Fine Balance: Gas Efficiency vs. Security

Could we be more gas-efficient? Absolutely! Should we toss every check out the window? Not on your nelly! These checks, albeit slightly gas-hungry, are the crumple zones of our smart contract vehicle—tiny safety features that could save our proverbial skins.

> "Optimization is a double-edged sword; wield it with security as your shield." – A Wise (and Paranoid) Programmer

When it comes to the free memory pointer on contract creation code, however, I'd argue that's a redundancy we can afford to eliminate. Let's face it—some gas-saving measures just make sense.

## Saving Gas on Contract Creation: The Payoff

By implementing a constructor payable, we revolutionize the deployment of our smart contract. It's like finding a shortcut on your daily commute that not only gets you to work faster but also saves you a couple of bucks on fuel. And in this blockchain journey, every bit of efficiency counts.

## The Challenge: Put it to the Test

So you've seen the code snippets, you've ridden the highs and lows of potential gas savings, and now it's your turn. I challenge you to take your smart contract, add that constructor payable, and then go compile it.

![Gas savings screenshot](https://cdn.videotap.com/618/screenshots/P5KyVv7Hiekhfw2zFHRy-100.59.png)

Sure enough, you'll notice that the gas-guzzling section has retired. And just like that, you're a gas-saving hero!

## The Takeaway: Write Smart, Deploy Smarter

Teetering on the edge of optimization and security can feel like a high-wire act without a safety net. But armed with knowledge and a sprinkling of caution, we can write smart contracts that aren't just brilliantly efficient, they’re secure citadels guarding against the "fat finger" errors of our human nature.

Contract creation code? Cha-ching—you've nailed it. Keep those necessary checks in place, but don’t be afraid to clarify where you can save. Because in the end, the art of writing smart contracts is all about finding that sweet spot between being frugal with your gas without leaving your doors unlocked.

Remember, it's not just about being able to write optimized code; it's about understanding where and why each line exists. As you embark on this journey of contract creation, never forget the delicate dance between efficiency and security. With these revelations in hand, you are now equipped to deploy smarter and more secure smart contracts on the blockchain.

May your transactions be swift, your contracts optimized, and your gas fees low. Raise the bar of your smart contract game, one opcode at a time. Happy coding!

## Additional Details from the Original Transcript

The original transcript provided some additional helpful details that can give further context around optimizing smart contract constructors for gas efficiency. Here are some key points:

- Removing unnecessary checks like the free memory pointer can directly save on gas costs during contract deployment. Every little bit adds up!
- However, we still want to keep critical security checks in place even if they cost a small amount of additional gas. Accidentally sending huge amounts of value to a contract would be catastrophic.
- The specific opcode length of certain security checks is often negligible in terms of gas costs. Keeping a dozen extra opcodes for validation is worth it for security.
- There are slight differences in gas efficiency between specific constructor patterns like `constructor() payable {}` vs `function Contract() payable {}`. But these are implementation details and the constructor approach gets you 80% of optimized savings.
- When first learning solidity, it can be mind-blowing to realize how much more gas efficient you can make contracts compared to initial assumptions. But that knowledge is powerful when balanced with security.

The key takeaway is that gas optimization and security go hand-in-hand. You want to remove clear redundancies like unnecessary pointers, but not sacrifice application integrity. This is the art of smart contract creation—understanding the purpose behind each line of code.

With diligence and common sense, significant gas savings are possible. And in the world of blockchain, every iota of efficiency matters when transactions and operations carry real costs. Our journey of never-ending improvement continues one small revelation at a time!
