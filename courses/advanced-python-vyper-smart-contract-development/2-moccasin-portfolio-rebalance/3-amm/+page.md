## Introduction to AMMs

AMM stands for automated market maker. We will be introducing AMMs and how they work.

We know that an order book is what is used by centralized exchanges. Let's see what happens when we try to put an order book on the blockchain. 

For example, consider a traditional order book that exchanges ETH with USD. We have a buyer and a seller. The buyer will submit a price for how much they are willing to pay per ETH.  For example, let's say this buyer is willing to buy one ETH for $1,000 USD. The seller will submit a price for how much they are willing to sell their ETH for. For example, let's say this seller is willing to sell their ETH for a minimum of $1,010 per ETH. When the buyer and seller agree on the price, the buyer will pay, and the seller will sell their ETH. 

Now let's try to put this on the blockchain. For USD, we will be using the stablecoin DAI.

The first problem with putting an order book on chain is liquidity. For example, what if there are people willing to buy ETH, but no one is willing to sell their ETH?  This is the problem of liquidity. The opposite is also true. What if there are people willing to sell ETH, but no buyers?

Another problem we encounter is gas fees. We are putting all this information on chain, so the buyer will be submitting orders, updating the orders, and then canceling the orders, all of which costs transaction fees. The same goes for the seller, they will be submitting their price, updating their price, and canceling their price, all of which also costs transaction fees. So they will be burning a lot of ETH. 

So the two problems with putting an order book on chain are liquidity and gas fees.

An alternative approach to swap tokens on chain is through an AMM. Let's see how an AMM works.

An AMM is a smart contract that determines the exchange rates of the tokens based on the code that is inside the AMM. The most popular approach to determine this exchange rate is a mathematical equation. The two most well-known equations are called constant sum AMM and constant product AMM. I will explain those in another video. 

For this video, think of AMM as a smart contract that has some mathematical formulas inside. The smart contract determines the exchange rate of the tokens.

We know that with order books, we have buyers and sellers. For an AMM, we have two users: a trader and a liquidity provider. 

So, what is a liquidity provider? Let's start here. 

A liquidity provider is a user that deposits their tokens into the AMM. These tokens will be swapped by the trader. The exchange rate will be determined by the AMM.  Why would they want to deposit their tokens into the AMM contract? 

Well, it's because when they deposit their tokens, they will be collecting swap fees that are collected from the traders. Traders will swap tokens, a portion of it will be kept inside the AMM, and the liquidity provider will be able to collect them as fees. The amount of tokens they deposit into the contract may be different from the amount of tokens they will get back later when they decide to withdraw their tokens. This is because the AMM internally calculates the exchange rate. And, of course, the market moves, so the exchange rate when they deposited their liquidity may be different from the exchange rate when they remove their liquidity. 

Basically, the liquidity provider is saying that they're willing to buy and sell their tokens, and they want to collect swap fees. They're letting the AMM contract decide at what price the contract is going to sell the tokens and buy back the tokens. Then, we have a trader, which is simple to understand. They simply swap tokens.  For example, a trader might buy ETH from the AMM contract. They'll put in DAI, and then the AMM contract will calculate the exchange rate and then give them back ETH.

So now let's ask the question, does an AMM solve the two problems that we saw with our on chain order book, liquidity, and gas fees? Well, you can see that it solves the gas fee, since the trader is always swapping tokens with an AMM. It's not submitting a transaction to quote the price that they're willing to buy the tokens at. They simply say I want to buy some tokens, and the AMM will give them back tokens. And the same goes for the liquidity provider. In an order book, we have the sellers constantly updating the price that they're willing to sell at. Here, there is no seller. There's simply a liquidity provider that deposits their tokens, and they're basically saying they're willing to buy and sell their tokens at whatever price the AMM gives to the trader.

So, that's how it solves the gas problem, how about liquidity? Well, as long as there is a liquidity provider that's willing to provide their tokens, then the liquidity problem is solved. If there's a liquidity provider, any user can interact with the AMM at any time to swap their tokens. 
