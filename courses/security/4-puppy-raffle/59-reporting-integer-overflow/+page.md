---
title: Reporting - Integer Overflow
---

_Follow along with this video:_

---

### Integer Overflow and Unsafe Casting

Lets start with the integer overflow we identified in the `selectWinner` function. We thoroughly went through this vulnerability in previous lessons!

```js
totalFees = totalFees + uint64(fee);
```

We should begin by determining severity.

- **Impact:** High - Fees are at risk of being lost/stuck. This typically is going to result in a high impact.
- **Likelihood:** High - It could be argued that this is a `medium`, but the risk increases with how successful the protocol becomes, and we want Puppy Raffle to be successful. High.

With the above determined, let's start filling out our finding template. I know this seems repetitive, but this is what's going to make you _really good_ at writing these reports.

```
### [H-3] Integer overflow of `PuppyRaffle::totalFees` loses fees
```

For the description section, lets include some of the work we did in `chisel` to show this happening.

````
### [H-3] Integer overflow of `PuppyRaffle::totalFees` loses fees

**Description:** In solidity versions prior to `0.8.0` integers were subject to integer overflows.

    ```js
    uint64 myVar = type(uint64).max
    // 18446744073709551615
    myVar = myVar + 1
    // myVar will be 0
    ```

**Impact:** In `PuppyRaffle::selectWinner`, `totalFees` are accumulated for the `feeAddress` to collect later in `PuppyRaffle::withdrawFees`. However, if the `totalFees` variable overflows, the `feeAddress` may not collect the correct amount of fees, leaving fees permanently stuck in the contract
````

Now, we didn't write a Proof of Concept together for this, but I _have_ prepared one. This is another moment I'm going to challenge you to write one yourself before continuing. You need to practice these skills to improve them.

Once you've made an attempt, compare what you've done with the PoC I've provided below to see how you did!

<details>
<summary>Integer Overflow PoC</summary>

1. We conclude a raffle of 4 players
2. We then have 89 players enter a new raffle, and conclude the raffle
3. 3. `totalFees` will be:

```js
totalFees = totalFees + uint64(fee);
// substituted
totalFees = 800000000000000000 + 17800000000000000000;
// due to overflow, the following is now the case
totalFees = 153255926290448384;
```

4. You will not be able to withdraw due to the line in `PuppyRaffle::withdrawFees`:

```js
require(address(this).balance ==
  uint256(totalFees), "PuppyRaffle: There are currently players active!");
```

Although you could use `selfdestruct` to send ETH to this contract in order for the values to match and withdraw the fees, this is clearly not what the protocol is intended to do.

<details>
<summary>Code</summary>

```js
function testTotalFeesOverflow() public playersEntered {
    // We finish a raffle of 4 to collect some fees
    vm.warp(block.timestamp + duration + 1);
    vm.roll(block.number + 1);
    puppyRaffle.selectWinner();
    uint256 startingTotalFees = puppyRaffle.totalFees();
    // startingTotalFees = 800000000000000000

    // We then have 89 players enter a new raffle
    uint256 playersNum = 89;
    address[] memory players = new address[](playersNum);
    for (uint256 i = 0; i < playersNum; i++) {
        players[i] = address(i);
    }
    puppyRaffle.enterRaffle{value: entranceFee * playersNum}(players);
    // We end the raffle
    vm.warp(block.timestamp + duration + 1);
    vm.roll(block.number + 1);

    // And here is where the issue occurs
    // We will now have fewer fees even though we just finished a second raffle
    puppyRaffle.selectWinner();

    uint256 endingTotalFees = puppyRaffle.totalFees();
    console.log("ending total fees", endingTotalFees);
    assert(endingTotalFees < startingTotalFees);

    // We are also unable to withdraw any fees because of the require check
    vm.prank(puppyRaffle.feeAddress());
    vm.expectRevert("PuppyRaffle: There are currently players active!");
    puppyRaffle.withdrawFees();
}
```

