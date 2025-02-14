## Account Abstraction Lesson 6: `EntryPoint` Contract

In this lesson, our main objective is to make sure that our contract can only be called by the `EntryPoint`. Along the way, we will:

- import `IEntryPoint` Interface
- update our constructor to take `entryPoint`
- create our first state variable, getter function, and modifier

First, let's make sure that `validateUserOp` is only callable by the `EntryPoint` Contract. Let's import the `IEntryPoint` Interface. This will help us understand how the `EntryPoint` works and give us some valuable getter functions.

```solidity
import { IEntryPoint } from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
```

Next, add `address entryPoint` as a parameter to our constructor. Then, create a state variable and set it to private immutable.

```solidity
IEntryPoint private immutable i_entryPoint;

constructor(address entryPoint) Ownable(msg.sender) {
     i_entryPoint = IEntryPoint(entryPoint)
}
```

If we click into the contract we can see all of the functions that the `EntryPoint` can use. Feel free to look over them before moving on.

As previously mentioned, `IEntryPoint` will give us some getters. Copy and paste this header at the bottom of your code. Then, we will add some getter functions under it.

```solidity
/*//////////////////////////////////////////////////////////////
                                GETTERS
//////////////////////////////////////////////////////////////*/
```

> ❗ **NOTE** There is a neat tool that can produce these awesome headers automatically in the terminal. You can check that out here if you want.
> [transmission11/headers](https://github.com/transmissions11/headers)

Here is the getter function.

```solidity
function getEntryPoint() external view returns (address) {
        return address(i_entryPoint);
    }
```

Next, we want to create a modifier called `requireFromEntryPoint`. Place it above your constructor.

```solidity
modifier requireFromEntryPoint() {
        if (msg.sender != address(i_entryPoint)) {
            revert MinimalAccount__NotFromEntryPoint();
        }
        _;
    }
```

Here, if the caller of the contract is not `EntryPoint` it will revert. You may have also noticed that our modifier has a custom error. Let's place it above our state variable.

```solidity
error MinimalAccount__NotFromEntryPoint();
```

Now we can use our modifier to make our `validateUserOp` callable exclusively from the `EntryPoint`. Let's place `requireFromEntryPoint` in our function.

```solidity
function validateUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
        external
        requireFromEntryPoint
        returns (uint256 validationData)
    {
        validationData = _validateSignature(userOp, userOpHash);
        // _validateNonce()
        _payPrefund(missingAccountFunds);
    }
```

And now we are all set for the next steps. Before we move on, let's take a look at what our code looks like so far. Take a moment to reflect on what we have gained to this point in the course. When you are ready, move on to the next lesson.

```solidity
contract MinimalAccount is IAccount, Ownable {
     /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error MinimalAccount__NotFromEntryPoint();

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/
    IEntryPoint private immutable i_entryPoint;

     /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/
    modifier requireFromEntryPoint() {
        if (msg.sender != address(i_entryPoint)) {
            revert MinimalAccount__NotFromEntryPoint();
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    constructor(address entryPoint) Ownable(msg.sender) {
        i_entryPoint = IEntryPoint(entryPoint);
    }

     // A signature is valid, if it's the MinimalAccount owner
    function validateUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
        external
        requireFromEntryPoint
        returns (uint256 validationData)
    {
        validationData = _validateSignature(userOp, userOpHash);
        // _validateNonce()
        _payPrefund(missingAccountFunds);
    }

    // EIP-191 version of the signed hash
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

    function _payPrefund(uint256 missingAccountFunds) internal {
        if (missingAccountFunds != 0) {
            (bool success,) = payable(msg.sender).call{value: missingAccountFunds, gas: type(uint256).max}("");
            (success);
        }
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/
    function getEntryPoint() external view returns (address) {
        return address(i_entryPoint);
    }
}
```
