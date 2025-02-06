## Account Abstraction Lesson 24: Validate Transaction ZKsync

Now that we have verified and updated the nonce, we will need to:

1. check for fee to pay
2. check the signature
3. return the "magic" number

Let's get started!

---

### Check for Fee to Pay

Let's set up some comments to act as a roadmap in our function first.

```solidity
function validateTransaction(bytes32 _txHash, bytes32 _suggestedSignedHash, Transaction memory _transaction)
    external
    payable
    returns (bytes4 magic)
{
    SystemContractsCaller.systemCallWithPropagatedRevert(
        uint32(gasleft()),
        address(NONCE_HOLDER_SYSTEM_CONTRACT),
        0,
        abi.encodeCall(INonceHolder.incrementMinNonceIfEquals, (_transaction.nonce))
    );

    // Check for fee to pay
    // Check signature
    // Return the "magic" number
}
```

---

We already have a tool that will calculate fees for us called `MemoryTransactionHelper`. Let's add this to our `Transaction` import and set it up in our contract.

```solidity
import {
  Transaction,
  MemoryTransactionHelper,
} from "lib/foundry-era-contracts/src/system-contracts/contracts/libraries/MemoryTransactionHelper.sol";
```

Place the following inside our contract above the external functions

```solidity
using MemoryTransactionHelper for Transaction;
```

---

From this library, we will use a function called `totalRequiredBalance`. Set the following in our `validateTransaction` function.

```solidity
// Check for fee to pay
uint256 totalRequiredBalance = _transaction.totalRequiredBalance();
if (totalRequiredBalance > address(this).balance) {
    revert ZkMinimalAccount__NotEnoughBalance();
}

// Check the signature
// Return the "magic" number
```

Since we have a revert, let's go ahead and set our custom error under `using MemoryTransactionHelper for Transaction;`.

```solidity
error ZkMinimalAccount__NotEnoughBalance();
```

---

### Check for Signature

Now we can check for the signature. We will need the `encodeHash` function from `MemoryTransactionHelper`. Essentially, this function determines the type of transaction and then calls the appropriate encoding function to generate the hash. Click below to see the function.

---

<details>

**<summary><span style="color:red">Encode Hash Function</span></summary>**

```solidity
/// @notice Calculate the suggested signed hash of the transaction,
/// i.e. the hash that is signed by EOAs and is recommended to be signed by other accounts.
function encodeHash(Transaction memory _transaction) internal view returns (bytes32 resultHash) {
    if (_transaction.txType == LEGACY_TX_TYPE) {
        resultHash = _encodeHashLegacyTransaction(_transaction);
    } else if (_transaction.txType == EIP_712_TX_TYPE) {
        resultHash = _encodeHashEIP712Transaction(_transaction);
    } else if (_transaction.txType == EIP_1559_TX_TYPE) {
        resultHash = _encodeHashEIP1559Transaction(_transaction);
    } else if (_transaction.txType == EIP_2930_TX_TYPE) {
        resultHash = _encodeHashEIP2930Transaction(_transaction);
    } else {
        // Currently no other transaction types are supported.
        // Any new transaction types will be processed in a similar manner.
        revert("Encoding unsupported tx");
    }
}
```

</details>


Then we will need to validate the signature on the `Transaction` struct (similar to `PackedUserOperation` from our Ethereum contract.). We will need a few imports.

```solidity
import { MessageHashUtils } from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import {
  IAccount,
  ACCOUNT_VALIDATION_SUCCESS_MAGIC,
} from "lib/foundry-era-contracts/src/system-contracts/contracts/interfaces/IAccount.sol";
```

> ❗ **NOTE** For 'ACCOUNT_VALIDATION_SUCCESS_MAGIC', just place it in the IAccount import that is already in our code.

And with this we will also need to set contract to inherit `Ownable` and create our constructor.

- `contract ZkMinimalAccount is IAccount, Ownable`

```solidity
constructor() Ownable(msg.sender) {}
```

---

Back in our function, we can now set the following variables to check the signature. We will need:

- a transaction hash
- an address of the signer
- to ensure the signer is the owner
- to check if the signer is valid
- to return magic if valid

> ❗ **IMPORTANT** This section varies slightly from the video as there was an error that will be corrected later on.

```solidity
 // Check the signature
bytes32 txHash = _transaction.encodeHash();
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

Let's take a look at what our function looks like now. You will note that \_txHash and \_suggestedSignedHash are commented out. No need to worry about these at the moment.

```solidity
function validateTransaction(bytes32 /*_txHash*/, bytes32 /*_suggestedSignedHash*/, Transaction memory _transaction)
    external
    payable
    returns (bytes4 magic)
{
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

    // Check signature
    bytes32 txHash = _transaction.encodeHash();
    address signer = ECDSA.recover(txHash, _transaction.signature);
    bool isValidSigner = signer == owner();
        if (isValidSigner) {
            magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC;
        } else {
            magic = bytes4(0);
        }

    // Return the "magic" number
     return magic;
}
```

---

### Only the Bootloader Can Call

Our function is almost complete. However, we need to make sure that only the bootloader can call it. To do this, we will need to create a modifier and place it into our function. Place it below our errors in the contract.

```solidity
/*//////////////////////////////////////////////////////////////
                               MODIFIERS
//////////////////////////////////////////////////////////////*/
modifier requireFromBootLoader() {
    if (msg.sender != BOOTLOADER_FORMAL_ADDRESS) {
        revert ZkMinimalAccount__NotFromBootLoader();
    }
    _;
}
```

Basically, this modifier is saying that if the sender is not from the `BOOTLOADER_FORMAL_ADDRESS`, revert the transaction. From this code we can see that we need to do a couple more things.

1. import BOOTLOADER_FORMAL_ADDRESS
2. set custom error for the revert

Simply paste this in the `NONCE_HOLDER_SYSTEM_CONTRACT` import that we have already added.

```solidity
BOOTLOADER_FORMAL_ADDRESS;
```

Place this custom error with our other one at towards the top of the contract

```solidity
error ZkMinimalAccount__NotFromBootLoader();
```

Now add `requireFromBootloader` in our function between `payable` and `returns (bytes4 magic)`. It will look like this.

```solidity
function validateTransaction(bytes32 /*_txHash*/, bytes32 /*_suggestedSignedHash*/, Transaction memory _transaction)
    external
    payable
    requireFromBootLoader
    returns (bytes4 magic)
```

---

And just like that, we have a function that can get the nonce, validate and increment it, check the fee to pay, and sign the transaction if the `bootloader` is `msg.sender`.

As always, let's do a bit of review. Move on to the next lesson when you are ready.

---

### Questions for Review

---

<summary>1. Which function from MemoryTransactionHelper is used to calculate the total required balance?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

totalRequiredBalance()

</details>


<summary>2.  What is the purpose of the requireFromBootLoader modifier? </summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    To ensure that if the sender is not from the BOOTLOADER_FORMAL_ADDRESS, the transaction is reverted.

</details>


<summary>3. What is the purpose of the encodeHash function from MemoryTransactionHelper?</summary>

---

<details>

**<summary><span style="color:red">Click for Answers</span></summary>**

    It determines the type of transaction and then calls the appropriate encoding function to generate the hash.

</details>

