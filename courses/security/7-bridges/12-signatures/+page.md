---
title: Signatures Introduction
---



---

# Deep Dive into Message Hash Utils: A guide to Signature Message Hash Utilities in Blockchain

In this post, we're going to delve into signature message hash utilities which are used to produce digests to be consumed by Elliptic Curve Digital Signature Algorithm (ECDSA) for recovery or signing. If you're new to blockchain technology, it might all sound like Greek mythology, but worry not. We're going back to basics - courtesy of the [Anders Brownworth Blockchain demo](https://andersbrownworth.com/blockchain).

## Understanding the Blockchain Demo

Anders Brownworth has created a simple, yet intuitive public-private key demo that has been of great educational help in understanding blockchain better. Unfortunately, the demo has recently been taken down but, the good news is you can find it on [GitHub](https://github.com/anders94/public-private-key-demo).

A simple `git clone` will get you started but ensure that you have node JS installed beforehand.

```bash
git clone https://github.com/anders94/public-private-key-demo
cd public-private-key-demo
npm install
./bin/www
```

You're now successfully running the blockchain demo on your local machine! Visit `localhost` on your web browser while the server is still running and TADA, behold the blockchain demo.

## Unraveling Signatures

> "Signature is a process where a private key is combined with a message to create a unique message signature. The process verifies that the public key and the message match the signature."

This process of signing transactions with private keys is how blockchain works.

Example: When we operate digital wallets, like MetaMask, and make transactions using Ethereum, we sign these transactions and send these signed messages onto the blockchain. Other blockchain nodes verify these messages.

In the blockchain demo, you can generate a pair of private and public keys. Sign a message using your private key and visually follow the entire process.

![](https://cdn.videotap.com/I31ISMCAE8CABrMXYyaq-89.18.png)

## Exploring Message Hash Utils

`MessageHashUtils` might look a bit confusing, but it's an effort to standardize the messages and hashes in the Ethereum blockchain transactions. Some Ethereum Improvement Proposals (EIPs) have been introduced to enhance this.

The first one to consider is `ERC-191`, a standard for signed data, and is specifically targeted for signed data in Ethereum Smart contracts. The motive behind this was to establish a common format for all signed data.

![](https://cdn.videotap.com/7kCHT85kigZxan9r7aki-109.png)

According to `ERC-191`, the data is arranged in the following manner:

- The start of the signed data is marked by `0x19` (1 byte)
- It's followed by ‘version specific’ data (1 byte)
- Additionally, the generic data to sign

The next version is the `EIP-712` or the structured data, which we will discuss in details in the later part of this blog.

For the signed data, all signatures in blockchain comprise of `r, s, and v` parameters.

Let's see an example using Solidity `0.8.0`.

```js
function execute(address target,uint256 nonce,bytes memory payload,uint8 v,bytes32 r,bytes32 s) public {
    bytes memory data = abi.encode(target,nonce,keccak256(payload),msg.sender);
    bytes32 digest = keccak256(abi.encodePacked("\x19\x01",DOMAIN_SEPARATOR,keccak256(data)));
    address recoveredAddress = ecrecover(digest, v, r, s);
    require(recoveredAddress == msg.sender,"Invalid signature");
    (bool success,) = target.call(payload);
    require(success, "Execution failed.");}
```

In the code above, `r`, `s`, and `v` are components of the signed data. In order to verify who signed this message, you can use a precompiled function known as `ecrecover`. The `ecrecover` function takes in the parameters `v`, `r`, and `s` and returns the address that was used to sign the hash. The example above checks if the recovered address matches the sender's address, indicating that the sender indeed signed the bytes.

The function of `ecrecover` is to identify the signer of the hash, i.e, who signed the data. This function is instrumental in Solidity contracts because it helps verify if a certain person signed something.

## Wrapping it up

In conclusion, message hash utilities are used to enhance transparency and uniformity in signing messages and contracts in the Ethereum blockchain. We also explored how Solidity's `ecrecover` function can be used to identify the signer of data. This essentially aids in the process of verification of a signed contract, thus adding another layer of trust and security to the blockchain technology.
