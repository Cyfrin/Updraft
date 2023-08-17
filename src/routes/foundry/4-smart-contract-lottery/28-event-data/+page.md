---
title: Getting Event Data Into Foundry
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/nliBD510_ck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Part 1: Emit - Necessary or Redundant?

Consider this situation: We have a function, `performUpkeep`, and we want to learn more about it by giving it an extra emit. We'll write an event `requestedRaffleWinner`. This event will get emitted when we call the `performUpkeep` function, with an associated variable, Request ID.

But wait, is this redundant?

The way to find out if this is redundant or necessary is by checking our existing contract. We'll look up the `VRFCoordinatorMock` function and search for `requestRandomWords`. If there is an event `randomWordsRequested` which already includes the 'Request ID', then emitting the Request ID again would indeed be redundant.

However, in this article, we'll follow through with the redundancy to simplify our testing process.

<img src="/foundry-lottery/28-event-data/eventdata1.png" style="width: 100%; height: auto;">

Even though this might seem like lousy form, retreading this process is crucial, especially when we test for outputs from events. A prime example is the ChainlinkVRF, which functions by listening to this event that gets emitted.

## Part 2: Writing Tests and Refactoring

Now that we've covered the grounds, let's head straight into writing test cases for `Perform Upkeep` and refactor some parts of our code to improve efficiency.

We'll start with a Function Test for Perform Upkeep and declare it as Public. Then we do the same with VM Warp and VM Roll―quite repetitive, isn't it? Ideally, these should be refactored into a modifier to reduce redundancy and enhance code readability.

Here's our new modifier `RaffleEnteredAndTimePassed`:

```js
modifier raffleEntered() {
        vm.prank(PLAYER);
        raffle.enterRaffle{value: raffleEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);
        _;
    }

```

Then, we move right along to create our raffle. The intent is to capture the emitted request ID, which is not accessible by the Raffle Contract. From here, we need to learn how to get the output of these events while testing.

For that, we use our trusty friend, `recordLogs`. This function records all emitted events, which we can then access using `getRecordedLogs`.

Our next step is to introduce a new type of list to store the emitted events― `Vm.Log Array`.

```js
 Vm.Log[] memory entries = vm.getRecordedLogs();
```

Again, to make use of `Vm`, you'll have to import it from `forge-std/Vm.sol`.

## Part 3: Request ID &amp; Working with Emitted Events

Now that we have our recorded logs, we can extract the Request ID using this list of emitted events.

Now remember, this list contains all the events that were emitted during the process. Therefore, understanding the transaction and recognizing the events is crucial in this step.

Using the debugger, we skip ahead and identify that our requested event 'Raffle Winner' is the second event emitted in this transaction.

```js
bytes32 requestId = entries[1].topics[1];
```

The zeroth index would refer to the event `randomWordsRequested` in the mock. The first index refers to our requested event.

The last step involves creating a True/False condition to confirm if the Request ID was correctly generated.

```js
assert(uint256(requestId) > 0);
```

Thus, ensuring the Request ID is not default and zero.

For a more foolproof test, also check the Raffle state equals one for calculating, increasing the robustness of your function.

Finally, when you run the test cases in your terminal, you should get successful outputs.

## Congrats

That's all for now, developers. Keep on coding—until next time!
