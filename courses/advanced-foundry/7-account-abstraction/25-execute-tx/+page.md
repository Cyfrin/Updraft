## Account Abstraction Lesson 25: Execute Function ZKsync

Moving along in our course, it's time to execute a transaction. In this lesson we will do this by:

- setting appropriate variables in our function
- making necessary conversions
- using assembly
- adding a new modifier
- adding more imports and custom errors

Let's get started!

---

### Variables from Transaction Struct

We know that once the validation phase is done, it will send the transaction to the main node for execution. We aren't actually done with the validation phase just yet, as we haven't handled the actual payment. But for this lesson, we will turn our attention to our executeTransaction function. We will be using some [variables from the `Transaction` struct:](https://github.com/Cyfrin/foundry-era-contracts/blob/3f99de4a37b126c5cb0466067f37be0c932167b2/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol)

- `uint256 to`: The callee (address or contract being called)
- `uint256 value`: The value to pass with the transaction.
- `bytes data`: The transaction's calldata.

We will need to do a few things first.

1. convert `to` from a `uint256` to an `address`
2. safe cast value from a uint256 to a uint128
   - because systems calls take uint 128
   - need to import `Utils`
3. set `data` to memory

**Import Utils**

```solidity
import { Utils } from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/Utils.sol";
```

**Our Execute Transaction Function**

```solidity
function executeTransaction(bytes32 /*_txHash*/, bytes32 /*_suggestedSignedHash*/, Transaction memory _transaction)
    external
    payable
{
    address to = address(uint160(_transaction.to));
    uint128 value = Utils.safeCastToU128(_transaction.value);
    bytes memory data = _transaction.data;
}
```

---

### Adding Assembly

Next, we are going to add an assembly section to our function.

> ❗ **NOTE** If you aren't familiar with assembly, don't worry. Just follow along with the lesson.

Essentially, this code will perform a low-level call to an external contract using inline assembly, transferring `value` amount of Ether and passing `data` as input. If the call fails, it reverts the transaction with a custom error.

Plug the following assembly snippet into your function.

```solidity
bool success;
assembly {
    success := call(gas(), to, value, add(data, 0x20), mload(data), 0, 0)
}
if (!success) {
    revert ZkMinimalAccount__ExecutionFailed();
}
```

Place our new custom errors with the others in our code.

```solidity
error ZkMinimalAccount__ExecutionFailed();
```

---

### Time to Refactor

We've got some nice things going on with our code, but we need to make some adjustments. If we need to call a system contract, we can do it in a similar way that we did with `NonceHolder` in the `validateTransaction` function.

**What we did in `validateTransaction`.**

```solidity
SystemContractsCaller.systemCallWithPropagatedRevert(
  uint32(gasleft()),
  address(NONCE_HOLDER_SYSTEM_CONTRACT),
  0,
  abi.encodeCall(INonceHolder.incrementMinNonceIfEquals, _transaction.nonce)
);
```

---

Let's add this snippet in our execution function between `bool success;` and `bytes memory data = _transaction.data;`. Wrap `bool success` and `assembly` in an else statement.

```solidity
if (to == address(DEPLOYER_SYSTEM_CONTRACT)) {
    uint32 gas = Utils.safeCastToU32(gasleft());
    SystemContractsCaller.systemCallWithPropagatedRevert(gas, to, value, data);
} else {
    bool success;
    assembly {
        success := call(gas(), to, value, add(data, 0x20), mload(data), 0, 0)
    }
    if (!success) {
        revert ZkMinimalAccount__ExecutionFailed();
    }
}

```

---

As you can see, if the callee is `DEPLOYER_SYSTEM_CONTRACT` we safe cast `gasleft` and pass our `gas`, `to`, `value`, and `data` to `systemCallWithPropagatedRevert`. If not, do the `assembly`.

Import `DEPLOYER_SYSTEM_CONTRACT` by placing it within the `NONCE_HOLDER_SYSTEM_CONTRACT` and
`BOOTLOADER_FORMAL_ADDRESS` that we already have.

---

### Add a Modifier

Just as with our `validateTransaction`, we don't want anyone to be able to call our `execute` function. So, let's create a modifier that will require the caller to be the bootloader or owner. Essentially, this will be the same as our `requireFromBootloader` with the addition of:

- `&& msg.sender != owner()`
- new custom revert error

```solidity
modifier requireFromBootLoaderOrOwner() {
    if (msg.sender != BOOTLOADER_FORMAL_ADDRESS && msg.sender != owner()) {
        revert ZkMinimalAccount__NotFromBootLoaderOrOwner();
    }
    _;
}
```

Paste custom error with the others.

```solidity
error ZkMinimalAccount__NotFromBootLoaderOrOwner();
```

Add modifier to our `execute` function.

```solidity
function executeTransaction(bytes32 /*_txHash*/, bytes32 /*_suggestedSignedHash*/, Transaction memory _transaction)
    external
    payable
    requireFromBootLoaderOrOwner
```

Great work! Now we can validate and execute our transaction. Let's take some time to review. Move on to the next lesson when you are ready.

---

### Questions for Review

---

<summary>1. What is the purpose of converting to from a uint256 to an address in the executeTransaction function?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

To ensure that the callee is correctly identified as an address or contract being called.

</details>


<summary>2.  What does the assembly code in the executeTransaction function do? </summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    It performs a low-level call to an external contract using inline assembly, transferring value amount of Ether and passing data as input. If the call fails, it reverts the transaction with a custom error.

</details>


<summary>3. What is the purpose of the requireFromBootLoaderOrOwner modifier?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    To ensure that the caller is either the bootloader or the owner. If not, the transaction is reverted with a custom error.

</details>

