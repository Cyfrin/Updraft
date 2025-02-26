## Account Abstraction Lesson 11: Unsigned `PackedUserOperation` Test

Welcome to lesson 11. This lesson is structured around completing and testing the `SendPackedUserOp` script. We will:

- complete our `SendPackedUserOp` script
- generate a signed user operation
- create a test for it.
- become more familiar with message hashing
- deploy a mock
- verify a digital signature using ECDSA
- answer some review questions

We are going to learn a lot in this one. Let's get it!

---

### Completing the `SendPackedUserOp` Script

Now that we've got all the things we need to generate data for our `PackedUserOperation`, we need to send it.

**<span style="color:red">SendPackedUserOp.s.sol</span>**

```solidity
function generateSignedUserOperation(bytes memory callData, address sender)
    public view returns (PackedUserOperation memory) {
        // Step 1. Generate the unsigned data
        uint256 nonce = vm.getNonce(sender);
        PackedUserOperation memory unsignedUserOp = _generateUnsignedUserOperation(callData, sender, nonce);

        // Step 2. Sign and return it
}
```

We must be sure to sign the contract that aligns with what the `EntryPoint` contract expects. If you go into `EntryPoint.sol` that we imported earlier, you'll find a function called `getUserOpHash`.

**<span style="color:red">EntryPoint.sol</span>**

```solidity
/// @inheritdoc IEntryPoint
function getUserOpHash(PackedUserOperation calldata userOp)
    public returns (bytes32) {
    return
        keccak256(abi.encode(userOp.hash(), address(this), block.chainid));
}
```

From this function, you can see that the EntryPoint is expecting a **hashed userOp, contract address, and chainid**.

> ❗ **IMPORTANT** In order to avoid cross-chain replay attacks, the chainid will be part of the userOpHash.

To make all of this happen, we are going to need to do some more work in our scripts. Let's get started in the **HelperConfig** by importing `EntryPoint`. Also, go ahead and add `console2` to the `Script` import.

**<span style="color:red">HelperConfig.s.sol</span>**

```solidity
import { Script, console2 } from "forge-std/Script.sol";
import { EntryPoint } from "lib/account-abstraction/contracts/core/EntryPoint.sol";
```

Now we can finally get into deploying mocks. Add the following code in the `getOrCreateAnvilEthConfig` function.

```solidity
// deploy mocks
console2.log("Deploying mocks...");
vm.startBroadcast(FOUNDRY_DEFAULT_ACCOUNT);
EntryPoint entryPoint = new EntryPoint();
vm.stopBroadcast();
```

Now that we have the EntryPoint, we can use it to call `getUserOpHash` over in our `SendPackedUserOp` script. Let's first update our comments to reflect this.

**<span style="color:red">SendPackedUserOp.s.sol</span>**

```solidity
function generateSignedUserOperation(bytes memory callData, address sender)
    public view returns (PackedUserOperation memory) {
        // Step 1. Generate the unsigned data
        uint256 nonce = vm.getNonce(sender);
        PackedUserOperation memory unsignedUserOp = _generateUnsignedUserOperation(callData, sender, nonce);

        // Step 2. Get userOp Hash

        // Step 3. Sign it
}
```

Let's get the userOpHash. To do this we will need to import a few items and make some adjustments to the parameters of the `generateSignedUserOperation` function.

For imports, we need `HelperConfig`, `IEntryPoint`, and `MessageHashUtils`.

```solidity
import { HelperConfig } from "script/HelperConfig.s.sol";
import { IEntryPoint } from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import { MessageHashUtils } from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
```

Let's also update our parameters and finish coding the next two steps in our function. First, we need to:

- Replace `address sender` with `HelperConfig.NetworkConfig`.
- Replace `sender` with `config.account` in `vm.getNonce` and in `_generateUnsignedUserOperation`.

```solidity
function generateSignedUserOperation(bytes memory callData, HelperConfig.NetworkConfig)
    public view returns (PackedUserOperation memory) {
    // Step 1. Generate the unsigned data
    uint256 nonce = vm.getNonce(config.account);
    PackedUserOperation memory unsignedUserOp = _generateUnsignedUserOperation(callData, config.account, nonce);
}
```

In step 2 we will call the `getUserOpHash` on the `entryPoint` and pass in `userOp`. Then, we will convert the hash to `toEthSignedMessageHash` from `MessageHashUtils.sol`. You can read more about these two below, but in a nutshell we will need the `bytes32 digest`.

---

<details>

**<summary><span style="color:red">Click Here</span></summary>**

