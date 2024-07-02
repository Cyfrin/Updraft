---
title: Where Is My Private Key
---

---

_Follow along with this video:_

---

### Where Is My Private Key

Now, we will talk more in a little bit about how to choose one of these solutions, but many people wonder where their private key is stored on browser wallets such as Metamask, Rabby etc.

Some people even have security concerns and ask if the companies behind these browser wallets actually have access to their private keys. Honestly, this is where understanding how the code works becomes crucial, and reading third-party audit reports of these browser wallets can be extremely helpful.

For all of these browser wallets, your private key is encrypted and stored in a file in your computer. Obviously, we would never want any browser wallet company to hold onto our private key; hence, it is encrypted and stored locally.

In addition to this, whenever you open your Metamask and enter your password to unlock your wallet, that password is also used to decrypt your private key so that it is available for use.

[**ERC2335**](https://eips.ethereum.org/EIPS/eip-2335), which is the `BLS12-381 key store`, is the format that many people use to encrypt and store their private keys, and it is the same one that most browser wallets would use. This is the same encryption that the Foundry Framework uses to encrypt and store private keys when using the `cast` command.

Every user is going to have these files stored in a unique location dependent upon the operating system they're using. My challenge to you is to locate the files on your system which contain your private keys.

Why? Well, I think it is necessary for you to know what your private key looks like when encrypted and you should actually know where it is stored. I have left a link in the [**GitHub resources**](https://support.metamask.io/hc/en-us/articles/360018766351-How-to-recover-your-Secret-Recovery-Phrase) associated with this course to help you walk through it. For this exercise, you don't have to see the exact encryption file; you just have to know the location where it is.

This outlines a weakness of these browser wallets. If someone were to get access to your password someway, it's very easy for them to find/decrypt these files stored on your local machine.

Hardware wallets function like a real wallet, in that in order to gain access to the funds contained, they would need access to the wallet itself. As someone becomes more advanced, they should definitely move into having a hardware wallet solution.
