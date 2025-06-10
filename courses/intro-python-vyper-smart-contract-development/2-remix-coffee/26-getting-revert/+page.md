## Getting a Revert

In this lesson, we are going to learn how to get a revert. We'll test out this revert to ensure that our code is working as intended. We'll use a fake blockchain network, Remix, and a smart contract for this example.

### Testing our Revert

We are going to use the smart contract we created in previous lessons to test our revert. We'll first deploy the contract to our fake blockchain network.

Let's test our smart contract! We need to check if the revert function is working correctly. We need to see what happens when people don't send enough money to the contract.

#### Making a Transaction

We can use a website like eth-converter.com to determine how much Wei we need to send to the contract in order to meet the required minimum value. Let's use 2000000000000000 Wei, which is $6.53.

Now let's copy this Wei value and paste it into the `get_eth_to_usd_rate` function in Remix.

We'll now go ahead and click on the `fund` button on the Remix interface.

#### The Revert

You will notice that we are getting an error: `Gas estimation failed`, `Transaction execution will likely fail`. Let's go ahead and click on the `Send Transaction` button. 

Now that the transaction has been sent, we can go ahead and use the drop-down menu to view the transaction details. We can see that the transaction has been `mined` but that the `execution failed`.

This error happens because we are not sending at least 5 USD to the contract. The `assert` function was designed to stop the execution of the transaction if the user is not meeting the minimum value. This is called a `revert`.

Our `assert` function is working exactly as it should!

```python
assert usd_value_of_eth >= self.minimum_usd, "You must spend more ETH!"
```

As we can see in the code, the `assert` function is used to ensure that the user is sending at least 5 USD. If the user doesn't meet this requirement, then the `revert` message is triggered.

We've now demonstrated what a `revert` looks like in practice. We'll learn more about reverts and how to handle them in future lessons. 
