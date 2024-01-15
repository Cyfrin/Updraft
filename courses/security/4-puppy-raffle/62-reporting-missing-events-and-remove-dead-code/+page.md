---
title: Reporting - Missing Events And Remove Dead Code
---

_Follow along with this video:_

---

## Missing Events and Dead Code

There are definitely events missing in Puppy Raffle, but we'll keep this write up quick.

This will be an informational finding, as we discussed earlier. A write up for this is going to look something like so:

```
### [I-6] State Changes are Missing Events

A lack of emitted events can often lead to difficulty of external or front-end systems to accurately track changes within a protocol.

It is best practice to emit an event whenever an action results in a state change.

Examples:
- `PuppyRaffle::totalFees` within the `selectWinner` function
- `PuppyRaffle::raffleStartTime` within the `selectWinner` function
- `PuppyRaffle::totalFees` within the `withdrawFees` function
```

Additionally, a quick write is likely all that's required for the next finding we identified, which was that `_getActivePlayerIndex` was `dead code` and never actually used. This could be `Gas` or `Informational`.

````
### [I-7] _isActivePlayer is never used and should be removed

**Description:** The function PuppyRaffle::_isActivePlayer is never used and should be removed.

    ```diff
    -    function _isActivePlayer() internal view returns (bool) {
    -        for (uint256 i = 0; i < players.length; i++) {
    -            if (players[i] == msg.sender) {
    -                return true;
    -            }
    -        }
    -        return false;
    -    }
    ```
````
