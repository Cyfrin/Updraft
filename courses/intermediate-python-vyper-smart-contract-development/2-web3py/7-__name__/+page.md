## Deploying our contract to the blockchain

We are going to learn how to compile Vyper in a script and deploy it to a blockchain. First, we are going to create a new file called `deploy_favorites.py`. This is going to be our Python file for actually deploying our smart contract to a blockchain.

Here is a bit of a Python tip: in Python, whenever you call a file (for example, when we did `python3.11 basic_python.py` from the last course or from the last section, or if we ran `python3.11 hello.py` or even if we did `uv run python hello.py`), we might see a pop up. We will fix our Python environment in just a second; for now, feel free to just hit that X there.

But you will see `Hello from web3py-favorites-cu` or whatever you have in your `hello.py`. You will see, actually, UV gave us this weird template:

```python
if __name__ == "__main__":
    main()
```

If `__name__ == "__main__":` this string main calls the main function, which prints this out. Whenever you run a file, you essentially say, "hey, make the name that you are looking to call `__main__`."

So typically we like to be very explicit when we are coding in a more professional environment. So we are actually going to follow this same convention in our `deploy_favorites.py`.

We are going to close everything here and I am going to paste this line in here:

```python
if __name__ == "__main__":
    main()
```

Now, these double underscores are also known as dunder names or double underscore names. This is called `__name__` and this is called `__main__`, which means double underscore, so, double underscore name and double underscore main. If `__name__ == "__main__":` run main. We will create a little `def main`:

```python
def main():
    print("Hello from deploy_favorites.py")
```

And to make sure this is working, we can do a little `print`:

```python
print("Hello from deploy_favorites.py")
```

And you can see right there, actually, this is my GitHub Copilot giving me a suggestion. And since I want to take it, I'm going to go ahead and hit tab to add it to my file. Then, of course, hit command s or control s to save. And we can get rid of the pass line now.

To make sure this is working, we can run:

```bash
uv run python deploy_favorites.py
```

and we should get `Hello from deploy_favorites.py`.

But, if you get sick of always doing `uv run python`, we can also, once again, do `uv venv`:

```bash
uv venv
```

We can then do this line (I'm just going to copy and paste it):

```bash
source .venv/bin/activate
```

Now, we have our virtual environment setup. And now we can just run:

```bash
python deploy_favorites.py
```

and I can just hit tab to auto complete. And we get a `Hello from deploy_favorites.py`. Great!