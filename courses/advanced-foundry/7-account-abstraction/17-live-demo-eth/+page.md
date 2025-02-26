## Account Abstraction Lesson 17: Live Demo on Arbitrum

The time has come for us to deploy our code base. Let's run our deploy script - `DeployMinimal`.

---

> ❗ **IMPORTANT** This demo is run on a real network, which requires real money. It's recommended just to follow along with the video, and focus more on the code and learning how to deploy to the mainnet.

> ❗ **NOTE** The hardcoded values are from the instructor. Your actual values may vary. As always, you can see up-to-date code in the repo.

🔥🔥🔥[Cyfrin Minimal Account Abstraction Repo](https://github.com/Cyfrin/minimal-account-abstraction)🔥🔥🔥

---

Run the following in your terminal.

```js
forge script script/DeployMinimal.s.sol --rpc-url $ARBITRUM_RPC_URL --account smallmoney --broadcast --verify
```

We forgot to complete the `run` function in our `SendPackedUserOp` script. Let's do that now.

---

**<span style="color:red">SendPackedUserOp.s.sol</span>**

```solidity
// Add these imports
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MinimalAccount} from "src/ethereum/MinimalAccount.sol";

// run function
function run() public {
        // Setup
        HelperConfig helperConfig = new HelperConfig();
        address dest = 0xaf88d065e77c8cC2239327C5EDb3A432268e5831; // Arbitrum mainnet USDC address
        uint256 value = 0;

        bytes memory functionData = abi.encodeWithSelector(
            IERC20.approve.selector,
            0x9EA9b0cc1919def1A3CfAEF4F7A66eE3c36F86fC,
            1e18
        );

        bytes memory executeCalldata = abi.encodeWithSelector(
            MinimalAccount.execute.selector,
            dest,
            value,
            functionData
        );

        PackedUserOperation memory userOp = generateSignedUserOperation(
            executeCalldata,
            helperConfig.getConfig(),
            0x03Ad95a54f02A40180D45D76789C448024145aaF
        );
        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = userOp;

        // Send transaction
        vm.startBroadcast();
        IEntryPoint(helperConfig.getConfig().entryPoint).handleOps(
            ops,
            payable(helperConfig.getConfig().account)
        );
        vm.stopBroadcast();
    }
```

---

> ❗ **NOTE** HelperConfig for Arbitrum has already been set up off screen.

---

Now that we've got it set up, let's deploy our `SendPackedUserOp.s.sol` to Arbitrum.

Run the following in your terminal.

```js
forge script script/SendPackedUserOp.s.sol --rpc-url $ARBITRUM_RPC_URL --account smallmoney --broadcast -vvv
```

Congratulations! We've successfully made our first **account abstraction user operation call!**

When you are ready, move on to the next lesson.
