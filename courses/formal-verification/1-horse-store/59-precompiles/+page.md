---
title: Precompiles
---

_Follow along with this video:_

---

### Precompiles

One tricky thing that stands out, which we haven't gone over are `precompiles`. So let's quickly detail how they work.

`Precompiles` are effectively fixed address contracts that come bundled with the EVM and perform certain tasks. They function similarly to opcodes when compiled and are worth keeping an eye out for when decompiling contracts.

If you see a hardcoded address in a contract's opcodes, they may be working with a precompile. Similarly, if you see STATICCALL being used on a weird address like `0x01`, they may as well being interacting with a precompile.

We briefly touch on a couple precompiles such as `ecrecover` and `SHA2-256` in the [Security Course on Cyfrin Updraft](https://updraft.cyfrin.io/courses/security), so definitely check that out.

Take a look at precompiles [here on evm.codes](https://www.evm.codes/precompiled) to become more familiar.
