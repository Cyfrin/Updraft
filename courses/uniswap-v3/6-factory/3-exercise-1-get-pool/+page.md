### Exercise 1

There are two exercises for the Uniswap V3 Factory contract. In the setup, two ERC20 contracts are deployed, which will be used in the second exercise.

For exercise 1, we need to get the address of the DAI/USDC pool with a 0.1% fee. To achieve this, we'll call the `getPool` function from the `IUniswapV3Factory` contract's interface.

Here is a view of the contract setup:
```javascript
contract UniSwapV3FactoryTest is Test {
    IUniswapV3Factory private factory = IUniswapV3Factory(UNISWAP_V3_FACTORY);
    /// 3000 = 0.3%
    /// 100 = 0.01%
    uint24 private constant POOL_FEE = 100;
    ERC20 private tokenA;
    ERC20 private tokenB;

    function setup() public {
        tokenA = new ERC20("A", "A", 18);
        tokenB = new ERC20("B", "B", 18);
    }
    
    // Exercise 1 - Get the address of DAI/USDC (0.1% fee) pool
    function test_getPool() public {
        // Write your code here
        address pool;
        assertEq(pool, UNISWAP_V3_POOL_DAI_USDC_100);
    }

    // Exercise 2 - Deploy a new pool with tokenA and tokenB, 0.1% fee
    function test_createPool() public {
    }
}
```
Here is the relevant interface code:
```javascript
interface IUniswapV3Factory {
    function getPool(address tokenA, address tokenB, uint24 fee)
        external
        view
        returns (address pool);

    function createPool(address tokenA, address tokenB, uint24 fee)
        external
        returns (address pool);
}
```
