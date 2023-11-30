---
title: OracleUpgradeable.sol
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/y1VG8lD75VY?si=_GIx9lsFMKFEHZyv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Understanding the Tincho Method: A Deep Dive into Solana Smart Contract

In our previous discussion, we were introduced to the Tincho method. Thanks to its creator, Tincho, it gave us more confidence in creating our first Solana smart contract. Now, let's dive deeper into this journey and breakdown the necessities of preparing a Solana smart contract with a hand on codebase.

## A Look at the Codebase

First, navigate to the Solana `.sol` file. It's our initial contract. It may seem small, but it's our first step into the universe of smart contracts. So let's explore what its components are. If you are not familiar with Solana or `.sol` files, you may find it easier to use 'Word Wrap' function to easily view the code.

With the 'Word Wrap' enabled, we can see some keywords like `pragma` and `solidity`. There are also several imports, such as `it swap pool`, `Ipool factory`, and `initializable` which are being used within the same contract.

## The Role of Initializable

Now, let's take a more in-depth look at the `initializable` package. It originates from OpenZeppelin, more specifically `OpenZeppelin contracts Upgradable`. As the name suggests, it aids in writing upgradable contracts and will be crucial to our understanding due to its role in proxy elements.

> OpenZeppelin's `initializable` package plays a significant role in Solana smart contract creation. It makes it possible to construct complex contracts that are easily managed and upgradable. It is imperative to understand its functionality and how it interacts with other elements in the smart contract.

## Understanding Proxy in Solidity

Now, let's navigate our way to Thunderloan.sol contract. Here, we will come across `Oracle Upgradable`, which is inherited into the main Thunderloan contract.

The `Oracle Upgradable` contract is a part of the main `Thunderloan` contract. It's a base contract facilitating upgradable contracts or contracts deployed behind a proxy. To get more comfortable with this concept, it's important to understand proxies and their use in Solidity.

If you take a look at the Nat spec (Natural Specification), you'll learn that upgradable contracts can't have constructors. The reason is, in an upgradable contract the storage is delegated to the proxy, but the logic resides in the implementation.

Here is an important takeaway:

> A contract's storage variables live in the proxy contract, while the contract logic lives in the implementation contract. Therefore, making use of constructors to initialize storage variables isn't applicable.

In order to circumvent this issue, the `initializable` contract comes into play. Instead of constructors, you have initializer functions that help initialize proxies with storage. For instance, in OpenZeppelin contracts, you will find initializer functions signified as `__Init` and `__Initunchained`.

## Decoding Oracle Init

Next, we have `Oracle Init` which is our initializer. It calls `Oracle Init Unchained` that takes a `pool factory address`, a `TSWAP address`, and another `pool factory address`.

Our initializer function, `Oracle Init`, calls another function, `Oracle Init Unchained`. This function has a parameter `only initializing` which restricts the function to be called only one time.

(Here's a piece of convention information: I suggest changing the name `TSWAP address` to `pool factory address` for better consistency. Just something to note if you are auditing the contract.)

In simple terms, the entire setup here is to initialize the contract's state because we are using a proxy model where a constructor is not applicable. Now that we've successfully dived into the codebase and demystified key concepts, our Solana smart contract is ready for deployment!
