---
title: Reentrancy - Recap
---

_Follow along with this video:_

---

### Recap

At it's most minimalistic, a re-entrancy attack looks like this:

![exploit-reentrancy3](/security-section-4/18-exploit-reentrancy/exploit-reentrancy3.png)

A reentrancy attack occurs when an attacker takes advantage of the recursive calling capability of a contract. By repeatedly calling a function within a contract, the attacker can withdraw funds or manipulate contract state before the initial function call is resolved, often leading to the theft of funds or other unintended consequences.

As a more indepth reference:

![exploit-reentrancy2](/security-section-4/18-exploit-reentrancy/exploit-reentrancy2.png)

We learnt that re-entrancy is a _very_ common attack vector and walked through how to identify and reproduce the vulnerability both in [**Remix**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/reentrancy/Reentrancy.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js) and locally as well as how to test for them.

<details>
<summary>Re-entrancy Test Example</summary>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {ReentrancyVictim, ReentrancyAttacker} from "../../src/reentrancy/Reentrancy.sol";

contract ReentrancyTest is Test {
    ReentrancyVictim public victimContract;
    ReentrancyAttacker public attackerContract;

    address victimUser = makeAddr("victimUser");
    address attackerUser = makeAddr("attackerUser");

    uint256 amountToDeposited = 5 ether;
    uint256 attackerCapital = 1 ether;

    function setUp() public {
        victimContract = new ReentrancyVictim();
        attackerContract = new ReentrancyAttacker(victimContract);

        vm.deal(victimUser, amountToDeposited);
        vm.deal(attackerUser, attackerCapital);
    }

    function test_reenter() public {
        // User deposits 5 ETH
        vm.prank(victimUser);
        victimContract.deposit{value: amountToDeposited}();

        // We assert the user has their balance
        assertEq(victimContract.userBalance(victimUser), amountToDeposited);

        // // Normally, the user could now withdraw their money if they like
        // vm.prank(victimUser);
        // victimContract.withdrawBalance();

        // But... we get attacked!
        vm.prank(attackerUser);
        attackerContract.attack{value: 1 ether}();

        assertEq(victimContract.userBalance(victimUser), amountToDeposited);
        assertEq(address(victimContract).balance, 0);

        vm.prank(victimUser);
        vm.expectRevert();
        victimContract.withdrawBalance();
    }
}
```

</details>
:br

Additionally, we learnt that `static analysis` tools like `Slither` can even catch this vulnerability (though not always)!

We also covered how to safeguard against this attack in at least two ways.

- Adhering to the CEI (Checks, Effects, Interactions) pattern, assuring we perform state changes _before_ making external calls.
- Implementing a nonReentrant modifier like one offered by [**OpenZeppelin's ReentrancyGuard**](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol).
- Applying a mutex lock to our function ourselves.
<details>
<summary>Mutex Lock Example</summary>

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

</details>
:br

Lastly, we learnt how this problem still plagues us today. Through this [**repo**](https://github.com/pcaversaccio/reentrancy-attacks) managed by Pascal et al, we can see a horrifying list, 7 years long, of just this single attack vector. We also uncovered a case study in [**The DAO hack**](https://medium.com/@zhongqiangc/smart-contract-reentrancy-thedao-f2da1d25180c) and saw just how severe this issue can be.

Armed with all of this knowledge, surely you will _never_ miss a re-entrancy attack again. Let's move onto the PoC.
