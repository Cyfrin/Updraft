---
title: Invariant & Properties Introduction
---



---

# Demystifying Core Invariants in Blockchain Protocols

Diving deep into the world of Blockchain, I thought to explore something fundamental yet intriguing: the concept of **invariants**. Invariants form the bedrock of most blockchain protocols, a feature you will encounter in almost every protocol ranging from ERC 20s to ERC 721s. Understanding this critical element is vital for anyone looking into the inner workings of these protocols.

In this blog, we'll cover invariants thoroughly while also touching on how to inspect them properly. We'll hope to do so by investigating the TSWAP protocol and its core invariant. Create a hot beverage, loosen up, and let’s probe these invariants together!

## What are Protocol Invariants?

Invariants, in blockchain terms, are properties or conditions within a system that remain unaltered regardless of the actions carried out within the system. They are dynamic rules ensuring the system's safety, and they play a pivotal role in designing tokens in blockchain protocols.

For instance, various types of tokens like ERC 20, ERC 721, or ERC 626 have numerous invariants to their names. Each ERC 20 has 20 properties or invariants while an ERC 721 has 19. As you'll discover later in this course, ERC 626 tokens, which we'll cover in the _Vault Guardians_ section, boast of whopping 37 properties.

To get a hang of these properties, you can pay a visit [here](https://blog.trailofbits.com/2023/10/05/introducing-invariant-development-as-a-service/), at the _Trail of Bits repository_. This repository neatly lays out the invariants of an array of tokens.

## TSWAP Protocol and Invariants

Now, let's turn our gaze towards the TSWAP protocol. If you explore the protocol, you'll encounter the gift the developers have graciously provided: the core invariant.

However, it's noteworthy to understand that sometimes developers may not correctly establish the invariant. In such cases, the onus falls on us, the _Security Experts_, to ensure accuracy. While the developers hand you the necessary details, understanding and breaking down the invariants becomes a task of paramount importance.

Unfortunately, many developers do not fully grasp their own created invariants. Bearing this in mind, you might come across instances where you need to discern the invariants by referring to the documentation. Therefore, it's crucial for every developer to understand invariants better or properties.

## Invariants and Fuzz Testing

As we've already laid some groundwork on invariants, let's now head towards a deeper understanding of them by considering fuzz testing.

> “Fuzz testing or fuzzing is a method for discovering coding errors and security loopholes in software, networks, or operating systems by inputting massive amounts of random data to the system in an attempt to make it crash.”

I've brought together a series of fuzz testing videos which we will delve into dipping our toes into the in-depth understanding of invariants and fuzzing.

But before that, if you are an alumnus of the **Foundry Course**, you may already have a basic understanding of fuzzing. Nevertheless, a refresher would surely help as we dig deeper into the concept with a more in-depth pedagogical approach.

In the next phase, we will examine a quick informative video to enhance our understanding of invariants and the varied tactics to evaluate them, with a specific focus on fuzz testing.

Buckle up, recalibrate your focus, and let’s take this enlightening journey on understanding the invariances better. After all, there's no better time to learn something new than right now. Stay curious!
