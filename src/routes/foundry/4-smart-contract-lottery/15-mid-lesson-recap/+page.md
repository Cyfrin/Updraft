---
title: Mid-Lesson Recap
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/K253axaJs4k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Decoding our Smart Contract: A Dive into Chainlink VRF

Congrats on making it this far! You're earning your stripes as a blockchain developer. Let's take a step back and review what you've accomplished so far, draft a roadmap for what's next, and allow the elegance of your well-written smart contract to sink in.

)## The 'Raffle Contract' - Going Beyond Vanilla

Your robust 'raffle contract' trusts Chainlink's VRF (Verifiable Random Function) to find its random number, ensuring fairness and opacity - the two pillars of any lottery system. Revealing the inner workings, you find a wealth of state variables and a detailed, attention-demanding constructor. Worth noting, this constructor is laying the groundwork for the rest of your smart contract.

## Buying into the Raffle &amp; Ensuring FairPlay

Then comes the 'enter raffle' function, which is instrumental in ticket purchasing while certifying that only players who have paid the appropriate entrance fee can enter, thus maintaining the sanctity of the game. Your players are then added to the list (array) of contestants who are a lucky draw away from the prize.

After an adequate timeframe, the 'checkUpkeep' swings into action. Curious how it's signaled when to move? Stick with me! Once certain conditions are met, such as the elapsing of time and players entering the raffle, this function is invoked.

## The Decentralized Draw

Here's where things heat up! If 'checkUpkeep' returns true - indicating that it's time for the lottery draw - Chainlink nodes, working in unison in a decentralized environment, will execute the 'perform upkeep' function, sparking a request to Chainlink.

Now, it's time to wait a couple of blocks. Our VRF does need a moment to crunch those numbers, after all.

## Winner Announcement &amp; Reset

Once the Chainlink node responds, it triggers the `fulfillRandomness` function. This function embarks on the crucial task of choosing a random winner from our player array. Once the lucky winner is picked, the system resets for the next raffle.

Boom! You've just completed your minimalistic, but provably fair smart contract. And even better, you've got a lottery system that runs on rock-solid principles of fairness.

<img src="/foundry-lottery/15-recap/recap1.png" style="width: 100%; height: auto;">

So grab yourself a coffee and take a breather, you've done great so far! We'll catch up soon, where we’ll walk through further fascinating aspects of blockchain technology. Not just fair, your code is a work of art - keep it coming!

## Next Steps and Interesting Reads

In our next module, we'll delve deeper into more advanced blockchain concepts and how to improve upon our existing code. Trust me, the rabbit hole goes much, much deeper! Till then, here are some interesting reads to keep the ball rolling:

- [Understanding ChainLink](https://www.chain.link)
- [Blockchain and Its Many Uses](https://www.ibm.com/topics/blockchain)
- [Smart Contracts: The How-To](https://ethereum.org/greeter)

With this, we wrap up our journey through the 'Raffle Contract.' Here's to more code, more learning, and to building an efficient, fair lottery!
