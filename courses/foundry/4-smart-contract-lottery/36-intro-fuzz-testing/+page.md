---
title: Intro to Fuzz Testing
---

_Follow along with this lesson and watch the video below:_



---

In this lesson, we will dive deep into the world of testing in blockchain development, focusing on using "mock functions" and a technique called "fuzz testing." These tools are essential for ensuring that your code is functioning as expected and you're creating a secure, stable system.

## Understanding Mock Functions

First, let's dig into the concept of using a mock function for our tests.

```java
function testFulfillRandomWordsCanOnlyBeCalledAfterPerformUpkeep()
        public
        raffleEntered
        skipFork
    {
        // Arrange
        // Act / Assert
        vm.expectRevert("nonexistent request");
        // vm.mockCall could be used here...
        VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
            0,
            address(raffle)
        );

        vm.expectRevert("nonexistent request");

        VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(
            1,
            address(raffle)
        );
    }
```

This script describes a test for a mock functionality we're planning to incorporate into our project. We want to ascertain that the `fulfillRandomWords` function can only be called after `performUpkeep` has been executed. It's crucial that we navigate how the tests operate and how to write such tests that guarantee our systems indeed work.

<img src="/foundry-lottery/29-fuzz/fuzz1.png" style="width: 100%; height: auto;">

In order to mimic a situation where we actually call `fulfillRandomWords` and observe a failed test, we are going to use another mock function. We will endeavor to make sure that calling `fulfillRandomWords` on the mock invariably reverts.

This script denotes the process of utilizing the `fulfillRandomWords` function with a fictitious request ID and an address of a consumer. We expect this to fail since `performUpkeep` hasn't been executed yet.

## What is Fuzz Testing?

When testing, it's unrealistic to test every single possible variable input to a function, especially when the valid input number is enormous. This is where fuzz testing comes in.

Fuzz testing is an approach that helps us generate random inputs to our test. Instead of us inputting manual entries like 0, 1, 2... etc., we utilize a random generator that provides these entries for us.

So, through the magic of fuzz testing, Foundry will generate random numbers and run this test many times with many random numbers, consistently checking if `nonexistentRequest` error occurs.

```
forge test -m
```

Running this test, we'll find that the function passed, and upon inspecting the test output, we'd get 256 runs, meaning that Foundry generated 256 random numbers and ran the test with those parameters.

These techniques — mocking and fuzz testing, come in handy when upping the security of your contract and improving your testing skills. If any of these concepts don't yet fully make sense, don't fret.

The goal isn't to perfect the art immediately but to gradually become familiar with the use of smart tests in your smart contracts and get better over time. As always, continue experimenting and happy testing!

<img src="/foundry-lottery/29-fuzz/fuzz2.png" style="width: 100%; height: auto;">
