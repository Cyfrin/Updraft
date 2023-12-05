---
title: Section 6 - Recap
---

.

## Unraveling the Flash Loans on Thunder Management Protocol

Firstly, let's talk about flash loans, the key feature of the Thunder Management Protocol. Flash loans are innovative DeFi tools that allow users to borrow substantial amounts of assets for one single transaction. They have gained prominence due to their significant use in arbitrage opportunities, previously only utilized by prolific investors, fondly known as 'whales'. With flash loans, however, anyone can seize these golden opportunities.

![](https://cdn.videotap.com/XdZhyn8C3rqPpi7yPlNe-50.31.png)

> "Flash loans are phenomenal DeFi primitives turning anyone into a whale."

As security researchers, we recognize the importance of understanding top protocols like Aave and Compound. This foundational knowledge provides us with necessary context for quicker and more efficient future project comparisons. Moreover, we've realized using an AMM(Automated Market Maker) or a DEX(Decentralized Exchange) protocol as a pricing oracle is a poor choice. Instead, a decentralized price feed like Chainlink should be on your go-to list for robust and secure oracle solutions.

## Shedding Light on Proxies and their Risks

We discussed the significant implications of utilizing proxies in contract development, particularly UUPS(Upgradable Unambiguous Proxy Standard). Proxies can lead to dreaded risks such as centralization and storage collisions if not handled carefully. However, our discussion did not extensively cover the transparent proxy or the multi-faucet proxy—important topics available for further research.

![](https://cdn.videotap.com/rq3TwsRcnxoecVEB3Kir-138.35.png)

One intriguing topic we brushed upon is 'malicious scope'. Sometimes, while auditing a codebase, a protocol might ask you to ignore auditing a certain part. Interestingly, that often is the part housing the rug pull. As analysts, it's important to snuff out such malicious intentions. If you keep missing the red flags and all audited projects end in rug pulls, it reflects poorly on your auditing abilities. At the very least, all potential risks should be plainly stated in the audit report, serving as a potential alarm for the readers.

## Introduction to Useful Tooling and Strategies

Exploring some handy tools, we touched briefly upon Upgrade Hub, a powerful tool highlighting how often protocols have undergone silent upgrades—some rather misleading ones, though. In addition, we dug into some fascinating exploits, especially the infamous failure to initialize contracts. Important note: always ensure contracts you're analyzing or designing have a method deployed to authenticate contract initializations.

![](https://cdn.videotap.com/WZFqXvkBGJ6wgC3VdPJ0-188.65.png)

Talking about the infamous Oasis case study, it served as a prime example demonstrating the repercussions of protocol centralization, reminding us of the potential rug pull danger lurking beneath the surface of centralized architectures. Remember to signal such major centralization risk in your audit reports.

Another important topic was Oracle and price manipulations. A considerable number of Oracle manipulation attacks pose high risks, reinforcing our advice not to use an AMM as your pricing Oracle.

We concluded our section with design patterns, aiding in understanding the underlying operational concepts in smart contract development.

## Concluding Remarks and How to Move Forward

Admittedly, this section is information-dense and might seem confusing at first glance. However, remember to interact with fellow developers, share insights, ask questions, and contribute to discussions on platforms such as our Cypher Updraft community. You’ll find yourself gradually familiarizing with the concepts, making them seem less daunting.

![](https://cdn.videotap.com/aXjjMtL66bz5IgquDe55-264.12.png)

Onwards, we're heading to section seven, offering riveting insights about Boss Bridge and its inner workings. It's going to be an intriguing journey into Yul and Assembly's realm—an important break from our previous section.

A massive thank you to everyone following along on this informative journey. Your perseverance and eagerness to learn have made this adventure fun and informative, equally. Remember, it's okay to take a breather, get some coffee, maybe go for a good workout, rest, and come back ready to dive deeper into this fascinating world of blockchain and smart contracts.

Okay then, are we ready to dive into section seven? Great! Let’s begin our exploration.

![](https://cdn.videotap.com/i3PPe1YFwpZgqTiGNVBF-314.42.png)
s
