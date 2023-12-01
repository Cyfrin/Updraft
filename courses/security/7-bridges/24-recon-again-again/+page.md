---
title: Recon (Continued) Again
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/yWaeMeT9eoc?si=TD_PNn64rmDC6QvL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Understanding Token Withdrawal From L2 to L1 in Blockchain

In this post, we'll be deep diving into a crucial function that is responsible for the withdrawal of tokens from L2 to L1. Along the way, we will demystify some blockchain terminologies like VR and S, and explore how security mechanisms prevent replay attacks.

In this process, we are going to look into two essential parameters: VR and S, and the address of the user, and then explore the 'send to l one V, R and S' function. We will also dig a little into gasless transactions and encoding some data in various functions.

## Signature: A Safety Net Against Replay Attacks

The function we will be examining requires what we refer to as "signature" - an essential feature to prevent sketchy replay attacks.

```js
  function withdrawL2(address _l2Token,address _from,address _to,uint256 _amount,uint32 _l1Gas,bytes calldata _data) external returns (bytes memory){}
```

Here, `_from` works as the address of the user receiving tokens on L1. `_amount` determines the tokens to withdraw, and `data` emits the signature coming from the signed data. This gives us VR and S.

## Embarking on The Token Withdrawal Journey

![](https://cdn.videotap.com/UsY4cL26EFFcQNaxeMa5-118.72.png)

Now, let's walk through the process of withdrawing tokens from L2 to L1. In the function, it's apparent that anyone can initiate a token withdrawal to L1. Let's analyze the step that happens when we call 'send to l1 V, R and S'.

## Signature Verification and Gasless Transactions

Tokens are withdrawn from L2 to L1 upon calling 'send to l1 V, R and S.' ABI encoding (a part of signing in Ethereum) is key to our discussion here. It signs the essential message we will verify for authenticity.

> "Allowing people to call transactions by signature introduces the beneficial feature of gasless transactions, called relays."

Withdrawing tokens via signatures brings many benefits, despite it seeming a bit unusual. For instance, it enables gasless transactions, which can help users save on network gas fees.

## Unravelling the sendToL1 'V, R and S' and ECDSA Recover Function

Upon calling `sendToL1`, we come across V, R and S encoded as bytes in the memory message. Let's now delve into the 'ECDSA Recover' to verify the signer.

```js
function recover(bytes32 hash, bytes memory signature)
```

Invoking 'recover' in the `sendToL1` function gets the function `Try Recover`, which eventually reaches out to the ECDSA recover at the lower part.

It's quite confusing, but stay with me!

Behind the scene, the private key and the signed message combine to become the input parameters constituting V, R and S. The chain is verifying the message off-chain.

![](https://cdn.videotap.com/VndGsyKD2Q9sT0kYNAIq-217.66.png)

The highlighted block of code converts the signed message into a designated format. The `ecrecover` and `hashutils twoethereum` play a significant role in this. Afterward, it calls `ECDSA Recover` to verify the signer.

Let the code tickle your curiosity and compel you to inspect it further. So, let's proceed!

## Ensuring Only Authorized 'Signer' Can Operate

The above block of code facilitates how the V, R and S signer can withdraw tokens from L2 to L1. This flow makes sense –only an authorized signer should be able to unlock tokens on L2. Any unauthorized access will cause a total system revert.

The codes continue to decode the message after verifying the 'signer.'

```js
  (address target, uint256 value, bytes memory data) = abi.decode(_message, (address, uint256, bytes));
```

The system finally performs a low-level call, unlocking the token over here. It uses the 'signer' placed in the target call feature with the determined data. If this is not successful, it reverts again.

Here ends our thorough examination of withdrawing tokens from L2 to L1. It can be complicated but don't sweat it; every blockchain pro started from somewhere! Happy coding!
