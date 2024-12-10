## Creating a Moccasin project

Now that we have Moccasin installed, we can start creating our project. We'll be working in our `mox-cu` folder.

Let's start by creating a new folder called `mox-favorites-cu` with the following command:

```bash
mkdir mox-favorites-cu
```

Next, we'll open this new folder in VS Code. 

```bash
code mox-favorites-cu/
```

If you don't have the `code` command, you can also do `File > Open Folder`.

Moccasin comes with a built-in tool to help us create new projects. We can use the `mox init` command to do so.

```bash
mox init
```

Before running this command, we can use the `--help` flag to see what it will do.

```bash
mox init --help
```

This will print out a list of options and the directory structure that the project will have. We'll be using VS Code and want to include a `pyproject.toml` file, so we can run the following command to initialize the project:

```bash
mox init --vscode --pyproject
```

The terminal will output a message confirming the project was initialized.

Let's take a look at the files and folders that have been created:

- `.vscode` : This folder contains settings for VS Code, which we'll explore later.
- `lib` : This is where we'll install any packages or dependencies our project requires.
- `script` : This folder is where we'll store any deploy scripts. In this case, we have a script called `deploy.py` which deploys the `Counter` contract.
- `src` : This is where we'll store our Vyper contracts. Moccasin has included a simple `Counter.vy` contract for us to start with.
- `tests` : This folder will house any tests related to our contracts. Currently, it has a few simple dummy tests. 
- `pytest_cache` : This folder stores information from the pytest testing framework to improve test run times.
- `coveragerc` : This file is used for code coverage reporting and we'll discuss it in detail later.
- `.gitattributes` and `.gitignore` : These files are used to configure Git behavior and specify files or folders that shouldn't be tracked by Git.
- `mocassin.toml` : This file configures Moccasin settings. It has information like network URLs and chain IDs.
- `pyproject.toml` : This file contains information about our Python project, including dependencies and project metadata.
- `README.md` : This file provides a brief overview of the project, including instructions for getting started.

We can start by creating a new file called `favorites.vy` in the `src` folder. We can do this by right-clicking within the `src` folder, selecting `New File`, and entering the name `favorites.vy`. 

We'll then copy and paste the code for the `favorites.vy` contract from the GitHub repository for this course. 

Let's go through the folders and files in detail:

- `.vscode` : This folder contains the `settings.json` file, which is only relevant to users of VS Code. It helps with syntax highlighting and other editor features.
- `lib` : We'll use this folder to install dependencies.
- `script` : This folder contains the deploy script `deploy.py` which deploys the `Counter` contract. It uses the `deploy` keyword to deploy the contract, followed by calling the `increment` function to check the starting and ending count.
- `src` : This folder will contain all our Vyper contracts. Currently, we have a `Counter.vy` contract and we've just added the `favorites.vy` contract, which we'll use throughout this course. 
- `tests` : This folder is used to store tests. We can run the tests with the `mox test` command.
- `pytest_cache` : This folder is used by pytest to store information that makes tests run faster.
- `coveragerc` : This file is used to configure coverage reporting. 
- `.gitattributes` and `.gitignore` : These files are used to manage Git behavior.
- `mocassin.toml` : This file stores Moccasin settings. 
- `pyproject.toml` : This file contains project information. 
- `README.md` : This file provides a brief overview of the project and instructions for getting started.


