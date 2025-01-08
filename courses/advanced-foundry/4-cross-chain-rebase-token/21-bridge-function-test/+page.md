## Bridge Function Test

We are going to create a function that will bridge tokens cross-chain, and test it.

```javascript
contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;

    function bridgeTokens(uint256 amountToBridge, uint256 localFork, uint256 remoteFork, Register.NetworkDetails memory localNetworkDetails, Register.NetworkDetails memory remoteNetworkDetails, RebaseToken localToken, RebaseToken remoteToken) public {
        vm.selectFork(localFork);
        vm.startPrank(user);

        Client.EVM to any Message memory message = Client.EVM to any Message({
            receiver: abi.encode(user),
            data: "",
            tokenAmounts: new Client.EVMTokenAmount[](1){
                token: address(localToken),
                amount: amountToBridge
            },
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({ gasLimit: 0 }))
        });

        uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, fee);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, amountToBridge);

        uint256 localBalanceBefore = localToken.balanceOf(user);

        IRouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);

        uint256 localBalanceAfter = localToken.balanceOf(user);
        assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);

        vm.selectFork(remoteFork);
        vm.warp(block.timestamp + 20 minutes);
        uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
        ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
        uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
        assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge);
        uint256 localUserInterestRate = localToken.getUserInterestRate(user);
        assertEq(remoteUserInterestRate, localUserInterestRate);
    }
}
```

We are going to use the  `--via-ir` flag when running forge build. This compiles the solidity code to bytecode first and then performs some optimizations. 

```bash
forge build --via-ir
```

We also want to check that the balances before and after the cross-chain message are as expected. 

```javascript
import IRouterClient from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import Client from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";

contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;

    function bridgeTokens(uint256 amountToBridge, uint256 localFork, uint256 remoteFork, Register.NetworkDetails memory localNetworkDetails, Register.NetworkDetails memory remoteNetworkDetails, RebaseToken localToken, RebaseToken remoteToken) public {
        vm.selectFork(localFork);
        vm.startPrank(user);
        Client.EVM to any Message memory message = Client.EVM to any Message({
            receiver: abi.encode(user),
            data: "",
            tokenAmounts: new Client.EVMTokenAmount[](1){
                token: address(localToken),
                amount: amountToBridge
            },
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({ gasLimit: 0 }))
        });

        uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, fee);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, amountToBridge);
        uint256 localBalanceBefore = localToken.balanceOf(user);
        IRouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);
        uint256 localBalanceAfter = localToken.balanceOf(user);
        assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);

        vm.selectFork(remoteFork);
        vm.warp(block.timestamp + 20 minutes);
        uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
        ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
        uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
        assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge);
        uint256 localUserInterestRate = localToken.getUserInterestRate(user);
        assertEq(remoteUserInterestRate, localUserInterestRate);
    }
}
```

We can get the interest rate on the user on the source chain and use it in the assertion.

```javascript
import IRouterClient from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import Client from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";

contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;

    function bridgeTokens(uint256 amountToBridge, uint256 localFork, uint256 remoteFork, Register.NetworkDetails memory localNetworkDetails, Register.NetworkDetails memory remoteNetworkDetails, RebaseToken localToken, RebaseToken remoteToken) public {
        vm.selectFork(localFork);
        vm.startPrank(user);
        Client.EVM to any Message memory message = Client.EVM to any Message({
            receiver: abi.encode(user),
            data: "",
            tokenAmounts: new Client.EVMTokenAmount[](1){
                token: address(localToken),
                amount: amountToBridge
            },
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({ gasLimit: 0 }))
        });

        uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, fee);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, amountToBridge);
        uint256 localBalanceBefore = localToken.balanceOf(user);
        IRouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);
        uint256 localBalanceAfter = localToken.balanceOf(user);
        assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);
        uint256 localUserInterestRate = localToken.getUserInterestRate(user);
        vm.selectFork(remoteFork);
        vm.warp(block.timestamp + 20 minutes);
        uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
        ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
        uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
        assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge);
        assertEq(remoteUserInterestRate, localUserInterestRate);
    }
}
```

We need to make sure that we are using single-line pranks. 

