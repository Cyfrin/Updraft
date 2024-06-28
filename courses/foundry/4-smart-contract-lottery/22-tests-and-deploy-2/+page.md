---
title: Test and Deploy Continued
---

_Follow along with this lesson and watch the video below:_



---

## The Helper Configurations

Firstly, we need to import the helper configurations we previously made. We do this by adding:

```js
import { HelperConfig } from "./HelperConfig.s.sol";
```

Once we have the helper configurations in our workspace, we'll use them to deploy a new helper configuration. Here, we'll define `helperConfig` as a new instance of the HelperConfig class. Something like this:

```javascript
 HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!
```

Once the helper configuration is created, we're going to need to pull parameters from it based on the active network config. Here's the interesting part: we'll be deconstructing the `networkConfig` object into underlying parameters. This means extracting individual pieces of information from the network configuration and assigning them to new variables in our current scope.

The resulting code snippet looks like this:

```javascript
(
    uint64 subscriptionId,
    bytes32 gasLane,
    uint256 automationUpdateInterval,
    uint256 raffleEntranceFee,
    uint32 callbackGasLimit,
    address vrfCoordinatorV2,
    address link,
    uint256 deployerKey
) = helperConfig.activeNetworkConfig();
```

## Starting The Virtual Machine Broadcast

Now we have configured the helper configurations and deconstructed into smaller values. Now, we're ready to begin the virtual machine (VM) start broadcast.

```javascript
VM.startBroadcast();
```

The VM will begin by instantiating a new Raffle contract. Parameters for the new Raffle contract are passed to the constructor, in the exact order expected by the constructor. They include `entranceFee`, `interval`, `VRFCoordinator`, `gaslane`, etc.

After the new Raffle contract is created, the virtual machine stops the broadcast.

```javascript
VM.stopBroadcast();
```

At this high level, the code should be good to go.

## The Subscription ID

But we need to clarify one thing. You need a subscription ID. You can either get it from the user interface (UI) or generate it in your deployment script. Being a developer, I would prefer my script does everything for me. But of course, you can fetch it directly from the UI if that works better for you.

However, we will pretend for now that this deployment script is working, even though it isn't, and begin writing unit tests.

## Writing Unit Tests

Buckle up, because it's time to write some tests! We'll start by creating two directories - one for unit tests, and another for integration tests.

Within our `unit_tests` directory, we'll create a new file `RaffleTest.t.sol`. This test file will include all of the necessary components for running a comprehensive test of our deployment script.

The structure of the test function includes the set up for the test environment, calls the deployment script, and tests to ensure that important variables are outputted correctly.

```javascript
 function setUp() external {
        DeployRaffle deployer = new DeployRaffle();
        (raffle, helperConfig) = deployer.run();
        vm.deal(PLAYER, STARTING_USER_BALANCE);

        (
            ,
            gasLane,
            automationUpdateInterval,
            raffleEntranceFee,
            callbackGasLimit,
            vrfCoordinatorV2, // link
            // deployerKey
            ,

        ) = helperConfig.activeNetworkConfig();
    }
```

In addition, we want to create a starting player, with a distinct address and initial balance of 10 ETH, to interact with the Raffle contract.

```javascript
address public PLAYER = makeAddr("player");
uint256 public constant STARTING_USER_BALANCE = 10 ether;

```

## Checking The Deployment

Lastly, we want to test our deployments. To do so, we need to get all our parameters from the HelperConfig. Best practice would be to return both the newly deployed Raffle and the HelperConfig variables. That way, our tests have access to the exact same variables that were inputted during the Raffle's deployment.

<img src="/foundry-lottery/18-test/test1.png" style="width: 100%; height: auto;">

## Sanity Check

Finally, let's run a quick sanity test to ensure that our raffle initializes in the `open` state. This can be done with a simple function that asserts that the state of the Raffle contract is `open`.

Aside from confirming the successful deployment of our Raffle contract, this test will also help verify that our HelperConfig and deployment script are working as expected.

Here's what the function looks like:

```javascript
 function testRaffleInitializesInOpenState() public view {
        assert(raffle.getRaffleState() == Raffle.RaffleState.OPEN);
    }
```

Congratulations! We've successfully written our deployment script and unit test. Now we can run our test suite and confidently deploy contracts on any specific networks, thanks to our HelperConfig configuration. Well done and stay tuned for the next post in our series!
