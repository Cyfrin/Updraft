## Burn Pool Shares

We're going to discuss burning pool shares in a Uniswap V2 pool. This is an important concept to understand for both providing liquidity and trading in the pool.

Let's imagine a pool contract that has 1,210 USDC and 1,100 total shares.

- User 1 deposits 300 USDC and gets 300 shares
- User 2 deposits 500 USDC and gets 500 shares
- User 3 deposits 200 USDC and gets 200 shares
- User 4 deposits 110 USDC and gets 100 shares

The total amount of USDC in the pool is 1210, and the total amount of shares is 1100.

Now, User 1 burns 100 of their shares. This means they're removing their liquidity from the pool. Burning shares reduces the total shares outstanding. Because 100 shares were burned, the new total number of shares outstanding is 1000.

Next, User 3 wants to claim their USDC back. They decide to burn 200 shares to do so. Burning the 200 shares reduces the total number of shares to 800.

We can calculate how much USDC User 4 would receive for burning 100 shares by using the following equation:

```
Shares burnt / Total shares * Amount of token locked in the pool contract
```

We can also calculate how much USDC User 3 would receive for burning 200 shares using the same equation:

```
Shares burnt / Total shares * Amount of token locked in the pool contract
```
