---
title: Integer Overflow - Mitigation
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/W-tv7-mze3o" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Optimizing Solidity Code: Fixes and Best Practices

In this section we will be focusing on how to optimize your solidity code by handling arithmetic issues, using newer solidity versions, and selecting appropriate sized unsigned integers.

![](https://cdn.videotap.com/JQFvqTTQx9NSt5trIsy4-5.2.png)

## Updating to Newer Versions of Solidity

First on our agenda - Newer solidity versions. They are the very first fix we will be discussing. Given the critical importance of versioning, it's surprising how many audits reveal that projects are still on outdated solidity versions, leaving them susceptible to unchecked errors.

By updating your Solidity version, you mitigate the risk of unchecked arithmetic overflow or underflow errors. Current versions of Solidity use a more secure arithmetic model where operations will automatically revert on underflows and overflows, which makes it safer and more secure.

So, it's not just good advice—it's a fundamental step towards secure code.

## Choosing the Right Size Unsigned Integer

Moving onto our next topic, let's talk about choosing the right size for your unsigned integers. You might, for example, be using a uint256 (Unsigned integer 256bits) in a certain spot. However, in some instances, it might be worth opting for larger 'uints' or 'bigger uns' as I like to call them.

Choosing the right integer type can significantly optimize your contracts' gas efficiency, as smaller integer types use less gas.

> "Why are you using a uint64? Don't do that. That's silly."

In my experience, oversized or undersized integer types is a common issue that arises in solidity audits. For example, using a uint64 when you're likely to end up surpassing that limit is a move that could potentially lead to disastrous results.

## Checking Against Max Value Limits

But how do you identify this?

Newcomers might rely on intuition or guesswork, when actually, a much more straightforward method is at our disposal. Tools such as Chisel, which come with your foundry, can help check if your program is using integers appropriately.

A simple command `uint64 max` can give you the maximum value for a uint64. This then allows you to gauge if the values you're dealing with are within the specified range of uint64 and therefore, giving you the ability to decide if using a uint64 is judicious or ill-advised.

Say, hypothetically if your protocol generates over 18 ETH in fees, it's going to surpass the uint64 limit, causing an integer overflow which could lead to severe consequences.

![](https://cdn.videotap.com/rBscGeCrMNlRHNKG4K02-46.8.png)

Therefore, it is crucial to be mindful of the ranges of each integer type to avoid such issues. Regularly auditing and checking your code for such issues, can save you countless hours of debugging and problem-solving down the road.

In summary, It's all about having the foresight to see potential problems and nip them in the bud.

## Wrapping Up

Solidity, the development language for Ethereum, is consistently evolving. By prioritising keeping our Solidity version up to date and diligently selecting our integer types, we can ensure that our code remains secure, optimized and bug-free.

Just keep in mind, while this blog focusses on two main aspects of optimizing solidity code, it's just the tip of the iceberg. Solidity best practices cover a wide range of topics, and this blog should be considered as a drop in an ocean of knowledge that one should strive to acquire to become an expert solidity developer.

But for now, my dear reader, let's get comfortable with this information and slowly find our path to expertise. Until our next blog post, take care and happy coding!
