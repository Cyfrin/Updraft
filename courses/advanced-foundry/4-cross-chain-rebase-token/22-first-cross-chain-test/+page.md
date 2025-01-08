## CCIP Rebase Token - First Cross-Chain Test

We have done all of the set-up to be able to write our tests. We have created our forks. We have created a CCIP local simulator fork instance. We have got the network details on both Sepolia and Arbitrum so that we could deploy our token, we could deploy our token pool, we could deploy the vault only on Sepolia. We've granted them in and burn roles. We've registered the CCIP admin to be the owner. We have accepted the admin role. We've set the pools for the token. We have then done the same on Arbitrum and then we have configured the token pools. So then, we configured the pool on Sepolia so that we could receive and send tokens to Arbitrum. And then, we did the same on the Arbitrum fork to be able to send and receive tokens to Sepolia. And we did that by creating this chain update struct which we pass to apply chain updates. If you want to remove a chain, then you would populate this uint64 array and pass through the chain selector that you wanted to remove. Then, we created a function, finally, to be able to bridge tokens. By creating this message struct. Where is it? This message struct here. Client.EVM2AnyMessage which collected together the receiver which we said we are sending it to ourselves on the other chain with the same address. We didn't send any data. We sent some token with some amount and we enabled this to be able to be used for both the Sepolia token and then also the Arbitrum Sepolia token. We said that we're going to pay our fees in Link, and then we set the extraArgs to just be no custom gas limit because it enables you to set a custom gas limit which we didn't need to do. We then got the fee to be able to send this CCIP message. We got some Link from a faucet. We then approved the router to be able to send some Link of amount fee. We then approved the router to send the local spend the local token of amount to bridge for the user. And then, we called CCIP send to send the message cross-chain. We did some assertions to check all the state was as expected. We switched the fork. We then pretended that 20 minutes had passed. We called this switch chain and route message on the CCIP local simulator fork to propagate the message cross-chain. And then, we did, finally, a little bit more state checking. So, let's create a test which calls bridge tokens to send some tokens cross-chain. So, I'm going to create a test, which is going to be a function. Test bridge all tokens. Because we're going to bridge all of our tokens. Now, we are not going to make this a fuzz test so we don't need any arguments. We're going to make it public. And the reason we're not making it a fuzz test is because it already takes long enough by using the CCIP local simulator fork to pretend that we're sending a cross-chain message. So, we don't want to do that. So, the first thing we want to do is, we want to select the fork that we're working on. Select fork just to make sure we're going to initially be working on Sepolia. Then, we need to deposit to the vault. So, first of all, we need to deal these some tokens and we're going to use this, send_value, which we need to define. And we're actually just going to define that in storage because then we can reuse it. So, uint256 send_value equals, and we're going to make this 1e5 to make it really small. Right. Going back down to where we were. So, we now got this send_value. And, we've used the vm.deal cheat code to be able to send it to the user so that now they have the ETH to be able to deposit into the vault. And remember, we need to do a vm.prank that we are user, and then we need to deposit into the vault. And the way that we do this is we call the vault.deposit and this doesn't take any arguments. However, we also need to send some ETH along with this function call. And the way that we do that is using the curly brace notation and then we specify the value, value, with a colon and then the amount which is going to be send_value. And curly brace it. Val you, and the other thing we need to do is we need to make sure that this address is payable. So, we first of all need to cast the vault to an address so that we can then cast it to payable because we can't directly cast it to payable because it's of type vault. So, now it knows that this vault address is payable and now, we need to cast it again to the vault contract so that we can call the deposit function onto it. So, we have now deposited into our vault. Let's do a little check that the balance of the user. Sepolia token . balance of the user is equal to the send_value which it should be because no time has passed and they've just deposited into the vault. In the real world, sometime would have passed because it takes time for you to be able to send this call to say get the balance of. And now, let's call bridge tokens. Bridge tokens and we need the amount to bridge which is going to be send_value because we want to send all of our tokens. The local fork is going to be the Sepolia fork because we're going to go from Sepolia to Arbitrum. The remote fork is going to be the arb Sepolia fork. Local network details is Sepolia network details. Remote network details is going to be arb Sepolia network details. The local token is going to be the Sepolia token. And the remote token is going to be the arb Sepolia token. And this will test that we are bridging cross-chain. And, we already have some assertions inside there as we said before. So now, we can run that test. So, let's do a little forge build --fir --ir first to check that everything builds correctly. And then, we can run forge test --mc for match contract cross and we need the via-ir flag, via-ir. Aha, we now have you cannot override an ongoing prank with a single vm.prank, use vm.startPrank to override the current prank.  Suite result: FAILED. 0 passed, 1 failed, 0 skipped.  Ran 1 test suite in 7.28s (0.00s CPU time). 0 tests passed, 1 failed, 0 skipped (1 total tests). Encountering failing test in test/CrossChain.t.sol.  Failing tests: [FAIL] vm.prank cannot override an ongoing prank with a single vm.prank; use vm.startPrank to override the current prank (setup(): gas: 0). Encountered a total of 1 failing tests, 0 tests succeeded.  ```bash
  clarightingalecc-reb-token-test
  ```
  
  ```bash
  forge test --mc Cross --via-ir
  ```
  Aha. It's inside configure token pool. We already had a prank going, so we can actually just remove this and put it up above these two configure token pools because we're doing pranks inside there. Let's do it again. So, we now got this error, out of gas. So, we're going to change this gas limit to something like 100,000. Now, let's set the gas limit to 100,000 and then let's run our test again. So, I changed the custom gas limits to be 100,000 and now it's passing. This is actually a known bug with Chainlink local where you actually have to pass a custom gas limit in order to be able to call the pools which performs some action in the real world, if you are actually sending a CCIP message you would not need to populate this with a natural gas limit. This could be set to zero because this is for the CCIP receiver smart contract not gas used by the token pools themselves. And we could also change this to EVM extraArgsV2, and then disallow the allow out of order execution to be false if we wanted to. And that would work absolutely fine. And you know what, let's not allow out of order execution. We want to make sure that all token transfers have happened in the order that they are specified or sent. And our test is now passing. Woo-hoo. Now, let's make sure we can bridge our tokens back. So, after we've bridged all of our tokens. Let's make sure we can bridge back. So, bridge tokens, and let's also warp the time a little bit, so we need to do a vm.selectFork and we're going to pass in the arbSepoliaFork to say we're working on Arbitrum Sepolia. Now, we should already be working on Arbitrum Sepolia from inside this function, but I'm going to do that anyway just to check. And then, we're going to do a vm.warp the time to be another 20 minutes just to say after some time, we are going to withdraw all of our balance. So now, we need to pass in the balance of the sender. So, we need to get the arb Sepolia token .balance of the user. It's the first argument. Then, we need to go Sepolia fork, arb Sepolia fork to the Sepolia fork. Arb Sepolia network details, Sepolia network details. Arb Sepolia token, Sepolia token. And let's just go through this bridge tokens. So, let's say we are now on Arbitrum Sepolia. We would create the message as normal, we would get the fees, we would do the approvals, balance of, CCIP send, go back over to the other chain, and yes, everything should work as normal. So, now, we can run this test as if we are bridging to and then, we are bridging all of our funds back. And it's passed. So, we can now bridge our tokens from Sepolia to Arbitrum and then bridge our tokens back from Sepolia to Arbitrum and all of the state is as expected because we did all of our assertions inside this bridge tokens function. Let's run. So now, you could add some more testing. You could test that I can bridge and then bridge again on the same chain. And then, I bridge some back, or I bridge a portion to and then a portion back. And other things like that, and I encourage you to write some tests like that or think of some other edge cases. We're going to leave it here because we've done a lot of testing, and there's been a lot of new stuff here. And so, we're going to leave it there, but well done because that was very, very intense. We have learned a lot here, including how to send a CCIP message, how to enable our token for cross-chain transfer. We have checked whether those cross-chain transfers do, in fact, work. So, please, go and take a break, I know, I am going to now. And I'm going to go get myself a nice cold drink. And, probably go take a little walk so I encourage you to do the same. And, oh I do really fancy some ice cream, maybe some pistachio, but it is a little bit cold here. Anyway, so, I will see you very soon where we are going to make our scripts. 