```javascript
import IRouterClient from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import Client from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";

contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;

    function bridgeTokens(uint256 amountToBridge, uint256 localFork, uint256 remoteFork, Register.NetworkDetails memory localNetworkDetails, Register.NetworkDetails memory remoteNetworkDetails, RebaseToken localToken, RebaseToken remoteToken) public {
        vm.selectFork(localFork);
        vm.prank(user);
        Client.EVM to any Message memory message = Client.EVM to any Message({
            receiver: abi.encode(user),
            data: "",
            tokenAmounts: new Client.EVMTokenAmount[](1){
                token: address(localToken),
                amount: amountToBridge
            },
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({ gasLimit: 0 }))
        });

        uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        vm.prank(user);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, fee);
        vm.prank(user);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, amountToBridge);
        uint256 localBalanceBefore = localToken.balanceOf(user);
        vm.prank(user);
        IRouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);
        vm.prank(user);
        uint256 localBalanceAfter = localToken.balanceOf(user);
        assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);
        vm.selectFork(remoteFork);
        vm.warp(block.timestamp + 20 minutes);
        uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
        ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
        uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
        assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge);
        uint256 remoteUserInterestRate = remoteToken.getUserInterestRate(user);
        assertEq(remoteUserInterestRate, localUserInterestRate);
    }
}
```

We can also check that our cross-chain message has propagated correctly using `ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);` 

```javascript
import IRouterClient from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import Client from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";

contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;

    function bridgeTokens(uint256 amountToBridge, uint256 localFork, uint256 remoteFork, Register.NetworkDetails memory localNetworkDetails, Register.NetworkDetails memory remoteNetworkDetails, RebaseToken localToken, RebaseToken remoteToken) public {
        vm.selectFork(localFork);
        vm.prank(user);
        Client.EVM to any Message memory message = Client.EVM to any Message({
            receiver: abi.encode(user),
            data: "",
            tokenAmounts: new Client.EVMTokenAmount[](1){
                token: address(localToken),
                amount: amountToBridge
            },
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({ gasLimit: 0 }))
        });

        uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        vm.prank(user);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, fee);
        vm.prank(user);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, amountToBridge);
        uint256 localBalanceBefore = localToken.balanceOf(user);
        vm.prank(user);
        IRouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);
        uint256 localBalanceAfter = localToken.balanceOf(user);
        assertEq(localBalanceAfter, localBalanceBefore - amountToBridge);
        vm.selectFork(remoteFork);
        vm.warp(block.timestamp + 20 minutes);
        uint256 remoteBalanceBefore = remoteToken.balanceOf(user);
        ccipLocalSimulatorFork.switchChainAndRouteMessage(remoteFork);
        uint256 remoteBalanceAfter = remoteToken.balanceOf(user);
        assertEq(remoteBalanceAfter, remoteBalanceBefore + amountToBridge);
        uint256 remoteUserInterestRate = remoteToken.getUserInterestRate(user);
        assertEq(remoteUserInterestRate, localUserInterestRate);
    }
}
```

This will also update the user's interest rate on the remote fork.

```javascript
import IRouterClient from "@ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import Client from "@ccip/contracts/src/v0.8/ccip/libraries/Client.sol";

contract CrossChainTest is Test {
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork private ccipLocalSimulatorFork;

    function bridgeTokens(uint256 amountToBridge, uint256 localFork, uint256 remoteFork, Register.NetworkDetails memory localNetworkDetails, Register.NetworkDetails memory remoteNetworkDetails, RebaseToken localToken, RebaseToken remoteToken) public {
        vm.selectFork(localFork);
        vm.prank(user);
        Client.EVM to any Message memory message = Client.EVM to any Message({
            receiver: abi.encode(user),
            data: "",
            tokenAmounts: new Client.EVMTokenAmount[](1){
                token: address(localToken),
                amount: amountToBridge
            },
            feeToken: localNetworkDetails.linkAddress,
            extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({ gasLimit: 0 }))
        });

        uint256 fee = IRouterClient(localNetworkDetails.routerAddress).getFee(remoteNetworkDetails.chainSelector, message);
        vm.prank(user);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, fee);
        vm.prank(user);
        IERC20(localToken.address).approve(localNetworkDetails.routerAddress, amountToBridge);
        uint256 localBalanceBefore = localToken.balanceOf(user);
        vm.prank(user);
        IRouterClient(localNetworkDetails.routerAddress).ccipSend(remoteNetworkDetails.chainSelector, message);
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
}
```

We can now build and run our tests. 

```bash
forge build --via-ir
forge test
```