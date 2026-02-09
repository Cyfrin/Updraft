---
title: Deploy Script
---

_Follow along the course with this video._

---

### Deploy Script

We've done a lot, so far and it's getting really complex. Now's a great time to perform a sanity check and write some tests.

_I have no idea if what I'm doing makes any sort of sense. I want to make sure I write some tests here._

Testing is crucial to ensure that our code is functioning as intended. Start by creating a new folder, `test/unit`. The tests we write are going to be integration tests, so lets prepare a deploy script. Create the file `script/DeployDSC.s.sol` as well. We should be well versed in setting up a deploy script at this point!

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { Script } from "forge-std/Script.sol";
import { DecentralizedStableCoin } from "../src/DecentralizedStableCoin.sol";
import { DSCEngine } from "../src/DSCEngine.sol";

contract DeployDSC is Script {

    function run() external returns (DecentralizedStableCoin, DSCEngine) {}
}
```

Beautiful, clean setup. In our run function we'll need to deploy both DecentralizedStableCoin.sol and DSCEngine.sol. DecentralizedStableCoin doesn't take any constructor parameters, so it's fairly straightforward, however DSCEngine requires `tokenAddresses[]`, `priceFeedAddresses[]` and the address of our DecentralizedStableCoin deployment. In order to provide these address arrays to our DSCEngine constructor, we're going to leverage a `HelperConfig`!

### HelperConfig

Create a new file `script/HelperConfig.s.sol`. The boilerplate here is pretty standard.

```solidity
// SPDX-License-Identifier: MIT

import { Script } from "forge-std/Script.sol";

pragma solidity ^0.8.18;

contract HelperConfig is Script {}
```

Just like we did in previous lessons, we'll declare a NetworkConfig struct which contains a number of properties which will be determined by the network the transaction is placed on.

```solidity
contract HelperConfig is Script {

    struct NetworkConfig{
        address wethUsdPriceFeed;
        address wbtcUsdPriceFeed;
        address weth;
        address wbtc;
        uint256 deployerKey;
    }

    NetworkConfig public activeNetworkConfig;

    constructor() {}
}
```

We can now start by writing the configuration for Sepolia, feel free to copy and paste the contract addresses I've compiled.

```solidity
function getSepoliaEthConfig() public view returns (NetworkConfig memory sepoliaNetworkConfig) {
    sepoliaNetworkConfig = NetworkConfig({
        wethUsdPriceFeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306, // ETH / USD
        wbtcUsdPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
        weth: 0xdd13E55209Fd76AfE204dBda4007C227904f0a81,
        wbtc: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063,
        deployerKey: vm.envUint("PRIVATE_KEY")
    });
}
```

This is simple enough since most of the tokens we'll be working with have their own Sepolia deployments, but next we'll be setting up a configuration function for our local Anvil chain. We'll have additional considerations such as the need for mocks.

What we can do, is start this function by checking if the activeNetworkConfig has one of our token price feeds, and if not, we'll assume we're on anvil and deploy our mocks.

```solidity
function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory anvilNetworkConfig) {
    // Check to see if we set an active network config
    if (activeNetworkConfig.wethUsdPriceFeed != address(0)) {
        return activeNetworkConfig;
    }

    vm.startBroadcast();
    MockV3Aggregator ethUsdPriceFeed = new MockV3Aggregator(DECIMALS, ETH_USD_PRICE);
    ERC20Mock wethMock = new ERC20Mock("WETH", "WETH", msg.sender, 1000e8);

    MockV3Aggregator btcUsdPriceFeed = new MockV3Aggregator(DECIMALS, BTC_USD_PRICE);
    ERC20Mock wbtcMock = new ERC20Mock("WBTC", "WBTC", msg.sender, 1000e8);
    vm.stopBroadcast();
}
```

Be sure to declare your constants at the top of your script.

```solidity
uint8 public constant DECIMALS = 8;
int256 public constant ETH_USD_PRICE = 2000e8;
int256 public constant BTC_USD_PRICE = 1000e8;
```

Additionally, notice that we're employing the `MockV3Aggregator` as well as some `ERC20Mock`s in this function. Be sure to create the file `test/mocks/MockV3Aggregator.sol` and import it and the ERC20Mock library from OpenZeppelin into our deploy script. You can copy the version of this mock I've provided below, into your file.

```solidity
import { MockV3Aggregator } from "../test/mocks/MockV3Aggregator.sol";
import { ERC20Mock } from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
```

<details>
<summary>MockV3Aggregator.sol</summary>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MockV3Aggregator
 * @notice Based on the FluxAggregator contract
 * @notice Use this contract when you need to test
 * other contract's ability to read data from an
 * aggregator contract, but how the aggregator got
 * its answer is unimportant
 */
contract MockV3Aggregator {
    uint256 public constant version = 0;

    uint8 public decimals;
    int256 public latestAnswer;
    uint256 public latestTimestamp;
    uint256 public latestRound;

    mapping(uint256 => int256) public getAnswer;
    mapping(uint256 => uint256) public getTimestamp;
    mapping(uint256 => uint256) private getStartedAt;

    constructor(uint8 _decimals, int256 _initialAnswer) {
        decimals = _decimals;
        updateAnswer(_initialAnswer);
    }

    function updateAnswer(int256 _answer) public {
        latestAnswer = _answer;
        latestTimestamp = block.timestamp;
        latestRound++;
        getAnswer[latestRound] = _answer;
        getTimestamp[latestRound] = block.timestamp;
        getStartedAt[latestRound] = block.timestamp;
    }

    function updateRoundData(uint80 _roundId, int256 _answer, uint256 _timestamp, uint256 _startedAt) public {
        latestRound = _roundId;
        latestAnswer = _answer;
        latestTimestamp = _timestamp;
        getAnswer[latestRound] = _answer;
        getTimestamp[latestRound] = _timestamp;
        getStartedAt[latestRound] = _startedAt;
    }

    function getRoundData(uint80 _roundId)
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (_roundId, getAnswer[_roundId], getStartedAt[_roundId], getTimestamp[_roundId], _roundId);
    }

    function latestRoundData()
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (
            uint80(latestRound),
            getAnswer[latestRound],
            getStartedAt[latestRound],
            getTimestamp[latestRound],
            uint80(latestRound)
        );
    }

    function description() external pure returns (string memory) {
        return "v0.6/tests/MockV3Aggregator.sol";
    }
}
```

