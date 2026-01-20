---
title: DoS - Reporting
---

_Follow along with this video:_

---

### Denial of Service PoC

Maybe you're the type of security reviewer who likes to save all the write ups to the end. There's nothing wrong with that! As you grow and gain experience you'll begin to carve out your own workflow and ways of doing things.

In future lessons, we may not go through writing things up together, but for now - let's report this uncovered DoS vulnerability

We, of course, start with our template, create a `findings.md` file and paste this within:

---

### [S-#] TITLE (Root Cause + Impact)

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**

---

### Title

Remember the rule of thumb!

`<ROOT CAUSE> + Impact`.

So, what's our root cause? Looping through an array to check for duplicates is the cause. What about the impact? Well, this causes a denial of service due to incrementing gas costs!

So the title I'm going with is something like this:

```
### [S-#] Looping through players array to check for duplicates in `PuppyRaffle::enterRaffle` is a potential denial of service (DoS) attack, incrementing gas costs for future entrants
```

What can I say, I like to be verbose, but at least I'm clear!

Regarding severity, let's consider the impact vs likelihood of this scenario.

Impact - The protocol is unlikely to fully break, it simply makes the raffle more expensive to participate in. I might rate this a `Medium`.

Likelihood - If an attacker wants the NFT badly enough, this will surely happen - but it does cost the attacker a lot. I might settle with `Medium` here as well.

With an Impact of `Medium` and a likelihood of `Medium`, this finding's severity is going to be decidedly `Medium`.

Update our title appropriately `[M-#]`.

### When to do Writeups

Often, I won't do a whole writeup as soon as I think I've found something. The reason for this is simple - I might be wrong! It's entirely possible that I come across more information as I dive deeper into the protocol that makes clear that what I thought was an issue actually isn't.

Sometimes I'll just leave my in-line notes indicating my suspicions and come back to them at the end.

For now, let's write the report as though we're confident this is valid.

### Description

Feel free to write your own description! Remember we want to be clear in how we illustrate the vulnerability and its affects.

Here's mine.

```
**Description:** The `PuppyRaffle::enterRaffle` function loops through the `players` array to check for duplicates. However, the longer the `PuppyRaffle:players` array is, the more checks a new player will have to make. This means the gas costs for players who enter right when the raffle starts will be dramatically lower than those who enter later. Every additional address in the `players` array is an additional check the loop will have to make.

'''javascript
// @audit Dos Attack
@> for(uint256 i = 0; i < players.length -1; i++){
    for(uint256 j = i+1; j< players.length; j++){
    require(players[i] != players[j],"PuppyRaffle: Duplicate Player");
  }
}
'''
```

### Impact

This is pretty clear from our description, but we can expand on things a little more.

```
**Impact:** The gas consts for raffle entrants will greatly increase as more players enter the raffle, discouraging later users from entering and causing a rush at the start of a raffle to be one of the first entrants in queue.

An attacker might make the `PuppyRaffle:entrants` array so big that no one else enters, guaranteeing themselves the win.
```

### Proof of Concept/Code

We did the hard part of this in our previous lesson, but let's add it to our report.

