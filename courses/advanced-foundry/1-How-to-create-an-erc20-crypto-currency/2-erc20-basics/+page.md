---
title: ERC20 Basics
---

_Follow along the course with this video._

---

### ERC20 Basics

Welcome back! I hope you're ready to move into some more advanced concepts in Web3. In this section we're going to be diving into `ERC20s`, and how to develop, deploy and test them.

You can find the code associated with section in the [**GitHub repo**](https://github.com/Cyfrin/foundry-full-course-f23) associated with this course, and in the [**section repo specifically**](https://github.com/Cyfrin/foundry-erc20-f23).

Before we rush into creating our own `ERC20 Token`, let's take a moment to learn _what_ an `ERC20` is, what `EIPs` are and where all these acronyms mean.

### ERCs and EIPs

The Web3 and blockchain ecosystem is fundamentally democratic and open source. As such major blockchains will often implement methods by which the community can submit suggestions for changes in methodologies and standards. These are typically known is `Improvement Proposals`, and in the Ethereum ecosystem they are `Ethereum Improvement proposals` (`EIPs`).

If `EIPs` get enough traction to warrant genuine consideration they will often generate a `Request for Comments`, in Ethereum these are known as `Ethereum Request for Comments` (`ERCs`).

> ❗ **NOTE** > `EIPs` and `ERCs` are numbered chronologically! `ERC20` is the 20th request for comments that was created.

New `Improvement Proposals` and `Requests for Comments` are tracked on websites such as [**eips.ethereum.org**](https://eips.ethereum.org/), where you can watch these proposals go through the process real time and be adopted or rejected by the community.

::image{src='/foundry-erc20s/1-erc20-basics/erc20-basics1.png' style='width: 100%; height: auto;'}

### ERC20

One of the most recognized `Ethereum Requests for Comments` is the [**ERC20 Token Standard**](https://eips.ethereum.org/EIPS/eip-20). This is a proposal in which the methodology for creating and managing these tokens on the Ethereum blockchain was tabled.

These tokens essentially exists as records of value within smart contracts on chain and this smart contract tracking of balances is a very powerful thing in Web3.

**_Why make an ERC20?_**

There are a few common reasons that someone may choose to launch an `ERC20 token`, but there's very little limit to the possibilities of their application in a digital space. A few common usecases include:

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
