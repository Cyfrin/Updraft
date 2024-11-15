## Danger of Using Uniswap V2 Spot Price for Price Oracle

We've learned how to get the USD price of ETH using programming languages like JavaScript or Python. We did this by calling an API to fetch the price.

But how do we do this on-chain in Solidity?

We can't directly fetch the USD price of ETH in Solidity. Instead, we need a price oracle, a special smart contract that provides the price of a token.

A common idea is to use Uniswap V2 pair contracts to fetch the spot price of a token. For example, we might use a DAI / WETH pair contract to get the price of ETH in DAI.

However, this is a dangerous approach. The spot price on Uniswap V2 can be easily manipulated, which can lead to exploits.

### Example

Let's imagine a lending protocol that allows users to borrow DAI by locking ETH as collateral. The protocol calculates the collateral value in DAI by fetching the spot price of ETH from a DAI / WETH pair contract.

A hacker could exploit this protocol by manipulating the spot price of ETH. They could buy a large amount of ETH with DAI, increasing the price. Then, they could borrow a large amount of DAI, exceeding the value of their collateral.

Imagine a hacker:

1. Buys 832 WETH using 10,000,000 DAI, increasing the spot price of ETH to 71,819 DAI per ETH.
2. Borrows 5,745,599 DAI by locking 100 ETH as collateral.
3. Sells 832 WETH back, bringing the spot price back to around 2,000 DAI per ETH.

The hacker has now borrowed more DAI than the value of their collateral. While they can't take out the 100 ETH locked as collateral, they still made a profit of 5,535,563 DAI.

**How it works:**

- The hacker artificially inflates the price of ETH by buying it using DAI.
- The lending protocol sees the inflated price and allows the hacker to borrow more DAI than their collateral's real value.
- The hacker then sells the ETH they bought, bringing the price back down.
- They keep the DAI they borrowed, leaving the lending protocol with a loss.

This is just one example of how manipulating spot prices can exploit DeFi protocols. 
