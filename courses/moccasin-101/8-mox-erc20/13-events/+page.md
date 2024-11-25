## Lesson 9: Events in our Raffle.sol

In this lesson, we learn about events. You might think you're familiar with events, but you're really not. Let's dive into that.

First, we've got our `Raffle.sol` contract. It's going to be a pretty simple raffle contract. It will have a `winner` variable and a `raffleEntries` variable.

```python
pragma solidity ^0.8.0;

contract Raffle {

    uint256 public raffleEntries;
    address public winner;

    constructor() public {
        raffleEntries = 0;
        winner = address(0);
    }

```

Then we will add an event called `Entered`, it takes a single parameter, which is an address, and it will be used to record everyone who enters the raffle.

```python
    event Entered(address entrant);

```

We'll also add an event called `WinnerSelected` with a single parameter which is an address. This is going to record who has won the raffle.

```python
    event WinnerSelected(address winner);

```

Now let's add a function called `enter`. This function is going to be called by a user when they want to enter the raffle. It's going to use the `msg.sender` which is the address of the current user.

```python
    function enter() public payable {
        require(msg.value >= entryFees, "You need to pay at least the entry fee to enter the raffle.");
        raffleEntries++;
        winner = msg.sender;
        emit Entered(msg.sender);
    }

```

Let's add another function called `selectWinner`. This function is going to be called to randomly select the winner.

```python
    function selectWinner() public {
        require(raffleEntries > 0, "There needs to be at least one entry in the raffle.");
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(lastBlockHash, msg.sender, raffleEntries))) % raffleEntries;
        emit WinnerSelected(randomIndex);
    }
}
```

We need to be careful, we can't just use the `block.timestamp` or `block.difficulty` for random numbers, because this is not a true random number. For now, let's assume this is a secure way to generate a random number. Of course, it's not truly random, because we're using the block, but it's fine for this example.

So, we are now ready to test this.

Now this is what it looks like, if we now go to Remix and copy this code in and compile it, and we can open up the console here and we can type in `raffleEntries` and we can see that it's currently zero, because we haven't had anyone enter the raffle yet.

```bash
raffleEntries
```

We can type in `enter` and then `raffleEntries` again, so we can see that now there is at least one person in the raffle.

```bash
enter
raffleEntries
```

If we now go to the `WinnerSelected` event, we are going to try to call it, and we can try to see the result of it. If we try to run this as it is, it's going to give us a pretty generic error here, because there is no `keccak256` and the `msg.sender` is not really allowed to be used inside an event. If we copy over the whole code, I'll show you what happens when we call it. Let me compile this.

```bash
selectWinner
```

So, it says error, revert. `Invalid opcode`. This is because you can't run `keccak256` inside an event, it's not allowed. Now, how do we solve this issue? It's going to cost some gas, but we're going to need to generate the random number outside of the event. Now, the safest way to do this is to use the `blockhash`.

Let's add another variable `lastBlockHash`.

```python
    uint256 public lastBlockHash;

```

Now, we're going to make this variable `lastBlockHash` be `blockhash(block.number - 1)`. What does this mean?

```python
    constructor() public {
        raffleEntries = 0;
        winner = address(0);
        lastBlockHash = blockhash(block.number - 1);
    }

```

What does this mean? This means that we are storing the hash of the block before this one. For example, let's say we're now on block number 200, so the `lastBlockHash` will be the hash of block number 199.

Now let's modify the `selectWinner` function to use this `lastBlockHash`:

```python
    function selectWinner() public {
        require(raffleEntries > 0, "There needs to be at least one entry in the raffle.");
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(lastBlockHash, msg.sender, raffleEntries))) % raffleEntries;
        emit WinnerSelected(randomIndex);
    }
}
```

We are now ready to test this!

Now this is what it looks like, if we now go to Remix and copy this code in and compile it, and we can open up the console here and we can type in `raffleEntries` and we can see that it's currently zero, because we haven't had anyone enter the raffle yet.

```bash
raffleEntries
```

We can type in `enter` and then `raffleEntries` again, so we can see that now there is at least one person in the raffle.

```bash
enter
raffleEntries
```

If we now go to the `WinnerSelected` event, we are going to try to call it, and we can try to see the result of it.

```bash
selectWinner
```

And you'll see that it successfully executes, it does not give us a revert error. Now it's going to emit an event in the `Logs` tab in Remix.

So, this is how we've used events to record what's happening in our raffle contract. We can read and log data for our contracts.

**Now we can write some code to read the events.** Let's go back to Solidity. We can add another function `getWinner`, and let's make this function a view function.

```python
    function getWinner() public view returns(address){
        return winner;
    }

}
```

This function is going to simply return the `winner`.

Now if we go back to Remix and we compile this, we can call `getWinner` and we can see that it's returning the address `0x...` We can go back to the `Events` tab and we can see that this event is now being emitted. So this is how we can emit events and then read events in our raffle contract. If you have any questions about this, please ask! /home/equious/Nevermore/courses/moccasin-101/8-mox-erc20\13-events\+page.md
