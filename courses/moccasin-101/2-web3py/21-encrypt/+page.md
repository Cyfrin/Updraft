## Encrypting Your Keys in Python 

We'll learn how to encrypt our private key so that we don't ever have to store it in plain text. We'll use tools that will automatically do this encryption for us later on, but let's learn how to do it manually. 

We'll start by creating a new file called `encrypt_key.py`:

```python
if __name__ == "__main__":
  main()
```

```python
def main():
  pass
```

We'll create a `main()` function. 

Now, this `encrypt_key.py` file is going to be how we encrypt our key. To encrypt it, we're going to use the Python built-in tool called `getpass`. 

We'll start by removing any references to our private key in a `.env` file. 

Next, we'll import the `getpass` library:

```python
import getpass
```

In our `main()` function, we'll use `getpass.getpass()` to prompt the user for their private key:

```python
def main():
  private_key = getpass.getpass("Enter your private key: ") # input()
```

This is similar to the `input()` command in Python.

We'll then create an Eth account using the `eth_account` library that comes bundled with Web3.py:

```python
from eth_account import Account
```

```python
def main():
  private_key = getpass.getpass("Enter your private key: ") # input()
  my_account = Account.from_key(private_key)
```

We'll then ask the user for a password to encrypt the private key:

```python
password = getpass.getpass("Enter a password:\n") # input()
```

We'll use the `\n` character to create a new line for the password prompt.

We'll encrypt the private key using the password and the `Account` object we created:

```python
encrypted_account = my_account.encrypt(password)
```

We'll then save the encrypted account to a file. To do this, we'll use the `pathlib` library that comes bundled with Python:

```python
from pathlib import Path
```

We'll create a path object to specify the path to our encrypted keystore:

```python
KEYSTORE_PATH = Path("keystore.json")
```

We can then use the path object to open the file and save the encrypted account using the `json` library that comes bundled with Python:

```python
import json
```

```python
with KEYSTORE_PATH.open("w") as fp:
  json.dump(encrypted_account, fp)
```

To ensure that our encrypted keystore is not accidentally committed to version control, we should add it to our `.gitignore` file. 

We can now run our script from the terminal:

```bash
python encrypt_key.py 
```

We'll be prompted to enter our private key and then a password. Once we enter both, the script will save our encrypted private key to the `keystore.json` file.

**Tag:** JSON object, keystore file, encrypt private key, `getpass`, `pathlib`, `json` 
