## Splitting Raw ECDSA Signatures into v, r, s in Solidity

When working with cryptographic signatures in Ethereum, particularly ECDSA signatures, you'll often encounter a situation where signing tools or libraries provide the signature as a single, concatenated byte string. However, many core Solidity functions (like the precompile `ecrecover`) and standard library functions (such as OpenZeppelin's `ECDSA.recover`) require the signature's components – `v`, `r`, and `s` – as separate arguments.

This lesson demonstrates how to take a raw, 65-byte concatenated ECDSA signature and split it into its `v`, `r`, and `s` components within a Solidity script, specifically leveraging Foundry's scripting environment and inline assembly for efficient memory manipulation.

### Storing the Raw Signature Data

First, you need to store the raw signature obtained from your signing process (e.g., using tools like `cast wallet sign` or libraries like Ethers.js). In Solidity, you can represent this signature as a `bytes` variable, often initialized directly from its hexadecimal string representation using the `hex""` literal.

**Important:** When using the `hex""` literal, omit the `0x` prefix from the hexadecimal string.

```solidity
// Example Script Contract Context
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ExampleSignatureScript {
    // Store the raw signature (R + S + V concatenated)
    // Note the absence of "0x" inside hex""
    bytes private constant SIGNATURE = hex"fbd227be6f23fb5fe9248480c0f4be8a4e9b077c3a0db1333cc60b5debc5116b2a2a06c24085d807c830ba";

    // ... rest of the script
}
```

Using `private` or `internal` visibility is good practice unless the signature needs to be accessed by inheriting contracts.

### Why Splitting is Necessary

Smart contracts that verify signatures typically require the `v`, `r`, and `s` values as distinct inputs. For example, a function call might look like this:

```solidity
// Assume 'merkleAirdrop' is a contract instance
// Assume 'proof', 'CLAIMING_ADDRESS', 'CLAIMING_AMOUNT' are defined
// We need to get v, r, s *before* calling the function

(uint8 v, bytes32 r, bytes32 s) = splitSignature(SIGNATURE);

// In a Foundry script context:
// vm.startBroadcast();
merkleAirdrop.claim(CLAIMING_ADDRESS, CLAIMING_AMOUNT, proof, v, r, s);
// vm.stopBroadcast();
```

This necessitates a helper function, `splitSignature`, to parse the raw `SIGNATURE` bytes.

### The Problem with Standard ABI Decoding

A common initial thought might be to use `abi.decode`. However, this won't work for typical raw signatures. Standard ABI encoding (`abi.encode`) adds padding and length information according to the ABI specification. Raw signatures, on the other hand, are usually created by directly concatenating the bytes of `r`, `s`, and `v` (often achieved via `abi.encodePacked` or equivalent methods). Since `abi.decode` expects the standard ABI format, it cannot correctly parse a tightly packed signature string.

### Understanding the Raw Signature Byte Structure

A standard ECDSA signature, when concatenated this way, forms a 65-byte string with the following structure:

*   **Bytes 0-31:** `r` (32 bytes)
*   **Bytes 32-63:** `s` (32 bytes)
*   **Byte 64:** `v` (1 byte)

Total length: 32 + 32 + 1 = 65 bytes. Our splitting logic must precisely extract data based on these offsets.

### Implementing the `splitSignature` Function

We'll create a helper function to perform the splitting. This function will take the `bytes` signature as input and return `v`, `r`, and `s`.

