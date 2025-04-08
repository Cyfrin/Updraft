## Setup

We're going to start by deleting everything in our Remix here. You're probably a little bit familiar with Remix at this point, which is great. So, we're going to go ahead and delete everything in my Remix here. And, I'm going to create again this hi.sol contract here. Oh, it came back. Sorry about that. And, I'm going to create this hi.sol contract because, again, Remix assumes you're going to be working with Solidity and is always looking for Solidity. So, we have to at least make a Solidity file.

```solidity
pragma solidity ^0.8.18;

contract hi {

}
```

So, we're going to go ahead and we'll go to the Solidity compiler. We'll compile hi.sol so that we don't have to worry about this in the future. And then, we'll also do SPDX license identifier MIT.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract hi {

}
```

Again, don't need to worry about the Solidity stuff for now, just know that as of recording, Remix has this bug where it needs to see a Solidity file in order for it to deploy anything. But, so let's go back to our File Explorer here. And let's create a new file called buy me a coffee.

Now, right on the naming convention here, you see we're using underscores for spaces between the names here. This is known as snake case. And, there's a bit of a disagreement in the Vyper community as of recording, if this is better, or something called camel case is better, which looks like this. Where it's like every start of a new word just has a capitalized letter at the beginning. Python by nature is typically what's called snake case with these underscores like this. But, I want to point out that for the names of files, you might see it both ways. In the Python, in the Vyper code itself, we'll definitely be using snake case with the underscores. But, for the names of file it might go either way. Now, before we actually begin coding anything, let's write down what we want to do here. It's usually a good idea to write down what you want your code base to do before you even get started coding so that you have a design spec of what it should be doing. And, this is a really good step for anybody who is building smart contracts or building any type of code. So, what do we want this to do? Well, we want this application to do three things: allow us to get funds from users so that people can buy us coffee. We want to be able to withdraw those funds so that we can actually go off and buy the coffee. And then finally, set a minimum funding value in USD.

Now, originally, I said $50, we might make it five. We might make it two because now that I'm thinking about it, $50 coffee is ridiculous. But, you know, you can set your coffee price to whatever you want it to be. So, let's go ahead and let's get started here, of course, with pragma version 0.4.1. And, we'll say @license MIT.

```python
# Get funds from users
# Withdraw funds
# Set a minimum funding value in USD

# pragma version 0.4.1
# @license: MIT
```

And then if you want, you can also do @author and put your name here.

```python
# Get funds from users
# Withdraw funds
# Set a minimum funding value in USD

# pragma version 0.4.1
# @license: MIT
# @author: You!
```

There's a couple other different types of tags that you'll see people use pretty often. And, pretty soon we'll actually learn a nicer way to format this than with these hashtags here, but we'll get to that in a bit.

Now, let's actually build a little bit of a skeleton for our smart contract here. Let's just build the names of the functions that we want this to have. So, we probably want a def fund some type of fund function here.

```python
# Get funds from users
# Withdraw funds
# Set a minimum funding value in USD

# pragma version 0.4.1
# @license: MIT
# @author: You!

def fund():
```

And what you can do that's quite nice in Vyper is that if you want to just name a function but not have it do anything quite yet, you can just type this pass in the function definition.

```python
# Get funds from users
# Withdraw funds
# Set a minimum funding value in USD

# pragma version 0.4.1
# @license: MIT
# @author: You!

def fund():
    pass
```

So, this contract right here, even though it doesn't really do anything, is actually valid Vyper. So, I can even go ahead and compile this. And, you'll see that it compiles successfully.

So, this pass keyword is valid Vyper here. So, we want def fund. What else? We probably want def withdraw. We want to be able to withdraw the money that is funded to us. And, that's pretty much it. Now, these two functions are going to be the main functionality of the contract. However, we are obviously going to be adding other functions in here as well because, well, in order to fund and withdraw, we probably need some other functionality, including getting price and etc. So, this fund function, we want anybody outside of this contract to be able to call. So, let's give it a visibility of @external. So now, anybody can call this. Same thing, we want humans to actually be able to call withdraw. So, we'll do @external. We probably only want us to call this, but we'll fix that in a bit.

```python
# Get funds from users
# Withdraw funds
# Set a minimum funding value in USD

# pragma version 0.4.1
# @license: MIT
# @author: You!

@external
def fund():
    pass

@external
def withdraw():
    pass
```
