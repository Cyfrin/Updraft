## Viewing in Metamask

We will learn how to view our NFT in Metamask.

Metamask currently doesn't support IPFS for NFTs. So, we need to use a workaround, which is a centralized gateway. A centralized gateway is often used by marketplaces like OpenSea or Rarible. It is a method for viewing IPFS data without going through IPFS itself.

First, we will deploy our NFT to our own Anvil chain.

We need to define a new network in our `mocassin.toml` file.

```toml
[networks.anvil]
name = "anvil"
url = "http://127.0.0.1:8545"
prompt_live = false
default_account_name = "anvil1"
default_account_key = "0x" 
```

Then, we will open a terminal window and run the following command:

```bash
mox wallet list
```

This will list all of our wallets that are defined in the `mocassin.toml` file.

Next, we will import our Anvil wallet key. To import our key, we run the following command in our terminal:

```bash
mox wallet import anvil1
```

We then copy the private key for our wallet from our terminal output, and paste it into the Metamask account import screen.

Now, we can deploy our NFT contract using the following command:

```bash
mox run deploy_basic_nft.py --network anvil
```

Next, we will add Anvil to our Metamask wallet.

We can do that in Metamask by expanding view, going to networks, and clicking on "Add a Custom Network."

We will then enter the following values:

* Network name: Anvil
* Default RPC URL: (Paste your RPC URL here, which was retrieved from the terminal)
* Chain ID: 31337
* Currency symbol: ETH

Click save, and you should now see Anvil in your available networks. We can now switch to our new Anvil chain in Metamask.

We can now import our NFT into Metamask.  We will grab the address of our deployed NFT from our terminal output.

Paste the address into the Metamask import screen.

We will set the token ID to 0, and click import.

You should now see your newly deployed NFT.

To view our NFT in Metamask, we can change the `BASE_URI` constant in our `basic_nft.vy` file to use the gateway.

Here is an example of a centralized gateway address:

```python
BASE_URI: public(constant(String[34])) = "https://gateway.pinata.cloud/ipfs/"
```

We will then need to redeploy our contract with the following command:

```bash
mox run deploy_basic_nft.py --network anvil
```

After we redeploy, our NFT should now be visible in Metamask and we can view the image through the gateway.

Using a centralized gateway is less secure than using IPFS, as the gateway could go down, and your image would no longer be visible. IPFS is a better long-term solution for storing NFT data. 
