---
title: Definitions
---

---

## Clarifying Definitions

Let's tackle some troublemakers, shall we? For starters, there's the mix-up with `one E 18`. It should remain consistent, but sometimes, it floats around your codebase like a rudderless ship. How do you anchor it? With a neat little Solidity trick.

```js
uint256 wad = 11234567891012345678;
```

But wait, let's rewind a bit. What's this `wad` I speak of, you ask? It's not just a cryptic collection of digits; it's a powerful implementation choice in our favorite blockchain language, Solidity. Definitions, in Solidity's case CVL (or the Crystal-ball Virtual Language of Smart Contracts), act as your go-to macros. They help ensure your expressions are not just used consistently, but also checked robustly by the compiler's type system.

![](https://cdn.videotap.com/618/screenshots/hNgRsRV1kP1osCPCke0W-17.25.png)

Caught an "Oops" moment? No problem. As any experienced coder knows, parentheses are more than just curve lines; they're lifesavers.

## Emphasizing the Importance of Constants

A constant in Solidity (like `one E 18` down here) is more than a stubborn refusal to change. It's a dependable rock in the ever-shifting sands of smart contract development.

### Why Solidity Loves Constants

- **Predictability:** In a world where every transaction costs real money, knowing exactly what values will do is paramount.
- **Security:** Constants don't change, and in the realm of blockchain, change is not just a source of innovation but potential vulnerabilities too.

Gather around the laptop, my fellow blockchain enthusiasts, and let's code with some style.

Now repeat after me: I shall not hardcode constants throughout my smart contracts. Instead, I'll declare it once, and reference it—like a boss.

## Balancing Casual with the Technical

Understanding and using CVL—like the seasoned Solidity savant you are—means saying goodbye to the "search and hope" method of constant replacement. Instead, you encapsulate these universally applied expressions in a type-checked sanctuary—ensuring every digit and decimal is exactly where it should be.

Here's the part where I throw in an inspirational quote to keep the momentum:

> "In solidity and life, consistency is the hobgoblin of little minds. Be bold, but also, be precise."

'Cool' doesn't just describe the latest meme or cat video. It's the feeling you get when your Solidity constants are neatly encapsulated and your smart contracts hum with efficiency. So, there we have it, an overview of using definitions and constants in Solidity that didn't read like a dusty old textbook.

## In Conclusion: Smart Contract Best Practices

Before you scurry off to refactor your entire codebase with this newfound knowledge, let's recap, shall we?

1. Understand the importance of definitions and treat them with respect. They’re here to make your life easier.
2. Embrace constants – they are the unsung heroes of the blockchain world.
3. Keep things light but precise – if you can explain it to your non-coding friend, you've truly mastered it.

And remember, in the world of blockchain and Solidity, it's not just about writing code; it's about writing history. Let's make sure ours doesn't have any unnecessary `one E 18s` floating around.

Stay coding, stay cool, and here's to making those smart contracts a little smarter.
