## ZkSync Demo

This is a demo showing how to work with ZkSync. We'll use the code we've written previously and make a few changes so that it can be executed on ZkSync.

The only change we need to make is to set up a ZkSync chain, and then add the contract addresses for each of the contracts that we're using.

We've done this in our `mocassin.toml` file.

```toml
[networks.zksync]
url = "$ZKSYNC_RPC_URL"
fork = false
is_zksync = true
explorer_url = "https://api-era.zksync.network/api"
explorer_type = "zksyncExplorer"
explorer_api_id = "$ETHERCAN_ZKSYNC_API_KEY"
chain_id = 324
```

We'll then run our script, which will deposit funds, rebalance, and withdraw our funds.

```bash
mox run deposit_and_rebalance --network zksync --account smallmoney
```

This will deposit our funds into ZkSync, trade some of the funds, and withdraw the funds again. 