---
title: Functions & Deployment
---


_You can follow along with the video course from here._

📋 In order to store our favourite number, we need to create a new **function**. We'll call it `store`, and it will be responsible for updating the `favoriteNumber` variable.

```solidity
contract SimpleStorage {

    uint256 favoriteNumber; // we need to update this
    
    // we'll update the variable here inside a function 
}
```

## Building the **store** function

In Solidity, functions (or methods) are subsections of code that, when called, will execute a very specific small piece of our entire codebase. 

Functions are identified by the keyword `function`, followed by the function's name (e.g. `store`) and additional **parameters** enclosed in parentheses `()`. 
These parameters are the values that we are going to send to our function. In our case, we need to inform the `store` function that we want to update `favoriteNumber` with some other value `_favoriteNumber`:

```solidity
contract SimpleStorage {

    uint256 favoriteNumber; // storage variable: it's stored in a place called "Storage"

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber; // favorite number variable is updated with the value that is contained into `_favoriteNumber`
    }
}
```
The content of the function is placed within the curly brackets `{}`. 
The prefix `_` before `_favoriteNumber` is used to enphathise that the *local* variable `_favoriteNumber` is a **different** variable from the *state* variable `favoriteNumber`. This helps preventing potential confusion when dealing with different variables with similar names in complex codebases.

## Deploying the Smart Contract

You can tested out this function on the Remix VM environment, a fake local chain.
At this stage, you can compile your code by navigating to the compile tab and hitting Compile. After compiling, navigate to the tab **Deploy and Run Transactions** to test your function.

The **Deploy and Run Transactions** tab holds a variety of parameters that are used during the deployment process.
You'll be assigned an *account* with some ETH in order to deploy your smart contract.

<img src="/Users/stefaniapozzi/IT/web3/Updraft/static/solidity/remix/lesson-2/functions/deploy_and_run.png" style="width: 100%; height: auto;">

In this environment, your contract will have been assigned a unique address. You can re-access your deployed contract by expanding the **Deployed Contracts** interface and simultaneously opening the terminal, which shows log data of all contract deployment and transactions.

<img src="/Users/stefaniapozzi/IT/web3/Updraft/static/solidity/remix/lesson-2/functions/deployment_address.png" style="width: 100%; height: auto;">

If we open the terminal we can see that deploying the contract has just sent a (simulated) transaction on the Remix environment. You can check out the transaction details such as status, hash, from, to, gas.

> [!IMPORTANT]
The process of sending a transaction is the same for deploying a contract and for sending Ethers. The only difference is that inside the *data* field of the deployment transaction, is placed the machine readable code of the deployed contract.

### Making Transactions with the Store Function

You can now send a transaction to your `store` function to change the variable `favoriteNumber`: you can insert a number and ress the `store` butto. A transaction is initiated and after some time, the transaction's status will change from pending to complete.

It becomes visible from the accounts section that your ETH are being consumed every time you are submitting a transaction. When the state of the blockchain is modified (e.g. deloying a contract, sending ETH, ..), it's done by sending a transaction that consumes gas. The `store` function is consuming a lot more ETH than just sending ETH between accounts: increasing of gas costs are related (but not only) to the lenght of the code.

### Checking the stored value

The contract is missing a way to check if the number has actually been updated. Because now we cannot we be sure if the transaction **actually** changed the state variable.

The visibility of the `favoriteNumber` variable, is defaulted to internal thereby not allowing outside contracts and people to view it. Appending the `public` keyword next to a storage or state variable, will automatically change its visibility and it will generate a getter function.

```solidity
uint256 public favoriteNumber;
```

After compilation and deployment, a button labeled `favoriteNumber` will become visible. When pressed, it should return the most recent stored value of the valiable `favoriteNumber`.

<img src="/Users/stefaniapozzi/IT/web3/Updraft/static/solidity/remix/lesson-2/functions/favorite-number.png" style="width: 100%; height: auto;">


## Understanding Function visibility

In Solidity, functions and variables can have one of four visibility specifiers: 
- `public`
- `private`
- `external` (only for functions)
- `internal`
  
If a visibility specifier is not given, it defaults to `internal`.

> [!IMPORTANT]
> **Public functions** are visible both internally externally. On the other hand, **private functions** can only be accessed by the *current contract*. Private does not hide a value; rather, it restricts access.

> [!IMPORTANT]
> **External functions** are only visible externally and are not accessible within the contract. **Internal functions** are accessible only by the current contract and any contract that inherit from it.

## Pure and View keywords

In the case of retrieving a value from the blockchain without modification, Solidity provides `view` and `pure` keywords.

Disallows any modification of state. A function marked as `view` is used when we simply need to read state from the blockchain. I will not send a transaction and it will then not modify the blockchain. It is correspondent to the blue buttons in the Remix interface. This fucntion will not send a transaction but it will make a call.

The `return` keyword will specify what is this function giving back.

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
```

> [!WARNING]
While calling `view` or `pure` functions don’t require gas, they do require it when called by another function that modifies the state or storage through a transaction (e.g. calling `retrieve` inside `storage`). This cost is called **execution cost** and it will add up to the transaction cost.

## Understanding the Scope of a Variable

The scope of a variable is determined by the curly braces in which it is declared. A variable can only be accessed within its declared scope. Therefore, if you need to access a variable on different functions, you should declare it outside the functions but inside the contract.


```solidity
function store(uint256 _favoriteNumber) public {
    favoriteNumber = _favoriteNumber;
    uint256 testVar = 5;
}

function something() public {
   testVar = 6; // will raise a compilation error
   favoriteNumber = 7; // this can be accessed because it's in the contract scope
}
```

## Conclusion

In this walk-through, you have learnt how to build a function in Solidity, define its visibility, and understand how it operates on values within a smart contract. You have also explored different transactions and how they consume gas. By understanding functions and their operations, you can take the next step in creating and deploying sophisticated smart contracts on the Ethereum blockchain.

Let's keep learning!

## 🧑‍💻 Test yourself
1. 📕 Describe four function visibility keywords and how do they affect the code.
2. 📕 What's the difference between `view` and `pure`?
3. 📕 In which case a pure function will cost gas?
4. 📕 What's a variable scope?
5. 🧑‍💻 Write a contract that contains 3 functions:
    - a view function that can be accessed only by the current contract
    - a pure function that's not accessible within the current contract
    - a view function that can be accessed from children contracts

[Back to top](#top)