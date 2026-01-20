## Performing a V3-to-V4 Multi-Hop Swap with the Universal Router

The Uniswap Universal Router is a powerful and flexible smart contract designed to execute complex sequences of actions within a single, atomic transaction. A common and valuable use case is performing a multi-hop swap, where a user swaps Token A for Token B, and then immediately swaps Token B for Token C. This becomes even more powerful when the swaps cross different protocol versions, such as swapping through a Uniswap V3 pool and then a V4 pool.

This lesson details how to construct and execute such a V3-to-V4 multi-hop swap, overcoming a key architectural challenge in the Universal Router by leveraging the unique capabilities of V4's hook-based design.

## The Challenge: Chaining Dynamic Outputs as Inputs

At first glance, chaining commands in the Universal Router seems straightforward. The contract exposes functions for V2, V3, and V4 swaps, suggesting they can be batched. However, a closer look at the `execute` function reveals a fundamental challenge.

```solidity
// UniversalRouter.sol

function execute(bytes calldata commands, bytes[] calldata inputs) public payable {
    // ... checks ...
    
    // loop through all given commands, execute them and pass along outputs
    for (uint256 commandIndex = 0; commandIndex < numCommands; commandIndex++) {
        bytes1 command = commands[commandIndex];
        bytes calldata input = inputs[commandIndex];

        (success, output) = dispatch(command, input);

        if (!success && successRequired(command)) {
            revert ExecutionFailed(commandIndex: commandIndex, message: output);
        }
    }
}
```

The `execute` function processes a series of commands by iterating through them one by one. For each command, it calls the `dispatch` function, which executes the corresponding logic (e.g., a V3 swap) and returns the result.

The crucial problem lies here: the `output` from one command's execution is **not** passed as the `input` to the next command in the loop. All `inputs` for all commands must be provided in the `inputs` array when the `execute` function is first called. This presents a major obstacle for a multi-hop swap. To perform a V4 swap, you need to know the `amountIn`, which is the `amountOut` from the preceding V3 swap. Since the exact `amountOut` is unknown until the V3 swap is executed on-chain, it seems impossible to supply it as a pre-defined input for the V4 command.

## The Solution: A Multi-Step Workflow

Despite this limitation, a V3-to-V4 swap is achievable. The solution involves a specific workflow that directs token flow and leverages special dynamic parameters available only for V4 commands.

The high-level workflow is as follows:

1.  **Fund the Router**: The user sends the initial asset (Token A) to the Universal Router contract. This can be done with the transaction's `msg.value` for ETH or via a token transfer, often facilitated by a Permit2 approval.
2.  **Execute V3 Swap**: The first command in the execution plan is a standard V3 swap (e.g., `V3_SWAP_EXACT_IN`). Critically, the recipient for the output of this swap (Token B) is set to be the **Universal Router contract itself**, not the end-user.
3.  **Execute V4 Swap**: The second command is the V4 swap. The Universal Router, now holding the balance of Token B from the first step, executes the swap for Token C. The V4 command is specially constructed to use the contract's current token balance as its input amount. The final output (Token C) is then sent to the user.

This workflow cleverly solves the problem of asset availability. By making the router the intermediate recipient, the funds are in the right place for the next step. The remaining challenge—specifying the unknown input amount for the V4 swap—is solved by V4's unique action-based system.

## The Key: V4's Dynamic Action Parameters

The V4 swap command is not a simple function call; it is a sequence of encoded "actions" that are interpreted by the V4 Pool Manager. These actions can be parameterized with special constants that allow them to read the contract's state at the moment of execution, providing the dynamic behavior we need.

To perform the second leg of our swap (Token B for Token C in a V4 pool), we construct a command payload with the following three actions.

### 1. Action: `SETTLE`

The `SETTLE` action is used to prepare tokens for an operation by moving them from the Universal Router's balance into the V4 Pool Manager.

*   **Purpose**: To take the entire balance of Token B, which the router just received from the V3 swap, and make it available to the V4 pool.
*   **Parameters**:
    *   `currency = B`: Specifies that we are settling Token B.
    *   `amountIn = ActionConstants.CONTRACT_BALANCE`: This is the magic constant. Instead of a fixed number, this parameter tells the Pool Manager to use the **entire current balance** of Token B held by the calling contract (the Universal Router). This dynamically resolves the unknown `amountOut` from the V3 swap.
    *   `payerIsUser = false`: This boolean flag indicates that the owner of the tokens is the Universal Router contract, not the original `msg.sender`.

### 2. Action: `SWAP_EXACT_IN_SINGLE`

This action executes the actual swap within the V4 pool.

*   **Purpose**: To swap the Token B that was just settled for Token C.
*   **Parameters**:
    *   `amountIn = ActionConstants.OPEN_DELTA`: This is another powerful constant. It instructs the swap action to use the exact amount that was just processed by the preceding `SETTLE` action. This creates a direct link between the two actions, ensuring the full proceeds from the V3 swap are used as input for the V4 swap.

### 3. Action: `TAKE_ALL`

After the swap completes, the final output tokens (Token C) are held by the V4 Pool Manager. The `TAKE_ALL` action withdraws these funds and sends them to the final recipient.

*   **Purpose**: To collect the entire output of Token C from the V4 Pool Manager and transfer it to the user who initiated the transaction.
*   **Parameters**:
    *   `currency = C`: Specifies that the token to be withdrawn is our final output, Token C. An amount is not needed, as the action's name implies withdrawing the full resulting balance.

## Conclusion and Key Takeaways

By combining this intelligent workflow with the dynamic capabilities of V4 actions, developers can seamlessly execute complex, cross-version swaps within a single, gas-efficient transaction.

*   **Cross-Version Swaps are Possible**: The Universal Router can chain swaps across different Uniswap protocol versions, like V3 and V4, in one atomic transaction.
*   **The Router as an Intermediary**: For multi-hop swaps, the output of intermediate steps must be sent directly to the Universal Router contract itself, which then acts as the payer for subsequent steps.
*   **V4's Special Constants are Essential**: The flexibility of V4 is unlocked through special constants that enable dynamic, on-the-fly parameterization. `ActionConstants.CONTRACT_BALANCE` allows the router to use its full token balance, while `ActionConstants.OPEN_DELTA` links the output of one action to the input of the next.