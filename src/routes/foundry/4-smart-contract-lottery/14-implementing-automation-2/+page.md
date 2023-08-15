---
title: Implementing Chainlink Automation
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y-Fl9kQtPHo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

### Defining the Setup Functions

To implement Chainlink automation, we utilize two key functions: `checkUpkeep` and `performUpkeep`. These functions will allow our Chainlink nodes to automatically start the lottery whenever necessary.

Currently, our code includes a function named `pickWinner`. We will modify this function to permit Chainlink Automation to initiate contract calls as opposed to the manual initiation process currently in place.

### Creating the `checkUpkeep` function

Our first step is to create a `checkUpkeep` function. This function notifies the Chainlink nodes when it's due time to call `Perform upkeep`.

Typically, the function definition may look something like this:

```js
function checkUpkeep(bytes memory checkData) public view
returns (bool upkeepNeeded, bytes memory performData) {}
```

At a basic level, the function checks several conditions:

- If the required time interval between raffle games has passed.
- If the raffle is in the open state
- If the contract has any ETH (meaning there are players)
- If the subscription is funded with LINK.

### Creating the `performUpkeep` function

Once `checkUpkeep()` has determined it's time for an update, it's the `performUpkeep()` function's task to trigger the actual update.

The performUpkeep function first verifies if it is indeed time to initiate an update by calling `checkUpkeep`. If the check is not passed, it will revert with a custom error called `raffle upkeep not needed`.

Here's a basic implementation of the `performUpkeep` function:

```javascript
function performUpkeep(bytes calldata /* performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        // require(upkeepNeeded, "Upkeep not needed");
        if (!upkeepNeeded) {
            revert Raffle__UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                uint256(s_raffleState)
            );
        }
        s_raffleState = RaffleState.CALCULATING;
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        // Quiz... is this redundant?
        emit RequestedRaffleWinner(requestId);
    }
```

### Conclusion

By setting these functions in your contract, you can make your smart contracts more autonomous and efficient. Eliminating the need for manual interaction with your contracts enhances their performance greatly.

Successfully compiling this script demonstrates how Chainlink automation can be adopted to automatically trigger our lottery. Consequently, we can entirely entrust Chainlink to do the heavy lifting of handling our raffle game schedules.

<img src="/foundry-lottery/14-automation/auto1.png" style="width: 100%; height: auto;">
