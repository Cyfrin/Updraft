## Updating our Immutables and Constants

We'll finally now move on to the immutables and the constant variables here. So, down here we have these different values: minimum USD, price feed, owner, funders, etc. Now, as of today, these are all what's known as storage variables.

Storage variables can be very gas-intensive to work with. Every time we read or write to a storage variable, it costs a lot of gas. We're going to learn about storage much later in the course. So, for now, just think of any time a variable isn't ever going to change, and you want to think about how making it a constant or immutable.

Constant and immutable variables mean that they can never be changed. However, they are way more gas efficient for a whole bunch of reasons. And, we can even test this out. So, let's take this minimum USD. Now, minimum USD, we set to $5, and then we never change. So, what we could do is we could set this minimum USD to be a constant. So, we could say:

```python
public constant uint256
```

And, the convention for constant variables is to have constant variables be all upper case. So, we would do MINIMUM_USD, and then since it's constant, we don't set it in the constructor down here anymore. We would have to set it right up here. So, we would say MINIMUM_USD, public constant uint256 equals as wei value (5, "ether"), and then we would delete this line here.

Now, constant variables are not considered storage variables, which is another reason why we have them all updated. Both constants and immutables are not storage variables. Again, we'll learn about storage much later. And, since it's not a storage variable, we scroll down. We no longer have to reference it with self.minimum USD. This self when we do this self.minimum USD, we're usually referring to storage variables or functions. Since MINIMUM_USD is a constant, we can actually just refer to it like this in all caps here.

Is there any other place where we have minimum USD? Nope, that's it. Okay, great, we can just leave it like that. Okay, the next, the price feed. So, price feed we set one time, and we never update it again.

So, can we set the price feed to be constant? Well, we could if we were always using the same price feed. So, I could do:

```python
constant aggregator V interface
```

equals aggregator V interface, wrapped around this address here. However, this would assume that we're always going to use this address. Now, the price feed for the Ethereum USD price is going to be different on different chains. So, we don't actually want this to be constant. What we want it to be is immutable. So, let me undo everything I just did with command Z or control Z. So, instead of constant here, we could make this immutable. So, to set this as immutable, we would go:

```python
immutable aggregator V interface
```

And then, now, same thing, price feed, we would do from lower case to all upper case. PRICE_FEED.

Because, this is also not stored in storage. Now, what we can do though is right in our constructor, we can set price feed equals aggregator V interface, the price feed that we pass in. This way, whenever we deploy this, we will update the price feed with whatever address that gets passed in here. This way, when we deploy this contract on different chains, we can use different price feed addresses on those different chains and leave the contract as such. So, now I can scroll down. Let me look for any spots that we refer to the price feed. Same thing here, static call self.price feed . latest answer. We would just do the immutable PRICE_FEED instead.

Let me remove these comments as well. Okay, great. So okay, so this one's a constant because it's always going to be five, no matter what. This one's immutable because it's going to be different depending on the chain that we're on. But, once we figure out what it's going to be, it's always going to be the same.

The owner, hm, what should the owner be? Well, if we change accounts, the owner is probably going to be different depending on when we change it. So, the owner we probably want to be immutable as well. So, we say immutable, and then same thing. We're going to make this upper case, OWNER. We scroll down here. Now instead of self.owner we're just going to say OWNER.

Now we can scroll down some more, let's look for any spot we refer to OWNER. Okay, great, right here. OWNER, self.owner is now just OWNER. Let's look for some more. Nope, looks pretty good. Okay, great.

Do a little clean up here, these comments. Okay, so these are going to be constants and immutables. Okay, great. What about the funders dynamic array? Is this ever going to change? Well, yes. Every single time a funder funds, this is going to get updated. So, this we have to keep as a storage variable. Storage.

What about funder to amount funded? Is this ever going to change? Yes. Same thing. Every single time a funder funds or we withdraw money, this is going to change. So, we're going to leave these as not constants and not immutables.
