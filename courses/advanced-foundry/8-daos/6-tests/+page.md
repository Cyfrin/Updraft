---
title: Tests
---

_Follow along with this video._

---

### Tests

Let's jump right into writing our tests. Begin with creating `test/MyGovernorTest.t.sol`. We're going to have one giant test to show this whole process end to end, let's start with the usual boilerplate!

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {MyGovernor} from "../src/MyGovernor.sol";
import {Box} from "../src/Box.sol";
import {Timelock} from "../src/Timelock.sol";
import {GovToken} from "../src/GovToken.sol";

contract MyGovernorTest is Test {
    MyGovernor governor;
    Box box;
    Timelock timelock;
    GovToken govToken;

    function setUp() public {
        govToken = new GovToken();
    }
}
```

We've more of our imported contracts that we'll need to deploy, but at this point we should consider the minting of our GovToken, you can choose to include the minting of your initial supply within the constructor of your GovToken ERC20, but I'm just going to add a mint function to it.

```solidity
function mint(address _to, uint256 _amount) public {
    _mint(_to, _amount);
}
```

> ❗ **IMPORTANT**
> You probably **_don't_** want a function that anyone can call in order to mint your governance token, we're just applying this here to make our testing easier.

```solidity
contract MyGovernorTest is Test {
    MyGovernor governor;
    Box box;
    Timelock timelock;
    GovToken govToken;

    address public USER = makeAddr("user");
    uint256 public constant INITIAL_SUPPLY = 100 ether;

    function setUp() public {
        govToken = new GovToken();
        govToken.mint(USER, INITIAL_SUPPLY);
    }
}
```

Something commonly overlooked when writing tests this way is that, just because our user has minted tokens, doesn't mean they have voting power. It's necessary to call the delegate function to assign this weight to the user who minted.

```solidity
function setUp() public {
    govToken = new GovToken();
    govToken.mint(USER, INITIAL_SUPPLY);
    vm.startPrank(USER);
    govToken.delegate(USER);
}
```

Now we can deploy our Timelock contract, we'll need both the Timelock and the governance token to deploy our governor contract! The Timelock constructor requires a minDelay, a list of proposers and a list of executors, so we'll need to declare those.

Once the Timelock has been deployed, we can finally deploy our governor contract.

```solidity
contract MyGovernorTest is Test {
    MyGovernor governor;
    Box box;
    Timelock timelock;
    GovToken govToken;

    address public USER = makeAddr("user");
    uint256 public constant INITIAL_SUPPLY = 100 ether;

    uint256 public constant MIN_DELAY = 3600; // 1 hour after a vote passes
    address[] proposers;
    address[] executors;

    function setUp() public {
        govToken = new GovToken();
        govToken.mint(USER, INITIAL_SUPPLY);

        vm.startPrank(USER);
        govToken.delegate(USER);
        timelock = new Timelock(MIN_DELAY, proposers, executors);
        governor = new MyGovernor(govToken, timelock);
    }
}
```

> ❗ **NOTE**
> Leaving the `proposers` and `executors` arrays empty is how you tell the timelock that anyone can fill these roles.

Now's the point where we want to tighten up who is able to control what aspects of the DAO protocol. The Timelock contract we're using contains a number of roles which we can set on deployment. For example, we only want our governor to be able to submit proposals to the timelock, so this is something we want want to configure explicitly after deployment. Similarly the `admin` role is defaulted to the address which deployed our timelock, we absolutely want this to be our governor to avoid centralization.

> ❗ **NOTE**
> For version 5 of OpenZeppelin's TimelockController contract, we need to use another admin role. 
> TimelockController: Changed the role architecture to use DEFAULT_ADMIN_ROLE as the admin for all roles, instead of the bespoke TIMELOCK_ADMIN_ROLE that was used previously. This aligns with the general recommendation for AccessControl and makes the addition of new roles easier. Accordingly, the admin parameter and timelock will now be granted DEFAULT_ADMIN_ROLE instead of TIMELOCK_ADMIN_ROLE
> PR: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/3799 
> We have to modify our code to account for this when
> running `forge test` so that our project will not error. Like this:
> `bytes32 adminRole = timelock.DEFAULT_ADMIN_ROLE();`

```solidity

