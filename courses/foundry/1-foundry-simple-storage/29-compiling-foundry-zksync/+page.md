---
title: Compiling foundry ZKsync
---

_Follow along with the video_

---

> Previously, when we ran the `forge build` command, it generated an `/out` folder in the root project directory. This folder contains all the compilation details related the Ethereum Virtual Machine (EVM) and Vanilla Foundry. To compile for the ZKsync chain instead, we use the command `forge build --zksync`. This command creates a new folder in our project root called `/zkout`, and contains all the compiled code compatible to the ZKsync Era VM.

If we need to revert to vanilla Foundry for deployment on the EVM, we simply run the command `foundryup` and then use `forge build`, which builds a standard Foundry project. Unless otherwise specified, we should continue using this method.
