---
title: Boss Bridge Diagram
---



---

# Understanding Bridges in Ethereum and ZK Sync with Audit Data

Hello, everyone! If you've been scrolling through the audit data section of our Git repo, you might have noticed a sketch of the L1-L2 Bridge structure used for transactions, meant to illustrate contract creation and token execution. Let's go through it together!

## The Bridge Structure

![](https://cdn.videotap.com/rIxjCdQQCX2uJutT8w6U-12.43.png)

As you can see from the image, on the left of this dotted line, we have contracts on the Layer One (L1), while on the right side you can see the contracts yet to be built -- for now, they are only imaginary. They will exist in the future on Layer Two (L2).

The L1 is where we focus most of our attention. Why? Because this is where we have the Tokenfactory.sol - a pivotal contract whose sole function is to deploy L1 tokens.

### The Role of the Tokenfactory

The `tokenfactory.sol` is a simple and minimal contract. It's ownable, comes with mappings, and you'll notice it has just one function - `deployToken`. This function deploys a new ERC20 token contract, accepting the contract bytecode as input.

```js
function deployToken(bytes memory bytecode) public onlyOwner returns (address){
    return _deploy(bytecode);
    }
```

Though it is noteworthy that deploying any contract can be hazardous, we'll assume that the `tokenfactory.sol` will correctly hold a copy of the L1 token contract bytecode and not any malicious ERC20.

> - _"We should note that you can potentially deploy anything with `deployToken()`, which isn't ideal."_

Yes, as unsettling as it might sound, this token factory could technically deploy any contract. But bear in mind, this is an accepted caveat that was already addressed in the known issues section of the documentation. We will not dwell much on this, as it is within the scope of the project, and any other issue arising would fall out of scope.

### L1 Token - The Bridge

Moving on, we have the `L1Token.sol`. This is a very minimal L1 token with a max supply named Boss Bridge Token (BBT). Its sole purpose is to journey between the L1 and the L2. For instance, your L1 could be something like ETH, and the L2 might be ZKSync, or vice-versa.

![](https://cdn.videotap.com/j1ojbfHNdYgSRmp6YI6u-111.91.png)

It is important to note that L1 entities will be present on both Ethereum and ZKSync irrespective of the labeling.

Then we have the main contract known as `L1BossBridge.sol`, responsible for facilitating the core operations of the system.

### L1BossBridge - The Main Contract

The `L1BossBridge.sol` contract has a substantial role and a few capabilities. It can pause and unpause, illustrating some centralized power. Most crucially, it permits users to deposit tokens to L2 and withdraw tokens from the L2 back to the L1.

```js
function sendToL2(address _l2Delegate, address _token, uint256 _amount, uint256 _l2Gas, bytes calldata _data) external whenNotPaused returns (bytes memory){
    /* (...rest of code...)*/
}
```

The `sendToL2()` function deposits token to L2. Once tokens are sent, they are locked into `L1Vault.sol`. This vault is relatively simple and doesn't really do much other than holding onto the L1 tokens approved by the Boss Bridge.

### How Tokens Travel Between Layers

When the Boss Bridge signals, the vault releases the tokens. This mechanism allows tokens to be sent from an L1 to an L2. In practice, if we send 10 tokens into the vault from the L1, these 10 tokens locked into the L1 vault aren't directly transferred to the L2.

Instead, they are locked in another vault on the L2 side, triggering the system to release an equivalent number of tokens (in this case, 10) on the L2. This process of locking and releasing is observed and controlled by a centralized off-chain service.

To keep this a touch simpler and less technical, bridges usually work this way. You don't transmit tokens directly over the L1. Instead, you lock them into a vault, and the L2 produces an identical version of the token for you to use.

The final piece of this process involves tokens on L2 being relocked into the L2 vault. These Signers, the centralized units noteworthy for their crucial role, will approve the tokens to be unlocked on L1 again.

```js
function unlockL1(address _l2Delegate, address _token, uint256 _amount, bytes calldata _data) external whenNotPaused returns (bytes memory){
    /* (...rest of code...)*/
    }
```

### The Key Role of Signers

So these Signers are important because they see who's depositing to either layer and decide when to unlock or relock tokens. As valuable as this function is, it is also an embedded known issue with the protocol due to its centralized nature.

Once a token in L1 gets locked in the vault, it's liberated to roam in L2. Reversibly, when you lock it back into the L2 vault, Signers get a signal, and the tokens from L1 vault are released.

I hope this makes sense. I hope this helps you understand how the bridge between layers work. If you have any further questions, feel free to drop a comment, and I'll be happy to help!
