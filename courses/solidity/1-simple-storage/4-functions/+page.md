---
title: Functions & Deployment
---


_You can follow along with the video course from here._

In order to store our favourite number, we need to create a new function. We'll call it `store`, and it will be responsible for updating our `favoriteNumber` variable.

## Building the Store Function

In Solidity programming, functions (or methods) are subsections of code that, when called, will execute a very specific small piece of our entire codebase. 

Functions are identified by the keyword `function`, followed by the function's name `store` and additional parameters enclosed in parentheses `()`. 

These parameters are the values that we are going to send to our function. In our case, we need to inform the `store` function that we want to update `favoriteNumber` with something else (`_favoriteNumber`):

```solidity
function store(uint256 _favoriteNumber) public {
    favoriteNumber = _favoriteNumber; // favorite number variable is updated with the value that is contained into `_favoriteNumber`
}
```
The content of the function is placed within the brackets `{}`. 
The prefix `_` is used to enphathise that `_favoriteNumber` is a different variable from the `favoriteNumber`. This helps prevent potential confusion when dealing with different variables with similar names in complex codebases.

## Deploying the Smart Contract

You can tested out this function on the local Remix VM.
At this stage, you can compile your code by navigating to the compile tab and hitting Compile. After compiling, navigate to the tab titled **Deploy and Run Transactions** to test your function.

The **Deploy and Run Transactions** tab holds a variety of parameters that are used during the deployment and running of transactions. The contract will be deployed to a simulated Remix VM environment (not a TestNet yet).

<img src="/Users/stefaniapozzi/IT/web3/Updraft/static/solidity/remix/lesson-2/functions/deploy_and_run.png" style="width: 100%; height: auto;">

In the environment, your contract will have been assigned a unique address. As with MetaMask wallets, you can copy the contract's address using the copy button and save it as a comment in your code.

<img src="/Users/stefaniapozzi/IT/web3/Updraft/static/solidity/remix/lesson-2/functions/deployment_address.png" style="width: 100%; height: auto;">

As shown below:

```go
The Address of our Contract is: 0xd9145CCE52D386f254917e481eB44e9943F39138 This is a Sample Address

```

Again, you can re-access your deployed contract by expanding the **Deployed Contracts** interface and simultaneously opening the terminal, which shows log data of all contract deployment and transactions.

### Making Transactions with the Store Function

Now, you can send a transaction to your `Store` function to change the variable `favoriteNumber`. By inputting a number and pressing the `Store` button, a transaction is initiated. After some time, the transaction's status will change from pending to complete.

Every transaction consumes Ether from your account as it is processed; Ether is spent for each operation inside Ethereum's virtual machine or EVM. In our case, deploying a contract and invoking its functions consumes gas (Ether).

Keep in mind: whenever a value on the blockchain is modified, it's done by sending a transaction that consumes gas.

### Checking the Transaction

At this point, you may want to confirm that the favorite number has actually been updated. The visibility of the `favoriteNumber` variable, however, is defaulted to internal thereby not allowing outside contracts and people to view it. But fear not, simply append the keyword `public` to variable `favoriteNumber` and you will be able to see it.

```solidity
uint256 public favoriteNumber;
```

After compilation and deployment, a button labeled `favoriteNumber` will become visible. When pressed, it should return the value of `favoriteNumber`.

<img src="/solidity/remix/lesson-2/functions/favorite-number.png" style="width: 100%; height: auto;">


## Understanding Function &amp; Variable Visibility

In Solidity, functions and variables can have one of four visibility specifiers: 
- `public`
- `private`
- `external` 
- `internal`
  
If a visibility specifier is not given, it defaults to `internal`.

> [!IMPORTANT]
> **Public functions** are visible both internally externally. On the other hand, **private functions** can only be accessed by the *current contract*. Private does not hide a value; rather, it restricts access.

> [!IMPORTANT]
> **External functions** are only visible externally and are not accessible within the contract. **Internal functions** are accessible only by the current contract and any contract that inherit from it.

## Deeper Understanding of Functions

In the case of retrieving a value from the blockchain without modification, Solidity provides `view` and `pure` keywords.

A function marked as `view` is used when we simply need to read state from the blockchain (without modifying it). It is correspondent to the blue buttons in the Remix interface.

```solidity
function retrieve() public view returns(uint256){
    return favoriteNumber;
}
```

<img src="/Users/stefaniapozzi/IT/web3/Updraft/static/solidity/remix/lesson-2/functions/blue-button.png" style="width: 50%; height: auto;">


A `pure` function, on the other hand, disallows any reading from the state or storage or any modification of the state.

```solidity
function retrieve() public pure returns(uint256){
    return 7;
}
```

It's worth mentioning that while calling `view` or `pure` functions don’t require gas, they do require gas when called by another function that modifies the state or storage through a transaction.

## Understanding the Scope of a Variable

The scope of a variable is determined by the curly braces in which it is declared. A variable can only be accessed within its declared scope. Therefore, if you need to access a variable on different functions, you should declare it outside the functions but inside the contract.

## Conclusion

In this walk-through, you have learnt how to build a function in Solidity, define its visibility, and understand how it operates on values within a smart contract. You have also explored different transactions and how they consume gas. By understanding functions and their operations, you can take the next step in creating and deploying sophisticated smart contracts on the Ethereum blockchain.

Let's keep learning!

## 🧑‍💻 Test yourself
1. 📕 Describe four function visibility keywords and how do they affect the code.
2. 📕 What's the difference between `view` and `pure`?
3. 📕 What's a variable scope?
4. 🧑‍💻 Write a contract that contains 3 functions:
    - a view function that can be accessed only by the current contract
    - a pure function that's not accessible within the current contract
    - a view function that can be accessed from children contracts

[Back to top](#top)