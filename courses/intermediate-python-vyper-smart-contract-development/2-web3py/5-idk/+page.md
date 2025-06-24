## Installing Vyper into an Isolated Environment

We've just installed Vyper using the `uv tool install` command. This might seem a little different if you're used to installing packages using the Python environment.

Traditionally, you might be used to running commands like:

```bash
python3 -m pip install vyper
```

or even just:

```bash
pip install vyper
```

These commands would install Vyper directly into your active Python environment. However, the `uv tool install` command installs Vyper into its own isolated environment.

We have a global Python environment, which typically holds the default Python version and any globally installed packages.

We also have a virtual environment, which is essentially a self-contained Python environment. This is where we installed Vyper using `uv tool install`.

If we were to install Vyper into the global Python environment, we might run into issues if we want to use different package versions. It would then be difficult to switch between the two environments without affecting the other.

To show you how isolated environments work, we can run a few commands. We'll start by creating a virtual environment using Python:

```bash
python3.11 -m venv .venv
```

Then, we activate this virtual environment using:

```bash
source .venv/bin/activate
```

We can check our current environment using:

```bash
which vyper
```

We see that it points to the global Python environment, even though we're in the virtual environment.

Now, let's deactivate the virtual environment:

```bash
deactivate
```

And check the `which` command again:

```bash
which vyper
```

We see that Vyper is not found, because we deactivated the virtual environment.

Let's run the `uv tool` command again:

```bash
uv tool install vyper
```

We see the output, and that Vyper is installed into its isolated environment.

Now, if we run the `which` command again:

```bash
which vyper
```

We see that Vyper is now installed in the virtual environment.

The main advantage of using the `uv tool` to install Vyper is that it creates a completely isolated environment. We can't affect the global Python environment, and vice versa. This is important because Vyper, being a compiler, is extremely sensitive to different package versions.

If we were to use different package versions, we could run into issues. It's best practice to install Vyper using the `uv tool` to avoid any conflicts.

We're also going to talk about VS Code and how it interacts with virtual environments.

We will have an environment, which is typically the global environment, and another environment which is the isolated environment. We can switch between the two environments.

We can use our AI to ask questions about the difference between a Python virtual environment and when we're not in a virtual environment.

That's it for our lesson on installing Vyper into an isolated environment using the `uv tool`. Remember, using isolated environments is the best way to avoid conflicts when working with Vyper. Keep practicing and don't hesitate to ask your AI buddies or the community any questions you have.
