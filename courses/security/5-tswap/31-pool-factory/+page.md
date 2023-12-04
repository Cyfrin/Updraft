---
title: T-Swap Manual Review PoolFactory
---



---

# A Deep Dive into Smart Contracts: Unraveling Pool Factory and TSWAP Pool

In this post, we're exploring the Tincho methodology of reviewing smart contracts, through which we'll address an audit of two solidity contracts: pool factory and TSWAP pool. For those new to the land of contracts and Solidity, don't worry! We'll break things down in an accessible way.

## Spot the Import: Pool Factory

![](https://cdn.videotap.com/rzbl0Otqs4FSU2qtnoIs-26.08.png)

Initially, the pool factory has a couple of imports. The interesting one is the IERC 20 forged import. Although the forge interface isn't something I heavily engage with, it catches my eye and is worth deeper exploration some other time. Apart from the IERC 20, we have the import for our second character today– TSWAP pool.

The pool factory is the infrastructure of this system because it deploys and launches the pools. In simple terms, it's the bedrock on which every pool stands.

Upon reviewing, we encounter two error messages - "Pool already exists" and "Pool does not exist." These are indicative of conditions for pool creation.

```javascript
if (poolExists) {
  revert("Pool already exists");
}
```

The contract checks if a pool already exists during creation, thus preventing any duplications.

## The First Bug

On further delving, it appears the second error message is not used anywhere. This was discovered after a quick code audit. This is our first discovery of a bug - a redundant error message that can be expunged from the code. This certainly won't make or break the system but highlights the fact that some cleaning up and code review could be beneficial.

## Deciphering the Mappings

There are a couple of private mappings - `tokenTopool` and `poolTotoken`. They allow backward and forward retrieval of pool-token associations. The WETH token is immutable as it pairs with every token.

Among events, the `poolCreated` is noticeable and appears to be the main event.

Concerning the external functions, `createPool` takes the spotlight as the major function.

## Event Details and Function Understanding

We've added an informational constructor setting the WETH token and now we can deep delve into the `createPool` function which stands out as the key player here.

The `createPool` function gets a token address that is mapped to the WETH, forming a token-pool pair. If a pool with this token address is tried to be created again, the system will revert with the error message that the pool already exists.

Furthermore, this function also encompasses the naming logic for the pools.

The system is retrieving the name of the ERC 20 token and appending it to the word "TSWAP" to name the liquidity token. The liquidity token represents the shares of the token given to the LPs (Liquidity Providers).

Apart from the naming convention, it's also noteworthy to point out the symbol logic –

To improve user experience, we suggest the token symbol to be used instead of the full token name to avoid unnecessarily lengthy symbols.

## Analyzing Pool Sub-Creation

Next, we initiate pool sub-creation with the respective pool token, WETH token, and the newly created symbol and name.

On successful pool creation, we add the pool to our list, map it back, emit an event, and finally, return the address of the new pool.

## So... How's The Pool Factory Looking?

Following our analysis, the pool factory contract seems to be well-structured, with only a few informational findings on the radar. It is certainly worth a checkmark in the `notes.md`.

```markdown
- [x] Pool Factory : Looks Good
```

In our next chapter, we'll proceed to the TSWAP pool and continue breaking it down. Stay tuned for more straightforward smart contract analysis!
