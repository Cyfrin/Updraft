## Mint pool shares

In this lesson, we'll cover a common problem faced when working with Uniswap V2 liquidity pools: how to calculate the number of shares to mint for a new liquidity provider.

We'll imagine a simple smart contract that accepts a single token (let's say USDC). This smart contract can invest the USDC to earn yield, lend it out to other users, or perform other functions. The key point is that the USDC balance within the contract will likely fluctuate over time.

Our goal is to understand how to determine the correct number of shares to mint for a new liquidity provider, given the current USDC balance and the total number of shares already in existence.

Let's start with a concrete example:

**Example:**

* **User 1:** Deposits $300 USDC and receives 300 shares.
* **User 2:** Deposits $500 USDC and receives 500 shares.
* **User 3:** Deposits $200 USDC and receives 200 shares.

At this point, the pool holds a total of $1000 USDC and has minted 1000 shares. This means that each share is currently worth $1.

**The Problem:**

Now, let's say the smart contract has earned some yield, and the USDC balance has increased to $1100. 

**A new user (User 4) comes along and deposits $110 USDC. How many shares should the smart contract mint for them?**

**The Solution:**

The answer lies in a simple equation:

```
s = (L1 - L0) / T
```

Where:

* **s:** The number of shares to mint for the new user
* **L1:** The total USDC balance in the pool **after** the new deposit
* **L0:** The total USDC balance in the pool **before** the new deposit
* **T:** The total number of shares currently outstanding 

**Applying the Equation:**

In our example:

* **L1:** $1210
* **L0:** $1100
* **T:** 1000

Therefore:

```
s = (1210 - 1100) / 1000
s = 110 / 1000
s = 0.11 
```

The smart contract should mint **0.11 shares** for User 4.

**Important Note:**

This simple scenario illustrates the core concept. In a real-world Uniswap V2 pool, the calculation is similar, but it involves two tokens (e.g., ETH and USDC). The underlying logic, however, remains the same. 
