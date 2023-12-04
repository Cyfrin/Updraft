---
title: DoS - Reporting
---

_Follow along with this video:_

## 

---

# Unpacking a Denial of Service Attack: A Practical Look into Security Writeups

![](https://cdn.videotap.com/Dj7HsLraeSv2ZrJ1t1L1-10.38.png)Today we delve deep into the inner workings of a Denial of Service (DoS) attack - a prevalent cybersecurity threat that we might stumble upon in the realm of software auditing.

## Step One: Set the Stage - Create a New File

We'll begin our journey by creating a new file, which we'll optimistically name `findings.md`. The purpose of this file is fairly simple - it serves as the canvas where we'll write up our findings. We encapsulate our journey of discovery and understanding into this space, shedding ample light on the severity and various aspects of the underlying issue.

## Giving Feet to the Ghost: Identifying the Root Cause

As the saying goes, a problem well stated is a problem half solved. It is crucial to nail down the root cause of the issue before moving forward. Our root cause for the DoS attack turns out to be a piece of code in `PuppyRaffle` which loops through the players array to check for duplicates.

```javascript
// Pseudocode for the root cause
function loopThroughPlayersArray(playersArray) {
  for (let i = 0; i < playersArray.length; i++) {
    /*Check for duplicates*/
  }
}
```

## Estimating the Impact

To comprehend the severity of the DoS attack, we need to dissect its impact - the higher the impact, the more destructive our DoS attack.

The looping mechanism in `PuppyRaffle` causes a rise in gas costs for every additional player entering the raffle due to the added overhead of checking for duplicates. Consequently, our system becomes increasingly costly to use. We might debate over the severity - is it medium or high, but considering the additional gas users would have to spend and the resultant inconvenience it could cause, we'll settle for a medium severity rating.

## Drill Down into Details: Write Up a Description

At this point, let's delve deep into our DoS finding and write a meticulous and articulate description.

```markdown
## Description: The 'enterRaffle' function loops through the players array to check for duplicates. As the length of the 'players' array increases, the gas costs and the number of checks a new player must carryout also increase. This issue has the potential to deter players that enter later due to the remarkably higher gas costs.
```

## Light upon the Impact

Now it's time to put the spotlight on the impact of this issue. The intensifying gas costs as more players enter the queue make it a less attractive proposition for potential players. Coupling this with the possibility of a rogue player filling up the raffle to guarantee a win makes for a pretty daunting scenario.

```markdown
## Impact: The skyrocketing costs for users entering the raffle at a later stage could deter participation. Furthermore, an attacker with large enough resources could monopolize the system, crowding out other potential participants.
```

## Unveiling the Proof of Concept

To demonstrate the vulnerability at hand, we could showcase the escalating gas costs with a simple comparison - taking two sets of 100 players each and observing the gas charges. Our projected surge in costs could look something like this:

```markdown
## Proof of Concept:

1st set of 100 players: ~70,000 gas
2nd set of 100 players: ~210,000 gas
Note: The second set of players face a gas cost more than 3 times that of the initial set.
```

## Forge a Solution: Propose a Mitigation

Now that we've gathered knowledge about our vulnerability, it's time to suggest a viable solution. In our case, a possible mitigation could be altering the check for duplicate players. We'd replace the existing iteration-based solution with a more gas-efficient method like using a mapping system.

```markdown
## Mitigation: We recommend altering the manner in which duplicate players are checked – switching from an iteration-based system to a mapping-based system – which would be a far more gas-efficient solution.
```

No vulnerabilities are impenetrable. With adequate knowledge and an apt comprehension of the system, we can certainly transform the most complex of vulnerabilities into well-understood and manageable problems.
