## EigenLayer Delegate Staking to Operator

The next step after having our rETH locked inside EigenLayer, is delegating our staked assets to an operator. The contract we need to call is the Delegation Manager. We will scroll up to find the name of the Delegation Manager contract. Here we can see the contract is called Delegation Manager with the interface IDelegationManager.

Now we will scroll back down. We will need to call the contract `DelegationManager`.

```solidity
delegationManager
```

Next, we need to determine what function to call. We will navigate to the interface `IDelegationManager`.

Inside interface eigen-layer, click on `IDelegationManager`. Let's look at the functions that we can possibly call.
We have `delegateTo`, `undelegate`, `queueWithdrawal`, and `completeQueueWithdrawal`.

It looks like we'll need to call the function `delegateTo`. This takes in the address of the operator. Then, it also takes in a struct as a parameter, defined as `SignatureWithExpiry`, and the `approverSalt`. Let's copy all of this and paste it into our file.

```solidity
delegationManager.delegateTo
```

```solidity
struct SignatureWithExpiry {
    bytes signature;
    uint256 expiry;
  }
```

```solidity
function delegateTo(
    address operator,
    SignatureWithExpiry memory approverSignatureAndExpiry,
    bytes32 approverSalt
  ) external;
```

```solidity
delegationManager.delegateTo(
    operator,
    SignatureWithExpiry memory approverSignatureAndExpiry,
    bytes32 approverSalt
  ) external;
```

The function we need to call is `delegateTo`. We'll start with the address of the operator. This is simple, the operator will come from the input.

```solidity
operator: operator
```

Next is the struct input, `approverSignatureAndExpiry`.

```solidity
approverSignatureAndExpiry
```

Let's copy that struct and paste it in our file.

```solidity
struct SignatureWithExpiry {
    bytes signature;
    uint256 expiry;
  }
```

For this exercise, we're not using any signature, so we can set this as an empty signature.

```solidity
signature: ""
```

We're also not using expiry so we'll set this as a default value 0.

```solidity
expiry: 0
```

And then `approverSalt`. We're not using signatures, so we'll also set this as default.

```solidity
bytes32(uint256(0))
```

```solidity
delegationManager.delegateTo({
    operator: operator,
    approverSignatureAndExpiry: IDelegationManager.SignatureWithExpiry({
      signature: "",
      expiry: 0
    }),
    approverSalt: bytes32(uint256(0))
  });
```

The `SignatureWithExpiry` struct is imported from the interface `IDelegationManager`. So we'll need to prefix this with

```solidity
IDelegationManager.SignatureWithExpiry
```

Now we will execute the function in the terminal.

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-eigen-layer.sol --match-test test_delegate -vvv
```

Great, our test passed.
