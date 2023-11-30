---
title: Create Subscription UI
---

_Follow along with this lesson and watch the video below:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/WvxP4Lc2RBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

One of the crucial aspects of developing on the Ethereum Blockchain is to harness the power of front-end subscriptions. In the course of this guide, we'll take you through creating and funding a subscription, even on the testnet.

This might entail a considerable waiting time, courtesy of the testnets. However, we'll make the wait worth your while by diving deep into each step until you achieve automatic link token funding.

## Creating a Subscription

Whether you're a newbie or a seasoned coder, running transactions in the front end can be a rewarding and exciting task. Here’s how I go about it:

```markdown
Approve transaction > Calling Create Subscription > Await creation > View transaction
```

When you complete this transaction, you can then create a subscription with a unique ID. This ID becomes handy when you're about to add to your helper config or run your script.

Often you'd remark:

<img src="/foundry-lottery/23-subscription-ui/subs1.png" style="width: 100%; height: auto;">

## Funding Your Subscription

Now that you have your subscription, it’s time to get some Link tokens under your belt! Here's how you can do it:

1. Initiate **Actions** &gt; **Fund Subscription**.
2. Ensure you have the Link in your wallet. If not, head over to the Faucets Chain Link.
3. Select the number of links you'd like to acquire, I recommend 20 test links for a start.
4. Confirm you're not a bot and input your address.
5. Send the request and wait for the popup notification confirming your request.

<img src="/foundry-lottery/23-subscription-ui/subs2.png" style="width: 100%; height: auto;">

Once you've covered these steps, you'll receive the tokens in your wallet. But remember, certain tokens like ERC20 and ERC677 don't automatically show in your MetaMask wallet.

<img src="/foundry-lottery/23-subscription-ui/subs3.png" style="width: 100%; height: auto;">

## Adding Tokens to MetaMask

After refreshing your UI, you should see your active subscription. However, to see your tokens, you need to add them to your MetaMask. You can do this in a few steps:

1. Navigate to **Docs chain link &gt; Get Started &gt; Link Token Contracts &gt; Sepolia Testnet.**
2. Copy the address or click **Add to Wallet** to instruct your MetaMask to import these tokens.
3. Hit **Import Tokens** &gt; **Paste address** &gt; **Add custom tokens** &gt; **Import tokens**.

<img src="/foundry-lottery/23-subscription-ui/subs4.png" style="width: 100%; height: auto;">

See how simply you added Sepolia ETH and Abraham Lincoln? Now you have your tokens imported to MetaMask and are ready to fund your subscription.

## Transferring Your Tokens

With your loaded MetaMask wallet, you can transfer funds to your subscription. Here’s how you can do it:

1. Initiate **Actions** &gt; **Fund Subscription**.
2. Specify the numbers of links you want to transfer.
3. Confirm your transaction.

<img src="/foundry-lottery/23-subscription-ui/subs5.png" style="width: 100%; height: auto;">

Interesting to note here is that the function prompted in this process is not on your VR app but on the Link Token contract. We're actually transferring tokens to a subscriptions contract and using the 'Transfer and Call' function on our contract to do so.

## Conclusion

While this guide didn’t actually call the function, it's imperative to highlight that a balance of zero is absolutely alright. In fact, we'll cover adding Link to your ID in Solidity in the next lessons. Until then, remember:

<img src="/foundry-lottery/23-subscription-ui/subs6.png" style="width: 100%; height: auto;">

Keep experimenting, keep learning!
