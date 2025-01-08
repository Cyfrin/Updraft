---
title: Executing the Anvil Script
---

_Follow along with the video_

---

Now that the file `Interact.s.sol` is complete, we can execute it using the following command:

```bash
forge script script/Interact.s.sol:ClaimAirdrop --rpc-url http://localhost:8545 --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d --broadcast
```

Here we are utilizing the **second Anvil key** to claim tokens and covering gas fees as a third-party address. The airdropped tokens will be then sent to the first Anvil address CLAIMING_ADDRESS we hardcoded in our script.

After that, we can verify if the first Anvil address, `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`, has in fact received the airdrop:

```bash
cast call 0x5FbDB2315678afecb367f032d93F642f64180aa3 "balanceOf(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

cast will respond with the `0x000000000000000000000000000000000000000000000015af1d78b58c40000` hex number, which we can convert into decimal format with:

```bash
cast --to-dec 0x000000000000000000000000000000000000000000000015af1d78b58c40000
```

This conversion will reveal the actual amount airdropped to the first Anvil account, which is equivalent to 25 Bagel tokens