</details>


Once mocks are deployed, we can configure the anvilNetworkConfig with those deployed addresses, and return this struct.

```solidity
anvilNetworkConfig = NetworkConfig({
  wethUsdPriceFeed: address(ethUsdPriceFeed), // ETH / USD
  weth: address(wethMock),
  wbtcUsdPriceFeed: address(btcUsdPriceFeed),
  wbtc: address(wbtcMock),
  deployerKey: DEFAULT_ANVIL_PRIVATE_KEY,
});
```

Assure you add the `DEFAULT_ANVIL_PRIVATE_KEY` to our growing list of constant state variables.

```solidity
uint8 public constant DECIMALS = 8;
int256 public constant ETH_USD_PRICE = 2000e8;
int256 public constant BTC_USD_PRICE = 1000e8;
uint256 public constant DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
```

Great! With both of these functions written we can update our constructor to determine which function to call based on the block.chainid of our deployment.

```solidity
constructor() {
    if(block.chainid == 11155111){
        activeNetworkConfig = getSepoliaEthConfig();
    } else{
        activeNetworkConfig = getOfCreateAnvilEthConfig();
    }
}
```

With the HelperConfig complete, we can return to DeployDSC.s.sol. Please reference the [**HelperConfig.s.sol within the GitHub repo**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23/blob/main/script/HelperConfig.s.sol) if thing's haven't worked for you, or won't compile at this point.

### Back to DeployDSC

Returning to `DeployDSC.s.sol`, we can now import our HelperConfig and use it to acquire the parameters for our deployments.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { Script } from "forge-std/Script.sol";
import { DecentralizedStableCoin } from "../src/DecentralizedStableCoin.sol";
import { DSCEngine } from "../src/DSCEngine.sol";
import { HelperConfig } from "./HelperConfig.s.sol";

contract DeployDSC is Script {

    function run() external returns (DecentralizedStableCoin, DSCEngine) {
        HelperConfig config = new HelperConfig();

        (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) = config.activeNetworkConfig();
    }
}
```

With these values, we can now declare and assign our tokenAddresses and priceFeedAddresses arrays, and finally pass them to our deployments.

```solidity
...

address[] public tokenAddresses;
address[] public priceFeedAddresses;

function run() external returns (DecentralizedStableCoin, DSCEngine) {
    HelperConfig config = new HelperConfig();

    (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) = config.activeNetworkConfig();

    tokenAddresses = [weth, wbtc];
    priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];

    vm.startBroadcast();
    DecentralizedStableCoin dsc = new DecentralizedStableCoin();
    DSCEngine engine = new DSCEngine(tokenAddresses, priceFeedAddresses, address(dsc));
    vm.stopBroadcast();
}
```

Things look amazing so far, but there's one last thing we haven't really talked about. I'd mentioned in earlier lessons that we intend the DSCEngine to own and manage the DecentralizedStableCoin assets. DecentralizedStableCoin.sol is Ownable, and by deploying it this way, our msg.sender is going to be the owner by default. Fortunately, the Ownable library comes with the function `transferOwnership`. We'll just need to assure this is called in our deploy script.

```solidity
function run() external returns (DecentralizedStableCoin, DSCEngine) {
    HelperConfig config = new HelperConfig();

    (address wethUsdPriceFeed, address wbtcUsdPriceFeed, address weth, address wbtc, uint256 deployerKey) = config.activeNetworkConfig();

    tokenAddresses = [weth, wbtc];
    priceFeedAddresses = [wethUsdPriceFeed, wbtcUsdPriceFeed];

    vm.startBroadcast();
    DecentralizedStableCoin dsc = new DecentralizedStableCoin();
    DSCEngine engine = new DSCEngine(tokenAddresses, priceFeedAddresses, address(dsc));
    dsc.transferOwnership(address(engine));
    vm.stopBroadcast();
    return (dsc, engine);
}
```

### Wrap Up

Whew, not much left to say besides: Good work. In the next lesson, we'll be putting these scripts to the test with ... tests.

See you there!

[**DeployDSC.s.sol**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23/blob/main/script/DeployDSC.s.sol)

[**HelperConfig.s.sol**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23/blob/main/script/HelperConfig.s.sol)
