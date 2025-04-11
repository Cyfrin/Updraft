---
title: Reporting - getActivePlayerIndex Incorrect For Edge Case
---

_Follow along with this video:_

---

### getActivePlayerIndex Incorrect for Edge Case

Next finding we marked down was regarding `getActivePlayerIndex`. The issue we outlined here was, if a player exists at index 0, they may erroneously believe they are not entered into the raffle.

Let's begin the write up with a title. There's some argument to be had that a vulnerability of this nature would be `Medium Severity`. If we consider however, that the impact is really only affecting a single user, `Low` could be appropriate as well, noting that the likelihood is a bit of a toss up - is it high, because it certainly happens if player[0] calls this function, or is it low because _only_ player[0] can call this function?

Ultimately, we're going to record this as a low. My title is going to look like so:

```
[L-1] `PuppyRaffle::getActivePlayerIndex` returns 0 for non-existent players and players at index 0 causing players to incorrectly think they have not entered the raffle
```

Root Cause. Impact. Classic. 😆

NEXT, DESCRIPTION! Define where the bug is and how it's encountered/exploited.

````
**Description:** If a player is in the `PuppyRaffle::players` array at index 0, this will return 0, but according to the natspec it will also return zero if the player is NOT in the array.


    ```js
    function getActivePlayerIndex(address player) external view returns (uint256) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i] == player) {
                return i;
            }
        }
        return 0;
    }
    ```
````

Impact. Let's spell out the practical effect of this bug

```
**Impact:** A player at index 0 may incorrectly think they have not entered the raffle and attempt to enter the raffle again, wasting gas.
```

A Proof of Code/Concept is something we should always strive to include in our reports. For `Low Severity` issues however, it may not be necessary to extraneously include test cases et al for what are otherwise simple to describe issues.

For this report, I'm just going to outline the steps that lead to encountering the vulnerability.

```
**Proof of Concept:**

1. User enters the raffle, they are the first entrant
2. `PuppyRaffle::getActivePlayerIndex` returns 0
3. User thinks they have not entered correctly due to the function documentation
```

As for mitigations, there are a few things that could solve this issue for the protocol. There's no reason to limit ourselves to just one.

```
**Recommendations:** The easiest recommendation would be to revert if the player is not in the array instead of returning 0.

You could also reserve the 0th position for any competition, but an even better solution might be to return an `int256` where the function returns -1 if the player is not active.
```

Done!

### Wrap Up

We're getting really quick at these write ups now. You can see that the severity of an issue uncovered often pertains to the complexity of it's write up.

We've a few more reports to complete, lets keep going.
