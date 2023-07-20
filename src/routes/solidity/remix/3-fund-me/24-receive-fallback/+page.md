---
title: Receive & Fallback
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/sgaBmbsriwk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In Solidity, a hurdle can arise when users send Ether directly to a contract without passing through necessary function calls. This lesson provides a step-by-step guide on how to mitigate this issue using Solidity's special functions, namely `_receive_` and `_fallback_`.

To illustrate, take a contract that requires funding. Without passing through the specified function calls (e.g., the "fund" function), the contract would not track the funder nor update their details. If the contract aimed to reward funders, those who funded directly, bypassing the necessary function calls, would be overlooked. This lack of tracking could be whether the user misdialed the function or did not use a tool that notifies on probable transaction failure. But there is a solution — the _receive_ and _fallback_ functions.

## Special Functions in Solidity

Two special functions in Solidity allow the triggering of certain code when users send Ether directly to the contract or call non-existent functions. These are the _receive_ function and the _fallback_ function. They cannot have arguments and don't return anything, thus needing external visibility and payable state mutability.

In simple terms, they are coded as follows:

```js
receive() external payable { }
fallback() external payable { }
```

To experiment with this, let's create a separate contract.

```js
//SPX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract FallbackExample {
    uint256 public result;
    receive() external payable {
        result = 1;
    }
}
```

In this contract, `result` is initialized to zero. Upon sending Ether to the contract, the `receive` function is triggered, hence `result` equals one.

For an added twist, we can code the contract to call a non-existent function upon sending Ether.

```js
fallback() external payable {result = 2;}
```

With data in the transaction, the `receive` function isn't triggered. Instead, the contract seeks a matching function for the data input without finding one. Consequently, it defers to the `fallback` function. Hence, `result` equals two.

As an aside, the `fallback` function is also triggered when a contract is called with no valid function.

These two functions are brilliantly elucidated in a chart on SolidityByExample.org [here](https://solidity-by-example.org/fallback/).

## Application on FundMe Contract

With this understanding, let's consider how to apply the special functions to our FundMe contract to ensure that every funder is tracked.

```js
receive() external payable {
    fund();
}
fallback() external payable {
    fund();
}
```

In the event of a user sending Ether directly to the contract, instead of calling the `fund` function, the `receive` function picks it up and re-routes the transaction to `fund`.

<img src="/solidity/remix/lesson-4/fallback/fallback1.png" style="width: 100%; height: auto;">

Test our updated FundMe contract on Sepolia, a 'real' testnet, substituting your contract's address:

Copy the contract's address and send some Ether to it via MetaMask. On confirming the transaction, we should ideally see that the 'fund' function is being called.

Checking back at Remix, the `funders` array will update to reflect the successful transaction. This signifies that the `receive` function rerouted the funding to the `fund` function properly.

This workaround ensures all transactions - correct or misdialed - are processed in the intended manner. Although a direct call to the `fund` function costs less gas, the user's contribution is acknowledged and credited.

Thanks for reading! Keep learning and we'll see you in the next lesson.
