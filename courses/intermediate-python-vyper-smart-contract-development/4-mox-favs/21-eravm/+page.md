## Getting Started with ZK Sync and Moccasin

In this lesson, we will continue our journey with Moccasin by working with ZK Sync. We will be focusing on deploying and testing our contracts with ZK Sync.

First, let's make sure we have installed the necessary tools. We need to install the `anvil-ZKsync` and `zkVyper` commands. We can verify their installations with the following commands in our terminal:

```bash
anvil-ZKsync --version
```

```bash
zkVyper --version
```

We will be using the `mox` command to deploy and test our smart contracts. We can deploy to ZK Sync with the following command:

```bash
mox run deploy --network eravm
```

Moccasin will automatically spin up a local ZK Sync network when we run the `mox run deploy` command. We can then run our tests using the following command:

```bash
mox test --network eravm
```

We will see a lot of warnings during the testing phase. These warnings are due to ZK Sync VM being different from the EVM. However, we can ignore these warnings as our tests will still pass.

We also saw how to compile our contracts with both the EVM and ZK Sync:

```bash
mox compile
```

```bash
mox compile --network eravm
```

Moccasin uses different bytecode for both the EVM and ZK Sync. We can check the bytecode by looking at the `favorites.json` file in our `out` folder. We will see that the VM has changed from EVM to `eravm` and the bytecode has changed. However, the ABI (Application Binary Interface) will remain the same for both the EVM and ZK Sync.

We have now learned how to deploy and test our contracts with ZK Sync using Moccasin. This allows us to take advantage of the power of ZK Rollups, making our applications faster and more efficient.

We are now ready to deploy and test our smart contracts in a ZK Sync environment, and we can do so with the confidence that our code is working as expected.
