---
title: Introduction to Huff
---

---

# Harness the Power of Huff

Welcome back to our smart contract exploration series! Today we're diving into Huf, the language that takes you closer to the metal of smart contract programming.

## Why Huff?

If you've ever worked with Solidity, you know it's the go-to language for writing Ethereum smart contracts. However, by learning Huff, a doorway to the deeper mechanisms of smart contracts swings wide open. Rewriting smart contracts in Huff provides clearer insight into the inner workings of the EVM.

## Setting the Stage

To begin, you'll want to install the Huff documentation. Browsing through it is the best way to familiarize yourself with Huff's mechanics.

Once you're ready to install Huff, the most straightforward route is to install `huffup`. Simply take the command provided in the docs, paste it into your terminal, and let it work its magic. It downloads a script and runs bash on it, effectively setting up Huff on your system.

```bash
# Run this command to install huff
curl -L get.huff.sh | bash
```

After installing `huffup`, type `huff --version` into your terminal to verify.

## Rewriting Solidity Contracts in Huf

Now that you've got the Huf compiler ready, let's revisit our `HorseStore.sol` smart contract and reimagine it in Huf.

Rewriting in Huf teaches how smart contracts work at the lowest level and provides deeper understanding of EVM opcodes. Because the Huf and Solidity contracts should be identical, you can write one test suite and apply it to both, known as differential testing.
