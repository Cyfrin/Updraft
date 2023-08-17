---
title: Resetting an Array
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/3xHdIO-FCOE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

In this lesson, we will delve into the deeper components of smart contract design by focusing on starting a new game or resetting a stage in a lottery game. An essential factor to consider here is to ensure that no old players from the previous round can participate in the new lottery round without entering.

### Resetting the Player Array

Firstly, the player's array, denoted as `s_players`, needs to be reset for every new lottery round. If left untouched, `s_players` would still hold players from the previous lottery, allowing them to participate in new rounds without necessarily entering again – a loophole we definitely want to avoid!

Here's how to do that:

```javascript
// Initialize new player array
s_players = new address payable[](0);
```

This code resets the `s_players` array into a new empty array. With this, we're all set to start accepting players for the new round!

### Ticking Off The New Round's Timestamp

Next, to keep track of when the new lottery round begins, we update the `s_last_timestamp` with the current block timestamp.

```javascript
// Update the timestamp
s_last_timestamp = block.timestamp;
```

With the timestamp updated, the clock automatically starts ticking for the new lottery round.

### Emitting an Event on Winner Declaration

After successfully resetting the state and declaring a winner, it is generally a good practice to emit a log event. This creates a simple and efficient way to inform anyone interested about the winner and can be useful for debugging or auditing contract executions.

Let's create a new event called `WinnerPicked()`:

```javascript
// Creating new event
event WinnerPicked(address indexed winner);
```

However, to better capture the process, we can change the name from `WinnerPicked` to `PickedWinner`. Sounds more like an action, right?

```javascript
// Emitting the event
emit PickedWinner(most_recent_winner);
```

This emits a `Picked Winner` log with the winner's address every time a new lottery round begins.

To conclude,

<img src="/foundry-lottery/10-array/array1.png" style="width: 100%; height: auto;">

While there's no standardized naming convention for events in smart contracts, it's a good idea to keep names consistent, meaningful, and action-derived.

That sums up how to restart a new lottery round in a smart contract. Incorporating these practices in your future Ethereum smart contracts will ensure fair gaming and accurate auditing.
