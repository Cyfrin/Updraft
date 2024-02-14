---
title: Block Timestamp
---

_Follow along with this lesson and watch the video below:_



---

Today, I'll be explaining and walking you through some crucial steps for developing an automatic lottery winner selection function, `pickWinner`.

<img src="/foundry-lottery/5-block-timestamp/block1.png" style="width: 100%; height: auto;">

## The 'pickWinner' Explained

The `pickWinner` function isn't just about picking the winner but also getting a random number _and_ ensuring automatic selection happens seamlessly and precisely when it should.

Here are a few things we want our `pickWinner` function to do:

- Get a random number.
- Use the random number to pick a player.
- Trigger automatically (eliminating the need for manual interaction).

Let's dive right into how we can achieve this. Initially, let's focus on the first two tasks—we can discuss automatic triggering later.

### Getting a Random Number and Picking a Winner

To create an `external` function that anyone could call to select a random winner, we'd probably want the winner selection to happen when the lottery is ready for its winner. So, how do we know when that time is right? We make sure that enough time has elapsed to pick a winner.

```js
function pickWinner() external {}
```

We'd achieve this by creating an `interval` variable, specifying how long our lottery will last before a winner is selected. However, since we wouldn't want to keep changing this value, we'll make it an `immutable` variable, meaning it can only be set in the constructor and remains constant throughout the contract's life.

```js
constructor(uint256 entranceFee, uint256 interval) {
    i_entranceFee = entranceFee;
    i_interval = interval;
}
```

Comments are your best friend when reading code. So, don't forget to comment what `i_interval` contains: duration of the lottery in seconds.

```js
// Duration of the lottery in seconds
uint256 private immutable i_interval;

```

### The Golden Period: Has Enough Time Passed?

Next, we need to check if this preset interval has passed before invoking the `pickWinner` function. Which leads us into some thorough timestamp comparison, in which we will take block timestamps into account!

The `block.timestamp` global variable gives us the current time in seconds. Subtracting the previous timestamp from the current block timestamp should ideally be more significant than our preset interval.

```js
block.timestamp - s_lastTimestamp > i_interval;
```

This condition checks if enough time has passed, let's envision an example:

- When `block.timestamp` is 1000 and `s_lastTimestamp` is 500, the elapsed time equals 500.
- If the `I_interval` is 600 seconds, meaning that not enough time has passed and therefore, no winner should be picked.

However, if the `block.timestamp` is 1200, 1200 - 500 equals 700, which is greater than our `I_interval` of 600. That means, enough time has passed, and it's time to announce a winner!

### The 'Snapshot' of Time

Also, we would need to take a 'snapshot' of time, which we'll do by creating a `private` state variable that remains in storage—an `S_lastTimestamp`.

```js
uint256 private s_lastTimestamp;
```

The initial `s_lastTimestamp` value would be set right in the constructor as the `block.timestamp` immediately the contract gets deployed, to start the 'interval' clock.

```js
constructor() {
    s_lastTimestamp = block.timestamp;
}
```

Below, in our `pickWinner` function, we'll revert the transaction if the condition doesn't meet, because not enough time would have passed.

```js
if (block.timestamp - s_lastTimestamp < i_interval) {
  revert();
}
```

On the last note, while it might seem tempting to add custom errors right now, remember, it's best practice to refactor them eventually. So, for now, let's stick to checking the elapsed time.

**NOTE**: Remember to update `s_lastTimestamp` once the winner has been picked.

```js
s_lastTimestamp = block.timestamp;
```

Stay tuned for my next blog post, where we take this to the next level and discuss how to make the `pickWinner` function automatically triggered.

**Happy Coding!**