</details>

</details>


I trust you attempted the PoC yourself - time to add our recommended mitigation

````
**Recommended Mitigation:** There are a few recommended mitigations here.

1. Use a newer version of Solidity that does not allow integer overflows by default.
    ```diff
    - pragma solidity ^0.7.6;
    + pragma solidity ^0.8.18;
    ```
Alternatively, if you want to use an older version of Solidity, you can use a library like OpenZeppelin's `SafeMath` to prevent integer overflows.

1. Use a `uint256` instead of a `uint64` for `totalFees`.
    ```diff
    - uint64 public totalFees = 0;
    + uint256 public totalFees = 0;
    ```
2. Remove the balance check in `PuppyRaffle::withdrawFees`
    ```diff
    - require(address(this).balance == uint256(totalFees), "PuppyRaffle: There are currently players active!");
    ```
We additionally want to bring your attention to another attack vector as a result of this line in a future finding.
````

There's another finding we identified which is going to have a write up that is very similar to this one - unsafe casting. I'm going to challenge you to write this one yourself (as its a little repetitive and uninteresting after what we just did), but it's good practice. Compare your write up versus mine below.

<details>
<summary>Unsafe Casting Write Up</summary>
    
    ### [M-3] Unsafe cast of `PuppyRaffle::fee` loses fees

    **Description:** In `PuppyRaffle::selectWinner` their is a type cast of a `uint256` to a `uint64`. This is an unsafe cast, and if the `uint256` is larger than `type(uint64).max`, the value will be truncated.

    ```javascript
        function selectWinner() external {
            require(block.timestamp >= raffleStartTime + raffleDuration, "PuppyRaffle: Raffle not over");
            require(players.length > 0, "PuppyRaffle: No players in raffle");

            uint256 winnerIndex = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty))) % players.length;
            address winner = players[winnerIndex];
            uint256 fee = totalFees / 10;
            uint256 winnings = address(this).balance - fee;
    @>      totalFees = totalFees + uint64(fee);
            players = new address[](0);
            emit RaffleWinner(winner, winnings);
        }
    ```

    The max value of a `uint64` is `18446744073709551615`. In terms of ETH, this is only ~`18` ETH. Meaning, if more than 18ETH of fees are collected, the `fee` casting will truncate the value.

    **Impact:** This means the `feeAddress` will not collect the correct amount of fees, leaving fees permanently stuck in the contract.

    **Proof of Concept:**

    1. A raffle proceeds with a little more than 18 ETH worth of fees collected
    2. The line that casts the `fee` as a `uint64` hits
    3. `totalFees` is incorrectly updated with a lower amount

    You can replicate this in foundry's chisel by running the following:

    ```javascript
    uint256 max = type(uint64).max
    uint256 fee = max + 1
    uint64(fee)
    // prints 0
    ```

    **Recommended Mitigation:** Set `PuppyRaffle::totalFees` to a `uint256` instead of a `uint64`, and remove the casting. Their is a comment which says:

    ```javascript
    // We do some storage packing to save gas
    ```
    But the potential gas saved isn't worth it if we have to recast and this bug exists.

    ```diff
    -   uint64 public totalFees = 0;
    +   uint256 public totalFees = 0;
    .
    .
    .
        function selectWinner() external {
            require(block.timestamp >= raffleStartTime + raffleDuration, "PuppyRaffle: Raffle not over");
            require(players.length >= 4, "PuppyRaffle: Need at least 4 players");
            uint256 winnerIndex =
                uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty))) % players.length;
            address winner = players[winnerIndex];
            uint256 totalAmountCollected = players.length * entranceFee;
            uint256 prizePool = (totalAmountCollected * 80) / 100;
            uint256 fee = (totalAmountCollected * 20) / 100;
    -       totalFees = totalFees + uint64(fee);
    +       totalFees = totalFees + fee;
    ```
