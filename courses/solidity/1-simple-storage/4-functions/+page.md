## title: Functions & Deployment

_Follow along with this video:_

---

### Introduction

<!-- <img src="/solidity/remix/lesson-2/solidity-types/types.png" style="width: 100%; height: auto;"> -->

In the previous lesson, we added a store variable `favoriteNumber` within our first smart contract and explored different solidity types. In this lesson, you'll discover how to update and retrieve this number, while also learning about functions, visibility, deployment, transactions, gas usage and variable scope.

Let's dive into creating our first Solidity function called `Store`. The function `Store` will be responsible for updating our `favoriteNumber` variable.

### Building the **store** function

📋 To store this variable, we need to implement a new **function**. In Solidity, functions - or methods, are portions of code designed to execute specific tasks within the overall codebase. We'll call this new function `store`, and it will be responsible for updating the `favoriteNumber` variable.

In Solidity programming, functions are identified by the keyword `Function`. You write the `Function` keyword, followed by the function's name, and additional parameters enclosed in parentheses. The parameters define the data a function needs to execute. For instance, to inform our `Store` function about the value it should use to update `favoriteNumber`, we pass a variable of type `uint256` named `_FavoriteNumber`.

```solidity
contract SimpleStorage {
Here's how to define the function:
    uint256 favoriteNumber; // a function will update this variable
    // the function will be written here
}
```

Functions are identified by the keyword `function`, followed by a name (e.g. `store`) and any additional **parameters** enclosed in rounded parentheses `()`.
These parameters represent the values sent to our function. In this case, we inform the `store` function that we want to update `favoriteNumber` with some other value `_favoriteNumber`:

```js
function Store(uint256 _favoriteNumber) public {favoriteNumber = _favoriteNumber;}
```

```solidity
contract SimpleStorage {
Within these brackets `{'{'}...{'}'}`, we indicate that the `favoriteNumber` variable is updated to `_favoriteNumber` whenever the `Store` function is called.
    uint256 favoriteNumber; // storage variable: it's stored in a place called "Storage"
The prefix `_` indicates that `_favoriteNumber` is different from the favoriteNumber variable outside the function. This helps prevent potential confusion when dealing with different variables with similar names.
    function store(uint256 _favoriteNumber) public {
        // favorite number variable is updated with the value that is contained into `_favoriteNumber`
        favoriteNumber = _favoriteNumber;
    }
}
```

This function can be tested out on the local Remix VM.
The content of the function is placed within the curly brackets `{}`.
The prefix `_` before `_favoriteNumber` is used to emphasise that the _local_ variable `_favoriteNumber` is a **different** variable from the _state_ variable `favoriteNumber`. This helps prevent potential confusion when dealing with different variables with similar names in complex codebases.

### Deploying the Smart Contract

At this stage, you can compile your code by navigating to the compile tab and hitting Compile. After compiling, navigate to the tab titled **Deploy and Run Transactions** to test your function.
You can test out this function in the Remix VM environment.
At this stage, you can compile your code by navigating to the compile tab and hitting Compile. After compiling, navigate to the tab **Deploy and Run Transactions** to test your function.

The **Deploy and Run Transactions** tab holds a variety of parameters that are used during the deployment and running of transactions. The contract will be deployed to a simulated Remix VM environment.
The **Deploy and Run Transactions** tab holds a variety of parameters that are used during the deployment process.
You'll be assigned an _account_ with some ETH to deploy your smart contract.

<img src="/solidity/remix/lesson-2/functions/deploy_and_run.png" style="width: 100%; height: auto;">

In the environment, your contract will have been assigned a unique address. As with MetaMask wallets, you can copy the contract's address using the copy tool and save it as a comment in your code.
In this environment, your contract is assigned a unique address. You can re-access your deployed contract by expanding the **Deployed Contracts** interface and simultaneously opening the terminal, which shows log data of all contract deployments and transactions.

<img src="/solidity/remix/lesson-2/functions/deployment_address.png" style="width: 100%; height: auto;">

If we open the Remix terminal we can see that deploying the contract has just sent a simulated transaction on the Remix environment. You can check out its details such as status, hash, from, to and gas.

As shown below:

```go
The Address of our Contract is: 0xd9145CCE52D386f254917e481eB44e9943F39138 This is a Sample Address

```

> [!IMPORTANT]
> The process of sending a transaction is the **same** for deploying a contract and for sending Ethers. The only difference is that the machine-readable code of the deployed contract is placed inside the _data_ field of the deployment transaction.
> Again, you can re-access your deployed contract by expanding the **Deployed Contracts** interface and simultaneously opening the terminal, which shows log data of all contract deployment and transactions.

### Making Transactions with the Store Function

Let's send a transaction to the `store` function to change the value of the variable `favoriteNumber`: you can insert a number and press the `store` button in Remix. A transaction is initiated and after some time, its status will change from pending to complete.

Now, you can send a transaction to your `Store` function to change the variable `favoriteNumber`. By inputting a number and pressing the `Store` button, a transaction is initiated. After some time, the transaction's status will change from pending to complete.
💸 From the accounts section, it becomes visible that ETH is being consumed every time a transaction is submitted. When the state of the blockchain is modified (e.g. deploying a contract, sending ETH, ..), is done by sending a transaction that consumes gas. Executing the `store` function is more expensive than just transferring ETH between accounts, with the rising gas expenses primarily associated (though not exclusively) with the code length.

