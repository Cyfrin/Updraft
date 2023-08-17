---
title: Events
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/69Yl2FEtbjc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Ever wondered how to track users in an Ethereum lottery? Or how about which data structure to use for storing players addresses in an on-chain lottery system? Well, you're in for a ride as we take a deep dive into these topics and more!

## What's Next? Data Structures to the Rescue!

In the case of a lottery system on the Ethereum network, we need to store and track all the users participating in each round.

Here, we are confronted with the question of which data structure to choose. Should we use an array or a mapping? Should we use multiple address variables?

To solve this, we've decided to use a dynamic array, an array that adjusts its size as needed. The reasons for this choice become apparent as you need to randomly pick a winner from the entries. As you may know, mappings can’t be looped through, which poses a problem if we need to randomly select an individual for the winning prize.

```js
address[] private s_players;
```

The above line is an array of the players in the lottery. Notice the `private` modifier, which means the variable cannot be accessed directly from outside the contract. This variable is dynamic and its value will change frequently as players enter the lottery, leading to more storage operations.

As we are dealing with Ether which will be paid to these players, we should make it an `address payable` to ensure we can transfer funds to these players.

## Updating Our Lottery

With our array in place, we can proceed to update our lottery function.

```js
s_players.push(payable(msg.sender));
```

When users enter the lottery, we add their address into our dynamic array. Using the `push` function, we can add the `msg.sender` to our `s_players` array.

## Emitting Events: Announce It to the World!

A key part of our function is missing: an event. Events in Ethereum are a mechanism to communicate that something has happened in a smart contract. These records can be used by the front-end of your application for various tasks and are also useful in migrating or updating your contracts. An event is typically emitted following any interaction with the contract that modifies its state.

In our case, we should emit an event when a player enters the lottery. For this, we'll create an event called `EnteredRaffle` which receives an indexed address type parameter. Indexed parameters are parameters that are much easier to search for and much easier to query than non-indexed ones.

```js
// Event Declaration
event EnteredRaffle(address indexed player);
// Emitting the Event
emit EnteredRaffle(msg.sender);
```

## In Conclusion

At this point, we've determined the data structure to use for our lottery, updated our function with it, and implemented events. The choices we discussed here should make picking a winner from all the participants seamless.
