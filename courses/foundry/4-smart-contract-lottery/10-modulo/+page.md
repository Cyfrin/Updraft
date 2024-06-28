---
title: Modulo
---

_Follow along with this lesson and watch the video below:_



---

In this lesson, I'll walk you through how to use the modulo function for picking a winner randomly from a list of players in Solidity, a contract-oriented programming language for implementing smart contracts.

## Understanding Modulo

Let's discuss how the modulo function or 'mod' function works. Essentially, this function performs a division operation and returns the remainder after dividing.

Consider the case where we divide 10 by 10 using the mod function. Since there is no remainder, the function returns zero. Conversely, if we divide 10 by 9, 9 out of the 10 are divided evenly leaving one left. In this case, 10 mod 9 equals one.

This logic can be extended to all numbers:

- 2 mod 2 equals zero because 2 and 2 divide evenly.
- 3 mod 2 equals one because there's one left over.
- 6 mod 2 equals zero because 6 divides evenly by 2.
- 7 mod 2 equals one because there's one left over after 7 divides into 2 three times.

When a smaller number is taken modulo by a larger number, the result will always be the smaller number itself. This is because the smaller number is not large enough to be divided by the larger number even once.

- 2 mod 3 equals two because two is less than three, and two becomes the remainder
- 2 mod 6 equals two because two is less than six, and two becomes the remainder
- 2 mod 7 equals two because two is less than seven, and two becomes the remainder

Through these examples, we can see that the modulo function helps us find the remainder of a division operation.

## Modulo in Action

Let's put the mod function into practice:

```js
contract ExampleModulo {
    function getModTen(uint _num) public pure returns(uint) {
        return _num % 10;
    }
    function getModTwo(uint _num) public pure returns(uint) {
        return _num % 2;
    }
}
```

In this contract, we've got two simple functions, `getModTen` and `getModTwo`, that return the modulo ten and two of the given integer respectively.

For example, if we pass 123 into getModTen, it would return 3 because 120 divides evenly into ten leaving a remainder of 3. If we have a large number, say 102030405060708090, the function would return 2 because the number divides evenly into ten with a remainder of 2.

Using mod two gives us a different way to look at numbers. Any even number mod two will result in zero. If the number is odd, the result will be one.

## Picking a Winner

Now we're going to use the mod function to randomly select a winner from an array of players. Let's say `s_players` is of size ten and has ten players. We're generating a random number (RNG) to select the index for our winner.

```js
uint256 indexOfWinner = randomWords[0] % s_players.length;
```

If our RNG is, say, twelve, we'll calculate `12 mod 10`, which equals two, and the player at index two in the array is our winner. Once we have the index of the winner, we write:

```js
address payable winner = s_players[indexOfWinner];
```

This returns the address of the randomly selected winner.

Besides, we'll also keep track of the most recent winner, which helps in knowing who won most recently.

```js
address private s_recentWinner;
s_recentWinner = winner;
```

<img src="/foundry-lottery/8-modulo/mod1.png" style="width: 100%; height: auto;">

## Transferring Rewards

Now, let's transfer the winnings to the selected winner.

```js
(bool success,) = winner.call{value: address(this).balance}("");
```

Here, we transfer the entire balance of the contract (which are the ticket sales) to the winner.

To ensure that transfer was successful:

```js
if (!success) {
  revert RaffleTransferFailed();
}
```

This reverts the transaction and refunds the gas if the transfer isn't successful, ensuring the winner does not lose out.

To conclude, the modulo function helps to generate a random index within the length of the players array, resulting in a fair selection of the winner. This can be used in various blockchain-based games and applications to ensure a level playing field.

Stay tuned for more posts on coding smart contracts in Solidity!
