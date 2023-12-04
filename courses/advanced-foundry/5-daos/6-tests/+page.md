---
title: Tests
---

_Follow along with this video._



---

On this lesson we are going to write some test for our DAO.

## Testing Your DAO

Let's start by writing a test.

```shell
touch test/MyGovernorTest.t.sol
```

One of the reasons we are proceeding a bit swiftly is because- This. Is. It. This is the point where you level up from being a novice to developing a strong understanding of how DAOs work.

We are going to write a test which will cover the whole process. The test we write here is going to be a comprehensive one so you can see this process in action from start to finish.

And here's what you should know already:

- How to flesh out this repo with scripts, tests.
- How to write unit tests, fuzz tests, and more.
- How to make your project bigger and better (also read as, bad\*ss).

## Testing the Governance Protocol

We are going to code 2 main tests:

**Cannot Update Box Without Governance:** This test ensures that the governance mechanism is properly implemented by attempting to update the Box contract without the necessary governance authorization. If the update attempt doesn't revert, it signifies a vulnerability in the governance setup, highlighting the importance of secure access control.

**Governance Updates Box:** This test scenario simulates a complete governance process for updating the Box contract. It starts by proposing a change, which encapsulates the desired update along with metadata. After the voting period elapses, the vote is executed if passed. In this case, the proposed change involves storing a specific value in the Box contract, showcasing the end-to-end functionality of the governance system.

This is how the testing script will look like:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {MyGovernor} from "../src/MyGovernor.sol";
import {GovToken} from "../src/GovToken.sol";
import {TimeLock} from "../src/TimeLock.sol";
import {Box} from "../src/Box.sol";

contract MyGovernorTest is Test {
    GovToken token;
    TimeLock timelock;
    MyGovernor governor;
    Box box;

    uint256 public constant MIN_DELAY = 3600; // 1 hour - after a vote passes, you have 1 hour before you can enact
    uint256 public constant QUORUM_PERCENTAGE = 4; // Need 4% of voters to pass
    uint256 public constant VOTING_PERIOD = 50400; // This is how long voting lasts
    uint256 public constant VOTING_DELAY = 1; // How many blocks till a proposal vote becomes active

    address[] proposers;
    address[] executors;

    bytes[] functionCalls;
    address[] addressesToCall;
    uint256[] values;

    address public constant VOTER = address(1);

    function setUp() public {
        token = new GovToken();
        token.mint(VOTER, 100e18);

        vm.prank(VOTER);
        token.delegate(VOTER);
        timelock = new TimeLock(MIN_DELAY, proposers, executors);
        governor = new MyGovernor(token, timelock);
        bytes32 proposerRole = timelock.PROPOSER_ROLE();
        bytes32 executorRole = timelock.EXECUTOR_ROLE();
        bytes32 adminRole = timelock.TIMELOCK_ADMIN_ROLE();

        timelock.grantRole(proposerRole, address(governor));
        timelock.grantRole(executorRole, address(0));
        timelock.revokeRole(adminRole, msg.sender);

        box = new Box();
        box.transferOwnership(address(timelock));
    }

    function testCantUpdateBoxWithoutGovernance() public {
        vm.expectRevert();
        box.store(1);
    }

    function testGovernanceUpdatesBox() public {
        uint256 valueToStore = 777;
        string memory description = "Store 1 in Box";
        bytes memory encodedFunctionCall = abi.encodeWithSignature("store(uint256)", valueToStore);
        addressesToCall.push(address(box));
        values.push(0);
        functionCalls.push(encodedFunctionCall);
        // 1. Propose to the DAO
        uint256 proposalId = governor.propose(addressesToCall, values, functionCalls, description);

        console.log("Proposal State:", uint256(governor.state(proposalId)));
        // governor.proposalSnapshot(proposalId)
        // governor.proposalDeadline(proposalId)

        vm.warp(block.timestamp + VOTING_DELAY + 1);
        vm.roll(block.number + VOTING_DELAY + 1);

        console.log("Proposal State:", uint256(governor.state(proposalId)));

        // 2. Vote
        string memory reason = "I like a do da cha cha";
        // 0 = Against, 1 = For, 2 = Abstain for this example
        uint8 voteWay = 1;
        vm.prank(VOTER);
        governor.castVoteWithReason(proposalId, voteWay, reason);

        vm.warp(block.timestamp + VOTING_PERIOD + 1);
        vm.roll(block.number + VOTING_PERIOD + 1);

        console.log("Proposal State:", uint256(governor.state(proposalId)));

        // 3. Queue
        bytes32 descriptionHash = keccak256(abi.encodePacked(description));
        governor.queue(addressesToCall, values, functionCalls, descriptionHash);
        vm.roll(block.number + MIN_DELAY + 1);
        vm.warp(block.timestamp + MIN_DELAY + 1);

        // 4. Execute
        governor.execute(addressesToCall, values, functionCalls, descriptionHash);

        assert(box.retrieve() == valueToStore);
    }
}

```

## Wrapping Up

You've learned how a typical voting process within a DAO works. However, this is just the basics. There are more advanced methodologies emerging daily, and it's only apt for you as a developer to explore these emerging trends.

There is a common criticism that pure DAOs can often devolve into plutocracies. To avoid that, consider tweaking the voting mechanisms or exploring other models of decentralized governance.

If you're feeling up to it, consider deploying a DAO or even creating your own! No matter what you decide to do next, pat yourself on the back. You've made a significant leap in your journey into understanding blockchain and smart contracts.

<img src="/daos/6-test/test1.png" alt="Dao Image" style="width: 100%; height: auto;">

Stay tuned for our next post. Until then, happy coding!
