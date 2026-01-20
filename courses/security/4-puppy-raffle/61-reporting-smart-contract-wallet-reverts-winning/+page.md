---
title: Reporting - Smart Contract Wallet Reverts Winning
---

_Follow along with this video:_

---

### Smart Contract Wallet Reverts Winning

Next vulnerability on our docket is going to be:

```js
//@Audit: winner wouldn't get their money if their fallback was messed up!
```

This is absolutely an issue, our write up for it may be a _little_ lazy, but I think it's an important concept to be aware of.

To assess the severity, we again consider:

- **Impact:** Medium - potentially wastes gas, disrupts the functionality of the protocol when selectWinner continually reverts
- **Likelihood:** Low - the impact is only severe when there are a lot of users, so I think we can safely say low.

Sorted, lets fill out our finding template.

```
### [M-4] Smart Contract wallet raffle winners without a `receive` or a `fallback` will block the start of a new contest

**Description:** The `PuppyRaffle::selectWinner` function is responsible for resetting the lottery. However, if the winner is a smart contract wallet that rejects payment, the lottery would not be able to restart.

Non-smart contract wallet users could reenter, but it might cost them a lot of gas due to the duplicate check.

**Impact:** The `PuppyRaffle::selectWinner` function could revert many times, and make it very difficult to reset the lottery, preventing a new one from starting.

Also, true winners would not be able to get paid out, and someone else would win their money!

**Proof of Concept:**
1. 10 smart contract wallets enter the lottery without a fallback or receive function.
2. The lottery ends
3. The `selectWinner` function wouldn't work, even though the lottery is over!

**Recommended Mitigation:** There are a few options to mitigate this issue.

1. Do not allow smart contract wallet entrants (not recommended)
2. Create a mapping of addresses -> payout so winners can pull their funds out themselves, putting the owners on the winner to claim their prize. (Recommended)
```

To briefly touch on our recommendations here - The reason disallowing smart contract entrants would not be a preferred mitigation, is that this would restrict situations like multisignature wallets from participating. We'd much rather not lock people out entirely.

For this reason the second recommendation is preferred. This established a really good design pattern known as `Pull over Push`, where ideally, the user is making a request for funds, instead of a protocol distributing them.

We've only got a few findings left! Let's keep going!
