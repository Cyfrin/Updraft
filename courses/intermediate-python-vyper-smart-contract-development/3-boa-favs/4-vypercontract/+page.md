Let's learn how to interact with our smart contract. We have `store` in here which updates the favorite number. Our favorite number is going to be private. We can call `retrieve` to view it.

So, what we could do is, we could do a little print line here. Let's do:

```python
print("Starting favorite number = ")
```

We can then print to a little F string here:

```python
print(f"The starting favorite number is: {starting_favorite_number}")
```

Now let me clear the terminal and run this again. The starting favorite number is 7. Does that make sense? Let's go to `favorites.py`. Ah, so I have currently `self.my_favorite_number = 7`. Whatever you have for yourself that favorite number in the deploy/the init/the constructor, that's where your favorite number is going to start off, so that looks correct.

Now, we do:

```python
favorites_contract.store(5)
```

So if we change our favorite number to 5 we can then copy this line:

```python
starting_favorite_number = favorites_contract.retrieve()
```

Paste it here, and say this is now the:

```python
ending_favorite_number = favorites_contract.retrieve()
```

So ending favorite number equals `favorites_contract.retrieve`. So, we're going to update it and then we're going to get that number that we updated it with. We can then run `print`:

```python
print(f"The ending favorite number is: {ending_favorite_number}")
```

Now we run this script now. This sends a transaction, right? Because the `store` function is not a view function, right? `retrieve` is a view function, so Boa goes, "Oh okay, I don't need to send a transaction for this. I'm just going to call it. I'm just going to read it myself. I'm just reading data. I'm not changing any state of the blockchain." Whereas the `store` function is actually changing state, right? The `my_favorite_number` storage or state variable is going to be updated to whatever you told it to change it to. So now, if I pull up the terminal let's clear it out, I'm going to hit up twice to rerun this. We now see: "Let's read the Vyper code and deploy it! The starting favorite number is 7. The ending favorite number is 5." Now, we still didn't see any transaction information in here and that's because we're using the `PyEVM`. You'll understand what I mean in a minute. But, boom, we were able to update our starting favorite number from 7 to 5 in this tiny little script. We didn't have to manually create the transaction or anything like that. Boa under the hood, when it calls `load`, it does that whole build transaction thing, constructor thing, sign thing, all of that under the hood for us. Additionally, when we call `store` it does the same thing. It does all the sign transaction, build transaction, all that stuff under the hood for us.
