---
title: L1Vault.sol
---

_Follow along with the video lesson:_

---

### L1Vault.sol

![l1vault1](/security-section-7/8-vault/l1vault1.png)

Alright! The next most complex contract that our Solidity Metrics report identifies is `L1Vault.sol`. Let's take a look at that contract next.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @title L1Vault
/// @author Boss Bridge Peeps
/// @notice This contract is responsible for locking & unlocking tokens on the L1 or L2
/// @notice It will approve the bridge to move money in and out of this contract
/// @notice It's owner should be the bridge
contract L1Vault is Ownable {
    IERC20 public token;

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    function approveTo(address target, uint256 amount) external onlyOwner {
        token.approve(target, amount);
    }
}
```

We know from our protocol diagram that this contract is responsible for holding the L1Tokens being bridged. It's nice to see the NATSPEC present, giving some explicit idea as to what this contract is meant to do.

From the NATSPEC,

    /// @notice This contract is responsible for locking & unlocking tokens on the L1 or L2
    /// @notice It will approve the bridge to move money in and out of this contract
    /// @notice It's owner should be the bridge

Ok, this actually gives us some important information. L1BossBridge.sol should be the owner of the L1Vault. Adopting our attacker's mindset, we may be asking:

**_Can I make the owner NOT the bridge?_**

Typically I would want to see how the protocol's deployment is being handled in this case. We'd want to assure that L1Vault's owner _is_ in fact the bridge. Unfortunately, the Boss Bridge devs haven't provided us with a deployment folder/script. This is something I would definitely call out in a report. Deployment processes should also be tested and reviewed.

With that said, if L1BossBridge.sol is meant to be the owner of the L1Vault, we should look at L1BossBridge and see how it's handling things.

```js
contract L1BossBridge is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public DEPOSIT_LIMIT = 100_000 ether;

    IERC20 public immutable token;
    L1Vault public immutable vault;
    mapping(address account => bool isSigner) public signers;

    error L1BossBridge__DepositLimitReached();
    error L1BossBridge__Unauthorized();
    error L1BossBridge__CallFailed();

    event Deposit(address from, address to, uint256 amount);

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
        vault = new L1Vault(token);
        // Allows the bridge to move tokens out of the vault to facilitate withdrawals
        vault.approveTo(address(this), type(uint256).max);
    }
```

We can see the the `vault` variable is declared as immutable and that it's initialized within L1BossBridge's constructor. There's probably no `failure-to-initialize` vulnerability here, but it was absolutely worth checking.

### Continuing Down L1Vault.sol

Back to `L1Vault.sol`, following the NATSPEC, we see the contract is `Ownable` which we'd expect, given what we just learnt.

```js
contract L1Vault is Ownable {...}
```

From here, the constructor tells us that each `L1Vault` is meant to work with 1 token, this is good to know and probably worth making a note of.

```js
// @Audit-Note: One vault per token is intended.
constructor(IERC20 _token) Ownable(msg.sender) {
    token = _token;
}
```

We also see this function as being ownable and expect msg.sender in this circumstance to be the `L1BossBridge` contract.

The final function in `L1Vault.sol` is an `approveTo` function.

```js
function approveTo(address target, uint256 amount) external onlyOwner {
    token.approve(target, amount);
}
```

Hmm, at first glance, this doesn't seem like an issue. It's modified by `onlyOwner` and as such we know only the `L1BossBridge` can call this function. It's possible this is a function to assist the bridge in moving funds in and out of the vault, but it's kind of hard to say.

If this is a case of the bridge being approved to move tokens, why isn't this something we're hardcoding? I don't love how this feels. I'm definitely going to leave a note to come back to this function later.

```js
// @Audit-Question: Why not just hard-code the approval to only the bridge?
```

Otherwise this contract looks not bad, at least one raised eyebrow. Let's keep going, see you in the next lesson!
