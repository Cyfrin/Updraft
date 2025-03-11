## Rebase Tokens vs Non-Rebase Tokens

In this lesson, we'll discuss the difference between rebase and non-rebase tokens. For this lesson we'll use Lido stETH as our example of a rebase token and Rocket Pool rETH as an example of a non-rebase token.

### Rebase Token

Rebase tokens have an algorithmic token supply and balances mechanism. Inside the token contract, there is an algorithm that determines the supply and each user’s balance of the token. For instance, inside the token contract, the token supply grows linearly over time without user interaction. A burn may decrease the token supply, and without user interaction, the token supply will increase linearly. The token supply and balance of user's changes over time without user interaction.

For example, let's say a user has 1 stETH which allows users to redeem ETH one-to-one. Now, let's say that some time has passed. The user's token balance, stETH balance, has increased to 1.1. This happens without any user interaction with the token contract, since this is a rebase token. The supply and token balance is determined by the algorithm inside the token contract. So, now the user's token balance is 1.1 stETH and that user can redeem it for 1.1 ETH.

### Non-Rebase Token

Non-rebase tokens only have their token supply and balances change on mint or burn.

For example, the function 'mint' increases the total supply. When the function 'burn' is called, the total supply of the token will decrease. If there is no user interaction, the token supply and token balance of users will remain the same.

The token supply is static over time, and when a user mints new tokens, the token supply increases. Then, a transaction can burn some tokens and the token supply will decrease. Without user interaction, the token supply and token balance of users will remain static. rETH accrues value over time. So if a user has 1 rETH, and the exchange rate of rETH to ETH is one-to-one, that user can redeem 1 ETH.

Now let's say that some time has passed. This user still has 1 rETH, the token balance of this user remains the same (assuming that this user has not minted more rETH or burned some of the rETH). Now after some time, the exchange rate of rETH will change. rETH generally accrues value over time. So, over time, the user will be able to redeem more ETH for their rETH. So the user has 1 rETH and they are able to redeem 1.1 ETH.

Due to the way the token balances change (or don't change), there might be different tax implications between rETH and stETH.
