---
title: MEV - Thunder Loan
---

_Follow along with this video:_

---

### MEV - Thunder Loan

Surely Thunder Loan is safe from MEV attacks! Everything happens so fast, there's no way someone could step in to affect anything, right?

Afraid not.

`Thunder Loan` is susceptible to something called a `sandwich attack`.

By closely monitoring the `mempool`, a malicious actor would be able to see a pending flash loan and exploit `Thunder Loan`'s reliance on the TSwap protocol as an oracle by swapping the loaned tokens, `front running` the flash loan, and subsequently altering the expected fees associated with it.

The malicious actor can then **swap back** (this is called `back running`) before the loan's repayment checks TSwap again! This would drastically impact the flash loan experience in Thunder Loan and may cause several of them to fail, or worse - cost victims a tonne in unexpected fees.

![thunder-loan](https://res.cloudinary.com/droqoz7lg/image/upload/v1757608964/updraft/lessons/image_13_pc0gbk.png)

### Wrap Up

Things aren't looking good... we better check `Boss Bridge`! See you there, in the next lesson!
