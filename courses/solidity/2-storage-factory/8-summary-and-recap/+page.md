---
title: Summary and Recap
---




## Deploying contracts using new keyword

One of the initial things we explored is how to deploy contracts from other contracts using the `new` keyword. Solidity enables us to clone existing contracts and produce new ones on the fly. This feature allows developers to deploy multiple instances of a contract without manually copy-pasting code – a handy tool, particularly for applications with multiple contract instances.

## Importing other contracts

Beyond deploying contracts from within contracts, Solidity also equips us with the capability to import other contracts. Essentially, importing contracts is equivalent to copying and pasting the code into a file. This feature enhances reusability and modularity of code. A sample of importing contracts can be represented as:

```js
import './myOtherContract.sol';
```

## Named Imports

In the journey of mastering Solidity, we also encountered the nifty concept of 'Named Imports'. Named imports can help make your code more organized and easier to read. They're going to elevate your coding game and make you shine among other Solidity devs out there.

```js
import { Contract as MyContract } from './myOtherContract.sol';
```

## Interacting with contracts

Solidity enables interaction with other contracts, given that we have the contract's address and its Application Binary Interface (ABI). In our tutorial, we realized that the `simple storage` type conveniently provides both the address and the ABI, simplifying our interaction with it.

```js
SimpleStorage storage = SimpleStorage(address);
uint256 storedData = storage.retrieve();
```

As of now, we haven't delved too much regarding ABIs. However, in subsequent sections, we will explore more about ABIs

## Contract Inheritance

Solidity also offers a powerful feature in the form of contract inheritance. If you want to create a child contract and inherit the features of another contract, import the parent contract and use the `is` keyword.

To override a function of the base class, the `override` keyword is used. But the base (parent) class must tag the function we want to override with the `virtual` keyword. The syntax can be represented as below:

```js
import './BaseContract.sol';
contract ChildContract is BaseContract {
    function foo() public override { Override functionality here}
    }
```



### Celebrating Progress

And that's it! You've made it to the end of this section. By now, you've acquired some potent capabilities in Solidity. So take a moment to give yourself a resounding pat on the back! Embrace a well-deserved break because taking mental pauses is good for your cognitive health. Go for a walk, indulge in a cup of coffee or some ice cream, or better yet, share your achievements with your friends be it in person or across the world via social media.

Remember, each stride you make in mastering Solidity is a significant one. So be sure to celebrate these crucial little wins that keep you excited and fuel your curiosity.

Keep learning, keep coding, and above all, keep pushing the boundaries.

*Congratulations! You have successfully completed Lesson 3 of the Solidity Course.*