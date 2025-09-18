## How to Access the User's Address (msg.sender) in Uniswap v4 Hooks

One of the most common challenges when developing Uniswap v4 hooks is identifying the original end-user who initiated a transaction. For many hook applications—such as tracking loyalty points, implementing KYC checks, or enforcing user-specific permissions—knowing the end-user's address is essential. However, due to the layered architecture of Uniswap v4, the global `msg.sender` variable within a hook does not point to the user. This lesson explains why this happens and presents the standard, secure pattern for retrieving the user's address.

### The `msg.sender` Problem in a Multi-Contract Call Chain

To understand the problem, we must first look at the typical transaction flow for a swap. A user rarely interacts directly with the core `PoolManager` contract. Instead, they use a peripheral or "Router" contract that simplifies the process. This creates a multi-step call chain:

1.  The **User** calls a `swap` function on a **Router** contract.
2.  The **Router** contract then calls the **PoolManager** contract to execute the swap logic.
3.  The **PoolManager** contract, as part of its execution, calls the registered **Hook** contract.

In Solidity, `msg.sender` always refers to the address of the *immediate* caller. Let's trace its value through this chain:

*   Inside the **Router** contract, `msg.sender` is the **User's address**.
*   Inside the **PoolManager** contract, `msg.sender` is the **Router's address**.
*   Finally, inside the **Hook** contract, `msg.sender` is the **PoolManager's address**.

As you can see, by the time execution reaches your hook, the original user's address is lost if you only rely on the `msg.sender` global variable. Your hook is blind to who started the transaction.

### The Standard Solution: Using the `sender` Parameter

The Uniswap v4 architecture anticipates this problem and provides a robust solution. When the `PoolManager` invokes a hook function, it passes along a special `sender` parameter. This parameter is the `msg.sender` from the `PoolManager`'s perspective—which, in our call chain, is the address of the **Router** contract.

This `sender` parameter is the key. It gives the hook a direct reference to the contract that initiated the pool action. The solution is a two-part pattern:

1.  **Router Implementation:** The Router contract must expose a public or external view function that returns the address of the user who called it. A common convention is a function named `getMsgSender()`.
2.  **Hook Implementation:** The hook contract uses the `sender` address it receives from the `PoolManager` to make an external call to the Router's `getMsgSender()` function, thereby retrieving the original user's address.

#### A Step-by-Step Example

Let's walk through the `swap` transaction again, this time applying the solution:

1.  **User Initiates Swap:** A user calls `swap()` on a `Router` contract.
2.  **Router Calls PoolManager:** The `Router` forwards the call to the `PoolManager`. In the context of the `PoolManager`, `msg.sender` is now the `Router`'s address.
3.  **PoolManager Executes Hook:** After the swap logic, the `PoolManager` calls the `afterSwap` function on your hook. It passes the `Router`'s address as the `sender` argument: `afterSwap(address sender, ...)`.
4.  **Hook Retrieves User Address:** Inside your `afterSwap` function, you now have the `Router`'s address in the `sender` variable. You perform an external call like `IRouter(sender).getMsgSender()`. This call executes on the Router contract, which returns the original user's address, solving the problem.

### Implementing the Solution in Code

Here are the conceptual code blocks that demonstrate this pattern.

#### In the Router Contract

The Router needs a simple getter function to expose its `msg.sender`. For this pattern to be widely adopted, it's beneficial for routers to implement a standardized interface.

```solidity
// Inside Router.sol

contract Router {
    /**
     * @notice Returns the msg.sender of the transaction originator.
     * @dev This function is designed to be called by a Uniswap v4 hook
     * to identify the end-user who initiated the action.
     * @return address The address of the account that called the Router.
     */
    function getMsgSender() external view returns (address) {
        // In the context of a user's transaction, msg.sender is the user.
        // Note: A production implementation might store msg.sender in a state
        // variable at the start of the primary function to avoid potential
        // complexities with re-entrancy or multicalls.
        return msg.sender;
    }

    // ... other swap and liquidity logic ...
}
```

#### In the Hook Contract

The hook contract must perform two critical actions: first, verify that the `sender` is a trusted router, and second, call the getter function to retrieve the user's address.

```solidity
// Inside MyHook.sol

// An interface to ensure the sender has the required function.
interface IRouter {
    function getMsgSender() external view returns (address);
}

contract MyHook {
    // A mapping to maintain an allow-list of trusted router addresses.
    mapping(address => bool) public authorizedRouters;

    // A hook function, e.g., afterSwap
    function afterSwap(address sender, PoolKey calldata key, IPoolManager.SwapCallbackData calldata data)
        internal
        override
        returns (bytes4)
    {
        // CRITICAL SECURITY CHECK: Ensure the sender is a known, trusted router.
        if (!authorizedRouters[sender]) {
            revert("SenderNotAuthorized");
        }

        // Get the original user's address by calling the trusted router.
        address user = IRouter(sender).getMsgSender();

        // Now the hook can use the 'user' address for its custom logic.
        // For example, log user activity, award points, etc.
        // logUserPoints(user, data.amount0);

        return MyHook.afterSwap.selector;
    }
}
```

### Security is Paramount: Authorizing the Sender

The most critical part of this pattern is the security check: `if (!authorizedRouters[sender])`. Without this check, your hook is vulnerable. A malicious actor could deploy a contract that calls the `PoolManager` directly. In this scenario, the `PoolManager` would pass the malicious contract's address as the `sender` to your hook. If your hook blindly trusts this `sender` and calls `getMsgSender()` on it, the malicious contract could return any address it wants, effectively spoofing the user and bypassing your hook's logic.

Therefore, your hook **must** maintain an allow-list or check against a trusted registry of router addresses before making any external calls. Never trust the `sender` parameter without verification.