```javascript
contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;
    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;
    RebaseToken private sepoliaToken;
    RebaseToken private arbSepoliaToken;
    Vault private vault; // Only on sepolia chain
    RebaseTokenPool private sepoliaLiPool;
    RebaseTokenPool private arbSepoliaLiPool;
    Register_NetworkDetails private sepoliaNetworkDetails;
    Register_NetworkDetails private arbSepoliaNetworkDetails;

    function setUp() public {
        sepoliaFork = vm.createSelectFork("sepolia-eth");
        arbSepoliaFork = vm.createFork("arb-sepolia");
        ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
        vm.makePersistent(ccipLocalSimulatorFork);
        // 1. Deploy and configure on Sepolia (Sepolia chain)
        vm.startPrank(owner);
        sepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainId);
        sepoliaToken = new RebaseToken();
        sepoliaLiPool = new RebaseTokenPool();
        IERC20(address(sepoliaToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
        sepoliaNetworkDetails.minProxyAddress
        sepoliaNetworkDetails.routerAddress
        vault = new Vault(address(sepoliaToken));
        sepoliaToken.grantMintAndBurnRole(address(sepoliaLiPool));
        RegistryModuleOwnerCustom(sepoliaNetworkDetails.tokenAdminRegistryAddress).registerAdmin(owner);
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).acceptAdminRole(address(sepoliaToken));
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).setPool(address(sepoliaLiPool));
        vm.stopPrank();

        // 2. Deploy and configure on Arb Sepolia
        vm.startPrank(owner);
        arbSepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainId);
        arbSepoliaToken = new RebaseToken();
        arbSepoliaLiPool = new RebaseTokenPool();
        IERC20(address(arbSepoliaToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
        arbSepoliaNetworkDetails.minProxyAddress
        arbSepoliaNetworkDetails.routerAddress
        sepoliaToken.grantMintAndBurnRole(address(arbSepoliaLiPool));
        RegistryModuleOwnerCustom(sepoliaNetworkDetails.tokenAdminRegistryAddress).registerAdmin(owner);
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).acceptAdminRole(address(arbSepoliaToken));
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).setPool(address(arbSepoliaLiPool));
        vm.stopPrank();

        configureTokenPool(
            sepoliaFork,
            address(sepoliaLiPool),
            arbSepoliaNetworkDetails.chainSelector,
            address(arbSepoliaToken)
        );
        configureTokenPool(
            arbSepoliaFork,
            address(arbSepoliaLiPool),
            sepoliaNetworkDetails.chainSelector,
            address(sepoliaToken)
        );
    }

    function configureTokenPool(
        uint256 localFork,
        address localPool,
        uint64 remoteChainSelector,
        address remoteTokenAddress
    ) public {
        vm.selectFork(localFork);
        bytes memory remoteAddresses = new bytes[](1);
        remoteAddresses[0] = abi.encode(remoteTokenAddress);

        struct ChainPoolUpdate memory chainToAdd = ChainPoolUpdate({
            chainSelector: remoteChainSelector,
            remoteTokenAddresses: remoteAddresses,
            tokenPoolAddress: abi.encode(localPool),
            outboundRateLimiterConfig: RateLimiter.Config({isEnabled: false, capacity: 0, rate: 0}),
            inboundRateLimiterConfig: RateLimiter.Config({isEnabled: false, capacity: 0, rate: 0}),
        });
        TokenPool(localPool).applyChainUpdates(new uint64[](1), chainToAdd);
    }

    function bridgeTokens() public {
        uint256 amountToBridge;
        uint256 localFork;
        uint256 remoteFork;
        Register_NetworkDetails memory localNetworkDetails;
        Register_NetworkDetails memory remoteNetworkDetails;
        RebaseToken localToken;
        RebaseToken remoteToken;

        vm.selectFork(localFork);
        struct EVM2AnyMessage memory message = EVM2AnyMessage({
            bytes receiver; // abi.encode(receiver address) for dest EVM chains
            bytes data; // Data payload
            EVMTakenAmount[] memory tokenAmounts; // Token transfers
            address feeToken; // Address of feeToken, address(0) means you will send msg.value.
            bytes extraArgs; // Populate this with argToBytes(EVMT extraArgsV2)
        });

        // Populate this with new client.EVMTakenAmount[](1);
        tokenAmounts[0] = client.EVMTakenAmount({token: address(localToken), amount: amountToBridge});

        message = client.EVM2AnyMessage({
            receiver: abi.encode(user),
            data: "", // abi.encode(user),
            tokenAmounts: tokenAmounts,
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: client.argToBytes(client.EVMT extraArgsV2({gasLimit: 500_000, allowOutOfOrderExecution: false})),
        });
        uint256 fee = RouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        ccipLocalSimulatorFork.requestLinkFromFaucet(user, fee);

        vm.prank(user);
        IERC20(address(localToken)).approve(localNetworkDetails.routerAddress, fee);
        vm.prank(user);
        IERC20(address(localToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
        uint256 localBalanceBefore = localToken.balanceOf(user);
        vm.prank(user);
        RouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);
        uint256 localBalanceAfter = localToken.balanceOf(user);
        assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);
        uint256 localUserInterestRate = localToken.getUserInterestRate(user);

        vm.selectFork(remoteFork);
        vm.warp(block.timestamp + 20 minutes);
        uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
        ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
        uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
        assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge);
        uint256 remoteUserInterestRate = remoteToken.getUserInterestRate(user);
        assertEq(remoteUserInterestRate, localUserInterestRate);
    }

    function testBridgeAllTokens() public {
        vm.selectFork(sepoliaFork);
        vm.deal(user, SEND_VALUE);
        vm.prank(user);
        payable(address(vault)).deposit{value: SEND_VALUE}();
        assertEq(sepoliaToken.balanceOf(user), SEND_VALUE);
        bridgeTokens(
            SEND_VALUE,
            sepoliaFork,
            arbSepoliaFork,
            sepoliaNetworkDetails,
            arbSepoliaNetworkDetails,
            sepoliaToken,
            arbSepoliaToken
        );
    }
}
```