```solidity
// Define a custom error for better gas efficiency (Solidity >= 0.8.4)
error InvalidSignatureLength(uint256 expected, uint256 actual);

contract SignatureUtils { // Or place inside your script contract

    /// @notice Splits a raw 65-byte ECDSA signature into its v, r, s components.
    /// @param sig The raw signature bytes (R + S + V).
    /// @return v The recovery identifier (1 byte).
    /// @return r The first component of the signature (32 bytes).
    /// @return s The second component of the signature (32 bytes).
    function splitSignature(bytes memory sig) public pure returns (uint8 v, bytes32 r, bytes32 s) {
        // 1. Validate Input Length
        if (sig.length != 65) {
            revert InvalidSignatureLength(65, sig.length);
            // Note: Using if/revert with custom errors is generally more gas-efficient
            // than require(sig.length == 65, "Error message"); since Solidity 0.8.4
        }

        // 2. Use Assembly for Efficient Splitting
        assembly {
            // Memory layout of `bytes`:
            // - First 32 bytes: length of the byte array (65 in this case)
            // - Subsequent bytes: actual data content

            // Calculate pointer to the start of the actual signature data
            // add(sig, 32) points past the length word
            let sig_ptr := add(sig, 0x20) // 0x20 is 32 in hex

            // Load the first 32 bytes (r)
            // mload(p) reads 32 bytes starting from memory address p
            r := mload(sig_ptr)

            // Load the next 32 bytes (s)
            // add(sig_ptr, 32) points to the start of s
            s := mload(add(sig_ptr, 0x20))

            // Load the last byte (v)
            // add(sig_ptr, 64) points to the start of the 32-byte word containing v
            // mload reads that word. byte(0, word) extracts the *first* byte (most significant byte in EVM)
            // from that word. Since v is the 65th byte, it's the first byte of the word starting at offset 64.
            v := byte(0, mload(add(sig_ptr, 0x40))) // 0x40 is 64 in hex
        }

        // The function implicitly returns v, r, s as defined in the signature
    }
}
```

**Explanation of the Assembly Code:**

1.  **`bytes` Memory Layout:** In memory, dynamic types like `bytes` have a structure where the first 32-byte slot holds the length of the data, and the actual data follows immediately after.
2.  **`let sig_ptr := add(sig, 0x20)`:** The variable `sig` actually holds the memory address where the *length* of the byte array is stored. We add `0x20` (32 bytes) to this address to get the pointer (`sig_ptr`) to the *start of the actual signature data*.
3.  **`r := mload(sig_ptr)`:** `mload` reads a full 32-byte word from memory. By reading from `sig_ptr`, we load the first 32 bytes of the signature data, which corresponds to `r`.
4.  **`s := mload(add(sig_ptr, 0x20))`:** We add `0x20` (32 bytes) to `sig_ptr` to get the memory address where `s` begins (immediately after `r`). `mload` then reads the 32 bytes of `s`.
5.  **`v := byte(0, mload(add(sig_ptr, 0x40)))`:**
    *   We add `0x40` (64 bytes) to `sig_ptr` to get the address where the byte `v` resides.
    *   `mload` reads the 32-byte word starting at this position. Since `v` is only one byte, it will be the most significant byte within this word (EVM is big-endian).
    *   The `byte(n, word)` opcode extracts the nth byte from a 32-byte `word`. `byte(0, ...)` extracts the very first (most significant) byte, which is our `v`.

### Handling Component Order: R,S,V vs V,R,S

It's crucial to note a common point of confusion:

*   The **packed byte structure** is typically `R` (32 bytes) + `S` (32 bytes) + `V` (1 byte). Our assembly code reads based on this structure.
*   Many **Solidity function arguments** (like `ecrecover` or library functions) expect the components in the order `V, R, S`.

Our `splitSignature` function correctly handles this discrepancy. It reads the data in the `R, S, V` sequence from the byte array but returns the values assigned to the named return variables `v`, `r`, `s`, matching the common `V, R, S` function argument order.

### Gas Optimization: Custom Errors

As highlighted in the code comments, using the `if (condition) { revert CustomError(); }` pattern is generally more gas-efficient than `require(condition, "string message")` for error handling in Solidity versions 0.8.4 and later. Custom errors avoid storing and processing error strings, saving deployment and runtime gas.

By using this `splitSignature` function, you can now easily bridge the gap between concatenated signature outputs and the separated `v`, `r`, `s` inputs required by many smart contract functions, enabling seamless signature verification within your Solidity scripts and contracts.