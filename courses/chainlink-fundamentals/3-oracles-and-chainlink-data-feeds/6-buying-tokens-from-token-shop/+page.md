# Buying Tokens from TokenShop

Let's use the `TokenShop` contract to buy some `MyERC20` tokens. This is the contract you deployed in Section 2.

1. Open your Metamask and click the **Send** button. Enter the `TokenShop` contract address as the **To** address and enter `0.001` as the amount to send `0.001 ETH` to your `TokenShop` address.

![mint-meta-mask](../assets/mint-meta-mask.png)

Click **Continue** and the **Confirm** to send the transaction.

This will send `0.001 ETH` to your `TokenShop` contract and trigger the `receive` function, which will mint tokens from the `MyERC20` contract to your wallet address.

2. Once MetaMask confirms the transaction on the blockchain, you can check whether your minted tokens show in your account in two ways:

- You can check your MetaMask wallet, under Tokens, to see if the Token you’ve previously added to your MetaMask has an updated balance.

![balance](../assets/balance.png)

You can also click on the `MyERC20` contract in Remix. Then, check how much of your token is held by your wallet address by calling `balanceOf` function and passing in your address.

![balance-of](../assets/balance-of.png)

Congratulations! You just bought and minted tokens from the `MyERC20` contract using the `TokenShop` contract using Chainlink Price Feeds to convert an ETH amount to a USD amount to calculate how many tokens to mint!