Every transaction consumes Ether from your account as it is processed; Ether is spent for each operation inside Ethereum's virtual machine or EVM. In our case, deploying a contract and invoking its functions consumes gas (Ether).

### Verifying the stored value

Keep in mind: whenever a value on the blockchain is modified, it's done by sending a transaction that consumes gas.
👓 This contract is missing a way to check if the number has been updated. Now we can store a value but we cannot be sure if the transaction **actually** changed the state variable.

### Checking the Transaction

The default visibility of the `favoriteNumber` variable is internal, preventing external contracts and users from viewing it.

At this point, you may want to confirm that the favorite number has actually been updated. The visibility of the `favoriteNumber` variable, however, is defaulted to internal thereby not allowing outside contracts and people to view it. But fear not, simply append the keyword `public` to variable `favoriteNumber` and you will be able to see it.

> [!NOTE]
> Appending the `public` keyword next to a variable will automatically change its visibility and it will generate a getter function.

````bash
```solidity
uint256 public favoriteNumber;
````

After compilation and deployment, a button labeled `favoriteNumber` will become visible. When pressed, it should return the value of `favoriteNumber`.
After compilation and deployment, a button labelled `favoriteNumber` will become visible. When pressed, it should return the most recent stored value of the variable `favoriteNumber`.

<img src="/solidity/remix/lesson-2/functions/favorite-number.png" style="width: 100%; height: auto;">

### Visibility

In Solidity, functions and variables can have one of these four visibility specifiers:

In Solidity, functions and variables can have one of four visibility specifiers:

- `public`
- `private`
- `external`
- `internal`.
- `external` (only for functions)
- `internal`

If a visibility specifier is not given, it defaults to `internal`.

<img src="/solidity/remix/lesson-2/functions/f1.png" style="width: 100%; height: auto;">
<img src="/solidity/remix/lesson-2/functions/f2.png" style="width: 100%; height: auto;">

> [!IMPORTANT] > **Public functions** are visible both internally and externally. On the other hand, **private functions** can only be accessed by the _current contract_. Private does not hide a value; rather, it restricts access.
> [!IMPORTANT] > **External functions** are only visible externally and are not accessible within the contract. **Internal functions** are accessible only by the current contract and any contract that is inherited from it.

### Pure and View keywords

In the case of retrieving a value from the blockchain without modification, Solidity provides `view` and `pure` keywords.
The terms `view` and `pure` are used when a function reads values from the blockchain without altering its state. Such functions will not initiate transactions but rather make calls, represented as blue buttons in the Remix interface. A `pure` function will prohibit any reading from the state or storage.

A function marked as `view` is used when we simply need to read state from the blockchain (without modifying it). It is correspondent to the blue buttons in the Remix interface.

````bash
function retrieve() public view returns(uint256){return favoriteNumber;}
```solidity
function retrieve() public view returns(uint256){
    return favoriteNumber;
}
````

<img src="/solidity/remix/lesson-2/functions/blue-button.png" style="width: 100%; height: auto;">
```solidity
function retrieve() public pure returns(uint256){
    return 7;
}
```
<img src="/solidity/remix/lesson-2/functions/blue-button.png" style="width: 50%; height: auto;">

The `return` keyword will specify the value type(s) a function returns.

A `pure` function, on the other hand, disallows any reading from the state or storage or any modification of the state.

> [!WARNING]
> While calling `view` or `pure` functions doesn’t typically require gas, they do require it when called by another function that modifies the state or storage through a transaction (e.g. calling the function `retrieve` inside the function `storage`). This cost is called **execution cost** and it will add up to the transaction cost.

```bash
function retrieve() public pure returns(uint256){return 7;}
```

### The scope of a variable

It's worth mentioning that while calling `view` or `pure` functions don’t require gas, they do require gas when called by another function that modifies the state or storage through a transaction.
The scope of a variable is defined by the curly braces enclosing its declaration. A variable is accessible only within its defined scope. To access the same variable across different functions, it should be declared inside the scope of the main contract.

```solidity
function store(uint256 _favoriteNumber) public {
    favoriteNumber = _favoriteNumber;
    uint256 testVar = 5;
}
function something() public {
   testVar = 6; // will raise a compilation error
   favoriteNumber = 7; // this can be accessed because it's in the main contract scope
}
```

### Wrap Up

The scope of a variable is determined by the curly braces `{'{'}...{'}'}` in which it is declared. A variable can only be accessed within its declared scope. Therefore, if you need to access a variable on different functions, you should declare it outside the functions but inside the contract.
In this lesson, you have learned how to build a function in Solidity, define its visibility, and understand how it operates on values within a smart contract. You have also explored different transactions and their gas consumption. Let's continue learning!

### 🧑‍💻 Test yourself

In this walk-through, you have learnt how to build a function in Solidity, define its visibility, and understand how it operates on values within a smart contract. You have also explored different transactions and how they consume gas. By understanding functions and their operations, you can take the next step in creating and deploying sophisticated smart contracts on the Ethereum blockchain.

1. 📕 Describe four function visibility keywords and their impact on the code.
2. 📕 What's the difference between `view` and `pure`?
3. 📕 In which circumstances a pure function will incur gas costs?
4. 📕 Explain what a scope is and provide an example of an incorrect scope.
5. 📕 What's the difference between a transaction that deploys a contract and a transaction that transfers ETH?
6. 🧑‍💻 Write a contract that features 3 functions:
   - a view function that can be accessed only by the current contract
   - a pure function that's not accessible within the current contract
   - a view function that can be accessed from children's contracts

Let's keep learning!
[Back to top](#top)
