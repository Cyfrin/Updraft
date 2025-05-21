---
title: Signatures Introduction
---

_Follow along with the video lesson:_

---

### MessageHashUtils

The next library in L1BossBridge.sol, that we may not recognize is `MessageHashUtils`. This one's important, so let's spend a bit of time on it.

<details>
<summary>MessageHashUtils.sol</summary>

```solidity
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (utils/cryptography/MessageHashUtils.sol)

pragma solidity ^0.8.20;

import {Strings} from "../Strings.sol";

/**
 * @dev Signature message hash utilities for producing digests to be consumed by {ECDSA} recovery or signing.
 *
 * The library provides methods for generating a hash of a message that conforms to the
 * https://eips.ethereum.org/EIPS/eip-191[EIP 191] and https://eips.ethereum.org/EIPS/eip-712[EIP 712]
 * specifications.
 */
library MessageHashUtils {
    /**
     * @dev Returns the keccak256 digest of an EIP-191 signed data with version
     * `0x45` (`personal_sign` messages).
     *
     * The digest is calculated by prefixing a bytes32 `messageHash` with
     * `"\x19Ethereum Signed Message:\n32"` and hashing the result. It corresponds with the
     * hash signed when using the https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`] JSON-RPC method.
     *
     * NOTE: The `messageHash` parameter is intended to be the result of hashing a raw message with
     * keccak256, although any bytes32 value can be safely used because the final digest will
     * be re-hashed.
     *
     * See {ECDSA-recover}.
     */
    function toEthSignedMessageHash(bytes32 messageHash) internal pure returns (bytes32 digest) {
        /// @solidity memory-safe-assembly
        assembly {
            mstore(0x00, "\x19Ethereum Signed Message:\n32") // 32 is the bytes-length of messageHash
            mstore(0x1c, messageHash) // 0x1c (28) is the length of the prefix
            digest := keccak256(0x00, 0x3c) // 0x3c is the length of the prefix (0x1c) + messageHash (0x20)
        }
    }

    /**
     * @dev Returns the keccak256 digest of an EIP-191 signed data with version
     * `0x45` (`personal_sign` messages).
     *
     * The digest is calculated by prefixing an arbitrary `message` with
     * `"\x19Ethereum Signed Message:\n" + len(message)` and hashing the result. It corresponds with the
     * hash signed when using the https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`] JSON-RPC method.
     *
     * See {ECDSA-recover}.
     */
    function toEthSignedMessageHash(bytes memory message) internal pure returns (bytes32) {
        return
            keccak256(bytes.concat("\x19Ethereum Signed Message:\n", bytes(Strings.toString(message.length)), message));
    }

    /**
     * @dev Returns the keccak256 digest of an EIP-191 signed data with version
     * `0x00` (data with intended validator).
     *
     * The digest is calculated by prefixing an arbitrary `data` with `"\x19\x00"` and the intended
     * `validator` address. Then hashing the result.
     *
     * See {ECDSA-recover}.
     */
    function toDataWithIntendedValidatorHash(address validator, bytes memory data) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(hex"19_00", validator, data));
    }

    /**
     * @dev Returns the keccak256 digest of an EIP-712 typed data (EIP-191 version `0x01`).
     *
     * The digest is calculated from a `domainSeparator` and a `structHash`, by prefixing them with
     * `\x19\x01` and hashing the result. It corresponds to the hash signed by the
     * https://eips.ethereum.org/EIPS/eip-712[`eth_signTypedData`] JSON-RPC method as part of EIP-712.
     *
     * See {ECDSA-recover}.
     */
    function toTypedDataHash(bytes32 domainSeparator, bytes32 structHash) internal pure returns (bytes32 digest) {
        /// @solidity memory-safe-assembly
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, hex"19_01")
            mstore(add(ptr, 0x02), domainSeparator)
            mstore(add(ptr, 0x22), structHash)
            digest := keccak256(ptr, 0x42)
        }
    }
}
```

</details>


```js
/* @dev Signature message hash utilities for producing digests to be consumed by {ECDSA} recovery or signing.
```

To understand what this is doing, we're going to have to go waaaay back to the [**Solidity Basis**](https://updraft.cyfrin.io/courses/solidity) resource we used, the [**Anders Brown blockchain demo**](https://andersbrownworth.com/blockchain/).

We'll be using his [**public-private-key-demo GitHub Repo**](https://github.com/anders94/public-private-key-demo) for this lesson.

> **Note:** You will need node.js to be able to experiment with this repo locally.

Begin by following the setup instructions on the repo's README.

```bash
git clone https://github.com/anders94/public-private-key-demo.git
cd public-private-key-demo
npm install
```

To run the required server we can then run:

```bash
./bin/www
```

When can then open `http://localhost:3000` in a browser to access the locally hosted demo. Once set up, you can click on `signatures` in the top right and it should look something like this:

::image{src='/security-section-7/12-signatures/signatures1.png' style='width: 100%; height: auto;'}

Fundamentally a message signature takes a message, and hashes it with a user's private key.

::image{src='/security-section-7/12-signatures/signatures2.png' style='width: 100%; height: auto;'}

A public key can then be used to verify the signature on a message.

::image{src='/security-section-7/12-signatures/signatures3.png' style='width: 100%; height: auto;'}

If the message being verified has been changed, or if the public key doesn't match the signature, a message won't be verified.

::image{src='/security-section-7/12-signatures/signatures4.png' style='width: 100%; height: auto;'}

With this understanding of how signatures work refreshed in our minds, we can come back to the MessageHashUtils contract. In order to make messaging and hashes more standardized a few Improvement Proposals have been made and adopted. One of which is [**ERC-191: Signed Data Standard**](https://eips.ethereum.org/EIPS/eip-191).

The motivation for ERC-191 is pretty clearly outlined in the proposal itself:

    Motivation

    Several multisignature wallet implementations have been created which accepts presigned transactions. A presigned transaction is a chunk of binary signed_data, along with signature (r, s and v). The interpretation of the signed_data has not been specified, leading to several problems:

    - Standard Ethereum transactions can be submitted as signed_data. An Ethereum transaction can be unpacked, into the following components: RLP<nonce, gasPrice, startGas, to, value, data> (hereby called RLPdata), r, s and v. If there are no syntactical constraints on signed_data, this means that RLPdata can be used as a syntactically valid presigned transaction.

    - Multisignature wallets have also had the problem that a presigned transaction has not been tied to a particular validator, i.e a specific wallet. Example:
      1.  Users A, B and C have the 2/3-wallet X
      2.  Users A, B and D have the 2/3-wallet Y
      3.  User A and B submit presigned transactions to X.
      4.  Attacker can now reuse their presigned transactions to X, and submit to Y.

So, basically, non-standardized signing practices were causing confusion and leaving room for attack vectors in ethereum transactions.

The standard proposed was that all signed data would follow the format:

```
0x19 <1 byte version> <version specific data> <data to sign>.
```

In this format the `version` denotes the type and structure of the data being signed.

::image{src='/security-section-7/12-signatures/signatures5.png' style='width: 100%; height: auto;'}

The example provided in the ERC does a great job at detailing how this works in practice.

```js
function signatureBasedExecution(address target, uint256 nonce, bytes memory payload, uint8 v, bytes32 r, bytes32 s) public payable {

    // Arguments when calculating hash to validate
    // 1: byte(0x19) - the initial 0x19 byte
    // 2: byte(0) - the version byte
    // 3: address(this) - the validator address
    // 4-6 : Application specific data

    bytes32 hash = keccak256(abi.encodePacked(byte(0x19), byte(0), address(this), msg.value, nonce, payload));

    // recovering the signer from the hash and the signature
    addressRecovered = ecrecover(hash, v, r, s);

    // logic of the wallet
    // if (addressRecovered == owner) executeOnTarget(target, payload);
}
```

`v, r, and s`, as we know are the constituent parts of a signature. These are hashed together via `keccak256`. The signer of this transaction is able to be recovered by using the EVM precompile `ecrecover`, this is effectively the verification step of a transaction.

A message and private key are run through the `ECDSA (Elliptic Curve Digital Signature Algorithm)`, the result of this is our message signature which can be broken into our `v, r and s` elements. Smart contracts utilize the `ecrecover` precompile to verify who has signed something.

You can read more on the `ecrecover` precompile [**here, on evm.codes**](https://www.evm.codes/precompiled).
