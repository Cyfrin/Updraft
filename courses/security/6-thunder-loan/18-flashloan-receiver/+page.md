---
title: IFlashLoanReceiver.sol
---

---

### IFlashLoanReceiver.sol

Alright, IFlashLoanReceiver.sol is next! Let's have a look.

```js
// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.20;

import { IThunderLoan } from "./IThunderLoan.sol";

/**
 * @dev Inspired by Aave:
 * https://github.com/aave/aave-v3-core/blob/master/contracts/flashloan/interfaces/IFlashLoanReceiver.sol
 */
interface IFlashLoanReceiver {
    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee,
        address initiator,
        bytes calldata params
    )
        external
        returns (bool);
}
```

If we check the implementation of our imported `IThunderLoan`, we can see that it's literally not here. This interface isn't using this import at all.

We can check if the import is being inherited anywhere by searching our workspace for `IFlashLoanReceiver`. We can also comment this line out and we'll find out where it's needed really quick with `forge build`.

> **Protip:** You can use the keyboard shortcuts `ctrl + shift + f`(windows) and `cmd + shift + f`(mac) to open the workspace search menu.

::image{src='/security-section-6/18-flashloan-receiver/flashloan-receiver1.png' style='width: 100%; height: auto;'}

It seems as though this import is only being used in one of Thunder Loan's mock files for testing.

This isn't a good practice, we're changing a live contract file solely to facilitate testing. Our test should be importing it's own instance of this interface if it's needed.

```js
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// This is bad practice!
import { IFlashLoanReceiver, IThunderLoan } from "../../src/interfaces/IFlashLoanReceiver.sol";
// Preferred:
// import {IThunderLoan} from "../../src/interfaces/IThunderLoan.sol"

contract MockFlashLoanReceiver {...}
```

Let's make a note of this in `IFlashLoanReceiever.sol`.

```js
// @Audit-Informational: Unused Import: It's bad practice to edit live code for tests/mocks, we must remove the import from `MockFlashLockReceiver.sol`
```

Another informational, let's go!

`IFlashLoadReceiver.sol` has a note we should pay attention to before moving on.

```js
/**
 * @dev Inspired by Aave:
 * https://github.com/aave/aave-v3-core/blob/master/contracts/flashloan/interfaces/IFlashLoanReceiver.sol
 */
```

Now would be a great time to pause and read into [**how Aave is handling flash loans**](https://github.com/aave/aave-v3-core/blob/master/contracts/flashloan/interfaces/IFlashLoanReceiver.sol).

By and large this interface looks pretty good to me, the informational we found withstanding. There aren't any obvious or glaring bugs, but the function's lack of NATSPEC does leave us with a number of questions we may want to follow up on.

```js
// @Audit-Informational: Where's the NATSPEC?
// @Audit-Question: Is `token` the token being borrowed?
// @Audit-Question: Is `amount` the amount of tokens?
// @Audit-Question: Who is the initiator?
function executeOperation(
        address token,
        uint256 amount,
        uint256 fee,
        address initiator,
        bytes calldata params
    )
```

### Wrap Up

We've completed our first pass of all of Thunder Loan's interfaces!

::image{src='/security-section-6/18-flashloan-receiver/flashloan-receiver2.png' style='width: 100%; height: auto;'}

We haven't really found anything _meaty_ but we've found some informationals to call out. It's important to remember that our ultimate goal is to improve the protocol not just with security but with engineering best practices as well. This is just one example of adding value to the review you're performing.

You could even step into the test suite and buff it out if you wanted to be _really exceptional_.

You're doing great. Breaks are important - take one now if it's been a while and we'll start in on an actual contract, `OracleUpgradeable.sol`, in the next one.
