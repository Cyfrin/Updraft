## Bridging Script

We have one last script that we are going to create. We could create another script to do the deposit and redemption, so like an interaction script. However, we are going to imagine that our users are probably going to be using like Castcall to do a call to the contract to deposit or redeem, or maybe it�s built into some kind of frontend, or something like that. So, we are actually not going to create a script to interact with our protocol. Instead, we are going to use Cast to do that, and the very last script that we are going to create is one to send a CCIP message. And in our message, we are going to send just tokens and no data. There is the option with CCIP to send data along with your tokens. However, the receiver would need to be a smart contract rather than an EOA because EOAs can�t receive data, and they wouldn�t be able to do anything with it. However, if your receiver was a smart contract then you could implement a CCIP receive function in order to be able to do whatever needs to be done with the data that you�ve passed along such as call a function like stake the tokens after you receive them, or something like that.

So, let�s create our script, and we are going to call it:

```javascript
BridgeTokens.sol;
```

and then do the normal thing:

```javascript
SPDX-License-Identifier: MIT
```

```javascript
pragma solidity ^0.8.24;
```

```javascript
import { Script } from "forge-std/Script.sol";
```

and then let�s create our script. So,

```javascript
contract BridgeTokensScript is Script {
```

Now, let�s create our function run, which is going to need to take some parameters, like the receiver address, etc., and let�s make this public. And then, we are going to need to do the normal vm.startBroadcast, and then also a vm.stopBroadcast.

Now, in here, we are going to do very similar to what we did in the test. So, we are going to be first of all, creating our CCIP message, which is struct evm to any message. Then, we are going to approve the router to be able to spend our tokens. Then, we need to get the fees from the router. Then, we need to approve the router to be able to spend our fees, and again, we are going to be doing all of this in link. But, we could do this in Ethereum, or native tokens. Then, we are going to call the router with CCIP send by passing through the destination chain selector, and the message.

```javascript
function run(address routerAddress) public {
    vm.startBroadcast();
    vm.stopBroadcast();
    router.cccipSend();
}
```

.cccipSend, and then we are going to need some parameters inside here. Now, what interface do we need to cast this to? The router address, this is going to be like a router address, and call CCIP send, but then to do that, we can�t just do that on a type address. Instead, we need something like IRouter, but, it�s not called IRouter if you remember from before. It�s called IRouterClient hopefully, and we need to import that from a chain link. So, import

```javascript
import { IRouterClient } from "@cccip/contracts/src/v0.8/interfaces/IRouterClient.sol";
```

IRouterClient, and this is just that interface which has all of the router functions which our users are going to be calling. And then, this is from @cccip/contracts/src/v0.8/interfaces/IRouterClient.sol". And now, we can pass that as an IRouterClient, and we are also going to Because, this router address is going to be different on every chain, it�s going to be dependent on which chain we are running this script. So, we can�t hardcode it. So, we need to pass through the address, which is going to be the router address, or CCIP router address, whichever you want to name this variable. So, that�s the first thing that we need to pass through as a parameter to this function. So, what were the arguments to this function? And if you remember from before, it�s the uint64 destination chain selector. So, again, we are going to want to pass this through as a parameter. And then, this client.evm to any message, so we are going to need to create that message again. We are also going to need to import the client library. So, import

```javascript
function run(address routerAddress) public {
    vm.startBroadcast();
    IRouterClient router = IRouterClient(routerAddress);
    vm.stopBroadcast();
}
```

client, so that we can create that message, and that is the correct path because it�s in libraries. And then, we are going to need to create our message. So, we�ve got client.evm to any message message, equals client.evm to any message, brackets curly braces. And, we are going to need named members again.

