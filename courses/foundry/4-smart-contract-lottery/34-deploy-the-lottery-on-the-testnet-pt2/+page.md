---
title: Deploy the lottery on the testnet pt.2

_Follow along with this video:_

---

### Deploying on Sepolia using Makefile

In the previous lesson, we created a Makefile that helped us deploy our contract on Anvil. We also used an if statement to check if our `deploy` target is followed by `Args="--network sepolia"`. We never tested it. Let's do that now!

Run the following command in your terminal:

`make deploy ARGS="--network sepolia"`

Everything should go smoothly, and your contract should be verified.

Let's interact with it using etherscan. Find your contract by searching your deployment address at https://sepolia.etherscan.io/. Click on the `Contract` button, which should have a green tick signifying that it's verified. Click on `Write Contract`. Click on `Connect to Web3`. Accept the warning, select Metamask, and select your testing account. Click on `enterRaffle` and put `0.01` ether there. Wait for your transaction to go through. Then, click on `Read Contract` and then click on `getNumberOfPlayers`. You should see a `1`. Which means we just entered our Raffle contract. GREAT!

Let's take care of the Automation side now. Go to [automation.chain.link](https://automation.chain.link/), log in with your test account using Metamask, then click on `Register new Upkeep`. Chose `Custom logic` and paste in your Sepolia Raffle contract address. Give it a nice name like `Start Draw`, give it a starting balance of 2 LINK, scroll down and click on `Register Upkeep`, sign the transaction, wait a bit, then sign the message, then wait a bit, then click on `View Upkeep`. 

**Reminder:** Everyone can call `performUpkeep` and it will work if all the conditions are met. But we don't want that to be the main way that function is called. We want to use the Chainlink Automation service to call it. 

On the `Start Draw` automation page, we will see that Chainlink already ran the `performUpKeep` function. Go to [https://vrf.chain.link/](https://vrf.chain.link/) and click on your subscription to see your `Pending` request. After some time, you will see its status update to `Success`. AMAZING! Let's go back to etherscan to check our raffle contract. Go to `Contract` > `Read Contract` click on `Connect to Web3` then click on `getRecentWinner`. You'll see that we indeed have a recent winner, which means our protocol worked flawlessly.

This time we chose to use Etherscan's interface to interact with our contract, but we could have done all this 100% using Foundry. You can use `cast call` to perform all the operations we did in `Read Contract`. We could have used `cast send` to perform everything we did in `Write contract`.

This will do for now! See you in the next lesson!