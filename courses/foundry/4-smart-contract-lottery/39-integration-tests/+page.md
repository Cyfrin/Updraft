---
title: Integration Tests
---

_Follow along with this lesson and watch the video below:_



---

Yes, you've guessed it correctly. It's another installation on testing! We've discussed unit tests in our previous articles, but today, we're going a notch higher. We are diving deep into integration tests with a special focus on smart contracts. Moreover, we will discover the significance of testnets and their roles in deployment and testing. Let's get into it!

## The Transition from Unit to Integration Tests

I know, we just covered unit tests, but we're not even close to done. The world of testing in blockchain development is wide, and it's split into categories. To begin with, there are unit tests, and then we transition into our focus for today: integration tests.

Integration tests involve testing our deploy scripts along with various components of our smart contracts. This way, we ensure that each piece of the puzzle fits together to form our desired application or system. Exciting, right?

Let's jump into some coding. To move our interactions test (test.sol) to integration, simply grab it and move it up into the integration section.

<img src="/foundry-lottery/32-integration/integration1.png" style="width: 100%; height: auto;">

And there you have it! You're now working in the realm of integration tests!

<img src="/foundry-lottery/32-integration/integration2.png" style="width: 100%; height: auto;">

## Flying with Testnets

As opposed to just performing unit and integration tests, it's also worth considering whether you should deploy your smart contracts to a testnet or even a mainnet. By doing so, you expose your contracts to a live environment. This will help you understand the real-life performance of your contract.

Some people would even go as far as deploying their contracts to [Polygon](https://polygon.technology/), a cheap live network, to test their contracts in a production environment.

Coincidentally, some blockchain networks like [Polkadot](https://polkadot.network/) have their unique staging blockchain known as Kusama.

<img src="/foundry-lottery/32-integration/integration3.png" style="width: 100%; height: auto;">

## Writing and Running Integration Tests

Now, let's write some integration tests and run the deploy script. You'll have a chance to see the lottery in action on a testnet.

Remember, seeing is often believing, but testnets can sometimes be fickle. They can test your patience, but seeing your contract perform in a testnet environment can be a solid reassurance that it works!

## Considerations and Conclusion

With testing, it's essential to be thorough, but we should also consider the limitations of our testing environments. For instance, Foundry, though a fantastic framework for smart contract testing, can be a bit challenging when dealing with off-chain systems. That's why we're skipping a lot of staging tests.

However, fear not! With a well-done job on unit and integration tests, we're off to a great start. Here's where I leave it to you. Try running the test suite ensuring the deploy raffle is all green, and if you're feeling ambitious, aim to get that interactions test suite up and running as well.

Happy testing!
