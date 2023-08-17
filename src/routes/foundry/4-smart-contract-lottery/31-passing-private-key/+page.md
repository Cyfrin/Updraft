---
title: Passing the Private Key in
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/SiO9HENjSl8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Setting up the Fork Test

The goal is to try running our tests on a **forked test environment**. Before that, we have successfully run it on our local environment, the anvil. But now, we want to see how our code performs when running on a fork test. Depending on your expectation, jot down what you think would happen.

```bash
forge test --fork-url $SEPOLIA_RPC_URL
```

Now, if your prediction was an error message, then you are correct! We got an error right during setup. But why is this failing? Let's dive deeper into this.

### Analyzing the Error

When we run our forged test with multiple verbosity `-vvvv`, we can see the specific error: `must be sub owner when we try to add a consumer`. This problem arises when our test setup calls `Deployer Run`, which runs our Deploy Raffle and tries to add a consumer with our subscription ID.

The crux of the issue lies in the identification of the deployer. This error means only the person who launched the subscription can do this. So, to solve this, we need to refactor our code so that it works no matter the environment.

```bash
forge build
```

### Resolving the Error - Deployer Identification

To correct this issue, we need to make `deployer key` dynamic, depending on whether we're in a local or a non-local environment. In a local environment like Anvil, we use a default key whereas on a network like Sepolia we use a real key given by an environment variable.

This refactoring also involves modifying the Add Consumer to include the `deployer key`. This way, we ensure that we use the same key as the deployer when adding a consumer to start broadcasting.

```bash
forge test --fork-url $SEPOLIA_RPC_URL
```

Now, when we run the code, we find two failing tests regarding fulfilling random words after performing upkeep. This is because the actual contract requires different inputs than the local environment.

### Skipping Fork

The easier way around these final two failing tests is to add a `skip fork` modifier to run these tests only on an anvil chain. There exists another, more complex solution to this; involving the recreation of code to generate the proof and request commitment, essentially replicating much of the codebase of the actual chain-link node. However, as the purpose of this post is to demonstrate testing code failures and rectification, we opted for the simpler solution.

```js
 modifier skipFork() {
        if (block.chainid != 31337) {
            return;
        }
        _;
    }

```

Now that we have added the `skip fork` modifier to prevent these tests from running on a forked setup, we should no longer get an error during the test.

At this stage, you can uncomment your code to rerun the tests and this time, you should not encounter any error - both on the local and the forked test.

Congratulations, you have now successfully rectified an error on a forked test!

## Coverage Reports

After successfully running our tests on both local and forked environments, we then look at our **coverage results**. Coverage testing helps to identify areas of the codebase without test coverage, which are potentially risky and can affect the functionality.

```bash
forge coverage
```

This command generates a coverage report, and once we run it, we see that we have a higher coverage percentage than before. You do have the option to run `forge coverage report` to evaluate in detail the components lacking test coverage.

As a golden rule, your code is ready to move onto the next stage, or even for an audit only if you are confident about the coverage testing results.

## Conclusion

In this blog post, we saw how to test code in different environments - the local anvil and a fork environment, and tackled a common error associated with deployer identification. We analyzed, refactored the code, inserted a skip fork modifier, and surveyed our test coverage. Remember that, in software development, it is never about the code working locally, but it's more about its ability to adapt and work well in any environment it may find itself operating in.

<img src="/foundry-lottery/31-private-key/private1.png" style="width: 100%; height: auto;">

Remember, testing your code under different scenarios and environments is crucial for robust and reliable software delivery. Being comfortable with rewriting, refactoring, and updating your tests is a significant part of your journey as a competent developer.

Keep learning ans we will see you in the next lesson!
