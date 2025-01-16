## AI Prompting for Smart Contracts

AI can be extremely helpful when dealing with smart contract code, and we'll be looking at how it can be used in this lesson.

The first thing we can do is use an AI to help explain what we are looking at, particularly if we're confused. Let's look at an example:

```python
@external
@view
def get_price() -> int256:
  price_feed: AggregatorV3Interface = AggregatorV3Interface(0x69444A1769357215DEA6AC081bf1f130939a0dC25306)
  # ABI
  # Address
  return staticcall(price_feed.latestAnswer(), [])
```

If we're unsure about what the `staticcall` keyword is doing, we can copy that line of code and paste it into the AI of our choice. For this example we'll be using Claude. We'll add some context around the code and ask our AI to explain it to us.

Here's an example of what we might ask Claude:

````
Hi, I have this function:

```python
@external
@view
def get_price() -> int256:
  price_feed: AggregatorV3Interface = AggregatorV3Interface(0x69444A1769357215DEA6AC081bf1f130939a0dC25306)
  # ABI
  # Address
  return staticcall(price_feed.latestAnswer(), [])
````

This is in my Vyper smart contract. I don't understand what the `staticcall` keyword is doing. Can you help explain it to me?

````

Claude will then give us an explanation of what the keyword does, which can help us to better understand this part of our smart contract.

We can also ask Claude to write some code for us, so we can avoid having to type it all ourselves, and this can be especially helpful when we are working with more complex code. If we have a smart contract that is already written and we're looking at how it's currently being used, we can ask Claude to write a new function that takes that code, restructures it, and makes it safe for our use.

For example, if we have the following function:

```python
@external
def set_price(price: int256):
  price_feed: AggregatorV3Interface = AggregatorV3Interface(0x69444A1769357215DEA6AC081bf1f130939a0dC25306)
  # ABI
  # Address
  price_feed.setLatestAnswer(price)
````

We can copy this function, paste it into Claude and ask:

````
Hi Claude, this function:

```python
@external
def set_price(price: int256):
  price_feed: AggregatorV3Interface = AggregatorV3Interface(0x69444A1769357215DEA6AC081bf1f130939a0dC25306)
  # ABI
  # Address
  price_feed.setLatestAnswer(price)
````

This is in my Vyper smart contract. I would like to make it so that this function can be called by a `staticcall`. Can you help me write a new function that does that?

```

Claude will then write a new function that takes the existing code, restructures it, and uses the `staticcall` keyword so that it is safe for our use.

As we progress through this course, we will be learning a lot about smart contracts, but often the hardest part is knowing when to ask for help. We'll be doing everything in our power to avoid that!
```
