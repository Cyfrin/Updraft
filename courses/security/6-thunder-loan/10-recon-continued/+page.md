---
title: Recon (continued)
---

---

### Recon (continued)

Alright! We've gained tonnes of additional context by taking the time to better understand concepts like arbitrage and flash loans, which seem to be integral to Thunder Loan's functionality.

As security researchers, it's often important for us pro-actively seek out a deeper understanding of protocol features to properly understand how a protocol works.

If you haven't already, I encourage you to read up on [**Aave**](https://aave.com/) and [**Compound**](https://compound.finance/), on which Thunder Loan is based. I previous also linked this [**Aave explainer video**](https://www.youtube.com/watch?v=dTCwssZ116A) from Whiteboard Crypto that you should definitely check out.

As we continue to read through the documentation of Thunder Loan, something sticks out to me.

```
Users additionally have to pay a small fee to the protocol depending on how much money they borrow. To calculate the fee, we're using the famous on-chain TSwap price oracle.
```

`TSwap` price oracle!?

That's the protocol we just audited! The inclusion of `TSwap` here is meant to highlight an important feature of DeFi, its `composability`.

`Composability` effectively means it can be written off of or added to. Protocols in DeFi may use other protocols and it's important to remember that any vulnerabilities present within a protocol that is inherited could absolutely affect the child contracts! We'll need to keep this in mind.

**_What is an Oracle?_**

As we should all know by this point in the course (it's covered in [**Advanced Foundry**](https://updraft.cyfrin.io/courses/advanced-foundry)!), an oracle is a system or device which brings real-world data on-chain. Chainlink price feeds or an AMM Dex like TSwap can serves as examples of oracles.

We'll find out why Thunder Loan needs an oracle as we continue our review!

### Upgradeability

The last thing I notice in the docs here is this:

```
We are planning to upgrade from the current ThunderLoan contract to the ThunderLoanUpgraded contract. Please include this upgrade in scope of a security review.
```

If we look at ThunderLoan.sol we can see that it's inheriting a bunch of upgradeability libraries such as `Initializable`, `OwnableUpgradeable`, `UUPSUpgradeable`, and `OracleUpgradeable`. We aren't going to go over the specifics of upgradeability or proxy functionality, in this course (again you can find further information on that in [**Advanced Foundry**](https://updraft.cyfrin.io/courses/advanced-foundry)), but this is a vital consideration for our review moving forward and represents a whole host of unique attack vectors we haven't seen yet.

### Wrap Up

Now that we have so much context and understanding of Thunder Loan, I think we're ready to dive in and start breaking it.

In the next lesson, we'll start with applying some of our tools to weed out some low hanging fruit. See you there!