```bash
forge build --fir --ir
```

```bash
forge test --mc Cross --via-ir
```

We already had a prank going, so we can actually just remove this and put it up above these two configure token pools because we're doing pranks inside there. Let's do it again.

```bash
forge test --mc Cross --via-ir
```

We're going to change this gas limit to something like 100,000. 

```javascript
extraArgs: client.argToBytes(client.EVMT extraArgsV2({gasLimit: 100_000, allowOutOfOrderExecution: false})),
```

Now, let's set the gas limit to 100,000 and then let's run our test again.

```bash
forge test --mc Cross --via-ir
```

This is actually a known bug with Chainlink local where you actually have to pass a custom gas limit in order to be able to call the pools which performs some action in the real world, if you are actually sending a CCIP message you would not need to populate this with a natural gas limit. This could be set to zero because this is for the CCIP receiver smart contract not gas used by the token pools themselves. And we could also change this to EVM extraArgsV2, and then disallow the allow out of order execution to be false if we wanted to. And that would work absolutely fine. And you know what, let's not allow out of order execution. We want to make sure that all token transfers have happened in the order that they are specified or sent. And our test is now passing. Woo-hoo. Now, let's make sure we can bridge our tokens back. So, after we've bridged all of our tokens. Let's make sure we can bridge back. So, bridge tokens, and let's also warp the time a little bit, so we need to do a vm.selectFork and we're going to pass in the arbSepoliaFork to say we're working on Arbitrum Sepolia. Now, we should already be working on Arbitrum Sepolia from inside this function, but I'm going to do that anyway just to check. And then, we're going to do a vm.warp the time to be another 20 minutes just to say after some time, we are going to withdraw all of our balance. So now, we need to pass in the balance of the sender. So, we need to get the arb Sepolia token .balance of the user. It's the first argument. Then, we need to go Sepolia fork, arb Sepolia fork to the Sepolia fork. Arb Sepolia network details, Sepolia network details. Arb Sepolia token, Sepolia token. And let's just go through this bridge tokens. So, let's say we are now on Arbitrum Sepolia. We would create the message as normal, we would get the fees, we would do the approvals, balance of, CCIP send, go back over to the other chain, and yes, everything should work as normal. So, now, we can run this test as if we are bridging to and then, we are bridging all of our funds back. And it's passed. So, we can now bridge our tokens from Sepolia to Arbitrum and then bridge our tokens back from Sepolia to Arbitrum and all of the state is as expected because we did all of our assertions inside this bridge tokens function. Let's run. So now, you could add some more testing. You could test that I can bridge and then bridge again on the same chain. And then, I bridge some back, or I bridge a portion to and then a portion back. And other things like that, and I encourage you to write some tests like that or think of some other edge cases. We're going to leave it here because we've done a lot of testing, and there's been a lot of new stuff here. And so, we're going to leave it there, but well done because that was very, very intense. We have learned a lot here, including how to send a CCIP message, how to enable our token for cross-chain transfer. We have checked whether those cross-chain transfers do, in fact, work. So, please, go and take a break, I know, I am going to now. And I'm going to go get myself a nice cold drink. And, probably go take a little walk so I encourage you to do the same. And, oh I do really fancy some ice cream, maybe some pistachio, but it is a little bit cold here. Anyway, so, I will see you very soon where we are going to make our scripts. 
```javascript
contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;
    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;
    RebaseToken private sepoliaToken;
    RebaseToken private arbSepoliaToken;
    Vault private vault; // Only on sepolia chain
    RebaseTokenPool private sepoliaLiPool;
    RebaseTokenPool private arbSepoliaLiPool;
    Register_NetworkDetails private sepoliaNetworkDetails;
    Register_NetworkDetails private arbSepoliaNetworkDetails;

    function setUp() public {
        sepoliaFork = vm.createSelectFork("sepolia-eth");
        arbSepoliaFork = vm.createFork("arb-sepolia");
        ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
        vm.makePersistent(ccipLocalSimulatorFork);
        // 1. Deploy and configure on Sepolia (Sepolia chain)
        vm.startPrank(owner);
        sepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainId);
        sepoliaToken = new RebaseToken();
        sepoliaLiPool = new RebaseTokenPool();
        IERC20(address(sepoliaToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
        sepoliaNetworkDetails.minProxyAddress
        sepoliaNetworkDetails.routerAddress
        vault = new Vault(address(sepoliaToken));
        sepoliaToken.grantMintAndBurnRole(address(sepoliaLiPool));
        RegistryModuleOwnerCustom(sepoliaNetworkDetails.tokenAdminRegistryAddress).registerAdmin(owner);
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).acceptAdminRole(address(sepoliaToken));
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).setPool(address(sepoliaLiPool));
        vm.stopPrank();

        // 2. Deploy and configure on Arb Sepolia
        vm.startPrank(owner);
        arbSepoliaNetworkDetails = ccipLocalSimulatorFork.getNetworkDetails(block.chainId);
        arbSepoliaToken = new RebaseToken();
        arbSepoliaLiPool = new RebaseTokenPool();
        IERC20(address(arbSepoliaToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
        arbSepoliaNetworkDetails.minProxyAddress
        arbSepoliaNetworkDetails.routerAddress
        sepoliaToken.grantMintAndBurnRole(address(arbSepoliaLiPool));
        RegistryModuleOwnerCustom(sepoliaNetworkDetails.tokenAdminRegistryAddress).registerAdmin(owner);
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).acceptAdminRole(address(arbSepoliaToken));
        TokenAdminRegistry(sepoliaNetworkDetails.tokenAdminRegistryAddress).setPool(address(arbSepoliaLiPool));
        vm.stopPrank();

        configureTokenPool(
            sepoliaFork,
            address(sepoliaLiPool),
            arbSepoliaNetworkDetails.chainSelector,
            address(arbSepoliaToken)
        );
        configureTokenPool(
            arbSepoliaFork,
            address(arbSepoliaLiPool),
            sepoliaNetworkDetails.chainSelector,
            address(sepoliaToken)
        );
    }

    function configureTokenPool(
        uint256 localFork,
        address localPool,
        uint64 remoteChainSelector,
        address remoteTokenAddress
    ) public {
        vm.selectFork(localFork);
        bytes memory remoteAddresses = new bytes[](1);
        remoteAddresses[0] = abi.encode(remoteTokenAddress);

        struct ChainPoolUpdate memory chainToAdd = ChainPoolUpdate({
            chainSelector: remoteChainSelector,
            remoteTokenAddresses: remoteAddresses,
            tokenPoolAddress: abi.encode(localPool),
            outboundRateLimiterConfig: RateLimiter.Config({isEnabled: false, capacity: 0, rate: 0}),
            inboundRateLimiterConfig: RateLimiter.Config({isEnabled: false, capacity: 0, rate: 0}),
        });
        TokenPool(localPool).applyChainUpdates(new uint64[](1), chainToAdd);
    }

    function bridgeTokens() public {
        uint256 amountToBridge;
        uint256 localFork;
        uint256 remoteFork;
        Register_NetworkDetails memory localNetworkDetails;
        Register_NetworkDetails memory remoteNetworkDetails;
        RebaseToken localToken;
        RebaseToken remoteToken;

        vm.selectFork(localFork);
        struct EVM2AnyMessage memory message = EVM2AnyMessage({
            bytes receiver; // abi.encode(receiver address) for dest EVM chains
            bytes data; // Data payload
            EVMTakenAmount[] memory tokenAmounts; // Token transfers
            address feeToken; // Address of feeToken, address(0) means you will send msg.value.
            bytes extraArgs; // Populate this with argToBytes(EVMT extraArgsV2)
        });

        // Populate this with new client.EVMTakenAmount[](1);
        tokenAmounts[0] = client.EVMTakenAmount({token: address(localToken), amount: amountToBridge});

        message = client.EVM2AnyMessage({
            receiver: abi.encode(user),
            data: "", // abi.encode(user),
            tokenAmounts: tokenAmounts,
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: client.argToBytes(client.EVMT extraArgsV2({gasLimit: 500_000, allowOutOfOrderExecution: false})),
        });
        uint256 fee = RouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        ccipLocalSimulatorFork.requestLinkFromFaucet(user, fee);

        vm.prank(user);
        IERC20(address(localToken)).approve(localNetworkDetails.routerAddress, fee);
        vm.prank(user);
        IERC20(address(localToken)).approve(localNetworkDetails.routerAddress, amountToBridge);
        uint256 localBalanceBefore = localToken.balanceOf(user);
        vm.prank(user);
        RouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);
        uint256 localBalanceAfter = localToken.balanceOf(user);
        assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);
        uint256 localUserInterestRate = localToken.getUserInterestRate(user);

        vm.selectFork(remoteFork);
        vm.warp(block.timestamp + 20 minutes);
        uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
        ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
        uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
        assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge);
        uint256 remoteUserInterestRate = remoteToken.getUserInterestRate(user);
        assertEq(remoteUserInterestRate, localUserInterestRate);
    }

    function testBridgeAllTokens() public {
        vm.selectFork(sepoliaFork);
        vm.deal(user, SEND_VALUE);
        vm.prank(user);
        payable(address(vault)).deposit{value: SEND_VALUE}();
        assertEq(sepoliaToken.balanceOf(user), SEND_VALUE);
        bridgeTokens(
            SEND_VALUE,
            sepoliaFork,
            arbSepoliaFork,
            sepoliaNetworkDetails,
            arbSepoliaNetworkDetails,
            sepoliaToken,
            arbSepoliaToken
        );
    }
}
```

