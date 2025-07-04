---
title: Upgradeable Contracts
---

_Follow along with the video_

---

## Upgradeable Contracts

In this section we're going to ask ourselves `what is a proxy?` and `how does delegateCall` work? in an effort to better understand the advantages and disadvantages of upgradeable smart contracts.

All the code we'll be working with here is available in the Upgrades repo of the Foundry Course, available [**here**](https://github.com/Cyfrin/foundry-upgrades-f23/tree/main).

## SmallProxy.sol

Let's take a look at a simple proxy example:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Proxy.sol";

contract SmallProxy is Proxy {
    // This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
    bytes32 private constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    function setImplementation(address newImplementation) public {
        assembly {
            sstore(_IMPLEMENTATION_SLOT, newImplementation)
        }
    }

    function _implementation() internal view override returns (address implementationAddress) {
        assembly {
            implementationAddress := sload(_IMPLEMENTATION_SLOT)
        }
    }
}
```

> Note: we're importing `Proxy.sol` from [**openzeppelin**](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Proxy.sol) as a boilerplate proxy for our example.

### Preface to Yul

The contract we're importing here uses a lot of `Yul`.

> "`Yul` is an intermediate language that can be compiled to bytecode for different backends." - [**Solidity Docs**](https://docs.soliditylang.org/en/latest/yul.html)

We won't go too deeply into `Yul`, but please read more in the documentation if it interests you. Note, however, even if you're a really advanced user, avoiding the implementation of really low-level calls is preferred. It's much easier to make significant errors, the lower you are in your code.

### Proxy.sol - a closer look

Within our `Proxy.sol` contract, we've got the `_delegate()` function. This function is called by `Proxy.sol`'s `fallback()` function. This means any time our contract received data for a function it doesn't recognize, it's going to call our `_delegate()` function.

The `_delegate()` function, then sends that data over to some `implementation` contract.

![block fee](/security-section-1/12-upgradeable/upgrades2.png)

Looking at `SmallProxy.sol` you can see you have these two functions:

```js
function setImplementation(address newImplementation) public {
        assembly {
            sstore(_IMPLEMENTATION_SLOT, newImplementation)
        }
    }

    function _implementation() internal view override returns (address implementationAddress) {
        assembly {
            implementationAddress := sload(_IMPLEMENTATION_SLOT)
        }
    }
```

- **setImplementation()** - changes the implementation contract, effectively allowing a protocol to upgrade.
- **\_implementation** - reads the location of the implementation contract

You may also have noticed `bytes32 private constant _IMPLEMENTATION_SLOT = ...` this is the storage slot where we are storing the address of our implementation contract. You can read more about `Standard Proxy Storage Slots` in [**EIP-1967**](https://eips.ethereum.org/EIPS/eip-1967)

Let's consider a basic implementation contract:

```js
contract ImplementationA {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue;
    }
}
```

Now we ask ourselves `What data needs to be passed to my proxy contract in order to call this function?`

If you recall from the last lesson, this data being passed is going to be the encoded function signature and any necessary arguments the function requires! We can get this encoding with a couple helper functions added to `SmallProxy.sol`:

```js
// helper function
    function getDataToTransact(uint256 numberToUpdate) public pure returns (bytes memory) {
        return abi.encodeWithSignature("setValue(uint256)", numberToUpdate);
    }
```

Now let's use a little assembly to read the storage slot this value is set to:

```js
function readStorage() public view returns (uint256 valueAtStorageSlotZero) {
        assembly {
            valueAtStorageSlotZero := sload(0)
        }
    }
```

With that all set up, here's what we'd do next:

1. deploy both `SmallProxy.sol` and `ImplementationA.sol`
2. call the `setImplementation()` function on `SmallProxy.sol`, passing it `ImplementationA`'s address as an argument
3. acquire the data needed for the transaction being sent
   > By passing `777` to our `getDataToTransact()` function we have returned: `0x552410770000000000000000000000000000000000000000000000000000000000000309` this encodes the `function signature` with the passed argument of `777`.

When this is passed to our proxy contract, the contract won't recognize the function signature, will call `fallback()` (which calls `_delegate()`) and pass the data to our implementation contract which DOES recognize this data!

4. Send transaction with the data

Now, when we call the `readStorage()` function, we can see that the value on our proxy contract has indeed been set to `777`!

This is a great illustration of how data is routed from our proxy contract to the implementation contract. Let's see what happens when we upgrade things by changing the implementation contract.

If we deploy a new implementation:

```js
contract ImplementationB {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue + 2;
    }
}
```

...and subsequently pass this new address to our proxy's `setImplementation()` function...

```js
function setImplementation(address implementationB);
```

When we then pass the same data as before to our proxy contract, we can indeed see this is reaching `implementationB` and we're having returned `newValue +2`!

![block fee](/security-section-1/12-upgradeable/upgrades3.png)

---

### Wrap up

Now, with this understanding in hand, it's easy to see the power proxies hold. On one hand, they are very convenient and afford developers some safeguard if things should need to change. On the other - if this process is controlled by a single (or small group) of wallets, this opens the door to some high risk centralization concerns.

Next, we'll be looking at `selfDestruct` and how it can be used to circumvent intended contract functionality!
