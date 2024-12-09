Proxies are very useful in smart contract development. They allow us to upgrade the logic of our contract without changing the address of the contract. This is helpful for several reasons:

* When we need to fix bugs
* When we need to add new functionality
* When we want to change the logic of the contract without affecting the users who have already interacted with it.

Here's an example of how proxies work:

1. We deploy a proxy contract, which is a special contract that acts as a middleman between the users and the actual logic of our contract.
2. We deploy a logic contract, which contains the actual logic of our contract.
3. We set the proxy contract to point to the logic contract.
4. When users interact with the proxy contract, the proxy contract will forward the call to the logic contract.
5. To upgrade the logic of our contract, we simply deploy a new logic contract with the updated logic and then update the proxy contract to point to the new logic contract.

We'll use the `counter` contract as an example. 

We'll show how to upgrade from version 1 to version 2:

**Code:**

```python
def deploy():
  implementation = counter_one.deploy()
  proxy = ERC1967.vy_deploy(implementation.address, boa.env.eoa)

  with warnings.catch_warnings():
    warnings.simplefilter('ignore')
    proxy_with_abi = counter_one.at(proxy.address)
    proxy_with_abi.set_number(77)
    
  print(proxy_with_abi.number())
  print(implementation.number())

  print(proxy_with_abi.version())

  # Let's upgrade!
  implementation_two = counter_two.deploy()
  proxy.upgrade_to(implementation_two.address)

  with warnings.catch_warnings():
    warnings.simplefilter('ignore')
    proxy_with_abi = counter_two.at(proxy.address)
    
  print(proxy_with_abi.number())

  proxy_with_abi.decrement()

  print(proxy_with_abi.number())
  print(proxy_with_abi.version())

def moccasin_main():
  deploy()

moccasin_main()

```

This code will:

1. Deploy a `counter_one` contract
2. Deploy a proxy contract `ERC1967.vy` pointing to `counter_one`
3. Set a number `77`
4. Print the version of `counter_one`
5. Deploy a `counter_two` contract
6. Upgrade the proxy to point to `counter_two` 
7. Print the current number
8. Decrement the number using `counter_two` and print the number again
9. Print the version of `counter_two`

**Running the Code:**

```bash
mox run deploy 
```

**Output:**

The terminal output will show the current number, which will be `77`, followed by the decremented number, which will be `76`, and the version of the contract, which will be `2`.

This example shows how we can upgrade the logic of our contract without affecting the users who have already interacted with it. Proxies are a powerful tool that can be used to make smart contracts more flexible and maintainable. 
