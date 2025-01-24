## Pool Configuration Test

We need to configure the token pools before we mint tokens and transfer them cross-chain. To configure the token pool, we need to call `applyChainUpdates`. This function is inside the token pool, which we are inheriting from the re-base token pool.

```javascript
applyChainUpdates
```

This function takes two constructor arguments: `uint64[] calldata remoteChainSelectorsToRemove` and `ChainUpdate[] calldata chainsToAdd` (an array that contains the configuration for any chains that we want to enable).

Enabling a chain means that we are allowing tokens to be received and sent to this chain. 

To configure our token pools, we will create a function called `configureTokenPool`: 

```javascript
function configureTokenPool(
    uint256 fork,
    address localPool, 
    uint64 remoteChainSelector, 
    address remotePool, 
    address remoteTokenAddress
) public {
    vm.selectFork(fork);
    vm.prank(owner);
    bytes memory remotePoolAddresses = new bytes(1);
    remotePoolAddresses[0] = abi.encode(remotePool);

    TokenPool.ChainUpdate memory chainToAdd = new TokenPool.ChainUpdate(1);
    chainToAdd.remoteChainSelector = remoteChainSelector;
    chainToAdd.remotePoolAddresses = remotePoolAddresses;
    chainToAdd.remoteTokenAddress = abi.encode(remoteTokenAddress);
    chainToAdd.outboundRateLimiterConfig = RateLimiter.Config(isEnable: false, capacity: 0, rate: 0);
    chainToAdd.inboundRateLimiterConfig = RateLimiter.Config(isEnable: false, capacity: 0, rate: 0);
    TokenPool(localPool).applyChainUpdates(new uint64(1)[0], chainToAdd);
}
```

We need to import `TokenPool` and `RateLimiter`:

```javascript
import "TokenPool" from "@ccip/contracts/src/v0.8/ccip/pools/TokenPool.sol";
import "RateLimiter" from "@ccip/contracts/src/v0.8/ccip/libraries/RateLimiter.sol";
```

We are going to use the Sepolia fork, the Sepolia pool as our local pool, the Arbitrum Sepolia network details, and the Arbitrum Sepolia token as our remote values:

```javascript
configureTokenPool(sepoliaFork, sepoliaLiPool, arbSepoliaNetworkDetails.chainSelector, arbSepoliaLiPool, arbSepoliaLiToken);
```

We then need to repeat the process for Sepolia, using the Arbitrum fork, Arbitrum pool as the local pool, the Sepolia network details and Sepolia token as our remote values: 

```javascript
configureTokenPool(arbSepoliaFork, arbSepoliaLiPool, sepoliaNetworkDetails.chainSelector, sepoliaLiPool, sepoliaLiToken);
```

We can now call the `configureTokenPool` function:

```bash
run forge build
```

This successfully builds, and now we have configured our token pools!
