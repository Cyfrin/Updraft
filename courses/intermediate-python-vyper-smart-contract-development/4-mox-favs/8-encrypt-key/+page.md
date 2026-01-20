## Encrypting a Private Key

We've learned how to encrypt our keys back when we were using Python, but Mocassin has its own way to handle encryption. 

We can find it in the documentation under the **Wallet** section. 

We'll use the `wallet import ACCOUNT_NAME` command to create a keystore file in the default keystore directory. 

The command will then prompt us to enter our private key and password. 

The example command is as follows:

```bash
mox wallet import my_account
```

Let's look at the different commands available to us in the `wallet` section:

```bash
mox wallet --help
```

This shows a list of commands, including:

* `list (ls)`: This will list all of our accounts. 
* `generate (g, new)`: This will create a new account with a random private key. 
* `import (i, add)`: This will import a private key into an encrypted keystore.
* `view (v)`: This will view the JSON of a keystore file.
* `decrypt (dk)`: This will decrypt a keystore file to get the private key.
* `delete (d)`: This will delete a keystore file.

We'll use the `import` command to encrypt our key. To do this, we'll copy the private key for the Anvil account and run this command in our terminal:

```bash
mox wallet import anvil1
```

The terminal will then ask us to enter our private key. We'll paste the copied key into the terminal and press Enter. 

The terminal will then ask us to enter a password to encrypt our key. We'll enter a password and confirm it. The terminal will then show:

```bash
Saved account anvil1 to keystores! 
```

This will save the encrypted account to our keystore.

Now, if we want to view the accounts we have, we can run:

```bash
mox wallet list
```

The terminal will show us all accounts we have saved in our keystore.

We can also use the `view` command to see the JSON of a specific keystore. For example:

```bash
mox wallet view anvil1
```

This will show the JSON for the `anvil1` keystore. We'll see the address of the account and the encrypted key. 