function setUp() public {
    govToken = new GovToken();
    govToken.mint(USER, INITIAL_SUPPLY);

    vm.startPrank(USER);
    govToken.delegate(USER);
    timelock = new Timelock(MIN_DELAY, proposers, executors);
    governor = new MyGovernor(govToken, timelock);

    bytes32 proposerRole = timelock.PROPOSER_ROLE();
    bytes32 executorRole = timelock.EXECUTOR_ROLE();
    bytes32 adminRole = timelock.TIMELOCK_ADMIN_ROLE();

    timelock.grantRole(proposerRole, address(governor));
    timelock.grantRole(executorRole, address(0));
    timelock.revokeRole(adminRole, USER);
    vm.stopPrank();
}
```

The last thing we need to consider in our setUp is our little Box contract! Once deployed, we need to assure that the `timelock` is set as the owner of this protocol. If you recall, the store function of our Box contract is access controlled. This is meant to be called by only our DAO. But, because our DAO (the governor contract) must always check with the timelock before executing anything, the timelock is what must be set as the address able to call functions on our protocol.

```solidity
box = new Box();
box.transferOwnership(address(timelock));
```

Amazing! At this point we can jump right into our first simple test. Let's assure that only our timelock can call the `store` function.

```solidity
function testCantUpdateBoxWithoutGovernance() public{
    vm.expectRevert();
    box.store(1);
}
```

All we need, let's run it as a sanity check!

```bash
forge test --mt testCantUpdateBoxWithoutGovernance
```

![tests1](/foundry-daos/6-tests/tests1.png)

Beautiful!

Alright, the next one will be a giant test function. This should demonstrate from a coding standing point how a DAO function from start to end. Let's go!

```solidity
function testGovernanceUpdatesBox() public {}
```

The function we're going to call is store, of course, so we'll declare the value we expect to pass. Beyond this, the first thing we'll need to do to kick off a vote is submit a proposal.

```solidity
function propose(addresses[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description) public virtual override returns (uint256){...}
```

Many of these parameters we should already know. The target of our proposed function call is going to be our Box contract address, the value we're passing with the function call is zero, and the calldata is going to be our function signature encoded with our data. All things we've done before!

```solidity
function testGovernanceUpdatesBox() public {
    uint256 valueToStore = 420;
    string memory description = "Update box value to 420 for clout";
    bytes memory encodedFunctionCall = abi.encodeWithSignature("store(uint256)", valueToStore);

    calldatas.push(encodedFunctionCall);
    values.push(0);
    targets.push(address(box));
}
```

> ❗ **NOTE**
> You'll need to declare the constant variables `uint256[] values`, `bytes[] calldatas`, and `address[] targets` in your `MyGovernorTest.t.sol` contract!

From this point we can call our propose function! propose returns a uint256 proposalId, which will be important for the next stages of our test.

```solidity
function testGovernanceUpdatesBox() public {
    uint256 valueToStore = 420;
    string memory description = "Update box value to 420 for clout";
    bytes memory encodedFunctionCall = abi.encodeWithSignature("store(uint256)", valueToStore);

    calldatas.push(encodedFunctionCall);
    values.push(0);
    targets.push(address(box));

    // 1. Propose
        uint256 proposalId = governor.propose(targets, values, calldatas, description);
}
```

It might be a good idea for our test to check the state of the proposal that's been submitted! We can do this by calling the `state` function with our proposalId. This call will return a uint256 which pertains to an index of the ProposalState enum.

```solidity
abstract contract IGovernor is IERC165 {
    enum ProposalState {
        Pending,
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Queued,
        Expired,
        Executed
    }
    ...
}
```

We can check the state with the following:

```solidity
// View the State
console.log("Proposal State 1: ", uint256(governor.state(proposalId)));
```

We would expect this to return `0`, which indicates that the proposal is pending, this is because the Timelock Controller is enforcing a delay before voting on a proposal. We'll need to simulate the passage of time using the vm.warp and vm.roll cheatcodes Foundry offers before we can see our state change. We'll also need to declare a VOTING_DELAY constant and assign this to 1. This will represent 1 block delay before voting is authorized.

```solidity
contract MyGovernorTest is Test {
    ...
    uint256 public constant VOTING_DELAY = 1 // # of blocks until vote is active
    ...
    function testGovernanceUpdatesBox() public {
        ...
        // View the State
        console.log("Proposal State 1: ", uint256(governor.state(proposalId)));
        vm.warp(block.timestamp + VOTING_DELAY + 1);
        vm.roll(block.number + VOTING_DELAY + 1);
        console.log("Proposal State 2: ", uint256(governor.state(proposalId)));
    }
}
```

With this, we can finally cast a vote on the proposal! I'm going to leverage the castVoteWithReason function, but feel free to try some of the other variations of vote casting for practice! Importantly, a vote cast must adhere to one of the vote types to be valid/counted.

From the GovernorCountingSimple extension, the voting types are defined as:

```solidity
enum VoteType{
    Against, // 0
    For,     // 1
    Abstain  // 2
}
```

So, in order for our test to vote _in favour_ of a proposal, we need to pass `1` as our vote parameter in the function we're calling.

```solidity
// 2. Vote
string memory reason = "420 is cool number. Cool number for cool people.";

vm.prank(USER);
governor.castVoteWithReason(proposalId, 1, reason);
```

Now that the votes are cast, we'll need to advance time again. Our voting period has been defaulted to 1 week (50400 blocks), let's create this constant and move time forward accordingly.

```solidity
contract MyGovernorTest is Test {
    ...
    uint256 public constant VOTING_PERIOD = 50400;
    ...
    function testGovernanceUpdatesBox() public {
        ...
        vm.warp(block.timestamp + VOTING_PERIOD + 1);
        vm.roll(block.number VOTING_PERIOD + 1);
    }
}
```

Once the VOTING_PERIOD has elapsed, a successful proposal needs to be queued before it executes. The queue function, we remember, requires all the same parameters of the original proposal (with the description having already been hashed). This function uses the parameters to derive the proposalId and verify that the proposal state reflects a successful proposal. Let's go ahead and queue our proposal now!

After a proposal is queued, we'll of course need to advance time again to account for our Timelock's configured MIN_DELAY. This is the opportunity for stakeholders to exit their position if they don't agree with the DAOs decision!

```solidity
// 3. Queue the Proposal
bytes32 descriptionHash = keccak256(abi.encodePacked(description));
governor.queue(targets, values, calldatas, descriptionHash);

vm.warp(block.timestamp + MIN_DELAY + 1);
vm.roll(block.number + MIN_DELAY + 1);
```

FINALLY, after much anxiety and bated breath, our proposal hits the execute phase. Much like the queue function, the execute function requires the same parameters to verify the state of our proposalId before execution.

```solidity
// 4. Execute the Proposal
governor.execute(targets, values, calldatas, descriptionHash);
```

Once executed, we have to verify that our proposed change _actually_ happened! We can now call the `retrieve` function on our Box and assert that the returned value is what we expect it to be!

```solidity
console.log("Box Value: ", box.retrieve());
assert(box.retrieve() == valueToStore);
```

I know this written portion has been long and broken up (this test function is huge!), but here's the testGovernanceUpdatesBox test in its entirety for your reference:

<details>
<summary>testGovernanceUpdatesBox</summary>

```solidity
function testGovernanceUpdatesBox() public {
    uint256 valueToStore = 420;
    string memory description = "Update box value to 420 for clout";
    bytes memory encodedFunctionCall = abi.encodeWithSignature("store(uint256)", valueToStore);
    calldatas.push(encodedFunctionCall);
    values.push(0);
    targets.push(address(box));

    // 1. Propose
    uint256 proposalId = governor.propose(targets, values, calldatas, description);

    // View the State
    console.log("Proposal State 1: ", uint256(governor.state(proposalId)));
    vm.warp(block.timestamp + VOTING_DELAY + 1);
    vm.roll(block.number + VOTING_DELAY + 1);
    console.log("Proposal State 2: ", uint256(governor.state(proposalId)));

    // 2. Vote on Proposal
    string memory reason = "420 is cool number. Cool number for cool people.";

    // Vote Types derived from GovernorCountingSimple:
    // enum VoteType {
    //   Against,
    //   For,
    //   Abstain
    //}
    vm.prank(USER);
    governor.castVoteWithReason(proposalId, 1, reason);

    vm.warp(block.timestamp + VOTING_PERIOD + 1);
    vm.roll(block.number + VOTING_PERIOD + 1);

    // 3. Queue the Proposal
    bytes32 descriptionHash = keccak256(abi.encodePacked(description));
    governor.queue(targets, values, calldatas, descriptionHash);

    vm.warp(block.timestamp + MIN_DELAY + 1);
    vm.roll(block.number + MIN_DELAY + 1);

    // 4. Execute the Proposal
    governor.execute(targets, values, calldatas, descriptionHash);
    console.log("Box Value: ", box.retrieve());
    assert(box.retrieve() == valueToStore);
}
```

</details>


Woo! This is exciting, we're ready to run the test.

```bash
Forge test --mt testGovernanceUpdatesBox -vvv
```

![tests2](/foundry-daos/6-tests/tests2.png)

### Wrap Up

Oh. My. Goodness. This is really incredible! I know we went through this quickly, but at this point you're becoming a fairly sophisticated smart contract engineer. By now the repetition should be causing the familiarity with these building blocks to grow and every contract is a step in the direction towards even more experience.

I mentioned a few times at the beginning, but if you want to go further with this, if you want to build a full sized protocol, I encourage you to look into some of the alternative voting methodologies that have been created.

Putting voting power in the hands of those who can afford the most tokens is ... bad. So get out there and experiment with alternatives!

In the next lesson we'll recap everything we've learnt in this section, see you soon!
