---
title: Reporting - Magic Numbers
---

_Follow along with this video:_

---

### Reporting Magic Numbers

Next up, we see the `selectWinner` function come up again with our `@Audit` tag. This time, it's pointing to `magic numbers`. Definitely an `informational` we should write up.

```js
uint256 prizePool = (totalAmountCollected * 80) / 100;
uint256 fee = (totalAmountCollected * 20) / 100;
```

We see the problem here. When reading through a code base, number literals can make things difficult to understand.

Lets add this to our `findings.md` report.

````
### [I-5] Use of "magic" numbers is discouraged

It can be confusing to see number literals in a codebase, and it's much more readable if the numbers are given a name.

Examples:
    ```js
    uint256 public constant PRIZE_POOL_PERCENTAGE = 80;
    uint256 public constant FEE_PERCENTAGE = 20;
    uint256 public constant POOL_PRECISION = 100;

    uint256 prizePool = (totalAmountCollected * PRIZE_POOL_PERCENTAGE) / POOL_PRECISION;
    uint256 fee = (totalAmountCollected * FEE_PERCENTAGE) / POOL_PRECISION;
    ```
````

We could probably be a little more verbose, but for the purposes of an `informational` in a private audit setting, this is sufficient. Mark it as complete and let's move on.
