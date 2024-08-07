---
title: Wallets & Post Deployments
---

_Follow along with this video:_

---

### Wallets & Post Deployments

_Be sure to follow along with the [**GitHub resources**](https://github.com/Cyfrin/evm-wallet-and-post-deployment-course) associated with this course._

To get started, we will walk through various wallet configurations that you may consider using when deploying and working with your protocols. We will begin with `custodial wallets`, then move on to `hot wallets`, followed by `cold wallets`, and finally explore `multi-sig wallets` or `social recovery wallets`.

I am going to teach this course a little differently than some of my other courses. This is the type of course where you just have to follow along, listen attentively, take notes, and we will have a quiz at the end. There won't be a lot of coding involved; instead, simply follow along and quiz yourself at the end.

> ❗ **PROTIP**
> Never deploy a protocol with a single externally owned account (EOA).

If you are watching this now, you should already know how to work with wallets like [**MetaMask**](https://metamask.io/), [**Rabbi**](https://rabby.io/), or [**Frame**](https://frame.sh/) because they are easy to use, provide good visualization, and are great for learning.

While these wallets are excellent tools, they also come with a lot of associated risks.

The biggest thing you should take away from this course, is if your protocol is ownable, you should be leveraging a multi-sig wallet. Full stop.

Here is the summary of wallet suggestions based on money amount and experience provided:

### Wallet suggestions based on money amount and experience

- **Total Noob**: Custodial wallet / Exchange
- **Beginner/Small money**: Browser
- **Intermediate/Medium-Small money**: Hardware wallet
- **Intermediate/Big Money**: Multi-sig wallet/Social recovery AND Hardware wallet
- **Advanced/Big money**: Multi-sig wallet/Social recovery or roll your own solution

These categories will be further explained to clarify the distinctions between "small money," "big money," and different levels of experience.

### Wrap Up

So let's start with the inexperienced people, the total noobs and their recommendation. Let's jump in and let's talk about the different type of wallets we can use.
