## Creating a Cross-Chain Rebase Token Smart Contract with CCIP

We will be using CCIP and Forge to create a smart contract for a rebase token. 

We will first create a directory:

```bash
mkdir ccip-rebase-token
```

Then we will go inside the directory and initialize Forge:

```bash
cd ccip-rebase-token
forge init
```

We will walk through the creation of the smart contract step by step.

###  Setting up the Structure

We will start by creating the `RebaseToken.sol` file, and then write out the basic smart contract structure.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "forge-std/Test.sol";

interface Vault {
    function deposit(uint256 amount, address to) external;
    function withdraw(uint256 amount, address to) external;
    function totalRebaseTokens() external view returns(uint256);
}

interface CCIPReceiver {
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns(bytes4);
}

contract RebaseToken is ERC20, ERC20Burnable, AccessControl, CCIPReceiver {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor() ERC20("RebaseToken", "RBT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function rebase(uint256 rebaseAmount, uint256 vaultTotalRebaseTokens) public onlyRole(MINTER_ROLE) {
        // 1. Calculate the rebase scale
        uint256 scale = rebaseAmount * 10**decimals / vaultTotalRebaseTokens;
        // 2. Iterate through the rebase tokens and adjust the balance based on the rebase scale
        // 3. Adjust the global interest rate based on the rebaseAmount
        // 4. Update the vaultTotalRebaseTokens
        // 5. Emit a rebase event
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) public override returns(bytes4) {
        // 1. Call the Vault contract to deposit the rebase token
        // 2. If the rebase amount is different to the amount deposited, rebase
        Vault vault = Vault(address(uint160(uint256(data))));
        vault.deposit(tokenId, from);
        
        return this.onERC721Received.selector;
    }
}
```