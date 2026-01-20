---
title: Tooling - Solidity Visual Developer
---

_Follow along with this video:_

---

### Tools in our Belt

We've already got a handful of tools at our disposal.

- `Slither`
- `Aderyn`
- `CLOC`

We also went over `Solidity Metrics` earlier, but let's take another look as `Puppy Raffle` is going to afford us some more interesting insight into the power of this tool.

> Remember: you can right-click your `src` folder in the `Puppy Raffle` workspace and select `Solidity: Metrics` from the context menu to run the tool on that directory.

### Solidity Metrics Insights

Scrolling to the bottom of the `Solidity: Metrics` report, take a look at the `Inheritance Graph`

![tooling-svd1](/security-section-4/6-tooling-svd/tooling-svd1.png)

From this illustration we can see that the contract `PuppyRaffle` is of types `ERC721` and `Ownable`.

A little further down we see a `Call Graph`

![tooling-svd2](/security-section-4/6-tooling-svd/tooling-svd2.png)

This provides us a clear reference of which functions are being called by which other functions!

And finally `Solidity: Metrics` gives us a `Contract Summary`

![tooling-svd3](/security-section-4/6-tooling-svd/tooling-svd3.png)

This is incredibly valuable. It provides is a clear breakdown of `Internal` vs `External functions` as well as identifies which functions are `payable` and can `modify state`!

### Solidity Visual Developer

There's another tool I'll briefly mention - some developers swear by it. It's the extension [**Solidity Visual Developer**](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor) for VS Code.

In addition to providing very similar reporting as Solidity Metrics, the inheritance graph is interactive and it provides syntax highlighting in your code based on variable types.

![tooling-svd4](/security-section-4/6-tooling-svd/tooling-svd4.png)

Check it out if you feel it would be useful for adding some clarity to your development and security reviews!

Next we're going to dive deeper into the exciting world of static analysis tools. We'll take a closer look at the Solidity Metrics tool, which we introduced before, and also explore another tool known as Solidity Visual Developer.

### Wrap Up

Now that we've a firm grasp of our tooling options available, let's get started on this `Puppy Raffle` review. We're onto `Recon` - let's start with the documentation.
