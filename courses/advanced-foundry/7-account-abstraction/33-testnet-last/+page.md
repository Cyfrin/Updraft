## Account Abstraction Lesson 33: Testnet ZKsync Demo

The final step is to deploy and send a transaction. As of the creation of this lesson, foundry scripts don't work that well with ZKsync. We are going to use Hardhat. Since Hardhat isn't a part of this course, we won't do any explanation of the code. However, you will get to see how it is deployed and sent. 

First, we do need to make some updates to our `ZkMinimalAccount` contract. You may remember that our `_validateTransaction` function `returns (bytes4 magic)`. However, we forgot to do this when calling it in the `executeTransactionFromOutside` function. Let's make this update now. 

**Before**
```solidity
function executeTransactionFromOutside(Transaction memory _transaction) external payable {
    _validateTransaction(_transaction);    
    _executeTransaction(_transaction);
}
```

**After**
```solidity
function executeTransactionFromOutside(Transaction memory _transaction) external payable {
    bytes4 magic = _validateTransaction(_transaction);
    if (magic != ACCOUNT_VALIDATION_SUCCESS_MAGIC) {
        revert ZkMinimalAccount__InvalidSignature();
    }
    _executeTransaction(_transaction);
}
```

Now add the custom error with the others.

```solidity
error ZkMinimalAccount__InvalidSignature();
```
---
### Deploy with Hardhat

Please follow along with the video from this point. If you would like to see the code, you can find it in the [Javascript-scripts folder.](https://github.com/Cyfrin/minimal-account-abstraction/tree/main/javascript-scripts)

**Steps covered in the video**

1. run `yarn deploy` in the terminal
2. copy the address from **zkMinimalAccount deployed to:** that will display in the terminal 
3. paste it in [zksync sepolia explorer](https://sepolia.explorer.zksync.io/)
4. send it some funds from testnet wallet
5. go into `SendAATx.ts` in the javascript-scripts folder
6. paste our address into `const ZK_MINIMAL_ADDRESS`
7. run yarn sendTx in the terminal 
8. once successful, go back to zksync sepolia explorer and refresh the page
9. should see the two transactions on the screen

Congratulations! Take some time to reflect and move on to the next lesson when you are ready.
