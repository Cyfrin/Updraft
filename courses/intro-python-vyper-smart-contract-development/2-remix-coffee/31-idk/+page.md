## Immutables & Constants

We'll learn about immutables and constants. Immutables are a way to declare values that we know won't change once a contract is deployed. They help improve the readability and gas efficiency of our code.

Let's look at an example. Imagine we have an owner for our contract, and we know this owner will never change within the contract. We can use a constant to represent this value.

First, let's declare the `owner` variable as a public address:

```python
owner: public(address);
```

Now, we want to set this value in the constructor of the contract. Using the keyword `constant`, we need to initialize it with a value:

```python
owner: public(constant(address)) = msg.sender
```

Notice that we can't assign a value to a constant within the constructor. Instead, we need to assign it at compile time. So, we can change the code to:

```python
OWNER: public(constant(address)) = msg.sender
```

Here, we are assigning a value to a constant, which is the `msg.sender` address at compile time.

We will cover constants in more detail in the following lessons.
