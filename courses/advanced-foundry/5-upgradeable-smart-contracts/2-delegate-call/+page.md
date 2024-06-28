---
title: Delegate Call
---

_**Follow along with this video.**_



---

In this lesson, we're going to go deep on Upgradeable Smart Contracts specially on the `Delegate Call`, how to construct proxies and upgradable smart contracts. This forms a fundamental part of the blockchain space, especially when building efficient and investor-friendly decentralized applications.

## Delegate Call vs Call Function

Similar to a call function, 'delegate call' is a fundamental feature of Ethereum. However, they work a bit differently. Think of delegate call as a call option that allows one contract to borrow a function from another contract.

To illustrate this, let's look at an example using Solidity - an object-oriented programming language for writing smart contracts.

```javascript
contract B {
    // NOTE: storage layout must be the same as contract A
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVars(uint256 _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}

```

Our Contract B has three storage variables (`num`, `sender` and `value`), and one function `setVars` that updates our `num` value. In Ethereum, contract storage variables are stored in a specific storage data structure that's indexed starting from zero. This means that `num` is at index zero, `sender` at index one and `value` at index two.

Now, let's deploy another contract - Contract A. This one also has a `setVars` function. However, it makes a delegate call to our Contract B.

```javascript
contract A {
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVars(address _contract, uint256 _num) public payable {
        // A's storage is set, B is not modified.
        // (bool success, bytes memory data) = _contract.delegatecall(
        (bool success, ) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
        if (!success) {
            revert("delegatecall failed");
        }
    }
}
```

Normally, if `contract A` called `setVars` on `contract B`, it would only update `contract B's` `num` storage. However, by using delegate call, it says "call `setVars` function and then pass `_num` as an input parameter but call it in _our_ contract (A). In essence, it 'borrows' the `setVars` function and uses it in its own context.

## Understanding Storage in Delegate Call

It's interesting to see how delegate call works with storage on a deeper level. The borrowed function (`setVars` of Contract B) doesn't actually look at the names of the storage variables of the calling contract (Contract A) but instead, at their storage slots.

If we used the `setVars` function from Contract B using delegate call, first storage slot (which is `firstValue` in Contract A) will be updated instead of `num` and so on.

One other important aspect to remember is, the data type of the storage slots in Contract A does not have to match that of Contract B. Even if they are different, delegate call works by just updating the storage slot of the contract making the call.

## Wrap Up

In conclusion, delegate call is a very handy function in Solidity that allows one contract to 'borrow' a function from another. However, care should be taken when using it as the storage slots in the calling contract get updated directly, without looking at the variable names or data types. It might lead to unpredictable behavior if overlook this aspect.

Feel free to experiment with different contracts and function calls to witness delegate call in action. But remember, "With great power, comes great responsibility!"
