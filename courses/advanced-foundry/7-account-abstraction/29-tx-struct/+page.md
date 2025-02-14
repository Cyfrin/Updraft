## Account Abstraction Lesson 29: Transaction Struct

We are getting closer to being ready to fully test our contract. However, we've got a few more steps to go. In this lesson we will:

- finish `testZkOwnerCanExecuteCommands`
- create a helper function
- build out our own `Transaction` struct

Let's get to it!

---
### Where We Left Off

Picking up where we left off, we still need to complete **ACT** and **Assert** in our `testZkOwnerCanExecuteCommands` function.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {ZkMinimalAccount} from "src/zksync/ZkMinimalAccount.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

contract ZkMinimalAccountTest is Test {
    ZkMinimalAccount minimalAccount;
    ERC20Mock usdc;

    uint256 constant AMOUNT = 1e18;

    function setUp() public {
        minimalAccount = new ZkMinimalAccount();
        usdc = new ERC20Mock();
    }

    function testZkOwnerCanExecuteCommands() public {
    // Arrange
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
    
        // Act
        // Assert
    }
}
```

---
### Create a Helper Function

Since we don't have any scripts, we'll have to make some **helper** functions. Let's add a header for them at the bottom of our code.

```solidity
/*//////////////////////////////////////////////////////////////
                                HELPERS
//////////////////////////////////////////////////////////////*/
```

The first helper function that we need to create is for unsigned transactions. Let's call it `_createUnsignedTransaction`. It will take:

- an address of the caller
- a transaction type
- an address of the callee
- a value
- data

```solidity
/*//////////////////////////////////////////////////////////////
                                HELPERS
//////////////////////////////////////////////////////////////*/
function _createUnsignedTransaction(
    address from,
    uint8 transactionType,
    address to,
    uint256 value,
    bytes memory data
) internal view returns(Transaction memory) {}
```
---
### Build Transaction Struct

Our function returns Transaction memory. We are actually going to create this. If you've guessed that we'll need to import the `Transaction` struct, you are correct. Let's do that now. 

```solidity
import {
    Transaction
} from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol";
```

If you go through [the struct, you'll notice that we need:](https://github.com/Cyfrin/foundry-era-contracts/blob/3f99de4a37b126c5cb0466067f37be0c932167b2/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol)

- `uint256 txType` we know this is 113 for zksync
- `uint256 from` will have to convert this from an address
- `uint256 to` will have to convert this from an address
- `uint256 gasLimit` choose same value from our test on Ethereum MinimalAccount, 16777216
- `uint256 gasPerPubdataByteLimit` 16777216
- `uint256 maxFeePerGas` 16777216
- `uint256 maxPriorityFeePerGas` 16777216
- `uint256 paymaster` we aren't using a paymaster, so this is 0
- `uint256 nonce` need to set nonce variable
- `uint256 value` whatever value is passed
- `uint256[4] reserved` set an array of 4 uint256[0]
- `bytes data` data that is passed 
- `bytes signature` can be blank hex as we are getting an unsigned transaction
- `bytes[] factoryDeps` factoryDeps, set to create new instance of an empty array
- `bytes paymasterInput` blank hex
- `bytes reservedDynamic` blank hex

As mentioned above, we need to set a couple of variables in our function. We'll place them above our `Transaction` struct that we are creating.

```solidity
uint256 nonce = vm.getNonce(address(minimalAccount));
bytes32[] memory factoryDeps = new bytes32[](0);
```
And now we can return our `Transaction`. 
```solidity
return Transaction({
    txType: transactionType, // type 113 (0x71).
    from: uint256(uint160(from)),
    to: uint256(uint160(to)),
    gasLimit: 16777216,
    gasPerPubdataByteLimit: 16777216,
    maxFeePerGas: 16777216,
    maxPriorityFeePerGas: 16777216,
    paymaster: 0,
    nonce: nonce,
    value: value,
    reserved: [uint256(0), uint256(0), uint256(0), uint256(0)],
    data: data,
    signature: hex"",
    factoryDeps: factoryDeps,
    paymasterInput: hex"",
    reservedDynamic: hex""
});
```
---
### Finally Finish Assert in `testZkOwnerCanExecuteCommands`

With this helper function, we can now finish **Assert** in our test function, `testZkOwnerCanExecuteCommands`. Let's call `_createUnsignedTransaction` in the test function. Remember that it takes `address from`, `uint8 transactionType`, `address to`, `uint256 value`, and `bytes memory data`. In our test function, we'll set them as follows. 

- from the minimal account owner
- we already know tx type is 113
- to destination
- value is the value being passed
- data is functionData

```solidity
Transaction memory transaction =
    _createUnsignedTransaction(minimalAccount.owner(), 113, dest, value, functionData);
```

Here is what both of our functions should look like as of now. 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {ZkMinimalAccount} from "src/zksync/ZkMinimalAccount.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

contract ZkMinimalAccountTest is Test {
    ZkMinimalAccount minimalAccount;
    ERC20Mock usdc;

    uint256 constant AMOUNT = 1e18;

    function setUp() public {
        minimalAccount = new ZkMinimalAccount();
        usdc = new ERC20Mock();
    }

    function testZkOwnerCanExecuteCommands() public {
    // Arrange
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
    Transaction memory transaction =
    _createUnsignedTransaction(minimalAccount.owner(), 113, dest, value, functionData);
    
        // Act
        // Assert
    }
}
```
---
```solidity
/*//////////////////////////////////////////////////////////////
                                HELPERS
//////////////////////////////////////////////////////////////*/
function _createUnsignedTransaction(
    address from,
    uint8 transactionType,
    address to,
    uint256 value,
    bytes memory data
) internal view returns(Transaction memory) {
    uint256 nonce = vm.getNonce(address(minimalAccount));
    bytes32[] memory factoryDeps = new bytes32[](0);
    return Transaction({
        txType: transactionType, // type 113 (0x71).
        from: uint256(uint160(from)),
        to: uint256(uint160(to)),
        gasLimit: 16777216,
        gasPerPubdataByteLimit: 16777216,
        maxFeePerGas: 16777216,
        maxPriorityFeePerGas: 16777216,
        paymaster: 0,
        nonce: nonce,
        value: value,
        reserved: [uint256(0), uint256(0), uint256(0), uint256(0)],
        data: data,
        signature: hex"",
        factoryDeps: factoryDeps,
        paymasterInput: hex"",
        reservedDynamic: hex""
    });
}
```

---
### Prank the Owner

Now, all we need to do in **Act** is prank the owner. We will also need to call `executeTransaction` from our contract. Remember that it takes three arguments - `_txHash`, `_suggestedSignedHash`, and `_transaction`. Since we have commented out the first two, we'll just pass empty bytes. 

```solidity
// Act
vm.prank(minimalAccount.owner());
minimalAccount.executeTransaction(EMPTY_BYTES32, EMPTY_BYTES32, transaction);
```

Let's also create a constant for `EMPTY_BYTES32`. 

```solidity
bytes32 constant EMPTY_BYTES32 = bytes32(0);
```
---

And finally we can complete **Assert** by checking if the balance of usdc at our address is equal to `AMOUNT`.

```solidity
// Assert
assertEq(usdc.balanceOf(address(minimalAccount)), AMOUNT);
```

Phew! That was a lot. Take a look back over your code to review and reflect on what we've done. When you are ready, move on to the next lesson. 

