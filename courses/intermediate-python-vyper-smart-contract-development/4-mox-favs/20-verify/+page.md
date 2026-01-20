## Verifying Already Deployed Contracts 

We can verify a smart contract that's already been deployed using the `Deployer` object. We will use the `at()` method. The `at()` method is a static method used to interact with a contract that has already been deployed.

We can verify a deployed contract by grabbing the contract's address and using it in the `at()` method. 

### Verifying a Smart Contract

We can verify the deployed *favorites* contract in the `deploy.py` file: 

```python
favorites_contract = favorites.at("0x4C7EE301AC56BDaE56B95FB4a6Dc2e26D0D9DC350") 
result = active_network.has_explorer()
if result == active_network.mockchain:
    result.wait_for_verification(favorites_contract)
```

The code above shows how to verify a previously deployed smart contract. We can copy the contract address from the Blockscout website and use it to interact with the contract. Then, we can use the `wait_for_verification()` method to verify that the contract has been successfully verified.

We can add code that verifies a deployed smart contract in the `deploy.py` file:

```python
def deploy_favorites() -> VyperContract:
    favorites_contract: VyperContract = favorites.deploy()
    starting_number: int = favorites_contract.retrieve()
    print(f"Starting number is: {starting_number}")
    favorites_contract.store(77)
    ending_number: int = favorites_contract.retrieve()
    print(f"Ending number is: {ending_number}")
    active_network = get_active_network()
    favorites_contract = favorites.at("0x4C7EE301AC56BDaE56B95FB4a6Dc2e26D0D9DC350")
    if active_network.has_explorer():
        result = active_network.mockchain
        result.wait_for_verification(favorites_contract)
    return favorites_contract

def moccasin_main() -> VyperContract:
    return deploy_favorites()
```

This code verifies that a deployed smart contract exists in the `favorites.py` file. We can execute the script and see that the verification is successful. The code then prints the beginning and ending numbers from the verified contract.
