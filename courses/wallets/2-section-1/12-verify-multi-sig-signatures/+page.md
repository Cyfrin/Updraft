## Introduction to Multi-Sig Verification

The Radiant protocol was hacked for $50M due to not verifying their safe multi-sig signatures. 

Multi-sig wallets are an important and fantastic part of any protocol, but you need to be able to know how to actually verify that what you're signing is what you want to sign. This is especially true for those working in security, development, or any position where you are responsible for signing transactions on the blockchain. In this lesson, we'll show you two ways to verify your multi-sig signatures and transactions.

### Prerequisites

To complete this lesson, you will need:

* A safe multi-sig setup
* A hardware or software wallet

### Agenda

In this lesson, we will learn how to verify multi-sig signatures and transactions using these methods:

1. Verify signatures using the Safe API
2. Verify signatures manually
3. Verify multi-sig transaction execution
4. Understand security trade-offs
5. Wallet improvement ideas

### Step 1: Download the “safe_hashes” tool

The first thing that we need to get all this started is we need to go to the Cyfrin safe-tx-hashes Github repo to download the tool that's going to help us encode and decode the data to verify our transactions. This was originally based off of the work from this repo: 

```bash
github.com/pcaversaccio/safe-tx-hashes-util
```

If we scroll down in here, we can go to the installation, and you can either build from source or grab the curl. So, I'm going to copy the curl and open up my terminal to install the tool and paste it.

```bash
curl -L https://raw.githubusercontent.com/cyfrin/safe-tx-hashes/main/install.sh | bash
```

### Step 2: Verify an uninitialized multi-sig transaction signature

Now that we have the tool installed, we can come back to our Safe and initialize a transaction.  A very common transaction that we might want to send, for example, is to take an ERC20 token, like the USDC token, and we want to approve a DeFi protocol, for example, the Uniswap V2 router.

```bash
etherscan.io
```

You could, of course, initialize this from the UI using WalletConnect, or we could even just go straight to the transaction builder, and we could do this through here. This will import an ABI. There is a little bit of risk here, but approve transactions are pretty small, so we should be able to very easily see what's going on here. 

So, I'm going to say okay, I want to take the USDC token address, and it's going to import the ABI. We could put our own ABI here as well. 

And what we want to do is we want to say, okay, we want to approve the Uniswap V2 router to do, you know, 10 USDC. So, I'm going to go ahead, I'm going to select add new transaction and create batch.  And this is the only transaction that we're going to send, meaning this is the only batch we're going to send. I'll hit send batch.  And the Safe UI is actually pretty clever. It says, "Hey, it looks like you're trying to allow access for tokens. Here's how much and here is the spender." Which is great. It gives us the advanced details, which are the ones that we actually care about, which are right here, and a whole bunch of other stuff.  Now, the important bit for us, though, is obviously signing this. So, this is an uninitialized transaction. This transaction doesn't exist anywhere. This transaction is not in the database. The first way we're going to verify the signatures here is directly using exclusively the hardware wallet. We're going to learn later how to also use a Metamask wallet to help with the verification. 

So, I'm going to go ahead and connect.  And once we get it unlocked, we can actually now connect here.  Now that we're connected with Trezor, we can go ahead and sign this transaction. 

Now, the main thing that we want to trust is our hardware wallet. We don't want to trust the Safe UI. We don't want to trust either scan. We only trust what's on our hardware wallets. So, keep that in mind as we go along here.

So, once we hit that, I get a little pop-up. I'm going to say go ahead and allow here, and my Trezor says, "Okay, we're going to sign a transaction."  Now, looking at this address in here, this is indeed my address with my Trezor, and this is Trezor telling me, "Here is who's going to be signing." And I say great. I would like to continue. And here's the most important piece.  It gives us this confirmation message.  And if you're working with a wallet that doesn't give you this, throw that wallet away immediately because this is the most important thing that we need to work with here. What this is, this is the hash of the message that we're going to sign, and this is the most important thing that we need to verify before actually hashing it.

So, if we pop back over to our tool here in the Github repo, there is usage for not initialized transactions. So, what we need to do is we need to verify that this hash matches what we're expecting to sign. And remember, what are we expecting to sign? Well, we're approving 10 USDC on the Uniswap router.

