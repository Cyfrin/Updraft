---
title: Signing Transactions
---

You can follow along with this section of the course here.

<iframe width="560" height="315" src="https://www.youtube.com/embed/gmMZ1N3xP7o" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="signing transactions"></iframe>

# Understanding Blockchain Transaction Signatures, Private and Public Keys

The beauty and security of blockchain technology revolve around the privacy and secure nature of transactions. In this blog post, we will demystify this concept by digging deeper into how transaction signing, private and public keys, and other cryptographic pieces lend credence to blockchain transactions.

<img src="/blockchain-basics/public-private-key.png" style="width: 100%; height: auto;" alt="public private key">

## What are Private and Public Keys?

Understanding the relationship between private and public keys is essential to grasping the concept of blockchain transactions. In essence, a private key is a randomly generated secret key used to sign all transactions.

```python
private_key = generate_random()
```

The private key is then passed through an algorithm (the Elliptic Curve Digital Signature Algorithm for Ethereum and Bitcoin) to create the corresponding public key. Both the private and public keys are central to the transaction process. However, while the private key must remain secret, the public key needs to be accessible to everyone.

## How does Transaction Signing Happen?

Consider a simple scenario; Darcy sends $400 to Bingley. To verify this transaction, Darcy uses her private key to sign the transaction.

```python
signature = sign(data, private_key)
```

This creates a unique message signature that can't be used to derive the private key, but can be verified using the public key.

```python
verify(signature, public_key)
```

When person X attempts to impersonate Darcy and send a transaction, the fake transaction can be easily detected as the transaction signature doesn't match the public key.

## Importance of Hiding Private Keys

The concept of private keys is implemented in your MetaMask account, nestled away in the Settings section. The private key isn't displayed, but is readily available when the password is entered, telling a tale of how critical it is to secure it.

```python
print(meta_mask_private_key)
```

Anyone with access to the private key can perform and sign transactions, consequently making it absolutely vital to safeguard private keys.

## The Ethereum Address and your Private Key

<img src="/blockchain-basics/sign-a-tx.png" style="width: 100%; height: auto;" alt="sign a tx">

Interestingly, the Ethereum address is a part of your public key. It's derived from hashing the public key via the Ethereum hashing algorithm and extracting the last 20 bytes. While the procedure may differ from one blockchain to another, the principle remains the same - the address is a derivative of the public key.

## Recapping the Key Concepts

- Your private key is super-secret, held securely by you alone as it holds the power to authorize transactions.
- The public key created via digital signature algorithm on your private key verifies your transaction signatures.
- The Ethereum address, an offshoot of your public key, is publicized and harmless.

<img src="/blockchain-basics/key-chart.png" style="width: 100%; height: auto;" alt="key chart">

The private and public keys, paired with the address, create a securely functioning transaction system. This security is extended in the MetaMask account with the creation of new accounts.

The creation of any new account in your MetaMask involves your 'mnemonic' or secret phrase. The process employs simple hashing and takes your secret phrase, adds a number to it (corresponding to the new account number you want), and generates a new hash to create a private key for your new account.

Thus, if your mnemonic is shared, access to all the accounts created in your MetaMask or wallet is granted. However, sharing your private key only allows access to a single account, while sharing your public key or address is perfectly safe.

On a note of caution, the mnemonic is a highly treasured piece of information that needs unrelenting protection. A stolen mnemonic means access to all your accounts. Losing access to a single account due to a mishandled private key, although worrisome, is less damaging. Your public key and address, albeit valueless when displaced, are crucial pillars that solidify blockchain's security architecture.

In summary, your private key, public key, and address closely collaborate to generate, authenticate and secure transactions in the blockchain world. Maintaining their confidentiality and understanding their functions in the transaction process ensures seamless and safe blockchain usage.
