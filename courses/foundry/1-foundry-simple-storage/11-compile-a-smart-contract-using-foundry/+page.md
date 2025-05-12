---
title: Compile a smart contract using Foundry
---

_Follow along with this video:_

---

### Compiling Smart Contracts: A Guide to the Foundry Console Compilation Process

Open a new terminal. Type in `forge build` or `forge compile` to compile the smart contracts in your project.

Once the compiling is finished, you'll see some new folders in the Explorer tab on the left side. One of them is a folder called `out`. Here you'll be able to find the [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) of the smart contract together with the [Bytecode](https://www.geeksforgeeks.org/introduction-to-bytecode-and-opcode-in-solidity/) and a lot of useful information. 

The `cache` folder also appears. Generally, this folder is used to store temporary system files facilitating the compilation process. But for this course, you can safely ignore it.

### More terminal wizardry

Throughout your solidity development/audit journey you will type a lot of terminal commands, every time to make a change that you want tested you'll probably have to rerun the `forge build` then maybe you test it with `forge test` or run a script with `forge script` and many more. Typing all these over and over again is inefficient and time-consuming. The better way is to use the `up` and `down` arrow keys. Type the following commands:

```
echo "I like Foundry"
echo "I love Cyfrin"
echo "Auditing is great"
```

Now press the `up` and `down` arrow keys to cycle through the 3 commands.

Ok, cool! We learned how to compile a contract, but how does one deploy a smart contract?