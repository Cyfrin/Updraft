---
title: Diagramming Thunder Loan
---

### Diagramming Thunder Loan

It's at this point in a review that I may begin to diagram out what I currently understand of a protocol. A diagram of Thunder Loan might look something like this:

![diagramming-thunderloan1](/security-section-6/31-diagramming-thunderloan/diagramming-thunderloan1.png)

From what we understand so far, a `liquidity provider` calls `deposit` on the `ThunderLoan` contract passing a token which has has an `AssetToken` contract created by the protocol owner at an earlier point.

`Thunder Loan` then calculates how many asset tokens to `mint` in exchange for the `deposit` - updates the exchange rate (for some reason) then `mints` the `asset tokens`, closing the transaction off with a `safeTransfer` call to the underlying token, transferring it to the `AssetToken` contract for storage.
