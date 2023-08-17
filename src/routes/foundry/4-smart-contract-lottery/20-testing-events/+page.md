---
title: Testing Events
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/jFsQeUAHLC0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

As developers, it's essential to be thorough in our testing process, especially when developing smart contracts. Recently, I (Patrick) found myself pondering, "What else do we need to test?" After testing several lines within my code, it struck me! Testing the events emitted by functions; an important but often overlooked area of smart contract testing.

In Immutable Foundries, this can be a bit tricky, so today, let's conquer this vital frontier of blockchain development! Let's delve deep into our code cavern to ensure that our contract is emitting the correct events at the right time.

## Triggering Events: The Expect Emit Function

Testing smart contract event emissions in Foundry involves this secret maneuver I call _the cheat code_; named as such because it manipulates the runtime environment to accomplish our mission. It's a neat trick provided to us by Foundry's Virtual Machine, and it's called `expectEmit`.

This `expectEmit` function takes a few parameters:

- A collection of Booleans that represent your indexed parameters (also known as topics in solidity event emissions).
- Check data, usually checked Boolean values.
- The address of the emitter (smart contract).

The function works as follows:

```javascript
      function testEmitsEventOnEntrance() public {
        // Arrange
        vm.prank(PLAYER);

        // Act / Assert
        vm.expectEmit(true, false, false, false, address(raffle));
        emit RaffleEnter(PLAYER);
        raffle.enterRaffle{value: raffleEntranceFee}();
    }
```

- We declare that we expect a certain emit to match the parameters provided. This declaration flags the next instantiation of the function we’re about to run to emit an event.
- Following the expectEmit declaration, we run the function that should cause the event emission.
- We're saying "this next emit that I do manually; I expect that to happen in this upcoming transaction."

<img src="/foundry-lottery/20-events/event1.png" style="width: 100%; height: auto;">

This declaration should look like this:

```javascript
vm.expectEmit(true, false, false, false, address(raffle));
```

The `vm.expectEmit` contains:

- One `true`, signifying one indexed parameter or topic present in the event.
- Following three `false`', indicating there are no additional parameters.
- The address of the smart contract is `address(raffle)`.

## Emulating Events in Tests: Redefine Them

As smooth as the `expectEmit` function makes the testing process, the inconvenience is the necessity to redefine events in our tests. Events in Solidity are not like enums or structures. We can't import them frugally across our application.

Instead, we have to redefine these events within our individual tests.

```javascript
     modifier raffleEntered() {
        vm.prank(PLAYER);
        raffle.enterRaffle{value: raffleEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);
        _;
    }
```

After redifining the contract event, you emit it manually with correct parameters and proceed to call the function that you expect will emit such an event during a transaction.

Finally, after setting up our test function with the VM prank, supplying transaction parameters, and redefining the event, we can proceed to run the test.

```bash
    forge test -m <function name>
```

And Voila! Now you have a thorough test for your event emissions, increasing the robustness of your smart contract. Don't skip this step in your tests. Event emission testing not only ensures correct data transaction but also achieves an effective means of logging and monitoring data flow during runtime. Happy coding!
