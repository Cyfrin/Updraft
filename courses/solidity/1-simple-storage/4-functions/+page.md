---
title: Functions & Deployment
---


*Follow along with the course here.*



<!-- <img src="/solidity/remix/lesson-2/solidity-types/types.png" style="width: 100%; height: auto;"> -->

Let's dive into creating our first Solidity function called `Store`. The function `Store` will be responsible for updating our `favoriteNumber` variable.

## Building the Store Function

In Solidity programming, functions are identified by the keyword `Function`. You write the `Function` keyword, followed by the function's name, and additional parameters enclosed in parentheses. The parameters define the data a function needs to execute. For instance, to inform our `Store` function about the value it should use to update `favoriteNumber`, we pass a variable of type `uint256` named `_FavoriteNumber`.

Here's how to define the function:



```js
function Store(uint256 _favoriteNumber) public {favoriteNumber = _favoriteNumber;}
```

Within these brackets `{'{'}...{'}'}`, we indicate that the `favoriteNumber` variable is updated to `_favoriteNumber` whenever the `Store` function is called.

The prefix `_` indicates that `_favoriteNumber` is different from the favoriteNumber variable outside the function. This helps prevent potential confusion when dealing with different variables with similar names.

This function can be tested out on the local Remix VM.

## Deploying the Smart Contract

At this stage, you can compile your code by navigating to the compile tab and hitting Compile. After compiling, navigate to the tab titled **Deploy and Run Transactions** to test your function.

The **Deploy and Run Transactions** tab holds a variety of parameters that are used during the deployment and running of transactions. The contract will be deployed to a simulated Remix VM environment.

<img src="/solidity/remix/lesson-2/functions/deploy_and_run.png" style="width: 100%; height: auto;">

In the environment, your contract will have been assigned a unique address. As with MetaMask wallets, you can copy the contract's address using the copy tool and save it as a comment in your code.

<img src="/solidity/remix/lesson-2/functions/deployment_address.png" style="width: 100%; height: auto;">


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

```bash
uint256 public favoriteNumber;
```

After compilation and deployment, a button labeled `favoriteNumber` will become visible. When pressed, it should return the value of `favoriteNumber`.

<img src="/solidity/remix/lesson-2/functions/favorite-number.png" style="width: 100%; height: auto;">


## Understanding Function &amp; Variable Visibility

In Solidity, functions and variables can have one of four visibility specifiers: 
- `public`
- `private`
- `external` 
- `internal`. 
  
If a visibility specifier is not given, it defaults to `internal`.

<img src="/solidity/remix/lesson-2/functions/f1.png" style="width: 100%; height: auto;">
<img src="/solidity/remix/lesson-2/functions/f2.png" style="width: 100%; height: auto;">

## Deeper Understanding of Functions

In the case of retrieving a value from the blockchain without modification, Solidity provides `view` and `pure` keywords.

A function marked as `view` is used when we simply need to read state from the blockchain (without modifying it). It is correspondent to the blue buttons in the Remix interface.

```bash
function retrieve() public view returns(uint256){return favoriteNumber;}
```

<img src="/solidity/remix/lesson-2/functions/blue-button.png" style="width: 100%; height: auto;">


A `pure` function, on the other hand, disallows any reading from the state or storage or any modification of the state.

```bash
function retrieve() public pure returns(uint256){return 7;}
```

It's worth mentioning that while calling `view` or `pure` functions don’t require gas, they do require gas when called by another function that modifies the state or storage through a transaction.

## Understanding the Scope of a Variable

The scope of a variable is determined by the curly braces `{'{'}...{'}'}` in which it is declared. A variable can only be accessed within its declared scope. Therefore, if you need to access a variable on different functions, you should declare it outside the functions but inside the contract.

## Conclusion

In this walk-through, you have learnt how to build a function in Solidity, define its visibility, and understand how it operates on values within a smart contract. You have also explored different transactions and how they consume gas. By understanding functions and their operations, you can take the next step in creating and deploying sophisticated smart contracts on the Ethereum blockchain.

Let's keep learning!