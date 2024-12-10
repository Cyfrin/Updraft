## Getting ABIs from an Explorer

We can use the Mox explorer functionality to retrieve ABIs. Mox has a built-in explorer functionality. If we type:

```bash
mox explorer
```

we'll get a list of commands we can run. As of now, the only explorer supported is Etherscan. We can fetch ABIs from Etherscan and save them locally. 

In our `mocassin.toml` file, at the top of our `project` field, we can assign ABIs to our contracts. For example:

```toml
[project]
save_abi_path = "abis"
```

We'll make a new folder called `abis`:

```bash
mkdir abis
```

Then, we can get the ABI for WETH using the following command:

```bash
mox explorer get 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 --save --name weth
```

Moccasin will default to Etherscan and retrieve the ABI for WETH, saving it as `weth.json` in the `abis` folder.

We can then assign that ABI to the WETH contract. In our `mocassin.toml` file, in the `networks.eth-forked.contracts` field, we can add the following:

```toml
weth = { abi = "abis/weth.json" }
```

We can then call functions on the WETH contract. 

We can also give ourselves a starting WETH balance in our `setup_script.py` file. 

First, we'll define a variable:

```python
STARTING_WETH_BALANCE = int(1e18)
```

Next, we'll define a function called `add_token_balance` that we can use to give ourselves a starting balance of a token, in this case WETH: 

```python
def add_token_balance(usdc, weth, active_network):
    print(f"Starting balance of WETH: {weth.balance_of(boa.env.eoa)}")
    weth.deposit(value=STARTING_WETH_BALANCE)
    print(f"Ending balance of WETH: {weth.balance_of(boa.env.eoa)}")
```

This will mint us some fake WETH. 

We can then call this function in our `setup_script` function:

```python
def setup_script() -> Tuple[ABIContract, ABIContract, ABIContract, ABIContract]:
    print("Starting setup script...")
    usdc = active_network.manifest(named="usdc")
    weth = active_network.manifest(named="weth")
    if active_network.is_local() or active_network.forked():
        add_token_balance(usdc, weth, active_network)
```

Finally, we'll call `setup_script` in our `mocassin_main` function:

```python
def mocassin_main():
    setup_script()
```

We'll ensure we have our network set to `eth-forked` in our `mocassin.toml` file:

```toml
[networks.eth-forked]
forked = true
```

Then we can run our script with the following command:

```bash
mox run setup_script --network eth-forked
```

This will successfully mint us some WETH. 
