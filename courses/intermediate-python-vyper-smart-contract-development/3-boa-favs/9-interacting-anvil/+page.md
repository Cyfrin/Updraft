## Interacting with Anvil Contract with Titanoboa

We will explore how to interact with an Anvil contract with Titanoboa. 

Let's take a look at our code.  We've learned how to deploy this contract and now we will interact with it.  To do so we will start with a print statement:

```python
print("Storing number...")
```

We will call a function called "store" from our favorites contract. This will set our favorite number to 5.

```python
favorites_contract.store(5)
```

Now we will print the ending favorite number.

```python
ending_favorite_number = favorites_contract.retrieve()
print(f"Ending favorite number is: {ending_favorite_number}")
```

Finally, we will run the code in our terminal:

```bash
python deploy_favorites.py
```

We will see the output:

- Transaction created
- Contract deployed
- Starting favorite number is 7 
- Storing number... 
- Ending favorite number is 5

We deployed a new contract and stored a number to it. Now we can see the effects of storing a number and retrieving it through the use of our smart contract and Titanoboa! 