```
**Proof of Concept:**

If we have 2 sets of 100 players enter, the gas costs will be as such:
- 1st 100 players: ~6252048 gas
- 2nd 100 players: ~18068138 gas

This is more than 3x more expensive for the second 100 players.

<details>
<summary>Proof of Code</summary>

'''js
function testDenialOfService() public {
      // Foundry lets us set a gas price
      vm.txGasPrice(1);

      // Creates 100 addresses
      uint256 playersNum = 100;
      address[] memory players = new address[](playersNum);
      for (uint256 i = 0; i < players.length; i++) {
          players[i] = address(i);
      }

      // Gas calculations for first 100 players
      uint256 gasStart = gasleft();
      puppyRaffle.enterRaffle{value: entranceFee * players.length}(players);
      uint256 gasEnd = gasleft();
      uint256 gasUsedFirst = (gasStart - gasEnd) * tx.gasprice;
      console.log("Gas cost of the first 100 players: ", gasUsedFirst);

      // Creates another array of 100 players
      address[] memory playersTwo = new address[](playersNum);
      for (uint256 i = 0; i < playersTwo.length; i++) {
          playersTwo[i] = address(i + playersNum);
      }

      // Gas calculations for second 100 players
      uint256 gasStartTwo = gasleft();
      puppyRaffle.enterRaffle{value: entranceFee * players.length}(playersTwo);
      uint256 gasEndTwo = gasleft();
      uint256 gasUsedSecond = (gasStartTwo - gasEndTwo) * tx.gasprice;
      console.log("Gas cost of the second 100 players: ", gasUsedSecond);

      assert(gasUsedSecond > gasUsedFirst);
  }
'''

</details>
```

### Wrap Up

Click below to see what our finding report should look like so far!

<details>
<Summary>DoS Writeup</summary>

### [M-#] Looping through players array to check for duplicates in `PuppyRaffle::enterRaffle` is a potential denial of service (DoS) attack, incrementing gas costs for future entrants

**Description:** The `PuppyRaffle::enterRaffle` function loops through the `players` array to check for duplicates. However, the longer the `PuppyRaffle:players` array is, the more checks a new player will have to make. This means the gas costs for players who enter right when the raffle starts will be dramatically lower than those who enter later. Every additional address in the `players` array is an additional check the loop will have to make.

```javascript
// @audit Dos Attack
@> for(uint256 i = 0; i < players.length -1; i++){
    for(uint256 j = i+1; j< players.length; j++){
    require(players[i] != players[j],"PuppyRaffle: Duplicate Player");
  }
}
```

**Impact:** The gas consts for raffle entrants will greatly increase as more players enter the raffle, discouraging later users from entering and causing a rush at the start of a raffle to be one of the first entrants in queue.

An attacker might make the `PuppyRaffle:entrants` array so big that no one else enters, guaranteeing themselves the win.

**Proof of Concept:**

If we have 2 sets of 100 players enter, the gas costs will be as such:

- 1st 100 players: ~6252048 gas
- 2nd 100 players: ~18068138 gas

This is more than 3x more expensive for the second 100 players.

<details>
<summary>Proof of Code</summary>

```js
function testDenialOfService() public {
      // Foundry lets us set a gas price
      vm.txGasPrice(1);

      // Creates 100 addresses
      uint256 playersNum = 100;
      address[] memory players = new address[](playersNum);
      for (uint256 i = 0; i < players.length; i++) {
          players[i] = address(i);
      }

      // Gas calculations for first 100 players
      uint256 gasStart = gasleft();
      puppyRaffle.enterRaffle{value: entranceFee * players.length}(players);
      uint256 gasEnd = gasleft();
      uint256 gasUsedFirst = (gasStart - gasEnd) * tx.gasprice;
      console.log("Gas cost of the first 100 players: ", gasUsedFirst);

      // Creates another array of 100 players
      address[] memory playersTwo = new address[](playersNum);
      for (uint256 i = 0; i < playersTwo.length; i++) {
          playersTwo[i] = address(i + playersNum);
      }

      // Gas calculations for second 100 players
      uint256 gasStartTwo = gasleft();
      puppyRaffle.enterRaffle{value: entranceFee * players.length}(playersTwo);
      uint256 gasEndTwo = gasleft();
      uint256 gasUsedSecond = (gasStartTwo - gasEndTwo) * tx.gasprice;
      console.log("Gas cost of the second 100 players: ", gasUsedSecond);

      assert(gasUsedSecond > gasUsedFirst);
  }
```

</details>
:br

**Recommended Mitigations:**

</details>


Things look great! Lets finally have a look at what mitigations we can recommend for this vulnerability, in the next lesson.
