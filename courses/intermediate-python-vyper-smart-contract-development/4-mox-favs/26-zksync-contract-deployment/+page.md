## ZK Sync Contract Deployment

ZK Sync contract deployment is a little different than Ethereum deployments. Instead of having a blank to address, ZK Sync has a to address that's actually another contract, the Contract Deployer contract. This is the contract we used to send our contract to.

We can find the Contract Deployer's address under the "to" field on the Block Explorer, which we can verify by searching for the address in our MetaMask Wallet.

The address we found in our MetaMask Wallet is `0x0000000000000000000000000000000000000006`.

The Contract Deployer contract is actually written in Solidity, and we can find the code using the block explorer.

Here's an example of how to write the code to call the `ContractDeployer` contract:

```python
contract_deployer_contract = ContractDeployer.at("0x0000000000000000000000000000000000000006")
contract_deployer_contract.create(bytes_salt, bytes_bytecodeHash, bytes_input)
```

The code above shows the necessary parameters to call the `ContractDeployer` contract's `create` function, and the `bytes_salt`, `bytes_bytecodeHash` and `bytes_input` parameters are ones that we would have to convert our Vyper code to. The `ContractDeployer` contract will handle this conversion for us, under the hood.
