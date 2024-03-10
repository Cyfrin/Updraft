---
title: Advanced EVM - Encoding Signatures & Selectors
---

_Follow along the course with this video._



---

Welcome back! Having discussed encoding before, let's now take our discussion a little further and understand how to populate the data field in a function call.

In essence, we will learn how to simplify transactions at the base level by means of binary, bytes, and hexadecimal to interact with smart contracts. Getting to grips with these concepts will allow us to emulate what the blockchain does at the fundamental level. Let's dive in and commence this learning journey.

## Creating a New File and Setting Up

To kick things off, we'll create a new file called _call anything. sol_. We start with an SPDX license identifier of MIT and proceed to break down the code on this file.

The first thing to note is that to call a function with just the data field of the function call, we need to encode the function name &amp; its parameters. When a function is called, we specify the function name and the parameters.

These need to be encoded down to the binary level to allow EVM (Ethereum-based smart contracts) and Solidity to comprehend what's happening.

## Understanding Function Selectors and their Role

To achieve this, we need to delve into a couple of concepts. The first aspect relates to what is known as the 'function selector'. The function selector happens to be the first four bytes of the 'function signature'.

The function signature is essentially a string defining the function name and parameter. If 'transfer' is a function, for instance, it's going to have a function signature and will accept an address and a UN 256 as inputs.

To understand Solidity better, let's take a look at the bytecode and binary code. A function selector like 'transfer' informs Solidity to execute the transfer function. One of the ways to get the function selector is by encoding the function signature and grabbing its first four bytes.

## Setting Up the Contract

Let's now create the contract for our exercise with Solidity 0.8.7. We'll call this contract 'call anything'. With two storage variables in place, we have our function set up called 'transfer'.

Notice that while the transfer function normally deals with an ERC-20 transfer, we are using it here with an address and a UN 256 amount. The idea is to set these values and work with the function to understand how it impacts our output.

To achieve this, we will create a function to get that function selector.

```js
function getSelectorOne() public pure returns(bytes4 selector){
    selector = bytes4(keccak256(bytes("transfer(address,uint256)")));
}
```

Once we have compiled our code and run it, we access the function selector by clicking on 'getSelector1'. This provides us with the bytes that informs our Solidity contract that we refer to the transfer function with an address and a uint256 as input parameters.

## Encoding The Parameters

The next step in this process involves encoding the parameters with our function selector.

```js
function getDataToCallTransfer(address someAddress, uint256 amount) pubic pure returns(bytes memory){
    return abit.encodeWithSelector(getSelector1(), someAddress, amount);
}
```

ABI (Application Binary Interface) plays a key role here. ABI is instrumental in ensuring that different system components interact seamlessly with each other. Here, it encodes the function selector and the arguments and then attaches the encoding to the specified four-byte selector.

Compiling and running it helps us see how all the encoded data fits into the transaction data field. This further facilitates the contract in calling the transfer function and passing an address and an amount.

## The Power of ABI to Call a Function

With these aspects in place, we can now use ABI to call functions without explicitly having to mention the function. We can create a function that calls the transfer function by encoding all necessary parameters.

```js
function callTransferFunctionDirectly(address someAddress, uint256 amount) public returns(bytes4, bool){
    (bool success, bytes memory returnData) = address(this).call(
        //getDataCallTransfer(someAddress, amount)
        abi.encodeWithSelector(getSelectorOne(), someAddress, amount)
    );
    return(bytes4(returnData), success);
}
```

Using the `address(this).call` method, we can directly call the function with the give parameters. The method returns a boolean value for success and the return data of the call.

This call function, while considered low-level, illustrates the ability to call the transfer function without actually having to call it directly. This demonstration lays the foundation for understanding how to interact between different contracts using ABI encoding and decoding methods.

## Adjustments Using ABI: encodeWithSelector and encodeWithSignature

ABI function also provides us with another method: `encodeWithSignature`. This method simplifies the earlier mentioned processes as it turns the function string into a selector for us.

```js
function callTransferFunctionDirectly(address someAddress, uint256 amount) public returns(bytes4, bool){
    (bool success, bytes memory returnData) = address(this).call(
        //getDataCallTransfer(someAddress, amount)
        abi.encodeWithSignature("transfer(address,uint256)", someAddress, amount)
    );
    return(bytes4(returnData), success);
}
```

This new function varies in no way from the previous function. Both functions carry out the same tasks; the only difference lies in the approach, with the second case simplifying things by combining the encoding process. This streamlines the encoding of the function selector on our behalf.

### Note

It's generally considered good practice to use high-level approaches such as import interfaces rather than low-level calls as they provide the compiler's support and ensure data type matching. Despite this, mastering such low-level Solidity techniques allows us to appreciate the flexibility and versatility of the code more fully.

## Recap and Next Steps

This advanced lesson on coding in Solidity reveals the importance of using encoding and decoding to affect smart contracts. It's normal to find these processes challenging initially. However, as we continue to practice, we will grow more comfortable with them.

For those who want to dig a little deeper, I recommend [Deconstructing Solidity](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/) by Open Zeppelin. This article goes further into the behind-the-scenes of a contract, a useful resource if you're interested in opcodes and lower-level components.

Thank you for sticking with me throughout this in-depth lesson on binary encoding in Solidity. Cheers and until the next time.
