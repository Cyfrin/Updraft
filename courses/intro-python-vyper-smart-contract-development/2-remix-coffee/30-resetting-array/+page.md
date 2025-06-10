## Resetting a Dynamic Array

We are looking to keep track of all the funders in our contract. We can set this up as a fixed-size array, but it is probably going to be better for us to use a dynamic array. Let's make this a public dynamic array of addresses with a max size of, let's say, 1,000. This means there will be a maximum of 1,000 addresses we can have as funders. If we have more funders, our contract will kind of break, but let's just hope that we don't get too many people who want to buy us coffee.

We'll scroll down to our fund function and we'll keep track of this funder here, whoever funds us. We'll say:

```python
self.funders.append(msg.sender)
```

So, we're going to say, hey, in our funders dynamic array, we'll just append, we'll just add to the list, the message.sender, whoever calls this fund function.

Great, and then when we call withdraw, we probably want to reset the funders, maybe we don't, but I want to reset the funders every time I call withdraw. We can do this really easily with dynamic arrays which is part of the reason why I'm using a dynamic array. We can just say:

```python
self.funders = []
```

Boom! That's it.

This is how you identify an empty array. So self.funders equals this, means it's an empty array, and it is essentially reset.
