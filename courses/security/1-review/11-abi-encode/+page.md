---
title: Abi.encode & Abi.encodePacked
---

_Follow along with the video_

---

## Understanding ABI.encode & ABI.encodePacked in Solidity

### Introduction

The topic we're diving into is how to concatenate strings in Solidity, specifically exploring `abi.encode` and `abi.encodePacked`. This is advanced stuff, delving into the low-level workings of Solidity, binary, and opcodes. Remember, it's okay if you don't grasp it all on the first go!

> Remember: You can find all the code we'll be working with [**here**](https://github.com/PatrickAlphaC/hardhat-nft-fcc/tree/main/contracts/sublesson).

### Getting Started

- **Setting Up:** We'll use Remix for this exploration. Start by creating a new file named `encoding.sol`.

Your contract should look something like this:

```js
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7

contract Encoding {
    function combineStrings() public pure returns (string memory) {
        return string(abi.encodePacked("Hi Mom! ", "Miss you."));
    }
}
```

Compiling this contract and calling the `combineStrings()` function in Remix is going to give us the whole string `"Hi Mom! Miss you."`

### Exploring `abi.encode` and `abi.encodePacked`

- **Understanding Encoding:** We use `abi.encode` and `abi.encodePacked` for encoding strings and other data types into a binary format. In our function above `"Hi Mom!"` and `"Miss you."` are both converted into binary then concatenated. We then typecast the returned binary is a string.

`encode` and `encodePacked` are examples of globally available methods in Solidity. There's a [**Cheatsheet**](https://docs.soliditylang.org/en/latest/cheatsheet.html) you should checkout with more information and tonnes of examples of these globally available methods and variables.

> Note: As of `Solidity 0.8.12` you can also use `string.concat(stringA, StringB)` to achieve the same result as our `"Hi Mom!"` example.

Before getting to deep with encoding, let's take a step back to understand what's happening when we send a transaction.

### Compilation Breakdown

![block fee](/security-section-1/10-encoding/encoding1.png)

As seen in the image above, when we compile a smart contract, the solidity compiler is returning two things `contract.abi` and `contract.bin`. The `abi` you likely remember from previous lessons.

`Contract.bin` is the binary representation of your contract. This is the actual code that get put on the blockchain.

We see this binary object in transaction we send to the blockchain. Recall what constitutes a transaction:

```js
tx = {
  nonce: nonce,
  gasPrice: 10000000000,
  gasLimit: 1000000,
  to: null,
  value: 0,
  data: "BINARYGOESHERE",
  chainId: 1337,
};
```

> Note: When we're deploying a new contract, this is still a transaction on the blockchain, but our `to` property is empty and the `data` field will contain both the `contract init code` and `contract bytecode(binary)`.

[**Here's**](https://etherscan.io/tx/0x112133a0a74af775234c077c397c8b75850ceb61840b33b23ae06b753da40490) a transaction on etherscan.io with a binary data object you can inspect.

At first look, the binary data in a transaction looks like chaos. Just a garbled mess of letters and numbers. You may be asking yourself - how does the EVM (Ethereum Virtual Machine) make any sense of these instructions?

Well ...

### Intro to EVM Opcodes

> Opcodes are the building blocks of EVM instructions. Each opcode represents a specific operation.

Opcodes are effectively the alphabet of the ethereum machine language. Each pair of characters in the binary object discussed above represents an Opcode with pertains to a specific operation to be performed.

You can find a list of the EVM Opcodes [**here**](https://www.evm.codes/?fork=shanghai).

This means that the binary object we pass in our blockchain transactions is ultimately a long list of these operations we're telling the EVM to perform.

### Why This Matters

Until now we've only used `encode` and `encodePacked` to concatenate strings, but in reality these functions are much more powerful. You can encode virtually anything into its binary format.

- **abi.encode** - returns the binary of the provided argument
- **abi.encodePacked** - returns the binary of the provided argument, but with stipulation/compression
  - types shorter than 32 bytes are concatenated directly, without padding or sign extension
  - dynamic types are encoded in-place and without the length.
  - array elements are padded, but still encoded in-place

Read more about [**Non-standard Packed Mode**](https://docs.soliditylang.org/en/latest/abi-spec.html#abi-packed-mode)

The other side to this whole equation is that we also have the ability to _`decode`_ things.

![block fee](/security-section-1/10-encoding/encoding2.png)

and finally .. we can even `multiEncode` and `multiDecode`.

## ![block fee](/security-section-1/10-encoding/encoding3.png)

# Conclusion

Hopefully this lesson has shed some light on some of the finer details of using encoding functions in solidity and the power they can hold. In the next lesson we'll be looking at how to encode function calls directly.
