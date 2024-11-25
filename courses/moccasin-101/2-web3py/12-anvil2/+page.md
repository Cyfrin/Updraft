## Working with Anvil

After installing Anvil, we can run it from the terminal. 

```bash
anvil --version
```

We will get an output similar to this:

```
anvil 0.2.0 (31c2400 2024-11-14T00:20:56.057504000Z)
```

Next, we can run the following command:

```bash
anvil
```

And we will see the output of a running fake Ethereum blockchain node. 

We can leave the Anvil instance running in the terminal. Let�s create a new terminal and work inside of it instead of the first one. 

We will copy the link that Anvil gives us and replace our Tenderly endpoint.

We will change this:

```python
w3 = Web3(Web3.HTTPProvider('https://virtual.sepolia.rpc.tenderly.co/055b353c-fac-4506-8a8e-6496278f0c86'))
```

To this:

```python
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
```

Next, we will run the following command:

```bash
python deploy_favorites.py
```

And we will see the output. 

To turn off the Anvil instance we can use **Control + C** to kill the terminal. We can also kill the terminal by closing the window. 
