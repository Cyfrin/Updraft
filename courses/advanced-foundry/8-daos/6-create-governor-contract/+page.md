---
title: Governor Contract
---

_Follow along with this video._

---

### Governor Contract

Alright, we've got one major piece missing from our DAO protocol and that's the governor contract. This is the heart of the DAO which manages the proposal and voting functionality died to the protocol's governance.

Fortunately, [**OpenZeppelin's Contract Wizard**](https://wizard.openzeppelin.com/#governor) can help us here too!

By selecting the `Governor` configuration, we're presenting with a number of options to customize.

![governor-contract1](/foundry-daos/5-governor-contract/governor-contract1.png)

Voting Delay - Time between proposal creation and the start of voting

Voting Period - How long votes may be submitted for

Proposal Threshold - Minimum number of votes an account must have to create a proposal

Quorum %/# - The number of participants in a vote required for a vote to validly pass

Updatable Settings - allows the above configurations to be updated in future

Votes - This denotes how voting power is derived be it through ERC20s or possessing NFTs etc

Timelock - Configuration related to delays and timelines for various parts of the DAO protocol

Upgradeability - Our bells from last lesson should be going off! This includes proxy functionality within our DAO

We'll keep everything default for this exercise, let's just copy the provided Governor contract into our own file `src/MyGovernor.sol`.

```solidity
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import {Governor, IGovernor} from "@openzeppelin/contracts/governance/Governor.sol";
import {GovernorSettings} from "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import {GovernorCountingSimple} from "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import {GovernorVotes, IVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import {GovernorVotesQuorumFraction} from "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import {GovernorTimelockControl, TimelockController} from "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract MyGovernor is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl {
    constructor(IVotes _token, TimelockController _timelock)
        Governor("MyGovernor")
        GovernorSettings(7200 /* 1 day */, 50400 /* 1 week */, 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
        GovernorTimelockControl(_timelock)
    {}

    // The following functions are overrides required by Solidity.

    function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.proposalNeedsQueuing(proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _queueOperations(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
        returns (uint48)
    {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _executeOperations(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
    {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
        returns (uint256)
    {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }
}
```

Alright, there's quite a bit happening here, so let's go through some of it.

Our Governor contract is inheriting `Governor`, `GovernorSettings`, `GovernorCountingSimple`, `GovernorVotes`, `GovernorVotesQuorumFraction`, `GovernorTimelockControl`...all these. Let's glean a high-level understanding of the most important of these.

**Governor.sol:**

This is the core of the governance system. The governor tracks proposals via the `_proposals` mapping

Proposals exist as fairly simple structs:

```solidity
struct ProposalCore {
    // --- start retyped from Timers.BlockNumber at offset 0x00 ---
    uint64 voteStart;
    address proposer;
    bytes4 __gap_unused0;
    // --- start retyped from Timers.BlockNumber at offset 0x20 ---
    uint64 voteEnd;
    bytes24 __gap_unused1;
    // --- Remaining fields starting at offset 0x40 ---------------
    bool executed;
    bool canceled;
}
```

Each proposal's state is tracked through the `state` function. This references the aforementioned proposal mapping and displays various properties including if it was executed, if quorum was reached etc. This is the function that many front ends will call to display proposal details.

```solidity
function state(uint256 proposalId) public view virtual override returns (ProposalState) {
    ProposalCore storage proposal = _proposals[proposalId];

    if (proposal.executed) {
        return ProposalState.Executed;
    }

    if (proposal.canceled) {
        return ProposalState.Canceled;
    }

    uint256 snapshot = proposalSnapshot(proposalId);

    if (snapshot == 0) {
        revert("Governor: unknown proposal id");
    }

    uint256 currentTimepoint = clock();

    if (snapshot >= currentTimepoint) {
        return ProposalState.Pending;
    }

    uint256 deadline = proposalDeadline(proposalId);

    if (deadline >= currentTimepoint) {
        return ProposalState.Active;
    }

    if (_quorumReached(proposalId) && _voteSucceeded(proposalId)) {
        return ProposalState.Succeeded;
    } else {
        return ProposalState.Defeated;
    }
}
```

One of the most important functions in Governor.sol is going to be `propose`, this is the function DAO members will call to submit a proposal for voting, the parameters passed here are very specific.

```solidity
function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
) public virtual override returns (uint256) {}
```

**targets** - a list of addresses on which proposed functions will be called

**values** - a list of values to send with each target transaction

**calldatas** - the bytes data representing each transaction and the arguments to pass proposed function calls

**description** - a description of what the proposal does/accomplishes

The proposal function takes these inputs and will hash them, generating a unique proposalId.

Another integral function within this contract is `execute` which we see takes largely the same parameters as `propose`. Within execute, these passed parameters are hashed to determine the valid proposalId to execute. Some checks are performed before the internal \_execute is called and we can see the same low-level functionality we used to call arbitrary functions, in previous lessons.

```solidity
/**
 * @dev Internal execution mechanism. Can be overridden to implement different execution mechanism
 */
function _execute(
    uint256 /* proposalId */,
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 /*descriptionHash*/
) internal virtual {
    string memory errorMessage = "Governor: call reverted without message";
    for (uint256 i = 0; i < targets.length; ++i) {
        (bool success, bytes memory returndata) = targets[i].call{value: values[i]}(calldatas[i]);
        Address.verifyCallResult(success, returndata, errorMessage);
    }
}
```

The last major function I'll detail is \_castVote. There are a number of derivated such as castVoteWithReason, castVoteBySig etc, but ultimately they boil down to this \_castVote logic.

```solidity
 /**
 * @dev Internal vote casting mechanism: Check that the vote is pending, that it has not been cast yet, retrieve
 * voting weight using {IGovernor-getVotes} and call the {_countVote} internal function.
 *
 * Emits a {IGovernor-VoteCast} event.
 */
function _castVote(
    uint256 proposalId,
    address account,
    uint8 support,
    string memory reason,
    bytes memory params
) internal virtual returns (uint256) {
    ProposalCore storage proposal = _proposals[proposalId];
    require(state(proposalId) == ProposalState.Active, "Governor: vote not currently active");

    uint256 weight = _getVotes(account, proposal.voteStart, params);
    _countVote(proposalId, account, support, weight, params);

    if (params.length == 0) {
        emit VoteCast(account, proposalId, support, weight, reason);
    } else {
        emit VoteCastWithParams(account, proposalId, support, weight, reason, params);
    }

    return weight;
}
```

This function is fairly simple, it references the proposal via the passed proposalId, determines a voting weight with \_getVotes, then adds the votes to an internal count of votes for that proposal, finally emitting an event.

Many of the functions within Governor.sol, we'll notice, are unimplemented. This is because Governor.sol is `abstract` and we're expected to fill some of these in with our own specific logic.

**GovernorVotes.sol:**

This contract extracts voting weight from the ERC20 tokens used for a protocols governance.

**GovernorSettings.sol:**

An extension contract that allows configuration of things like voting delay, voting period and proposalThreshold to the protocol.

**GovernorCountingSimple.sol:**

This extension implements a simplified vote counting mechanism by which each proposal is assigned a ProposalVote struct in which forVotes, againstVotes and abstainVotes are tallied.

```solidity
struct ProposalVotes {
    uint256 againstVotes;
    uint256 forVotes;
    uint256 abstainVotes;
    mapping(address => bool) hasVoted;
}
```

**GovernorVotesQuorumFraction:**

An extension which assists in token voting weight extraction.

**GovernorTimelockControl.sol:**

_This_ is actually quite an important implementation and every DAO should employ a Timelock Controller. Effectively the Timelock controller is going to serve as a regulator for the Governor. Each time the Governor control attempts to take an action, it will need to be checked versus the Timelock controller to account to cooldown periods, or voting delays.

This functionality is important for a number of reasons, two major ones that come to mind are:

- Security - delays between successful votes and proposal execution afford the protocol/community time to assure there was no malicious code
- Fairness - this affords anyone who disagrees with a successful proposal time to exit their position on the protocol

### MyGovernor.sol Constructor

So, with a better understanding of all the functionality our DAO has under-the-hood, the constructor we copied over from the Contract Wizard should make a lot of sense to us.

```solidity
constructor(IVotes _token, TimelockController _timelock)
    Governor("MyGovernor")
    GovernorSettings(7200, /* 1 day */ 50400, /* 1 week */ 0)
    GovernorVotes(_token)
    GovernorVotesQuorumFraction(4)
    GovernorTimelockControl(_timelock)
{}
```

On deployment our DAO will take a governance token and a TimelockController as well as configure a bunch of the settings we left as default 😅

The TimelockController is going to be the last contract we need to write, actually!

### Timelock.sol

We don't get a Contract Wizard shortcut this time, but it won't be too difficult to build this one out ourselves, we _can_ still leverage the OpenZeppelin governance library.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    /**
     * @notice Create a new Timelock controller
     * @param minDelay Minimum delay for timelock executions
     * @param proposers List of addresses that can propose new transactions
     * @param executors List of addresses that can execute transactions
     */
    constructor(uint256 minDelay, address[] memory proposers, address[] memory executors)
        TimelockController(minDelay, proposers, executors, msg.sender)
    {}
}
```

In the above, we're passing `msg.sender` to the `TimelockController`'s `admin` parameter. We have to set an initial admin for the controller, but this can and should be changed after deployment

### Wrap Up

That's it! I know we're moving through things kinda quickly, but if anything is confusing, this is your chance to jump into the community for clarification.

These systems and methodologies seem complex when all put together like this, but nothing we've gone over here is fundamentally any different than things we've seen before.

In the next lesson, we're going to dive into tests. We'll skip the deploy script this time around, but we'll have an opportunity to see how this DAO functions end to end.
