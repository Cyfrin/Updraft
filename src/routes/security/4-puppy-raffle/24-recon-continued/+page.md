---
title: Recon Continued
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889508471?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Thoroughly Examining and Auditing Smart Contract in Slither

While performing a manual audit of the smart contract of a Puppy Raffle application in Slither, we unearthed several areas that warrant a more in-depth investigation, such as functions, variables and interactions.

![](https://cdn.videotap.com/bY22ZXsy75N3gZs0jFox-17.06.png)

## A Close Look at Specific Functions

In this audit, we have done a thorough review of the `refund` function as well as the `enterRaffle` function. Let's now move our attention to understanding the other functionalities of how the Puppy Raffle works.

### Reviewing the GetActivePlayer Function

Upon reviewing the `GetActivePlayer` function, we discovered an informational issue. From a first glance, it appears to be a minor issue as it can lead someone to erroneously believe that their active player index is zero.

```js
function getActivePlayer() public {/* function logic*/}
```

### Unfolding the Select Winner Function

Next, we are going to examine a major function called `selectWinner`. This function is designed to choose a single winner randomly and mint a new puppy token based on the entries kept in the `players` array.

```js
function selectWinner() public {/* function logic*/}
```

A cursory look at the function shows that the select winner function follows CEI (Check Effects Interaction) principle as it starts with a series of checks. A quick follow-up review confirms the function's adherence to the principle except for one section where it calls `Safe Mint`. However, we need to better understand what `Safe Mint` does to evaluate if the exception is justified.

## Exploring Variables and Rules

The `selectWinner` function contains a built-in condition that requires at least four players to exist before a winner can be selected. Another condition that enforces temporal constraints is the `raffle_duration` paired with the `raffle_start_time`. Our review shows that the raffle duration is set at the deployment of the contract, and the raffle start time is set at the instant when the contract is deployed.

```js
public int raffleDuration; // set during contract deployment
public int raffleStartTime; // set when contract is deployed
```

Preliminary inspection indicates that these setups seem correct, but we will need to validate their setting and interactions in the next phase.

## Questioning the Randomness of the Winner

The real crux of the `selectWinner` function lies in the line that calculates the `winner_index`. This is achieved by taking an encoded value based on the message sender, block timestamp and block difficulty, and then applying a modulus operation with the player's length. This operation presumably provides a pseudo-random number, which in turn is used to select a winner.

```js
winnerIndex =
  keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty)) %
  players.length;
```

However, this method of generating a random number raises a potentially critical concern — weak randomness. This is a known area of potential exploit in blockchain wherein pseudo-random number generators can be manipulated, thus warranting further investigation.

> _Note: "Is the random winner really random?"_

Overall, our extensive drill-down into the `selectWinner` function and related variables has revealed several potential loopholes, including weak randomness, that need further examination to ensure the security and fairness of the Puppy Raffle Dapp.

Stay tuned for our upcoming posts where we will dive deep into understanding potential vulnerabilities, and continue examining the rest of the smart contract.
