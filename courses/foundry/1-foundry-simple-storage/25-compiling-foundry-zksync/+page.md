---
title: Compiling foundry zkSync

_Follow along with the video_

---
<a name="top"></a>
When we previously ran the `forge build` command, it generated an `/out` folder in the root project directory. This folder contains all the compilation details related the Ethereum Virtual Machine (EVM) and Vanilla Foundry. To compile for the zkSync chain instead, we use the command `forge build --zk-sync`. This comand creates a new folder in our project root called `/zk-out`, and contains all the compiled code specific to zkSync Era VM.

If we need to revert to vanilla Foundry for deployment on the EVM, we simply run the command `foundryup` and then use `forge build`, which builds a standard Foundry project. Unless otherwise specified, we should continue using this method.

[Back to top](#top)