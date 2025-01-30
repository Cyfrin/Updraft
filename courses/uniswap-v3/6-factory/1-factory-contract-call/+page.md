### Uniswap V3 Factory Contract Calls

Uniswap V3 uses `create2` to deploy the pool contract. Because of this, the addresses of the pool contracts can be determined before they are deployed. However, the way the factory contract deploys the pool contracts is not straightforward. In this lesson we will review how to compute a contract address using `create2`.

First, to compute the address, we need to take the `keccak256` of the following inputs:
```javascript
0xff, deployer, salt, keccak256(creation bytecode, constructor inputs)
```
The first input will be `0xff`, and the next input is the address of the deployer, the address that deploys the contract. Next, will be a random 32 bytes called `salt`. This will be specified by the deployer. Next is the `keccak256` of the contract's creation bytecode. When you compile and deploy a contract, two bytecodes are produced. The first is the creation bytecode. The creation bytecode will be executed and do some setup and deploy the runtime bytecode. Broadly speaking, the creation bytecode is the bytecode of the contract and the constructor. Finally, the last input is the constructor inputs.

After taking the `keccak256` of these inputs, you would take the last 20 bytes. This will produce the address determined by create2.  Notice that, since we are taking the `keccak256`, there are several inputs that can change the address. The things that can change the address are the address of the deployer, the salt specified by the deployer, and the inner `keccak256`. Assuming that we are deploying the same contract, the creation bytecode will always be the same and the constructor inputs might be different.  Assuming that the deployer and the contract we are deploying are the same, there are two parts that will change the address of the contract, the salt and constructor inputs.

Why do we need this salt? Imagine we want to deploy the same contract with different addresses but the same constructor inputs. For example, you might want to deploy multiple ERC20 contracts with the same constructor inputs. In this case, you need to change the salt to get a different address. 

Next, we will look at how Uniswap V3 uses `create2` to deploy a pool contract. The address of the Uniswap V3 pool contract is determined by taking the last 20 bytes of the `keccak256` of the following inputs:
```javascript
0xff, deployer = factory contract, salt = keccak256(token0, token1, fee), keccak256(creation bytecode)
```
Here the deployer is the factory contract and the salt is the `keccak256` of `token0`, `token1`, and `fee`. For the last input, we take the `keccak256` of the creation bytecode of the Uniswap V3 Pool. Notice that there are no constructor inputs.  

Because the Uniswap V3 pool contract does not have any constructor inputs, we need to specify a unique salt so that we can deploy the Uniswap V3 pool contract at different addresses.

To understand why the pool address is calculated in that manner, we first need to understand the goals when a Uniswap V3 pool contract is deployed.

First the pool address must be determined by:
-   token0
-   token1
-   fee
If we know token0, token1, and fee, we can calculate the address of the pool contract. Second, we want to initialize the contract with these parameters:
-   token0
-   token1
-   fee
-   factory address
-   tick spacing
These must be set within the pool contract.
Looking at the first goal, this is achieved using the salt and constructor inputs. The pool address is determined by `token0`, `token1` and `fee`. This means that `token0`, `token1`, and `fee` must be in the `salt` or constructor inputs. Given that the factory contract address and the contract we are deploying are the same, the only two inputs that we can play around with are the `salt` and the constructor inputs.

However, looking at the second goal, we need to initialize the contract with more parameters, `token0`, `token1`, `fee`, factory address, and tick spacing. Also, the factory address and tick spacing cannot be constructor inputs, and they cannot be part of the salt either because that would break the first goal that requires that the salt be determined by `token0`, `token1` and `fee`.

The solution is to set the salt as the `keccak256` of `token0`, `token1`, and `fee` and there are no constructor inputs. This achieves the first goal. To achieve the second goal, we will temporarily store the initialization inputs inside the factory. When the Uniswap V3 pool contract is deployed, it will read this data from the factory contract.

Let us take a look at how this is actually executed. First, to deploy the Uniswap V3 pool contract, a user will call the function `createPool` on the Uniswap V3 factory contract. Next, the factory contract will store the following initialization parameters, the factory, token0, token1, fee, and tick spacing, as a state variable inside the factory contract. Then it will deploy the Uniswap V3 Pool using `create2`. The initialization parameters are not passed into the constructor of the new contract.  Inside the constructor of the Uniswap V3 pool contract, it will get these initialization parameters from the message sender. The message sender here will be the factory contract. Finally, once the Uniswap V3 Pool contract is deployed, the initialization parameters will be deleted by the factory contract. This is the call trace for the function `createPool`.
```javascript
createPool(token0, token1, fee)
    deploy(factory, token0, token1, fee, tickSpacing)
        new UniswapV3Pool()
           salt = keccak256(token0, token1, fee)
           get parameters from msg.sender
           delete parameters
```
