---
title: Recon - Reading Docs
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Puppy Raffle Audit: Understanding and Solving the Challenge

In this blog post, we venture into the realms of Non-Fungible Tokens (NFTs), exploring an intriguing and adorable project that revolves around the theme of puppies. We’re diving into the core branch of the **Puppy Raffle Audit**. This project enables participants to enter a raffle to win a cute dog NFT. Let's break down the documentation and delve into some critical aspects of the raffle protocol.

![](https://cdn.videotap.com/8KjNYsUhdCgFwmWSjMzk-4.61.png)## About The Puppy Raffle Audit Project

The Puppy Raffle Audit project essentially marries the worlds of cute dogs and blockchain technology. Participants can enter a raffle with the hope of getting minted a unique, adorable puppy NFT. However, there's more to this raffle game. By understanding the protocol and the functionalities adhered to it, one can exploit loopholes to increase winning prospects.

Through an **About** section on the project, the protocol functionality can be summarized as follows:

- Participants are required to call the `enter raffle` function using an array of addresses - these refer to the list of participants entering the raffle. This could include just you, or a mix of you and your pals. Do bear in mind though, any duplicate addresses will be rejected.
- Once entered, users are permitted to ask for a refund of their ticket value by invoking the `refund function`.
- Every X seconds, a random draw is conducted by the raffle protocol, given the existence of a winner, a puppy NFT is minted.
- The protocol owner sets a fee address and receives an cut from the value.

## Diving Into the Project Code

1. Open Puppy Raffle Audit project in your VS code
2. Delete the Adarin output
3. Start creating a `notes MD` file for jotting down your observations

![](https://cdn.videotap.com/QAQwQv1b28oFN8yHiDw4-39.15.png)And voila! You've the documentation of the Puppy Raffle Audit opened right in front of you!

### Keeping Track of Project Details

It's a good habit to jot down relevant project details in your own words, such as what exactly the project does, and what functionalities it offers. This step helps in understanding the project in a better way. Also, exploring the provided functions and how they interact aids in comprehending how they work together to make the protocol function smoothly.

## Quick Start and Coverage Instructions

Once you're done understanding the `docs` and have successfully set up your working environment, take a look at the `quick start stuff` and `coverage` aspects.

`Quick start stuff:` This is meant to aid in getting things started quickly and effectively. It represents an overview of the entire protocol and provides guides on how to start interacting with the project.

`Coverage:` It elaborates the potential reach or target audience of the protocol. In order to comprehend the impact or reach of the project, understanding coverage becomes essential.

### A Peek into the Project's Functionality

Let's look into functions and how they are playing their part in this raffle protocol

The protocol functions are the gears that power this puppy raffle machine. Getting a grasp of how these pieces come together informs us about the underlying functionality of the project.

> "Understanding the project's functionality is just like solving a puzzle. Each piece of information fits in to complete the whole picture."

Do stay tuned for more updates on this adorable, fun project. Happy coding!
