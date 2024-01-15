---
title: Inheritance in Solidity
---




In past lessons, we have been using a simple storage contract designed to store a user's favorite number. While we understand that it's amazing, what if we want to expand its functionality a bit?

Suppose we want our contract to not only store users favorite numbers but also to add five to each favorite number stored. We could duplicate the entire contract and make changes to the new version, but as an efficient programmer, I'd say we should look for a smarter way to achieve this functionality.

In this blog, we are going to get introduced to inheritance and overriding in Solidity — two concepts that offer cleaner, clearer, and more reusable code.

Let's create a new file for our enhanced contract and label it `addFiveStorage.sol`. We will again include the [SPDX license identifier](https://spdx.org/licenses/MIT.html) and specify the Solidity version.

A typical new contract would look like this:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract AddFiveStorage {}
```

### Leveraging Inheritance

As much as we are tempted to copy-paste all of our prior contract's content into the new `addFiveStorage.sol`, we will resist the temptation. This is where inheritance comes into play.

Inheritance allows `AddFiveStorage` contract to be a child contract of the `SimpleStorage` contract. Hence, `AddFiveStorage` will be able to perform all tasks performed by `SimpleStorage` and even more.

First, we import `SimpleStorage.sol` into `addFiveStorage.sol` using Solidity's named imports:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "./SimpleStorage.sol";

contract AddFiveStorage is SimpleStorage {}
```

The `is` keyword indicates inheritance, demonstrating the relationship between `AddFiveStorage` and `SimpleStorage`. After successful compilation and deployment, you will notice that `AddFiveStorage` has the same buttons as `SimpleStorage` because it inherited all of `SimpleStorage`'s functionality.

### Implementing Overriding

Overriding allows us to customize functions in `AddFiveStorage.sol` that have already been defined in `SimpleStorage.sol`.

Take a look at the following code snippet:

```js
function store(uint256 _newFavNumber) public {}
```

If we attempt to compile this, an error will occur saying there is an overriding function without an override specifier.

> *Type error: Overriding function is missing "override" specifier.*

To resolve this, add the `override` keyword:

```js
function store(uint256 _newFavNumber) public override {// function body}
```

Yet, another error will pop up:

> *CompileError: Trying to override a non-virtual function.*

To solve this, we will have to mark the `store` function in `SimpleStorage.sol` as `virtual`, allowing it to be overridable:

```js
function store(uint256 favNumber) public virtual {// function body}
```

Now back to `AddFiveStorage.sol`, let's add our preferred functionality to the `store` function:

```js
function store(uint256 _newFavNumber) public override {
    favoriteNumber = _newFavNumber + 5;
    }
```

So, we have used inheritance to adopt code from the `SimpleStorage` contract, and we have overridden the `store` function to customize its functionality.


### Wrapping Up

After deploying your new contract and attempting to store the number `2`, you will find that the stored number, upon retrieving, will be `7`. This confirms that our `store` function in `AddFiveStorage` contract is overriding the `store` in `SimpleStorage` as is adding `5` to each number stored.

As demonstrated in this lesson, taking advantage of inheritance and overriding not only simplifies our work but also harnesses the power of OOP in Solidity. Happy coding!