## Sending Your First Transaction

In this lesson, we'll set up a new virtual testnet and send our first transaction. We'll be using the testnet provided by Tenderly, which lets us simulate sending real transactions without using actual money.

### Setting Up a Virtual Testnet

1. Go to the [Tenderly](https://tenderly.co/?mtm_campaign=partner&mtm_kwd=cyfrin) website.
2. Click the **Sign Up** button in the top right corner.
3. Enter your **Email**, **Username**, and **Password**.
4. Click **Create Account**.
5. You'll be taken to the Tenderly dashboard. Click **Skip personalization**.
6. On the left side of the page, find the **Virtual TestNets** section and click it.
7. Click **Create Virtual TestNet**.
8. We'll make a few configuration choices.
9. Under **General**, choose **Sepolia** for the parent network. We could select **Ethereum Mainnet**, but it doesn't really matter.
10. Give your testnet a **Name**. I'll call mine `my-chain`.
11. Under **Chain ID**, select **Custom** and enter `111555111`. You can choose **Default** to keep the original chain ID.
12. Under **Public Explorer**, select **Off** to restrict access for now. You could leave it at **Fork** or **On**.
13. For **State Sync**, choose **Use latest block**.
14. Click **Create**.
15. A message will pop up from Tenderly, asking us to send a message with `CYFRIN2024` to extend our free trial. Send the message.
16. You'll see your new virtual testnet, `my-chain`, has been created.
17. Click **Add to Wallet** next to your virtual testnet's name.
18. Your MetaMask window will appear. Click **Connect**.
19. Your virtual testnet should now be added to MetaMask.

### Sending Your First Transaction

1. In MetaMask, go to the **Tokens** tab.
2. Click the account drop-down menu and create a new account.
3. Click **Add account** and name it, e.g. `Account 2`.
4. Back in the account drop-down menu, you'll see `Account 1` with some funds and `Account 2` with zero funds.
5. Click the **Send** button in MetaMask.
6. We'll send money from `Account 1` to `Account 2`. You can either click the `Account 2` button or paste in `Account 2`'s address. I'll just click the button.
7. Enter the amount of ETH you wish to send, e.g. `1 ETH`.
8. Click **Continue**.
9. A review of the transaction will pop up. Click **Confirm**.
10. You'll see your transaction in a pending state.
11. After a short delay, the transaction will be confirmed.
12. In MetaMask, go back to the **Tokens** tab. You'll see that `Account 1` now has `999 ETH` and `Account 2` has `1 ETH`.
13. Go back to the Tenderly dashboard.
14. Go to the **Explorer** tab.
15. You'll see a list of all the transactions that have been sent. Any transactions that are grayed out are from the forked chain and can be ignored for now. The latest transaction that is not grayed out is the transaction we just sent.
16. Clicking on the transaction lets you view all the details, including the addresses of the sender and receiver, the amount sent, the timestamp, and the raw data.

You've successfully sent your first transaction! Congratulations! This is exactly how you'd send money on the Ethereum network. This is a simulation, but you should be proud of yourself.

### Conclusion

In this lesson, we learned how to set up a virtual testnet on Tenderly and send a transaction using MetaMask. We learned how to configure the virtual testnet and how to view the details of our transactions. This gives us the tools to test our smart contracts without risking real money. You are now ready to move on to the next lesson!
