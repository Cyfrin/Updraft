---
title: Solidity's Free Memory Pointer
---

---

# Demystifying Solidity: Understanding Opcodes and Smart Contract Structure

Greetings, blockchain enthusiasts and discoverers of Solidity! Today, we're going to put on our explorers' hats and dive headfirst into the intricacies of Solidity opcodes. You've likely encountered the setup `60 80, 60 40, 52` in every Solidity smart contract. Have you ever paused to ponder its purpose? Well, that's what we're here to uncover.

Let's start from scratch, step by step. Our journey through Solidity's terrain will lead us to three distinct sections: **contract creation**, the **runtime**, and **metadata**. Picturing Solidity smart contracts as this triple-layered cake is crucial for our understanding.

## The Three Layers of a Smart Contract

1. **Contract Creation**: The foundation of our cake is what gets the ball rolling. This is your handshake with the blockchain every time you deploy a new contract.
2. **Runtime**: Seated comfortably above the creation layer, the runtime is the action-packed hero that dwells within the blockchain itself.
3. **Metadata**: Finally, the icing on the cake—metadata might not always be glamorous, but it's where we learn about the compiler version and other descriptors of our smart contract.

Now that we've got the basics down, let's focus on the star of the show—the **free memory pointer**.

```
// Contract Creation Code
PUSH1 0x80
PUSH1 0x40
MSTORE
```

This snippet, my friends, leads us to a peculiar concept in Solidity: the free memory pointer. Simply put, it's the contract's way of keeping track of where in memory we can place new data.

Consider memory as a sprawling landscape of 32-byte plots. If you look closely at the image above, you'll see how these plots are indexed using hexadecimal (ox20, ox40, ox60...). With `push 80, push 40 mstore`, what we're doing is assigning the value 0x80 to the plot labelled 0x40. But why 0x40, you ask? Well, Solidity reserves this spot as a signpost, the so-called free memory pointer.

### The Role of the Free Memory Pointer

When it's time to store new variables, Solidity turns to the free memory pointer for guidance. This pointer says, "Hey, this space is available; go ahead and make yourself at home." Each time new data is stored, our friendly pointer updates its address, ensuring there's always a clear spot available for the next settler.

```
// Free Memory Pointer in ActionPUSH1 0x02
// Value to storePUSH1 0x80
// Previous free memory addressMSTORE
// Store the valuePUSH1 0x20
// Size of data stored (32 bytes)ADD
// Calculate new free memory addressDUP1
// Duplicate the new free memory addressPUSH1 0x40
// Free memory pointer locationMSTORE
// Update the free memory pointer
```

In the snippet above, we cozy up the value 0x02 into its new home at 0x80. Then, we obligingly move the pointer to the next free plot, which, after doing our math (adding 32 bytes), would be 0xA0.

Why is this important? In a nutshell, this system prevents our contract from accidentally overwriting existing data—it's a tidy-up strategy that keeps everything organized and accessible.

### Solidity Versus Other Languages

It's worth noting that not all programming languages treat memory with the same courtesy as Solidity. Take Huff, for instance—there's no hassle about where to stash variables since memory usage is minimal.

Now, as we continue to code in Solidity, expect to be greeted by the free memory pointer's setup at every contract's commencement. It's quite literally the front desk of memory organization in the Solidity universe.

## The Takeaway

What we've wrapped our minds around today is more than just code—it's a philosophy of memory management that Solidity carries proudly. As you code and create within the realms of smart contracts, remember that the free memory pointer is there to keep your data safe, snug, and systematically placed.

Happy coding, and may your smart contracts always run as smoothly as intended!
