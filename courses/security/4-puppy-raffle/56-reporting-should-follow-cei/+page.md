---
title: Reporting - Should Follow CEI
---

_Follow along with this video:_

---

### selectWinner Should Follow CEI

Taking a look at our next `@Audit` tag, this finding should be another quick one. We'd identified that the `selectWinner` function was another instance where PuppyRaffle isn't following CEI (Checks, Effects, Interactions). However, unlike our `reentrancy` situation, there doesn't seem to be a way to exploit it in `selectWinner`. As a result, this is going to be our 4th `informational`.

````
**Title:** [I-4] does not follow CEI, which is not a best practice

It's best to keep code clean and follow CEI (Checks, Effects, Interactions).

    ```diff
-   (bool success,) = winner.call{value: prizePool}("");
-   require(success, "PuppyRaffle: Failed to send prize pool to winner");
        _safeMint(winner, tokenId);
+   (bool success,) = winner.call{value: prizePool}("");
+   require(success, "PuppyRaffle: Failed to send prize pool to winner");
    ```
````

With `informational` findings, you may notice our write ups don't always strictly adhere to outlining things like impact. `Informational` findings are often very subjective in both their impact and their recommended fixes. What defines _clean code_, for example, may vary from developer to developer.

With that said, this write up looks great. Let's move on to `weak randomness` next.
