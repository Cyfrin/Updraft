---
title: Upgradeable Smart Contracts & Proxies
---

_**Follow along with this video.**_



---

Welcome to another informative blog post on the world of smart contracts. In this lesson, we will take a closer look at upgradable smart contracts, exploring the good, the bad, and the vital information you need to use them.

To put this into perspective, upgradable smart contracts are a complex subject with potential drawbacks, which isn't the best route to default on. They sound great in theory, promising flexibility and adaptability. However, we've repeatedly seen that when there's too much centralized control over contracts, problems arise.

::image{src='/upgrades/1-intro/upgrade1.png' style='width: 100%; height: auto;'}

Let's dig deeper to understand the nuance of this subject and why it's important for your career as a smart contract developer.

::image{src='/upgrades/1-intro/upgrade2.png' style='width: 100%; height: auto;'}

## What Are the Downside of Upgradable Smart Contracts?

If you asked for real-life examples of where the potential downsides of upgradable smart contracts have manifested, it's safe to say we've got plenty. From hacks to lost funds, the risks are real.

This is where the immutable nature of smart contracts comes in - a feature that developers cherish since it implies that once a contract is deployed, nobody can modify or tamper with it. Interesting enough, the unchangeable aspect can become a pain if we want to upgrade a contract to perform new functions or squash a bug.

The exciting thing is, though the code deployed to an address is immutable, there's still room for change. In fact, smart contracts update all the time. Think token transfers or any functionality really—they frequently update their balances or variables. In other words, while the logic remains unchangeable, the contracts aren't as static as they seem.

## Upgrading Your Smart Contracts: A Guided Approach

So, if upgrading smart contracts tampers with their essential immutability, how can we approach the situation more wisely? Let's look at three different patterns or philosophies we can use:

1. Not really upgrading
2. Social migration
3. Proxy (with subcategories like metamorphic contracts, transparent upgradable proxies, and universal upgradable proxies)

### Not Really Upgrading

The "Not Really Upgrading" method is the simplest form of "upgrading" a smart contract. The idea here is parameterizing everything—the logic we've deployed is there and that's what users interact with. This involves having setter functions that can change certain parameters.

For instance, if you have a set reward that distributes a token at a 1% rate every year, you can have a setter function to adjust that distribution rate. While it's easy to implement, it has limitations: unless you anticipated all possible future functionality when writing the contract, you won't be able to add it in the future.

Another question that arises is—who gets access to these functions? If a single person holds the key, it becomes a centralized smart contract, going against decentralization's core principle. To address this, you can add a governance contract to your protocol, allowing proportional control.

### Social Migration

In line with maintaining the immutability of smart contracts, another method is social migration. It involves deploying a new contract and socially agreeing to consider the new contract as the 'real' one.

It has some significant advantages, the main being the adherence to the essential immutability principle of smart contracts. With no built-in upgradeability, the contract will function the same way, whether invoked now or in 50,000 years. But one major disadvantage is that you'd now have a new contract address for an already existing token. This would require every exchange listing your token to update to this new contract address.

Moving the state of the first contract to the second one is also a challenging task. You need to devise a migration method to transport the storage from one contract to the other. You can learn more about the social migration method from [this blog post](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) written by Trail of Bits.

### Proxies

Finally, let's talk about proxies, the holy grail of smart contract upgrades. Proxies allow for state continuity and logical updates while maintaining the same contract address. Users may interact with contracts through proxies without ever realizing anything changed behind the scenes.

There are a ton of proxy methodologies, but three are worth discussing here: Transparent Proxies, Universal Upgradable Proxies (UPS), and the Diamond Pattern. Each has its benefits and drawbacks, but the focus is on maintaining contract functionality and decentralization.

## Key Takeaways

Dealing with upgradable smart contracts can be complex, but understanding the pros and cons helps in making the right decision while developing smart contracts. Do remember that upgradable smart contracts might have their advantages, but they also come with their possible drawbacks, such as centralized control and increased potential for breaches. Always weigh the necessity against the risks before deciding on using upgradable smart contracts.

That was it for todays lesson. I hope you enjoyed it and learned something new. We well see you again on the next chapter so keep learning and keep building!
