---
title: Private Key Safety II
---

_Follow along the course with this video._



---

## Interacting with Contract Deployment: Command Line Interface vs. Scripts

Hello and welcome back! In this blog post, we'll cover how to interact with deployed contracts on the blockchain. As we've learned previously, we have two methods at our disposal: running scripts and using the command line interface (CLI). In this article, we'll focus primarily on the latter.

Let's get started!

## Getting Started: Make Sure You're Deployed

First, we need to confirm that our smart contract has been successfully deployed. From your terminal, bring up your deployment script by hitting the up arrow a few times, then run it again.

## Interacting with Contracts via the Command Line

By now you may be familiar with Remix, a popular Ethereum IDE, and how it allows us to interact with our contracts by clicking buttons in its GUI. With the CLI, we interact with contracts in a similar manner but, in this case, by entering commands. However, using the CLI is just one of two ways we can interact with contracts.

## Cleaning up the Command Line

We're going to make the contract interaction process a touch more efficient while also consolidating previously disparate actions. Often, we'd use Forge's command line interface (CLI) to interact with contracts, creating a new interactive CLI session each time and pasting our private key in when prompted. But we can streamline this.

Let's clarify something here first:

<img src="/foundry/16-private-key-safety-2/safety1.png" style="width: 100%; height: auto;">

## Storing Private Keys Safely

The safer alternative is to first create a **.env** file to store what we call environment variables. These variables contain sensitive information, like your private key, which we don't want to expose publically. Adding private keys or other sensitive data to environment variables in your .env file avoids having to display them in your command line history or elsewhere accidentally.

Remember though, only store test private keys in your .env file, never your actual private key.

Here's a brief demonstration of how to do this.

```bash
    private key = [your private key]
    RPC_URL = http://your_rpc_url
```

Now, we have to load these environment variables into our shell:

```bash
    source .env
```

Now we can test out whether our environment variables were added successfully:

```bash
    echo $PRIVATE_KEY
    echo $RPC_URL
```

## Secure Coding: The Next Step

Even though we've made our command line cleaner by removing any direct input of private keys, there's still the worry of having our keys stored in plain text. That's why our next step towards secure coding involves using a keystore.

A keystore is an encrypted file that contains your private key. You'll need a password to decrypt it.Foundry, a blockchain development toolset is in the process of adding a feature that allows developers to use keystores instead of exposing their private keys. Do check their GitHub repo to see the status of this feature.

In the meantime, it's essential to understand the step we've taken so far: using a .env file to store environment variables is acceptable for `_development_`. It is not the way to go for `_production_`.For production, you'd want to use Foundry's built-in interactive CLI to paste your key in, or use a keystore file with a password once Foundry integrates that function.

Simply put:

- **For Development**: Use environment variables
- **For Production**: Use interactive CLI or a keystore file

## The Env Pledge: Promote Secure Development

The `env` pledge is a set of rules focused on promoting secure development practices. It emphasizes using test private keys, ensuring private keys are not posted on any internet platform even momentarily, and taking immediate action if a key is potentially compromised. If you're _certain_ you won't be deploying anything to the mainnet or working with a private key that holds real funds, you can rest easy. But remember, as developers, it's our responsibility to approach key management with utmost caution.

Feel free to share these valuable pledges with other developers on various platforms. The more people aware of these, the better.

I hope this blog post has helped you understand the crucial aspect of interacting with your contracts securely and efficiently. Remember, you're responsible for managing these keys safely, so follow this guide to ensure you're doing it right!
