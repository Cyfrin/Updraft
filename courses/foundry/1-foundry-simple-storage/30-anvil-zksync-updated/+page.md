## Anvil ZKSync Update

In this lesson, we will learn how to deploy to a ZKSync local node. It's similar to Anvil but for ZKSync. We will cover the latest updates to ZKSync, which allow for deployment using just one command, without the need for extra installations. To take advantage of this simplified process, it's important to have the most up-to-date version of Foundry-ZKSync.

The reason we want to deploy our contracts to a ZKSync environment is to ensure that our contracts are running smoothly on ZKSync as well, rather than just in an Ethereum environment.

Lets review the Foundry ZKSync repository. We need to make sure that we are using the most up-to-date version of Foundry-ZKSync.

If you have an older version of `foundryup-zksync` installed, you may need to reinstall it in order for Anvil-ZKSync to be downloaded.

Run this command to install:
```bash
curl -L https://raw.githubusercontent.com/matter-labs/foundry-zksync/main/install-foundry-zksync | bash
```

To start your locally running ZKSync node, you can run:
```bash
anvil-zksync
```

You will then see the same as with Anvil, some rich accounts that you can use, their associated private keys, and other information, such as the L1 and L2 gas prices, and the port in which you are listening on, which will be the RPC URL that you would need to use if you want to broadcast any transactions to your Anvil ZKSync node.
