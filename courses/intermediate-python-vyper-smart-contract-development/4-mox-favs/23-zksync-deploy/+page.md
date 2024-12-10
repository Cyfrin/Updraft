## Deploying to ZKSync

In this lesson, we'll deploy our smart contract to the ZKSync network. We'll cover the following:

- Deploying to ZKSync Testnet
- Verifying Our Smart Contract
- Sharing Your Achievement
- Cleaning Up

### Deploying to ZKSync Testnet

We can deploy to ZKSync using this command:

```bash
mox run deploy --network sepolia-zksync
```

We'll be prompted to confirm that we want to continue. Type "y" and hit enter. 

We'll then be asked to enter our password.

Now we'll see our transactions being broadcasted and we can see our contract address has been printed in the terminal.

### Verifying Our Smart Contract

Let's verify our smart contract by copying the contract address from our terminal and going to the ZKSync explorer.

We can find the ZKSync explorer by searching "zksync sepolia testnet explorer" on Google.

Once we've pasted the contract address in the explorer search, we'll be able to see our contract information, including the source code and deployed bytecode.

### Sharing Your Achievement

If we successfully deployed our contract to ZKSync, we can go to the Github repo associated with this course and click on the "Tweet Me (add your contract in)!" link.

We recommend sending a tweet at ZKSync letting them know we just deployed a smart contract using Mocassin. 

Sharing our success with the community is an important part of our developer journey.

### Cleaning Up

If we have an "install.sh" file in our project directory, we can delete it. 

We may also have a "era_test_node.log" file. We can delete this file as well. 
