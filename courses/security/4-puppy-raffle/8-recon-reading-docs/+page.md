---
title: Recon - Reading Docs
---

_Follow along with this video:_

---

### Context from Documentation

Ok, we've scoped things out. Let's start with step 1 of `The Tincho` - Reading the documentation.

What we've been provided is a little sparse - but read through the README of [**Puppy Raffle**](https://github.com/Cyfrin/4-puppy-raffle-audit).

<details>
<summary>About Puppy Raffle</summary>

<p align="center">
![reading-docs1](/security-section-4/7-recon-reading-docs/reading-docs1.svg)
:br

# Puppy Raffle

This project is to enter a raffle to win a cute dog NFT. The protocol should do the following:

1. Call the `enterRaffle` function with the following parameters:
   1. `address[] participants`: A list of addresses that enter. You can use this to enter yourself multiple times, or yourself and a group of your friends.
2. Duplicate addresses are not allowed
3. Users are allowed to get a refund of their ticket & `value` if they call the `refund` function
4. Every X seconds, the raffle will be able to draw a winner and be minted a random puppy
5. The owner of the protocol will set a feeAddress to take a cut of the `value`, and the rest of the funds will be sent to the winner of the puppy.

</details>


Above we see a pretty clear description of the protocol and it's intended functionality. What I like to do is open a `notes.md` file in my project and summarize things in my own words.

```
## About

> The project allows users to enter a raffle to win a dog NFT.
```

Use this notes file to record your thoughts as you go, it'll make summarizing things for our report much easier later.

Let's take a look at some of the code that powers the expected functionality in the next lesson.
