## Workshop

We have a few workshops for you. 

The first is to deploy your contract to your Tenderly virtual network. We'll be using a `mocassin.toml` file for this. To add a new network, you'll need to create a new array within the networks key. For example, to deploy to Tenderly you can create a new network named `our-fake-chain` and then add the necessary keys and values. 

```toml
networks.our-fake-chain
```

Next, we'll write our own deploy script and deploy to the PyVM network.  To do this, we can create a new file called `my_deploy.py` within the `script` folder. Here's some boilerplate code to get started:

```python
def deploy_me():
  print("Hello!")

def moccasin_main():
  return deploy_me()
```

We can test this with the following command:

```bash
mox run my_deploy
```

The output should be:

```bash
Hello!
```

We can also write a deploy script and deploy to the EraVM network. To do this, we'll use a `--network EraVM` flag. 

```bash
mox run my_deploy --network EraVM
```

The final workshop is to write a new test in your test file and run it. You can do this in the `test_favorites.py` file. 

For our final example, we'll be using the `buy_me_a_coffee.vy` contract. The first thing you need to do is get the price of a different asset using Chainlink price feeds on your fake chain. We have a function called `get_eth_to_usd_rate` that we can repurpose for this.

We can rename the function to `get_rate`.

```vyper
def get_rate(eth_amount: uint256) -> uint256:
  return self.get_eth_to_usd_rate(eth_amount)
```

The second workshop is to write a function to get the total amount of funds in the contract. We can use a loop and the `funders` array to accomplish this.  

```vyper
def get_total() -> uint256:
  return self.balance
```

Finally, we'll write a function that allows you to change the owner of the contract. Remember, our owner at the top is immutable, so we'll need to remove this to create our function.

```vyper
OWNER: public(immutable(address)) 
```

We need to make the `OWNER` variable mutable.  We can do that by removing the `immutable` keyword.

```vyper
OWNER: public(address)
```

You should spend no more than 30 minutes working on these workshops. If you get stuck, you can use an AI assistant to help you. If you still can't figure it out after 30 minutes, take a break and come back to it later.  
