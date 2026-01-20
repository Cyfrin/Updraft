## Telling VS Code what our python environment is

We've been working with our project, and we've run a command:

```bash
uv deploy_favorites.vy
```

VS Code is telling us something important. We get a "yellow squiggly" error that says:

> Import "vyper" could not be resolved PyLance (reportMissingImports)

VS Code is saying "Hey, I'm currently looking for this vyper thing you're talking about, but I don't see it. I don't see this vyper package".

We have the right environment for running our commands because we were able to print out compiled vyper bytecode. So VS Code doesn't know which python environment we're working with.

We need to tell PyLance which python environment we're using:

1. We'll click the button to "Select Interpreter"
2. We'll select the "Recommended" option

The recommended option will probably be our venv. For me, it's my global python environment, but yours will likely be different.

We're going to switch the PyLance's interpreter path to our venv by clicking the venv that we're using. Now, the squiggly line will disappear, and we'll see a nice green color instead.

What's going on? VS Code PyLance linter (or formatter) now knows which python environment we're working with. We're using the python in the venv folder.

The reason we setup every project like this is to avoid clashes between projects. It allows each project to kind of run in its own isolated type of environment.

If you don't like doing this, you can go ahead and install everything in your global environment. I don't recommend doing that because it'll make your life miserable. 

You do whatever you want to do. 
