---
title: Yul & Opcodes Introduction
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/pq27L8XrgjI?si=BdTIeNJ5azmvv_wd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# How to Inspect Solidity's Token Factory

Hey there! Ready to check out some code today? Awesome, let's do this. I hope you're as excited as I am. Let's first check our vault. Looking good! Our token also seems perfectly fine. Now, what’s next?

## Token Factory Complexity Score

The next on our list is something with a complexity score of 23. It's the intriguing Solidity contract called `TokenFactory`. Referring to the title, the `TokenFactory` is designed to allow the owner to deploy new ERC20 contracts.

For clarification, a complexity score is a numerical value that represents the complexity of code. The higher the score, the more complex the code is. It’s a great tool for identifying areas in your software that could benefit from refactoring to simplify the code and make it easier to maintain.

`TokenFactory` is intended to be deployed on both an L1 and L2 Ethereum layer. Sounds interesting, right?

Let's dive deeper into this 'Token Factory' contract.

![](https://cdn.videotap.com/N7h8lDL4ZkNHmMUJm92I-16.6.png)

## Analyzing The Token Factory Contract

According to the documentation, the `TokenFactory` allows you to deploy a new ERC20 contract by passing it a symbol and the byte code of the new token. The symbol and byte code represent the identity of the new token that we want to deploy.

A portion of the code that specifically interests me is the assumption that this is going to be an L1 token byte code. Just the thought of this seems a tad scary.

One question pops in my head: "Did they even test this assumption anywhere?"

![](https://cdn.videotap.com/SXAsB2ew8qmWRUaZnRI6-37.94.png)

## Checking The Test Method

Ah! They did. I see that there is a `TokenFactory` test. Now, it’s critical to remember that we are assuming the test is accurate. Although tests can contain errors too, they give us a good sense of how the software behaves under certain conditions.

While the complexity score was discomforting and the code adherence was quite scary to me, the presence of this test somehow eases the discomfort.

However, there's a "Q" marked on the code here which means "Query". It marks a place where the reader has questions or doubts about the code. In this case, it might be fine, but it begs the question - "Should this query be left out of scope?"

To be blunt, there just seems to be some risky business here.

## An Auditor’s Perspective

“Are you sure you should leave this out of scope?”, I find myself asking. Even though the guidelines say it's okay to exclude this in a competitive audit, in a private audit, I would still strongly recommend addressing this.

> "You should really secure this code. There might be better ways to implement it."

Remember, it's always crucial to double-check everything in your code, especially when it comes to security. Don't take things at face value.

One of the points that catch my attention is that it doesn't seem efficient. The byte code is stored in memory rather than in call data, which is less gas efficient. Maybe it would be better to refactor the token factory.

![](https://cdn.videotap.com/DwK3ACMPJE6lTsWulD7x-71.14.png)

## Final Thoughts

Does it all seem a bit scary? Absolutely. But keep in mind that it could also be an excellent opportunity to improve the code. The best code isn't always the most complex one, but the most secure and efficient.

The challenging but fun part is figuring out the best way to do this. It’s a never-ending journey of learning and discovery. So, let's learn and discover together!

Happy coding!
