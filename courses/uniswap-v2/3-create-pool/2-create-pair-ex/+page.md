In this lesson, we will learn how to deploy a pair contract on the Uniswap V2 factory. 

We will be using the `IUniswapV2Factory` and `IUniswapV2Pair` contracts. 

First, we will need to deploy an ERC20 token. We can do this by calling the constructor of the `ERC20` contract: 

```javascript
ERC20 token = new ERC20('TEST', 'TEST', 18);
```

Then, we will need to call the `createPair` function on the Uniswap V2 Factory contract. This function takes two arguments: the address of the token0 and the address of the token1. The `createPair` function returns the address of the newly created pair contract:

```javascript
address pair;
```

The code will then get the addresses of the tokens in the pair contract. We can do this by calling the `token0` and `token1` functions on the pair contract. 

We will then need to check if the address of the token we deployed is the same as the address of WETH. We can do this by using an `if` statement. If the address of the token we deployed is the same as the address of WETH, then we will assert that the `token0` address is the same as the address of the token we deployed and that the `token1` address is the same as the address of WETH. Otherwise, we will assert that the `token0` address is the same as the address of WETH and that the `token1` address is the same as the address of the token we deployed.

The full code to deploy the pair contract is as follows:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint256);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);
    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint256) external view returns (address pair);
    function allPairsLength() external view returns (uint256);
    function createPair(address tokenA, address tokenB) external returns (address pair);
    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}
```

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Pair.sol';

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

This code will first deploy an ERC20 token called "TEST" and then deploy a pair contract using the `Uniswap V2 Factory` and the addresses of the `TEST` token and `WETH`. After that it asserts that the addresses are correct. 
