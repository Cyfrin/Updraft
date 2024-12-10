## NFTs: Verifying Metamask Transactions 

We're going to learn how to verify transactions in Metamask and this is so powerful so that you don't accidentally sign transactions that you don't want to sign. So you don't accidentally sign transactions that are malicious. This is how you can make sure that the call data that you get in your Metamask is actually what you expect. 

This is going to be a little excerpt from the Foundry/Solidity of Sifon Updraft. So there might be references to Foundry or Solidity but it's all basically the same. So let's go ahead, let's follow along here and learn how to verify transactions in Metamask. 

We can finally go back to what we were talking about with Metamask and that decoding the transaction data and all this weird stuff. If we come to a contract address, and this is WETH. This is a contract that wraps native ETH and turns it into an ERC20 token. But, if we come to a contract, right, we hit "write contract", let's connect to web3. Sure. You don't have to actually do this, just feel free to follow along with me. We're going to open up our Metamask. Let's go to Sepolia here. We're going to connect here. Okay, cool. 

And, we wanted to call "transferFrom", right? And let's just add some stuff here. Let's do source address and you know, this. This is probably won't go through, cuz I don't have any WETH right now. But let's just hit, right, "Write". This transactions Metamask is probably going to be like, "Hey, this is going to fail." Whatever. Yeah, sure, whatever. But, when we get a Metamask transaction that pops up, if we scroll over to the hex, we scroll down. We can now actually start to understand what is going on here. 

And, this is what we always want to make sure is actually correct when we're working with our Metamask and when we're dealing with all of this. So, what we can do is we can actually copy this whole thing and pull up our terminal here. I'm just going to make this nice and big here. What we can do is we can do "cast --help". We hit "cast --help" and we scroll all the way up. There's a command in here called "calldata-to-code". To code ABI encoded input data. So, if we do 
```bash
cast --calldata-decode
```
we can see we need to pass in a sig and the call data. 

So, luckily, for this transaction, our Metamask was smart enough to know that we're calling the "transferFrom" function. But sometimes, it's actually not going to be smart enough to figure this out. So, that's where we are going to need to match what we expect this to be calling. To what it's actually calling, right? So first off, we are expecting this to be calling the "transferFrom" function. So, I can grab this function selector, which we just learned. Come back here. I can do 
```bash
cast sig
```
I'll pass pass in here "transferFrom" the whole function signature, which what? It takes an address, address, and a uint256. So we'll do address, address, uint256. 

And, we'll see that this is what the function selector should be. So, I can say, "Okay, great. The two of these match". This indeed is calling the function selector that I wanted to call. Okay, awesome. If it doesn't match, what can happen sometimes, again we can go to something like the Sam CZ Sun signature database or openchain.xyz/signatures. Paste this in, hit search. And we can see that there's actually two different functions that have the same signature. One is "transferFrom" and one is "gasprice_bit_ether" with an int 128. 

So, what's interesting here is you can't have a function with the same function selector. So, if I actually went into Remix/solidity.org, let's actually create a new contract called conflicting.sol. Right. And we'll do a little a little zoom in here. 
```solidity
SPDX-License-Identifier: MIT contract Conflicting {
  function transferFrom(address, uint256, address) public {
    // hello, uint256  sup
  }
  function gasprice_bit_ether(int128) public {
    // sup
  }
}
```
And I try to compile this. Guess what's going to happen? Compile. 

No, let's pragma solidity 0.8.18.  This should be an address too. And now I try to compile. We scroll down, it'll say function signature hash collision for "gasprice_bit_ether" (int128). You can't have a contract in Solidity where two functions have the same function selector. 

So, in any case, we could be calling one of these two functions on our. This is where it's important to actually go through the contract code and say, "Hmm, there could be a couple different function selectors here. Let's make sure it's the one that we expect", right? So, in any case, so this is calling this "transferFrom" function. 

If this contract has a gas bit "gasprice_bit_ether", it might be calling that. But, in any case, we know, so we could go through the code, right? We go through "transferFrom". Okay, great. There's a "transferFrom" function. That is indeed what we want to call. The function selector is working. Perfect. Okay. 

So, now that we've verified the function selector, we should also verify the rest of this stuff. So, now that we know what the function selector is and we know what the function signature is, we can take this whole hex here and go back into our terminal and use that "calldata-to-code". So we can say 
```bash
cast --calldata-decode
```
and we can see what it what we need. We need the sig and the call data. So, I'll hit up, the sig is going to be "transferFrom" and it takes an address, an address, and a uint256, right? We can just double check that. Address, address, uint256. Sure does. 

And, we can paste in that call data and hit enter. And we can see what this call data stuff is using for input parameters to that function. So, it's our address, our address, and then 1,000. And then if that's what we expected, we'll maybe reject this for now. Go back to, right. And, that and if that's what we wanted to call on this function, we would go ahead and put this through. 

This is especially important when we're using front ends, like, for example, if I wanted to use Uniswap, right? Let's go ahead and connect here, to Metamask. Yep, connect. Looks good. Go away. Go to, let's say if I was on ETH mainnet and I wanted to swap ETH for, so so I'm going to test this here, so obviously nothing's showing up, but when I hit swap, if I was on a real network with real money, what I want to do then is do that same process of going through and checking to make sure that the transaction that it's sending is actually the one that I wanted to be sending, right? 

So, if we want to be absolutely sure of what our transactions are doing, we can first check the address. We can take these exact steps to say I know exactly what transaction, I know exactly what function my transaction is calling. So, we check the address to make sure that the contract is what we expected to be. And then, we can read the function of that contract that we want. We check the function selector that we're using, so that it, it, so that we know that it is indeed the function that we're calling. And, then we decode the call data to check the parameters that we're sending. 

So, this is how we can actually make sure our wallets are doing what we expect them to do. 
