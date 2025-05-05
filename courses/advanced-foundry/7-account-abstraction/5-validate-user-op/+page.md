## Account Abstraction Lesson 5: `validateUserOp`

Welcome to our next lesson on **account abstraction**! We are going to get into one of the key functions of our contract - `validateUserOp`. We will:

- learn the role of the `validateUserOp` function in validating user operations.
- understand how to implement a custom signature validation function.
- learn how to set up the owner in the constructor for signature validation purposes.
- import and utilize OpenZeppelin's `MessageHashUtils` and `ECDSA`.
- ensure that our contract handles missing account funds.

### Validating Our Signature with a Custom Function

You may recall that we copied this function from `IAccount.sol` in lesson three.

```solidity
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {}
```

The first thing we want to do is validate the signature. To do so, we need to create custom function inside `validateUserOp`. We will pass `userOp` and `userOpHash` as arguments. The `userOp` is the data from the `PackedUserOperation` , and the `userOpHash` is the hash of it.

```solidity
{
  _validateSignature(userOp, userOpHash);
}
```

The goal here is to validate the signature against the data from the `PackedUserOperation  `. If you remember, you can view this by clicking on it in the imports at the top of the code. I'll place it here for your convenience.

```solidity
struct PackedUserOperation {
    address sender;
    uint256 nonce;
    bytes initCode;
    bytes callData;
    bytes32 accountGasLimits;
    uint256 preVerificationGas;
    bytes32 gasFees;
    bytes paymasterAndData;
    bytes signature;
}
```

### Using `Ownable` to Sign Our Contract

We know that account abstraction allows us to be really creative in how we want our signature to be validated, but for the purposes of this tutorial we will stick to the owner of the contract.

> ❗ **NOTE** You can place the following comment above your `validateUserOp` function.

```solidity
//A signature is valid if it's the MinimalAccount owner.
```

To help us do this, we need to install and import `Ownable` from OpenZeppelin.

```js
forge install openzeppelin/openzeppelin-contracts@v5.0.2 --no-commit
```

Before we import `Ownable`, we need to add it our remappings. Go to `foundry.toml` and add the following.

```toml
remappings = ["@openzeppelin/contracts=lib/openzeppelin-contracts/contracts"]
```

Now we can head back to our `MinimalAccount` contract and import it.

```solidity
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
```

Now that we have `Ownable`, we can inherit it into our contract and create our `constructor`. Let's place it above our functions.

```solidity
contract MinimalAccount is IAccount, Ownable {
    constructor() Ownable(msg.sender) {}
}
```

### Creating Our `_validateSignature` Function

Now that this is done, we have an owner to sign the transaction, then it will be validated in our `_validateSignature` function. However, you may have noticed that we have called this function, but haven't created it yet. Let's do that now.

```solidity
function _validateSignature(PackedUserOperation calldata userOp, bytes32 userOpHash)
        internal
        view
        returns (uint256 validationData)
    {
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        address signer = ECDSA.recover(ethSignedMessageHash, userOp.signature);
        if (signer != owner()) {
            return SIG_VALIDATION_FAILED;
        }
        return SIG_VALIDATION_SUCCESS;
    }
```

### Using OpenZeppelin to Reformat `userOpHash`

Next, we need to convert the `userOpHash` back into a normal hash. No worries though, we can do this with a tool called `MessageHashUtils` from OpenZeppelin. Let's import it now.

```solidity
import { MessageHashUtils } from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
```

Click on it so we can have a look at a key function called `toEthSignedMessageHash` Give it a read to become more familiar with what it does.

```solidity
    /**
     * @dev Returns the keccak256 digest of an ERC-191 signed data with version
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
```

Essentially, this function reformats our hash and allows us to do an `ECDSA` recover. Then, the `ECDSA` recover will tell us who actually signed the hash. To do this, we need to add some code to our `_validateSignature` function. But first, let's import the `ECDSA` from OpenZeppelin.

```solidity
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
```

Now we are ready to implement it into our `_validateSignature` function, along with `ethSignedMessageHash`.

```solidity
{
    bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
    address signer = ECDSA.recover(ethSignedMessageHash, userOp.signature);
    if (signer != owner()) {
            return SIG_VALIDATION_FAILED;
        }
        return SIG_VALIDATION_SUCCESS;
}
```

