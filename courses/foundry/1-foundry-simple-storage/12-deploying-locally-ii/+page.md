---
title: Deploying to a Local Blockchain II
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/U-9vmmu-JFk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Deploying a Smart Contract on your Local Blockchain

Are you tired of running into issues deploying your smart contract on your local blockchain? Whether you're using Ganache or Anvil for your blockchain development, we've got you covered. In this comprehensive guide, we're going to walk you through how to deploy contracts in two different ways, using the command line and the integrated Forge framework.

<img src="/foundry/12-deploy-local-2/deploying1.png" style="width: 100%; height: auto;">

## The fundamentals: Your endpoint and private key

Since you already have your endpoint and private key, you now have everything you need to deploy to your own local blockchain. However, just like working with a real blockchain, you need some balance to spend gas to deploy your contract.

## Getting started with the Command Line

To kick things off, let's dive into the command line approach. This involves familiarizing with the Forge framework.

```bash
forge help
```

Running the command above provides a list of commands built into the Forge. For our cause, we are interested in the 'Create' command. Its function is to deploy a smart contract- exactly what we are looking to do.

```bash
forge create --help
```

Running the command above shows the numerous options available for deploying our contract. Be sure to have your private key ready, which you can copy from Anvil.

**NOTE:** Please refrain from using actual private keys in Vs code or any platform that could potentially share your information unintentionally. Although we're using a fake private key for this exercise, the best practice is to use your terminal.

## Unraveling Potential Issues

While trying to deploy our contract - 'Simple Storage' in this case - there is a possibility of running into an error when using the command:

```bash
forge create SimpleStorage
```

The error is due to the fact that the RPC server we are using doesn't coincide with the default Forge RPC server. To fix this, you need to assign the RPC URL manually and ensure it is in lowercase.

If you forget to input the private key, the command line will remind you with another error! No worries though, just use the 'Up' key and include the 'interactive' option as seen in the command below. Then, follow the prompt to enter your private key.

```bash
forge create SimpleStorage --rpc_url http://127.0.0.1:7545 --interactive
```

_Note:_ the URL is the one from ganache.

<img src="/foundry/12-deploy-local-2/deploying2.png" style="width: 100%; height: auto;">

You should now see your transaction details if you're using Ganache. The transaction and blocks you created beforehand should be visible.

_Blockquote: "Despite Anvil not showing any transaction details, it serves as a more efficient platform for this procedure. Hence, we will be using it for the rest of this guide."_

## Conclusion

That's it! You've now deployed a smart contract to your local blockchain. Take note that this process may require some tweaking depending on your specific environment or contract. Overall, by following these steps, you will have a robust foundation for deploying more complex smart contracts in your future blockchain projects.
