## Proxies Workshop

We know this was a quick session, but that's it! You now understand proxies and how they work. But before we go, we should, of course, have you do a little workshop.

For our workshop here, we have two workshops:

**Spend at most 25 minutes on all of these prompts without the aide of AI. If you're unable to solve them after 25 minutes, stop, take a break, and then work with an AI or the discussions to help you solve them. Good luck!**

1.  Try to write a contract that has a function selector collision with the proxy.
2.  Write a contract where the storage variables change order!

Let's take a look at our existing code:

```javascript
from src import ERC1967, counter_one, counter_two
import boa
import warnings
```

```javascript
def deploy():
  implementation = counter_one.deploy()
  proxy = ERC1967.deploy(implementation.address, boa.env.eoa)
  with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    proxy_with_abi = counter_one.at(proxy.address)
    proxy_with_abi.set_number(77)
    print(proxy_with_abi.number())
    print(proxy_with_abi.decrement())
    print(proxy_with_abi.number())
    print(proxy_with_abi.version())

# Let's upgrade!
implementation = counter_two.deploy()
proxy.upgrade_to(new_implementation=implementation.address)
```

What does that mean? Well, remember we learned about function selectors, right? So in my counter one, the function selector for `set_number`, I can figure out by running:

```bash
patrick@cu moz-upgrades-cu % cast sig "set_number(uint256)"
0xd6d1ee14
```

And this is the function selector. So when we call our proxy, when we call `set_number` on our proxy, the codebase goes, "Okay, I'm looking for this function selector." No, that's not right! No, that's not right! No, that's not right! No, that's not right! Okay, I'm going to go with the default then because I can't find the function selector. What this means, though, is you can have a function with the same selector, even though it's a different function. So for example, if I do:

```bash
patrick@cu moz-upgrades-cu % cast sig "upgrade_to(address)"
0x3c436f25
```

This is the function selector here. And when we call `upgrade_to`, we would call it on the proxy here. But what could happen is, let me let's take this function selector and I'll go look up a function selector database. We can use this one. Punch this in. Okay, it looks like nobody else has used this function selector. But what could happen is we could have a similar function selector on our implementation and this would be a collision. So we can do:

```bash
patrick@cu moz-upgrades-cu % cast sig "transfer(address,uint256)"
0xa9059cbb
```

I'm pretty sure there's a well-known function collision with this. Actually there's a ton of them. So, so all of these all of these functions have the same function signature.

`workMyDirefulOwnerUint256Uint256`
`join_tg_invmmru_haha_f006797(address,bool)`
`func020893253501(bytes)`
`transfer(bytes4)bytes(bytes[64](int14811))`
`many_msg_babbage(bytes)`
`transfer(address,uint256)`

This weird thing here this weird thing here this very bizarre transfer, many message babbage bytes one. These all have the exact same function selector. So your first workshop is kind of hard. Well, I guess I kind of gave you a bit of the answer here. Um, your first workshop is to try to write a contract that has a function selector collision with the proxy. And then number two, write a contract where the storage variables change order, and look at how that affects it. So for example, in our counter one, maybe we'll have a number public uint256 and we'll have a my bool public bool or bull, excuse me. And then in counter two in counter two switch the order, and see what happens then. Do you get what you expect? Why do you see the results that you see? So these are your two workshops. Take some time, tinker around, play with this and I'll see you very soon. 
