---
title: Introduction to Huff
---

_Follow along with this video:_

---

## Why Huff?

If you've ever worked with Solidity, you know it's the go-to language for writing Ethereum smart contracts. However, by learning Huff, a doorway to the deeper mechanisms of smart contracts swings wide open. Rewriting smart contracts in Huff provides clearer insight into the inner workings of the EVM, and more granular control over a contract's operations.

## Setting the Stage

To begin, you'll want to read the Huff documentation. Browsing through it is the best way to familiarize yourself with Huff's mechanics.

Once you're ready to install Huff, the most straightforward route is to install `huffup`. Simply take the command provided in the docs, paste it into your terminal, and let it work its magic. It downloads a script and runs bash on it, effectively setting up Huff on your system.

Run this command to install Huff:

```bash
curl -L get.huff.sh | bash
```

You'll then need to add `huffup` to your path with the command provided in your terminal. Once that's complete you should be able to run `huffup` to install the huff compiler. Finally you can verify things all worked with the command:

```bash
huffc --version
```

## Rewriting Solidity Contracts in Huff

Now that you've got the Huff compiler ready, let's revisit our `HorseStore.sol` smart contract and reimagine it in Huff.

Go ahead and create a new file named `HorseStore.huff`

Rewriting in Huff teaches how smart contracts work at the lowest level and provides deeper understanding of EVM opcodes. Because the Huff and Solidity contracts should be identical, you can write one test suite and apply it to both, known as differential testing.
