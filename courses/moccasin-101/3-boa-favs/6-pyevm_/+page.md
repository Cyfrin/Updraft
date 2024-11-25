We will learn about how a simple Python script interacts with a blockchain. 

We will use a library called boa to help us with this process.  

Let's create a Python script file called `deploy_favorites_pyevm.py`:

```python
import boa

def main():
  print("Let's read in the Vyper code and deploy it!")
  favorites_contract = boa.load("favorites.vy")
  starting_favorite_number = favorites_contract.retrieve()
  print(f"The starting favorite number is: {starting_favorite_number}")
  favorites_contract.store(5) # This sends a transaction!
  ending_favorite_number = favorites_contract.retrieve()
  print(f"The ending favorite number is: {ending_favorite_number}")

```

Now, we can run this Python script:

```bash
python deploy_favorites_pyevm.py
```

This will generate the output in the terminal. Let's break down what is happening here step by step: 

First, we will import the `boa` library:
```python
import boa
```

We will then define a `main` function:

```python
def main():
```

Next, we will print a message stating what we are doing:

```python
  print("Let's read in the Vyper code and deploy it!")
```

We'll then load a Vyper smart contract file called `favorites.vy` and assign it to a variable called `favorites_contract`:

```python
  favorites_contract = boa.load("favorites.vy")
```

We'll call the `retrieve()` function from the `favorites_contract` and store the output in a variable called `starting_favorite_number`:

```python
  starting_favorite_number = favorites_contract.retrieve()
```

We'll print the `starting_favorite_number` to the terminal:

```python
  print(f"The starting favorite number is: {starting_favorite_number}")
```

Then, we will store a value of 5 using the `store()` function from the `favorites_contract`:

```python
  favorites_contract.store(5) # This sends a transaction!
```

After the transaction, we will call the `retrieve()` function again and store the result in a variable called `ending_favorite_number`:

```python
  ending_favorite_number = favorites_contract.retrieve()
```

We'll then print the `ending_favorite_number` to the terminal:

```python
  print(f"The ending favorite number is: {ending_favorite_number}")
```

We will then close the `main` function:
```python
```

Finally, we will run this Python script:
```bash
python deploy_favorites_pyevm.py
```

This script will interact with the blockchain. Now if we run this again, we still see the starting favorite number is seven, the ending favorite number is five. So, uh but wait, what if I run it again? Well, the starting favorite number is still seven and the ending favorite why isn't the starting favorite number now five? Well, so here's what happens when we actually run this script. When we call Python deploy favorites pyevm.py The first thing Titano Boa does is it says, hey, let's spin up this fake pyevm chain. It's smart enough to know, oh, okay. We didn't give it an RPC, we don't have any accounts, let's just we'll make a fake chain like it's fine. Then, we do this favorites_contract equals boa.load favorites.vy. And in this pyevm chain in this kind of fake chain It'll deploy the contract with whatever the variables are in here. Right? So we have my favorite number equals seven, so it'll go great. My favorite number is seven in here. Or favorite number is seven. Then we go, hey, favorites_contract.store(5). And it goes great, no problem. And it updates my favorite number to five. And then the script ends. And Titano Boa goes, okay, great. Let's delete the chain. Everything's deleted. So that means the next time we run this script, we will do the exact same process. We'll spin up a fake chain. We'll deploy the contract, we'll store, and then we'll delete it. So this is why every time we run this script The favorite number starts with seven. Now this is because every single time we're running this boa.load In the future, you'll probably not want to deploy the same contract over and over and over again to a real chain. You'd probably just want to interact with whatever contract was deployed most recently. And we'll learn some tools to interact with and get the most recent deployed contract. But again, for now, since we're just testing, this is what the process looks like. Boa spins up a new chain. We deploy a contract to it. We update the storage, or the state value favorite number, and then we delete the whole chain. Okay. Great. 
