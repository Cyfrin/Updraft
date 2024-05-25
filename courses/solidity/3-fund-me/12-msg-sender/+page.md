---
title: Message Sender (msg.sender)
---

_You can follow along with the video course from here._

<a name="top"></a>

### Introduction

In this lesson, we will learn how to track addresses that are funding the contract and the amounts they send to it.

### Tracking Funders

To track the addresses that send money to the contract, we can create an array of addresses named `funders`:

```solidity
address[] public funders;
```

Whenever someone sends money to the contract, we will add their address to the array with the `push` function:

```solidity
funders.push(msg.sender);
```

The `msg.sender` global variable refers to the address that initiates the transaction.

### Mapping Users to Funds Sent

We can also map each funder's address to the amount they have sent using **mappings**. Let's define a mapping in Solidity as follows:

```solidity
mapping(address => uint256) public addressToAmountFunded;
```

The `addressToAmountFunded` mapping associates each funder's address with the total amount they have contributed.

When a new amount is sent, we add it to the user's total contribution:

```solidity
addressToAmountFunded[msg.sender] += msg.value;
```

### Conclusion

We have successfully implemented a system to track users who fund the `fundMe` contract. This mechanism records every address that is sending ETH to the contract, and maps the sender's address to the total amount they have contributed.

### 🧑‍💻 Test yourself

1. 📕 Explain why we need to use the mapping `addressToAmountFunded` inside the `fundMe` contract
2. 🧑‍💻 Implement a function `contributionCount` to monitor how many times a user calls the `fund` function to send money to the contract.

[Back to top](#top)
