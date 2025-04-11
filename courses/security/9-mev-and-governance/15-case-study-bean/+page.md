---
title: Case Study - Beanstalk
---

_Follow along with this video:_

---

### Case Study - Beanstalk

And now, we have guest lecturer and fellow course creator [JohnnyTime](https://twitter.com/RealJohnnyTime) to walk us through a real-world case study of a governance attack in action.

You can read more about the [Bean attack in Rekt](https://rekt.news/beanstalk-rekt/). We'll outline some highlights of the attack here.

### The Numbers and Highlights

- $182,000,000 loss to the protocol

- Attacker profited $76,000,000 which they laundered through Tornado Cash

- $106,000,000 was paid in flash loan and swap feed on Aave and Uniswap respectively.

- Governance Manipulation Attack

- Highly Sophisticated

### What is Beanstalk Protocol?

Beanstalk is a decentralized credit system which leverages the BEAN stablecoin. This protocol creates incentives for trading which stabilize the peg.

If BEAN is under the $1 peg, the protocol will decrease the supply, if it's above the $1 peg, the supply will increase.

There are a few technical aspects of the Beanstalk Protocol which are of note.

- Diamond Proxy Pattern - allows upgradeability through facets
- Functionality can be added/removed
- On-chain governance

### How Does Beanstalk Work?

You can find a very thorough breakdown of Beanstalk as a protocol via a video from The Calculator Guy, [**On YouTube**](https://www.youtube.com/watch?v=h2wlrnd5jSM). Encourage you to check him out.

One thing not covered in depth in the video above is how the governance within Beanstalk actually works.

The Beanstalk Protocol contains token based governance linked to its STALK token. STALK is earned through staking primarily within the protocol and it's through the possession of STALK that a user's voting power is gained.

Proposals to the protocol are made via BIPs (Beanstalk Improvement Proposals)

> ❗ **PROTIP**
> Beanstalk had been audited several times before they were exploited! This goes to show you can never be _too_ secure!

### How Are BIPs Executed?

A BIP which has been approved via vote has to wait 7 days, due to a timelock, before execution. This is a security measure to assure hasty code changes aren't implemented without thorough consideration.

This flow is executed through the `commit(bip)` function.

A second option exists in order to execute BIP through the `emergencyCommit(bip)` function which, as one would assume, expedites execution of a BIP, possessing only a 1 day timelock. The caveat is that, in order to call the `emergencyCommit` function a `super-majority` is required, this is defined as 67% of the voting power.

### The Attack

Prior to the exploit of Beanstalk, on-chain evidence shows that they funded their EOA wallet with nearly 100 ETH through Tornado Cash.

**Step 1.** Purchase BEAN token from UNISWAP

**Step 2.** Deposit BEAN into the Beanstalk Protocol. This affords the attacker governance power which allows them to submit BIPs

**Step 3.** Create 2 Proposals

- BIP18 - An unusually empty proposal
- BIP19 - A proposal to donate $250,000 to Ukraine, with $10,000 being sent to the person who created the proposal
  - Crucially, the name of the facet proposed to execute this donation was `initBip18`

**Step 4.** Deploy Malicious Contract

At this point, the attacker deployed a malicious smart contract, which did a number of things.

1. Executed flash loans and flash swaps from 3 separate sources, `AAVE`, `Uniswap`, `SushiSwap`, totaling $1 Billion.
2. Leverages all of this liquidity and deposits into the Beanstalk Protocol's staking system (this give the attacker a huge influx in voting power due to the awarding of STALK tokens).

Once 70% of the voting power was obtained by the attacker, this power (representing a super-majority) was used to execute a second, **REAL**, malicious BIP18 contract. This malicious contract stole the liquidity from Beanstalk.

3.  Pays back the loans
    - Once all the borrowed liquidity was paid back, the attacker was left with almost $79,000,000

**Step 5.** Laundering The Money

After converting the stolen funds to ETH, the attacker leverages the Tornado Cash mixer to obfuscate where the money is being sent in an effort to get away with his ill gotten gains.

### The Fallout

The effect of this attack was devastating to the protocol, and destroyed the value of the BEAN token. Since the attack, Beanstalk survived and has since recovered nicely. Ultimately they chose to remove on-chain governance to severe an attacker's ability to automatically influence the functionality of the protocol. Future proposals are checked and executed by the protocol team before execution!
