## Account Abstraction Lesson 28: ZKsync Tests

Taking tests may not be much fun, but making them sure can be. Let's make some tests for our `ZkMinimalAccount`. In our test folder, create another folder called ZKsync. In the ZKsync folder, create a file and call it `ZkMinimalAccountTest.t.sol`. Let's go ahead and set up the essentials of our code. For this we will need:

- a license and pragma
- to import `Test` and `ZkMinimalAccount`
- to inherit `Test`
- create a variable for our `ZkMinimalAccount` contract
  - to initialize a new instance of `ZkMinimalAccount` in the setUp function

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {ZkMinimalAccount} from "src/zksync/ZkMinimalAccount.sol";

contract ZkMinimalAccountTest is Test {
    ZkMinimalAccount minimalAccount;    

    function setUp() public {
        minimalAccount = new ZkMinimalAccount();        
    }
}
```
---
### Test if Zk Owner Can Execute Commands

Essentially, our test will be very similar to what we did in for `MinimalAccount` on Ethereum. Let's start with the `executeTransaction` function. Will start with our usual set up of **Arrange**, **Act**, and **Assert**.

```solidity
function testZkOwnerCanExecuteCommands() public {
    // Arrange
    // Act
    // Assert
}
```

For **Arrange** we will need:

- Assign token contract address to `dest`.
- Set transaction `value` to 0.
- Encode `functionData` for minting mock ERC20 tokens.
- Create an unsigned transaction with the owner's address, nonce, destination, value, and function data.

Let's start by importing ERC20Mock.

```solidity
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
```

Next, we can create the usdc token in the variable section, and initialize a new instance of the mock in the `setUp` function. We will also need a constant `AMOUNT` variable set to 1e18.

Place these with other state variables. 
```solidity
ERC20Mock usdc;

uint256 constant AMOUNT = 1e18;
```
Place this inside the `setUp` function
```solidity
usdc = new ERC20Mock();
```
---

Our **Arrange** should look like this now. 

```solidity
// Arrange
address dest = address(usdc);
uint256 value = 0;
bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);

Transaction memory transaction =
    _createUnsignedTransaction(minimalAccount.owner(), 113, dest, value, functionData);
```

Our entire code should look like this. 

---
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

I know that we are not finished with this function yet, but this is where the video lecture stops. We will complete this test function in the next lesson. Take a moment to review and reflect. Move on to the next lesson when you are ready.
