---
title: EIP-1967 Proxy
---

_Follow along the course with this video._

---

### EIP-1967 Proxy

In this lesson we'll apply what we've learnt and get our hands dirty with a small proxy example. The code for this exercise can be found [**here**](https://github.com/Cyfrin/foundry-upgrades-f23/tree/main/src/sublesson). You can copy and paste this code into Remix if you'd like to follow along!

> ❗ **NOTE**
> This is one of the more advanced section of this course, don't feel bad if things are confusing. You're welcome to skip this sublesson if you're less worried about how things work behind the scenes.

<details>
<summary>SmallProxy.sol</summary>

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
```

</details>

This `SmallProxy` example contains a lot of `Yul`. Yul is a sort of in-line Assembly that allows you to write really low-level code. Like anything low-level it comes with increased risk and severity of mistakes, it's good to avoid using `Yul` as often as you can justify.

For more information on `Yul`, check out the [**Yul Documentation**](https://docs.soliditylang.org/en/latest/yul.html).

Now, within `SmallProxy` we're importing Proxy.sol from our good friends OpenZeppelin. Looking at the code, we can get a better idea of how things are actually being handled.

<details>
<summary>Proxy.sol</summary>

```solidity
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (proxy/Proxy.sol)

pragma solidity ^0.8.20;

/**
 * @dev This abstract contract provides a fallback function that delegates all calls to another contract using the EVM
 * instruction `delegatecall`. We refer to the second contract as the _implementation_ behind the proxy, and it has to
 * be specified by overriding the virtual {_implementation} function.
 *
 * Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a
 * different contract through the {_delegate} function.
 *
 * The success and return data of the delegated call will be returned back to the caller of the proxy.
 */
abstract contract Proxy {
    /**
     * @dev Delegates the current call to `implementation`.
     *
     * This function does not return to its internal call site, it will return directly to the external caller.
     */
    function _delegate(address implementation) internal virtual {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    /**
     * @dev This is a virtual function that should be overridden so it returns the address to which the fallback
     * function and {_fallback} should delegate.
     */
    function _implementation() internal view virtual returns (address);

    /**
     * @dev Delegates the current call to the address returned by `_implementation()`.
     *
     * This function does not return to its internal call site, it will return directly to the external caller.
     */
    function _fallback() internal virtual {
        _delegate(_implementation());
    }

    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other
     * function in the contract matches the call data.
     */
    fallback() external payable virtual {
        _fallback();
    }
}
```

</details>

There are really only 2 functions in this contract (ignoring the virtual \_implementation function). We have \_delegate, fallback/\_fallback. The fallback functions simply route unrecognized call data to the \_delegate function which then routes the call to an implementation contract.

In SmallProxy.sol, we only have 2 functions, `setImplementation` and `_implementation`, the aforementioned virtual function.

This virtual function is returning the implementation address and showcases the need for our next topic...

### EIP-1967

[**Ethereum Improvement Proposal (now ERC)-1967**](https://eips.ethereum.org/EIPS/eip-1967).

The need to regularly utilize storage to reference things in implementation (specifically the implementation address) led to the desire for EIP-1967: Standard Proxy Storage Slots. This proposal would allocate standardized slots in storage specifically for use by proxies.

In our minimalistic example, we're assigning our \_IMPLEMENTATION_SLOT to a constant value for this purpose.

```solidity
// This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
bytes32 private constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
```

To illustrate this, let's write a basic implementation contracts, you can add this directly into SmallProxy.sol in Remix.

```solidity
contract ImplementationA{
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue;
    }
}
```

Great, so any time a call is sent to our proxy contract, we would expect it to be routed to this implementation, remembering of course that the data sent with the function will actually be stored within SmallProxy's storage.

To make it a little easier to check the data stored in SmallProxy.sol we can add a couple helper functions.

```solidity
function getDataToTransact(uint256 numberToUpdate) public pure returns (bytes memory){
    return abi.encodeWithSignature("setValue(uint256)", numberToUpdate)
}
```

You should remember this abi encoding from the NFT section, where we learnt how to encode anything! This function will help us encode the call data we need to send to our proxy. In addition to this, let's set up a function to check the storage in our proxy, allowing us to see how it's changing.

```solidity
function readStorage() public view returns(uint256 valueAtStorageSlotZero){
    assembly{
        valueAtStorageSlotZero := sload(0)
    }
}
```

With these functions in place, we should be able to deploy our contracts in Remix. The first thing we'll need to do is call the setImplementation function on our SmallProxy contract, passing the address of `ImplementationA`. This is how the proxy knows where to delegate calls.

::image{src='/foundry-upgrades/3-eip-1967/eip-1967-1.png' style='width: 100%; height: auto;'}

By passing an argument to `getDataToTransact` we're provided the encoded call data necessary to set our `valueAtStorageSlotZero` to `777`. Remember, sending a transaction to our proxy with this call data should update the storage _in the proxy_.

> ❗ **NOTE**
> Because SmallProxy.sol doesn't have a function of it's own which matches the call data's function selector, the fallback function will be engaged. This in turn routes the call data to our delegate function, delegating the call to ImplementationA.

To see this in action, we just need to paste our `getDataToTransact` return value into the CALLDATA field and his `Transact`.

::image{src='/foundry-upgrades/3-eip-1967/eip-1967-2.png' style='width: 100%; height: auto;'}

`valueAtStorageSlotZero` has been updated on our proxy contract!

### Upgrading SmallProxy.sol

Now, let's demonstrate how upgrading this protocol would work. Add another contract to SmallProxy.sol:

```solidity
contract ImplementationB {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue + 2;
    }
}
```

Next, deploy ImplementationB and then call setImplementation on SmallProxy, passing this new implementation address.

Just like before, we can use `getDataToTransact` to determine our necessary call data. By passing _the same_ call data, pertaining to the argument 777 we can see ...

::image{src='/foundry-upgrades/3-eip-1967/eip-1967-3.png' style='width: 100%; height: auto;'}

`valueAtStorageSlotZero` now reflects the new implementation logic of `newValue + 2`!

### Selector Clashes

One quick final note on function selector clashes which I'd mentioned earlier. In our example here, SmallProxy.sol only really has one function setImplementation, but if the implementation contract _also_ had a function called setImplementation, it would be easy to see how this conflict could occur. Were this the case, it would be impossible to call the setImplementation function contained by the Implementation contract, because it would _always_ be processed by the proxy.

### Wrap Up

Hopefully this minimalistic example has shed some light on the power of upgradeable proxies. This kind of power should also give you pause and make you consider the effects of trusting this degree of centrality to the protocol developers.

If anything here has been confusing, don't be discouraged, this is advanced stuff. Join the community in the discussions tab on the course [**GitHub Repository**](https://github.com/Cyfrin/foundry-full-course-f23/discussions), or join us in [**Discord**](https://discord.gg/cyfrin) to have you questions answers and concerns alleviated.

In the next lesson, we'll look more closely at one specific type of upgradeable pattern, the Universal Upgradeable Proxy (UUPS).

See you there!
