## Refactoring

We've learned a couple of things since we originally wrote this code. We first learned about interfaces and how they can actually be in their own file. So, to make this code a little bit nicer, we're going to go ahead create a new folder called "interfaces". And we're going to create an interface called AggregatorV3interface.

```python
interface AggregatorV3Interface:
    def decimals() -> uint8: view
    def description() -> String[1000]: view
    def version() -> uint256: view
    def latestAnswer() -> int256: view
```

Now, the reason I'm using camel case here instead of snake case, right? I'm having these capital letters and no underscores, is because this is the name of the interface in its Solidity edition, and I'm looking to keep the same name of the interface to match what Chainlink Labs wrote for the Solidity edition of this.

But if this is confusing, you can obviously do that, I underscore, or the I methodology that we did previously. What we can't do is we can't just copy-paste this in here. We have to actually convert it to its interface edition. But, oh, man, that's quite annoying, uh, that's quite a lot of work, and I am incredibly lazy.

So let's see what our friend ChatGPT has to say. Let's give this a little prompt. I'll say, here is my inline Vyper interface:

```python
interface AggregatorV3Interface:
    def decimals() -> uint8: view
    def description() -> String[1000]: view
    def version() -> uint256: view
    def latestAnswer() -> int256: view
```

Can you convert it to a Vyper file interface? Here is an example.

```python
@external
@view
def retrieve() -> uint256:
    ...
```

You actually already know how to convert this from its edition here to its file edition, right? You you know how to do that transition. You could 100% do it manually yourself, if you want to, too. But, it's just kind of busy work, right? We're not, it's not super important, so it'd be great if AI could just do it.

So we're going to say, hey here is my inline Vyper interface:

```python
interface AggregatorV3Interface:
    def decimals() -> uint8: view
    def description() -> String[1000]: view
    def version() -> uint256: view
    def latestAnswer() -> int256: view
```

Can you convert it to a Vyper file interface? Here is an example:

```python
@external
def store(favorites_number: uint256):
    ...
@external
@view
def retrieve() -> uint256:
    ...
```

Let's see what ChatGPT gives us. To convert your inline Vyper interface into a standard Vyper file interface, you need to define the functions with the appropriate decorators for visibility (@external, @view) and specify the function signatures clearly. Here's how you can structure the AggregatorV3Interface in a Vyper file:

```python
# AggregatorV3Interface.vy
interface AggregatorV3Interface:
    @view
    @constant
    def decimals() -> uint8:
        ...
    @view
    @constant
    def description() -> String[1000]:
        ...
    @view
    @constant
    def version() -> uint256:
        ...
    @view
    @constant
    def latestAnswer() -> int256:
        ...
```

Okay. Clearly it's a little bit less up-to-date.

Oh, ChatGPT, though, is a little confused. It's come up with a new fake decorator called "constant" and it did this at the top for some reason.

Okay. Well, uh, I guess this one's closer. Let's let's use this one.

Okay, so maybe, uh AI didn't do such a great job here. But, that's okay. We're going to copy this, we're going to grab this um, and we're just going to do a find and replace.

So, I did, I gr I got this find and replace by doing command F or control F, depending on if you're Mac or Windows or Linux. And I'm going to say "pass", and we're just going to replace everything with three dots. Hit enter, save it. And that looks pretty good to me.

```python
@external
@view
def description() -> String[1000]:
    ...
```

Decimals, description, version, latest answer.

Decimals, description, latest version, answer, version, latest answer.

Okay. That looks pretty good to me. Okay, great. So let's go ahead delete this now. And now we can do, from interfaces import I'll hit tab here.

```python
from interfaces import AggregatorV3Interface
```

Yeah, I got this one, right? AggregatorV3Interface.

And, let's just make sure this works. We'll do a little "mox compile".

```bash
patrick@cu mox-buy-me-a-coffee-cu % mox compile
```

Nice. Okay, so that works.

Thanks AI. Now, let's actually get a little bit more practice working with these modules. Let's take out, let's look at this eth to USD rate. Let's take this out as an internal function.

```python
@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    ...
    return self._get_eth_to_usd_rate(eth_amount)
```

And let's turn this into a module. So, let's get some practice working with this. So, I'm actually going to delete this from the buy me a coffee. Going to go back to the SRC, new file.

We're going to do, get price module.vy. And we're going to paste this in here:

```python
@internal
@view
def _get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """

    price: int256 = staticcall PRICE_FEED.latestAnswer()
    eth_price: uint256 = (convert(price, price * uint256)) * (10 ** 18)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # $ 8.0's, 18 decimal places
```

