## Using Uniswap

Uniswap is a decentralized exchange built on Ethereum. This lesson will show you how to use it with Python.

First, we'll need to establish our connection to Uniswap. We can do this by using Python and the `web3.py` library. We'll need the ABI of the contract. You can access this by going to Uniswap Docs and clicking the "Contracts" tab. Then, navigate to the "V3 Protocol" and "Deployments" sections. Click on "Ethereum Deployments". Now, you can see a list of contracts, and the one we are going to use is "SwapRouter02". Click on it. Now, navigate to the "Write as Proxy" tab, and you will see a list of functions. The function we want to use is called "exactInputSingle".

In this lesson, we'll be using the `mocassin.toml` file to store the addresses we need for our contracts. This file is a standard TOML file that will store these values in key-value pairs.

To start, we'll create a new key-value pair within `mocassin.toml` called "uniswap_swap_router" and set its value to the address of the "SwapRouter02" contract. We'll also need to set the "abi" of the "SwapRouter02" contract.

Here is the code:

```toml
uniswap_swap_router = "0x68b3465833b727a7ce0cfDF485e9eD866c65f4C7"
uniswap_swap_router_abi = "uniswap_swap_router.json"
```

Next, let's create some variables we will be using within our code. We'll need a variable called "uniswap_swap_router", and we'll set this to the contract from our `mocassin.toml` file.
```python
uniswap_swap_router = active_network.manifest.named("uniswap_swap_router")
```

After that, we are going to use the `web3.py` library to interact with the Uniswap contract. 

Here is the code:

```python
uniswap_swap_router.exactInputSingle(
   weth.address,
   usdc.address,
   3000,
   boa.env.eoa,
   weth_to_sell,
   min_out,
   0
)
```

In this code block, we pass in the parameters of the `exactInputSingle` function:
* **weth.address:** The address of WETH
* **usdc.address:** The address of USDC
* **3000:** The fee
* **boa.env.eoa:** The address of our recipient (BOA). 
* **weth_to_sell:** The amount of WETH we want to sell
* **min_out:** The minimum amount of USDC we want to receive. This is important for preventing MEV.
* **0:** The square root price limit

In this scenario, we want to swap WETH for USDC, and so we'll set the "weth_to_sell" value to the value of WETH we want to sell. To find that value, we'll create a variable called "amount_weth", and set this to the value of "weth_to_sell" from the function we created.

Here is the code:

```python
amount_weth = weth_to_sell * (10 ** 18)
```

We'll also need to approve Uniswap to use our WETH by creating a function using `weth.approve`.

Here is the code:

```python
weth.approve(uniswap_swap_router.address, amount_weth)
```

Now, we'll run a print function.

```python
print("Let's swap!")
```

To swap WETH for USDC, we'll use the following line: 

```python
uniswap_swap_router.exactInputSingle(
    weth.address,
    usdc.address,
    3000,
    boa.env.eoa,
    weth_to_sell,
    min_out,
    0
)
```

We'll also run a print function to check the token balances, which we created earlier in the lesson.

```python
print_token_balances()
```

That's how you use Uniswap with Python! 
