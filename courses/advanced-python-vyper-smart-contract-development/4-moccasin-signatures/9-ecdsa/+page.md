## ECDSA Signatures

We are going to continue our exploration of digital signatures with something called ECDSA recover, which was mentioned in the last video. This is a process that will be incredibly important to what we are doing here with our Merkle airdrop. Let's dive in.

###  What are ECDSA Signatures?

ECDSA stands for Elliptic Curve Digital Signature Algorithm. It's a mouthful, but it's based on Elliptic Curve Cryptography. Don't worry, we'll get into what that means in a second. ECDSA is used to:
- generate key pairs
- create signatures
- verify signatures.

But first, what are signatures in the context of blockchain?

Blockchain signatures are a means for authentication in blockchain technology. They allow operations such as sending transactions to be verified, ensuring they originated from the intended sender. 

Proof of ownership on Ethereum is achieved using public and private key pairs. These key pairs are used to create digital signatures.

Think of signatures as an analog to needing ID to withdraw money from a bank, or a digital fingerprint. 

### What is Public Key Cryptography?

The public-private key pair is used to verify that the sender is the owner of the account. This is known as public key cryptography, and it involves asymmetric encryption. Asymmetric encryption, while sounding confusing, is a pretty straightforward process.  

A private key is used to sign a message, and that private key is used to derive the public key. The public key is then used to verify the signature, and confirm that the person who owns the private key created the signature.

You should never share your private key, as anyone who has it can access your account. But, sharing your public key is completely safe.  If you share your public key, someone cannot steal your funds. 

This public-private key pair defines your Ethereum externally owned account, or EOA.  These EOAs interact with the blockchain by signing data and sending transactions without others being able to access accounts they do not own. 

An Ethereum address is used as identification, and is the last 20 bytes of the hash of the public key.  

### How are Public and Private Keys Generated?

How do we create public and private keys? How are signatures generated?

Public and private keys are generated using a process that involves two important constants. 

- **Generator Point G** is a constant point on the Elliptic Curve, and can be thought of as a random point.
- **Order n** is a prime number, and defines the length of the private key. It is generated using the generator point G.  

We only really need to remember that these constants are, in fact, constants.  They will be used in subsequent calculations.

###  What is a Signature in ECDSA?

ECDSA signatures are made up of three integers:
- V
- R
- S. 

They might look familiar.
- **R** is the x coordinate of a random point, denoted as R on the curve. 
- **S** serves as proof that the signer knows the private key, and is calculated using the nonce k, the hash of the message, the private key, the R part of the signature, and the order n.
- **V** is used to recover the public key from R, and denotes the index of the point on the curve, whether the point is in positive or negative y. This is known as the polarity.

### How are Signatures Verified?

Now we've discussed how public and private keys are generated, and how the signature is constructed.  Let's take a look at how ECDSA signatures are verified.

The ECDSA verification algorithm takes the signed message, the signature from the signing algorithm, and the public key, and outputs a boolean representing whether the signature is valid. This is essentially the reverse of the signing process.

The EVM pre-compiler does this verification for us. It checks to see if the signature is valid. If it is not valid, the pre-compiler will return the zero address, and the smart contract will revert.

###  ECDSA Recover

ECDSA recover is a function used in smart contracts. It retrieves the signer's address of a message that has been signed using a private key with ECDSA.  It uses the signature to do this.

However, using ECDSA recover directly can lead to some security issues. 

The first issue we discussed is signature malleability. Because the curve is symmetrical about the x-axis, there are two valid signatures for each value of R.  Therefore, if an attacker knows one signature, they can calculate the other one. 

We can mitigate this issue by restricting the value of S to one half of the curve. If S is not restricted, then the two valid signatures exist. The smart contract can be vulnerable to signature malleability attacks.

We should always use the OpenZeppelin ECDSA library to verify signatures. This library has built-in checks to protect against signature malleability attacks. 

We also discussed another issue with using ECDSA recover directly. If the signature is invalid, the ECDSA recover function will return the zero address. The smart contract should have a check in place to ensure it reverts if the zero address is returned from the ECDSA recover function.  Again, the OpenZeppelin ECDSA library already has this check in place.

###  Conclusion

Well done, we covered a lot of information, and it can be overwhelming. You should be proud of yourself for making it through.  If anything was confusing, or you need to go over this again, you can always read some other articles, or dive into the math. It's very complex stuff and it's unlikely you'll get your head around it the first time. 

But, you should be proud because now you understand ECDSA Signatures. 
