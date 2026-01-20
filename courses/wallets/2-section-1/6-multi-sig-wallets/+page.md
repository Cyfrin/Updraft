---
title: Multi Sig Wallets
---

_Follow along with this video:_

---

### Multi Sig Wallets

A multi-sig wallet is a smart contract that governs transactions. These can be setup so that they require several people to sign a transaction for it to go through.

These can be customized such that any X number of people are required to sign out of Y before a transaction will process.

For example, if 3 people are needed to sign out of 5 authorized signers, this is known as a 3-of-5 wallet.

If you don't have a multi-sig wallet, we are going to walk you through setting one up by the end of this course. Why? Because multi-sig is absolutely my most preferable method of storing crypto assets for a number of reasons that we will get into shortly.

Social recovery is another method of storing crypto assets, and it is pretty similar to multi-sig, but we will talk about both of them shortly.

A multi-sig wallet, unlike browser wallets and hardware wallets, is a contract deployed on-chain where the money is stored, and you have defined parameters to interact with the wallet. Probably the best multi-sig wallet out there is Safe.global, which we will also walk through. There are other fantastic wallets too; for example, Aragon has a multi-sig feature for DAOs specifically.

A multi-sig wallet is a wallet that requires multiple signers to send out a transaction. For example, in a 3 of 5 multi-sig wallet, three out of the five wallets registered on the multi-sig wallet must sign a transaction before it is sent out.

For better example let's create a scenario;

If you have a 3 of 5 multi-sig wallet that has the below wallets associated to it...

- Metamask Wallet A
- Trezor Wallet
- Frame Wallet
- Rabby Wallet
- Metamask Wallet B

...before any transaction can be made with the wallet, any 3 of the 5 wallets associated with this multi-sig wallet need to sign the transaction.

- Metamask Wallet A approved to send 5 ETH
- Trezor Wallet Approves to send 5 ETH
- Rabby Wallet Approves to send 5 ETH -> 3/5 achieved, ETH sent

The beauty of using a multi-sig wallet is that you no longer have one single point of failure.

If one of these wallets becomes compromized, you can still be ok, because it isn't able to send transactions from the multi-sig on it's own. Multi-sigs typically will allow you to swap out wallets as needed (with appropriate quorum). This is a whole additional layer of security for a wallet to have.

### Wrap Up

Multi-sigs are a valuable second layer to typical wallet security that will remove the single point of failure associated with a compromised private key.

As a final point, it pains me to have to mention, but if you've gone through all the trouble of setting up a multi-sig, don't store the private keys to all of the authorized wallets on a single device, or in one place ...
