## Rocket Pool NAV Oracle

Rocket Pool's NAV oracle is the Net Asset Value of rETH. NAV stands for net asset value, so the NAV oracle is the net asset value of rETH, or the exchange rate between rETH and ETH.

The equation for NAV is relatively straightforward:

```solidity
NAV = total ETH in Rocket Pool / total rETH supply
```

The total ETH in Rocket Pool contains the amount of staked ETH, earned rewards, and any penalties. The net asset value is the exchange rate that is given by the Rocket Pool protocol. The market rate is given by the market exchange rate. The market rate will slightly differ depending on the source, for example, Chainlink or Binance. The rate is based on supply and demand.

When do we use one rate over the other? If we are only trading tokens, we should pick the better of the two rates for the trade. If the market rate is better, swap tokens on the market, either through a centralized exchange or through a decentralized exchange. We should use NAV for long-term holdings.

The reason is that the market rate changes frequently based on the supply and demand of rETH. Therefore, for evaluating the long-term holding of rETH, NAV will be a more reliable way to calculate the value of rETH.
