## Deploying to ZkSync Era Test Node

We can deploy our NFT smart contract to the ZkSync Era Test Node using moccasin. 

We need to:

1. Import a private key from the ZkSync Era Test Node to our moccasin environment.
2. Add the ZkSync Era Test Node to our moccasin configuration file.
3. Deploy our smart contract to the Era Test Node.
4. Add the deployed smart contract to our MetaMask account.

**Import a Private Key into Moccasin**

We can import a private key from the Era Test Node into our moccasin environment using the following command:

```bash
mox wallet import zk-rich1
```

This will prompt us to enter the private key and a password to encrypt it. 

**Add the Era Test Node to our Moccasin Configuration File**

We'll add the Era Test Node to our moccasin configuration file, `mocassin.toml`, by copying an existing network configuration and replacing the values with the Era Test Node settings. 

The Era Test Node URL will be `http://127.0.0.1:8011`.

```bash
url = "http://127.0.0.1:8011"
is_zksync = true
prompt_live = false
default_account_name = "zk-rich1"
```

**Deploy the Smart Contract to the Era Test Node**

We can deploy our smart contract to the Era Test Node using the following command:

```bash
mox run deploy basic-nft --network era-test-node
```

This will prompt us to enter the password for our keystore.

**Add the Deployed Smart Contract to our MetaMask Account**

We need to add the deployed smart contract to our MetaMask account so that we can interact with it. 

First, we need to add the Era Test Node to MetaMask as a custom network.

1. Go to MetaMask and click the "Add a custom network" button. 
2. Enter the network name "Era Test Node", the URL `http://127.0.0.1:8011`, the Chain ID 260, and the currency symbol ETH. 
3. Save the network.

We can then import the smart contract using the following steps:

1. Go to the NFTs section in MetaMask.
2. Click the "Import NFT" button.
3. Enter the smart contract address and the token ID. 
4. Click "Import".

We've now deployed our NFT smart contract to the ZkSync Era Test Node and imported it into our MetaMask account.
