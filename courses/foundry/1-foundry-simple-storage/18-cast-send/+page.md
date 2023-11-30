---
title: Cast Send
---

_Follow along the course with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/-qH4FuEUcZ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Interacting With Contract Addresses via Command Line &amp; Foundry's Cast Tool

Where you new to blockchain or you're just looking to grasp an in-depth understanding of sending transactions and calling functions on a contract through the command line, this article has got you covered.

In this piece, we will be exploring how to interact with these contracts, beginning with the command line interaction, and later extending that to scripts. Initially, we will interact with our deployed contract called **SimpleStorage contract** using private keys that is set as an environment variable.

## Using Foundry's Cast Tool

<img src="/foundry/18-cast/cast1.png" style="width: 100%; height: auto;">

Foundry has an in-built tool known as the **Cast**. Cast comes loaded with numerous commands to interact with. One such useful command is **'send'** which is designed to sign and publish a transaction. To view help about **'send'**, type `cast send --help`. You will see that the 'send' syntax uses two arguments, namely, signature and the arguments.

_The signature_ is essentially the identifier and docker of the function and its input types whereas _the arguments_ is the data you want to pass to the function.

### Example: Using Cast tool to Interact with Simple Storage Contract

Say, we have our simple storage contract and we deployed it. If we wanted to call our `store` function and send a transaction, we would just add some numbers and then click 'store'. However, if we want to call `store` from the command line, we can do it by passing the address we want, the signature and our desired values to pass to our `store` function.

Here's an example of how you'd use the `cast send` function:

```bash
cast send <address> store(uint256) <values>
```

"_Remember, the function should be followed by its input types in parentheses, and then the values that you want to pass in._"

This command won't run immediately as we need to add our private key and RPC URL. So, let's do that. With the command **RPCCast**, the RPC URL can be added. Let's add our private key, too, just after the `RPC URL`.

With the correct command, we'll get a bunch of data about our transaction back. We'll get the `block hash`, `block number`, `Contract address`, `Logs`, and the `transaction hash`.

### Using Cast Call to Read the Blockchain

The Cast tool also provides a `call` function which reads off the blockchain. `cast call --help` will reveal that `call`, like `send`, takes two signature and arguments.

The main difference between them, however, is that `call` is like pressing a view function button - it's not actually sending a transaction.

Here’s an example:

```bash
cast call <address> retrieve()
```

We should get the hex value back from the executed command. From here, we need to convert the hexadecimal back to decimal using the `cast --to-base` function.

```bash
cast --to-base <hex value copied> decimal
```

You can see we get back the same numbers, which we've stored on the chain.

## Updating Stored Values

If you decide to change the stored values, let's say from 123 to 777, you would send that transaction using the `send` command. Then call the `retrieve` function using the `cast call` like earlier. You should see the new number returned to you in the hexadecimal format. Simply convert the hexadecimal format back to decimal format, and voila - you've successfully interacted with your contract.

```bash
cast send <address> store(uint256) 777
```

Following this comprehensive guide, you can start interacting with your contracts from the command line smoothly and eventually with scripts. It's worth noting, this same approach can be used to interact with contracts on an actual test net or on an actual main net.

Happy Contract Interactions!
