## Minting WETH

We are going to start by writing a script that will give us some WETH. To do this, we will need the address and the ABI of the WETH contract, or we could work with function selectors and signatures. 

However, it's easier to work with the ABI in Python.

We are going to be working on the Goerli test network, so we will need to check what the current network is. We can do this with the following code:

```javascript
active_network = get_active_network()
```

We are going to be working with the Goerli test network, so we will check to see if we're on the Goerli test network. If we are, then we will add our ETH and USDC balances: 

```javascript
if active_network.is_local or forked_network():
```

We will add 1000 ETH and 1000 USDC to our balances:

```javascript
add_eth_balance()
add_token_balance(usdc, weth, active_network)
```

Let's run our script in the terminal: 

```bash
python setup_script.py
```

Now, we need to call the deposit function to get some WETH. We'll need to include the address of the WETH contract.

We can do this by adding the following code to our script:

```javascript
STARTING_ETH_BALANCE = int(1000e18)
```
```javascript
def add_eth_balance():
  boa.env.set_balance(boa.env.eoa, STARTING_ETH_BALANCE)
```

```javascript
def add_token_balance(usdc, weth, active_network):
  with boa.env.block_owner():
    usdc.configureUpdateMinster(my_address, STARTING_USDC_BALANCE)
    weth.deposit(my_address, STARTING_WETH_BALANCE)
```

```javascript
def setup_script() -> Tuple[ABIContract, ABIContract, ABIContract, ABIContract]:
  print("Starting setup script......")
  # 1. Give ourselves some ETH
  # 2. Give ourselves some USDC and WETH
  active_network = get_active_network()
  usdc = active_network.manifest.named("usdc")
  weth = active_network.manifest.named("weth")
  if active_network.is_local or forked_network():
    add_eth_balance()
    add_token_balance(usdc, weth, active_network)
```