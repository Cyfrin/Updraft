---
title: Signatures Summarized
---

_Follow along with this video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/rhLZafJabBg?si=psw3hpKNBWv7LFNX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Decoding Cryptographic Signing: Private Keys, Messages, and Signature Verification

If you're taking your first steps into the world of blockchain or cryptography, you've probably stumbled across the terms private key, messages, digital signatures, etc. In this blog post, we'll break down the fascinating process of signing messages using private keys. No worry if these terms seem to be Greek to you right now, all will get clearer as you read further.

## What Does Signing Messages Actually Mean?

When we refer to 'signing' in the context of blockchain and cryptography, we're talking about a process by which we authenticate messages on the blockchain using a private key. It's a crucial aspect of data and transaction security.

Now you might ask, what does signing a message involve and how does it work? Let's break it down a bit.

> Initially, the process starts with two distinct elements: a private key and a message.

![](https://cdn.videotap.com/1RO5OQCrdWw5Vd9SjdCN-14.67.png)

The content of the messages we refer to usually includes data elements like function signatures, function selectors, parameters, etc.

### The Magic Box: The Elliptic Curve Digital Signature Algorithm

These components, the private key and message, are then pushed into a fascinating 'algorithmic machine' known as the Elliptic Curve Digital Signature Algorithm (ECDSA). Now, unless you're deeply interested in cryptography, you probably don't need to understand the complex math behind it.

Hence, you can imagine the ECDSA as a magic box, a black box if you will. If you're curious about the inner mechanisms of this 'black box', I highly recommend a deep dive into the Elliptic Curve Cryptography- an excellent starting point could be [this link](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

![](https://cdn.videotap.com/2RjUzLDQpobVxdX7u9lT-23.83.png)

### The Output: VR and S

Once we feed the private key and message into the black box, the ECDSA, it gives us two outputs, famously known as VR and S. These components make up our unique Digital Signature.

![](https://cdn.videotap.com/IQH3FxNz2xIA59h8rO4F-29.33.png)

## Full Circle: Verifying the Signature

Amazingly, we can use this digital signature, the VR and S, to verify that a message was, indeed, signed by a specific address. This gives a receiver the confidence that the message they received was indeed from the sender it claims to be.

In simpler terms, this tells us that the sender of the message is the legitimate owner of the address from which the message was sent, bringing us to the very essence and necessity of cryptographic signing - Authentication and Verification.

![](https://cdn.videotap.com/eNLThyvbZVxz4fr0PJHT-36.67.png)

To wrap it up, Message Signing and Signature Verification is a simple and secure method to verify the integrity of messages, transactions, and data on the Blockchain. It is an integral part of the blockchain infrastructure, ensuring that addresses and their transactions remain authentic and secure.

In the fast-evolving world of blockchain and cryptography, understanding such key concepts is not only essential but also engaging. It peels back the layers of the complex systems we often use without understanding and puts power back into the hands of users. Whether it's to enhance your professional knowledge or simply for the thrill of learning something new, delving into the wonder of cryptography is remarkably worthwhile. I highly recommend continuing your cryptographic journey from here, you never know where it might lead you next.

Stay curious, keep learning, and until the next post, Happy Cryptography!
