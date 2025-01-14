---
title: A Note On The Linear Progress Of Security Reviews
---

### A Note On The Linear Progress Of Security Reviews

Alright, we've got a much better understanding of how tokens are allowed and disallowed in `Thunder Loan` through the `setAllowedToken` function. We were on this side quest, if you recall, because we needed a better understanding of the requirements of the `deposit` function, which we'll return to soon.

But, now's a great opportunity to take a moment to mention an inherent feature of security reviews.

**_Security reviews are not linear._**

What I mean by this is, we've assessed much of this code base so far already and we haven't really found any bugs. We've spotted a few informationals, but nothing protocol breaking so far. This is pretty typical.

It's far more likely for security researchers to uncover the majority of their bugs nearing the end of their review when the greatest context and understanding of the protocol is achieved. It's not uncommon for the discovery of one vulnerability to snowball into exploits elsewhere and the process can become exponential.

Ultimately, don't be discouraged if you don't find anything immediately, perseverance is key!

Let's keep going!
