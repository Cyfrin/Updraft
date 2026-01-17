---
title: Mishandling of ETH - Case Study
---

_Follow along with this video:_

---

### Case Study: Sushi Swap

In this lesson we'll be briefly detailing how the `Mishandling of ETH` vulnerability lead to catastrophic consequences in the case of Sushi Swap.

One of the best things you can do to grow your skills as a security researcher is to read case studies and familiarize yourself with hacks. We've included, in the [**course repo**](https://github.com/Cyfrin/security-and-auditing-full-course-s23), a link to [**an article**](https://samczsun.com/two-rights-might-make-a-wrong/) illustrating the case study we'll be going over briefly.

Now, the situation with Sushi Swap is different from what we've seen in other example, because again - `Mishandling of Eth` is a very broad category. Ultimately the issue was with this function:

```js
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

In the simplest terms, this function allows a user to compile multiple calls into a single transaction - sounds useful.

The oversight was in the use of `delegatecall`. When implementing delegatecall, msg.sender _and_ msg.value are persistent. This meant that a single value sent for one call in this function could be used for multiple calls!

> **For example:** If I were to call a function which cost 1 ETH, to call it 100 times, it should cost 100 ETH. In the case of the `batch` function, a user would be able to call the function 100 times, for only 1 ETH!

### Wrap Up

I highly encourage you to read through the provided article and familiarize yourself with the Sushi Swap case. Vulnerabilities when handling ETH without care come in many shapes and sizes. We've gone through a few examples in the last few lessons that I hope instill an understanding of the care that should be taken when dealing with funds.

In the next lesson, we'll continue our Puppy Raffle Recon!
