---
title: Introduction
---

*Follow along the course with this video.*

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ghmze8sh34M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


Hello everyone, I’m glad to have you back with us for Lesson 4 in our Web3 Development series. This time we’re diving headfirst into **FundMe.sol**, our very own decentralized crowdfunding contract.

## Breaking Down The Contracts

In this lesson, we'll be creating one main contract - **FundMe.sol**. However, we'll also use another file called **PriceConverter.sol** which we will discuss later.

<img src="/solidity/remix/lesson-4/introduction/intro-fundme1.png" style="width: 100%; height: auto;">

Our **FundMe contract** is a perfect example of a crowdfunded project. Think of it as your very own decentralized `Kickstarter`, where users can send any native blockchain cryptocurrency. It allows the owner of the contract to withdraw all the funds collected for their new project. It is designed so that it can be deployed on a **testnet**. 


<img src="/solidity/remix/lesson-4/introduction/intro-fundme2.png" style="width: 100%; height: auto;">


Once deployed, you will see a set of buttons along with a new **red button** named **Fund**. The red button is a giveaway that the function is payable where you can send native Ethereum, Polygon, Avalanche, or any other native blockchain currency.


**Remember**: Fund function is payable. You can send native Ethereum, Polygon, Avalanche, or any other native blockchain currency.

To transfer funds, navigate to the **value section** of the contract user interface then hit **'Fund'**. Following this, your connected wallet (e.g., Metamask) will open for you to confirm the transaction. During this transaction, the contract balance in the functional section will show zero until the fund transfer process completes.

Once the transaction has completed, the contract balance will update to display the transferred amount. The contract owner can then withdraw the funds.

### Practically Speaking....

We can go through the process using 0.1 ether as an example. After input the amount to be sent, and hit the `fund` button, confirm the transaction using my connected wallet (in this case, MetaMask), and the balance of the contract will show as zero. After a while, once the transaction has been completed, we will see a balance of 0.1 ETH appearing on Etherscan and Remix. The slight delay merely reflects transaction processing times.

Following this, we can give permission to the contract owner to withdraw the funds. Since in this case, we are also the owner of the contract, the balance will be transferred back into our account. The balance can also be returned to MetaMask if kept open for long enough. 
 
## Wrapping Up 

And that's it! Once you complete this section, you would have grasped most of the fundamentals of working with Solidity! So keep watching this lesson chapters and get learn how to implement this `FundMe` contract yourself step by step.

Be sure to write down any questions you may have and direct them towards our GitHub discussions thread.

Ready to get started? Let's jump back in!