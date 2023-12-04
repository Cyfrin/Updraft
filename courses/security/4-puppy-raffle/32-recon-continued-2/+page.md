---
title: Recon Continued 2
---

_Follow along with this video:_

## 

---

# Smart Contract Review: Select Winner & Withdraw Fees

We will be navigating through multiple big issues found in a smart contract. Specifically, for a function called `selectWinner` and later on, `withdrawFees`.

## selectWinner

Alright, jump in the war zone! We spotted two big glitches in the `selectWinner` segment. Not the greatest news, but I do have some documentation for you. My bad, let me guide you through these tricky terminologies.

The two issues were:

1. Utilization of on-chain data hashes to generate random numbers.
2. Resetting the players' array after the winner is chosen.

To break it down for you:

Firstly, the issue with using the hash of on-chain data to generate random numbers is that it leaves our contract susceptible to manipulation. This is frowned upon in a blockchain environment that requires secure and non-tamperable algorithms.

Secondly, clearing out the active players' array after a winner is selected was another significant problem. If this doesn't happen, new users could confront erroneous entries from previous rounds, thereby jeopardizing the next winner sequence.

Now, what happens post-selection? We disburse 80% of the accumulated funds to the fortunate victor, and the remaining 20% is remitted to the fee address. Efficient, isn't it?

> "Generating unique and secure random numbers and regular reset of player arrays are crucial components of maintaining a fair and efficient lottery system."

## Token ID

Surprisingly, we stumbled over another considerable bug, bearing in the token supply section. The term 'Total Supply' was unresponsive when clicked at first. Therefore, scrolling through my project, I spotted the term multiple times in the code. It was linked to ERC721 token standard and indicated the number of token owners. So we concluded that the total supply also represents the token ID. However, we need to increment the ID to avoid its reuse.

```js
TotalSupply = tokenId++;
```

## Rarity Determination

Here we held onto the similar unpredictable randomness issue. We, although, calculated the winner index differently for rarity selection of the newly minted NFTs. If its number is less than a common rarity, it is mapped as a random number, else it's rare.

So, great, we nailed another bug! Before moving on, we also set conditions for resetting the players' array, the raffle start time and reviewed its necessity. If these conditions aren't perfected, the lottery could potentially get stuck and never finish.

![](https://cdn.videotap.com/7ck6k0hpIuydiM6GKGAa-460.86.png)

## Withdrawing Fees

Now, moving towards the `withdrawFees` section, we detailed how 20% of the funds were transferred to the fee address. This function can be activated by a different address than the owner. Wherein, the owner can alter the fee address if desired.

Do remember, when we are sending money, we could possibly trigger another function. So we should be precautious. Upon questioning whether withdrawal of fees was difficult, considering the existing balance and total fees in the contract, and whether the winner's address smart contract could potentially fail, we recorded these as issues to be probed further.

## Conclusion

All in all, while the intricacies of the blockchain are quite deep, going through this review should have allowed you to better understand some of its fundamental parts. I hope this blog was illuminating and helpful in navigating through the complex terrain of smart contract auditing. The bugs we discussed are by no means exhaustive, but remembering these few pitfalls can save a lot of debugging time in the future. Game on.

Remember, the goal as a successful security researcher is to gain knowledge and experience from each review, and eventually, you will develop an intuition, a "bug sniffer". The more you review the code, the better you'll get at hunting bugs. Happy coding!
