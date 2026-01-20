## Project Setup

We are going to learn about Web3 development and the tools we can use to interact with the blockchain. First, we need to get our development environment set up. We need to have Visual Studio Code installed along with the code command.

We'll be working with a folder called `web3py-favorites-cu` and inside this folder, we'll be using the `uv` tool to manage our Python versioning.

Let's create a new folder called `web3py-favorites-cu` using the `mkdir` command.

```bash
mkdir web3py-favorites-cu
```

Once we've created the folder, let's navigate into it. We'll use the command `cd` and follow this with the name of the folder.

```bash
cd web3py-favorites-cu
```

If you are not already using `uv` we need to initialize a new Python project using `uv`. To do this, we use the `uv init` command.

```bash
uv init
```

We'll be using `uv` throughout the course. The `uv` tool allows us to manage Python versions, dependencies, and virtual environments. You can find more information on the `uv` tool at the following link: [https://docs.astral.sh/uv/](https://docs.astral.sh/uv/)

The `uv init` command creates a number of files in the folder, including `pyproject.toml`, `hello.py`, `.gitignore`, and README.md`.

We'll be able to see the files created in the Explorer section of VS Code.

Our next step is to write a high level overview in the `README.md` file of what we'll be accomplishing in this project.

```python
# Web3 Favorites CU

What does this project do?
What are we going to learn?

1. Deploy our Vyper contract from raw python
2. Encrypt our private keys locally, and use them to sign transactions
3. This is going to be reproducible by other engineers using uv with python

1. How to deploy a contract from python
2. What is a transaction comprised of?
3. What is json keystore?
4. How can I safely store my private key?

```

We will learn how to work with `uv`, along with all the other files we initialized in this project. We'll go through each of these items in a more detailed manner in future sections.