```bash
forge build --fir --ir
```

```bash
forge test --mc Cross --via-ir
```

We already had a prank going, so we can actually just remove this and put it up above these two configure token pools because we're doing pranks inside there. Let's do it again. 

```bash
forge test --mc Cross --via-ir
```

We're going to change this gas limit to something like 100,000. 

```javascript
extraArgs: client.argToBytes(client.EVMT extraArgsV2({gasLimit: 100_000, allowOutOfOrderExecution: false})),
```

Now, let's set the gas limit to 100,000 and then let's run our test again.

```bash
forge test --mc Cross --via-ir
```

This is actually a known bug with Chainlink local where you actually have to pass a custom gas limit in order to be able to call the pools which performs some action in the real world, if you are actually sending a CCIP message you would not need to populate this with a natural gas limit. This could be set to zero because this is for the CCIP receiver smart contract not gas used by the token pools themselves. And we could also change this to EVM extraArgsV2, and then disallow the allow out of order execution to be false if we wanted to. And that would work absolutely fine. And you know what, let's not allow out of order execution. We want to make sure that all token transfers have happened in the order that they are specified or sent. And our test is now passing. Woo-hoo. Now, let's make sure we can bridge our tokens back. So, after we've bridged all of our tokens. Let's make sure we can bridge back. So, bridge tokens, and let's also warp the time a little bit, so we need to do a vm.selectFork and we're going to pass in the arbSepoliaFork to say we're working on Arbitrum Sepolia. Now, we should already be working on Arbitrum Sepolia from inside this function, but I'm going to do that anyway just to check. And then, we're going to do a vm.warp the time to be another 20 minutes just to say after some time, we are going to withdraw all of our balance. So now, we need to pass in the balance of the sender. So, we need to get the arb Sepolia token .balance of the user. It's the first argument. Then, we need to go Sepolia fork, arb Sepolia fork to the Sepolia fork. Arb Sepolia network details, Sepolia network details. Arb Sepolia token, Sepolia token. And let's just go through this bridge tokens. So, let's say we are now on Arbitrum Sepolia. We would create the message as normal, we would get the fees, we would do the approvals, balance of, CCIP send, go back over to the other chain, and yes, everything should work as normal. So, now, we can run this test as if we are bridging to and then, we are bridging all of our funds back. And it's passed. So, we can now bridge our tokens from Sepolia to Arbitrum and then bridge our tokens back from Sepolia to Arbitrum and all of the state is as expected because we did all of our assertions inside this bridge tokens function. Let's run. So now, you could add some more testing. You could test that I can bridge and then bridge again on the same chain. And then, I bridge some back, or I bridge a portion to and then a portion back. And other things like that, and I encourage you to write some tests like that or think of some other edge cases. We're going to leave it here because we've done a lot of testing, and there's been a lot of new stuff here. And so, we're going to leave it there, but well done because that was very, very intense. We have learned a lot here, including how to send a CCIP message, how to enable our token for cross-chain transfer. We have checked whether those cross-chain transfers do, in fact, work. So, please, go