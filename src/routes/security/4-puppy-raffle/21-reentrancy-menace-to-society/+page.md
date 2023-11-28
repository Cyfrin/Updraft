---
title: Reentrancy - Menace to Society
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Beware of the Reentrancy Attack in Your Smart Contract

In the world of crypto and blockchain, security is a paramount concern. When dealing with a web infrastructure that transacts and stores billions of dollars, any weakness in the security system could lead to irreversible financial loss. Many of these losses have been attributed to something known as the Reentrancy Attack, which still ranks among the top ten Decentralized Finance (DeFi) attacks of 2023\[^1^\].

In this post, I will thoroughly discuss Reentrancy Attacks, shed some light on tools that can help you identify them, suggest common-sense approaches to avoid them, and indulge in a little history by revisiting one of the most infamous cases of Reentrancy Attack.

![](https://cdn.videotap.com/NRMDW7u49DDoO3HwaIgb-20.75.png)## What is a Reentrancy Attack?

A Reentrancy Attack is a malicious maneuver where an attacker repeatedly calls a function within a Smart Contract before the original function has finished executing. This repetition allows the attacker to drain funds or manipulate data in an unintended way.

## The Dogged Persistence of Reentrancy Attacks

A glance at the data available in our GitHub repository\[^2^\] related to this course reveals that Reentrancy Attacks have rather stubbornly stuck around. Not only are they persisting, but their occurrence rate is even increasing.

"More people have still gotten hit by Reentrancy Attacks. It is still a common attack vector and is still stealing millions of dollars out of web three."

Despite the availability of static analysis tools like Slither, which are fantastic at detecting them, these attacks somehow still find their way through the cracks. The issue with the 'puppy raffle' clearly demonstrates this point.

## A Peek into the Past: The DAO Hack

A great way to understand Reentrancy Attacks is to look back at their history and study some notable case studies. The DAO (Decentralized Autonomous Organization) Hack is one such case and remains one of the most notorious Reentrancy Attacks in history\[^3^\].

In May 2016, the DAO managed to attract nearly 14% of all Ether tokens issued to date. However, this promising start came to a halt when it was discovered to have a massive bug. The 'reward withdrawal' form was one of the main culprits, having an insidious pattern: it made an external call and then updated the state.

```
function withdrawRewardFor (address _account) noEther public returns (bool _success) {if ((balanceOf(_account) == 0)&& (rewardAccount.earned(_account) == 0))throw;uint reward = rewardAccount.earned(_account);if (!rewardAccount.reward(_account))throw;if (!_account.call.value(reward)())throw;Withdrawal(_account, reward);return true;}
```

In the code snippet above, you can see that an external call is made and immediately followed by a state update. It clearly did not adhere to best practices, which resulted in a severe and costly failure—a crucial element in what would later be known as the DAO Hack.

## Proactive Solutions to Thwart Reentrancy Attacks

The Reentrancy Attack can be complicated, but its solution is surprisingly straightforward: "If you make an external call that can reenter the same function before you update some state, you are likely paving the way for a successful Reentrancy Attack."

By adhering to coding best practices and utilizing the numerous security tools available, we could drastically reduce the occurrence and the potential damage of these attacks.

## Summing Up and Looking Ahead

The unfortunate persistence of Reentrancy Attacks indeed serves as a wake-up call. They continue to plague the digital financial world, stealing massive sums of money and causing significant disruption.

But as we continue to innovate and work towards a more secure Web 3, it's essential to take any setbacks as learning opportunities. An in-depth understanding of attacks like this one, along with the proactive application of recently developed solutions, will surely pave the way for a more secure future.

\[^1^\]: [DeFi Attacks](https://github.com/course/dapp/DeFi-Attacks)\[^2^\]: [Course GitHub Repository](https://github.com/course/dapp/)\[^3^\]: [DAO Hack Case Study](https://github.com/pascal/cdapp/DAO-Hack)
