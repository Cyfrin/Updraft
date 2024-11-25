## Section: Moccasin Favorites

We are now on what I think is going to be one of my favorite sections of the whole course because we will be introducing you to the **Moccasin** tool. 

Moccasin is a smart contract development framework that will help us:

*   Deploy
*   Test
*   Maintain
*   Write professional code

The **Moccasin** tool is going to be the main tool we work with throughout the rest of this course, as well as **Advanced Moccasin**.  We will have a brief stop to learn about HTML/JavaScript.

Let's take a look at what we will be learning in this section and why we are taking this final step to learn and grow as smart contract developers. 

We will be working with the **favorites.vy** contract. 

This contract is a simple contract, but it will help us learn how to use **Moccasin**. 

Now, in the last couple of sections, we ran into a few problems when we were trying to deploy and test our smart contracts:

*   We had to write a separate Python script for every network that we wanted to work with.
*   We did not have any tests, so we had no way to verify that our contracts were working correctly.

**Moccasin** makes our lives easier by providing us with a way to:

*   Deploy our contracts to any network with just a few lines of code
*   Write tests directly in **Moccasin**
*   Automatically verify our contracts on a blockchain explorer

Let's see how **Moccasin** works in practice.

We will first open our terminal and run the following command to deploy our contract to the **pyevm** network: 

```bash
mox run deploy
```

Now, let's look at the code for the **deploy.py** script: 

```python
from src import favorites
from moccasin.boa.tools import VyperContract
from moccasin.config import get_active_network

def deploy_favorites() -> VyperContract:
    active_network = get_active_network()
    print("Currently on network:", active_network.name)
    favorites_contract: VyperContract = favorites.deploy()
    print("Starting favorite number:", favorites_contract.retrieve())
    favorites_contract.store(77)
    print("Ending favorite number:", favorites_contract.retrieve())

    if active_network.has_explorer():
        print("Verifying contract on explorer...")
        result = active_network.mocassin.verify(favorites_contract)
        result.wait_for_verification()
        print(f"https://{active_network.explorer.explorer_uri}/address/{favorites_contract.address}")

    return favorites_contract

def moccasin_main() -> VyperContract:
    return deploy_favorites()
```
We can also change networks by using the **--network** flag. For example, to deploy our contract to the **Anvil** network, we would run the following command:

```bash
mox run deploy --network anvil
```

In the future, we can deploy to other networks like **zkSync** or **Ethereum**.

**Moccasin** is a powerful tool that will help us to write professional smart contracts. 

We will also learn how to use the **pyproject.toml** file to configure our projects. 

We will also learn how to add different network information to the **mocassin.toml** file. 

Let's get started learning **Moccasin**. 
