## Introduction to web3.py

We're going to learn how to deploy a contract to the Ethereum blockchain by using the web3.py library. We're going to start by installing web3.py in our UV environment.

```bash
uv add web3
```

We can check to make sure it's installed by running `uv sync` and checking our `pyproject.toml` file for the web3.py dependency.

Next, we'll import web3.py and the Ethereum Tester Provider:

```python
from web3 import Web3
from web3.providers.eth_tester import EthereumTesterProvider
```

We'll then initialize a Web3 object by using the Ethereum Tester Provider:

```python
w3 = Web3(EthereumTesterProvider())
```

The Ethereum Tester Provider simulates a local blockchain node, which is useful for development.

Now, let's get our bytecode from the Vyper object. We'll use the `compile_code` function and specify the output format as `bytecode`:

```python
compilation_details = compile_code(favorites_code, output_formats=['bytecode'])
```

We can print out the `compilation_details` to see the results of compilation, including the byte code.

```python
print(compilation_details)
```

Finally, we can create a contract instance by using the bytecode from the `compilation_details` object.

```python
favorites_contract = w3.eth.contract(bytecode=compilation_details['bytecode'])
```

We'll explore how to interact with the deployed contract in later lessons.
