## Account Abstraction Lesson 26: Pay For Transactions ZKsync

We are very close to having our ZKsync account abstraction finished. We still need to pay for the transaction. In the `validateTransaction` function we check to see if we can pay, but now we need to actually do it. We have two possible candidates for this - `payForTransaction` and `prepareForPaymaster`. Since we aren't using a paymaster, we'll be using `payForTransaction`. 

```solidity
 function payForTransaction(bytes32, /*_txHash*/ bytes32, /*_suggestedSignedHash*/ Transaction memory _transaction)
    external
    payable
{

}
```

Back in the `MemoryTransactionHelper` contract, there is a `payToBootloader` function. This function:

- gets the bootloader address
- calculates the amount to pay
- makes the payment 

**<span style="color:red">MemoryTransactionHelper.sol</span>**

**Pay to Bootloader Function**
```solidity
/// @notice Pays the required fee for the transaction to the bootloader.
/// @dev Currently it pays the maximum amount "_transaction.maxFeePerGas * _transaction.gasLimit",
/// it will change in the future.
function payToTheBootloader(Transaction memory _transaction) internal returns (bool success) {
    address bootloaderAddr = BOOTLOADER_FORMAL_ADDRESS;
    uint256 amount = _transaction.maxFeePerGas * _transaction.gasLimit;

    assembly {
        success := call(gas(), bootloaderAddr, amount, 0, 0, 0, 0)
    }
}
```
---

Let's use this function inside our function and set it to `bool success`. If not successful, revert.

**<span style="color:red">ZkMinimalAccount.sol</span>**
```solidity
 function payForTransaction(bytes32, /*_txHash*/ bytes32, /*_suggestedSignedHash*/ Transaction memory _transaction)
    external
    payable
{
     bool success = _transaction.payToTheBootloader();
    if (!success) {
        revert ZkMinimalAccount__FailedToPay();
    }
}
```

Place the new custom errors with the others. 

```solidity
error ZkMinimalAccount__FailedToPay();
```
---

Now we can: 

1. Validate the transaction
2. Execute the transaction
3. Pay for the transaction

Move on to the next lesson when you are ready. 
