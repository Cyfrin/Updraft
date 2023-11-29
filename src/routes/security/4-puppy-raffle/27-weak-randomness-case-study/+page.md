---
title: Weak Randomness - Case Study
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/KpWqBm2IE20" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Case Study: The Meebits Exploit of 2021

In today's post, we're going to delve into an intriguing case study that involves an exploit of an NFT project, Meebits, which occurred in 2021. This analysis will shed light on a real-world example of how weak randomness was exploited, resulting in a substantial loss of nearly a million dollars for the protocol.

Our guest lecturer and fellow YouTuber, Andy Lee from Sigma Prime, is here to break everything down for us, from the details of the exploit itself to how it was eventually resolved.

![](https://cdn.videotap.com/xkbChTamuPnibRHVXkei-35.55.png)

Remember, periodically conducting post mortems like this greatly contributes towards honing your skills as a security researcher. Moreover, it complements the effort of strengthening the overall security of your projects and applications by acquainting you with the past exploits to forestall future vulnerabilities.

## A Deep Dive Into The Meebits Exploit

Meebits, created by Lava Labs (the brains behind CryptoPunks), was exploited due to insecure randomness in its smart contracts. By rerolling their randomness, an attacker was able to obtain a rare NFT.

The concept behind Mebits is simple. If you owned a CryptoPunk, you could mint a free Meebit NFT. The attributes of this newly minted NFT were supposed to be random, with some traits being more valuable than others. However, owing to exploitable randomness, the attacker could incessantly reroll their mint until they obtained an elusive NFT.

## Key Steps to the Exploit

Let's discuss how the attack unfolded. The attacker:

1. Found the metadata revealing the valuable traits compared to the other available ones.
2. Exploited the insecure randomness stemming from the smart contract, enabling the repeated rerolls of their mint.

The metadata disclosure in the contract was found on line 129, which led to an IPFS hash with a JSON Blob. This JSON Blob outlined the rarity of the types of Meebits, ranking from the rarest to the least rare.

![](https://cdn.videotap.com/CEWoGF9o6n51CYYJGpOx-177.73.png)

Besides, the Meebit Website provided further information on the rarity by using the token URL function. By entering the token ID, you could see the specific trait your Meebit had.

For instance, token 16647 had a 'visitor' trait type, currently ranking second in rarity.

## Analysing the Mint Function and Attack Contract

The smart contract had an external function, `mintWithPunkOrGlyph`, that verified whether the caller owned a Crypto Punk or Glyph. Upon confirmation, the user was allowed to mint a free NFT. This function assigns a random index to the ID; this random index is then assigned to the owner who requested the Meebit NFT.

![](https://cdn.videotap.com/bBOd0ojIlu3ppLIWpKQg-236.97.png)

> "To understand the exploitability, we need to consider the attack contract and its transactions."

On Etherscan, you can see the transactions where the attacker deployed a contract and repeatedly called a function on the attack contract until they succeeded in minting the NFT they wanted.

The attack contract is essentially a blob of bytecode, unlike the Meebits contract, which was verified. By putting this code into a bytecode decompiler, we can pinpoint how it was exploited.

![](https://cdn.videotap.com/VDFDeR5qbb6lh1CXHZBw-308.06.png)

The attack function reveals that the contract calls `mintWithPunkOrGlyph`, and if the Meebit random index wasn't as per the user's wish, the transaction would revert, allowing the attacker to try again.

One can use Tenderly to trace what exactly transpired during the transaction process.

## Conclusion of the Attack

After a grueling six hours of continual calls, the attacker successfully minted the rare Meebit 11647, which held the 'visitor' trait, spending thousands of dollars on gas during this period.

We owe a big thanks to Andy Lee from Sigma Prime for compelling insights into this case study. It provides a stark reminder of the importance of constant vigilance and thorough examination when dealing with smart contracts and other cryptographic protocols. It also underscores the vital necessity to never underestimate the potential for exploitation, no matter how obscure.

Stay tuned for more intriguing case studies and analysis as we continue to dissect cybersecurity incidents in the crypto space!
