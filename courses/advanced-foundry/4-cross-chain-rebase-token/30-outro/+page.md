## Introduction to Rebase Tokens on CCIP

We created our rebase token. It was an ERC20 and it was ownable with access control, all using OpenZeppelin. We created a way to grant the mint and burn role so that the vault and the token pools could mint and burn. We had a global interest rate for the smart contract, which could be decreased over time by the owner. 

And this was the interest rate that new minters would inherit. We created a way to get the principle balance of, which was the total amount of tokens which had actually been minted to the users. We created a mint function, which minted tokens to the users when they deposited into the vault or they sent their tokens cross-chain, and minted any accrued interest if relevant, and then set their interest rate to the current interest rate in the smart contract. 

We created a way to burn tokens, which also minted any accrued interest before burning those tokens. 

We created this funky balance of, which calculated the balance of the user based on any accumulated interest. We created ways to transfer tokens to other users and we learned how to calculate linear interest based on some interest rate. And this interest rate was specific to the user based on their time of minting. 

We then created an internal function to mint any accrued interest by calculating any interest that had accrued, and then minting that to the user. 

And then, some helpful getter functions. We created a vault for users to be able to deposit ETH and then gain rebase tokens of an equal amount, and then a way to redeem so that they could burn their rebase tokens and then be sent some ETH. 

We also implemented a receive function to be able to send rewards to this smart contract. We then enabled our token for CCIP by creating a token pool for our rebase token, which implemented lock or burn and release or mint to be able to burn tokens when sending them to another chain or mint tokens when we were receiving them from another chain. 

We created some scripts to deploy our token and token pools and vault, and set the CCIP admins. We then created a script to configure the pool to enable another chain to be able to send them cross-chain. 

And then, finally, we created a script to send our tokens cross-chain by creating a CCIP message and then calling CCIP send on the router. We created some fuzz tests for our rebase token and we created folk tests for our cross-chain rebase token, using CCIP local, and learning about create select fork and create fork to create fork tests on Sepolia and Arbitrum Sepolia.

Finally, we deployed our smart contracts to Sepolia and zkSync Sepolia, did all of the CCIP configuration, and then sent our tokens cross-chain. And we use the CCIP explorer to be able to see that cross-chain transfer, and it was all successful. So there, we have learned so so much in this section so you should be very very proud of yourselves for how much you have accomplished. 

If you have any questions or anything doesn�t make any sense, then please head to the discussions tab of the GitHub repository of this course or join our Discord where you can chuck your questions in there and one of the Cypher Team will be happy to help you. So, give yourselves a massive pat on the back, go get yourself an ice cream, go get yourself a hot cross bun and I will see you or Patrick will see you very shortly. 
