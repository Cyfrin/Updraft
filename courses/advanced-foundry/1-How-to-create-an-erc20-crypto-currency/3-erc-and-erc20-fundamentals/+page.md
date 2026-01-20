---
title: ERC20 Basics
---

_Follow along the course with this video._

---

### ERC20 Basics

Welcome back! I hope you're ready to move into some more advanced concepts in Web3. In this section we're going to be diving into `ERC20s`, and how to develop, deploy and test them.

You can find the code associated with section in the [**GitHub repo**](https://github.com/Cyfrin/foundry-full-course-cu) associated with this course, and in the [**section repo specifically**](https://github.com/Cyfrin/foundry-erc20-cu).

Before we rush into creating our own `ERC20 Token`, let's take a moment to learn _what_ an `ERC20` is, what `EIPs` are and where all these acronyms mean.

### ERCs and EIPs

The Web3 and blockchain ecosystem is fundamentally democratic and open source. As such major blockchains will often implement methods by which the community can submit suggestions for changes in methodologies and standards. These are typically known is `Improvement Proposals`, and in the Ethereum ecosystem they are `Ethereum Improvement proposals` (`EIPs`).

If `EIPs` get enough traction to warrant genuine consideration they will often generate a `Request for Comments`, in Ethereum these are known as `Ethereum Request for Comments` (`ERCs`).

> ❗ **NOTE**
> `EIPs` and `ERCs` are numbered chronologically! `ERC20` is the 20th request for comments that was created.

New `Improvement Proposals` and `Requests for Comments` are tracked on websites such as [**eips.ethereum.org**](https://eips.ethereum.org/), where you can watch these proposals go through the process real time and be adopted or rejected by the community.

![erc20-basics1](/foundry-erc20s/1-erc20-basics/erc20-basics1.PNG)

### EIP status terms

- **Idea** - An idea that is pre-draft. This is not tracked within the EIP Repository.
- **Draft** - The first formally tracked stage of an EIP in development. An EIP is merged by an EIP Editor into the EIP repository when properly formatted.
- **Review** - An EIP Author marks an EIP as ready for and requesting Peer Review.
- **Last Call** - This is the final review window for an EIP before moving to FINAL. An EIP editor will assign Last Call status and set a review end date (`last-call-deadline`), typically 14 days later. If this period results in necessary normative changes it will revert the EIP to Review.
- **Final** - This EIP represents the final standard. A Final EIP exists in a state of finality and should only be updated to correct errata and add non-normative clarifications.
- **Stagnant** - Any EIP in Draft or Review if inactive for a period of 6 months or greater is moved to Stagnant. An EIP may be resurrected from this state by Authors or EIP Editors through moving it back to Draft.
- **Withdrawn** - The EIP Author(s) have withdrawn the proposed EIP. This state has finality and can no longer be resurrected using this EIP number. If the idea is pursued at a later date it is considered a new proposal.
- **Living** - A special status for EIPs that are designed to be continually updated and not reach a state of finality. This includes most notably EIP-1.


### ERC20

One of the most recognized `Ethereum Requests for Comments` is the [**ERC20 Token Standard**](https://eips.ethereum.org/EIPS/eip-20). This is a proposal in which the methodology for creating and managing these tokens on the Ethereum blockchain was tabled.

These tokens essentially exists as records of value within smart contracts on chain and this smart contract tracking of balances is a very powerful thing in Web3.

**_Why make an ERC20?_**

There are a few common reasons that someone may choose to launch an `ERC20 token`, but there's very little limit to the possibilities of their application in a digital space. A few common use cases include:

- Governance Tokens
- Securing an underlying network
- Synthetic Assets
- Stable Coins

...and more.

**_How do I build an ERC20?_**

All anyone has to do to develop and `ERC20` is to deploy a smart contract which follows the [**token standard**](https://eips.ethereum.org/EIPS/eip-20). This ultimate boils down to assuring our contract includes a number of necessary functions: `transfer`, `approve`, `name`, `symbol`, `balanceOf` etc.

### Wrap Up

With a better understanding of what `ERCs/EIPs` are and where they come from, we'll be looking at how we can create and deploy our own simple `ERC20` token, in the next lesson.

Exciting!
