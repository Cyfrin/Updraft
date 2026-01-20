## Installing Python (Windows WSL and Linux users)

We're going to learn how to install Python in this WSL if you're on a Windows machine, or if you're on a Linux machine, just right on your Linux machine. Most sites are going to ask you to go directly to the Python website and select download. The issue with this for those of you on a Windows or a WSL environment is that downloading directly from the website will download this into your Windows operating system. We don't want to do that because we are going to be working in the Linux, the WSL, the Ubuntu operating system. So, we want to download into our Linux operating system.

The same is actually true for any other software application that you want to run in your WSL environment; you're going to have to download it directly from the command line as opposed to downloading from some website with a click of a button.

We'll need to make sure we're in a Linux environment. We can do this by typing `echo $SHELL` in the terminal. If we see a path that looks like `/bin/bash` or `/bin/zsh`, that's a good sign that we're in the right place. If we get an error, we can use an AI chatbot like Claude to help us troubleshoot.

To install a specific version of Python, we'll use a few terminal commands.

First, we'll run `sudo apt-get update`. This command updates our system's package index. Claude, a chatbot, can explain this in more detail.

```bash
sudo apt-get update
```

Next, we'll install a common Linux package by running `sudo apt-get install software-properties-common`.

```bash
sudo apt-get install software-properties-common
```

We'll then add the "deadsnakes" PPA by running `sudo apt-add-repository ppa:deadsnakes/ppa`. This PPA (Personal Package Archive) allows us to access different versions of Python.

```bash
sudo apt-add-repository ppa:deadsnakes/ppa
```

Now, we need to update again to ensure that the PPA is correctly included. We'll run `sudo apt-get update`.

```bash
sudo apt-get update
```

Finally, we'll install a specific version of Python. In this case, we're installing Python 3.11. We'll run `sudo apt-get install python3.11`.

```bash
sudo apt-get install python3.11
```

We can check that Python 3.11 is installed by running `python3.11 --version`.

```bash
python3.11 --version
```

We're going to be moving away from using Python 3.11 in the terminal and instead use the "uv" tool. The "uv" tool will make it easier to switch between different versions of Python.

If you do encounter any issues, remember that Googling, joining the discussions forum, and using AI can be incredibly helpful for troubleshooting.
