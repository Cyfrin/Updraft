---
title: DAOs & Governance Intro
---

_Follow along with this video._

---

### DAOs & Governance Intro

Welcome back! We're in the final stretch for this course and we've learnt so much. In this section we're going to dive into DAOs or Decentralized Autonomous Organizations.

There's a lot of conceptual stuff to cover, but we're going to learn what a DAO is, what they're for and how they work.

Before the end of this section, I want you to take the time to read through these two articles:

[**DAOs are not corporations: where decentralization in autonomous organizations matters**](https://vitalik.eth.limo/general/2022/09/20/daos.html) - Vitalik

[**Governance, Part 2: Plutocracy Is Still Bad**](https://hackernoon.com/governance-part-2-plutocracy-is-still-bad-1p4zu3p94) - Vitalik

These articles by Vitalik shine a great light on some of the issues with DAOs and the weaknesses we see with them. The former focusing on the difficulties seen in coordinating the management of DAOs with so many participants, and the latter touches on the inherent issue with tying governance to purchasable tokens and how governance by the wealthy is .. less than ideal. Very insightful articles, absolutely encourage you to read them. If the content doesn't make a tonne of sense now, don't worry, it will soon!

### DAOs

Before we jump into coding a DAO, let's learn what a DAO is.

DAO stands for Decentralized Autonomous Organization, this is defined as:

**_Any group that is governed by a transparent set of rules found on a blockchain or smart contract._**

> ❗ **PROTIP**
> Don't confuse DAO with **The DAO**. The DAO was.. a DAO, one of the earliest, which was hacked back in 2016! Read more about [**The DAO Hack**](https://www.gemini.com/cryptopedia/the-dao-hack-makerdao).

It's not entirely accurate, but an easy way to think about a DAO is like a big company where all the actions of the company are decided upon by Immutable, Transparent, Decentralized voting mechanisms.

This affords the users of a system the power to control and direct how it evolves over time, instead of leaving this power in the hands of centralized control, behind closed doors.

Decentralized voting/governance is the cornerstone of how these systems operate!

Let's take a closer look at an active an live DAO Today. Compound protocol is setting the standard for how modern DAOs should operate.

### Compound

[**Compound Finance**](https://compound.finance/) is a borrowing and lending protocol which allows users to borrow and lend digital assets. In Compound, when a decision arises such as listing a new token, or changing interest rates, the decision is handled through their governance mechanism, their DAO.

We can access their governance system, and view past and pending proposals, through the Governance UI of their website.

::image{src='/foundry-daos/1-intro/intro1.png' style='width: 100%; height: auto;'}

If we navigate to one [**specific proposal**](https://compound.finance/governance/proposals/256), we can gain a lot of insight into how this process works. The proposal view breaks down the votes received, the number of participating addresses and importantly the Proposal History. We're able to see that every proposal begins with a transaction.

::image{src='/foundry-daos/1-intro/intro2.png' style='width: 100%; height: auto;'}

Let's take a closer look at this [**create transaction**](https://etherscan.io/tx/0xbe0b8152195a29c7ac61144dbaa9f98b00fbb7c59d15b19e96105a42195fa829)! This transaction will show us all of the data submitted to the proposal.

::image{src='/foundry-daos/1-intro/intro3.png' style='width: 100%; height: auto;'}

Decoding this function selector shows a pretty standard propose function. Typically a proposal will be broken down into:

- List of addresses to call
- List of functions to call on those addresses
- Arguments to pass those functions
- A description of what the proposal is

```bash
propose(address[],uint256[],string[],bytes[],string)
```

Often the functions being called are part of the DAO's functionality and typically have access controls which assure only the DAO Governance Contract can call them.

Once created, and after a brief delay configured by the protocol, a proposal becomes active for voting. This is a predetermined duration during which members of the DAO can vote to accept or refuse a proposal

::image{src='/foundry-daos/1-intro/intro4.png' style='width: 100%; height: auto;'}

Voting can happen directly on-chain of course, or through the provided app interface provided [**here**](https://app.compound.finance/vote?market=usdc-mainnet).

::image{src='/foundry-daos/1-intro/intro5.png' style='width: 100%; height: auto;'}

If voting succeeds, a proposal will be queued for execution. This queue period affords time before execution of a proposal for a number of things including:

- security checks
- challenges to the proposal
- an exit opportunity for stakeholders who disagree with the proposal
- preparation for execution

Following this timelock period, the proposal is executed!

> ❗ **NOTE**
> Often just submitting a proposal isn't enough to garner the votes needed for it to be executed. Often some type of discussion forum or community space is needed to allow users to attack and defend a proposal.

### DAO Architecture

Let's look a little closer at the properties of a DAO that allow them to function.

**Voting Mechanism**

This is the means by which a community engages with the protocol and contributes to the decisions being made. This is a fundamental part of how a DAO functions.

One consideration that must be made is: **How do we identify stakeholders, or members of the community, eligible to vote?**

Often this is handled via an ERC20 or an NFT of some kind, but this runs the risk of being _less_ fair if the tokens are more available to the wealthy than others. This is not dissimilar to Web2 companies and how the voting power of company shares works.

One methodology is the "Skin in the Game" method whereby voting records are recording and negative outcomes result in tokens/voting power being lost. This is beneficial in that it holds users accountable for the decisions they make. A downside to this approach is how difficult it can be to reach a consensus on what a _bad_ outcome is.

A third approach is something called "Proof of Personhood Participation" and while potentially ideal, isn't something with a sound implementation yet. The idea would be a method by which someone can be verified as being a single human entity, but the logics of this are difficult and rub up against anonymity. Some projects like WorldCoin are trying to find solutions here!

**Voting Implementation**

**On-chain Voting:**

Handled via smart contract, votes are placed by calling functions to this contract. A major drawback of this is the gas costs associated with placing this vote transaction. Even small costs in gas can be enough to dissuade participation, and that's to say nothing of transactions which happen to be expensive due to congestion or poor code.

**Off-chain Voting:**

What if I told you, you could sign a transaction and vote in a decentralized way without spending any gas?

Transactions can actually be signed without being sent to the blockchain. What this means is a protocol could take a bunch of signed transactions, uploaded to a decentralized database (like IPFS), calculate the votes and then batch submit them to the blockchain, maybe even leveraging an oracle to ensure decentrality. This can reduce voting costs by up to 99%!

It's important to be careful the the implementation of any off-chain features, if you introduce a centralized component, the decentrality of your DECENTRALIZED autonomous organization goes away.

### Tools

There are a number of no-code/low-code tools that can facilitate a DAO, services like [**DAO Stack**](https://www.alchemy.com/dapps/daostack), [**Aragon**](https://aragon.org/), [**Colony**](https://colony.io/) and [**DAO House**](https://www.daohouse.global/) can greatly assist in the operations side of running a DAO.

Additional tools with more granular control and integrations include things like [**Snapshot**](https://snapshot.org/) which allows a team to glean sentiment of a community before execution while also including functionality to manage and execute proposals if desired. Other tools to check out include [**Zodiac**](https://github.com/gnosisguild/zodiac) a development library offered by Gnosis and our old friends [**OpenZeppelin**](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance). We'll be using the OZ library in our development for sure!

Lastly, another "tool" I want to mention is [**Safe**](https://safe.global/) (previously Gnosis Safe), or really any multisig wallet solution. Any protocol is going to have some degree of centrality, especially as it first launches. A multisig wallet will decentralize control to some degree while a protocol grows into adopting fully decentralized governance.

### Wrap Up

Woo! We now have a better understanding of how a DAO works, what motivates them and the pros and cons associated with a variety of implementations.

I'm excited to get building, but before that, in the next lesson we're going for a brief dive into Aragon and how they can make DAO development easier!
