## Account Abstraction Lesson 12: Local Dev Unlocked

Welcome back! We are on a roll now. We've almost got our scripts and test completed, but we need to do some refactoring. We will be doing this in order to properly sign our user operations. Let's get started.

---

### Refactor `generateSignedUserOperation`

Picking up where we left off from lesson 11, we are going to have to do a work around for the sign it portion of our `generateSignedUserOperation` function.

**<span style="color:red">SendPackedUserOp.s.sol</span>**

```solidity
// 3. Sign it
(uint8 v, bytes32 r, bytes32 s) = vm.sign(config.account, digest);
userOp.signature = abi.encodePacked(r, s, v); // Note the order
return userOp;
```

Here's what we need to do in our refactored code.

- Initialize our `v, r, s` as blank variables.
- Create a variable for Anvil default key
- Create an **if/else** statement.
- If the `block.chainid` is 31337, which is Anvil, set v, r, s to `vm.sign(ANVIL_DEFAULT_KEY, digest)`.
- Else, set it to `vm.sign(config.account, digest)`

> ❗ **NOTE** You can get an Anvil key by running anvil in your terminal. There will be a list of private keys. Choose any one of them.

This is what our refactored code should look like.

```solidity
// 3. Sign it
uint8 v;
bytes32 r;
bytes32 s;
uint256 ANVIL_DEFAULT_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
if (block.chainid == 31337) {
    (v, r, s) = vm.sign(ANVIL_DEFAULT_KEY, digest);
} else {
    (v, r, s) = vm.sign(config.account, digest);
}
userOp.signature = abi.encodePacked(r, s, v); // Note the order
return userOp;
```

---

### Set Anvil as Local Chain

Since we are using a local chain, we need to do some refactoring over in HelperConfig. We'll need to replace `FOUNDRY_DEFAULT_WALLET` with `ANVIL_DEFAULT_ACCOUNT` in our state variables and in the `getOrCreateAnvilEthConfig` function.

> ❗ **PROTIP** Just comment out the FOUNDRY_DEFAULT_WALLET variable, and add ANVIL_DEFAULT_ACCOUNT on a separate line.

**<span style="color:red">HelperConfig.s.sol</span>**

```solidity
address constant ANVIL_DEFAULT_ACCOUNT = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;


function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
    if (localNetworkConfig.account != address(0)) {
        return localNetworkConfig;
    }

    // deploy mocks
    console2.log("Deploying mocks...");
    vm.startBroadcast(ANVIL_DEFAULT_ACCOUNT);
    EntryPoint entryPoint = new EntryPoint();
    vm.stopBroadcast();

    return NetworkConfig({
        entryPoint: address(entryPoint),
        account: ANVIL_DEFAULT_ACCOUNT
    });
}
```

> ❗ **NOTE** Here we are using ANVIL_DEFAULT_ACCOUNT not ANVIL_DEFAULT_KEY.

---

### Set localNetworkConfig

We need to do a bit more work in `getOrCreateAnvilEthConfig`. At the bottom of the function:

- set `localNetworkConfig` to `NetworkConfig`
- return `localNetworkConfig`

```solidity
localNetworkConfig = NetworkConfig({
  entryPoint: address(entryPoint),
  usdc: address(erc20Mock),
  account: ANVIL_DEFAULT_ACCOUNT,
});
return localNetworkConfig;
```

If not, our if statement would always be true and we'd be constantly deploying mocks.

Now that we have Anvil set, we need to make a minor change over in our `DeployMinimal` script. We simply need to change the transfer of ownership from `msg.sender` to `config.account.` You will find it under `vm.Broadcast()`.

- from: `minimalAccount.transferOwnership(msg.sender);`
- to: `minimalAccount.transferOwnership(config.account);`

**<span style="color:red">DeployMinimal.s.sol</span>**

```solidity
vm.startBroadcast(config.account);
MinimalAccount minimalAccount = new MinimalAccount(config.entryPoint);
minimalAccount.transferOwnership(config.account);
vm.stopBroadcast();
return (helperConfig, minimalAccount);
```

Let's run our test again to see where we stand.

```js
forge test --mt testRecoverSignedOp -vvv
```

**And it passed!!!**

This means that we are getting the correct signature on our user operations. Congratulations! Move on to the next lesson when you are ready.
