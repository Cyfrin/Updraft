## Flash Loan Smart Contract Design

Here is the contract that we're going to be building, and why we're going to be building it like this.

First, it has a proxy contract where only the owner of this contract will be able to call a function called `execute`.

When this owner calls the function `execute`, it will delegate call to another contract called `FlashLev`.

This `FlashLev` contract will call into the Aave protocol, getting flash loans, supplying collaterals, borrowing tokens, repaying the borrowed tokens, and withdrawing the collaterals.

To create a leverage position using flash loans, the owner will first call the function `execute` which will delegate call to the `FlashLev` contract.

The `FlashLev` contract will call `flashLoan`, and then the Aave protocol will call a function called `executeOperation`.

This call will be forwarded over to the proxy contract. From the fallback of the proxy contract, it will delegate call back into the `FlashLev` contract, which will contain the logic for how to create a leverage position using a flash loan, and also how to close a leverage position using a flash loan.

Now, the reason why the contracts are designed like this, is so that the positions can be managed easily and to save gas. Remember that when a user or a contract borrows from the Aave protocol, there is a specific health factor that is associated with that contract or the user that borrows tokens. If we had a single token that allowed many users to borrow tokens from Aave protocol, then the health factor will be associated with the contract and not the user.

So for example, one user might supply some token, and then another user might borrow tokens on the first users behalf.

Basically, the second user is getting a free loan from the collateral that the first user deposited.

So, to avoid this, every user will have a proxy contract, where only that user will be able to call functions on the proxy contract. Basically, this will isolate the health factor for every user.

The other reason why the contracts are split between `proxy` and `FlashLev` is because the logic contained in `FlashLev` can be reused by any proxy contract.

Imagine that there are multiple proxy contracts. All of them can do a delegate call to execute the logic inside `FlashLev` to get a flash loan and create or close a leverage position. So, this is how the contract that we're going to be building is designed, and the reason why it is designed like this.
