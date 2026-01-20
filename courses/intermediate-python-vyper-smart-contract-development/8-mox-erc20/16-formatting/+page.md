## Formatting: Vyper & Python

We're going to go into fuzz testing in just a minute, but first we'll take a look at some ways to format our Vyper and Python code.

Our code looks like this:

```python
script
from moccasin.boa.tools import VyperContract
from eth_utils import to_wei
INITIAL_SUPPLY = to_wei(1000, "ether")
from contracts import snek_token
def deploy() -> VyperContract:
    snek_contract = snek_token.deploy(INITIAL_SUPPLY)
    print(f"Deployed to {snek_contract.address}")
    return snek_contract
def moccasin_main() -> VyperContract:
    return deploy()
```

This code is not formatted well, with imports in a strange order. We can either manually change this code, or we can use a tool.

Let's go ahead and install the **ruff** formatter. We can do this through UV's command palette by typing "format document" and hitting enter.

We can also format our code in the terminal using the following command:

```bash
uv run ruff check --select I--fix
```

This will automatically fix a lot of our imports.

What about Vyper? We can also format our Vyper code using a tool called **mamushi**. This tool can be installed using the following command:

```bash
uv add mamushi
```

After installing mamushi, we can run the following command to format our contracts folder:

```bash
uv run mamushi contracts/
```

This will reformat our entire `snek_token.vy` file to be much nicer looking.