The first thing that we can do is we can trust the Safe transaction service API with this command.  And then, we'll also show you a way to do it without this command.  So, we can scroll down in here to the section safe message hashes.

Now, what this script is going to do is it's going to call the Safe servers and basically ask for the data inside of this transaction so that we can verify it without having to manually input the data ourselves. This is relatively safe because if the Safe UI got attacked, whatever they give us will obviously not match what's on our hardware wallet. There is a bit of a trust assumption here on the safe transaction API. If the safe API goes down, well, we get in trouble. So, to get all the data pre-populated from the Safe API itself, we'll pull up our terminal, and we'll run something like:

```bash
safe_hashes --network sepolia --address 0x86D46EcD553d25da0E3b96A9a1B442ac72fa9e9F --nonce 7 
```

Since this transaction is uninitialized, we get "No transaction is available for this nonce!" so we have to add --untrusted in here because this is a quote-on-quote untrusted transaction because nobody's signed it yet.

```bash
safe_hashes --network sepolia --address 0x86D46EcD553d25da0E3b96A9a1B442ac72fa9e9F --nonce 7 
```

It exists right here, but it's not a signed transaction. But, at the bottom here, we see what's actually important. We see this Safe transaction hash, and this is what we want to verify is on our hardware wallet. And if we go over to the hardware wallet, we want to compare this hex to what we see on the screen here with our Safe transaction hash. Now, you can still mostly trust the Safe UI because if a hacker were to manipulate the data, the hash would be different.  This is also why on screen, we also want to look at the parameters.  We want to look at the calldata, etc.  So, this is indeed the address we put in. This is indeed the value we put on, so the parameters here look correct. If it didn't have an ABI, we could do the raw calldata which we'll do in a second. So, we look at these two, we compare, and they look good to us.

Now, this comparing process is obviously kind of annoying because there's no way to like copy-paste this and check it on your screen. So, this brings me to one of my first improvement asks for wallets. I wish there was a way for me to maybe grab a base 64 QR code or something off of the wallet so I could easily copy-paste it onto my machine so I could compare more directly. Because right now, I kind of have to eyeball spot check. Now, some wallets make this a little bit easier, and we'll see an example of that in the future.

So, after I manually confirm that this signing message is exactly what I expect, I can now on my Trezor I can hold to confirm or do whatever approval that is required on your wallet. And then, back on screen, we'll see we have indeed created a transaction that we have signed in our Safe wallet. 

### Step 3: Verify an initialized multi-sig transaction using the Safe API

What if we were extra paranoid and we didn't want to use the Safe API? Well, in that case, instead of passing this in, we can just get rid of the untrusted and instead, we would pass in the raw hex data of what we expect this transaction to be. We would need the exact hex calldata which we can get using cast calldata, which requires a signature and then any data. So, we're going to say cast calldata, and we're going to call the approved function. We're going to take an address and a uint256. So, we'll say address, uint256 like this. And who are we approving? Well, we're approving the Uniswap V2 router.  So, we'll paste that in here, and for ten, and then we hit enter.  And this is the calldata that we would expect.  Now, with this calldata here, I can go back up to my safe hashes command. I'll get rid of the untrusted. I'll do --data, paste this in here. I'll do --offline to say we want to stay offline here. And then, I'll do --to, and give the two address, who's going to be the USDC coin address.  And I'm just going to copy the address right from the Safe UI.  If you don't trust the Safe UI, you can obviously go to Etherscan or the official Circle docs, paste that in here, hit enter, and now we get the exact same Safe transaction hash created for us, but instead, we did not use the Safe API.  Now, you'll notice it says "Skipping decoded data, since raw data was passed" we do not get the ABI here because we passed raw calldata ourselves, but we get the transaction hash. And so, once again, we can manually spot check, and this is indeed the same thing.

We could run something like:

```bash
safe_hashes --offline --data 0x095ea7b3000000000000000000000000fe2f653f6579de62aaf8b186e618887d03fa31260000000000000000000000000000000000000000000000000000000000000001 --address 0x86D46EcD553d25da0E3b96A9a1B442ac72fa9e9F --network sepolia --nonce 6 --to 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9
```

