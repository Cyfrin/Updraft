---
title: Deploy a smart contract locally using Forge
---

_Follow along with this video:_

---

### Deploying to a local blockchain

To find out more about forge's capabilities type

```
forge --help
```

Out of the resulting list, we are going to use the `create` command.

Type `forge create --help` in the terminal or go [here](https://book.getfoundry.sh/reference/forge/forge-create) to find out more about the available configuration options.

Try running `forge create SimpleStorage`. It should fail because we haven't specified a couple of required parameters:

1. `Where do we deploy?`

2. `Who's paying the gas fees/signing the transaction?`

Let's tackle both these questions.

As you've learned in the previous lessons, each blockchain (private or public) has an RPC URL (RPC SERVER) that acts as an endpoint. When we tried to deploy our smart contract, forge tried to use `http://localhost:8545/`, which doesn't host any blockchain. Thus, let's try to deploy our smart contract specifying the place where we want to deploy it.

Please start Ganache and press `Quickstart Ethereum`. Copy the RPC Server `HTTP://127.0.0.1:7545`. Let's run our forge create again specifying the correct rpc url.

```
forge create SimpleStorage --rpc-url http://127.0.0.1:7545
```

This again failed, indicating the following:

```
Error accessing local wallet. Did you set a private key, mnemonic or keystore?
```

Try the following command:

```
forge create SimpleStorage --rpc-url http://127.0.0.1:7545 --interactive
```

You will be asked to enter a private key, please paste one of the private keys available in Ganache. When you paste a key you won't see the text or any placeholder symbols, just press CTRL(CMD) + V and then ENTER.

Voila!

::image{src='/foundry-simply-storage/12-deploy-a-smart-contract-locally-using-forge/Image1.PNG' style='width: 75%; height: auto;'}

You can go to Ganache and check the `Blocks` and `Transactions` tabs to see more info about what you just did.

From now on, everything we deploy shall be done on Anvil. But if you like Ganache more, feel free to use that.

Do the following:

1. Run `clear`
2. Run `anvil`
3. Create a new terminal by pressing the `+` button
4. Copy one of the private keys from the anvil terminal
5. Run `forge create SimpleStorage --interactive`
   We don't need to specify an `--rpc-url` this time because forge defaults to Anvil's RPC URL.
6. Go to the Anvil terminal and check the deployment details:

```
    Transaction: 0x40d2ca8f0d680f098c7d5e3c127ef1ce1207ef439ba6e163c2042483e15998a6
    Contract created: 0x5fbdb2315678afecb367f032d93f642f64180aa3
    Gas used: 357076

    Block Number: 1
    Block Hash: 0x85a56c0b8f166e86d1cce65412615e0d9a72972e04b2488023275131ea27330a
    Block Time: "Mon, 15 Apr 2024 11:50:55 +0000"

```

The more explicit way to deploy using `forge create` is as follows:

```
forge create SimpleStorage --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

We included the `--rpc-url` to not count on the default and the `--private-key` to not use the `--interactive` option anymore.

Pfew! That was a lot, but we learned a very important thing, how to deploy a smart contract on two local blockchains. But what comes next is one of the most important if not the **_MOST IMPORTANT_** aspects you will learn here: **_Private key safety_**
