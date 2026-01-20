---
title: EIP-712
---

_Follow along with the video lesson:_

---

### EIP-712

To bring things back to Boss Bridge, for a moment, `MessageHashUtils`, is a library that ultimately assists developers in managing different standard messaging formats. One of which is ERC-191, which we discussed, and the other is [**EIP-712**](https://eips.ethereum.org/EIPS/eip-712).

EIP-712 introduced a standardized way to handle hashing and signing typed and structured data.

In a practical sense this has transactions formatting data in such a way that rather than messages being a bytesstring, they could be parsed into meaningful, human readable information.

From this:

![eip-7121](/security-section-7/14-eip-712/eip-7121.png)

To this:

![eip-7122](/security-section-7/14-eip-712/eip-7122.png)

### EIP-712 Example

I've included an example contract, in the [**GitHub Repo for this course**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/eip712hashing.sol), which demonstrates how EIP-712 is meant to be employed. Let's take a look!

<details>
<summary>eip712hashing.sol</summary>

```js
pragma solidity ^0.4.24;

contract Example {
    struct EIP712Domain {
        string name;
        string version;
        uint256 chainId;
        address verifyingContract;
    }

    struct Person {
        string name;
        address wallet;
    }

    struct Mail {
        Person from;
        Person to;
        string contents;
    }

    bytes32 constant EIP712DOMAIN_TYPEHASH =
        keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

    bytes32 constant PERSON_TYPEHASH = keccak256("Person(string name,address wallet)");

    bytes32 constant MAIL_TYPEHASH =
        keccak256("Mail(Person from,Person to,string contents)Person(string name,address wallet)");

    bytes32 DOMAIN_SEPARATOR;

    constructor() public {
        DOMAIN_SEPARATOR = hash(
            EIP712Domain({
                name: "Ether Mail",
                version: "1",
                chainId: 1,
                // verifyingContract: this
                verifyingContract: 0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC
            })
        );
    }

    function hash(EIP712Domain eip712Domain) internal pure returns (bytes32) {
        return keccak256(
            abi.encode(
                EIP712DOMAIN_TYPEHASH,
                keccak256(bytes(eip712Domain.name)),
                keccak256(bytes(eip712Domain.version)),
                eip712Domain.chainId,
                eip712Domain.verifyingContract
            )
        );
    }

    function hash(Person person) internal pure returns (bytes32) {
        return keccak256(abi.encode(PERSON_TYPEHASH, keccak256(bytes(person.name)), person.wallet));
    }

    function hash(Mail mail) internal pure returns (bytes32) {
        return keccak256(abi.encode(MAIL_TYPEHASH, hash(mail.from), hash(mail.to), keccak256(bytes(mail.contents))));
    }

    function verify(Mail mail, uint8 v, bytes32 r, bytes32 s) internal view returns (bool) {
        // Note: we need to use `encodePacked` here instead of `encode`.
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hash(mail)));
        return ecrecover(digest, v, r, s) == mail.from.wallet;
    }

    function test() public view returns (bool) {
        // Example signed message
        Mail memory mail = Mail({
            from: Person({name: "Cow", wallet: 0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826}),
            to: Person({name: "Bob", wallet: 0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB}),
            contents: "Hello, Bob!"
        });

        uint8 v = 28;
        bytes32 r = 0x4355c47d63924e8a72e509b65029052eb6c299d53a04e167c5775fd466751c9d;
        bytes32 s = 0x07299936d304c153f6443dfa05f40ff007d72911b6f72307f996231605b91562;

        assert(DOMAIN_SEPARATOR == 0xf2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090f);
        assert(hash(mail) == 0xc52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e);
        assert(verify(mail, v, r, s));
        return true;
    }
}
```

</details>


The test function at the bottom of the contract shows how everything ultimately comes together.

```js
function test() public view returns (bool) {
    // Example signed message
    Mail memory mail = Mail({
        from: Person({name: "Cow", wallet: 0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826}),
        to: Person({name: "Bob", wallet: 0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB}),
        contents: "Hello, Bob!"
    });

    uint8 v = 28;
    bytes32 r = 0x4355c47d63924e8a72e509b65029052eb6c299d53a04e167c5775fd466751c9d;
    bytes32 s = 0x07299936d304c153f6443dfa05f40ff007d72911b6f72307f996231605b91562;

    assert(DOMAIN_SEPARATOR == 0xf2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090f);
    assert(hash(mail) == 0xc52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e);
    assert(verify(mail, v, r, s));
    return true;
}
```

A `Mail` struct is created with our typed and formatted data. The contents of this struct is then hashed with the `from` and `to` data. This is what's being send in our transaction.

```js
function hash(Mail mail) internal pure returns (bytes32) {
    return keccak256(abi.encode(MAIL_TYPEHASH, hash(mail.from), hash(mail.to), keccak256(bytes(mail.contents))));
}
```

On the other side of a transaction we can then verify this hashed data by leveraging ecrecover and the `v, r, and s` values provided (these come from the `ECDSA algorithm`). The ecrecover precompile returns the wallet which signed the transaction. If this matches our expected `from` address, the message is verified!

```js
function verify(Mail mail, uint8 v, bytes32 r, bytes32 s) internal view returns (bool) {
    // Note: we need to use `encodePacked` here instead of `encode`.
    bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hash(mail)));
    return ecrecover(digest, v, r, s) == mail.from.wallet;
}
```

### Wrap Up

This is complex stuff. Don't be discouraged if it doesn't click for you right away. I encourage you to take the time to read more into signatures and how `ecrecover` works in the verification process. You can read more on `ecrecover` [**here, in the Solidity documentation**](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions).

In the next lesson we'll investigate a case study featuring `Polygon` where an overlooked return value from `ecrecover` wasn't verified and it had dire consequences.

See you soon!
