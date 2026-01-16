## ERC-1967 and Delegate Call

We will create our own proxy contract ourselves and see first-hand how this works.

We will start with a blank contract. Open your terminal and use the following commands:

```bash
mkdir mox-upgrades-cu
code mox-upgrades-cu
```

Next, we will delete everything in our _src_ folder.

Now, we will grab the ERC-1967.vy file from our GitHub repository. Open your browser and navigate to your GitHub repository. Click on _mox-upgrades-cu_ and _src_, then grab the code from the _ERC1967.vy_ file. 

Paste this code into a new file called _ERC1967.vy_ in your _src_ folder.

```javascript
gap_0: uint256; # 244400534053805366564022568114969544909752651517672968839296883920ac459d9512
implementation: public(address); # 0x3c680994a13ba1a321d667c8249d22b0d9ca2076c3735a2c45a5920ac459d9512
gap_1: uint256; # 575156741210777536643407599865508318857449273161256368323712657080424561478
admin: public(address); # 0x05512766a568b3173aeb9a016e78a6f1cc2436e24e3ee6ee1178d6a7178d5b75805d61d3

def default() -> uint256:
    """@notice Fallback function that delegates all calls to the implementation"""
    assert self.implementation != empty(address), "Implementation not set"
    """# Delegate call to the implementation"""
    result: uint256 = convert(raw_call(
        self.implementation,
        msg.data,
        max_outsize=32,
        is_delegate_call=True,
        revert_on_failure=True
    ), uint256)
    return result
```

We will cover some of the highlights from the ERC-1967 contract code.
First, you will see that the contract has a giant fixed-size array of uint256s.

The reason we have this massive array is because we want this implementation slot to be at this specific slot in storage. Remember, since we learned a lot about storage, we learned that since this is a uint256 array, it is going to initialize all these storage slots to zero, and this implementation address will be set to the storage slot after all of this. 

If you go to the documentation here for the ERC-1967, the storage slot for the implementation, or the logic contract address, is this address here.

So, the implementation still might be a little bit hazy to you right now. That's okay, no worries. We will explain it as we go along here. So, essentially, we're doing some weird storage stuff. So, we are creating kind of this gap in storage, so the storage has a ton of empty slots, then it has this implementation, then it has a ton more empty slots, and then it has some admin address.

The reason for this is if we scroll down and we look at this default function. Remember how the default function works? It's the fallback function. If somebody calls, you know, a function that doesn't exist, like they call like, Hello World, there's no Hello World on here. It'll automatically kick all the data to this default function.

In our default function here, we have it set up where we're going to assert that the implementation isn't empty. Then we're going to send everything to that implementation slot.

However, it's going to do this thing is delegate call. It's going to be set to True.

So, let me show you a little bit of a diagram of kind of what this looks like. 

In a normal raw call, it would kind of look like this. Somebody would call the ERC-1967.vy. It would hit the default function, the default function would look in its storage. It would see the implementation and then would kick all the data over to some contract, like Counter one. Counter one would do it.

But, with delegate call, what it's going to do instead, you can almost think of it as it kind of going over to Counter one, saying Hey, do you have this function that they are asking for, and then take it for itself?

I know that sounds kind of bizarre, but you can almost think of this delegate call as a borrowing feature. So, let's say Counter one has a function that looks like this. 

```javascript
def set_number(new_number):
    number = new_number
```

If we were to just do a regular call, well, this would get called on our Counter one contract, and Counter one's storage would get changed. But, instead, with delegate call, we are actually going to borrow this function, and bring it over here. Bring it to ourselves. And now we're going to almost run this function on our contract itself. But, instead of saying def set_number, new_number, well, actually, excuse me, it would be self.number = new_number. But, our contract is going to say, okay, what storage slot was your self.number in? Okay, that was storage slot zero. So, I am just going to say my storage slot zero is going to be the new number, and on the ERC-1967 contract, the number, the storage slot zero, would get populated, and nothing would happen to Counter one.

So, I like to think of the delegate call functionality as like a function borrower. Like, hey, I am going to send all this data to you, I am going to send all this data to this Counter one, but all the results, and everything that happens, I am going to keep it. You are not going to keep any of it, which is pretty cool.

We also have an upgrade to function which allows us to upgrade. And we have a change admin function as well. This means, though, what's kind of scary, is if our Counter one had like a def change admin, we would never be able to call it, because it would trigger our change admin function being called. And, this is actually an issue when it comes to using these type of proxy contracts, is you want to look out for function selector collisions where the function selectors are the same, which we learned a little bit about function selectors before.

This setup that we are using here is some type of It is kind of a version of what's known as the transparent proxy pattern. A lot of the modern Solidity contracts use this thing called a UUPS Proxy pattern. And, as you get more advanced, you can decide what type of proxies that you want to use.

This code is for educational purposes only. I do not endorse this as production grade proxy. I have not audited this. So, just a rule of thumb here if you are going to use proxies in Vyper, be sure to get them audited and security reviewed. 
