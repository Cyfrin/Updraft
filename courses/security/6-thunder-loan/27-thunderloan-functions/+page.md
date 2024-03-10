---
title: Thunderloan.sol - Functions
---

# Demystifying Smart Contracts: A Deep Dive into Functions, Constructors and Operators

Learning how to build smart contracts is challenging, but the rewards are immense. To help you on this journey, in this blog post, we will scrutinize the intricate workings of smart contract functions, constructors, and more.

## Beginning with the Constructor

First things first, we start by defining a constructor with a custom Oz (OpenZeppelin) upgrade — `Unsafe Allow Constructor`. This construct serves to pacify static analysis tools that generally get riled up with all the initializer tricks we use.

A vital keyword we use is `DisableInitializers` that originates directly from the Initializable package. It's a safeguard to prevent the inadvertent calling of any initializers in the constructor, an act we want to avoid at all costs because our smart contract is upgradable, and it exists behind a proxy.

### Understanding OwnableInit

We already mentioned the effects of `initializer` modifier, particularly how it could get front run. Now, let's talk about `OwnableInit`. This function merely facilitates the transfer to the preliminary owner.

### Diving into UpgradableInit

This function has the same modus operandi as `UUPsUpgradableInit`, setting up storage for UUPs. However, considering UUPs is a comprehensive subject, we will not go into its details for now.

### Getting Familiar with OracleInit

To further understand `OracleInit`, imagine using T-Swap (an address) as a kind of oracle. There's also the initial fee precision and initial fee for flash loans.

## The Deposit Function

This is a very crucial function and, yes, it's missing Natspec! It's essential to call this out and highlight the necessity of the Natspec. This function is responsible for allowing users to deposit their tokens into the contract, thus facilitating flash loans for other users.

A few key takeaways from the deposit function:

- If the deposited `amount` is zero, revert
- If the token is not an allowed token, revert
- The function also employs the mapping `sTokenToAssetToken` to evaluate which sToken corresponds to which AssetToken

## Setting Allowed Tokens

A healthy exercise in understanding how these tokens are determined, let's look at the `setAllowedToken` function. In effect, it facilitates the setting or removal of tokens.

This critical function is permissioned and can only be executed by the owner of the protocol. Here's how it works:

- If the token is allowed, it is added to the `sTokenList`
- If the token is to be disallowed, the function will proceed accordingly
- The function reverts with the status of the token, i.e., whether it is `already allowed` or not

## Conclusion

In conclusion, the journey into the realm of smart contracts can be a bit tricky and complex. Still, by analyzing the various functions and their specific roles, one can gain a solid understanding of their dynamics and workflow. Persistent learning, constant practice, and a practical mindset are all that's required to master smart contract development. And remember: always make use of Natspec for the sake of readability and developer friendliness. Happy Coding!
