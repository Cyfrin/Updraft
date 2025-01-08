## The Vault Contract

We're going to create a new file, called `vault.sol`. 

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Vault {

    // we need to pass the token address to the constructor
    // create a deposit function that mints tokens to the user and sends the underlying tokens to the contract
    // create a redeem function that burns tokens from the user and sends the user ETH
    // create a way to add rewards to the vault

    // State variables
    address public i_rebaseToken;

    // Events
    event Deposit(address indexed user, uint256 amount);
    event Redeem(address indexed user, uint256 amount);

    // Constructor
    constructor(address rebaseToken) {
        i_rebaseToken = rebaseToken;
    }

    receive() external payable {}

    function deposit() external payable {
        // we need to use the amount of ETH the user has sent to mint tokens to the user
        i_rebaseToken.mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function redeem(uint256 amount) external {
        // 1. burn the tokens from the user
        i_rebaseToken.burn(msg.sender, amount);
        // 2. we need to send the user ETH
        (bool success,) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert Vault_RedeemFailed();
        }
        emit Redeem(msg.sender, amount);
    }

    function getRebaseTokenAddress() external view returns (address) {
        return address(i_rebaseToken);
    }
}
```

We're going to create a new file, called `iRebaseToken.sol`. 

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface iRebaseToken {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
    function setInterestRate(uint256 newInterestRate) external;
    function grantMintAndBurnRole(address account) external;
    function getInterestRate() external view returns (uint256);
    function getUserInterestRate(address user) external view returns (uint256);
    function getLastUpdatedTimestamp(address user) external view returns (uint256);
}
```

We're going to make sure this address conforms to our `iRebaseToken` interface. We'll import our interface and then change the type of `i_rebaseToken`. 

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/iRebaseToken.sol";

contract Vault {

    // State variables
    iRebaseToken private immutable i_rebaseToken;

    // Events
    event Deposit(address indexed user, uint256 amount);
    event Redeem(address indexed user, uint256 amount);

    // Constructor
    constructor(address rebaseToken) {
        i_rebaseToken = iRebaseToken(rebaseToken);
    }

    receive() external payable {}

    function deposit() external payable {
        // we need to use the amount of ETH the user has sent to mint tokens to the user
        i_rebaseToken.mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function redeem(uint256 amount) external {
        // 1. burn the tokens from the user
        i_rebaseToken.burn(msg.sender, amount);
        // 2. we need to send the user ETH
        (bool success,) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert Vault_RedeemFailed();
        }
        emit Redeem(msg.sender, amount);
    }

    function getRebaseTokenAddress() external view returns (address) {
        return address(i_rebaseToken);
    }
}
```

The final thing we'll do is add some NatSpec comments.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/iRebaseToken.sol";

contract Vault {

    // State variables
    iRebaseToken private immutable i_rebaseToken;

    // Events
    event Deposit(address indexed user, uint256 amount);
    event Redeem(address indexed user, uint256 amount);

    // Constructor
    constructor(address rebaseToken) {
        i_rebaseToken = iRebaseToken(rebaseToken);
    }

    /** @notice Allows users to deposit ETH into the vault and mint rebase tokens in return */
    receive() external payable {}

    /** @notice Deposit ETH into the vault
     * @dev we need to use the amount of ETH the user has sent to mint tokens to the user
     */
    function deposit() external payable {
        i_rebaseToken.mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    /** @notice Allows users to redeem their rebase tokens for ETH
     * @param amount The amount of rebase tokens to redeem
     */
    function redeem(uint256 amount) external {
        // 1. burn the tokens from the user
        i_rebaseToken.burn(msg.sender, amount);
        // 2. we need to send the user ETH
        (bool success,) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert Vault_RedeemFailed();
        }
        emit Redeem(msg.sender, amount);
    }

    /** @notice Get the address of the rebase token */
    function getRebaseTokenAddress() external view returns (address) {
        return address(i_rebaseToken);
    }
}
```

We add the `indexed` keyword to `user` for our events. This allows us to filter events based on the address. 

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/iRebaseToken.sol";

contract Vault {

    // State variables
    iRebaseToken private immutable i_rebaseToken;

    // Events
    event Deposit(address indexed user, uint256 amount);
    event Redeem(address indexed user, uint256 amount);

    error Vault_RedeemFailed();

    // Constructor
    constructor(address rebaseToken) {
        i_rebaseToken = iRebaseToken(rebaseToken);
    }

    /** @notice Allows users to deposit ETH into the vault and mint rebase tokens in return */
    receive() external payable {}

    /** @notice Deposit ETH into the vault
     * @dev we need to use the amount of ETH the user has sent to mint tokens to the user
     */
    function deposit() external payable {
        i_rebaseToken.mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    /** @notice Allows users to redeem their rebase tokens for ETH
     * @param amount The amount of rebase tokens to redeem
     */
    function redeem(uint256 amount) external {
        // 1. burn the tokens from the user
        i_rebaseToken.burn(msg.sender, amount);
        // 2. we need to send the user ETH
        (bool success,) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert Vault_RedeemFailed();
        }
        emit Redeem(msg.sender, amount);
    }

    /** @notice Get the address of the rebase token */
    function getRebaseTokenAddress() external view returns (address) {
        return address(i_rebaseToken);
    }
}
```