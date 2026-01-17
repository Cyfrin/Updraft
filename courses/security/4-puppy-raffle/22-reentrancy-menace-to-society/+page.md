---
title: Reentrancy - Menace to Society
---

_Follow along with this video:_

---

### Re-entrancy a Menace

Why am I stressing re-entrancy so much you might ask? The answer is simple.

- We've known about it since 2016
- It's easy enough to detect that static analyzers (like Slither) can identify them
- Web3 is still hit by millions of dollars in re-entrancy attacks per year.

This is so frustrating!

There's a [**GitHub Repo**](https://github.com/pcaversaccio/reentrancy-attacks) maintained by Pascal (legend) that catalogues re-entrancy attacks which have occurred. I encourage you to look through these examples and really acquire a sense of the scope of the problem.

### Case Study: The DAO

[**The DAO**](https://en.wikipedia.org/wiki/The_DAO) was one of the most famous (or infamous) protocols in Web3 history. As of May 2016, its total value locked was ~14% of all ETH.

Unfortunately, it suffered from a re-entrancy vulnerability in two of its functions.

The first problem existed in the `splitDao` function, here's the vulnerable section and the whole contract for reference:

```js
contract DAO is DAOInterface, Token, TokenCreation {
    ...
    function splitDAO(
        uint _proposalID,
        address _newCurator
    ) noEther onlyTokenholders returns (bool _success) {

    Transfer(msg.sender, 0, balances[msg.sender]);
    withdrawRewardFor(msg.sender); // be nice, and get his rewards
    totalSupply -= balances[msg.sender];
    balances[msg.sender] = 0;
    paidOut[msg.sender] = 0;
    return true;
    }
}
```

<details>
<summary>Entire Contract</summary>

```js
contract DAO is DAOInterface, Token, TokenCreation {
    function splitDAO(
        uint _proposalID,
        address _newCurator
    ) noEther onlyTokenholders returns (bool _success) {        Proposal p = proposals[_proposalID];        // Sanity check        if (now < p.votingDeadline  // has the voting deadline arrived?
            //The request for a split expires XX days after the voting deadline
            || now > p.votingDeadline + splitExecutionPeriod
            // Does the new Curator address match?
            || p.recipient != _newCurator
            // Is it a new curator proposal?
            || !p.newCurator
            // Have you voted for this split?
            || !p.votedYes[msg.sender]
            // Did you already vote on another proposal?
            || (blocked[msg.sender] != _proposalID && blocked[msg.sender] != 0) )  {
            throw;
        }        // If the new DAO doesn't exist yet, create the new DAO and store the
        // current split data
        if (address(p.splitData[0].newDAO) == 0) {
            p.splitData[0].newDAO = createNewDAO(_newCurator);
            // Call depth limit reached, etc.
            if (address(p.splitData[0].newDAO) == 0)
                throw;
            // should never happen
            if (this.balance < sumOfProposalDeposits)
                throw;
            p.splitData[0].splitBalance = actualBalance();
            p.splitData[0].rewardToken = rewardToken[address(this)];
            p.splitData[0].totalSupply = totalSupply;
            p.proposalPassed = true;
        }        // Move ether and assign new Tokens
        uint fundsToBeMoved =
            (balances[msg.sender] * p.splitData[0].splitBalance) /
            p.splitData[0].totalSupply;
        if (p.splitData[0].newDAO.createTokenProxy.value(fundsToBeMoved)(msg.sender) == false)
            throw;        // Assign reward rights to new DAO
        uint rewardTokenToBeMoved =
            (balances[msg.sender] * p.splitData[0].rewardToken) / p.splitData[0].totalSupply;        uint paidOutToBeMoved = DAOpaidOut[address(this)] * rewardTokenToBeMoved /
            rewardToken[address(this)];        rewardToken[address(p.splitData[0].newDAO)] += rewardTokenToBeMoved;
        if (rewardToken[address(this)] < rewardTokenToBeMoved)
            throw;
        rewardToken[address(this)] -= rewardTokenToBeMoved;        DAOpaidOut[address(p.splitData[0].newDAO)] += paidOutToBeMoved;
        if (DAOpaidOut[address(this)] < paidOutToBeMoved)
            throw;
        DAOpaidOut[address(this)] -= paidOutToBeMoved;        // Burn DAO Tokens
        Transfer(msg.sender, 0, balances[msg.sender]);
        withdrawRewardFor(msg.sender); // be nice, and get his rewards
        totalSupply -= balances[msg.sender];
        balances[msg.sender] = 0;
        paidOut[msg.sender] = 0;
        return true;
    }
}
```

</details>


Hopefully we can spot the problem above. The DAO was making external calls before updating its state!

This is seen again in the `withdrawRewardFor` function:

```js
contract DAO is DAOInterface, Token, TokenCreation {
    ...
    function withdrawRewardFor(address _account) noEther internal
        returns (bool _success) {
        if ((balanceOf(_account) * rewardAccount.accumulatedInput()) / totalSupply < paidOut[_account])
            throw;        uint reward =
            (balanceOf(_account) * rewardAccount.accumulatedInput()) / totalSupply - paidOut[_account];
        if (!rewardAccount.payOut(_account, reward))
            throw;
        paidOut[_account] += reward;
        return true;
    }
}
```

---

An attack of this protocol in June 2016 resulted in the transfer of 3.8 Million Eth tokens and ultimately hardforked the Ethereum network in the recovery efforts.

You should absolutely read more about this attack [**here**](https://medium.com/@zhongqiangc/smart-contract-reentrancy-thedao-f2da1d25180c).

### Wrap Up

Clearly re-entrancy plagues us to this day. Millions of dollars are lost every year. There are even new types of re-entrancy, such as `read-only re-entrancy` (which we'll cover more later).

The bottom line is - this is preventable.

Let's recap everything we've learnt about this vulnerability, in the next lesson.
