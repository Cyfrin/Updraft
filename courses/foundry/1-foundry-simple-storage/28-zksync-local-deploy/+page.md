---
title: ZKsync Local Deployment
---

_Follow along with the video_

---

In this lesson, we are going to deploy the contract `SimpleStorage.sol` on a **ZKsync local chain**.

We start by verifying that the Forge version we are using is correct. By running the `forge --version` command it confirms that we are on version 0.2: this indicates we are using the right Foundry ZKsync edition.

Next, we proceed with creating a `SimpleStorage` contract using the command:

```bash
forge create src/SimpleStorage.sol:SimpleStorage --rpc_url <RPC_URL> --private_key <PRIVATE_KEY> --legacy --zksync
```

Here, `<RPC_URL>` represents ZKsync node address, such as `http://127.0.0.1:8011`.

> 👀❗**IMPORTANT**:br
> Including private keys directly in commands is not a safe practice.

This command instructs Foundry to locate the `SimpleStorage` contract in the `src/SimpleStorage.sol` file and deploy it. Upon execution, the contract compiles and deploys successfully. The output will display details such as the deployer, the deployed contract address, and the transaction hash.

::image{src='/foundry-simply-storage/27-zksync-local-deploy/deployment-successful.png' style='width: 50%; height: auto;'}

Using the `--legacy` flag is recommended for deploying simple contracts, while more complex codebases may require different approaches. Attempting to deploy without the `--legacy` flag might result in errors like `failed to serialize transaction, address to address is null`, which will be covered in future lessons.

Once you are finished, you can close Docker Desktop and revert to the Vanilla Foundry environment using the `foundryup` command.
