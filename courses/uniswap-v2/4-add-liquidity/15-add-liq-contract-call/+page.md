Before diving into the code of Uniswap V2, let's walk through the different smart contracts that are involved in adding liquidity.

We'll use the example of adding liquidity to the DAI/WETH pool.

1. The user will call the `addLiquidity` function of the router contract.

2. The router contract will determine if the DAI/WETH pool exists.

3. If the DAI/WETH pair contract does not exist, the factory contract will deploy the pair contract using the `createPair` function.

4. The router contract will then transfer DAI and WETH from the user to the pair contract.

5. The router contract will call the `mint` function of the pair contract.

6. The pair contract will determine how many liquidity provider (LP) tokens to mint based on the amount of DAI and WETH that was deposited. The pair contract will then return the LP tokens to the user.

![Pasted image 20250417064958](https://github.com/user-attachments/assets/7ba8cd39-16f9-4b05-867b-8199c4e25f70)
