---
title: SafeMath
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/X6o3wmzBvy4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Introduction to SafeMath Library

The world of Solidity is rich with various libraries designed to make your smart contract development journey smoother. However, there's this one library that has gained notoriety in the Solidity community – `SafeMath.sol`. Whether you are a seasoned Solidity engineer or just starting, you'd likely encounter SafeMath in your interaction with the Ethereum world. But, as with most software components, libraries evolve with time. Let's explore what `SafeMath.sol` used to be, and why its usage has decreased.

<img src="/solidity/remix/lesson-4/safemath/safemath1.png" style="width: 100%; height: auto;">

## Understanding SafeMath Library

`SafeMath.sol` was a staple in Solidity contracts before version 0.8. However, its usage has dropped significantly. So, if it was once popular, why did developers stop using it? What exactly changed? Let's examine what `SafeMath.sol` was designed to manage.

First, let's create a new file called `SafeMathTester.sol` and explore this library in action.

```javascript
// SafeMathTester.sol
pragma solidity ^0.6.0;
contract SafeMathTester {
    uint8 public bigNumber = 255;
    function add() public {
        bigNumber = bigNumber + 1;
       }
}
```

Here, we use the version `0.6.0` of Solidity. The `SafeMathTester` contract has a `uint8` data type `bigNumber` with the maximum capacity of `255`.

After deploying this contract to a JavaScript Virtual Machine (JVM) or even a test network, invoking the `bigNumber` function will return `255` (its initial value), as anticipated. Interestingly, invoking the `add` function (which adds `1` to `bigNumber`) returns `0` when queried again, not `256` as one might expect. What's going on?

Before the 0.8 version of Solidity, signed and unsigned integers were unchecked, meaning that if your calculations exceeded the numerical limit of the variable type, it would wrap around to the lower limit. This pattern is known as integer overflow and it’s exactly what SafeMath library was designed to prevent.

## Addressing Integer Overflow with SafeMath.sol

SafeMath.sol provided a mechanism to halt transactions upon reaching the maximum limit of a `uint256` or `int256` data type. It was a typical security measure and a convention across contracts to avoid erroneous calculations and potential exploits.

```javascript
function add(uint a, uint b) public pure returns (uint) {
    uint c = a + b;
    require(c >= a, "SafeMath: addition overflow");
    return c;
}
```

In the above example, through `require` statements, `SafeMath.sol` ensures the result of the addition operation always equals or exceeds the first operand. This approach effectively prevents an overflow.

However, the SafeMath library is less common in newer versions of Solidity. Why?

## Changes in Solidity 0.8 and the Decline of SafeMath.sol

With the introduction of Solidity version 0.8, automatic checks for overflows and underflows were implemented, making SafeMath less essential.

```javascript
// SafeMathTester.sol
pragma solidity ^0.8.0;
contract SafeMathTester {
    uint8 public bigNumber = 255;
    function add() public {
        bigNumber = bigNumber + 1;
    }
}
```

In the `SafeMathTester.sol` contract, if we deploy this to a JavaScript VM using Solidity `0.8.0`, invoking the `add` function will cause a transaction to fail, whereas, in older versions, it would have reset back to zero. The introduction of this automatic check in Solidity `0.8.0` effectively rendered the `SafeMath.sol` library redundant for overflow and underflow checking.

However, for scenarios where mathematical operations are known not to exceed a variable's limit, Solidity introduced the `unchecked` construct to make code more gas-efficient. Wrapping the addition operation with `unchecked` will bypass overflow and underflow checks and revert back to the old behavior, where exceeding the limit wraps the value to zero.

```javascript
uint8 public bigNumber = 255;
    function add() public {
        unchecked {bigNumber = bigNumber + 1;
    }
}
```

It's important to note that unchecked blocks should be used with caution as they reintroduce the chance for overflows and underflows to occur.

## Conclusion

The evolution of Solidity and `SafeMath.sol` illustrates the continuous advancements in Smart Contract development on Ethereum. While `SafeMath.sol` has become less essential with recent updates, it is still a critical piece of Ethereum's history, and understanding it gives us a broader perspective of Solidity's progress. In our daily work, we can now focus our efforts on using the latest features like the Price Converter library in our newly created FundMe contract.

By constantly learning and adapting to new changes, we can make the most of the versatile, yet intricate world of Solidity development.
Keep learning and we will see you on the next chapter!
