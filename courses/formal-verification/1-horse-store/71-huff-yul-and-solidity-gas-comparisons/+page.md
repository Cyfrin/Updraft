---
title: Huff/Yul/Solidity Gas Comparison
---

_Follow along with this video:_

---

### Comparing Gas Costs

Assuming all our tests are passing, one of the coolest things this set up allows us to do is directly compare the gas costs of each of our tests using the command

```bash
forge snapshot
```

This is going to run all of our tests, but keep a record of gas costs in a local file named `.gas-snapshot`.

![huff-yul-and-solidity-gas-comparison1](/formal-verification-1/70-huff-yul-and-solidity-gas-comparison/huff-yul-and-solidity-gas-comparison1.png)

This output file lets us compare the gas costs of each test performed for each of our implementations. We can see things like:


```
- HorseStoreHuff:testReadValue() (gas: 7419)
- HorseStoreSolc:testReadValue() (gas: 7525)
```

Huff is more gas efficient than Solidity!

---

```
- HorseStoreHuff:testWriteValue(uint256) (runs:256, u: 27008, ~: 28097)
- HorseStoreSolc:testWriteValue(uint256) (runs:256, u: 27251, ~: 28340)
```

Huff wins again! Let's look at one comparison from HorseStoreV2:

---

```
- HorseStoreHuffV2:testFeedingHorseUpdatesTimestamps() (gas: 106119)
- HorseStoreSolcV2:testFeedingHorseUpdatesTimestamps() (gas: 115149)
```

Wow! It's nearly 10,000 more gas in raw Solidity than it is in raw Huff. When looking at comparisons like this, it's easy to begin to see the advantages of coding in low level languages like Huff and Yul.

Always remember the trade-offs that are made to save this gas however. This saved gas we see is a product of all the checks we skipped the implementation of in Huff, checks meant to keep people safe. We skipped checking for msg.value and calldata length for example. These checks exist for a reason and we should be confident and conscientious when we choose to omit them.
