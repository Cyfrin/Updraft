## Understanding Uniswap v4 Hook Addresses and Permissions

In Uniswap v4, hooks introduce a powerful way to customize pool behavior. However, a critical aspect that sets them apart is how their permissions are managed. The address of a hook contract is not arbitrary; it is a carefully crafted identifier that encodes its own permissions, acting as a security feature and an on-chain declaration of its capabilities. This system is enforced directly by the core protocol, making it both secure and remarkably gas-efficient.

The central idea is that the lowest 14 bits of a hook contract's address are used as a bitmap—a series of on/off flags. Each bit in this bitmap corresponds to a specific hook callback function (e.g., `beforeSwap`, `afterInitialize`). If a bit is set to `1`, the `PoolManager` is permitted to call the corresponding function on that hook. If the bit is `0`, any attempt to invoke that function will be ignored or reverted by the `PoolManager`.

This design presents a unique challenge for developers. You cannot simply deploy a hook contract and use its resulting, unpredictable address. Instead, you must use the `CREATE2` opcode, which allows a contract to be deployed to a pre-computable, deterministic address. To find a valid address, you must "mine" for a specific `salt` (a 32-byte arbitrary value) that, when combined with your deployer address and contract bytecode, produces an address with the correct permission bits.

Let's explore how these concepts work together, from the flag definitions to the mining process.

### The Core Mechanism: Bitwise Flags and Address-Based Permissions

Instead of storing a hook's permissions in contract storage—which would consume gas for every check—Uniswap v4 embeds them directly into the contract's 160-bit address. This is achieved through a system of bitwise flags defined in the `Hooks.sol` library.

#### Defining the Flags in `Hooks.sol`

The `Hooks.sol` library contains a series of `uint160` constants, where each constant represents a single permission flag. A bit shift operation (`1 << n`) is used to set a specific bit to `1`.

```solidity
// From v4-core/src/libraries/Hooks.sol
library Hooks {
    uint160 internal constant ALL_HOOK_MASK = uint160((1 << 14) - 1);

    uint160 internal constant BEFORE_INITIALIZE_FLAG = 1 << 13;
    uint160 internal constant AFTER_INITIALIZE_FLAG = 1 << 12;
    uint160 internal constant BEFORE_ADD_LIQUIDITY_FLAG = 1 << 11;
    uint160 internal constant AFTER_ADD_LIQUIDITY_FLAG = 1 << 10;
    // ...
    uint160 internal constant BEFORE_SWAP_FLAG = 1 << 7;
    uint160 internal constant AFTER_SWAP_FLAG = 1 << 6;
    // ...
}
```

To enable multiple hooks, these flags are combined using the bitwise OR (`|`) operator. For instance, to create a hook that implements both `beforeSwap` and `afterSwap`, you would combine their flags like this: `BEFORE_SWAP_FLAG | AFTER_SWAP_FLAG`.

#### Enforcing Permissions in the `PoolManager`

The `PoolManager` uses a simple and efficient function in the `Hooks.sol` library to verify permissions before making an external call to a hook.

```solidity
// From v4-core/src/libraries/Hooks.sol
function hasPermission(IHooks self, uint160 flag) internal pure returns (bool) {
    return uint160(address(self)) & flag != 0;
}
```

This function performs a bitwise AND (`&`) operation between the hook's address and the flag being checked.
1.  `address(self)` retrieves the hook contract’s address.
2.  The address is cast to `uint160`.
3.  The bitwise `&` compares the bits of the address with the bits of the flag.
4.  If the bit corresponding to the flag is set to `1` in the hook's address, the result of the `&` operation will be a non-zero value, and the function returns `true`. Otherwise, it returns `false`.

When the `PoolManager` needs to invoke a hook, such as `afterSwap`, it first calls this permission-checking function. Only if `hasPermission` returns `true` does the `PoolManager` proceed with the external call to the hook contract.

### Finding a Valid Address: `CREATE2` and Salt Mining

Because a hook's address must conform to a specific bitmask, it must be generated deterministically. This is where Ethereum's `CREATE2` opcode becomes essential. `CREATE2` allows you to calculate a contract's deployment address upfront based on four inputs: the deployer's address, a `salt`, the contract's creation code, and its constructor arguments.

By iterating through different `salt` values, you can "mine" or brute-force search for an address that satisfies your required permission flags. To simplify this, the Uniswap v4 periphery repository provides a utility contract, `HookMiner.sol`.

#### Using `HookMiner.sol` to Find the Salt

The `HookMiner.sol` contract automates the search for a valid `salt` and address. You provide it with your desired flags and contract details, and it performs the brute-force search on-chain.

```solidity
// From v4-periphery/src/utils/HookMiner.sol
function find(
    address deployer,
    uint160 flags,
    bytes memory creationCode,
    bytes memory constructorArgs
) internal view returns (address hookAddress, bytes32 salt) {
    // ...
    for (uint256 i; i < MAX_LOOP; salt = bytes32(++i)) {
        hookAddress = computeAddress(deployer, salt, creationCodeWithArgs);

        if (uint160(hookAddress) & FLAG_MASK == flags && hookAddress.code.length == 0) {
            return (hookAddress, salt);
        }
    }
    revert("HookMiner: could not find salt");
}
```

This function loops through potential `salt` values, calculates the resulting `hookAddress` for each, and checks if its lowest 14 bits match the `flags` you provided. Once it finds a match, it returns both the valid address and the `salt` needed to deploy the contract to that address.

### A Practical Example: Deploying a `CounterHook`

Let's walk through the process of deploying a `CounterHook` that requires permissions for `beforeAddLiquidity`, `beforeRemoveLiquidity`, `beforeSwap`, and `afterSwap`.

**Step 1: Combine the Required Flags**

First, define the total permission set by combining the individual flags using the bitwise OR operator.

```solidity
uint160 flags = Hooks.BEFORE_ADD_LIQUIDITY_FLAG
    | Hooks.BEFORE_REMOVE_LIQUIDITY_FLAG
    | Hooks.BEFORE_SWAP_FLAG
    | Hooks.AFTER_SWAP_FLAG;
```

**Step 2: Find the Salt and Address with `HookMiner`**

Next, call the `HookMiner.find` function. You will need the deployer's address, the combined `flags`, the contract's creation code, and its encoded constructor arguments.

```solidity
(address addr, bytes32 salt) = HookMiner.find(
    address(this),                      // The deployer's address
    flags,                              // The combined permission flags
    type(CounterHook).creationCode,     // The hook's creation bytecode
    abi.encode(POOL_MANAGER)            // The encoded constructor arguments
);
```

**Step 3: Deploy the Hook with `CREATE2`**

Finally, deploy your hook contract using the `salt` returned by the miner. This guarantees that the contract will be deployed at the pre-calculated address (`addr`), which has the correct permission bits encoded in it.

```solidity
new CounterHook{salt: salt}(POOL_MANAGER);
```

By following this process, you ensure your hook is deployed to a valid address that the `PoolManager` will recognize and interact with correctly. This address-as-permission system is a core innovation in Uniswap v4, providing robust, on-chain security without the gas overhead of traditional storage-based checks.