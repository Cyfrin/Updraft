---
title: Private Key Safety
---

_Follow along the course with this video._



---

# Practicing Private Key Safety: A Comprehensive Guide

The following lesson will take you through the intricacies and dangers of mishandling your Private Key, while also highlighting the key steps you should take to maintain its safety.

## The Importance of Private Key Safety

Now, here's an incredibly important piece of information and one worth your attention:

<img src="/foundry/13-private-key-safety/private1.png" style="width: 100%; height: auto;">

This goes especially for your production or private keys associated with actual money. This is a serious security risk and a transgression we cannot afford to make. Even though the example presented here involves a dummy private key, this is a practice we should generally steer clear from.

<img src="/foundry/13-private-key-safety/private2.png" style="width: 100%; height: auto;">

One common oversight lies not in how we treat our private keys, but rather in where we tend to leave them – our shell or Bash history. Here's an example to illustrate the point: once you execute commands in your terminal, a simple upward stroke on your arrow keys will display the previously carried out commands – including your private keys. It is easy to see why this fact poses a risk to private key safety.

## Clearing Your Shell History

To remove your private key from your history in Bash, execute the following command:

```bash
history -c
```

This effectively clears your command history. Try hitting the 'up' arrow on your keyboard - you will not return any previously entered commands. To further test this, you can use the `history` keyword:

```bash
history
```

This command will return your entire command history. You can also use the `clear` command to clear your screen and then call `history` again to verify you've purged your command history as desired.

## Your Safety Promise

It's time now to articulate your promise for maintaining private key safety. Create a file titled 'Promise.md'. In this file, make it a point to write down your promise:

```
I promise to never use my private key associated with real money in plain text.
```

If you feel comfortable doing so, consider tweeting this to affirm and secure your pledge. Tagging me or other experts in the field to hold yourself accountable can be immensely helpful. Remember, this is merely a first step in your commitments towards private key safety - many more promises are to come.

As we're working with dummy keys for now, this may not seem like a big deal. But I assure you that the safety of your private keys in the future is of utmost importance. I’ve seen multiple multimillion-dollar companies overlook this protocol and, as a result, have their private keys breached.

## Deploying Your Contracts

To deploy your contracts to any blockchain from a command line, you would generally use the `forge` command as shown below:

```bash
forge create < name-of-your-contract > add < RPC-URL > < your-private-key >
```

In upcoming sections, we will learn how to access RPC URLs for free using Alchemy for any blockchain. We will also delve into exploring safer methodologies for dealing with private keys.

With this you now have a preliminary understanding of how to deploy your contracts to any blockchain from the command line. This knowledge equips you with the base tools to operate in a more secure digital environment, prioritizing private key safety, cleanliness of your bash history and the right way to deploy contracts to the blockchain.

Keep following along for more tips, tricks, and best practices in maintaining your cyber safety.
