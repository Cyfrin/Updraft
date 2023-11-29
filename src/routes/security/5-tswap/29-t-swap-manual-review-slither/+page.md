---
title: T-Swap Manual Review Slither
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Fh4QjDiHhyY?si=JlnX2EGD2sArKuhy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# An In-Depth Guide to Manual Review in Solidity

In this blog post, we'll be taking a deep dive into the process of manual review in Solidity. We'll be using a comprehensive set of tools including Make Slither and Solidity itself to conduct our review.

Before we jump into this, it's vital that we kick start the process by running our review tools.

> _For context, our group has a well-configured Slither that's ready to use, in addition to a Makefile with Make Slither, which also looks pretty good._

### Analyzing Slither's Output

Walking through the console output, we find mentions of potentially uninitialized variables. The Pool Factory, s_pools, and s_tokens are flagged by Slither as never being initialized.

In the lines regarding Pool Factory and useContext functions, there are mentions of methods like `createPool` and `getPool`. It seems like the `S_Pools` and `S_Tokens` data mappings are not getting initialized. Let’s delve deeper into this.

Although these data mappings trigger an error, it's unlikely to be a major issue. The error arises because Slither expects that our `S_Pools` mapping could be empty at some point and we're performing checks on it. However, this behavior is fine and exactly what we want.

The same applies to `S_Tokens`.

> **Key point:** A useful feature of Solidity is that querying a mapping for a non-existent element returns a zero value, not an error.\*

### Identifying Potential Issues

The console output also flags a missing zero check - something that could lead to problems. We're not performing a zero address check in our constructor, which is not ideal.

```javascript
constructor(address _token) public {
    require(_token != address(0));
    token = Token(_token);
}
```

So, an important note in your audit should be the lack of a zero address check in the constructor. Fortunately, Slither has already proven to be quite useful in finding potential issues.

### Dealing with Reentrancy

Towards the end of Slither's report, we're alerted to a potential reentrancy in the `T_SWAP pool swap` function.

![](https://cdn.videotap.com/1Zwcjq5wz3Hy0mGdOPrV-83.14.png)

While this function prompt is green (indicating it's not necessarily a problem), we need to understand the scenario better to evaluate its implication fully. Browsing through contract interactions and function call patterns can help us figure out if this is a legitimate reentrancy issue or a false positive.

Finally, Slither alerts that different versions of Solidity are being used. Not an ideal situation, but not critical either, particularly if the primary working versions are intact. But hey, thanks for the heads-up, Slither.

### Wrapping Up

All things considered, using tools like Slither for a manual review of Solidity code can reveal potential, and sometimes subtle, issues. Leveraging these tools creates a smoother and more efficient analysis process. Stay curious, stay alert, and keep probing. Your diligence will pay off in the form of solid, bug-free, and highly secure code.
