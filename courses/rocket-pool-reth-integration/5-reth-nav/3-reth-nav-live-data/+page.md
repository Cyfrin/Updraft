## Finding the rETH NAV From Rocket Pool's NAV Oracle

In this lesson, we are going to explore how to find the NAV (Net Asset Value) from Rocket Pool's NAV oracle. We'll start by exploring the Rocket Pool documentation under the Integrations page. Inside this page, we'll search for the contract address of the NAV oracle.

Here are the steps we'll follow:

1. Search for the term "NAV".
2. From the results, select "RP oDAO Rate (Mainnet)" under the "Oracles (NAV)" Section.
3. Click on "rETH/ETH". This will take us to the Etherscan website and to the "getExchangeRate" function.

The number displayed has 18 decimals. We'll copy the number and divide it by 10 to the power of 18 to see what the exchange rate is. Here are the steps to do that:

1. Open a Python shell.
2. Inside the terminal, type

```bash
python
```

to open the Python shell. 3. Paste the number that we just copied and divide this by 1e18.

```python
1125502080584041036 / 1e18
```

The result, approximately 1.125502080584041, is the exchange rate of 1 rETH to ETH.
For every 1 rETH provided to the Rocket Pool protocol, we get back approximately 1.1255 ETH.
