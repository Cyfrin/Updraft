## Account Abstraction Lesson 23: ZKsync Transaction Simulations

We have gone through a lot, but now we are ready to do some coding. In this lesson we will be working inside the `validateTransaction` function. A heavy focus here will be on steps 2 and 3 of the validation phase - validate and update the nonce. We will:

- Add Headers
- Update foundryup for ZKsync
- Learn about System Contract Calls
- Call NonceHolder
- increment nonce by 1

Let's get it!

---

### Headers and Updates

Let's start by making two updates to our code.

1. adding some headers to our code
2. updating foundryup for zksync in our terminal

---

```js
foundryup - zksync;
```

```js
forge build-zksync
```

---

> ❗ **NOTE** This may take a moment and the output will have a lot of yellow warnings. These can be safely ignored.

**External Functions**

Paste this above your `validateTransactions` function.

---

```solidity
/*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
//////////////////////////////////////////////////////////////*/
```

---

**Internal Functions**

Paste this below your `prepareForPaymaster` function.

---

```solidity
/*//////////////////////////////////////////////////////////////
                           INTERNAL FUNCTIONS
//////////////////////////////////////////////////////////////*/
```

---

### Validate Transaction

Let's get started with our `validateTransaction` function. Step 2 of the validation phase requires this function to update the nonce and validate the transaction. Additionally, we will use this function to check if we have enough money in our account.

```solidity
/*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
//////////////////////////////////////////////////////////////*/
/**
 * @notice must increase the nonce
 * @notice must validate the transaction (check the owner signed the transaction)
 * @notice also check to see if we have enough money in our account
 */
function validateTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction memory _transaction)
    external
    payable
    returns (bytes4 magic)
{
    // Call NonceHolder
    // increment nonce by 1
}
```

---

In order for us to make this work, we'll have to make a systems contract call. In [NonceHolder.sol](https://github.com/Cyfrin/foundry-era-contracts/blob/3f99de4a37b126c5cb0466067f37be0c932167b2/src/system-contracts/contracts/NonceHolder.sol) we will need to call the `incrementMinNonceIfEquals` function. This will increment the nonce by 1.

---

**<span style="color:red">NonceHolder.sol</span>**

```solidity
/// @notice A convenience method to increment the minimal nonce if it is equal
/// to the `_expectedNonce`.
/// @param _expectedNonce The expected minimal nonce for the account.
function incrementMinNonceIfEquals(uint256 _expectedNonce) external onlySystemCall {
    uint256 addressAsKey = uint256(uint160(msg.sender));
    uint256 oldRawNonce = rawNonces[addressAsKey];

    (, uint256 oldMinNonce) = _splitRawNonce(oldRawNonce);
    require(oldMinNonce == _expectedNonce, "Incorrect nonce");

    unchecked {
        rawNonces[addressAsKey] = oldRawNonce + 1;
    }
}
```

---

### Calling System Contracts

To do this, we are first going to have to add a flag under our `remappings` in `foundry.toml`.

```toml
is-system = true
```

---

### <span style="color:red">VERY IMPORTANT NOTE!</span>

> ❗ **NOTE** As of the current recording (July 2024) we wil instead have to add `--system-mode=true` in the command line when we compile. More on this later in the course. As alway, please refer to the GitHub repo for up-to-date code.

---

For now, all you need to know is that when you pass the isSystem flag to the contract, it will in-line replace all the simulations with the ZKsync isSystem call counterpart. It transforms it into a system contract call.

**This is very complex and not something you need to have nailed down. Don't get bogged down here.**

