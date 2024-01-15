---
title: Reporting - Unchanged State Variables Should Be Immutable Or Constant
---

_Follow along with this video:_

---

### Unchanged State Variables Should Be Constant or Immutable

Searching for our @Audit comment again, it looks like the next finding we identified was:

```js
// @Audit-Gas: raffleDuration doesn't change and should be immutable.
```

Now, just a few lines further in the contract, we've also noted that several variables should be `constant`.

```js
// @Audit-Gas: Unchanged state variables can be marked as constant
string private commonImageUri = "ipfs://QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8";
string private rareImageUri = "ipfs://QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW";
string private legendaryImageUri = "ipfs://QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU";
```

We should compile these into a single gas issue in our `findings.md` document.

```md
#Gas

### [G-1] Unchanged state variables should be declared constant or immutable

Reading from storage is much more expensive than reading a constant or immutable variable.

Instances:

- `PuppyRaffle::raffleDuration` should be `immutable`
- `PuppyRaffle::commonImageUri` should be `constant`
- `PuppyRaffle::rareImageUri` should be `constant`
- `PuppyRaffle::legendaryImageUri` should be `constant`
```

Great! Done! Make note in the contract that we've written up this finding and lets move on to the next.
