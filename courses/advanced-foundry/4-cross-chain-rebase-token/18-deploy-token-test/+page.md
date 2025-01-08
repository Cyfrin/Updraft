## Deploy the token test

We will be following the key steps you saw in the previous video:

1. **Deploying tokens**: Once our tokens are deployed, we will deploy `RebasedToken` and `RebasedTokenPool` contracts on Avalanche Fuji and Sepolia testnets. 
2. **Claiming and Accepting Roles**:  We will claim `mint` and `burn` roles for the token pools, allowing transfers and ensuring proper handling of assets across chains. 
3. **Linking Tokens to Pools**: We will link the tokens to the pools for the token pools, allowing transfers and ensuring proper handling of assets across chains. 

We will cover the key steps. 

First we need to deploy our tokens on the source chain, in this case sepolia. 

```javascript
contract CrossChainIsTest is Test {

    address constant owner = makeAddr("owner");
    uint256 sepoliaFork;
    uint256 arbSepoliaFork;

    CCIPLocalSimulatorFork ccipLocalSimulatorFork;
    
    RebasedToken sepoliaToken;
    RebasedToken arbSepoliaToken;

    function setup() public {
        sepoliaFork = vm.createSelectFork("sepolia");
        arbSepoliaFork = vm.createSelectFork("arb-sepolia");
        ccipLocalSimulatorFork = new CCIPLocalSimulatorFork();
        vm.makePersistent(address(ccipLocalSimulatorFork));

        // 1. Deploy and configure on Sepolia
        vm.startPrank(owner);
        sepoliaToken = new RebasedToken();
        vm.stopPrank();

        // 2. Deploy and configure on Arbitrum Sepolia
        vm.selectFork(arbSepoliaFork);
        vm.startPrank(owner);
        arbSepoliaToken = new RebasedToken();
        vm.stopPrank();
    }
}
```

Now, we can deploy our tokens on the destination chain, in this case, Arbitrum Sepolia. 

Now, we need to deploy our vaults. 

```javascript
contract Vault {
    IRebasedToken private immutable _rebaseToken;

    event Deposit(address indexed user, uint256 amount);
    event Redeem(address indexed user, uint256 amount);

    error Vault_RedeemFailed();

    constructor(IRebasedToken rebaseToken) {
        _rebaseToken = rebaseToken;
    }

    receive() external payable {}

    /// @notice Allows users to deposit ETH into the vault and mint rebase tokens in return
    function deposit() external payable {
        // we need to use the amount of ETH the user has sent to mint tokens to the user 
        uint256 interestRate = _rebaseToken.getInterestRate();
        _rebaseToken.mint(msg.sender, msg.value, interestRate);

        emit Deposit(msg.sender, msg.value);
    }

    /// @param amount The amount of rebase tokens to redeem for ETH
    /// @notice Allows users to redeem their rebase tokens for ETH
    function redeem(uint256 amount) external {
        if (_rebaseToken.balanceOf(msg.sender) < amount) {
            revert Vault_RedeemFailed();
        }
        _rebaseToken.burn(msg.sender, amount);

        (bool success, ) = msg.sender.call{ value: amount }('');
        require(success, "Vault_RedeemFailed");

        emit Redeem(msg.sender, amount);
    }
}
```

We will only be deploying the vault on sepolia, as this is where users will be able to deposit and redeem. 

We can now deploy our pools on the destination chain, in this case, Arbitrum Sepolia. 

```javascript
contract RebasedTokenPool is TokenPool {
    constructor(IERC20 token, address memory allowList, address memory rmProxy, address router) 
    TokenPool(token, allowList, rmProxy, router) {}
}
```

The next step we need to cover is claiming and accepting roles. We will need to claim the mint and burn roles for both of our token pools.  

```javascript
contract CrossChainIsTest is Test {
    // ...
    function setup() public {
        // ...

        // 1. Deploy and configure on Sepolia
        vm.startPrank(owner);
        sepoliaToken = new RebasedToken();
        vault = new Vault(sepoliaToken);
        vm.stopPrank();

        // 2. Deploy and configure on Arbitrum Sepolia
        vm.selectFork(arbSepoliaFork);
        vm.startPrank(owner);
        arbSepoliaToken = new RebasedToken();
        vm.stopPrank();
    }
}
```

The final step we need to cover is linking tokens to pools. We will do this in the following manner.  

```javascript
contract CrossChainIsTest is Test {
    // ...
    function setup() public {
        // ...

        // 1. Deploy and configure on Sepolia
        vm.startPrank(owner);
        sepoliaToken = new RebasedToken();
        vault = new Vault(sepoliaToken);
        vm.stopPrank();

        // 2. Deploy and configure on Arbitrum Sepolia
        vm.selectFork(arbSepoliaFork);
        vm.startPrank(owner);
        arbSepoliaToken = new RebasedToken();
        vm.stopPrank();
    }
}
```

We will cover the final step of linking the tokens to the pools in the next video. 

