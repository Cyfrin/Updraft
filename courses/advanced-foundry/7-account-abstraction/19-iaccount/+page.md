## Account Abstraction Lesson 19: IAccount

Now that we've got our functions, let's take a look at them to understand what they do.

> ❗ **NOTE** From this point, we will be updating `Transaction calldata _transaction` to `Transaction memory _transaction` when it is passed into our function as a parameter.

### Validate Transaction

---

```solidity
function validateTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction memory _transaction)
    external
    payable
    returns (bytes4 magic)
{}
```

---

You may have noticed that it is similar to the validateUserOp function in our MinimalAccount.sol that we built for Ethereum. On Ethereum, there are user operations, but ZKsync just has transactions. Just like we had a `PackedUserOp` struct before, now we have a `Transaction` struct. This can be found in `MemoryTransactionHelper.sol` For your convenience, I've added it below. Click to open it and read through it.

---

<details>

**<summary><span style="color:red">MemoryTransactionHelper.sol</span></summary>**

```solidity
/// @notice Structure used to represent a ZKsync transaction.
struct Transaction {
    // The type of the transaction.
    uint256 txType;
    // The caller.
    uint256 from;
    // The callee.
    uint256 to;
    // The gasLimit to pass with the transaction.
    // It has the same meaning as Ethereum's gasLimit.
    uint256 gasLimit;
    // The maximum amount of gas the user is willing to pay for a byte of pubdata.
    uint256 gasPerPubdataByteLimit;
    // The maximum fee per gas that the user is willing to pay.
    // It is akin to EIP1559's maxFeePerGas.
    uint256 maxFeePerGas;
    // The maximum priority fee per gas that the user is willing to pay.
    // It is akin to EIP1559's maxPriorityFeePerGas.
    uint256 maxPriorityFeePerGas;
    // The transaction's paymaster. If there is no paymaster, it is equal to 0.
    uint256 paymaster;
    // The nonce of the transaction.
    uint256 nonce;
    // The value to pass with the transaction.
    uint256 value;
    // In the future, we might want to add some
    // new fields to the struct. The `txData` struct
    // is to be passed to account and any changes to its structure
    // would mean a breaking change to these accounts. In order to prevent this,
    // we should keep some fields as "reserved".
    // It is also recommended that their length is fixed, since
    // it would allow easier proof integration (in case we will need
    // some special circuit for preprocessing transactions).
    uint256[4] reserved;
    // The transaction's calldata.
    bytes data;
    // The signature of the transaction.
    bytes signature;
    // The properly formatted hashes of bytecodes that must be published on L1
    // with the inclusion of this transaction. Note, that a bytecode has been published
    // before, the user won't pay fees for its republishing.
    bytes32[] factoryDeps;
    // The input to the paymaster.
    bytes paymasterInput;
    // Reserved dynamic type for the future use-case. Using it should be avoided,
    // But it is still here, just in case we want to enable some additional functionality.
    bytes reservedDynamic;
}
```

</details>


When we send an Account Abstraction transaction through ZKsync, the `Transaction` struct will essentially be populated. This will be our focus for now. The following parameters we won't worry about, for now. But here is the gist of what they do.

- `_txHash` = The hash of the transaction to be used in the explorer
- `_suggestedSignedHash` = The hash of the transaction is signed by EOAs

For now, let's consider `returns (bytes4 magic)` as a bool. For example, if we wanted it to return true we could just add the following into our function.

---

```solidity
returns (bytes4 magic)
{
    return IAccount.validateTransaction.selector;
}
```

---

### Execute Transaction

```solidity
function executeTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction memory _transaction)
    external
    payable
{}
```

---

I know what you're thinking. "This is similar to the `execute` function from `MinimalAccount`." And it is. Quite similar except no `EntryPoint`.

---

```solidity
function executeTransactionFromOutside(Transaction memory _transaction) external payable
{}
```

---

Essentially, this would be called if someone else wanted to execute a transaction. It will need to be validated.

1. You sign a transaction.
2. You send the signed transaction to a friend.
3. Friend can send it by calling `executeTransactionFromOutside`.

---

### Pay For Transaction and Prepare For Paymaster

The `payForTransaction` is similar to `_payPreFund`. This is where we state who will be paying for the transactions.

---

```solidity
function payForTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction memory _transaction)
        external
        payable
{}
```

`prepareForPaymaster` will be called before `payForTransaction` if you have a paymaster, another person or entity who will be paying for the transactions.

This lesson gave us a gist of what our IAccount interface will do. Take a moment to review and reflect. Move on to the next lesson when you are ready.

---

### Questions for Review

---

<summary>1. How is the validateTransaction function in ZKsync similar to the validateUserOp function in Ethereum?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    Both functions are used to validate transactions or user operations. In ZKsync, the Transaction struct is used instead of the PackedUserOp struct in Ethereum.

</details>


<summary>2.  What is the role of the executeTransactionFromOutside function?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    This function allows someone else to execute a transaction that has been signed by the original sender.

</details>


<summary>3. When is the prepareForPaymaster function called?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    It is called before the payForTransaction function if there is a paymaster involved. A paymaster is another person or entity who will be paying for the transactions.

</details>

