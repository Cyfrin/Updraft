---
title: Setting up
---

*If you'd like, you can follow along with the course here.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/VE4Vq1X24Xs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## What is Composability in Smart Contracts?

<img src="/solidity/remix/lesson-3/setting-up/setting-up2.png" style="width: 100%; height: auto;">


One of the key aspects of blockchain development is the seamless and permissionless interaction among contracts, referred to as composability. This becomes especially important in decentralized finance (DeFi), where intricate financial products interact compatibly using the same smart contract interface.

In this lesson, we'll be creating a contract titled `StorageFactory` that will interact with and deploy our existing `SimpleStorage` contract.

## Setting Up the StorageFactory Contract

Creating our new contract in Remix follows the same steps we've previously covered. The power of repetition is indeed vastly underrated — and this principle will hold even more merit when we begin working with AI pair programming tools.

The primary structure of every Solidity smart contract begins with the SPDX License Identifier and the desired version of Solidity expressed as a pragma statement.

```js
// SPDX-License-Identifier: MITpragma solidity ^0.8.18;
```

Next, we'll define our contract:

```dart
contract StorageFactory {}
```

Once your contract is defined, remember to hit `Compile` The caret sign `(^)` before the solidity version implies that any version greater than or equal to 0.8.18 is acceptable.

## Creating and Deploying the SimpleStorage Contract

The StorageFactory contract needs to deploy a SimpleStorage contract. For it to do this, the StorageFactory contract should know and understand what the SimpleStorage contract is and how it works.

One way to ensure this is by placing the SimpleStorage contract code within the same file as the StorageFactory. This can be done by copying the SimpleStorage code and pasting it above the StorageFactory contract but below the pragma solidity line.

```dart
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleStorage {SimpleStorage code here}

contract StorageFactory {}
```

This option does allow for successful compilation, and both contracts can exist within the same file. However, this isn't best practice, especially with larger projects where multiple contracts in a single file can cause confusion and difficulty in code navigation. As a best practice, each contract should reside in its own file.

When deploying contracts, if you select Remix VM and scroll down to the `Choose Contract` section, you'll notice that both contracts (SimpleStorage and StorageFactory) appear if the StorageFactory.sol file is open.

<img src="/solidity/remix/lesson-3/setting-up/setting-up3.png" style="width: 100%; height: auto;">

Next, in our StorageFactory.sol file, we'll create a function - `createSimpleStorageContract` that can deploy the SimpleStorage contract.

The journey of harnessing the full potential of Solidity across these lessons is both challenging and exciting, stay tuned for more updates.
Happy coding!

<img src="/solidity/remix/lesson-3/setting-up/setting-up1.png" style="width: 100%; height: auto;">