---
title: Storage
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/8LAeGgkkoYw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## A Look into Ethereum Gas Optimization

In pursuit of deciphering Ethereum smart contract storage, we need to address gas optimization. The term `gas` refers to the computational efforts needed to execute operations in the Ethereum virtual machine.

Now, let's explore our contract variables and understand how they consume gas.

<img src="/foundry-fund-me/17-storage/storage1.png" style="width: 100%; height: auto;">

In one of the [freeCodeCamp videos](https://youtu.be/gyMwXuJrbJQ), a simple contract with global variables is analyzed. The objective here is to make our contract more gas-efficient by examining storage variables.

## Breaking Down Storage Variables

Storage variables, also known as state variables or global variables, play a crucial role in our contract's gas usage. These variables are persistent, meaning they retain their values between function calls.

When we declare a variable in our contract, this variable gets allotted a spot in storage. It's helpful to visualize storage as a giant, numbered array, where each element comprises a `storage slot` of 32 bytes.

Every time we add a global variable, it takes up a new slot in this storage array. In the case of dynamic values such as arrays or mappings, these are managed using a hashing function whose specifics can lay hold of in the Solidity documentation.

<img src="/foundry-fund-me/17-storage/storage2.png" style="width: 100%; height: auto;">

## Arrays and Mappings

For a better grasp, consider a dynamic array named `myArray`. The array length is stored at the array's storage slot, not the entire array.

```js
myArray.push(222);
```

When we add an element to the array, it is stored at a specific location based on the aforementioned hashing function.

How about mappings? Common to arrays, Solidity assigns a storage slot for each mapping. Should the slot be empty, Solidity earmarks it for the mapping's hashing function.

Now, you may wonder, how does Solidity handle constant and immutable variables? As it turns out, it doesn't store these variables. Instead, these variables become part of the bytecode of the contract. Consequently, the variables do not occupy space in the storage.

## Local Variables and Memory Keyword

In contrast, variables declared within a function do not persist. Once the function finishes running, these variables are discarded. These are stored in a separate memory data structure.

Here, we unearth why we often use the `memory` keyword, especially for strings.

```js
function getString() public pure returns (string memory) {return "Hello, World!";}
```

Strings, at their core, are dynamically sized arrays. Through `memory`, we instruct Solidity to allocate space for the string in the memory location, destined for deletion after usage.

## Exploring Storage with Anvil

Anvil offers an interesting way to inspect the storage of a Solidity contract. Using the command `forge inspect FundMe storageLayout`, we can inspect the storage layout of our contract.

Another way is through `Cast storage <contract_address> <index>` command. This way, you can fetch the content of a certain storage slot in your contract.

<img src="/foundry-fund-me/17-storage/storage3.png" style="width: 100%; height: auto;">

)## On Blockchain Privacy

Lastly, even though we can declare variables as `private` in Solidity, the data isn't truly private. Due to the public nature of blockchains, anyone can read that information off of your or anybody's blockchain.

In conclusion, understanding how storage works within Ethereum smart contracts is a vital skill for a successful Solidity developer. It helps us write more efficient contracts and enable more cost-effective operations within the Ethereum ecosystem.
