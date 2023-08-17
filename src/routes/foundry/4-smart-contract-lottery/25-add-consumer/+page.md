---
title: Add Consumer
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/VxdPI856Ck4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Adding the Consumer

We can execute code snippets similar to the ones we used earlier while adding the consumer.

```shell
contract AddConsumer is Script {}}
```

To add a consumer, we need to write the `addConsumer` function, which will do most of the operations we've previously executed.

```javascript
function addConsumer(
        address contractToAddToVrf,
        address vrfCoordinator,
        uint64 subId,
        uint256 deployerKey
    ) public {
        console.log("Adding consumer contract: ", contractToAddToVrf);
        console.log("Using vrfCoordinator: ", vrfCoordinator);
        console.log("On ChainID: ", block.chainid);
        vm.startBroadcast(deployerKey);
        VRFCoordinatorV2Mock(vrfCoordinator).addConsumer(
            subId,
            contractToAddToVrf
        );
        vm.stopBroadcast();
    }
```

Now we can create a function to create a consumer based on the config like this:

```js
 function addConsumerUsingConfig(address mostRecentlyDeployed) public {
        HelperConfig helperConfig = new HelperConfig();
        (
            uint64 subId,
            ,
            ,
            ,
            ,
            address vrfCoordinatorV2,
            ,
            uint256 deployerKey
        ) = helperConfig.activeNetworkConfig();
        addConsumer(mostRecentlyDeployed, vrfCoordinatorV2, subId, deployerKey);
    }
```

This function calls the `addConsumer` function using the subscription ID and the address of the raffle contract. The subscription ID is retrieved from the config while the contract address is passed directly to the function.

## Testing the Script

Now comes the most awaited part - testing our creation! And guess what? It passes with flying colors!

It's such a thrill to see our creation fare so well. And the best part? We no longer require any manual inputs or interactions with the UI. We've reduced the entire contract deployment and management to just one command. Brilliant, isn't it?

<img src="/foundry-lottery/25-consumer/consumer1.png" style="width: 100%; height: auto;">

## On a Concluding Note

Kudos on keeping up with this journey! Done for the day and might be feeling overwhelmed at the volume of data thrown at you? Feel free to take a well-earned break.

Remember to savor the win. Pull yourself a pint of ice cream or some sushi, my personal favourite. Come back when your mind is fresh, open and ready to tackle the next set of challenges.

Here's a virtual tap on the back for making it this far. Your effort is really commendable. Keep up the good work and remember to take care of your "giant muscle" that is your brain. Don't hesitate to voice your doubts either to your AI buddy or the discussions forum. And remember -

<img src="/foundry-lottery/25-consumer/consumer2.png" style="width: 100%; height: auto;">

See you soon, folks! Keep your queries coming and the enthusiasm flowing.
