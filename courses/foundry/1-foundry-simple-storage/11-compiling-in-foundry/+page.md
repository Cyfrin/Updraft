---
title: Compiling in Foundry
---

_Follow along the course with this video._



---

# Compiling Smart Contracts: A Guide to the Foundry Console Compilation Process

In this detailed guide, we'll walk you through the intricate process of compiling Solidity smart contracts using the Foundry console, courtesy of Parity. By the end of this blog post, you'll successfully compile a `SimpleStorage.sol` contract within your terminal.

## Getting Started: The Foundry Console

Let's kick things off starting with the installation of the Foundry console. Foundry is an incredibly essential tool that we'll be using to collate our background, so ensure it has been installed correctly on your system to avoid any hitches.

Here's a gentle reminder, just with your existing code and Foundry installed, you're already set to begin the intriguing journey into compiling your `SimpleStorage.sol` smart contract right in your terminal!

## How to Compile Your Code

After correctly setting up Foundry, pull up your terminal. In the terminal, key in either `forge build` or `forge compile`. Running either command will immediately trigger the compilation of your code, like so:

```bash
$ forge build
```

Or

```bash
$ forge compile
```

<img src="/foundry/9-compiling/compiling1.png" style="width: 100%; height: auto;">

Look out for a notable change - the appearance of several new folders. One of them is a file named `out`.

## Understanding the `out` File

Quite noticeable when you compile is the `out` file. To put it simply, the `out` file holds a trove of crucial information similar to what the Remix compiler offers.

It is within this `out` file that you have access to the `Abi`. For those who haven't encountered it, you're probably wondering what `Abi` is. In the context of this guide, `Abi` refers to the compiled version of your contract. To locate it, navigate your way back to Remix, select the compiler tab, locate one of your written contracts and scroll down.

<img src="/foundry/9-compiling/compiling2.png" style="width: 100%; height: auto;">

In the Abi section, you'll notice a small dropdown icon placed directly beside it. A simple click on this dropdown button will minimize the Abi, prominently displaying all other details such as bytecode method Identifiers and other sub-sections that we'll delve into later in this guide.

## The `cache` Folder Defined

Another file that appears upon compilation is the `cache` folder. Generally, this folder is used to basically store temporary system files facilitating the compilation process. But for this guide, you can virtually ignore it.

## Recalling Previously-Run Commands

Here's a productivity-boosting feature in your terminal: the ability to recall and rerun use previously executed commands. The action is simple - just press the up arrow key. This feature proves handy when you need to rerun lengthy commands which previously executed correctly, saving you both time and energy.

For instance, suppose you've run a long command like `echo`, which is a classic Unix command, and decide to rerun it. All you need to do is press the up arrow key:

```bash
$ echo "This is some crazy long command"
```

<img src="/foundry/9-compiling/compiling3.png" style="width: 100%; height: auto;">

By following these steps, you should now have a head start in compiling your Solidity smart contracts. Congratulations on adding a new skill to your programming arsenal! Enjoy your development journey!
