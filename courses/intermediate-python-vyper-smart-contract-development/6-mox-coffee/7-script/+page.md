## Deploying our Smart Contract

We have now written our smart contract code. Now, we need to give it some scaffolding. We will write some scripts so that we can deploy this and some tests so that we can make sure our code is working correctly. 

First, we will write our deploy script.

**Code:**

```python
def moccasin_main():
    deploy_coffee()

```

To ensure that everything is working, we will run our deploy script.  First, we will run this command in the terminal.
```bash
& mox run deploy
```

Now, we need to figure out what our script needs to deploy the contract. In this example, we are working with a contract called `buy_me_a_coffee`.  
 
First, we need to figure out which network we are working with.  We can import the `get_active_network` function from the `mocassin.config` module.
**Code:**
```python
from moccasin.config import get_active_network

def deploy_coffee():
    print("Hi from deploy")

def moccasin_main():
    active_network = get_active_network()
    deploy_coffee()
```

We can use the `get_active_network` function to get information about our network.

**Code:**
```python
from moccasin.config import get_active_network
from src import buy_me_a_coffee

def deploy_coffee(price_feed: str):
    buy_me_a_coffee.deploy(price_feed)

def moccasin_main():
    active_network = get_active_network()
    deploy_coffee()

```

Next, we need to get our price feed. In our case, the price feed needs to change based on the network.  We will use conditional statements to decide which address to use.

**Code:**

```python
from moccasin.config import get_active_network
from src import buy_me_a_coffee

def deploy_coffee(price_feed: str):
    buy_me_a_coffee.deploy(price_feed)

def moccasin_main():
    active_network = get_active_network()
    price_feed = ""
    if active_network.name == "sepolia":
        price_feed = "0x69444A1769357215DE4FAC081bf1f1309aDc325306"
    # if active_network.name == "mainnet":
    #     price_feed = ""
    deploy_coffee(price_feed)

```

In the code above, we have set up the `price_feed` address based on the network. This is the code we would have to write for every network.  We could also just set it up like this:
**Code:**

```python
from moccasin.config import get_active_network
from src import buy_me_a_coffee

def deploy_coffee(price_feed: str):
    buy_me_a_coffee.deploy(price_feed)

def moccasin_main():
    active_network = get_active_network()
    price_feed = ""
    if active_network.name == "sepolia":
        price_feed = "0x69444A1769357215DE4FAC081bf1f1309aDc325306"
    deploy_coffee(price_feed)
```
This is a pretty inefficient way to manage the price feed address. This is where we will learn about forking and other techniques for testing our code. 
