## Access Control

We will add some access control in our rebase token contract by using OpenZeppelin's `Ownable` and `AccessControl` contracts. 

First, we will import `Ownable` and `AccessControl`.  

```javascript
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
```

Then, we will inherit `Ownable` and `AccessControl` in our contract declaration.

```javascript
contract RebaseToken is ERC20, Ownable, AccessControl {
```

Next, we will create a constant byte32 role called `MINT_AND_BURN_ROLE`.

```javascript
bytes32 private constant MINT_AND_BURN_ROLE = keccak256("MINT_AND_BURN_ROLE");
```

In the constructor, we will grant the `MINT_AND_BURN_ROLE` to the message sender.

```javascript
constructor() ERC20("Rebase Token", "RBT") Ownable() AccessControl() {
  _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  _grantRole(MINT_AND_BURN_ROLE, msg.sender);
}
```

Now, we will create a function called `grantMintAndBurnRole` which will grant the `MINT_AND_BURN_ROLE` to an address.

```javascript
function grantMintAndBurnRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
  _grantRole(MINT_AND_BURN_ROLE, account);
}
```

We will also add the `onlyRole` modifier to our `mint` and `burn` functions.

```javascript
function mint(address to, uint256 amount) external onlyRole(MINT_AND_BURN_ROLE) {
  mintAccruedInterest(to);
  _mint(to, amount);
}

function burn(address from, uint256 amount) external onlyRole(MINT_AND_BURN_ROLE) {
  if (amount == type(uint256).max) {
    amount = balanceOf(from);
  }
  mintAccruedInterest(from);
  _burn(from, amount);
}
```

We will also add the `onlyRole` modifier to our `setInterestRate` function.

```javascript
function setInterestRate(uint256 newInterestRate) external onlyRole(DEFAULT_ADMIN_ROLE) {
  if (newInterestRate <= s_interestRate) {
    revert RebaseToken__InterestRateCanOnlyDecrease(s_interestRate, newInterestRate);
  }
  s_interestRate = newInterestRate;
  emit InterestRateSet(newInterestRate);
}
```

We will also create a function called `grantRole` that will grant the specified role to an account.

```javascript
function grantRole(bytes32 role, address account) public virtual onlyRole(getRoleAdmin(role)) {
  _grantRole(role, account);
}
```