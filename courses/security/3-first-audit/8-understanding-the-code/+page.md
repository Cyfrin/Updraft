---
title: Recon - Understanding the Code
---

_Follow along with this video:_



---

## How Tincho Cracked the Code

Tincho, a prominent security researcher, shared an interesting method to hack through an encrypted code: walking through the code line-by-line. This method might seem like he was looking for bugs/vulnerabilities in the code. But actually, he was just trying to understand the codebase better. In essence, understanding the functionalities and architecture of the code forms the first and most important part of code inspection.

So let's take it from the top, just like Tincho did…

## Step 1: Understanding What the Codebase Is Supposed to Do

Before you start scrutinizing the code, it's crucial to comprehend the purpose of the code. In our case, the codebase allows users to store their passwords securely.

## Step 2: Scanning the Code from the Top

After gaining a fundamental understanding, you can start going through the code. You can jump directly to the main functionality. However, to keep things simple, let's just start right from the top and start working our way down.

On observing the code carefully, we find that the Solidity compiler language version is 0.8.18. Although this is not the most recent version (quite normal), trying to understand if this was the correct compiler version can be a query. So, mark it with something like `Q: Is this the correct compiler version?`

## Step 3: Taking Notes

While walking through the code, you can jot down some points in a `Notes.md` file. These could include your thoughts, attack vectors, or even a summary of the project. You can also mark queries that you can come back to later.

> **Bonus Tip**: Some security researchers, like Zero Kage from the Cypher team, even print the source code and use different color highlighters to visualize the codebase better.

## Step 4: Observing the Code Structure and Naming Convention

On further deep-diving, we find some well-followed conventions, state variables like `sowner` and `s_password`, and an event `set_new_password`. The good convention use adds points to the code strength, while a poorly followed convention may raise some questions.

## Step 5: Reading the Documentation

Next, we find some extensive documentation written as comments. This documentation gives additional context about the functionality of the protocol.

## Step 6: Identifying Functions

We can see a function here where only the owner can set a new password. Gaining clarity about this function is vital, as this is part of the main functionality of the code. And in the case of poor documentation, it can be helpful to ask the protocol directly about a function.

For example, if the function isn't clear, note down the question like `Q: What does this function do?`

It's paramount to get a context about the code base, and these questions, comments, and annotations will help you achieve that.

## Final Word

Though this might seem like a simple walkthrough, it’s a process that will help you understand the core functioning of any codebase. Remember, the idea is not to hunt for bugs in the first go, but to understand what the code does. As you get to know the code more, you’ll identify its bugs and vulnerabilities. Happy coding!
