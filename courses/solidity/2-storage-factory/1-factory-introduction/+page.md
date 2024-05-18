---
title: Introduction
---

_You can follow along with the video course from here._

<a name="top"></a>
### Introduction

You can find the code for this section in the [Remix Storage Factory Github repository](https://github.com/cyfrin/remix-storage-factory-f23). In these eight lessons we'll work with three new contracts:

1. `SimpleStorage.sol` - the contract we build in the previous section with some modifications
2. `AddFiveStorage.sol` 
3. `StorageFactory.sol` - a contract that will **deploy** a `SimpleStorage` contract and **interact** with it

### Section overview

```solidity
contract SimpleStorage {
    SimpleStorage[] public listOfSimpleStorageContracts;

    function createSimpleStorageContract() public {};
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {};
    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {}
    }
```
After deploying `StorageFactory` and executing its function `createSimpleStorageContract`, we can observe a new transaction appear in the Remix terminal. It's a *deployment transaction* of the `SimpleStorage` contract, executed by the `StorageFactory` contract.


It's possible then to interact with this newly deployed `SimpleStorage` via the `store` function. We'll do this by using the `sfStore` function from the `StorageFactory` contract. This function accepts two parameters: the index of a deployed `SimpleStorage` contract, which will be `0` since we just deployed one contract and a number. The function `sfGet`, with input `0` will indeed return the number that was given in the previous function.
The address of the `SimpleStorage` contract can then be retrieved by clicking on the get function `listOfSimpleStorageContracts`.

<img src="/solidity/remix/lesson-3/setting-up/graph-1.png" style="width: 100%; height: auto;">
        
### Conclusion
The `StorageFactory` contract manages multiple instances of another contract: it allows deploying new instances, and storing and retrieving values from them. The contract tracks these instances in an array. This setup simplifies managing and interacting with multiple contract instances.

### 🧑‍💻 Test yourself
1. 📕 What is the primary role of the `StorageFactory` contract?
2. 📕 Why is it important to specify the index when calling the `sfStore` function?