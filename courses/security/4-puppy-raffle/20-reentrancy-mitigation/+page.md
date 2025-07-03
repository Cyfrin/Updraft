---
title: Reentrancy - Mitigation
---

_Follow along with this video:_

---

Re-entrancy is a big deal! So, how do we fix this?

There are a few ways, the easiest of which is adhere to the CEI pattern.

### CEI Pattern

_What's a CEI pattern?_

I'm glad you asked!

CEI stands for Checks, Effects and Interactions and is a best practice for orders of operation.

1. Checks - require statements, conditions
2. Effects - this is where you update the state of the contract
3. Interactions - any interaction with external contracts/addresses come last

Let's look at this in the context of our `withdrawBalance` example.

```js
function withdrawBalance() public {
    // Checks
        /*None*/
    //Effects
    uint256 balance = userBalance[msg.sender];
    userBalance[msg.sender] = 0;
    //Interactions
    (bool success,) = msg.sender.call{value: balance}("");
    if (!success) {
        revert();
    }
}
```

Our function has no checks, but simply by reordering things this way, with our effects before interactions, we're guarded against re-entrancy. We can confirm this in [**Remix**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/reentrancy/Reentrancy.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js).

### Remix Confirmation

First, let's make sure we've re-ordered things in our contract.

![reentrancy-mitigation1](/security-section-4/20-reentrancy-mitigation/reentrancy-mitigation1.png)

Now fund your victim contract and try calling the `attack` function with a second wallet address, as we did before.

![reentrancy-mitigation2](/security-section-4/20-reentrancy-mitigation/reentrancy-mitigation2.png)

It reverts! So, what's happening here?

![reentrancy-mitigation3](/security-section-4/20-reentrancy-mitigation/reentrancy-mitigation3.png)

### Alternative Mitigation

There is another popular way we can protect from re-entrancy and that's through a locking mechanism we could apply to this function.

This is also very simple to implement and would look something like this:

```js
bool locked = false;
function withdrawBalance() public {
    if(locked){
        revert;
    }
    locked = true;

    // Checks
    // Effects
    uint256 balance = userBalance[msg.sender];
    userBalance[msg.sender] = 0;
    // Interactions
    (bool success,) = msg.sender.call{value: balance}("");
    if (!success) {
        revert();
    }
    locked = false;
}
```

This is called a `mutex lock` in computing science. By applying the above logic, we lock the function once it's called so that it can't be re-entered while locked!

Along this line we also have the [**OpenZeppelin ReentrancyGuard**](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol) library available to us. This effectively applies locks to our functions under the hood keeping our code clean and professional by leveraging the `nonReentrant` modifier.

### Wrap Up

That's it! We've learnt 3 simple ways to protect against re-entrancy vulnerabilities in our code.

1. Following CEI - Checks, Effects, Interactions Patterns
2. Implementing a locking mechanism to our function
3. Leveraging existing libraries from trust sources like [**OpenZeppelin's ReentrancyGuard**](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol)

For such an easy vulnerability to protect against, re-entrancy continues to significantly impact the Web3 ecosystem. Let's take a specific look at how in the next lesson.
