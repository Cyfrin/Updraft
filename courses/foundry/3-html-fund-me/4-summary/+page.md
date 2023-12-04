---
title: Summary
---

_Follow along the course with this video._



---

Hello, there! Today, we had a quick lesson, but it was a vital one as it gives you the real feeling of interacting with websites from a very low level. For those excited about engaging themselves in more complex full-stack work, this post will hopefully whet your appetite.

#### Initiating a Transaction - Making a Connection

A website sends a transaction to your wallet by establishing attachment to the wallet in one way or another. Browser extension injection into your browser is one of the most prevalent methods in use today.

```javascript
window.Ethereum;
```

This line of code signals the browser to confirm the presence of the metamask object, an essential step for browsers interacting with wallets such as `wallet connect`, `ledger`, among other types.

While on the surface all wallets seem different, they all perform the fundamental function of consolidating a connection object with the website, thus enabling the website to transmit transactions to your browser. The process involves hitting "connect" on the website and the wallet confirming the establishment of a successful connection.

<img src="/html-fundme/4-summary/summary1.png" style="width: 100%; height: auto;">

#### Send a Transaction, Keep the Private Key

When it comes to sending a transaction to our wallets, the website first extracts the provider or the RPC URL from MetaMask.

<img src="/html-fundme/4-summary/summary2.png" style="width: 100%; height: auto;">

Through the function signature or function selector, our system helps us verify that the transactions from the website are not counterfeit. Later in our course, we will delve deeper into decoding complex transactions and functions.

<img src="/html-fundme/4-summary/summary3.png" style="width: 100%; height: auto;">

#### Conclusion

That tips off our lesson for today. It was short but dense with necessary knowledge, especially for learners who are passionate about smart contracts. Understanding web interactions and the intricate operations of websites aids in conducting intelligent work and being on the lookout for potential threats.

This was a basic introduction to web interactions, and as we continue digging deeper into topics, such as function selectors and signatures, expect to become more proficient in navigating websites. Now would be a perfect time to digest all that we've discussed. Stay tuned for the next lesson. Catch you later!
