---
title: Solidity style guide
---

_Follow along with this video:_

---

### Solidity style guide

In the previous section we talked a bit about Solidity's style guide, code layouts and naming conventions. However, it's intriguing to note that we didn't fully explore how to properly order our Solidity functions. Solidity docs provide an [Order of Layout](https://docs.soliditylang.org/en/latest/style-guide.html#order-of-layout):

```solidity
// Layout of the contract file:
// version
// imports
// errors
// interfaces, libraries, contract

// Inside Contract:
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions
```

Sometimes it's useful to paste this as a comment at the top of your contract to always remember it!
