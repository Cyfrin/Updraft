## Uniswap v2 Factory - Create Pair 

In this lesson, we'll learn how to create a Uniswap v2 pair contract using the Uniswap v2 Factory. 

We'll create a new test file called `uniswapV2Factory.test.sol`. 

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint256);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);
    function getPair(address tokenA, address tokenB) external view returns (address);
    function allPairs(uint256) external view returns (address);
    function allPairsLength() external view returns (uint256);
    function createPair(address tokenA, address tokenB) external returns (address pair);
    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}

contract UniswapV2FactoryTest is Test {
    IUniswapV2Factory private constant WETH_FACTORY = IUniswapV2Factory(UNISWAP_V2_FACTORY);
    address private constant WETH = address(0);
    
    function testCreatePair() public {
        // Exercise - deploy `token` - WETH pair contract
        // Write your code here 
        // Don't change any other code
        //
        address pair;

        // YOUR CODE HERE 
    }
}
```

The first thing we'll do is assign the address of the pair contract to the `address pair` variable. We'll use the `createPair()` function from our factory, and we'll pass in the address of our token and the address of WETH as arguments. The `createPair()` function returns the address of the pair contract. 

We'll write:

```javascript
address pair = factory.createPair(address(token), WETH);
```

Next, we'll need to access the `token0` and `token1` addresses, which are the addresses of the two tokens in the pair. We'll do this by using the `IUniswapV2Pair` interface. We'll cast the pair address to the `IUniswapV2Pair` interface and then call the `token0()` and `token1()` functions, and then we'll assign these addresses to the `address token0` and `address token1` variables.

We'll write:

```javascript
address token0 = IUniswapV2Pair(pair).token0();
address token1 = IUniswapV2Pair(pair).token1();
```

The order of the tokens that we pass to the `createPair()` function doesn't matter. If the address of the token is less than the address of WETH, then `token0` is our token and `token1` is WETH.  Otherwise, `token0` is WETH and `token1` is our token. We'll check this by using an if/else statement and using the `assertEq()` function. 

We'll write:

```javascript
if (address(token) < WETH) {
  assertEq(token0, address(token), "token 0");
  assertEq(token1, WETH, "token 1");
} else {
  assertEq(token0, WETH, "token 0");
  assertEq(token1, address(token), "token 1");
}
```

We'll run our test using the fork URL from our `.env` file. We'll copy the fork URL from our `.env` file and paste it into our terminal. Then we'll execute the test with the following command. 

```bash
forge test --fork-url $FORK_URL --mp test/uniswap-v2/solutions/UniswapV2Factory.test.sol -vvvv
```

We can see that the test passes. 
