---
title: Interacting with Contracts ABI
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/335sMB2GY8w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Let's assume that every time we call `createSimpleStorageContract()`, we're deploying a new Simple Storage Contract. But there's a catch – we're not keeping track of all the addresses that this simple storage contract is being deployed to. Let's fix that.

### Solution: A Running List of Contracts

A better approach is to transform our variable into a list or an array of Simple Storage Contracts. This way, whenever a contract is created, it gets added to our list. Renaming the new list as `listOfSimpleStorageContracts` gives us a dynamic array for contract storage.

```dart
 SimpleStorage[] public listOfSimpleStorageContracts;
```

Now, whenever a new contract is deployed, it gets pushed to this dynamic array.

```js
function createSimpleStorageContract() public {
        SimpleStorage simpleStorageContractVariable = new SimpleStorage();
        listOfSimpleStorageContracts.push(simpleStorageContractVariable);
    }
```

Once compiled and deployed you will be able to interact with the contract like so:

```js
StorageFactory storageFactory = new StorageFactory();
storageFactory.createSimpleStorageContract();
```

On the deployed contract, you should be able to access `listOfSimpleStorageContracts` which now has a `uint256` input allowing you to choose the index of the variable to interact with.


### Interacting with Smart Contracts

Our `StorageFactory` contract can be considered as the manager of all the Simple Storage Contracts. Up next, we'll discuss how our `StorageFactory` contract can call the `store` function of the simple storage that it deploys. To make this happen, we create a function called SF Store.

```js
function sfStore(uint _simpleStorageIndex, uint _simpleStorageNumber) public {...}
```

Whenever you interact with another contract, you need two things – an address and the ABI (Application Binary Interface). A simple rule of thumb to remember is ABI and address are key for contract interaction. The ABI works like a user manual, guiding code interaction with other contracts.

If you go to Solidity's compile tab and scroll down, you will find a button to copy the ABI to clipboard. This ABI provides compilation details and helps define how to interact with the contract.

Essentially, the buttons you see upon deploying a contract are the same as the ones you see inside the ABI. The presence and quantity of buttons is determined by the ABI.

<img src="/solidity/remix/lesson-3/interacting/interacting-contract1.png" style="width: 100%; height: auto;">


In our case, the ABI is automatically known to the compiler because the compiler generates it for Solidity. We also know the address because we have a list of all of them. Now, with the ABI and the address at our disposal, we can interact with other contracts with ease.

Let's use the `SFstore` function to store a new number on one of those simple storage contracts using the index in our array:

```js
listOfSimpleStorageContracts[_simpleStorageIndex].store(
            _simpleStorageNumber
        );
```

It is also possible to retrieve the stored value from our Simple Storage contract:

```js
function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        // return SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).retrieve();
        return listOfSimpleStorageContracts[_simpleStorageIndex].retrieve();
    }
```

After compiling these newly added features and deploying the contract, you will be able to interact with your contract in the expected manner:



In conclusion, we have built a contract `StorageFactory` that creates `SimpleStorage` contracts and allows for interaction (saving and retrieving data) with these contracts. As a final touch, we can simplify the `SfGet` and `sfStore` functions as below:

```js
 function sfStore(
        uint256 _simpleStorageIndex,
        uint256 _simpleStorageNumber
    ) public {
        
        listOfSimpleStorageContracts[_simpleStorageIndex].store(
            _simpleStorageNumber
        );
    }
```

By leveraging the capacities of the Solidity language, we can construct and manage a dynamic array of contracts, and interact with them seamlessly. Keep exploring and happy coding!

<img src="/solidity/remix/lesson-3/interacting/interacting-contract2.png" style="width: 100%; height: auto;">
