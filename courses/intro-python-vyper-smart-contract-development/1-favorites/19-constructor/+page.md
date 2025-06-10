## Constructors in Vyper

In this lesson, we'll discuss what a constructor is in Vyper. We'll focus on the mechanics of how the constructor function works and create a constructor to initialize our `favorites` smart contract.

### Constructors Explained

A constructor is a special function that's called only once when a smart contract is deployed. The most common use for a constructor is to initialize state variables or to call other functions needed to set up the contract.

### Defining Constructors

Let's set up a constructor in a Vyper contract. First, we'll create a state variable named `owner` which will be a public address:

```python
owner: public(address)
```

To define a constructor, we start with the `@deploy` decorator, followed by the definition of a function named `__init__`. Inside the parentheses, we can add any arguments we want to pass to the constructor. For now, we'll leave it empty:

```python
@deploy
def __init__():
    pass
```

### Setting State Variables in Constructors

One of the most common things we do inside a constructor is to set the `owner` of the contract. We can do this by setting the `owner` state variable to `msg.sender`. The `msg.sender` variable refers to the account that deployed the contract.

```python
@deploy
def __init__():
    self.owner = msg.sender
```

### Passing Parameters to Constructors

Let's look at some examples of passing parameters to a constructor.

First, we'll add a state variable named `name` that is a public string with a maximum length of 100 characters:

```python
name: public(String[100])
```

Now we will pass the parameter `name` to our constructor function:

```python
@deploy
def __init__(name: String[100]):
    self.owner = msg.sender
```

We will then use the `name` parameter to set the `name` state variable:

```python
@deploy
def __init__(name: String[100]):
    self.owner = msg.sender
    self.name = name
```

Now, let's create another state variable named `expiresAt` that will be a public `uint256`:

```python
expiresAt: public(uint256)
```

We will now add a second parameter, `duration`, to our constructor function:

```python
@deploy
def __init__(name: String[100], duration: uint256):
    self.owner = msg.sender
    self.name = name
```

Finally, we will set the `expiresAt` variable equal to the current block timestamp plus the `duration`:

```python
@deploy
def __init__(name: String[100], duration: uint256):
    self.owner = msg.sender
    self.name = name
    self.expiresAt = block.timestamp + duration
```

Now, let's compile and deploy our contract. We'll go to the `Compile` tab.  
We will click the `Compile` button.  
We will go to the `Deploy & Run Transactions` tab.
We will click on the `Deploy` button. We will then enter the `name`, which is `Vyper`, and the `duration`, which will be `10`. We'll click the `Transact` button.  
We can then check the state variables.
Our `owner` address will be set to the current account.  
Our `name` will be set to `Vyper`.  
Our `expiresAt` will be set to the current block timestamp plus 10.

### Another Example

Let's create a constructor for our `favorites` smart contract to initialize a `my_favorite_number` state variable. Our state variable `my_favorite_number` will be a public `uint256`.

```python
my_favorite_number: public(uint256)
```

Now let's create a constructor:

```python
@deploy
def __init__():
    self.my_favorite_number = 7
```

To compile and deploy this contract, we will click the `Compile` button. We will then go to the `Deploy & Run Transactions` tab. We will click the `Deploy` button.
We can then interact with our contract by clicking on the `my_favorite_number - call` button, which will return the value 7.

Great work!
