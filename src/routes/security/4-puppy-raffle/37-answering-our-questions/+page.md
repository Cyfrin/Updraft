---
title: Answering Our Questions
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/3MSO9NJ2j_0" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Detailed Debugging Discussion: Answering Key Questions

During my recent dive into a codebase, I was asked several key questions. In this blog post, I'm going to break down each question and provide my solutions. Let's begin our discussion.

## The Players Array Dilemma

First, the intriguing question of the players' array arose. It was essential to check if we ever reset the array. Our audit eventually led us to the bottom of the code where we found that indeed, the players' array was reset.

![](https://cdn.videotap.com/kmOkBiTr178jCe2yOCNa-22.9.png)

### Empty Array Scenario

The next question posed was, what happens when we have an empty array? Does this trigger an event? After thorough checks, I decided to include this scenario in my report for further audit.

## When Player Is at Index Zero

A scenario raised was anticipating the condition when the player is at index zero. Previous results indicated that if the player is at index zero, the function returns zero. This might confuse a player into thinking they're not active.

![](https://cdn.videotap.com/HSNYhGEIwD2ytQEi2CeQ-49.61.png)

### CEI Compliance in Audit Recommendations

All of this leads us to the question of whether the code adheres to Checks-Effects-Interactions (CEI) pattern. It turned out that it did not, consequently, suggesting a recommendation in the audit to adhere to CEI.

> "The CEI pattern is an important best practice in Solidity programming to avoid reentrancy attacks."

## Duration and Start Time

Continuing our examination, we explored if the duration and start time parameters are being set correctly. The code appeared to handle this correctly, effectively eliminating this query from our list of concerns.

## Question of Balances and Fees

Another query was to contemplate why we don't just use `address(this).balance` for some of the fees. Why not, indeed? This interesting inquiry was marked down for further exploration in the audit.

## Is the 80% Calculation Correct?

Moving on, we examined a key calculation in the code that deals with 80% of a certain value. Our audit confirmed that this calculation was implemented correctly.

> Always refer back to the documentation to validate the implementation.

Looking deeper into this calculation, we discovered a possible arithmetic error which might cause some precision loss. A note was made to address this issue in the final report.

## Keeping Track of Token Supply

To find out where the token supply total was incremented, we referred to the Open Zeppelin repositories', `SafeMint` function. If you're not familiar with this, I highly recommend checking out the OpenZeppelin documentation.

![](https://cdn.videotap.com/6icrcHwg1yWjBbqusn4h-133.57.png)

### Unfair Advantage with Transaction Reverts

A worrying scenario might occur if a transaction picks a winner that we don't like, causing a gas war. This could create an unfair advantage in the system, making it a key point in the report follow-up.

## Is Reentry Possible?

Our debugging expedition dove deeper as we tried to verify if reentry was possible. The results indicated that it wasn't, but the advice was given to follow CEI nonetheless.

## Issues with Smart Contracts as Winners

The potential of a smart contract with a failing fallback function winning was observed as an issue. This situation could result in the winner not receiving any money.

### Withdrawal Difficulties

The inability to withdraw fees if there were players in the protocol was viewed as a significant problem. This hindrance could develop into an "Miners Extractable Value (Mev)" attack as well.

## Mishandling of ETH

We then deduced that the code mishandled ETH. This bug resulted in losing accumulated ETH, making it a matter for our consideration.

## Addressing Fee Addresses

The final question assessed the scenario of a fee address being a smart contract with a non-functioning fallback. We concluded that it's not a big issue since the owner can change the holder.

And with that, all of our pressing questions were successfully answered! But remember, coding is an evolving process. Always revise, recheck and keep improving. Until our next debugging session, happy coding!
