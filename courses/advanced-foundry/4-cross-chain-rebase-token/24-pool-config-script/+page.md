## Pool Config Script

The next script we want to create is to configure the token pools once we have run this script on both the source and destination chains. We need to configure the token pools like we were doing in the test.

Let's create a new file:

```bash
ConfigurePool.sol
```

This will be just a recap from before.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";

contract ConfigurePoolScript is Script {
    function run() public {

    }
}
```

We're going to need to pass some things through to run, so we're going to need the pool address, the local pool address.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, 
}
```

We're going to need the remote chain selector.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, 
}
```

We're going to need the remote pool address.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, 
}
```

We're going to need the remote token address.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, 
}
```

We're going to hardcode some parameters like the rate limiting, because you could pass that in here such as are you allowing inbound and outbound rate limiting as bools and the uint128 capacity and rates, so inbound and outbound. What is the bucket size, and what is the refill rate in tokens per second. However, to make things a little bit simpler, I am actually going to hardcode those. So, vm.startbroadcast.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, 
}
```

You know what, actually let's make this a little bit less hardcoding. We are going to pass them in. bool outbound rate limiter is enabled.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, 
}
```

Amazing, so now we start the broadcast.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, 
}
```

We need to create our chain update object. So that is defined in token pool, remember. .chain update. It's going to be an array.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, uint128 outboundRateLimiterRate, 
        public {
            vm.startBroadcast();
            TokenPool.ChainUpdate[] memory updates = new TokenPool.ChainUpdate[](1);
            updates[0] = TokenPool.ChainUpdate({
}
```

And, then named parameters as always. Chains selector, oh it's going to be remote.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, uint128 outboundRateLimiterRate, 
        public {
            vm.startBroadcast();
            TokenPool.ChainUpdate[] memory updates = new TokenPool.ChainUpdate[](1);
            updates[0] = TokenPool.ChainUpdate({
                chainSelector: remoteChainSelector, 
}
```

Remote chain selector, that we are passing in here. Then remote pool.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, uint128 outboundRateLimiterRate, 
        public {
            vm.startBroadcast();
            TokenPool.ChainUpdate[] memory updates = new TokenPool.ChainUpdate[](1);
            updates[0] = TokenPool.ChainUpdate({
                chainSelector: remoteChainSelector, 
                remotePoolAddresses: remotePoolAddresses,
}
```

Remote pool addresses, we need to create that, so we need to create a bytes array in memory, remote pool addresses, is equal to new bytes array with one element. And, then we need to add the first element to be an ABI encoded the remote pool. Let's just check that that's the same. Yep, and then we can pass that in here. Remote pool addresses. Then, we've got the remote token address.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, uint128 outboundRateLimiterRate, 
        public {
            vm.startBroadcast();
            bytes[] memory remotePoolAddresses = new bytes[](1);
            remotePoolAddresses[0] = abi.encode(remotePool);
            TokenPool.ChainUpdate[] memory updates = new TokenPool.ChainUpdate[](1);
            updates[0] = TokenPool.ChainUpdate({
                chainSelector: remoteChainSelector, 
                remotePoolAddresses: remotePoolAddresses,
                remoteTokenAddresses: remoteTokenAddresses,
}
```

Which is going to be an ABI encoded version, cuz it's a type bytes. The remote token. Then, we've got those rate limiter options. Outbound rate limiter.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, uint128 outboundRateLimiterRate, 
        public {
            vm.startBroadcast();
            bytes[] memory remotePoolAddresses = new bytes[](1);
            remotePoolAddresses[0] = abi.encode(remotePool);
            TokenPool.ChainUpdate[] memory updates = new TokenPool.ChainUpdate[](1);
            updates[0] = TokenPool.ChainUpdate({
                chainSelector: remoteChainSelector, 
                remotePoolAddresses: remotePoolAddresses,
                remoteTokenAddresses: remoteTokenAddresses,
                outboundRateLimiter: RateLimiter.Config({
}
```

Colon, which is going to be a token pool. Oh, no it's not it's rate limiter .config.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, uint128 outboundRateLimiterRate, 
        public {
            vm.startBroadcast();
            bytes[] memory remotePoolAddresses = new bytes[](1);
            remotePoolAddresses[0] = abi.encode(remotePool);
            TokenPool.ChainUpdate[] memory updates = new TokenPool.ChainUpdate[](1);
            updates[0] = TokenPool.ChainUpdate({
                chainSelector: remoteChainSelector, 
                remotePoolAddresses: remotePoolAddresses,
                remoteTokenAddresses: abi.encode(remoteToken),
                outboundRateLimiter: RateLimiter.Config({
                    isEnabled: outboundRateLimiterIsEnabled,
                    capacity: outboundRateLimiterCapacity,
}
```

These need to be called config. If in doubt, check the I didn't like that. Oh, cuz it's not address, it's uint64.

```javascript
import "forge-std/Script.sol";
import "cc/contracts/src/v0.8/cc/pools/TokenPool.sol";
import "cc/contracts/src/v0.8/cc/libraries/RateLimiter.sol";

contract ConfigurePoolScript is Script {
    function run(address localPool, uint64 remoteChainSelector, address remotePool, address remoteToken, bool outboundRateLimiterIsEnabled, uint128 outboundRateLimiterCapacity, uint128 outboundRateLimiterRate, 
        public {
            vm.startBroadcast();
            bytes[] memory remotePoolAddresses = new bytes[](1);
            remotePoolAddresses[0] = abi.encode(remotePool);
            TokenPool.ChainUpdate[] memory updates = new TokenPool.ChainUpdate[](1);
            updates[0] = TokenPool.ChainUpdate({
                chainSelector: remoteChainSelector, 
                remotePoolAddresses: remotePoolAddresses,
                remoteTokenAddresses: abi.encode(remoteToken),
                outboundRateLimiter: RateLimiter.Config({
                    isEnabled: outboundRateLimiterIsEnabled,
                    capacity: outboundRateLimiterCapacity,
                    rate: outboundRateLimiterRate,
}
```

There we go, oh, and I've spelled that wrong. uint64, it's not on address, it's the selectors to remove, which we have not. Oh, and we need via I R, just because of the tests, which is a little bit annoying and we've made our script to configure the pools. And now we should integrate this into our test. But, I'm not going to do that because it's a little bit complicated with using pranking and I want to try and keep things as simple as we can because there's a lot of new stuff here.

So, now we have one final script to create, which is going to be a script to bridge tokens to send a cross-chain message. So, let's do that now. 
