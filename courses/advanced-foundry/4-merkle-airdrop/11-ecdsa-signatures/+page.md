---
title: ECDSA Signatures
---

_Follow along with the video_

---

### ECDSA

ECDSA stands for the [Elliptic Curve Digital Signature Algorithm](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm), an algorithm based on [elliptic curve](https://en.wikipedia.org/wiki/Elliptic_curve) cryptography. This form of cryptography leverages the unique properties of elliptic curves to perform secure cryptographic functions.

Elliptic curves possess several key mathematical properties that make them suitable for cryptography:

- They have no singular points.
- They are smooth curves without sharp corners.
- They are symmetric about the x-axis.
- Every point (x, y) on the curve has an inverse point (x, −y) also on the curve.
- Adding two distinct points (x1, y1) and (x2, y2) on the curve involves drawing a line through them, which intersects the curve at a third point.

In the context of blockchain technology, ECDSA is used for

1. Generating key pairs
2. Create signatures
3. Verify signatures

### Public Key Cryptography

Signatures in blockchain provide a means for authentication. In Ethereum, proof of ownership is achieved using **public** and **private key** pairs, which create _digital signatures_ unique to each user. These signatures verify that the sender of a transaction is the owner of the account, a system known as public key cryptography involving _asymmetric encryption_.

- **Private Key**: is used to sign messages and derive the public key
- **Public Key**: is used to verify that the owner knows the private key. It is virtually impossible to derive the private key from the public key, making this system highly secure.

When a new Ethereum account is created, it generates a pair of cryptographic keys: a public key and a private key. The public key is then processed using the keccak256 hashing algorithm, converting it into a fixed-size string of 32 bytes (256 bits). The Ethereum address is derived from the last 20 bytes of this hashed public key.

### The SECP256k1 Curve

The specific curve used in ECDSA in Ethereum is called the **secp256k1 curve**.

For every x-coordinate on the curve, two valid signatures exist, which implies that if a malicious actor knows one signature, they can compute the second one. This vulnerability is known as **signature malleability**, which can lead to replay attacks.

There are constants associated with the SECP 256k1 curve:

- **Generator Point (G)**: A predefined point on the curve.
- **n**: A prime number defining the length of the private key.

The public key is an elliptic curve point calculated by multiplying the private key with the generator point `G`.

ECDSA signatures consist of three integers: `v`, `r`, and `s`:

1. The message is hashed
2. A random number `k` (the nonce) is generated.
3. **Calculating Signature Components**:
   - **r**: Represents the x-coordinate on the elliptic curve of the point resulting from multiplying the nonce `k` by the generator point `G`.
   - **s**: Serves as proof of the signer's knowledge of the private key, calculated using the nonce `k`, the hash of the message, the private key, and the `r` value.
   - **v**: Indicates the polarity (positive or negative y-axis) of the point on the elliptic curve.

### Verifying Signatures

Verifying ECDSA signatures involves using the signed message, the signature, and the public key to check if the signature is valid. This process essentially reverses the signing algorithm to ensure the provided `r` coordinate matches the calculated one.

> 👮‍♂️ **BEST PRACTICE**:br
> Using `ecrecover` directly can lead to security issues such as signature malleability. This can be mitigated by restricting the value of `s` to one half of the curve. The use of **OpenZeppelin's ECDSA library** is recommended, which provides protection against signature malleability and prevents invalid signatures from returning a zero address.
