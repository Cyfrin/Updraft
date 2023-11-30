---
title: Advanced Deploy Scripts
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/vCnt4Cpjuvc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

When crafting code for our blockchain, we encountered a significant obstacle. Our contract address was frequently hard-coded. This wouldn't ordinarily be an issue; however, our contract address merely existed on Sepolia, while we continued our testing phase on our local chain. In this lesson, we'll tackle this issue while simultaneously moving ahead in our coding project, so brace yourselves for an exciting ride. Let's dive in!

## Writing our Deploy Scripts

Before we tackle our hard-code issue, let's execute an important task that we know is on our to-do list—writing our deploy scripts.

Start by creating a new file named Deployfundme.s.sol. The standalone 'S' signifies the file is a script. Include the same SPDX license identifier, replace MIT with your own, and proceed to declare your contract deploy fund me.

```js
    SPDX-License-Identifier: MIT
    pragma solidity 0.8.18;
    contract DeployFundMe {}
```

We're using Foundry, which means we need to import several lines of code, including the forge std script sol, and since we're deploying FundMe, why not import it from SRCF. Next, to run the script, you'll want to use the function. Revisit lesson six if you're finding this step a bit confusing—the function applies an external function for the VM start broadcast, and a FundMe in lower case equals the new FundMe navigated by a VM stop broadcast.

```javascript
    function run() external{
        vm.startBroadcast();
        new FundMe();
        vm.stopBroadcast();
    }
```

Following the function run prompts the script to run the `DeployFundMe.s.sol`. Encountering a 'VM' keyword error means you need to use the script. Rectifying this error leads to warnings about an unused local variable. In all probability, you do not even require this line. It's alright to remove it altogether and re-run the script.

<img src="/foundry-fund-me/6-advanced-deploy/deploy1.png" style="width: 100%; height: auto;">

## Overcoming Errors and Ensuring Smooth Running

Following these steps should help in successfully running the compiler, with the script showing successful execution. Ensure that you pass an RPC URL if you wish to simulate on-chain transactions.

<img src="/foundry-fund-me/6-advanced-deploy/deploy2.png" style="width: 100%; height: auto;">

The navigation of these steps indicates the importance of problem-solving in the blockchain coding world. In the upcoming blog posts, we will offer solutions on how to navigate hard-coding challenges in your blockchain coding challenges. Stay tuned for more insights!
