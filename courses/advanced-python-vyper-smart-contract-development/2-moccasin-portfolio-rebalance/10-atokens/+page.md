## Aave ATokens

In this lesson, we will continue to explore Aave's mechanics by learning how to withdraw our funds. 

We deposited USDC and WETH into Aave. To see how much of each asset we have, we can look at our Aave dashboard. 

We can also confirm these balances in our MetaMask wallet.

Aave gives us ATokens, tokens that are minted and burned upon supply and withdraw of assets. 

ATokens denote the amount of crypto assets supplied to the protocol and the yield earned on those assets.

The value of an AToken is pegged to the value of the corresponding supplied asset at a 1:1 ratio and can be safely stored, transferred or traded.

To withdraw funds, we will need to learn how to find the addresses of the ATokens. We will use the Aave documentation for this.

We will find the Aave Protocol Data Provider contract address and add it to our `mocassin.toml` file, saving the file to our Aave protocol data provider.json file:

```bash
moc explorer get 0x41393e5633760dc321075a4f765AE84D7688CD8D --save-name aave_protocol_data_provider
```

Next, we will open our notebook.py file.

We need to manifest this new address. We will paste the name of our Aave protocol data provider into our notebook.py file.  Here we will use the `.manifest_named()` method:

```python
config.reload()
active_network = config.get_active_network()
aave_protocol_data_provider = active_network.manifest_named("aave_protocol_data_provider")
```

Now, we can use this to get a list of ATokens using the `.get_all_a_tokens()` method:

```python
a_tokens = aave_protocol_data_provider.get_all_a_tokens()
```

We can print this list of ATokens to check the output:

```python
print(a_tokens)
```

We will use a `for` loop to find the addresses of the USDC and WETH ATokens.

```python
for a_token in a_tokens:
    if "WETH" in a_token.name:
        a_weth = active_network.manifest_named("weth")
    if "USDC" in a_token.name:
        a_usdc = active_network.manifest_named("usdc", address=a_token[1])
```

We can then print the addresses:

```python
print(a_usdc)
print(a_weth)
```

As you can see, this will return the AaveUSDC and AaveWETH addresses. We can confirm these addresses on Etherscan or Blockscout.  We will see a tag indicating the name of the AToken, along with the address of the AToken. 

We can now withdraw the USDC and WETH from our Aave portfolio!