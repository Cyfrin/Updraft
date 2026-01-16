## Real Aave and Uniswap Scripting Demonstration

In this lesson, we'll be showcasing a script that automatically manages our assets on the ZkSync network. 

The script we'll be building will utilize real money to demonstrate the process on the Aave application. We'll be working with ETH and USDC tokens. 

Our goal is to rebalance our portfolio to achieve a target allocation of 70% ETH and 30% USDC. Currently, our portfolio is skewed towards USDC, with 56% allocated to USDC and 43% to ETH.

The script will perform the following actions:

- **Deposit:** Deposit all our tokens into the Aave protocol.
- **Rebalance:** Trade our tokens to reach our target allocation. We'll be using Uniswap for these trades.
- **Deposit:** Deposit the rebalanced tokens back into the Aave protocol.

Let's first examine our current portfolio:

- Aave: 
    - USDC: $68.86
    - ETH: $180.05 

- Metamask:
    - USDC: $160.00
    - ETH: $31.96

Now, let's run our script to rebalance this portfolio.

```bash
mox run deposit_and_rebalance --network zkysnc --account smallMoney
```

Our script will first deposit all of our tokens into the Aave protocol. It will then analyze the current allocation and determine the necessary trades. Finally, it will execute these trades on Uniswap and deposit the rebalanced tokens back into Aave. 

This script demonstrates the power of algorithmic trading, allowing us to automate the management of our portfolio and achieve our desired asset allocation. 

We'll be delving deeper into this process in later lessons, including how to create a notebook to test and refine our scripts. Stay tuned! 
