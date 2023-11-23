---
title: Advanced Solidity Pre-requisites
---

_Follow along the with the video_

---

Welcome back, dear students! After laying the foundation and getting acquainted with the preliminary nuances of smart contracts in our previous lessons, it's time to venture into slightly deeper waters. Expect the unexpected and brace yourselves as we delve into the finer aspects of smart contracts that I'd expect you to grasp in the course of your blockchain learning journey.

## The Core of Smart Contracts: Storage

The first advanced feature we'll be covering today is storage in smart contracts. Every smart contract includes this integral element - the Storage. This critical component is the space allotted to your variables within the contract.

When you create a state variable within your contract, an individual storage slot is carved out just for that variable. For instance, if you have three variables - number one, number two, and number three, these will consume three separate storage slots respectively.

It's worth noting, however, that constants or immutable variables do not occupy space in storage. This unique trait is due to their nature of being stored directly within the contract's bytecode.

### Hands-on Learning with Code

If you're a hands-on learner and this concept still feels too abstract, you can try it out using Foundry, a development platform for blockchain applications. By following a few simple commands and running them on Foundry, you'll be able to visually see what storage in a contract looks like.

```js
//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.13;

contract Counter{
    uint256 public number;
    uint256 public number2;
    uint256 public constant number3 = 3;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}


```

<img src="/security-section-1/7-advanced-solidity/sol1.png" style="width: 100%; height: auto;" alt="block fee">

> Remember, always experiment with code, because it's in the doing that we grasp the most complex concepts!

### Wrapping Up with a Video Recap

In summary, understanding storage, how it functions, and its integral role in preserving the state of your contracts is essential to mastering the art of smart contracts. In the following articles, we'll continue to explore more of these exciting, advanced concepts. Until then, happy coding!
