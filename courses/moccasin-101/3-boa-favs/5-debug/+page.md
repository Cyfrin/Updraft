## Vyper Debug Statements

We've been using the `boa` library and the `boa` library is great for us, but now let's talk about the `print` function. Let's say that we want to be able to see the `msg.sender` when we call the `store` function. So, we can actually put a print statement right in our Vyper code! 

Now, we need to be very careful. This is specifically for debugging, and we don't want to have these `print` statements in real smart contracts. We'll add this line to the `store` function, `print(msg.sender)`.

```python
def store(favorite_number: uint256):
    print(msg.sender)
    self.my_favorite_number = favorite_number
```

So, what we'll do is we'll run our code. First, we'll clear out our terminal:

```bash
clear
```

And then we'll run our Python script:

```bash
python deploy_favorites_pyevm.py
```

We get a warning telling us `print` should only be used for debugging. This is because we should not deploy print statements to the blockchain. 

But, even though it's a waste of gas and it might result in some weird oddities, we can see that we get the sender address. 
