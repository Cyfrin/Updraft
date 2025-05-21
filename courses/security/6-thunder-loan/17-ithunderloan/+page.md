---
title: IThunderLoan.sol
---

---

### IThunderLoan.sol

The next file on our list of most simple to most complex is another interface, IThunderLoan.sol. Let's take a look.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IThunderLoan {
    function repay(address token, uint256 amount) external;
}
```

Ok, fairly simple file again. This seems to be an interface for the ThunderLoan.sol contract. Just like our previous interfaces, we should look out for a couple specific things:

- Does the contract actually implement the interface
- Do the functions in the interface match the functions to be called on the contract

::image{src='/security-section-6/17-ithunderloan/ithunderloan1.png' style='width: 100%; height: auto;'}

Straight away, we can see that Thunder Loan isn't actually implementing this interface, easy informational finding.

```js
// @Audit-Informational: The IThunderLoan interface should be implemented by the ThunderLoan contract!
```

Time to look at the function we're interfacing with, `repay`.

```js
function repay(IERC20 token, uint256 amount) public {...}
```

Can you spot the issue?

The first parameter being passed to our IThunderLoan function is wrong! The interface is expecting an address, but the function is actually asking for an IERC20 interface!

If the protocol had implemented the IThunderLoan interface in ThunderLoan.sol, they would have caught this right away themselves.

```js
interface IThunderLoan {
    // @Audit-Low/Informational: Incorrect parameter type being passed
    function repay(address token, uint256 amount) external;
}
```

Whether or not the above would classify as a `low` or `informational` severity findings would really come down to the impact of passing the incorrect parameter type. It's _probably_ informational, but could be something to come back to later.

Great! Two more findings, let's keep going!

::image{src='/security-section-6/17-ithunderloan/ithunderloan2.png' style='width: 100%; height: auto;'}
