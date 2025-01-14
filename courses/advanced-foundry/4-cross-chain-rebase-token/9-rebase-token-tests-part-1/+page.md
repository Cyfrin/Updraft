## Rebase Token Tests pt. 1

We will start by creating a new file called `RebaseToken.t.sol`: 

```javascript
SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "./src/RebaseToken.sol";
import "./src/Vault.sol";
import "./src/interfaces/IRebaseToken.sol"; 

contract RebaseTokenTest is Test {
    RebaseToken private rebaseToken;
    Vault private vault;

    function setup() public {
        vm.startPrank(owner);
        rebaseToken = new RebaseToken();
        vault = new Vault(IRebaseToken(address(rebaseToken)));
        rebaseToken.grantMintAndBurnRole(address(vault));
        bool success = payable(address(vault)).call{value: 1e18}("");
        vm.stopPrank();
    }

    address public owner = makeAddr("owner");
    address public user = makeAddr("user");

    function testDepositLinear() public {
        // 1. deposit
        vm.startPrank(user);
        uint256 amount = bound(1e18, 1e18 * 5, type(uint256).max);
        vm.deal(user, amount); 
        payable(address(vault)).call{value: amount}("");
        // 2. check our rebase token balance
        // 3. warp the time and check the balance again
        // 4. warp the time again by the same amount and check the balance again
        vm.stopPrank();
    }
}
```

We will then create a function called `testDepositLinear`. We will use `vm.startPrank` to run the function in the context of the user. We will then define the `amount` and use `vm.deal` to give ETH to the user. Then we will call the `call` function with the `amount` of ETH.

The next step is to warp the time and check the user's rebase token balance again. We will also warp the time again and check the balance a third time.  We will then check the difference between the balances each time.  The goal is to ensure that the interest is linear and that the amount of interest accrued is constant. 

We will use the `bound` function in our tests to ensure that the `amount` we use is not too large. 

Finally, we will wrap our tests with `vm.stopPrank`.

```javascript
function testDepositLinear() public {
    // 1. deposit
    vm.startPrank(user);
    uint256 amount = bound(1e18, 1e18 * 5, type(uint256).max);
    vm.deal(user, amount); 
    payable(address(vault)).call{value: amount}("");
    // 2. check our rebase token balance
    // 3. warp the time and check the balance again
    // 4. warp the time again by the same amount and check the balance again
    vm.stopPrank();
}
```

It is good practice to also run fuzz tests and integration tests, in addition to unit tests. 
