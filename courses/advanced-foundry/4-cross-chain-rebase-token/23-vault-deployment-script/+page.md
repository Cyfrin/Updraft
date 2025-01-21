## Vault Deployment Script

Let's go and make some of our scripts. Now, the first script that we're going to want to make is a `deployer.s.sol`. Let's make that little file in there, and so we can start with 
```javascript
SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
```
And in here we're going to want to deploy the rebase token, the rebase token pool and the vault, and then set all of the permissions for CCIP. So, first thing we need to import is 
```javascript
import Script from "forge-std/Script.sol";
```
from the forge standard library. And then, let's make our contract. We're going to make a token deployer 
```javascript
contract TokenDeployer is Script {
```
and then the second token and pool deployer 
```javascript
contract TokenAndPoolDeployer is Script {
```
and then the second contract we're going to make is going to be the vault deployer. 
```javascript
contract VaultDeployer is Script {
```
And the reason we're doing this separately is because we only want to deploy the vault on the source chain because we only want to allow deposits and redemptions on the source chain, not on the destination chain. However, we want tokens and pools on both chains. So, we're going to have to split it up like this. 
```javascript
Script
```
Now, this one is a little bit easier. So let's do that one first. So, we can 
```javascript
import Vault from "./src/Vault.sol";
import IRebaseToken from "./src/interfaces/IRebaseToken.sol";
```
Then in this script, we're going to create a function called `run`, which takes as an argument the address of the rebase token, because we need to pass this through as a constructor argument, because if we go into our vault contract, you can see that it takes an `IRebaseToken`, a rebase token as a constructor argument. We then also going to need to import 
```javascript
import IRebaseToken from "./src/interfaces/IRebaseToken.sol";
```
Then in here we need to do 
```javascript
vm.startBroadcast();
```
and then we can also do a little 
```javascript
vm.stopBroadcast();
```
to make sure that we do stop it. Then we need to deploy our vault, so we can say type is the contract vault and then we're going to make a little lowercase vault 
```javascript
vault = new Vault(IRebaseToken(_rebaseToken));
```
and then the constructor arguments is `IRebaseToken` because we need to cast it to the type. Then we need to claim the mint and burn role. Oh, I've just realised I have forgotten the visibility, which is public. Then we need to grant the mint and burn role on the rebase token that we pass through. 
```javascript
IRebaseToken _rebaseToken.grantMintAndBurnRole(address(vault));
```
Because it needs to be able to do that. address vault, and we need to cast it to an address because this function takes an address. And we also need to add grant mint and burn role to our interface. 
```javascript
function grantMintAndBurnRole(address account) external;
```
Right, let's go back to our deployer. We get that wrong. external. takes an address and account. Doesn't return anything. Did I put it in the right interface? Yep. Interfaces. Okay. I just cut it and then pasted the line back in and it has gone away. Sometimes you have to do that because the error persists even though the error is no longer there. So, that's fixed. So then we want to return this vault contract from this script so that we can see the address. So, we can add a little returns type vault, vault. And we don't actually then need to declare what the type of this is down here because it will automatically return this vault now, even without the return keyword. So, now we have made a script to deploy the vault contract. 
```javascript
function run(address _rebaseToken) public returns (Vault vault) {
        vm.startBroadcast();
        vault = new Vault(IRebaseToken(_rebaseToken));
        IRebaseToken(_rebaseToken).grantMintAndBurnRole(address(vault));
        vm.stopBroadcast();
    }
}
```