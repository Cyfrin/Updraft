---
title: Weak Randomness - Multiple Issues
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Breaking Down Blockchain Randomness: Security and Potential Pitfalls

Today, we're going to delve into the intricacies of managing certain aspects of blockchain programming. Specifically, we will be discussing these three elements: Message Sender, Blocked ProgramDo, and Blocked Timestamp. These are key aspects when dealing with randomness in blockchain, which we will dissect, explaining their functionalities and potential security issues.

Let's get started.

## Deconstructing the Blockchain Components

### 1. Block Timestamp

To understand the concept of Block Timestamp, refer to the repository's diagrams showcased [here](URL).

![](https://cdn.videotap.com/96gVghjLA5xt6vAGyZ3W-23.74.png)A transaction on the blockchain has its timestamp that miners can manipulate. If a miner doesn't agree with the timestamp, they might hold onto the transaction until a more favourable timestamp occurs.

> When dealing with Validator node issues, remember never to trust miners!

A miner can also reject a transaction if the timestamp doesn't favour their needs. Manipulating the timestamp has become more challenging after the merge; yet, there are ways to tamper.

On non-Ethereum blockchain systems, miners sometimes have the power to adjust block timestamps by a few seconds. It might not seem much, but in the agile world of blockchain, these minor adjustments might lead to contract violations or aid in attaining a favourable random number.

### 2. Blocked Prevrando

A new Solidity component, **Blocked Prevrando**, replaced the block difficulty post the merge. It is used to randomly pick validators under the new system.

For more in-depth information, refer to EIP (Ethereum Improvement Proposal) [EIP 4399](URL).

![](https://cdn.videotap.com/fhhVXSh7UyBBcLkTyLNK-63.32.png)However, it also bears security considerations. First, it's biased since it allows one bit of influence power per slot. A tweak in the security component can cause a shift from an originally intended number. Moreover, it opens doors to predictability since it originates from a previous random number.

Consequently, caution is of utmost importance while using **Prevrando** if it can't be avoided.

\\n\\n```soliditypragma solidity ^0.5.0;

contract example {uint public myNum = uint(block.prev_rando);

```
function getPrevRando() public view returns (uint) {return myNum;}
```

}

````\n\n
### 3. Message SenderOur last element, **Message Sender**, can also be manipulated by the caller. If the randomness is generated from a field controlled by the caller, they can manipulate the field to get their favoured random number.A simple example can be hashing the Message Sender, where a caller can mine for addresses until they find one that gets them the random number they want.Add to that the deterministic nature of the blockchain, and it becomes evident that finding a random number inside the blockchain would lead to finding a deterministic number.\n\n```soliditypragma solidity ^0.5.0;contract example {address public addressVar = msg.sender;function getSender() public view returns (address) {return addressVar;}}```\n\n## Beware of the PitfallsThe crux of the matter is the blockchain, being a deterministic system, can't commit to genuine randomness. All generated random numbers can get influenced and adjusted, leading to potential security lapses. Using these elements for randomness is hence a poor practice and should be avoided at all costs.)\n\nYou can also test this in Solidity's Remix or via the SC exploits minimize repository for further practice, as shown [here](URL).While dealing with blockchains, one must always keep their eyes and ears open for potential security breaches. It's not an easy world to navigate, but with careful consideration and active learning, we can make it a safer place for everyone.
````
