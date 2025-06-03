# Testnet Funds

In this course, we will use Chainlink's services in smart contracts. We will deploy and interact with these contracts on testnets. Usually, this will be Sepolia, but in some instances, we will also use Base Sepolia.

## Using a faucet

In the [Blockchain Basics course](https://updraft.cyfrin.io/courses/blockchain-basics), we covered using a faucet to get testnet Sepolia ETH to pay gas fees. Let's go over this again quickly to obtain LINK tokens so that you are all set for the rest of this course.

### Testnet LINK

In addition to native tokens, we will also need to obtain some testnet LINK. LINK is the token used by Chainlink to pay the service providers when you are using the Chainlink services. 

Let's walk through how to get some testnet LINK, how to add LINK to MetaMask and how to send your tokens to another address (for example, if you wanted to fund a smart contract with LINK–spoiler alert, we will be doing this!)

#### Adding LINK to Metamask

- Head to the [Chainlink documentation](https://docs.chain.link/resources/link-token-contracts) and scroll down to the chain you want to use LINK on. E.g. [Sepolia Testnet](https://docs.chain.link/resources/link-token-contracts#sepolia-testnet)

- Click the **Add to wallet** button to import the LINK token to NetaMask. Note that this will only add the token for that secific network. This will need to be repeated for all networks you intend to use LINK tokens.

![add-to-wallet](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/add-to-wallet.png)

- Click **Add token** to add the token to your MetaMask

![add-token](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/add-token.png)

#### Using a LINK faucet

To obtain testnet LINK, head to the [Chainlink Faucet](https://faucets.chain.link/) page. Here, you will find a list of all supported networks.

Click the **Link** button at the top right, select the network(s) you want to get LINK on and click **Continue. "

![select-networks-link](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/select-networks-link.png)

- Click **Get tokens** and click **Confirm** in MetaMask to sign the transaction.
- Once the transaction has confirmed, you can see the LINK balance in your wallet.

![link-sent](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/link-sent.png)
![link-metamask](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/link-metamask.png)

### Adding a token to MetaMask

LINK was easy to add to MetaMask since Chainlink included that cheeky **Add to wallet** button. But how do we add other tokens, such as USDC to MetaMask?

- Find the token address. For USDC, for example, we can head to the [Circle documentation](https://developers.circle.com/stablecoins/usdc-on-test-networks) to find the address of the USDC contract on different chains. Copy the address for the USDC token on the chain you are working on.

- Open MetaMask and check you are on the same chain as the token address you just copied by clicking on the network button on the top left corner in MetMask

![select-a-network](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/select-a-network.png)

- Click the **Tokens** tab, click the vertical three dots button, and then **Import tokens**  

![tokenb-tab](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/token-tab.png)

- Enter the token contract address. MetaMask will automatically detect your token and its related information if it follows the ERC-20 standard.

- Check the correct information (Address, Token Symbol, and Decimals).

![import-usdc](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/import-usdc.png)

- Click **Next** to confirm the information. Click **Import** to import your token to MetaMask. This lets you view your balance and send tokens to others using the MetaMask UI.

### Sending tokens to another address

To send tokens to another address:

- Click on the **Tokens** tab, then click the token you want to send (you need to have imported it already), e.g., the LINK token.

![mm-link-token](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/mm-link-token.png)

- Click the **Send** button.

![send-link](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/send-link.png)

- Paste the address you want to send the tokens to.

![send-to](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/send-to.png)

- Enter the amount and then click **Next**

![send-amount](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/send-amount.png)

- To sign the transaction, click **Confirm**. This transaction will now be sent and the tokens will be transferred to the address you specified. 

![confirm-transaction](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/confirm-transaction.png)
