## Account Abstraction Lesson 31: Validate Transaction Test

In this lesson, we are going to test our `_validateTransaction` function. Along the way, we will:

- write a test function to validate transactions.
- write a helper function to create a signed transaction.
- make adjustments for `is-system = true`.

---

### Validate Transaction

One of the key components to our `_validateTransaction` function is that it returns a 'magic' value if successful. This happens if there is a valid signer.

```solidity
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

Let's make a test for this and call it `testZkValidateTransaction`.

```solidity
function testZkValidateTransaction() public {
    // Arrange

    // Act

    // Assert
}
```

For **Arrange** we can copy a lot of what we have from `testZkOwnerCanExecuteCommands`.

```solidity
// Arrange
address dest = address(usdc);
uint256 value = 0;
bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);

Transaction memory transaction =
    _createUnsignedTransaction(minimalAccount.owner(), 113, dest, value, functionData);
```

---

### Create Signed Transaction

The big difference is that now we need to create a signed transaction. We can do this with another helper function. We will need to do something similar to what we did in the `generateSignedUserOperation` from [SendPackedUserOp.s.sol](https://github.com/Cyfrin/minimal-account-abstraction/blob/main/script/SendPackedUserOp.s.sol). We will use:

- `(v, r, s)`
- `vm.sign()`
- an anvil default key

Additionally, we will need to encode hash the transaction, similar to what we did in `_validateTransaction`. For this, make sure you have `MemoryTransactionHelper` in your imports. You can place it with the `Transaction` import. It will look like this.

```solidity
import {
  Transaction,
  MemoryTransactionHelper,
} from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol";
```

Since we will be using a default anvil key, let's go ahead and place an account with the other constant variables.

```solidity
address constant ANVIL_DEFAULT_ACCOUNT = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
```

---

Let's fill out our helper function now. Essentially, we will need to:

1. calculate the transaction hash using `MemoryTransactionHelper.encodeHash`.
2. sign the hash with a hardcoded private key, resulting in v, r, and s.
3. attach the signature (r, s, v combined) to the transaction.
4. return the signed transaction.

```solidity
function _signTransaction(Transaction memory transaction) internal view returns (Transaction memory) {
    bytes32 unsignedTransactionHash = MemoryTransactionHelper.encodeHash(transaction);
    uint8 v;
    bytes32 r;
    bytes32 s;
    uint256 ANVIL_DEFAULT_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    (v, r, s) = vm.sign(ANVIL_DEFAULT_KEY, unsignedTransactionHash);
    Transaction memory signedTransaction = transaction;
    signedTransaction.signature = abi.encodePacked(r, s, v);
    return signedTransaction;
}
```

---

When we deploy our minimal account, we'll need to initialize a new instance of our default anvil account. This will allow us to sign the transaction with the anvil default key. Let's do this with the other instances in our `setUp` function.

```solidity
minimalAccount.transferOwnership(ANVIL_DEFAULT_ACCOUNT);
```

Now that we have a signed transaction, we can use it in our **Arrange** back in our `testZkValidateTransaction` function. Place this at the bottom or **Arrange**.

```solidity
transaction = _signTransaction(transaction);
```

Now our test function should look like this.

```solidity
function testZkValidateTransaction() public {
    // Arrange
    address dest = address(usdc);
    uint256 value = 0;
    bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(minimalAccount), AMOUNT);
    Transaction memory transaction =
        _createUnsignedTransaction(minimalAccount.owner(), 113, dest, value, functionData);
    transaction = _signTransaction(transaction);

    // Act

    // Assert
}
```

---

### Prank the Bootloader

We know that the caller of our validateTransaction must be the bootloader. So, we can create a vm.prank in our **Act** for this. We will of course need to import `BOOTLOADER_FORMAL_ADDRESS`.

```solidity
import { BOOTLOADER_FORMAL_ADDRESS } from "lib/foundry-era-contracts/src/system-contracts/contracts/Constants.sol";
```

We will also need to call `validateTransaction` and pass the same arguments as we did in the **Act** for `testZkOwnerCanExecuteCommands`. The difference is that we will be setting it to `bytes4 magic`, as this is what the function returns.

```solidity
// Act
vm.prank(BOOTLOADER_FORMAL_ADDRESS);
bytes4 magic = minimalAccount.validateTransaction(EMPTY_BYTES32, EMPTY_BYTES32, transaction);
```

---

### Assert

We know from our `_validateTransaction` function that `magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC`. Let's go ahead and import this from `IAccount`.

```solidity
import { ACCOUNT_VALIDATION_SUCCESS_MAGIC } from "lib/foundry-era-contracts/src/system-contracts/contracts/interfaces/IAccount.sol";
```

Now we can simply place this in our **Assert**.

```solidity
assertEq(magic, ACCOUNT_VALIDATION_SUCCESS_MAGIC);
```

---

### Test It!

We need to do a couple of things before we run our test. First, let's add a vm.deal in our `setUp` to ensure that we have a balance.

```solidity
vm.deal(address(minimalAccount), AMOUNT);
```

> ❗ **IMPORTANT** We can no longer rely on `is-system = true` in our `foundry.toml`. We will have to pass `--system-mode=true` in the command line when we run forge test. Please be aware that this is likely to change again in the future.

```js
forge test --mt testZkValidateTransaction --zksync --system-mode=true
```

Our test should pass and now we know that we can validate and execute transactions.

We've done a lot with this test. We now have an account abstraction contract on ZKsync. Take a moment to review and reflect. Move on to the next lesson when you are ready.
