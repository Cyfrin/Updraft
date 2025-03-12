## Setting up ZKsync network configuration

In this lesson, we will learn how to set up the configuration necessary to deploy a smart contract to the ZKsync Sepolia Testnet. This can be confusing, but we'll walk through this together.

We can start with the `mocassin.toml` file. We need to create a new network configuration below the existing network entries. The new network configuration should be named `sepolia-zkync`.

Here is the basic structure of our network configuration:

```toml
[networks.sepolia-zkync]
url = "$ZKSYNC_SEPOLIA_RPC_URL"
chain_id = 300
save_to_db = false
default_account_name = "default"
explorer_uri = "https://explorer.sepolia.era.zkync.dev"
explorer_type = "zkyncxplorer"
is_zkync = true
```

We've already configured our RPC URL and chain ID, but we still need to add the `explorer_uri` and `explorer_type`.

We can use the `mox explorer list` command to list all available explorers, but there are a lot of them. The one we are using is `sepolia-zkync-era`.

```bash
mox explorer list
```

Here is our complete `mocassin.toml` file:

```toml
[networks.sepolia-zkync]
url = "$ZKSYNC_SEPOLIA_RPC_URL"
chain_id = 300
save_to_db = false
default_account_name = "default"
explorer_uri = "https://explorer.sepolia.era.zkync.dev"
explorer_type = "zkyncxplorer"
is_zkync = true
```

Now, we need to add our new network to MetaMask. We will do this by going to the network settings and hitting "Add a custom network".

Give the network a name like `ZKsync Era - Sepolia` and then add the RPC URL, chain ID, and currency symbol. We will use the same block explorer URL as our `explorer_uri` in the `mocassin.toml` file.

Finally, hit "save" in MetaMask and our new network is ready!

We've now set up our ZKsync Sepolia Testnet and are ready to deploy.
