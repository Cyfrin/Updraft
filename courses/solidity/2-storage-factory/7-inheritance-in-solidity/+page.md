---
title: Inheritance in Solidity
---

_You can follow along with the video course from here._

<a name="top"></a>
### Introduction
In this lesson, we are going to introduce the concept of inheritance and overriding, two powerful tools that allow developers to create more modular, maintainable, and reusable smart contracts. By leveraging these techniques, you can build upon existing contracts and customize their functions.

### Inheritance
We are going to enhance the `SimpleStorage` contract by adding new functionality: specifically, we want to add five (5) to the stored `favoriteNumber`.
To achieve this, we could duplicate the existing `SimpleStorage` contract and make changes to the new version. However, a better practice is to utilize contract **inheritance**.

Let's create a new file `AddFiveStorage.sol`:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract AddFiveStorage {}
```
**Inheritance** it's the mechanism that allows the `AddFiveStorage` contract to inherit all the functionalities of the `SimpleStorage` contract.
First, we name-import `SimpleStorage.sol` into `addFiveStorage.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {SimpleStorage} from "./SimpleStorage.sol";

contract AddFiveStorage is SimpleStorage {}
```
The `is` keyword signifies inheritance, linking the `SimpleStorage` contract to its child, `AddFiveStorage`.

### Overriding functions
The `AddFiveStorage` contract inherits all methods from `SimpleStorage` and we can customize them using the `override` keyword.

Let's say that we want to modify the `store` function, adding '5' to the favorite number being stored. If we copy the exact signature of the `store` function, an error will occur:
```solidity
function store(uint256 _newFavNumber) public {}
```
> *Type error: Overriding function is missing "override" specifier.*

>🗒️ **NOTE** <br>
To override a method from the parent contract, we must replicate the exact function **signature**, including its name, parameters and adding the visibility and the `override` keyword to it:
```solidity
function store(uint256 _newFavNumber) public override {}
```
Yet, another error will pop up:
> *Compile error: Trying to override a non-virtual function.*
To address this, we need to mark the `store` function in `SimpleStorage.sol` as **virtual**, enabling it to be overridden by child contracts:
```
function store(uint256 favNumber) public virtual {
    // function body
}
```
We can finally add the new functionality *'add five to the stored favorite number'* to the `store` function:
```solidity
function store(uint256 _newFavNumber) public override {
    favoriteNumber = _newFavNumber + 5;
}
```
### Conclusion
In this lesson, we utilized inheritance to modify the `SimpleStorage` contract, without rewriting all its code. After deploying the contract `AddFive` and storing the number 2, it will return the `favoriteNumber` 7. This confirms that the `store` function in `AddFiveStorage` contract successfully overrides the existent `store` function in `SimpleStorage`.

### 🧑‍💻 Test yourself
1. 📕 Why do we need inheritance to extend a contract's functionality?
2. 🧑‍💻 Create a contract `Double` that overrides the `store` function and returns the favorite number multiplied by itself.

[Back to top](#top)