We can once again compare and contrast to our script. We can see that this does indeed match. So, we can feel confident to sign the message. 

### Optional: Metamask Connection

Maybe your HW wallet doesn't have a native integration, or you want the calldata verification ease of Metamask.  Make sure you understand the trust assumptions when doing this.  Using a Metamask (or other software wallet) is also how most hardware wallets are going to work with Ethereum L2s.

Now, for some wallets, like what we're showing here, the Keystone wallet, if we want to connect, we don't get an option for working with Keystone. So, what we can do instead is we can go into our Metamask wallet and just keep in mind this does put a dependency on Metamask.  However, we're always just going to trust what's on screen on our Keystone. For the Keystone wallet, I'm going to go ahead and select the little three dots, connect software wallet, select Metamask. It's going to give me this QR code. Then, I'm going to select, and then in my Metamask, I'm going to go to my accounts, add hardware account, add hardware account, QR-based.  Scroll down and hit continue, allow to use my camera, and I'm literally going to show this QR code to the screen.  It'll be blurry, and that's fine, and it'll pop up a list of wallets associated with this wallet.  Now, what's important to note is we are not exposing our private key.  We're simply just telling our Metamask what accounts are on our Keystone wallet. So, I'll select the wallet, I'll hit unlock, and now it says Keystone 1 and it is now in our Metamask, and you can see it as one of our wallets in the Metamask.  So, what we can do once it's in, we'll hit connect, we'll do Metamask now. I'm actually going to have to switch to the Ethereum network.  And now, same thing, we could execute, or we could sign a transaction here.

### Step 4: Verifying the transaction execution

So, this is great. Everyone has signed this, and we're ready to execute.  We have two of three here. All we have to do is execute now. The question is how do we verify this is now correct? Now, once I hit execute, this is where it gets a little tricky. But, if you've followed along with CyfrinUpdraft, you already know how to verify calldata when it comes to a basic transaction.

And if we look on our Trezor, we can see the calldata for this transaction.  Now, we do obviously want to make sure that this transaction that we're sending on our hardware wallet is actually what we want, right?  What's nice is we can see the top four bytes here. This is clearly the function selector for the execute transaction, for the hardware wallet, which is good. But, we obviously want to, you know, verify all this calldata, and on this specific wallet, that's kind of hard to do, right? Because this is kind of a massive, massive piece of calldata. There's a lot here for us to spot-check and read, and additionally, we're not exactly sure what this calldata should even look like. First of all, we should verify what this calldata should exactly look like.  We could do cast calldata decode or straight up calldata exec transaction, and then add all the parameters in here so that we could get the resulting calldata.  I even have this saved locally on my device so I can grab this very easily, because this is the function signature of the safe multi-sig.

```bash
cast calldata-decode "execTransaction(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,bytes)"
```

Now, that's obviously going to be kind of time-consuming and is really rough.  So, what we can do instead is we can one more time run our safe hashes script. But, now, we add this print mst for multi-sig transaction calldata. Hit enter, and we'll now see pretty much everything we saw before. We see the Safe transaction hash again, but now we additionally see the full transaction calldata as well. And we can still scroll up. We can see the parameters. We can make sure that the parameters still make sense, those indeed still make sense for a multi-sig transaction. And now, we can see this.  So, now, we can much more appropriately view all the calldata and match it back to what is seen from our script. 

We could run something like:

```bash
safe_hashes --network arbitrum --address 0x111CEEee040739fD91D29C34C33E6B3E112F2177 --nonce 234 --print-mst-calldata
```

Now, we can actually see, on our calldata here, we can see, for example, this does indeed match the function selector of the multi-sig transaction calldata from our script, and we can actually show all, and we can go through all the calldata and make sure it actually matches. Now, of course, this is kind of awful, manually verifying all this calldata, but we can have at least some assurance by checking the two, and the function selector because at the very least, this will be a transaction to our multi-sig safe.  And that, by itself, gives some assurance that we're not signing something malicious on our transaction. It's at least a function of our multi-sig.

However, this still isn't great. Back on our Ledger wallet, if at least we go to settings, we can actually turn on debug contract, which will give us a little bit more assurance of what we're doing. 

