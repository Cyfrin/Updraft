---
title: Abi.encode & Abi.encodePacked
---

_Follow along with the video_



---

In a bid to have a high-level understanding of `Solidity`, a statically typed, contract-oriented programming language, one should be aware of how to concatenate strings, or simply put, combine strings together. We will further explore `ABI encode` packing and what ABI encoding entails generally.

At this point, it should be illustrated that the subject matter we are delving into is quite advanced, involving in-depth knowledge of how `Solidity` operates behind-the-scenes, the workings of binary, the concept of opcodes, and other intricate aspects that may be challenging to grasp.

However, I strongly encourage anyone to attempt absorbing what the content offers. And guess what? It's absolutely fine not to understand it at first glance. Remember, this advanced information could aid significantly in future complex projects. And of course, the more conversant you become with this, the more proficient a Solidity developer you turn out to be.

# Abi Encode Packed for String Concatenation and More

Our exploration begins with creating a `ABI encode packed` based function for our contract, named `encoding.sol`. The function is to wrap different strings together while returning a single string. It's important to note that all code within `encoding.sol` can be found within the sub-lesson folder of the hardhead NFT FCC.

Below is the basic contract setup:

```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Encoding{
    function combineStrings() public pure returns(string memory) {
        return string(abi.encodePacked("Hi mom"," ","Miss you"));
    }
}
```

After compiling and deploying, you'd be able to call the `combineStrings` function and get the combined string output `Hi mom Miss you`. Here, `abi.encodePacked` method merges the two input strings into a bytes object and then the `string` keyword typecasts the bytes object back into a string object.

As mentioned, the `abi.encodePacked` method is not the only way to concatenate strings in `Solidity`. An alternative way is using the `stringConcat` method provided with `Solidity  0.8.X`. However, `abi.encodePacked` is not limited to string concatenation. It's in fact a method to encode pretty much anything into binary format.

<img src="/security-section-1/10-encoding/encoding1.png" style="width: 100%; height: auto;" alt="block fee">

# Diving Deeper into Abi Encoding with Opcodes

To better understand what happens under the hood when we send a transaction, we'll lift the veil of the low-level binary and music the Ethereum Opcodes. If you'd wish to look at detailed comments on this, you can check them in the encoding `sol` file in the `GitHub repo`.

# Understanding Opcodes

The `EVM` or the `Ethereum Virtual Machine`, interprets these random numbers and letters into Ethereum opcodes. In simpler terms, an opcode is like an English alphabet for these random numbers and letters of the bytecode of a transaction.

When we send our contracts to the blockchain, we're basically sending the binary version of our contracts, which comes as opcodes. To understand this better, let's examine the transaction that creates a new contract in the blockchain.

# Encoding Variables to Binary with Abi Encode

With Abi Encoding, we can encode pretty much any type of data, be it numbers, strings, or others. The encoding process narrows down the data to its binary form. This allows contracts to interact with the data more cost-effectively.

Here is the function that encodes a number into binary:

```js
function encodeNumber() public pure returns(bytes memory) {
    bytes memory number = abi.encode(1);
    return number;
}
```

In Solidity, you can also encode strings into binary. The resulting output will be a bytes object that the computer will understand. However, the encode function by itself doesn't compress the resulting data. Here's an example of such encoding.

```js
function encodeString() public pure returns(bytes memory) {
    bytes memory someString = abi.encode("some string");
    return someString;
}
```

# Compressing Binary with Abi Encode Packed

When the encoded object is too large, it can be compressed to save space. This can be achieved using the `abi.encodePacked` method. It performs packed encoding while maintaining datatypes shorter than 32 bytes. However, for encoded data to be packed, the dynamic types of the data must be encoded in place with no length array. This method can be utilized to compress contract functions for cost-effective execution.

Here is a contract function that encodes a string into a packed binary:

```js
function encodeStringPacked() public pure returns(bytes memory) {
    bytes memory someString = abi.encodePacked("some string");
    return someString;
}
```

After packing the encoding data, the solidity function can concatenate the new string data based on the memory bytes. The resulting packed string can then be easily sent through transactions within the smart contract environment.

# Multiple Abi Encoding

In Solidity, you can encode more than just one data at a time. The multi-encode function is enabled to encode multiple data and returns them as a bytes object. The process entails defining the types of the encoded data strings before the function interpretation begins.

Here is a function to demonstrate multiple data encoding:

```js
function multiEncode() public pure returns(bytes memory) {
    bytes memory someString = abi.encode("some string", "it’s bigger");
    return someString;
}
```

The subsequent decoding function decodes back the packed binary into its original form.

Here is the corresponding decoding function:

```js
function multiDecode() public pure returns(string memory, string memory) {
    (string memory someString, string memory someOtherString) =  abi.decode(multiEncode(), (string, string));
    return (someString, someOtherString);
}
```

The function above takes two strings, encodes them, and then subsequently decodes the resulting bytes object back into its original form.

# Conclusion

In summary, this post has taken a deep dive into the intricacies of using the abi.encodePacked method to concatenate strings and more in Solidity. We've worked through detailed examples to understand the function from various angles. Whether you're a beginner or an advance Solidity developer, the information here should broaden your knowledge and understanding of the Solidity language.

> With constant trials and multiple iterations, you'll master the powerful Solidity encoding/decoding tools and become an even more proficient Solidity developer. - "Solidity Coding Guru"
