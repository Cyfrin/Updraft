## Variable Visibility & Deploying to the Remix VM

We've learned about the different types of values that Vyper variables can hold. Now, we'll see how to use these variables in practice by deploying a smart contract.

We'll start with a simple smart contract that has a single state variable called `my_favorite_number`. This variable will be a `uint256`, which is an unsigned integer. We'll initialize it to 0.

```python

#pragma version >=0.4.1

@license MIT
my_favorite_number: uint256 = 0
```

The syntax for declaring variables in Vyper is similar to Python. We use a colon to separate the variable name from its type.

In Vyper, variables declared at the top level of a contract are called _state variables_ or _storage variables_. These variables are stored on the blockchain and can be accessed by anyone.

To test our smart contract, we'll deploy it to the Remix VM. The Remix VM is a local blockchain simulator that lets us run and test our contracts without deploying them to a real blockchain.

We'll start by compiling our contract.

```bash
# In Remix, go to the "Compiler" tab and compile your contract.
```

Once the contract is compiled, we can deploy it by going to the "Deploy & Run Transactions" tab. The Remix VM will provide us with a dummy account and gas limit that we can use to deploy the contract.

We can also delete a deployed contract by clicking the "X" button next to the contract address.

Since we haven't added any functionality to our contract yet, we only have low-level interactions available. This means we can't see the value of our `my_favorite_number` variable yet. To make it visible, we need to change its _visibility_.

We can make a variable visible to everyone by adding the keyword `public` before its type.

```python

#pragma version >=0.4.1

@license MIT
my_favorite_number: public(uint256) = 0
```

By default, variables in Vyper are _internal_, which means they can only be accessed from within the contract. By making our variable public, we allow anyone to access its value.

Now, if we deploy our contract again and click on the "my_favorite_number" button, we'll be able to see its value. This will confirm that it was initialized to 0.

The `public` keyword is important for making data on the blockchain accessible to everyone. It's a key part of building decentralized applications, as it allows users to interact with your contract in a secure and transparent way.
