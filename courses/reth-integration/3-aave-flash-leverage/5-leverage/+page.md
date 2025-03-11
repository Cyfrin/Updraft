## What is leverage?

In simple terms, leverage means to buy something with borrowed money, and is used to amplify profit and loss.

The way it works is:

1. Borrow USD
2. Buy ETH
3. Sell ETH if the price of ETH goes up
4. Repay USD

Let's look at an example of leverage. First, we borrow USD. We can imagine that we are interacting with DeFi protocols. Let's also assume that the only loan we can get is an overcollateralized loan.
LTV = 80%
Collateral = 2 ETH
1 ETH = 3000 USD

To calculate the max borrow USD we use this equation:
Max Borrow USD = LTV x collateral amount x collateral price

Plugging in the numbers we have:

```solidity
0.80 x 2 x 3000
```

Which equals 4800 USD.

So, this is the maximum amount of USD that we can borrow from an overcollateralized lending protocol like Aave. The next step is to buy ETH with the borrowed money.

Let's say we borrow 4200 USD. We then swap the 4200 USD to ETH.

```solidity
4200 USD / 3000 USD = 1.4 ETH
```

The next step is to sell ETH that we bought if the price of ETH goes up.
Let's say the price of ETH went up from 3000 to 4000 USD. Then we swap the 1.4 ETH to USD.

```solidity
1.4 ETH x 4000 USD = 5600 USD
```

Finally we repay the USD that we borrowed. For simplicity, we will assume that the interest on borrow is equal to 0.

We repay the 3000 USD that we borrowed. The profit is the 5600 USD we have after swapping ETH back to USD minus the 3000 USD that we borrowed.

```solidity
Profit = 5600 USD - 3000 USD = 2600 USD
```

Let's compare the profit we made if we took a leveraged position and the price of ETH went up by 1000 USD versus if we didn't take a leveraged position. With the leveraged position, we made a profit of 2600 USD.

If we didn't take a leveraged position and we simply sold our ETH when ETH was at 4000 USD, we would have made 2000 USD.

Leverage allows us to amplify the potential profit that we make. It also amplifies the potential loss that we can make. Leverage is a double-edged sword. It amplifies both the potential profit and the potential loss.
