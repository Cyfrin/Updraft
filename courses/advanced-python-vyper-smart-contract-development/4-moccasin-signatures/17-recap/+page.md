## Merkle Trees and Signatures

We've covered a lot in this section. So before we send you off to the next section, let's do a quick refresher on all the things we've learned so far.

### Merkle Trees

First, we learned about **merkle trees**. A Merkle tree is a data structure that allows us to compress a large amount of data into a single hash, known as the **Merkle root**.

Here's how they work:

1. We start with a list of data, each piece of data is called a **leaf**. 
2. We hash each leaf. 
3. We hash sibling leaves to create a **parent node**.
4. We continue this process until only one hash remains, and that's our Merkle root.

### Signatures

We also learned about **signatures**, how different types of signatures work, and how to create signatures with ECDSA. 

### EIP-712

EIP-712 is a standard for structured data signing on Ethereum. We are adding it to our contracts in order to implement signing capabilities. 

### EIP-191

EIP-191 is a standard for recovering the address of the signer from a signature.

### Conclusion

You've come a long way and we are proud of you for completing this section. Now is a great time to take a break, get some ice cream, or go to the gym. 