So, now, if we hit execute, this is a little better, but it's still rough. We can at least verify just the selector. Which, that's the function selector. We can approve that, and then we can actually manually go through each field of that exact transaction data, and manually confirm this as well. Go through and keep confirming.

Now, this is much better, but obviously, this is still very tedious, and we will very quickly run into security fatigue where it takes us, you know, 25 min to send a transaction. For these types of wallets, what you might still want to do is actually go ahead and connect it with your Metamask again. So, go ahead and add hardware wallet, for example, with Ledger. I'll go ahead and connect this. We'll continue. I'll connect here, I will unlock my account as well. And now back on my Safe wallet, instead of connecting through my Ledger wallet, I'll disconnect here, and I'll connect directly through Metamask. At least now, and let me switch to the away from the Keystone to the Ledger. At least now, when I hit execute, Metamask will at least pop up and give me that transaction data, so I can scroll down I can see the data. I can very clearly see everything very quickly. If I wanted to, I could even click the copy button, I could go to something like a new window, and then I could paste the calldata, and I could view the calldata, right here, and then I could compare this very easily with what my script gave me. So, I could just copy this, flip back over here, paste it in, and do a little command V, to check that these two are indeed the same. What we get from Metamask and what we get from our script. We're still trusting Metamask a little bit here, so it would still be better if we could do this directly on our device.  However, when you go to confirm this, you can at least confirm okay that the parameters look the same here that are what are in Metamask, that the hash looks good, etc, etc. And it's important to note that the last bit might be a little bit different because this is just all the signatures added up, and it doesn't really matter the order that these signatures are in.

### Wallet shout-out

Every wallet should "clear sign."

One last bit that's really nice, when it comes to your wallet choice, if we use something like Keystone, we can we still connect to Metamask, but we at least don't have to trust Metamask. So, what we can do, change to my Keystone here. What we can do is we can execute while my Keystone wallet is connected to my Metamask. And what I can do is, once again, I can review all this data in the Metamask. I can confirm, and everything. But, when I hit confirm here, with my Keystone, I can go ahead and click the little scan thing where I can scan this.  I can literally raise my device to scan the Metamask code, and this will send the transaction details to my Keystone wallet where I can see everything, such as the from, which should be this wallet, the two, which is the multi-sig, I can select the details, and I can see everything that I could see in the Metamask right in my hardware wallet here, without having to actually trust that the Metamask is being honest.  And even though we're interfacing with Metamask, we don't have to trust Metamask because we can verify what we're signing right on the device.  But, in any case, once you're happy, you can send the transaction with the knowledge that you're actually going to send the data that you want to send because you know how to verify these transactions.

### Recap

So, to recap: whenever you're signing a multi-sig transaction, make sure you verify the hash of the signature that you're signing. You can do this using the script that the Cyfrin team has built. Big shout-out to Pascal for being the initial creator of this script.  You can do it with our script by either trusting the Safe API, which is a little bit quicker, and you still don't have to trust it that much because if the data they send you is manipulated, the hash will be different, or you can say, "I'm just going to manually do this myself."  Use offline mode, and generate the message hash there as well. Then, once you have enough signatures, verify the execution of the transaction itself with the calldata.

### Dear Hardware Wallet Companies

Now, if you are a hardware wallet company, I have a couple of asks for you. Number one, you should all add clear signing, like what we saw with the Keystone wallet, which had clear signing so that I could directly see what was going on with my transaction, right in my hardware wallet without having to integrate with something like Metamask. Number two, it would be cool if we could export the calldata so that we could match it to the tools that we write. For example, maybe add a QR code that allows us to scan the QR code on our hardware wallet so we can import it into where we use our tools, and then make sure that it works the same there. That's also a little bit spooky to me, because scanning QR codes is very spooky. So, maybe there's something more clever that you can do. And if you do do a QR code, you should have it be like a base 64 encode so you could work in offline mode. Like, that would be even cooler. I digress. Additionally, it would be cool if you show the hash of the calldata, because that would be much easier to spot check than the entire calldata. So, that's another ask that I think might be very helpful here. Private key attacks are the number one attack vector from last year. And they're looking like they're going to be the number one attack vector for this year. Use this to say Safe.  And we'll see you next time. P P P. 
