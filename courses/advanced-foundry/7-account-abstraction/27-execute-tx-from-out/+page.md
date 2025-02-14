## Account Abstraction Lesson 27: Execute Transaction From Outside

We've got one more function to cover before we can start testing, and that is the `executeTransactionFromOutside` function. This will let us have another person to send our transaction and pay for the gas. Similar to `executeTransaction`, we'd just need to set our function up to validate and execute a transaction.

In this lesson we will be doing a bit of refactoring. We are going to:

- create `_validateTransaction` and call it in `validateTransaction`
- create `_executeTransaction` and call it in `executeTransaction`
- call `_executeTransaction` and `_validateTransaction`, and call them in `executeTransactionFromOutside`

Let's get it!

---
### Internal Function `_validateTransaction`

Since we are beginning to use code from the bodies of `validateTransaction` and `executeTransaction` in other functions, let's go ahead and set them as their own separate functions. 

Take the following from `validateTransaction`.

```solidity
// Call nonceholder
// increment nonce
// call(x, y, z) -> system contract call
SystemContractsCaller.systemCallWithPropagatedRevert(
    uint32(gasleft()),
    address(NONCE_HOLDER_SYSTEM_CONTRACT),
    0,
    abi.encodeCall(INonceHolder.incrementMinNonceIfEquals, (_transaction.nonce))
);

// Check for fee to pay
uint256 totalRequiredBalance = _transaction.totalRequiredBalance();
if (totalRequiredBalance > address(this).balance) {
    revert ZkMinimalAccount__NotEnoughBalance();
}

// Check the signature
bytes32 txHash = _transaction.encodeHash();
// bytes32 convertedHash = MessageHashUtils.toEthSignedMessageHash(txHash);
address signer = ECDSA.recover(txHash, _transaction.signature);
bool isValidSigner = signer == owner();
if (isValidSigner) {
    magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC;
} else {
    magic = bytes4(0);
}
return magic;
```
---

Then place it in our first internal function called `_validateTransaction`. Since we are ignoring `_txHash` and `_suggestedSignedHash`, we only need to pass `_transaction` and return `bytes4 magic`.

```solidity
/*//////////////////////////////////////////////////////////////
                           INTERNAL FUNCTIONS
//////////////////////////////////////////////////////////////*/
function _validateTransaction(Transaction memory _transaction) internal returns (bytes4 magic) {
    // Call nonceholder
    // increment nonce
    // call(x, y, z) -> system contract call
    SystemContractsCaller.systemCallWithPropagatedRevert(
        uint32(gasleft()),
        address(NONCE_HOLDER_SYSTEM_CONTRACT),
        0,
        abi.encodeCall(INonceHolder.incrementMinNonceIfEquals, (_transaction.nonce))
    );

    // Check for fee to pay
    uint256 totalRequiredBalance = _transaction.totalRequiredBalance();
    if (totalRequiredBalance > address(this).balance) {
        revert ZkMinimalAccount__NotEnoughBalance();
    }

    // Check the signature
    bytes32 txHash = _transaction.encodeHash();
    // bytes32 convertedHash = MessageHashUtils.toEthSignedMessageHash(txHash);
    address signer = ECDSA.recover(txHash, _transaction.signature);
    bool isValidSigner = signer == owner();
    if (isValidSigner) {
        magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC;
    } else {
        magic = bytes4(0);
    }
    return magic;
}
```
---

Now, we can simply pass our new function into the body of other functions. Let's do that now in `validateTransaction`. Pass in `return _validateTransaction(_transaction);`. Now our `validateTransaction` should look like this:


```solidity
function validateTransaction(bytes32, /*_txHash*/ bytes32, /*_suggestedSignedHash*/ Transaction memory _transaction)
    external
    payable
    requireFromBootLoader
    returns (bytes4 magic)
{
    return _validateTransaction(_transaction);
}
```

---
### Internal Function `_executeTransaction`

Let's do the same for the `executeTransaction` function. Copy the following from `executeTransaction`.

```solidity
address to = address(uint160(_transaction.to));
uint128 value = Utils.safeCastToU128(_transaction.value);
bytes memory data = _transaction.data;

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

Then place it in our first internal function called `_executeTransaction`. Since we are ignoring `_txHash` and `_suggestedSignedHash`, we only need to pass `_transaction`.

```solidity
function _executeTransaction(Transaction memory _transaction) internal {
    address to = address(uint160(_transaction.to));
    uint128 value = Utils.safeCastToU128(_transaction.value);
    bytes memory data = _transaction.data;

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
}
```
---

Now we can pass `_executeTransaction(_transaction) ` into `executeTransaction`.

```solidity
function executeTransaction(bytes32, /*_txHash*/ bytes32, /*_suggestedSignedHash*/ Transaction memory _transaction)
    external
    payable
    requireFromBootLoaderOrOwner
{
    _executeTransaction(_transaction);
}
```
---
### `executeTransactionFromOutside`

Now that we've got that done, we can call both of our new contracts in `executeTransactionFromOutside`.

```solidity
function executeTransactionFromOutside(Transaction memory _transaction) external payable {
   _validateTransaction(_transaction);    
   _executeTransaction(_transaction);
}
```
---

Now that we've got our functions just about sorted, let's go ahead and make sure our contract can receive funds. Place the following `receive` function just under the constructor. 

```solidity
receive() external payable {}
```
Now our code should compile successfully with some yellow warnings. 

```js
forge build --zksync
```
---

Congratulations! You've just completed your ZkMinimalAccount.sol for account abstraction. This was simply a bit of refactoring so no review questions at this time. However, take some time to review and reflect. Move on to the next lesson when you are ready.