```solidity
   library MessageHashUtils {
    /**
     * @dev Returns the keccak256 digest of an EIP-191 signed data with version
     * `0x45` (`personal_sign` messages).
     *
     * The digest is calculated by prefixing a bytes32 `messageHash` with
     * `"\x19Ethereum Signed Message:\n32"` and hashing the result. It corresponds with the
     * hash signed when using the https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`] JSON-RPC method.
     *
     * NOTE: The `messageHash` parameter is intended to be the result of hashing a raw message with
     * keccak256, although any bytes32 value can be safely used because the final digest will
     * be re-hashed.
     *
     * See {ECDSA-recover}.
     */
    function toEthSignedMessageHash(bytes32 messageHash) internal pure returns (bytes32 digest) {
        /// @solidity memory-safe-assembly
        assembly {
            mstore(0x00, "\x19Ethereum Signed Message:\n32") // 32 is the bytes-length of messageHash
            mstore(0x1c, messageHash) // 0x1c (28) is the length of the prefix
            digest := keccak256(0x00, 0x3c) // 0x3c is the length of the prefix (0x1c) + messageHash (0x20)
        }
    }
}
```

</details>


Now that we have this imported, we need to be sure to add the following line to in our contract, just above the `run` function.

```solidity
using MessageHashUtils for bytes32;
```

**As it stands our function should look like this.**

```solidity
function generateSignedUserOperation(bytes memory callData, HelperConfig.NetworkConfig)
    public view returns (PackedUserOperation memory) {
    // Step 1. Generate the unsigned data
    uint256 nonce = vm.getNonce(config.account);
    PackedUserOperation memory unsignedUserOp = _generateUnsignedUserOperation(callData, config.account, nonce);

    // Step 2. Get userOp Hash
    bytes32 userOpHash = IEntryPoint(config.entryPoint).getUserOpHash(userOp);
    bytes32 digest = userOpHash.toEthSignedMessageHash();

    // Step 3. Sign it
}
```

We've got everything we need now, just need to sign it. Let's do that in step 3.

```solidity
// 3. Sign it
(uint8 v, bytes32 r, bytes32 s) = vm.sign(config.account, digest);
userOp.signature = abi.encodePacked(r, s, v); // Note the order
return userOp;
```

For clarity, let's change `unsignedUserOp` to just `userOp` in our function. After the changes, it should look like this:

```solidity
function generateSignedUserOperation(bytes memory callData, HelperConfig.NetworkConfig)
    public view returns (PackedUserOperation memory) {
    // Step 1. Generate the unsigned data
    uint256 nonce = vm.getNonce(config.account);
    PackedUserOperation memory userOp = _generateUnsignedUserOperation(callData, config.account, nonce);

    // Step 2. Get userOp Hash
    bytes32 userOpHash = IEntryPoint(config.entryPoint).getUserOpHash(userOp);
    bytes32 digest = userOpHash.toEthSignedMessageHash();

    // Step 3. Sign it
    (uint8 v, bytes32 r, bytes32 s) = vm.sign(config.account, digest);
    userOp.signature = abi.encodePacked(r, s, v); // Note the order
    return userOp;
}
```

Alright! Now that we've got our two functions `generateSignedUserOperation` and `_generateUnsignedUserOperation`, we can use them in our tests.

---

### Improving on Our Tests

Back over in our test contract, `MinimalAccountTest.t.sol`, we need to make some additions and adjustments to our code. First, let's create a state variable for `SendPackedUserOp` and import it.

**<span style="color:red">MinimalAccountTest.t.sol</span>**

```solidity
import {SendPackedUserOp} from "script/SendPackedUserOp.s.sol";

contract MinimalAccountTest is Test, ZkSyncChainChecker {
    using MessageHashUtils for bytes32;

    HelperConfig helperConfig;
    MinimalAccount minimalAccount;
    ERC20Mock usdc;
    SendPackedUserOp sendPackedUserOp;

}
```

---

### Arrange

Let's go ahead and test that our contract is signing things correctly. Create the following function - `testRecoverSignedOp`. For **Arrange**, we can simply copy it from `testNonOwnerCannotExecuteCommands`.

```solidity
function testRecoverSignedOp() public {
    // Arrange
    assertEq(usdc.balanceOf(address(minimalAccount)), 0);
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);

    // Act

    // Assert
}
```

Additionally, we will need to wrap it with `callData` in order to call `execute`. Like `functionData`, this `executeCallData` will be set to `abi.encodeWithSelector`. It will take:

- MinimalAccount execute selector
- and three arguments from the `execute` function
  - dest, value, and functionData

```solidity
bytes memory executeCallData =
    abi.encodeWithSelector(MinimalAccount.execute.selector, dest, value, functionData);
```

Essentially, the `executeCallData` is signaling the `EntryPoint` contract to call our contract. Then, our contract will call USDC. Now that we have this, we also need our `PackedUserOperation`. This is where our `SendPackedUserOp` script comes in. Let's create an instance for this in the `setUp` function - `sendPackedUserOp = new SendPackedUserOp();`. It will look like this inside the function.

```solidity
 function setUp() public {
    DeployMinimal deployMinimal = new DeployMinimal();
    (helperConfig, minimalAccount) = deployMinimal.deployMinimalAccount();
    usdc = new ERC20Mock();
    sendPackedUserOp = new SendPackedUserOp();
}
```

And before we forget, let's import `PackedUserOperation`. Let's also do `IEntryPoint` as we will need it later on. We simply need to add them to the `SendPackedUserOp` import.

```solidity
import {
  SendPackedUserOp,
  PackedUserOperation,
  IEntryPoint,
} from "script/SendPackedUserOp.s.sol";
```

From here, go back to the `testRecoverSignedOp` function place the following below the other code under the **Arrange** comment.

```solidity
PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(
    executeCallData, helperConfig.getConfig());
