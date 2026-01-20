## Using an encrypted key in your moccasin script

We've already encrypted a private key in our Moccasin project and have the following in our `mocassin.toml` file.

```toml
[project]
src = "src"

[networks.anvil]
url = "http://127.0.0.1:8545"
save_to_db = false
prompt_live = false
```

Now we can run this script. We can do

```bash
mox run deploy --network anvil
```

We can also add the following to our command:

```bash
mox run deploy --network anvil --account anvil1
```

Moccasin knows that `anvil1` is one of the accounts that we have encrypted. When we hit enter we are prompted to enter our password for the keystore. We'll enter our password and you'll notice that it doesn't show our password. When we hit enter, it decrypts our key and sends the transactions. We can see that we have some transaction activity on the Anvil chain.  This is very exciting! 
