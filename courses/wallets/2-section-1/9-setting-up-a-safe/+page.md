---
title: Setting Up A Safe
---

**Follow along with this video:**

---

In this lesson, we will walk through the process of setting up a multi-sig wallet step by step. Multi-sig wallets are excellent for securely storing large amounts of money, controlling DAOs, or managing funds for large organizations.

For developers, if you have an ownership role or permissions in your smart contract, it should never be an externally owned account, a browser wallet, or a hardware wallet. It should always be a multi-sig wallet.

### Steps to Create a Safe Wallet

1. **Visit the Safe Official Website**: Follow this [link](https://app.safe.global/welcome) to visit the Safe official website. You should see a page like this:

   ![landingPage](/wallets/8-setting-up-safe/landingPage.png)

2. **Select the Blockchain Network**: Choose the chain on which you want to deploy the Safe smart contract wallet. For this example, we'll use the Ethereum Sepolia test net.

   ![walletConnectModal](/wallets/8-setting-up-safe/walletConnectModal.png)

3. **Connect Your Wallet**: Select the wallet type you want to use to connect to the Safe website.

   ![createAccount](/wallets/8-setting-up-safe/createAccount.png)

4. **Enter Safe Name**: After connecting your wallet, enter the name of your Safe.

   ![addSigners](/wallets/8-setting-up-safe/addSigners.png)

5. **Configure Signers**: Ideally, set up a 2-of-3 Safe smart contract wallet. For simplicity, we'll set up a 1-of-1 Safe smart contract wallet. Configure the required threshold for transaction approval.

6. **Estimate Gas Fees**: The next page will estimate the gas fee for creating your Safe smart contract wallet. You can either pay it yourself or use Safe's sponsorship for testnets.

   ![gasEstimation](/wallets/8-setting-up-safe/gasEstimation.png)

7. **Deploy Safe Wallet**: Once the transaction is sent, you will see a page showing the address where your Safe smart contract is deployed.

   ![transactionState](/wallets/8-setting-up-safe/transactionState.png)

8. **Start Using Safe**: Click on the `Start using Safe {Wallet}` button to access the user interface of your Safe smart contract wallet.

   ![UserUi](/wallets/8-setting-up-safe/UserUi.jpeg)

### Viewing and Verifying Your Safe Wallet

To view your wallet on Etherscan, click on the icon circled in the image below:

   ![viewWalletIcon](/wallets/8-setting-up-safe/viewWalletIcon.png)

This will take you to the Etherscan page of your deployed Safe smart contract wallet:

   ![smartContractEtherscanPage](/wallets/8-setting-up-safe/smartContractEtherscanPage.png)

Click on the `contract` tab to view the Gnosis Safe Proxy contract:

   ![GnosisSafeProxy](/wallets/8-setting-up-safe/GnosisSafeProxy.png)

To verify the smart contract code, compare it with the source code in the Gnosis Safe GitHub repository. Click on the link circled below to get the deployed bytecode of the contract:

   ![sourceCodeContract](/wallets/8-setting-up-safe/sourceCodeContract.png)

### Using the Safe Wallet User Interface

The user interface offers various features. You can connect to applications listed on the UI or use the `wallet-connect` feature for apps not listed.

   ![apps](/wallets/8-setting-up-safe/apps.png)

To connect to an app like Uniswap via `wallet-connect`, follow these steps:

1. Visit the Uniswap website and select `wallet-connect` instead of MetaMask.
2. Copy the connection link from the modal:

   ![walletConnectModal](/wallets/8-setting-up-safe/walletConnectModal.png)

3. Paste the link into the Safe wallet UI:

   ![safeWalletConnect](/wallets/8-setting-up-safe/safeWalletConnect.png)

4. Approve the connection:

   ![safeWalletConnectModal](/wallets/8-setting-up-safe/safeWalletConnectModal.png)

Once connected, your Safe wallet will be linked to Uniswap or any other app you choose.

### Security Recommendations

- **Use Hardware Wallets as Signers**: For added security, use hardware wallets as signers instead of browser wallets. They provide better protection against unauthorized access.

Now you have set up a Safe smart contract wallet. For those with mainnet funds, it is highly recommended to use a smart contract wallet. Congratulations on completing this setup!

Take a moment to verify all transactions and ensure everything is set up correctly. When dealing with significant amounts of money, double-checking every detail is crucial. Enjoy the enhanced security and functionality of your new multi-sig wallet.
