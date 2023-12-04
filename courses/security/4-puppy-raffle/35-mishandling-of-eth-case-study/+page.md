---
title: Mishandling of Eth - Case Study
---

_Follow along with this video:_

## 

---

# Unraveling the SushiSwap Attack: A Case Study on ETH Handling

In this post, we will delve deep into an intriguing historical incident in the cryptosphere – the infamous attack on the SushiSwap protocol due to poor handling of Ethereum (ETH). By understanding these real-world instances and the factors that facilitated these attacks, we can significantly upgrade our knowledge base and sharpen our defenses against potential intrusions.

So, let's get started on this intriguing journey!

![](https://cdn.videotap.com/u8WMx76vvOAsmbCZXNQq-11.91.png)

## Unveiling the Core Problem

At the heart of this notorious attack was [SushiSwap’s protocol flaw](https://samczsun.com/two-rights-might-make-a-wrong/) in managing ETH, the cryptocurrency powering the Ethereum network. This led to a situation where users' ETH got stuck, with no viable means of withdrawal.

Notably, this exploit is a stark example of a broad category of bugs related to rudimentary ETH handling.

In question was a batch function embedded within this protocol. As a helpful tool, this function enabled users to initiate multiple calls within a single transaction. While this might sound beneficial, the problems arose when this feature was misused through the `delegateCall` command.

## Understanding the DelegateCall Anomaly

This seemingly handy feature was precisely where the exploiter sneaked in.

```javascript
    function batch(bytes[] calldata calls, bool revertOnFail) external payable returns (bool[] memory successes, bytes[] memory results) {
        successes = new bool[](calls.length);
        results = new bytes[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(calls[i]);
            require(success || !revertOnFail, _getRevertMsg(result));
            successes[i] = success;
            results[i] = result;
        }
    }
```

What made this issue particularly intriguing and equally challenging to identify was its subtle occurrence. It involved a certain mishandling of message sender (`msg.sender`) and message value (`msg.value`).

To understand this better, let's plunge into the mechanics of the `delegateCall` command.

> "Inside a delegate call, message sender and message value are preserved across every iteration in the batch. This allows a user to batch multiple calls, committing ETH across each while reusing the message value - leading to free bids in the auction."

## Recognizing the Exploit

Now, let's look at how this vulnerability paved the way for an exploit.

During the batch process, if any of the calls influenced the message value, that persistence would be retained for all subsequent events. This exploit meant that someone could potentially make multiple calls leveraging the same message value but only needed to send one ETH unit.

To illustrate, imagine wanting to send 100 transactions, naturally needing 100 ETH units. With this flaw, anyone could send these 100 batch transactions using just a single ETH unit. That's right. 100 potential transactions, but only at the cost of a single one. An alarming oversight indeed, with catastrophic implications for the protocol.

![](https://cdn.videotap.com/FuftKRwJQsWu0I0yDN0Y-119.14.png)

## Case Study: An Exceptional Learning Opportunity

I earnestly urge you to take some time to review this [expansive case study](https://samczsun.com/two-rights-might-make-a-wrong/) associated with our course repository. This comprehensive assessment offers a fantastic insight into the peculiarities and oddities linked with ETH handling, and how it functions 'under the hood.'

These case studies provide us with an unmatched opportunity to acquire a deep understanding of the Ethereum blockchain's native token balance system. Although more often than not a robust system, it occasionally hosts bugs that are as interesting as they are complex.

In conclusion, as we traverse the cryptosphere, navigate intricate protocols, and deal with diverse cryptocurrencies like ETH, it’s essential to understand the possible vulnerability. Knowing past pitfalls and learning from them is our best defense against future threats.
