## Installing Moccasin

We're going to install Moccasin by using the command `uv tool install 'mocassin==0.3.4b1' --prerelease=allow`. This command will install a specific pre-release version of Moccasin, which includes some extra features and quality of life improvements.

We can check if the installation was successful by running the following commands:

```bash
which mox
```

```bash
which moccasin
```

The output of these commands should show the location of the installed executables. If you see the locations, it means the installation was successful.

We can also explore the available commands by running:

```bash
mox --help
```

This will show you a list of all the commands available in Moccasin, including:

* **init**: Initialize a new project.
* **compile**: Compiles the project.
* **test**: Runs all tests in the project.
* **run**: Runs a script with the project's context.
* **deploy**: Deploys a contract named in the config with a deploy script.
* **wallet**: Wallet management utilities.
* **console**: Interacts with the network in a python shell.
* **install**: Installs the project's dependencies.
* **purge**: Purge a given dependency.
* **config**: View the Moccasin configuration.
* **explorer**: Work with block explorers to get data.
* **inspect**: Inspect compiler data of a contract.
* **deployments**: View deployments of the project from your DB.
* **utils**: Helpful utilities - right now it's just the one.

We'll be learning how to use these commands in the upcoming lessons.