To make things a bit easier for us we are going to import the [SystemsContractCaller library.](https://github.com/Cyfrin/foundry-era-contracts/blob/3f99de4a37b126c5cb0466067f37be0c932167b2/src/system-contracts/contracts/libraries/SystemContractsCaller.sol)

---

```solidity
import { SystemContractsCaller } from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/SystemContractsCaller.sol";
```

---

Around line 142 you will see the `systemCallWithPropagatedRevert` function. This will help us a lot with our systems contract calls.

**<span style="color:red">SystemContractsCaller.sol</span>**

```solidity
/// @notice Makes a call with the `isSystem` flag.
/// @param gasLimit The gas limit for the call.
/// @param to The address to call.
/// @param value The value to pass with the transaction.
/// @param data The calldata.
/// @return returnData The returndata of the transaction. In case the transaction reverts, the error
/// bubbles up to the parent frame.
/// @dev Note, that the `isSystem` flag can only be set when calling system contracts.
function systemCallWithPropagatedRevert(
    uint32 gasLimit,
    address to,
    uint128 value,
    bytes memory data
) internal returns (bytes memory returnData) {
    bool success;
    (success, returnData) = systemCallWithReturndata(gasLimit, to, value, data);

    if (!success) {
        assembly {
            let size := mload(returnData)
            revert(add(returnData, 0x20), size)
        }
    }
}
```

---

### Call and Increment the Nonce

Now that we've got this, let's add it to our `validateTransaction` function back in our `ZkMinimalAccount` contract. If you look back at the systemCallWithPropagatedRevert, you'll see that we will need to pass:

- `uint32 gasLimit` what ever gas is left for us
- `address to` the Nonce Holder System Contract (import from `Constants.sol`)
- `uint128 value` 0 ether transferred
- `bytes memory data` we'll use `abi.encodeCall()`, and we'll need to:
  - import `INonceHolder`
  - pass `INonceHolder.incrementMinNonceIfEquals` to take nonce
  - then add one to that nonce `(_transaction.nonce)`

> ❗ **NOTE** Addresses in Constants.sol may change over time. Please consult the `Makefile` in our repo for updated versions.

**<span style="color:red">ZkMinimalAccount.sol</span>**

We'll need a couple of imports first.

```solidity
import { NONCE_HOLDER_SYSTEM_CONTRACT } from "lib/foundry-era-contracts/src/system-contracts/contracts/Constants.sol";
import { INonceHolder } from "lib/foundry-era-contracts/src/system-contracts/contracts/interfaces/INonceHolder.sol";
```

**Inside `validateTransaction` function**

```solidity
{
  // Call NonceHolder
  // increment nonce by 1
  // call(x,y,z ) -> system contract call
  SystemContractsCaller.systemCallWithPropagatedRevert(
    uint32(gasleft()),
    address(NONCE_HOLDER_SYSTEM_CONTRACT),
    0,
    abi.encodeCall(INonceHolder.incrementMinNonceIfEquals, _transaction.nonce)
  );
}
```

---

### Summary

In summary, this code makes a system call to the NonceHolder contract to conditionally increment the transaction nonce, ensuring the nonce handling mechanism in ZKsync's account abstraction is correctly followed.

- `uint32(gasleft())` passes the remaining gas for the call to ensure the system call has enough gas to execute.
- `address(NONCE_HOLDER_SYSTEM_CONTRACT)` specifies the target system contract responsible for managing nonces.
- 0 specifies that no Ether is transferred with the call.
- `abi.encodeCall(INonceHolder.incrementMinNonceIfEquals, (_transaction.nonce))` encodes the call to increment the nonce if it matches the provided nonce in `_transaction.nonce`.

**Phew!** That was a lot to take in. If you need to, go back and have a look at some of these contracts and their functions that we have imported. As always, we'll do a bit of review and you can move on when you are ready.

---

### Questions for Review

---

<summary>1. What does SystemContractsCaller.systemCallWithPropagatedRevert() do in our code?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

It makes a system call to the NonceHolder contract to conditionally increment the transaction nonce, ensuring the nonce handling mechanism in ZKsync's account abstraction is correctly followed.

</details>


<summary>2.  Which function in NonceHolder.sol is called to increment the nonce?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    incrementMinNonceIfEquals

</details>


<summary>3. What library did we import to help with system contract calls?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    SystemContractsCaller

</details>

