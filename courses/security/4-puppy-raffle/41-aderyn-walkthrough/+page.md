---
title: Aderyn Walkthrough
---

_Follow along with this video:_

## 

---

# Enhancing Your Smart Contract Security with Aderyn

Let's look at another powerful tool that makes auditing your smart contracts easier - Aderyn. This article sets out to show how this tool helps users identify specific issues in your contract, and the best part is that it generates a markdown report which you can quickly integrate into your final report.

Let's delve in!

## Benefits of Aderyn

One of the amazing features of Aderyn is that it creates a markdown report which you can easily copy and paste into your final report. After running Aderyn on your smart contract, you'll find an `report.md` file - a result of Aderyn's quick and thorough analysis.

![](https://cdn.videotap.com/uMvxzTVuSfeiTlRIxGAA-27.68.png)

## Key Findings Using Aderyn

Upon previewing the report generated by Aderyn, you'll discover some really interesting insights about your smart contract. Here, I will discuss a few crucial issues highlighted by this tool.

### Potential Centralization Risk for Trusted Owners

One of the most crucial issues brought to the forefront is the centralization risk. Any contract offering owner permission to make changes may present a potential threat. Owners could potentially leverage their power to manipulate the contract. However, in most cases, we may disregard this risk given the limited powers entrusted to the owner, involving just the alteration of the fee address.

> "Smart contracts are supposed to be these immutable, decentralized contracts. However, any time there is an ownership property, the owner could potentially do something malicious."

### abi.encodePacked

In some situations, using `abi.encodePacked` with dynamic types when passing the result to a hash function like keccak256 could lead to low-level issues. Fortunately, this isn't as severe as it might sound, and can often be resolved by removing the contentious line altogether.

### Missing Address Zero Checks and Undefined Functions

Aderyn is good at picking up simple programming slip-ups. For instance, it will flag when address zero checks are missing, which can occur when values are being assigned to address and state variables.

Aderyn also points out if there are any internal functions that aren't being utilised. A nifty solution to this is either marking these unused functions as external or removing them completely.

### Use of Magic Numbers

Aderyn can detect the usage of magic numbers in your contract - a common poor programming practice. As seen below, "80" being used as a magic number was caught by the tool. It recommends using constant variables instead of literals, which aligns with good programming practices.

![](https://cdn.videotap.com/2bVrCC34nMU5Ved8C7bz-110.71.png)

### Events Missing Indexed Fields

The final point brought to attention by Aderyn was the lack of indexed fields in events. This can be easily resolved by adding an index field to your events, which can improve the search efficiency.

The comprehensive markdown report generated by Aderyn also provides a detailed breakdown on each of the identified issues, as well as additional information relating to possible attack vectors.

### Leverage Aderyn for Simplified Reporting

In essence, Aderyn is an effective tool for auditing smart contracts and makes reporting straightforward. You can simply copy-paste its analysis into your report, making it a compelling part of your smart contract auditing toolkit.
