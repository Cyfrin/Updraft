---
title: Foundry Install
---

_Follow along the course with this video._



---

Welcome to this handy guide on installing and operating Foundry, a versatile tool that will add a new level of command-line ease to your developer journey. Whether you're running Windows, Linux or MacOS, we've got you covered with instructions and tips. So sit back, grab a cup of coffee, and let's dive in.

## Prepping your Terminal

First things first. Before we dive into installing Foundry, make sure you have your terminal set up correctly.

If you are using Windows, you should see something like `WSL` or `Ubuntu`. Once you have your terminal environment ready, it’s time for some quick tips to help streamline your workflow.

### Keeping your Terminal Clutter-free

When commands pile up in your terminal, things can get a little overwhelming. Clear it up by simply typing `clear` and hitting `Enter`. Alternatively, use `Command K` if you're on a Mac or `Control K` if you're on Linux or Windows.

**Pro tip:** This is one of my favorite keyboard shortcuts that I use all the time.

### Understanding the Trash Can and the X

::image{src='/foundry/5-foundryinstall/foundryinstall1.png' style='width: 100%; height: auto;'}

The trash can and the X buttons in your terminal perform distinct functions. Hitting `X` simply hides your terminal but retains all the previous lines of code. On the other hand, trashing it essentially deletes whatever is running in it. To open up a clean terminal, hit the trash can and then pull it back using `Toggle` or `Terminal > New Terminal`.

## Installing Foundry

With our terminal set and some tips up our sleeve, let's progress to installing Foundry. Navigate to the [Foundry website](https://book.getfoundry.sh/getting-started/installation) and from the installation tab, fetch the command to install Foundry.

The command would look something like this:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Hit `Enter` after pasting this in your terminal.

**Note:** You must have Internet access for this to work as it's downloading Foundry from their official website.

## Verifying Your Installation

After running the `curl` command, an output will appear at the bottom of your terminal indicating the detected shell and the fact that Foundry has been added to your `Path`.

For instance, the output can be something like this:

```bash
Detected your preferred shell is bashrc and added Foundry to Path run:source /home/user/.bashrcStart
a new terminal session to use Foundry
```

Now, simply type `foundryup` and `Enter` to install and update Foundry to the latest version. Whenever you want to install an update for Foundry, simply run `foundryup` again.

This will install four components: forge, cast, anvil, and chisel. To confirm the successful installation, run `forge --version`. You should get an output indicating the Forge version as shown below.

```bash
Forge version x.x.x
```

Now, here's something to remember: when you hit the trash can in the top right, it literally 'removes' the terminal. The X button, in contrast, simply hides it.

### Is Foundry Up Not Running?

Don't panic if this command doesn't run. You might have an issue with your path, and you might need to add Foundry to your path. In case you run into this issue, check lesson 6 of the GitHub repo associated with this course. If no debugging tips are available there, feel free to start a discussion on the course's GitHub repo. Before doing so, make sure to check if a similar discussion already exists.

Try typing `forge --version` into your terminal. Have you received an unwelcome output saying `Forge command found`? This implies that you have to rerun the `source` command that Foundry offered during installation.

Note: Most of the time the `bashrc` file gets loaded automatically. However, if this doesn't apply to your setup, the following lines can add the required command to the end of your `Bash profile`. This will ensure that your `bashrc` file loads by default.

```bash
cd ~
echo 'source /home/user/.bashrc' >> ~/.bash_profile
```

> this depends on your operating system, please check foundry docs to see detailed instructions.

## Wrapping Up

And there we have it! Congratulations on installing Foundry and prepping your terminal to work seamlessly with it. Remember, hitting snags during installation is normal, especially if you're new to this. Don't hesitate to engage with the course community via GitHub if you run into issues.

::image{src='/foundry/5-foundryinstall/foundryinstall2.png' style='width: 100%; height: auto;'}

Here's to many hassle-free coding sessions with Foundry!
