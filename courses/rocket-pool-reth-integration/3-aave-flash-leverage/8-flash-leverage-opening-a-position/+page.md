## Flash Leverage: Opening a Position

Here, we’ll show you how to create an increased leverage position by looping.
We loop through the process of depositing collateral, borrowing some stable coin and then buying more collateral.
Then, we repeat the process over and over again. If we were to do that with smart contracts, then it would use up a lot of gas. Instead, we can create the same result using a flash loan, in which case we don’t have to loop through the three steps, saving us some gas.

To open a leverage position:

1. Start with some initial amount of collateral.
2. Flash loan USD stablecoin.
3. Using that stablecoin that we just flash loaned, we will buy more collateral.
4. Then, deposit the collateral, which is the collateral that we had from step 0 and the collateral that we just bought, to Aave as collateral.
5. Once the collateral is deposited, we can borrow stable coins from the Aave protocol.
6. The stable coin that we just borrowed will be used to repay the flash loan from step 1.

That’s how we create a large leverage position without looping through the process of depositing collateral, borrowing stable coin, swapping the stablecoin for collateral and then re-depositing it as collateral.