```

And, last but not least, we need to hash the `PackedUserOperation`.

```solidity
bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
```

With that, our **Arrange** should look like this.

```solidity
// Arrange
assertEq(usdc.balanceOf(address(minimalAccount)), 0);
address dest = address(usdc);
uint256 value = 0;
bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
bytes memory executeCallData =
    abi.encodeWithSelector(MinimalAccount.execute.selector, dest, value, functionData);
PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(
    executeCallData, helperConfig.getConfig());
bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
```

Phew! We've done a lot, but we aren't done yet. Take a moment to reflect on what we've done so far. When you are ready, let's dive into the **Act** part of our test.

---

### Act & Assert

In this section of our test, we are going to find out if the person signing the transaction is valid. First, we need to import ECDSA.

```solidity
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
```

Now we can code `ECDSA.recover` into our function. If you go into the `recover` function in `ECDSA.sol`, you will notice that it takes a hash and a signature. For hashing, we will need to import `MessageHashUtils` so that we can use `toEthSignedMessageHash`. Additionally, we need to add `using MessageHashUtils for bytes32` in our contract.

```solidity
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract MinimalAccountTest is Test {
    using MessageHashUtils for bytes32;


}
```

As mentioned above, our `ECDSA.recover` takes a hash and a signature. Once we have that, we need to set it to `actualSigner`, which is an address.

```solidity
// Act
address actualSigner = ECDSA.recover(userOperationHash.toEthSignedMessageHash(), packedUserOp.signature);
```

Essentially, the `ECDSA.recover` will verify the digital signature of the `packedUserOp` by converting the `userOperationHash` to an message hash. Then it will use the signature to recover the signer's address, ensuring that the signature is valid.

Now, we can finally do **Assert**! We want to make sure that the `actualSigner` is the owner. Which in our case is the `minimalAccount`.

```solidity
// Assert
assertEq(actualSigner, minimalAccount.owner());
```

Our function should look like this now.

**<span style="color:red">MinimalAccountTest.t.sol</span>**

```solidity
function testRecoverSignedOp() public {
    // Arrange
    assertEq(usdc.balanceOf(address(minimalAccount)), 0);
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
    bytes memory executeCallData =
        abi.encodeWithSelector(MinimalAccount.execute.selector, dest, value, functionData);
    PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(
        executeCallData, helperConfig.getConfig());
    bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);

    // Act
    address actualSigner = ECDSA.recover(userOperationHash.toEthSignedMessageHash(), packedUserOp.signature);

    // Assert
    assertEq(actualSigner, minimalAccount.owner());
}
```

Ok, it's time to run our test. Fingers crossed. Let's do it!

```js
forge test --mt testRecoverSignedOp -vvv
```

And ..... , we get an error 😟 **_<span style="color:red">[Failed. Reason: no wallets are available]</span>_** Do you remember this code from our `SendPackedUserOp` script?

**<span style="color:red">SendPackedUserOp.s.sol</span>**

```solidity
// 3. Sign it
(uint8 v, bytes32 r, bytes32 s) = vm.sign(config.account, digest);
```

Just for the purpose of testing or working on a local chain, we are going to have to do a work around for it to work correctly. But not right now, we've reached the end of this lesson. It was a beast. Take some time to reflect and go over some review questions. Move on to the next lesson when you are ready.

---

### Questions for Review

> ❗ **NOTE** These questions may be a bit challenging. Take your time and don't stress too much. We learn one brick at a time.

<summary>1. In the testRecoverSignedOp function, what is the significance of using ECDSA.recover and what is being verified?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    ECDSA.recover is used to verify the digital signature of the PackedUserOperation. It does this by recovering the signer's address from the `userOperationHash` and the provided signature. This step ensures that the signature is valid and that the operation was signed by the expected account.

</details>


<summary>2. Why is `using MessageHashUtils for bytes32` necessary? What does it do?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

It allows the function to call `toEthSignedMessageHash` directly on a bytes32 value. It converts a hash to the format expected by Ethereum for verifying signatures.

</details>


<summary>3. What is the purpose of the generateSignedUserOperation function in the SendPackedUserOp script?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

It generates a signed `PackedUserOperation` by creating an unsigned user operation, obtaining its hash, converting the hash to an Ethereum signed message hash, and then signing it using the account's private key. The function returns the signed `PackedUserOperation`.

</details>


<summary>4. What is included in the `userOpHash` to prevent cross-chain replay attacks?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

`chainid`. It ensures that the `userOpHash` is unique to a specific blockchain network, preventing the same operation from being executed on different networks.

</details>

