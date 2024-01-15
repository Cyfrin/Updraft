---
title: Reporting - Floating Pragma
---

_Follow along with this video:_

---

### Floating Pragma

The first finding we're going to add to our `findings.md` comes from our notes on `floating pragma`. Remember, we can look through the repo for notes we've left by searching for our `@Audit` tag.

This one should be easy for us as `Aderyn` caught it, and did most of the write up for us. Lets look at what `Aderyn` output.

````
## L-2: Solidity pragma should be specific, not wide

Consider using a specific version of Solidity in your contracts instead of a wide version. For example, instead of `pragma solidity ^0.8.0;`, use `pragma solidity 0.8.0;`

- Found in src/PuppyRaffle.sol [Line: 3](src/PuppyRaffle.sol#L3)

	```solidity
	pragma solidity ^0.7.6;
	```
````

At this point you may wish to copy the [**finding_layout.md**](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/audit-data/audit-data/finding_layout.md) template we've been following into your audit repo.

`Aderyn's` output actually looks really great. I personally would rate this as an informational, so I'm going to make a few changes/formatting adjustments, but ultimately this is what it's going to look like, easy!

````
### I-1: Solidity pragma should be specific, not wide

Consider using a specific version of Solidity in your contracts instead of a wide version. For example, instead of `pragma solidity ^0.8.0;`, use `pragma solidity 0.8.0;`

- Found in src/PuppyRaffle.sol [Line: 3](src/PuppyRaffle.sol#L3)

	```solidity
	pragma solidity ^0.7.6;
	```
````

Be sure to note your finding as actioned in your code base notes, and lets move onto the next one!

```js
// report-written: use of floating pragma is bad!
```
