## Recap of the Section

We've learned a lot about proxies and the delegate call functionality of EVM smart contracts in this section. We've learned that you can have a contract whose fallback function will always raw call or reach out to another contract, but kind of borrow its functionality for itself.

We learned that there's a very specific implementation slot that we need to use if we want to follow the EIP 1967 guidelines. We learned that we made some gaps in our smart contract in order to reach that specific slot.

We learned how to upgrade to a new implementation slot. We didn't work with change admin, but this one is pretty self-explanatory. We were able to see with our little deploy script what deploying and upgrading a contract with a proxy looks like.

```python
from src import ERC1967, counter_one, counter_two
import boa
import warnings

def deploy():
  implementation = counter_one.deploy()
  proxy = ERC1967.deploy_implementation(implementation.address, boa.env.eoa)

  with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    proxy_with_abi = counter_one.at(proxy.address)

  proxy_with_abi.set_number(77)
  print(proxy_with_abi.number())
  print(implementation.number())
  print(proxy_with_abi.version())

  # Let's upgrade!
  implementation_two = counter_two.deploy()
  proxy.upgrade_to(implementation_two.address)

  with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    proxy_with_abi = counter_two.at(proxy.address)

  print(proxy_with_abi.number())
  proxy_with_abi.decrement()
  print(proxy_with_abi.number())
  print(proxy_with_abi.version())

def moccasin_main():
  deploy()
```