---
title: Manual Verification
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/JwYz5kj4FdI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Verifying Your Ethereum Smart Contracts: A Step-by-Step Guide

Ethereum smart contracts are powerful tools for decentralized applications. However, they can seem a bit intimidating when viewed in their raw form, especially for beginners. Today, we're exploring how to navigate these waters by inspecting and verifying smart contracts on Etherscan, a blockchain explorer.

When working with Ethereum smart contracts, you'll often come across what seems like an overwhelming bunch of bytecode when examining the contract on Etherscan. Let's fix that.

## The Raw Contract: A Bytecode Jungle

<img src="/foundry/20-verification/verification1.png" style="width: 100%; height: auto;">

As you dive into your smart contract on Etherscan, you'll be greeted by the contract's bytecode. This usually appears as a jumbled mass of non-readable code, making it challenging to understand the contractual logic contained within.

## Verifying Your Smart Contract: The Hard Way

Here's a step you can take to make the contract more readable; verify the contract. I'll show the hard and manual way first, and then follow up with a simpler, more streamlined method.

To manually verify a contract on Etherscan or other Block Explorers, follow these steps:

1. Navigate to the 'Verify' option.
2. Select 'Solidity' as the contract's language.
3. Since this is a single file contract, choose 'Single File'.
4. The compiler version we're using for this demonstration is 0.8.19, and our open-source license is MIT. Fill these details accordingly.
5. Click 'Continue'.

Now, you'll need to copy the entire contract from your 'SimpleStorage.sol' file, paste it in the appropriate dialogue box, select 'Optimization' as 'Yes', and then verify that you're not a robot.

<img src="/foundry/20-verification/verification2.png" style="width: 100%; height: auto;">

Ensure that you leave the boxes for constructor ARGs, contract library addresses, and miscellaneous settings blank. Once done, click 'Verify and Publish'.

At this stage, the verification process can get a little tricky. But if done correctly, if you click on your contract address, navigate to 'Contract', and then scroll down, the previously unapproachable code is now readable in Etherscan.

Besides making the code legible, this process also provides access to the 'Read' and 'Write' contract buttons, and you can interact with your contract directly from Etherscan or elsewhere.

<img src="/foundry/20-verification/verification3.png" style="width: 100%; height: auto;">

## Verifying Your Smart Contract: The Easy Way

The manual verification method outlined above can be full of pitfalls. That’s why it's not a recommended method. Instead, I encourage you to conduct programmatic verification of your contracts which removes these barriers - a method I'll be teaching in the near future.

In the end, verifying your contracts makes working with Ethereum smart contracts significantly more manageable and understandable. Whether you’re a veteran Ethereum developer or a newcomer to the space, having a clear understanding of your contracts is essential for building secure, efficient, and effective decentralized applications.

Remember, Ethereum smart contracts, with their powerful capabilities, form the beating heart of any DApp. So it's critical to learn how to navigate, inspect, and verify your contracts to ensure they are error-free and function as intended. Happy coding!
