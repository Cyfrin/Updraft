---
title: Recon (continued)
---

_Follow along with the video lesson:_

---

### Recon (continued)

Alright! We went on a bit tangent, but its very important to understand how signatures and signing verification work. This should help us in understanding what MessageHashUtils in L1BossBridge is doing for us.

What that said, we've one more import we should understand, `ECDSA (Elliptic Curve Digital Signature Algorithm)`.

```js
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
```

While `MessageHashUtils` essentially handles the formatting of our message/signature data, it's `ECDSA` which handles the actual encryption. Consider the `tryRecover` function:

```js
/* @dev Returns the address that signed a hashed message (`hash`) with `signature` or an error.
*/
function tryRecover(bytes32 hash, bytes memory signature) internal pure returns (address, RecoverError, bytes32) {
        if (signature.length == 65) {
            bytes32 r;
            bytes32 s;
            uint8 v;
            // ecrecover takes the signature parameters, and the only way to get them
            // currently is to use assembly.
            /// @solidity memory-safe-assembly
            assembly {
                r := mload(add(signature, 0x20))
                s := mload(add(signature, 0x40))
                v := byte(0, mload(add(signature, 0x60)))
            }
            return tryRecover(hash, v, r, s);
        } else {
            return (address(0), RecoverError.InvalidSignatureLength, bytes32(signature.length));
        }
    }
```

We can learn a lot from this function. For example, we can see that a valid signature length _must be_ `65`. Additionally we can see the types that `v, r, and s` should be, `uint8`, `bytes32` and `bytes32` respectively.

Encourage you to investigate further into the math in this contract and how it handles the determining of signers, if you're interested.

For our purposes, it's enough to understand that `ECDSA` handles the encryption side of message signing and `MessageHashUtils` manages the EIP necessary formatting of the data.

It's good to have a high-level understanding of how signatures and signing are handled, we will be going through some examples soon.

<detail>
<summary>Spoiler</summary>

There's a bug related to signatures in Boss Bridge 😲

</details>

### Continuing With Boss Bridge

Ok, with our imports well understood, we can continue with our review of L1BossBridge.sol.

```js
contract L1BossBridge is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public DEPOSIT_LIMIT = 100_000 ether;
```

We see the contract is inheriting `Ownable`, `Pausable` and `ReentrancyGuard`. It's also using `SafeERC20 for IERC20`. Lots of security related considerations here by the developers, love to see it.

We're next declaring a `DEPOSIT_LIMIT` variable, I'm definitely curious as to how and where this is implemented. If you `ctrl+click`, you can see it's using in a conditional statement within the `depositTokensToL2` function.

```js
function depositTokensToL2(address from, address l2Recipient, uint256 amount) external whenNotPaused {
        if (token.balanceOf(address(vault)) + amount > DEPOSIT_LIMIT) {
            revert L1BossBridge__DepositLimitReached();
        }
```

Seems easy enough to understand, there's a limit to how many tokens can be deposited. We can add this note for ourselves for context if needed.

```js
IERC20 public immutable token;
L1Vault public immutable vault;
mapping(address account => bool isSigner) public signers;

error L1BossBridge__DepositLimitReached();
error L1BossBridge__Unauthorized();
error L1BossBridge__CallFailed();

event Deposit(address from, address to, uint256 amount);
```

The errors are fairly standard, but the state variables reveal and confirm valuable information. We see that `token` and `vault` are immutable, which confirms our previous suspicions that there's to be one `token` and one `vault` per `bridge`. We also see a `signers` mapping. `Signers`, we can see in the `Actor/Roles` section of the protocol README are `Users who can "send" a token from L2 -> L1.`. Setting `signers` we expect to be access controlled, so we should watch out for that.

Next we've the constructor and what seem to be some administrator functions.

```js
constructor(IERC20 _token) Ownable(msg.sender) {
    token = _token;
    vault = new L1Vault(token);
    // Allows the bridge to move tokens out of the vault to facilitate withdrawals
    vault.approveTo(address(this), type(uint256).max);
}

function pause() external onlyOwner {
    _pause();
}

function unpause() external onlyOwner {
    _unpause();
}

function setSigner(address account, bool enabled) external onlyOwner {
    signers[account] = enabled;
}
```

Importantly, we see the constructor approving `L1BossBridge` to move tokens from the `vault` - makes sense given the purpose of the bridge!

We know that this protocol is `pausable`, so we would expect to see the `pause` and `unpause` functions somewhere. Here they are, note that they are crucially modified by `onlyOwner` as they should be.

The next function is setSigner. This is what allows the protocol owner to authorize addresses to moderate the cross chain interaction of the protocol. I find myself thinking adversarially here and wondering..

```js
// @Audit-Question: What would happen if a signer was disabled mid-flight?
function setSigner(address account, bool enabled) external onlyOwner {
    signers[account] = enabled;
}
```

Maybe this question won't even apply, but it's good to adopt this mindset when trying to identify how a protocol may be vulnerable to attack.
