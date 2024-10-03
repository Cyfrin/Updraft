---
title: Setup
---

_Follow along the course with this video._

---

### In this lesson, we are going to learn:

1. How to quickly clone a repo in our terminal.
2. Use Live Server in VS Code to see our changes 'live' as we code.

### Key Concepts

1. `git clone` - command used to make a copy of a repository on your local machine.
2. `live server` - a VS Code extension that opens in your browser and automatically updates with your code.

### Overview

Let's look at how what we've built interacts with a wallet. Remember, you can find all the code for this lesson [**here**](https://github.com/Cyfrin/html-fund-me-cu).

We won't be going over a whole full-stack application here, but the repo above contains a raw front-end you can try to replicate if you would like to challenge yourself.

> Additional front-end content will be available on Updraft in the near future!

Our focus will be on uncovering what's happening 'under the hood', allowing you to understand exactly what's going on when you interact with a website sending a transaction to the blockchain.

### Setup

Normally I would walk you through the steps to get setup, but I'm not going to do that this time.

Now that you've installed Git and created a GitHub in previous lessons, we're going to clone an existing repo to have something to start with rather than starting from scratch.

**Step 1:** In our terminal use the command:

```bash
git clone https://github.com/Cyfrin/html-fund-me-cu.git
```

**Step 2:** Now we can open this in a new instance of VS Code with:

```bash
code html-fund-me-cu
```

In order to spin up a local front end, we're going to use an extension called [**Live Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Once installed you can simply press the `Go Live` button in the bottom right.

::image{src='/html-fundme/1-setup/live-server.png' style='width: 75%; height: auto;'}

Once installed, you can simply press the 'Go Live' button in the bottom right of your VS Code.

::image{src='/html-fundme/1-setup/html-fund-me1.png' style='width: 75%; height: auto;'}

And with that you should have this simple front end open in a browser.

::image{src='/html-fundme/1-setup/html-fund-me2.png' style='width: 75%; height: auto;'}

:br
We'll be using this to glean a deeper understanding of what exactly is happening when we're interacting with websites in the coming lessons.

### Questions to Consider

Use the following to check your comprehension of the lesson.

1. How can I clone an existing repo on my local device?
2. How can I view changes to my front end code as I develop them?
3. How can these tools help me as a developer/auditor?

Happy learning! 🚀👩‍💻
