## Optional Cross-Chain Message Success

We can see the status is now success. So we can see the source transaction, well the message ID first, the source transaction, and the destination transaction. This will be on Sepolia and then this will be on zkSync Sepolia. You can see that the tokens have transferred. 

So, if we head back over to our terminal, and we should have earlier copied the addresses of our tokens on zkSync and Sepolia. But, if I scroll up, then I can see the zkSync rebased token address. You could just search your terminal for it using command `f`, but I can do command `copy`. 

And then in my MetaMask, I'm going to head over to zkSync Sepolia Testnet. And then I'm going to head over to Tokens, and then click Import, paste in the contract address, and it has detected that it isn't RBT with the symbol and 18 decimals which is correct. And then I can you can see here. So, actually I'm not going to be able to see in the actual MetaMask window because I transferred too small of an amount because I didn't want to waste any Testnet tokens. But, we can actually see, I do have a balance of rebased tokens which is pretty cool. 

And we have successfully transferred tokens cross-chain which is absolutely massive, and we've been able to see the status of the cross-chain transfer using the CCIP explorer. So, we can see exactly how many tokens we sent, what the LINK fees were, who sent the tokens which was myself, and to myself, and what addresses these were to check that everything was the correct expected addresses. 

We can see my send nonce. So, this is how many cross-chain messages I have sent. The gas limit which was zero because we didn't have a CCIP receive function implemented. And this is just really, really cool that we were able to do this. So, now you know how to make a rebased token, and you know how to send those rebased tokens cross-chain by enabling your token for CCIP so that users can come in and bridge their tokens to other chains. We could now go in and enable Arbitrum or Optimism or Scroll, or any of the lanes that CCIP allows. 

So we can head into CCIP and there is the CCIP directory. We can head into the CCIP directory, and see all of the chains which are enabled and then if we click into one of them. So, if we click into zkSync, then we'll be able to see all of the inbound and outbound lanes which are allowed. 

So, for instance, I can bridge to Arbitrum and Ethereum from zkSync, and then I can receive tokens also from Arbitrum and Ethereum on zkSync which is pretty awesome. So, you've now finished this project, so I'm going to do one last lesson where we just do a roundup of everything we have learned in this project because it has been a lot. So, I will see you in a second to do that. But massive well done for completing this project. 