If the signer is not the owner, our function will return `SIG_VALIDATION_FAILED`. Otherwise, return `SIG_VALIDATION_SUCCESS`. These two concepts are defined in a helper contract. Let's import them now.

```solidity
import {
  SIG_VALIDATION_FAILED,
  SIG_VALIDATION_SUCCESS,
} from "lib/account-abstraction/contracts/core/Helpers.sol";
```

Here's what the whole function looks like.

```solidity
//EIP-191 version of the signed hash
function _validateSignature(PackedUserOperation calldata userOp, bytes32 userOpHash)
        internal
        view
        returns (uint256 validationData)
    {
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        address signer = ECDSA.recover(ethSignedMessageHash, userOp.signature);
        if (signer != owner()) {
            return SIG_VALIDATION_FAILED;
        }
        return SIG_VALIDATION_SUCCESS;
    }
```

In a nut shell, our function `_validateSignature` verifies the signature of a `PackedUserOperation` by recovering the signer's address from the hashed operation data and comparing it with the owner's address, returning a validation success or failure code based on the match. We can further customize it to say, for example, verify that the Google Session Key is correct, or that our bowling team is signing off on it. We have a variety of creative options that we could do here.

### Validating Our Data

Now that we have a proper `_validateSignature` function, Let's head back to the `validateUserOp`. Set `validationData` to equal the `_validateSignature()` as such.

```solidity
{
  validationData = _validateSignature(userOp, userOpHash);
}
```

In the IAccount.sol we can see what `validationData` does.

```solidity
/**
 * @return validationData
 * - Packaged ValidationData structure. use `_packValidationData` and
 *
 * `_unpackValidationData` to encode and decode.
 * <20-byte> sigAuthorizer - 0 for valid signature, 1 to mark signature failure,
 *          otherwise, an address of an "authorizer" contract.
 * <6-byte> validUntil - Last timestamp this operation is valid. 0 for "indefinite"
 * <6-byte> validAfter - First timestamp this operation is valid
 * If an account doesn't use time-range, it is enough to
 * return SIG_VALIDATION_FAILED value (1) for signature failure.
 * Note that the validation code cannot use block.timestamp (or block.number) directly.
 */
```

### Paying What We Owe

We've covered a lot of ground, but we aren't quite there yet. Here are some things we need to consider.

```solidity
    function validateUserOp
    (
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData)
    {
        validationData = _validateSignature(userOp, userOpHash);
        // _validateNonce()
        _payPrefund(missingAccountFunds); //pays EntryPoint amount owed
    }
```

As you can see, we have commented out \_validateNonce for now as it will be handled by the `EntryPoint`. Next, we will set up a way to pay the EntryPoint what is owed. We have mentioned a Paymaster briefly, but we are going to create our own function for this, `__payPrefund` and implement it into our `validateUserOp`. It takes in `missingAccountFunds` as an argument. Let's go ahead and create this function.

```solidity
 function _payPrefund(uint256 missingAccountFunds) internal {
        if (missingAccountFunds != 0) {
            (bool success,) = payable(msg.sender).call{value: missingAccountFunds, gas: type(uint256).max}("");
            (success);
        }
    }
```

We've got a lot here as far as what we need to have an account abstraction based account. However, it's not very secure. At the moment, anyone can validate user operations and pay themselves. Neither of these are good, so we will be spending some time in the upcoming lessons making our account more secure.

### Let's Review

<summary>1. What is the purpose of the validateUserOp function in the smart contract?</summary> 
<summary>2. How does the _validateSignature function verify the signer's address?</summary> 
<summary>3. Why is it necessary to import OpenZeppelin's Ownable contract and how is it integrated into the MinimalAccount contract?</summary>
<summary>4. What is the role of the _payPrefund function within the validateUserOp function?</summary>

---

<details>

**<summary>Click for Answers</summary>**

     1. The purpose of this function is to validate user operations by ensuring that the signature is valid. It also handles missing account funds.

     2. It verifies the signer's address by first converting the `userOpHash` into a signed message hash. It then recovers the signer's address using ECDSA.recover with the signed message hash and the signature from userOp. Finally, it compares the recovered address to the owner's address to determine if the signature is valid.

     3. We need OpenZeppelin's Ownable contract to manage ownership of the contract, ensuring that only the owner can validate signatures.

     4. This function handles the payment of missing account funds owed to the EntryPoint. It checks if there are any missing funds and, if so, pays what is owed.

</details>
