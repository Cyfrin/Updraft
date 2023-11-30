---
title: Foundry Setup
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/v6Srr9C1HRQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Creating a Simple Storage Project

Today, we'll dive into setting up a simple storage project, but with a twist, we'll be doing this in a professional environment, following the industry's big protocols as exemplified by billion-dollar players like uniswap, Aave, and curve.

A key factor that makes this worth your while is that we'll be using Foundry - a popular tool among auditors - making this a goldmine for budding security researchers. So brace up as we journey into the masterclass prepared with the same toolbox that industry champions rely upon!

## Getting Started: Setting up The Project

In setting up your environment, you would need to create a new folder. Simply follow these commands:

```bash
    mkdir foundry-simple-storage-f23
    cd foundry-simple-storage-f23
```

You might observe some differences in our terminal windows, reflecting our unique paths. For this tutorial, an alias, `video_shell`, which only displays the folder path, will be used.

<img src="/foundry/7-foundry-setup/setup1.png" style="width: 100%; height: auto;">

)Still within the folder, typing in `code` followed by a period  (`.`) should lead to a new Visual Studio code. If this doesn't happen, simply navigate to `File` &gt;&gt; `Open Folder` and select your preferred folder, the selected folder will open in a new Visual Studio code.

Now, your terminal should show that we are indeed in our project folder:

<img src="/foundry/7-foundry-setup/setup2.png" style="width: 100%; height: auto;">

## Terminal Tips and Tricks

Everyone's terminal will look slightly different. For this post, we'll be using several Bash (Linux Terminal) commands like `mkdir` and `cd`. If you're unfamiliar with these, I highly recommend checking out [this freeCodeCamp lesson](https://www.youtube.com/watch?v=oxuRxtrO2Ag).

Alternatively, you could harness the power of Artificial Intelligence (AI). AI chatbots like GPT and others are familiar with Bash and Linux commands. They can provide assistance when you encounter challenges.

<img src="/foundry/7-foundry-setup/setup3.png" style="width: 100%; height: auto;">

## Setting Up Local Environments

Moving to the next phase, we'll set up our local environments. This is similar to working with Remix VM. Consistent with the project's title, we'll use `Foundry` to code our simple storage project. This will make our code interactions and deployments more professional.

We begin by checking the content of our Explorer side bar. You can create a file here by using the `touch` command. This will make the file appear on the left hand side of the explorer. Next, we delete unneeded files with the `rm` command.

## Using Foundry for Project Initialization

We will start the project by using Foundry to create a new basic project. Foundry's documentation offers a step-by-step guide on creating a new project. However, in our case, we run `forge init`. This should create several folders.

In case an error pops up because the directory is not empty, we run `forge init --force.` to override this.

```bash
forge init --force.
```

This will override any error related to Git. Be sure to configure your username and email if you encounter errors related to Git configuration.

```bash
    git config --global user.email "your_email"
    git config --global user.name "your_username"
    forge init
```

## Walk-through of Initialized Folders

Our folders are now full and we have an initial project ready! The folders include:

1. `.gitHub` workflows file
2. `lib`
3. `.script` - contains a file we delete for now
4. `src` - where we put our smart contracts
5. `test` - not needed for now
6. `.gitignore` - files not meant for GitHub
7. `foundry.toml` - gives configuration parameters for Foundry

The Source (src) is the main directory that we'll focus on. It's where we'll store the main contracts, whereas Test will hold the files to test the main contracts, and Script will host files to interact with our SRC contracts.

Lastly, we'll add a simple storage code into the SRC or Source folder. We can copy all the code from this [Github repository](https://github.com/Cyfrin/foundry-simple-storage-f23/blob/main/src/SimpleStorage.sol), select the code base, then paste it into `src` as `SimpleStorage.sol` file. Hit save, and we're done!

Congratulations, you're now ready to build bigger and better with Foundry! Stay tuned for more exciting tutorials.