What are the variables we need? We need a price feed in here. So, let's actually just pass it in as a variable. The price feed is of type AggregatorV3Interface. So we need that, so we'll do from interfaces import AggregatorV3Interface like this.

```python
from interfaces import AggregatorV3Interface
```

We'll pass this in as a variable. We'll say, price feed of type AggregatorV3Interface.

```python
@internal
@view
def _get_eth_to_usd_rate(price_feed: AggregatorV3Interface, eth_amount: uint256) -> uint256:
    """
    Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """

    price: int256 = staticcall price_feed.latestAnswer()
    eth_price: uint256 = (convert(price, price * uint256)) * (10 ** 18)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # $ 8.0's, 18 decimal places
```

And then we'll do staticcall price feed.latest answer.

```python
@internal
@view
def _get_eth_to_usd_rate(price_feed: AggregatorV3Interface, eth_amount: uint256) -> uint256:
    """
    Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """

    price: int256 = staticcall price_feed.latestAnswer()
    eth_price: uint256 = (convert(price, price * uint256)) * (10 ** 18)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # $ 8.0's, 18 decimal places
```

Buy me a coffee. We also have this precision variable. Let me look for this in any other place. It looks like this is the only line. It looks like it was only used in the function, so we're going to take that out.

```python
PRECISION: constant(uint256) = 1 * (10 ** 18)
```

We're going to paste that in here as well.

```python
PRECISION: constant(uint256) = 1 * (10 ** 18)
```

And this is looking pretty good. Now, what we can do back in here is, we can import this now. We can say, from, or excuse me, we can just say import get price module.

```python
from interfaces import AggregatorV3Interface
import get_price_module
```

Right? Because these are in the same folder. Right. So we're just going to say go ahead, just import get price module.

```python
from interfaces import AggregatorV3Interface
import get_price_module
```

And then down here, we're going to have this error because we're saying self.get eth, but instead, we want to do get price module.get eth to USD rate.

```python
@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    ...
    return get_price_module.get_eth_to_usd_rate(PRICE_FEED, eth_amount)
```

Now we know that this function also takes two parameters now. So we're also going to want to pass in the price feed, like this.

```python
@external
@view
def get_eth_to_usd_rate(price_feed: AggregatorV3Interface, eth_amount: uint256) -> uint256:
    ...
    return get_price_module.get_eth_to_usd_rate(PRICE_FEED, eth_amount)
```

And, oh, we're going to want to do the same thing up here. Price feed, pass it in.

```python
@internal
@view
def _get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    How do we convert the ETH amount to dollars amount?
    """

    usd_value_of_eth: uint256 = get_price_module.get_eth_to_usd_rate(PRICE_FEED, msg.value)
    assert usd_value_of_eth >= MINIMUM_USD, "You must spend more ETH!"
    self.funders.append(msg.sender)
    self.funder_to_amount_funded[msg.sender] = msg.value

```

And now we're looking pretty good here. So let's do a little mox compile.

```bash
patrick@cu mox-buy-me-a-coffee-cu % mox compile
```

And it compiles successfully.

Awesome.

**Code Block**

```python
@external
@payable
def fund():
    """
    Allows users to send $ to this contract
    Have a minimum amount to send
    """
    _get_eth_to_usd_rate(msg.value)

```

**Code Block**

```python
from interfaces import AggregatorV3Interface
import get_price_module

PRECISION: constant(uint256) = 1 * (10 ** 18)

@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    Chris sent us 0.01 ETH for us to buy a coffee
    Is that more or less than $5?
    """

    price: int256 = staticcall PRICE_FEED.latestAnswer()
    eth_price: uint256 = (convert(price, price * uint256)) * (10 ** 18)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd # $ 8.0's, 18 decimal places

```

**Code Block**

```python
@internal
@view
def _get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    """
    How do we convert the ETH amount to dollars amount?
    """

    usd_value_of_eth: uint256 = get_price_module.get_eth_to_usd_rate(PRICE_FEED, msg.value)
    assert usd_value_of_eth >= MINIMUM_USD, "You must spend more ETH!"
    self.funders.append(msg.sender)
    self.funder_to_amount_funded[msg.sender] = msg.value

```

**Code Block**

```python
@external
@payable
def fund():
    """
    Allows users to send $ to this contract
    Have a minimum amount to send
    """
    _get_eth_to_usd_rate(msg.value)

```

**Code Block**

```bash
patrick@cu mox-buy-me-a-coffee-cu % mox compile
```
