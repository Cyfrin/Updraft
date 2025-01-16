## Decrypting your keys in Python

In this lesson, we'll learn how to decrypt your private keys in Python. This is a crucial step in the development process to ensure your keys are secure and can be used for blockchain transactions.

Let's begin by going back to our "deploy_favorites_unsafe.py" file and scrolling to the bottom. 

We'll create a new function:
```python
def decrypt_key():
    pass
```

The first thing we'll need is the keystore path. We'll import it from the "encrypt_key.py" file that we've already written. 
```python
from encrypt_key import KEYSTORE_PATH
```

Then in our "decrypt_key" function, we'll start by opening the keystore file using the "with open" statement to ensure that the file is closed automatically when we're finished. 

We'll open the file in "r" mode for reading:
```python
with open(KEYSTORE_PATH, "r") as fp:
    encrypted_account = fp.read()
```

Now, we need a password to decrypt the key. We'll use the "getpass" module to prompt the user for their password, but since this module does not work on WebAssembly platforms, we'll import the "getpass" module from the "encrypt_key.py" file:
```python
from encrypt_key import getpass
```

Next, we'll prompt the user to input their password:
```python
password = getpass.getpass("Enter your password: ")
```

Now we can decrypt the private key using the "decrypt" method from the "eth_account" module, which we've already imported.

```python
key = Account.decrypt(encrypted_account, password)
```

We'll then print out a message to confirm that the private key has been decrypted:
```python
print("Decrypted key!")
```

Finally, we'll return the decrypted key:
```python
return key
```

This "decrypt_key" function will now act as our secure way to decrypt the private key. Let's go back up and see where we were reading in the private key in the "deploy_favorites_unsafe.py" file. 

Currently, we are using `os.getenv` to get the private key, but this is a dangerous practice as it could easily be exposed.  

We want to change this and use our "decrypt_key" function instead to decrypt the private key securely.

Let's pull up the terminal. 
```bash
source .venv/bin/activate
```

We'll then run our "deploy_favorites.py" file. 
```bash
python deploy_favorites.py
```

The terminal will now prompt us to enter our password. We'll enter the same password we used to encrypt the private key. We'll then see a message confirming that the contract has been deployed.

We can also see a successful transaction in Anvil. 

The reason we went through all of this is because it's important to always have a secure way to encrypt and decrypt your private keys.  You will get people who will tell you, "Oh, it's too hard to encrypt your private key. So we're just going to skip it." And your alarm bells should go crazy, and you should say, "This person is a noob. They are a noob. I need to encrypt my private key. I'm not going to leave it in plain text. How dare you recommend that I do that, okay?" There's always a way to encrypt and decrypt your private keys. If a tool doesn't have support for it, that's an issue. 
