## Calling External Contracts in Vyper

We are going to make sure that we use the proper keyword when we call external contracts. In Solidity, it's pretty straightforward. We just call an external contract. However, Vyper, we need to use a specific keyword. If we are calling a view function or don't want to change any state, we use `staticcall`. Otherwise, we use `extcall`, which stands for external call.

We will use the following code block to demonstrate how to call an external contract using `staticcall` in Vyper.

```python
price_feed: AggregatorV3Interface = AggregatorV3Interface(0x6944AA1769357215DE4FAC081bf1f309aDC325306)
return staticcall price_feed.latestAnswer()
```

So, in this code block, we're first defining a variable called `price_feed` and setting it to an object of type `AggregatorV3Interface`. Next, we are saying that we want to return the value returned by the `latestAnswer` function, which is a view function in this case. We use `staticcall` since we are calling a view function. This means that we are not going to change any state in our contract.