Now, in here, we need to pass through some destination chain selector. And then, also our message. So, we are going to pass this oh why didn�t that type in message, like that. We are going to need to pass that through to our function run. This is a uint64. And now, we need to build this message. So, the struct is like this. So, let�s copy that over again so that we don�t forget what it looks like. And, I am just going to format that nicely. Select it all, command / click. So, the first is the abi encode receiver. So, receiver colon, abi.encode, and we are going to need to encode some address which is going to be the receiver address which we are going to pass through as a parameter to this function. We put at the start address, receiver address, like that. And then, the second element is the bytes data. So, data, I am not going to send any through. So, it can just be an empty string. Then, we need that evm token amounts array, and if you remember from before, this is This struct just has the members token address, and then also uint256 amount. So, let�s create that little struct array. And hopefully, client.evm token amounts, array with one element. And then, we need to put in the first slot in token amounts, and then the first slot that index zero, equals client.evm token amounts, because that�s the struct type, and again, parenthesis curly braces, and we will do named members. So, the token address is going to be passed through from the constructor. It�s going to be address, Oh, no, we are going to pass it through as an address already. So, that�s fine. We can just call it something like token to send address. And then, let�s pass this through to our function. address, oops I did an extra comma there. So, we can pass that through. Comma, and then, we need amount. And again, we are going to pass this through to our function. uint256 amount to send, we are going to call it amount to send, and then let�s pass that through, amount to send. That missing a semicolon. So, now we can pass that through. Token amounts is token amounts, and then we need the fee token. The fee token is going to be the link address. Link token address, which again, is different on different chains. So, let�s pass through it to the function. Link token address. Like that, and then finally, we need the bytes extra args. So, extra args colon. So, now we can finally do what needs to be done because this is not using chain link, so we can We know that we are not sending any data, therefore we don�t need any custom gas limit. We don�t need a gas limit because we don�t have a CCIP receive function that needs to be called. And, that these These extra args is for you to define, both a custom gas limit for receiving data. So, you�d need to estimate how much gas you needed for your CCIP receive function to receive and process this data. And, then also if you are allowing or disallowing out-of-order execution. So, if we go back into client. And then, we scroll down to args to bytes. And there�s two functions, one which takes evm extra args v2 which has this Boolean allow out of order execution. Now, since we don�t really care about out-of-order execution, then, we can use this evm extra args v1 which just has this gas limit. And, also you�ll see in the comments here, this value is default varies by chain. On some chains, a particular value is enforced meaning if the expected value is not set, the message request will revert. When we are deploying we are going to actually be going from Sepolia to ZKsync Sepolia, and it�s optional, so we don�t even need to set it, we don�t need to worry about it. So, we can use this evm extra args v1 which just has this custom gas limit, which we can set to be zero. So, if we call on the client library \_args to bytes, and the extra args is going to be client.evm extra args v1 because we don�t mind about that out-of-order execution. I mean maybe in your implementation that you do, and you want to make sure that the order in which transactions are sent are the order that it is executed, but it�s optional, and I am not going to be setting that. So, I am just going to set the gas limit to zero since we don�t have any data.

```javascript
function run(address routerAddress) public {
    vm.startBroadcast();
    Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
    tokenAmounts[0] = Client.EVMTokenAmount({token: tokenToSendAddress, amount: amountToSend});
    vm.startBroadcast();
    Client.EVM2AnyMessage message = Client.EVM2AnyMessage({
        receiver: abi.encode(receiverAddress),
        data: "",
        tokenAmounts: tokenAmounts,
        feeToken: linkTokenAddress,
        extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({gasLimit: 0}));
    });
    IRouterClient router = IRouterClient(routerAddress);
    vm.stopBroadcast();
}
```

So, now that we have made our message, we can now get the fees. So, we can create a uint256 CCIP fee, or fees, whatever you want to call it, equals IRouterClient, because we need to call the router, pass through the router address. So, we�ve now cast it to this interface. So, we can call get fee, and let�s just click into IRouterClient. Get fee takes the destination chain selector and the message. So, same as CCIP send. So, we can put in the destination chain selector and the message. Now, we have the fees, we can do the approval. So, we are going to need to import IERC20. And actually, we can import either IERC20 because both of them are going to have the approved function on. But, I am going to use the one from CCIP because that is what we have been doing so far. And then, we are going to do to call IERC20 cast it to an IERC20, so that we�ve got access to that function. The link address, and we are going to call approve. And then, we are going to do .approve, and we are going to make sure the router address is approved. The CCIP fee, and then we need to do one more token approval, which is exactly as Copilot is suggesting, cast the token to send address to an IERC20, so we can call approve, that the router address can send the amount to send. We need to cast the I the router address to IRouterClient, so we can call CCIP send with the destination chain selector and the message. And that�s it. We�ve created a little script to send a CCIP message.

```javascript
import {IRouterClient} from "@cccip/contracts/src/v0.8/interfaces/IRouterClient.sol";
import {Client} from "@cccip/contracts/src/v0.8/libraries/Client.sol";
import {IERC20} from "@cccip/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

contract BridgeTokensScript is Script {
    function run(address receiverAddress, uint64 destinationChainSelector, address tokenToSendAddress, uint256 amountToSend, address linkTokenAddress, address routerAddress) public {
        vm.startBroadcast();
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        tokenAmounts[0] = Client.EVMTokenAmount({token: tokenToSendAddress, amount: amountToSend});
        Client.EVM2AnyMessage message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiverAddress),
            data: "",
            tokenAmounts: tokenAmounts,
            feeToken: linkTokenAddress,
            extraArgs: Client.argsToBytes(Client.EVMExtraArgsV1({gasLimit: 0}))
        });
        uint256 ccipFee = IRouterClient(routerAddress).getFee(destinationChainSelector, message);
        IERC20(linkTokenAddress).approve(routerAddress, ccipFee);
        IERC20(tokenToSendAddress).approve(routerAddress, amountToSend);
        IRouterClient(routerAddress).cccipSend(destinationChainSelector, message);
        vm.stopBroadcast();
    }
}
```

Now that we�ve done all of this we are going to be doing some test net deploying and interacting. We are going to deploy our contracts and configure them on Sepolia and ZKsync Sepolia, and then, we are going to bridge our tokens from Sepolia to ZKsync Sepolia, and we are going to be adding the token contract to our Metamask, so that we can see the balance increase very slowly over time. So, I will see you very shortly to do that.
