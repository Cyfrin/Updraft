## Kinds of Tests

We're back in the GitHub repo associated with this course in section with Moccasin Buy Me A Coffee.

We have several, several, different types of tests.

The test that we've gone over so far are something called unit tests. And these basically test a single function or part of your code.

The next step up from that is usually integration tests. And this is testing different systems together or different contracts together or basically the definition can be a little bit loose depending on how you define it.

Then, the step up from that would be a staging test. And these are testing your code in a production-like environment. 

Now, one of the tests kind of unique to blockchain is going to be this type of forked test. Although, you could probably categorize these as staging tests as well. And this is essentially where you deploy your contracts to a fake virtual network or a forked network and call the different functions on it. We've kind of done something like this with tenderly's virtual network, but we're also going to do it with alchemy here as well. And these fake networks will simulate what it's like to actually work with the real blockchain. 

Then, there's fuzz and formal verification. Now, fuzzing is incredibly important, and you should 100% learn how to fuzz. And then, formal verification is when you mathematically prove different functions.

So, for us, we are going to do all of these types of tests for this project. And then, pretty soon once you get to the stablecoin portion, we are going to add fuzz testing as well. 
