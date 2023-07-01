# Gas II

You can follow along with this section of the course here. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/7ScrQcuT7xA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="signing transactions"></iframe>

Or watch the [full video](https://www.youtube.com/watch?v=umepbfKp5rI).


# Decoding the Essence of Blockchains: Transactions and Gas

Over the previous couple of blog posts, we've tried to unravel the mechanism underlying blockchains in detail. Today, the focus is on blockchain transactions and the concept of 'gas.'

Don't stress if this topic sounds complex; by the end of this post, the understanding of transactions and gas in the blockchain world will become more accessible.


<img src="/blockchain-basics/block-fee.png" style="width: 100%; height: auto;" alt="block fee">


## Back to Basics: Transaction Fee and Gas Limit

To start, let's focus on a transaction's cost or its transaction fee. It's the expense incurred when performing a transaction. You can view this on Etherscan under the block base fee per gas plus the max priority fee per gas times the gas used section.

Take a close look, though. Ethereum, like other digital currencies, may govern transactions differently. It follows EIP 1559, for instance.

<img src="/blockchain-basics/set-mm-fee.png" style="width: 100%; height: auto;" alt="set mm fee">


If we delve deeper, we find that the transaction used gas equal to the gas limit. Now the gas limit is changeable and is the maximum gas you're willing to use up in a transaction. This limits the computation units and prevents overuse. It can be adjusted using MetaMask (or any other Ethereum wallet).

```python
click Send-> Advanced -> change Gas limit.
```

MetaMask defaults the gas to 21,000 (Base cost for transferring Ether). Also present here are the priority fee and max base fee. If the gas needed exceeds the limit set, the transaction fails.

## Blockchain Jargon: Gwei and Ether

Pricing in Ethereum uses a unit called `gwei`. Unfamiliar with this term? Let me simplify it for you. Just as dollars and cents are part of the same family, Ethereum and gwei are too. Visit [Ethconverter.com](https://ethconverter.com) to see one Ether's worth in terms of GWei.

<img src="/blockchain-basics/eth-converter.png" style="width: 100%; height: auto;" alt="set mm fee">


The Max fee refers to the maximum gas fee we're ready to shell out for the transaction. It could be more than the actually paid gas price. Furthermore, the 'Max Priority Fee' accounts both for the maximum gas fee and the maximum tip given to miners.

## Gas Burning and Transaction Fees

With Ethereum's EIP 1559, a portion of the transaction fee is subtracted permanently from the total Ether supply, thereby 'burning' it. This eventually leads to a decrease in its circulation. The rest proceeds to miners. To tabulate the exact amount given to miners, subtract the 'burnt' fee from the total fee.

Each transaction type is unique, and Ethereum type 2 EIP 1559 signifies these gas fee and burning transactions. 

<img src="/blockchain-basics/burn-fee.png" style="width: 100%; height: auto;" alt="brun fee">


Ethereum's unique base fee system changes in response to the demand for transaction inclusion. If more transactions need inclusion, the base fee rises, and vice versa. This base fee is mathematically adjusted to maintain block capacity at around 50%.

## A Recap on Transactions

> "Every transaction on blockchain consists of unique transaction hash, status, block number, block confirmations, gas used, gas limit, timestamp, senders and receiver's address, transaction fee and so on."

Check the image below for a more comprehensive overview.

<img src="/blockchain-basics/gas-ii-summary.png" style="width: 100%; height: auto;" alt="gas ii summary">

## Minutiae of Blockchains

- The unique transaction hash identifies each transaction.
- 'Block confirmations' signify the number of blocks mined after a block's inclusion. The higher the number of confirmations, the more secure the blockchain.
- Once the transaction is included, you can see the block and all its transactions.
- For Ethereum transfers, input data remains blank, but for Smart Contracts, it holds crucial transaction information.
- The State tab, for advanced users, shows state changes linked to the transaction.

With the basics of blockchains, transactions, and gas now clearer, it's time to dive deeper into the blockchain fundamentals. Y

Now that you're all geared up with the theoretical know-how, it's time to dive into the practice! Incidentally, that's what we will be exploring in the next post. Stay tuned!