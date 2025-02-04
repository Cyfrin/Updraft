## Project Setup

We're going to get started by building a project from scratch. The first thing we need to do is to create a directory.

```bash
mkdir mox-algorithmic-trading-cu
```

Next we want to open this directory with Visual Studio Code:

```bash
code mox-algorithmic-trading-cu
```

We also need to initialize our project. We are going to be using a Python project.

```bash
mox init --vscode --pyproject
```

Now we are ready to remove some of the files that were created when we initialized our project.

```bash
rm -rf script/deploy.py
```

Now, we will make a small change to our `README.md` file. The goal of this project is to interact with Aave, Uniswap, and to rebalance our portfolio.

```markdown
# What do we want to do?

1. Deposit into Aave
2. Withdraw from Aave
3. Trade tokens through Uniswap 
```

We will cover all of these tasks in greater detail as we go along. 
