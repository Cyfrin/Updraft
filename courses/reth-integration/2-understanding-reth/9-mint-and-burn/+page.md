## Minting and Burning RETH

Here are the steps needed to understand how a user deposits ETH and mints RETH:

**Mint:**

1.  A user deposits ETH and mints RETH.
2.  There are several Rocket Pool contracts that are called, but we will highlight three contracts: RocketDepositPool, RocketStorage, and RocketTokenRETH.
3.  Let's say Alice has 1 ETH, and she deposits this ETH into the RocketDepositPool contract.
4.  Among many things, the RocketDepositPool contract will get an address from the RocketStorage.
5.  This will get an address for a contract that is responsible for the protocol settings.
6.  Here, it is going to check whether deposit is enabled or not.
7.  It checks that deposit is enabled, and if it is, it will call the function mint on the RocketTokenRETH, which is the RETH token contract.
8.  Now, the RocketTokenRETH contract will call the RocketStorage contract so that it can get contracts to query data that is needed to calculate the exchange rate from ETH to RETH.
9.  Once the exchange rate is calculated, it will mint RETH to Alice.

**Burn:**

1.  To redeem ETH from RETH, the user will have to burn their RETH.
2.  There are multiple contracts that are involved with burning RETH, but again, we will highlight three contracts: RocketDepositPool contract, RocketTokenRETH, and RocketStorage.
3.  Let’s say that Alice has RETH and she wants to redeem her ETH.
4.  The first thing she’ll do is call the function burn on the RocketTokenRETH contract.
5.  Once the token is burned, the RETH contract will have to get addresses by calling into the RocketStorage contract.
6.  It will get the address for the contracts that are needed to calculate the exchange rate from RETH back to ETH.
7.  Now, if there are enough ETH inside the RETH contract, then ETH will simply be sent back to Alice, and we’re done here.
8.  However, if there is not enough ETH inside the RocketTokenRETH contract, then it will have to call the function withdrawExcessBalance on the RocketDepositPool contract.
9.  The RETH contract is asking the RocketDepositPool contract to send some ETH back to the RocketTokenRETH contract.
10. The RocketDepositPool contract will have to get another contract to calculate the excess amount of ETH that can be withdrawn.
11. This is done by calling the function getAddress on the RocketStorage contract.
12. The RocketStorage contract will store the contract address that is responsible for calculating the excess balance that can be withdrawn.
13. Once that is done, ETH is sent from the RocketDepositPool contract over to the RETH token contract.
14. Then finally, ETH is sent back to Alice.
