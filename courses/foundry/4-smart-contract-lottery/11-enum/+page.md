---
title: Enum
---

_Follow along with this lesson and watch the video below:_



---

When we delve into developing applications like a raffle, managing the different states of the event is equally critical as the event itself. We will extend our previous discussion about picking a winner in the raffle and lead into governing who can enter the raffle. Of course, if we are currently awaiting a random number to determine the winner, it's not fair for anyone else to enter the raffle then, right?

To handle these kinds of situations, we need a mechanism in place—a check on the state of the raffle to determine if it's currently open or not. This is where `enums` step into the picture, offering a clean, readable, and maintainable solution.

## An Introduction to the Concept of Enum

Before we start, a brief introduction to enums seems appropriate. An enum, also known as enumerated type, is a data type consisting of a set of unique elements. Enums provide an effective way to create and manage constant values throughout your contract. In other words, they help avoid scatter variables, such as bool calculating_winner = false, and group them into a single variable of type enum. For more details, [Solidity docs](https://solidity.readthedocs.io) give a glimpse into enum types.

```js
contract Example {
    enum ActionChoices {
        GoLeft,
        GoRight,
        GoStraight,
        SitStill
        }
    }
```

Every enum creates a new type, like `ActionChoices` in this example, that can be used throughout the contract.

### Creating Enums for Raffle State

Now, back to our raffle contract. We will create an enum named `RaffleState` with two states—`open` and `calculating`.

```js
enum RaffleState {
        OPEN,
        CALCULATING
    }
```

Point to remember: Enum elements can be converted to integers. So here, `Open` would be 0 and `Calculating` would be 1. Adding more states will increment the integers equivalently.

To utilize this enum, we will create a `RaffleState` variable, named `s_raffleState`, storing the current state of the raffle.

```js
RaffleState private s_RaffleState;
```

### Default Setting and Transitioning States

By default, let's keep the raffle state `Open` (we do want the participants to rush in, don't we?). So, right in the constructor, assign the default state.

```js
s_raffleState = RaffleState.Open;
```

Now, extending our `enterRaffle` functionality, we will include a check to ensure the raffle is not in the `Calculating` state.

```js
if (s_raffleState != RaffleState.OPEN) {
    revert RaffleNotOpen();
}
```

And subsequently, declare this error at the beginning of your contract.

```js
error RaffleNotOpen();
```

Now, no entries can be made while the contract is calculating a winner.

### State Transition during Winner Calculation

When it's time to choose the winner (`pickWinner`), we will shift the state to ‘Calculating’.

```js
s_raffleState = RaffleState.CALCULATING;
```

Remember, as long as we are waiting for the random number, no one is allowed to enter the raffle.

And once we have our lucky winner(s), it's time to switch the raffle state back to `Open` — let the game begin again!

```js
s_raffleState = RaffleState.OPEN;
```

So your raffle is **open** to the public again … the adrenaline rush continues, building up to the next exciting round of winner selection!

## Conclusion

Enums offer a compact, clear way of representing and managing different states within your contracts. In our raffle example, we used this powerful feature to control who can enter the raffle and when. By using enums, we make our contracts more readable and modular and ensure they follow good programming practices. Make sure you use this feature to its fullest when programming your next Solidity contract!
