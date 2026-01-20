---
title: Reporting - Weak Randomness
---

_Follow along with this video:_

---

### Weak Randomness

Our next marked finding was also in `selectWinner` and is referencing weak randomness.

```js
function selectWinner() external {
    uint256 winnerIndex =
        uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty))) % players.length;
        ...
        uint256 rarity = uint256(keccak256(abi.encodePacked(msg.sender, block.difficulty))) % 100;
}
```

Lets consider what the severity of this would be by assessing the Impact and Likelihood.

- **Impact:** High - If someone is able to predict the outcome of a raffle and exploit this knowledge, this fundamentally breaks this protocol's functionality.
- **Likelihood:** High - A user has a lot of incentive to assure they win, and assure their token is rare. It's very likely this would be exploited.

Our assessment pretty clearly points to this finding being of `High Severity`. Fortunately in previous lessons we already wrote a Proof of Concept for this, so let's take our finding template and start filling it in.

```
**Title:**
### [H-2] Weak Randomness in `PuppyRaffle::selectWinner` allows users to influence or predict the winner and influence or predict the winning puppy

**Description:** Hashing `msg.sender`, `block,timestamp` and `block.difficulty` together creates a predictable final number. A predictable number is not a good random number. Malicious users can manipulate these values or know them ahead of time to choose the winner of the raffle themselves.

**Note:** This additionally means users could front-run this function and call `refund` if they see they are not the winner.
```

We'll talk more about front-running and MEV concerns later in the course, but know this exposes a vulnerability of this type here too.

What's the impact of this?

```
**Impact:** Any user can influence the winner of the raffle, winning the money and selecting the `rarest` puppy. Making the entire raffle worthless if a gas war to choose a winner results.
```

For our Proof of Concept, lets begin by outlining the details of exploiting this vulnerability. This attack vector is well known, so I might be cheating a little bit by linking to a reference of this exploit - but I challenge you to write a test that proves this vulnerability!

```
**Proof of Concept:**

1. Validators can know the values of `block.timestamp` and `block.difficulty` ahead of time and usee that to predict when/how to participate. See the [solidity blog on prevrandao](https://soliditydeveloper.com/prevrandao). `block.difficulty` was recently replaced with prevrandao.
2. User can mine/manipulate their `msg.sender` value to result in their address being used to generate the winner!
3. Users can revert their `selectWinner` transaction if they don't like the winner or resulting puppy.

Using on-chain values as a randomness seed is a [well-documented attack vector](https://betterprogramming.pub/how-to-generate-truly-random-numbers-in-solidity-and-blockchain-9ced6472dbdf) in the blockchain space.
```

Anyone who knows me, or as seen any of my other content knows what my recommendation is going to be!

```
**Recommended Mitigation:** Consider using a cryptographically provable random number generator such as [Chainlink VRF](https://docs.chain.link/vrf)
```

That's one more down! Our next finding to write up is `Magic Numbers`!
