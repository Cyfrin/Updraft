## Type Hints for Python in Moccasin

We are continuing to shape up our project. We have a few files that we're not entirely sure what they do yet, but we'll learn about them in later sections. We do have a `deploy.py` file that looks very good. We are able to deploy a contract. It doesn't matter what chain it's on because we can use the `--network` flag to easily switch.

```bash
uv deploy
```

Our Vyper code is what's known as statically typed, or strongly typed, because every single variable in Vyper has to have a type associated with it. This is incredibly important for smart contracts, because smart contracts are very specific. If something goes wrong or unexpected in your smart contract, you could lose a lot of money. Our Python code, by contrast, doesn't have to have types.

If you went through the Python Crash Course, you know that we did talk about type hinting in Python. Python does have a type hinting system. We're going to go ahead and say that we should do the same thing. We should add type hints to our Python. However, this is 100% optional. So, this one here is 100% valid Python, but we could also add type hints. The reason that I like type hints in Python is because this `favorites_contract` object, we might not know what functions are associated with it, or, you know, maybe we'd run like `favorites_contract` equals 7 and then I'd try to do `favorites_contract.store`, you know, 42 or 40 and this no longer works because `favorites_contract` is now a number and it's no longer a contract object. So, I like adding type hints. And additionally, type hints make kind of debugging and working through your code a lot easier sometimes. So, this will be optional, but I am going to go ahead and take this time to add some type hints to this. So let's go ahead and get started. So, this `favorites_contract` right here, `from src import favorites`, we know that this `favorites` object is of type Vyper deployer. And any time we import some contract like this, we know that this is going to be a Vyper deployer. When we call `VyperDeployer.deploy` it's going to return a type Vyper contract or, and this is how you do `or` to do different types, or ZK sync contract. But for us, we're just going to do a Vyper contract. Now you'll get this little yellow squiggly line because Vyper, because our Python is going, hey, uh what is this Vyper contract you're talking about, I don't know what this is.

Now we can get this Vyper contract from a couple different places. We can get it directly from Titanoboa or Moccasin has actually some built-in ways to get this Vyper contract much quicker. So, we can say `from moccasin.boa.tools import VyperContract`. And, you might even get this little yellow squiggly line because our VENV, if we go back to our `pyproject.toml`, we don't have Moccasin in here. So, we could just simply do `uv add moccasin` if we want to be more specific. We could say `mocassin ==` and then, you know, whatever version what version do we have in here? And then scroll down this 0.3 point whatever enter, and then for this one in particular, I have to do this `--prerelease-allow`. You might not have to do that. Okay, we added that in here. Now in our `deploy.py` file, we see that those little squigglies go away because our Python project now knows that this Moccasin tool exists. So cool, so this is of type Vyper contract and in Vias code, if you hit Command Click or Control Click, like we said, you can actually see the code of the Vyper contract, or the class Vyper contract, which if you took the Python Crash Course, you haven't learned about classes yet. Don't worry about it. Okay, next, `starting_number`. This `favorites_contract.retrieve`, it's going to be what, it's going to be an `int`. Great. `favorites_contract.store`. There's no typing there. `ending_number` is going to be an `int`. Okay, great. And then, we return a `favorites_contract`. So, since we're returning something, we should add a type hint to our function definition. And actually, just like Vyper, how Vyper does this little arrow and then the type, we're going to do the same thing. We're going to do a little arrow and this is a Vyper contract, so we'll say arrow `VyperContract` like this.

```python
from src import favorites
from moccasin.boa.tools import VyperContract

def deploy_favorites() -> VyperContract:
    favorites_contract: VyperContract = favorites.deploy()
    starting_number: int = favorites_contract.retrieve()
    print(f"Starting number is: {starting_number}")
    favorites_contract.store(77)
    ending_number: int = favorites_contract.retrieve()
    print(f"Ending number is: {ending_number}")
    return favorites_contract
```

And even if we wanted to we could have our `mocassin_main` return a Vyper contract and we could just say `return deploy_favorites` like this. Great. And now we have type hints in here.
