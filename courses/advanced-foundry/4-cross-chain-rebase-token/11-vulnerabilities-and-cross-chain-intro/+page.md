## Vulnerabilities and cross-chain intro

We are going to talk about a rebase token that uses a linear interest rate. This means we are keeping things as simple as possible. However, we need to be aware of a few vulnerabilities in the design. 

The first vulnerability is a potential problem with the `transfer()` and `transferFrom()` functions. If we send tokens to a user who hasn't yet deposited and therefore doesn't have an interest rate, they will inherit the interest rate of the sending wallet.

This creates a potential problem where a user could send a small amount of tokens to a new user very early on, when the interest rate is high. Then, later on when the interest rate has decreased, they can send a large amount of tokens to the same user. The user then gets to apply the higher interest rate to both the initial small deposit and the later large deposit.

The second vulnerability is in the way we calculate the user's balance. The `balanceOf()` function multiplies the number of tokens minted by the user by one plus the accrued interest. However, if the user burns tokens, we mint them the accrued interest and then increase their balance, which means the `balanceOf()` function will return a higher number because of the interest earned from the burned tokens.

This isn't a critical issue, but it means we need to be careful about how we implement the contract. If the user starts burning tokens quickly, they could potentially end up with an inflated balance, as the interest is being applied to the burned tokens as well. 

We can address this by implementing a minimum amount of tokens that the user can burn or transfer. Alternatively, we can create a deposited struct that tracks the interest rate and the deposit time for every user, which would mean that we can calculate the balance more accurately. However, this might make the cross-chain aspect more difficult to implement.

We will now discuss cross-chain transfers. To do this, we will need to use a standard called a Cross-Chain Token Standard, provided by Chainlink. This standard makes it possible to send tokens across different blockchains.

The Cross-Chain Token Standard is completely permissionless. We don't need to go through a central authority or wait for Chainlink to sign off on every transaction. This means that we can send our tokens across blockchains completely independently.

We are going to do a brief overview of bridging and CCIP and then we will discuss how to implement our cross-chain rebase token. 
