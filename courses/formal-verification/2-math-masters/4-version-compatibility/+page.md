---
title: Checking version Compatibility
---

---

## Understanding Floating Pragmas

It's fair to acknowledge a point raised in our Darren report: floating pragmas aren't the best practice. However, when it comes to libraries that are meant to be inherited, we've got a bit of leeway.

```solidity
pragma solidity ^0.8.3;
```

In essence, this directive at the top of your Solidity files indicates the compiler version to use. It's crucial, then, to align our code with the correct version to avoid any unexpected behavior.

## The Issue With Custom Errors in Version 0.8.3

![](https://cdn.videotap.com/618/screenshots/l7LtYq5DT4lECYAmIRMA-30.97.png)

Solidity's evolution is constant, with new features and improvements. Nonetheless, version 0.8.3 lacks support for custom errors—a feature that can enhance the clarity of error handling in smart contracts. The realization hits when we attempt to compile a contract that utilizes them.

Upon running our trusty `forge build`, we're met with a compilation failure. The culprit? A custom error present in the code not supported by version 0.8.3. This moment of truth brings us to our first notable audit finding: the mismatch of Solidity versions can lead to significant headaches if not properly managed.

## Rectifying The Compilation Error

How do we turn our fail into a win? It's simple. We remove the custom error, adjust our compiler version, and re-run the build command.

```shell
forge build
```

Success! Our project compiles, and we've navigated past a potential roadblock. This process underlines the importance of meticulous checking and version awareness—lessons worth their weight in virtual gold in our field.

> "Always ensure your Solidity version aligns with the features you use. It's not just good practice; it's crucial for successful compilation."

## The Takeaway for Solid Developers

In the routine of software development, we must never become too comfortable, forgetting to validate the basics like compiler compatibility. Our discussion on version 0.8.3 serves as a reminder that every line, every version number, counts in the pursuit of blockchain excellence.

In conclusion, Solidity versions determine what your code can and cannot do. As auditors and developers, it's our responsibility to wield this knowledge effectively, ensuring that our smart contracts are not only functional but also compatible with the ever-evolving ecosystem of the Ethereum blockchain.

Remember, the devil is in the details, so pay close attention to those version numbers and keep your smart contracts in check!
