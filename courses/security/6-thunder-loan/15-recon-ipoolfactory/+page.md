---
title: Recon - Manual Review - IPoolFactory.sol
---

---

### Manual Review - IPoolFactory.sol

After setting our initial context and utilizing our suite of auditing tools, it's time to get our hands dirty with some thorough manual review. Much like our previous auditing process, one viable option available to us is to start from the test suite. Just look at this test coverage, it'll probably be an informational on it's own.

::image{src='/security-section-6/15-recon-ipoolfactory/recon-ipoolfactory3.png' style='width: 100%; height: auto;'}

This time, we're going to dive right into manual review however.

We're also going to be apply The Tincho method a little more seriously this time around.

Run solidity metrics again and let's take another look at what we're working with.

> **Remember:** You can run solidity metrics by right-clicking the `src` folder and selecting `Solidity: Metrics` to generate the report.

::image{src='/security-section-6/15-recon-ipoolfactory/recon-ipoolfactory1.png' style='width: 100%; height: auto;'}

Copy this table into a spreadsheet of your choice, it will allow us to sort and manage our scope more easily through this process, tracking what we've done as we go.

I used Google Sheets and I've set my table up like below. I've only kept the file and complexity columns.

::image{src='/security-section-6/15-recon-ipoolfactory/recon-ipoolfactory2.png' style='width: 100%; height: auto;'}

### The Tincho Method Applied

Alright, we're set up! The Tincho method would have us starting small and working our way up, collecting little wins along the way. So, that' what we're going to do. The first file we'll assess is `IPoolFactory.sol`.

```js
// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

interface IPoolFactory {
    function getPool(address tokenAddress) external view returns (address);
}
```

That's it, that's the whole interface. Talk about starting small.

From our context gathering, we can infer that `PoolFactory` is likely referencing TSwap's `PoolFactory` and this must be an interface for it.

This can be confirmed by checking `PoolFactory` for the `getPool` function, which exists!

Let's make some notes adding our review context to the `IPoolFactory` interface.

> **Note:** Keeping notes in a notes.md file can be a great method to supplement your review and keep track of context, ideas, thoughts and questions. Organize things in a way that makes sense to you!

```js

// @Audit-Explainer: This is the interface for the TSwap PoolFactory.sol contract
// @Audit-Question: Why are we using TSwap?
interface IPoolFactory {
    function getPool(address tokenAddress) external view returns (address);
}
```

I otherwise see no glaring issues here!

Let's check this file off, celebrate our little win and move on to the next one!

::image{src='/security-section-6/15-recon-ipoolfactory/recon-ipoolfactory4.png' style='width: 100%; height: auto;'}
