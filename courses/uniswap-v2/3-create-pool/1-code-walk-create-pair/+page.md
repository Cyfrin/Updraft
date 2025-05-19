## Deploying a Uniswap V2 Pair Contract

We'll learn about the `createPair` function inside the Uniswap V2 Factory contract.  This function deploys a Uniswap V2 Pair contract, which is responsible for managing the swapping of tokens and adding and removing liquidity. 

The `createPair` function takes two addresses as input: `tokenA` and `tokenB`.  It returns the address of the newly deployed Pair contract.

Here is how the `createPair` function works:

1. **Check for Identical Tokens:** The function first checks that `tokenA` and `tokenB` are not the same address. 

2. **Sort Tokens:**  It then sorts the two addresses alphabetically, ensuring that the smaller address is assigned as `token0` and the larger as `token1` in the Pair contract. This is important for consistent order in the Pair contract's logic.

3. **Check for Existing Pair:** The function checks if a Pair contract has already been deployed for this specific pair of tokens (`token0` and `token1`) using the `getPair` mapping.

4. **Calculate Contract Address:** If the pair hasn't been deployed, the function uses the `create2` function to calculate the address of the new Pair contract. This function is a deterministic way to calculate the address of a contract before it's actually deployed. 

5. **Deploy the Pair Contract:** The function uses the calculated address and the bytecode of the Pair contract to deploy the Pair contract.

6. **Initialize the Pair Contract:** After deployment, the function calls the `initialize` function on the newly deployed Pair contract, passing in the addresses of `token0` and `token1` as arguments. This initializes the Pair contract with the correct token information.

7. **Populate Mapping:** Finally, the function updates the `getPair` mapping with the deployed Pair contract address and the associated `token0` and `token1` addresses. This ensures that future interactions with this pair can find the correct Pair contract. 

The `create2` function is a clever trick that Uniswap V2 uses to make deploying Pair contracts more efficient. It allows the address of the Pair contract to be calculated directly from the addresses of the tokens that will be traded.  This eliminates the need for a separate deployment transaction for each new Pair contract.


---

This is the implementation process of the `createPair` function.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        // NOTE: sort tokens by address
        // address <-> 20 bytes hexadecimal <-> 160 bit number
        // 0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97 <-> 412311598482915581890913355723629879470649597847
        // address(1), address(2)
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
        // NOTE: creation code = runtime code + constructor args
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        // NOTE: deploy with create2 - UniswapV2Library.pairFor
        // NOTE: create2 addr <- keccak256(creation bytecode) <- constructor args
        // create2 addr = keccak256(0xff, deployer, salt, keccak256(creation bytecode))
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            // NOTE: pair = address(new UniswapV2Pair{salt: salt}());
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        // NOTE: call initialize to initialize contract without constructor args
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```
