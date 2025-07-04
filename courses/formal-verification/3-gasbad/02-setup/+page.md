---
title: Setup
---

_Follow along with this video:_

---

### Setup

Alright! To get things started, you know the drill. We'll be cloning our `Gas Bad NFT Marketplace` repo.

```bash
git clone https://github.com/Cyfrin/3-gas-bad-nft-marketplace-audit.git
cd 3-gas-bad-nft-marketplace-audit
code .
```

We'll need to get our compiler prepared to use the correct version as well `0.8.20`.

```bash
solc-select install 0.8.20
solc-select use 0.8.20
```

> ❗ **PROTIP**
> If you don't have solc-select installed, you can do so by following the steps outlined [**here**](https://github.com/crytic/solc-select).

Your first step, once the repo is cloned locally, is to delete the `certora` folder. This is what we'll be walking through recreating together!

Let's crack open the README to verify the setup steps recommended by the protocol.

![setup1](/formal-verification-3/2-setup//setup1.png)

The protocol wants us to use the `make` command! This should largely set our workspace up for us by removing old modules, installing our dependencies and building the project.

> ❗ **WARNING**
> Before running `make` we should always check our foundry.toml to assure `FFI=False`, running arbitrary code while our framework has these permissions is dangerous! **Be safe!**

Lastly, before diving into the code base itself, we should see how the protocol's existing test suite looks. It seems they currently have BaseTest.t.sol which they are leveraging to compare their code bases and gas currently. Let's run it!

![setup2](/formal-verification-3/2-setup//setup2.png)

### Wrap Up

Things look good so far! Let's get begin taking a look at the code itself, in our next lesson! See you there!
