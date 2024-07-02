---
title: Section 1 Recap
---

**Follow along with this video:**

---

### Recap of Section 1

By now, you should have a basic understanding of:

- Smart contract wallets
- Various types of wallets and their trade-offs
- How to choose the right wallet
- How to use a wallet effectively, especially for developers

For developers, the best practice for any protocol is to use a multi-sig wallet. This approach ensures there is no single point of failure. Even if you are the only person on the team, using multiple wallets for ownership roles is much safer. If one wallet gets compromised, you can simply replace it.

### Key Security Practices

One critical point not previously covered: never store all your private keys on the same cloud server, particularly not in plain text. This topic will be explored further in future updates, but the basic rules are:

- **Never store your private key in plain text.**
- **Do not store private keys in insecure places.**

### Exercises

Here are some practical exercises to reinforce what you've learned:

- **Set Up Your Safe:** If you haven't already, visit [Safe](https://safe.global/) and set up your Safe wallet.
- **Review Classic Key Leaks:**
  1. Investigate `.env` file leaks involving private keys.
  2. Research private key leaks on [rekt.news](https://rekt.news/).
  3. Explore the [keepmesafe](https://github.com/Cyfrin/keepmesafe) repository for additional insights.

### Wrap Up

You now have the foundational knowledge to be better equipped in managing wallets and private keys. Stay tuned for more updates, especially regarding cloud-based private key safety.

Goodbye and have fun!

---
